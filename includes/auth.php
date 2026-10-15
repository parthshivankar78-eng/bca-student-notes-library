<?php
// ============================================================
// includes/auth.php  –  Auth helper functions
// ============================================================

require_once __DIR__ . '/../config/database.php';

// ── Brute-force settings ────────────────────────────────────
define('MAX_LOGIN_ATTEMPTS', 5);
define('LOCKOUT_MINUTES',    15);
define('REMEMBER_ME_DAYS',   30);

// ============================================================
// CSRF helpers
// ============================================================

function csrf_generate(): string
{
    if (session_status() === PHP_SESSION_NONE) session_start();
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function csrf_verify(string $token): bool
{
    if (session_status() === PHP_SESSION_NONE) session_start();
    return isset($_SESSION['csrf_token'])
        && hash_equals($_SESSION['csrf_token'], $token);
}

// ============================================================
// REGISTRATION
// ============================================================

/**
 * Register a new user.
 * Returns ['success'=>true, 'user_id'=>...] or ['error'=>'...']
 */
function register_user(array $data): array
{
    $pdo = getDB();

    // ── Validate required fields ────────────────────────────
    $required = ['full_name', 'email', 'username', 'password', 'confirm_password'];
    foreach ($required as $f) {
        if (empty(trim($data[$f] ?? ''))) {
            return ['error' => ucfirst(str_replace('_', ' ', $f)) . ' is required.'];
        }
    }

    $full_name = trim($data['full_name']);
    $email     = strtolower(trim($data['email']));
    $username  = strtolower(trim($data['username']));
    $password  = $data['password'];
    $confirm   = $data['confirm_password'];
    $role      = in_array($data['role'] ?? '', ['student','teacher','admin']) ? $data['role'] : 'student';
    $gender    = in_array($data['gender'] ?? '', ['male','female','other','prefer_not_to_say']) ? $data['gender'] : null;
    $dob       = !empty($data['date_of_birth']) ? $data['date_of_birth'] : null;
    $phone     = trim($data['phone'] ?? '') ?: null;

    // ── Validations ─────────────────────────────────────────
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return ['error' => 'Invalid email address.'];
    }

    if (!preg_match('/^[a-z0-9_\.]{3,30}$/', $username)) {
        return ['error' => 'Username must be 3–30 characters (letters, numbers, _ .)'];
    }

    if (strlen($full_name) < 2 || strlen($full_name) > 120) {
        return ['error' => 'Full name must be 2–120 characters.'];
    }

    // Password strength
    $pwd_error = validate_password_strength($password);
    if ($pwd_error) return ['error' => $pwd_error];

    if ($password !== $confirm) {
        return ['error' => 'Passwords do not match.'];
    }

    if ($phone && !preg_match('/^\+?[0-9\s\-\(\)]{7,20}$/', $phone)) {
        return ['error' => 'Invalid phone number format.'];
    }

    if ($dob) {
        $dob_ts = strtotime($dob);
        if (!$dob_ts) return ['error' => 'Invalid date of birth.'];
        $age = (int) date_diff(date_create($dob), date_create('today'))->y;
        if ($age < 5 || $age > 120) return ['error' => 'Date of birth is not realistic.'];
    }

    // ── Uniqueness checks ───────────────────────────────────
    $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        return ['error' => 'An account with that email already exists.'];
    }

    $stmt = $pdo->prepare('SELECT id FROM users WHERE username = ? LIMIT 1');
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        return ['error' => 'That username is already taken.'];
    }

    // ── Hash password (Argon2ID preferred, bcrypt fallback) ─
    $hash = password_hash($password,
        defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_BCRYPT,
        ['cost' => 12]
    );

    // ── Email verification token ─────────────────────────────
    $verify_token   = bin2hex(random_bytes(32));
    $verify_expires = date('Y-m-d H:i:s', strtotime('+24 hours'));

    // ── Insert user ──────────────────────────────────────────
    $sql = '
        INSERT INTO users
            (full_name, email, username, password_hash, role,
             gender, date_of_birth, phone,
             verify_token, verify_expires, is_verified)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
    ';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        $full_name, $email, $username, $hash, $role,
        $gender, $dob, $phone,
        $verify_token, $verify_expires
    ]);
    $user_id = (int) $pdo->lastInsertId();

    // ── Create student profile row ───────────────────────────
    if ($role === 'student') {
        $student_id = 'STU-' . date('Y') . '-' . str_pad($user_id, 4, '0', STR_PAD_LEFT);
        $pdo->prepare('INSERT INTO student_profiles (user_id, student_id) VALUES (?, ?)')
            ->execute([$user_id, $student_id]);
    }

    return [
        'success'      => true,
        'user_id'      => $user_id,
        'verify_token' => $verify_token,   // would be emailed in production
        'message'      => 'Registration successful! Please check your email to verify your account.',
    ];
}

// ============================================================
// LOGIN
// ============================================================

/**
 * Authenticate a user.
 * Returns ['success'=>true, 'user'=>[...]] or ['error'=>'...']
 */
function login_user(string $identifier, string $password, bool $remember_me = false): array
{
    $pdo = getDB();
    $ip  = get_client_ip();
    $ua  = $_SERVER['HTTP_USER_AGENT'] ?? '';

    $identifier = strtolower(trim($identifier));

    // ── Find user by email or username ───────────────────────
    $stmt = $pdo->prepare(
        'SELECT * FROM users WHERE email = ? OR username = ? LIMIT 1'
    );
    $stmt->execute([$identifier, $identifier]);
    $user = $stmt->fetch();

    // ── Account not found ────────────────────────────────────
    if (!$user) {
        log_login(null, $identifier, $ip, $ua, 'fail');
        return ['error' => 'Invalid credentials.'];
    }

    // ── Account disabled ─────────────────────────────────────
    if (!$user['is_active']) {
        return ['error' => 'Your account has been disabled. Contact support.'];
    }

    // ── Brute-force lock check ───────────────────────────────
    if ($user['locked_until'] && strtotime($user['locked_until']) > time()) {
        $mins = ceil((strtotime($user['locked_until']) - time()) / 60);
        log_login($user['id'], $identifier, $ip, $ua, 'locked');
        return ['error' => "Account temporarily locked. Try again in {$mins} minute(s)."];
    }

    // ── Verify password ──────────────────────────────────────
    if (!password_verify($password, $user['password_hash'])) {
        $attempts = (int)$user['login_attempts'] + 1;

        if ($attempts >= MAX_LOGIN_ATTEMPTS) {
            $locked_until = date('Y-m-d H:i:s', strtotime('+' . LOCKOUT_MINUTES . ' minutes'));
            $pdo->prepare('UPDATE users SET login_attempts=?, locked_until=? WHERE id=?')
                ->execute([$attempts, $locked_until, $user['id']]);
            log_login($user['id'], $identifier, $ip, $ua, 'locked');
            return ['error' => "Too many failed attempts. Account locked for " . LOCKOUT_MINUTES . " minutes."];
        }

        $pdo->prepare('UPDATE users SET login_attempts=? WHERE id=?')
            ->execute([$attempts, $user['id']]);
        log_login($user['id'], $identifier, $ip, $ua, 'fail');
        $left = MAX_LOGIN_ATTEMPTS - $attempts;
        return ['error' => "Invalid credentials. {$left} attempt(s) remaining."];
    }

    // ── Rehash if needed (algo upgrade) ─────────────────────
    if (password_needs_rehash($user['password_hash'],
        defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_BCRYPT,
        ['cost' => 12]
    )) {
        $newHash = password_hash($password,
            defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_BCRYPT,
            ['cost' => 12]
        );
        $pdo->prepare('UPDATE users SET password_hash=? WHERE id=?')
            ->execute([$newHash, $user['id']]);
    }

    // ── Reset failed attempts ────────────────────────────────
    $pdo->prepare('UPDATE users SET login_attempts=0, locked_until=NULL, last_login=NOW(), last_ip=? WHERE id=?')
        ->execute([$ip, $user['id']]);

    // ── Start session ────────────────────────────────────────
    if (session_status() === PHP_SESSION_NONE) session_start();
    session_regenerate_id(true);

    $_SESSION['user_id']   = $user['id'];
    $_SESSION['username']  = $user['username'];
    $_SESSION['full_name'] = $user['full_name'];
    $_SESSION['role']      = $user['role'];
    $_SESSION['email']     = $user['email'];
    $_SESSION['logged_in'] = true;

    // ── Remember-me cookie ───────────────────────────────────
    if ($remember_me) {
        $token      = bin2hex(random_bytes(32));
        $token_hash = hash('sha256', $token);
        $expires    = time() + (REMEMBER_ME_DAYS * 86400);
        $expires_dt = date('Y-m-d H:i:s', $expires);

        // Clean old tokens for this user
        $pdo->prepare('DELETE FROM remember_tokens WHERE user_id=?')->execute([$user['id']]);

        $pdo->prepare('INSERT INTO remember_tokens (user_id, token_hash, expires_at) VALUES (?,?,?)')
            ->execute([$user['id'], $token_hash, $expires_dt]);

        setcookie('remember_token', $user['id'] . ':' . $token, [
            'expires'  => $expires,
            'path'     => '/',
            'httponly' => true,
            'samesite' => 'Strict',
            // 'secure' => true,  // uncomment on HTTPS
        ]);
    }

    log_login($user['id'], $identifier, $ip, $ua, 'success');

    return [
        'success' => true,
        'user'    => [
            'id'        => $user['id'],
            'full_name' => $user['full_name'],
            'username'  => $user['username'],
            'email'     => $user['email'],
            'role'      => $user['role'],
            'avatar'    => $user['avatar_url'],
        ],
    ];
}

// ============================================================
// LOGOUT
// ============================================================

function logout_user(): void
{
    if (session_status() === PHP_SESSION_NONE) session_start();

    // Delete remember-me token from DB
    if (isset($_SESSION['user_id'])) {
        if (isset($_COOKIE['remember_token'])) {
            [$uid, $rawToken] = explode(':', $_COOKIE['remember_token'], 2) + ['', ''];
            $tokenHash = hash('sha256', $rawToken);
            getDB()->prepare('DELETE FROM remember_tokens WHERE user_id=? AND token_hash=?')
                   ->execute([$uid, $tokenHash]);
        }
    }

    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $p['path'], $p['domain'], $p['secure'], $p['httponly']);
    }
    setcookie('remember_token', '', time() - 42000, '/', '', false, true);
    session_destroy();
}

// ============================================================
// REMEMBER-ME auto-login
// ============================================================

function try_remember_me_login(): void
{
    if (is_logged_in()) return;
    if (empty($_COOKIE['remember_token'])) return;

    [$uid, $rawToken] = explode(':', $_COOKIE['remember_token'], 2) + ['', ''];
    if (!$uid || !$rawToken) return;

    $tokenHash = hash('sha256', $rawToken);
    $pdo = getDB();

    $stmt = $pdo->prepare(
        'SELECT rt.*, u.id, u.full_name, u.username, u.email, u.role, u.is_active
         FROM remember_tokens rt
         JOIN users u ON u.id = rt.user_id
         WHERE rt.user_id=? AND rt.token_hash=? AND rt.expires_at > NOW()
         LIMIT 1'
    );
    $stmt->execute([$uid, $tokenHash]);
    $row = $stmt->fetch();

    if ($row && $row['is_active']) {
        if (session_status() === PHP_SESSION_NONE) session_start();
        session_regenerate_id(true);
        $_SESSION['user_id']   = $row['id'];
        $_SESSION['username']  = $row['username'];
        $_SESSION['full_name'] = $row['full_name'];
        $_SESSION['role']      = $row['role'];
        $_SESSION['email']     = $row['email'];
        $_SESSION['logged_in'] = true;
    }
}

// ============================================================
// UTILITIES
// ============================================================

function is_logged_in(): bool
{
    return !empty($_SESSION['logged_in']) && !empty($_SESSION['user_id']);
}

function require_login(string $redirect = 'login.php'): void
{
    try_remember_me_login();
    if (!is_logged_in()) {
        header('Location: ' . APP_URL . '/' . $redirect);
        exit;
    }
}

function require_role(string $role): void
{
    require_login();
    if ($_SESSION['role'] !== $role) {
        header('Location: ' . APP_URL . '/dashboard.php');
        exit;
    }
}

function get_client_ip(): string
{
    foreach (['HTTP_CLIENT_IP','HTTP_X_FORWARDED_FOR','REMOTE_ADDR'] as $k) {
        if (!empty($_SERVER[$k])) {
            $ip = trim(explode(',', $_SERVER[$k])[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) return $ip;
        }
    }
    return '0.0.0.0';
}

function log_login(?int $user_id, string $identifier, string $ip, string $ua, string $status): void
{
    try {
        getDB()->prepare(
            'INSERT INTO login_logs (user_id, identifier, ip_address, user_agent, status)
             VALUES (?, ?, ?, ?, ?)'
        )->execute([$user_id, $identifier, $ip, $ua, $status]);
    } catch (Exception $e) {
        error_log('Login log error: ' . $e->getMessage());
    }
}

/**
 * Returns null on success, or an error message string.
 */
function validate_password_strength(string $password): ?string
{
    if (strlen($password) < 8) {
        return 'Password must be at least 8 characters.';
    }
    if (!preg_match('/[A-Z]/', $password)) {
        return 'Password must contain at least one uppercase letter.';
    }
    if (!preg_match('/[a-z]/', $password)) {
        return 'Password must contain at least one lowercase letter.';
    }
    if (!preg_match('/[0-9]/', $password)) {
        return 'Password must contain at least one number.';
    }
    if (!preg_match('/[\W_]/', $password)) {
        return 'Password must contain at least one special character (!@#$%^&*...).';
    }
    return null;
}

// ============================================================
// PASSWORD RESET (token generation)
// ============================================================

function generate_password_reset_token(string $email): array
{
    $pdo   = getDB();
    $email = strtolower(trim($email));

    $stmt = $pdo->prepare('SELECT id FROM users WHERE email=? AND is_active=1 LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Always return success to prevent email enumeration
    if (!$user) {
        return ['success' => true, 'message' => 'If that email is registered, a reset link has been sent.'];
    }

    $token   = bin2hex(random_bytes(32));
    $expires = date('Y-m-d H:i:s', strtotime('+1 hour'));

    $pdo->prepare('UPDATE users SET reset_token=?, reset_expires=? WHERE id=?')
        ->execute([$token, $expires, $user['id']]);

    // In production: send email with link APP_URL/reset_password.php?token=$token
    return [
        'success' => true,
        'token'   => $token,   // remove in production
        'message' => 'If that email is registered, a reset link has been sent.',
    ];
}

function reset_password(string $token, string $new_password, string $confirm): array
{
    if ($new_password !== $confirm) {
        return ['error' => 'Passwords do not match.'];
    }

    $err = validate_password_strength($new_password);
    if ($err) return ['error' => $err];

    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'SELECT id FROM users WHERE reset_token=? AND reset_expires > NOW() LIMIT 1'
    );
    $stmt->execute([$token]);
    $user = $stmt->fetch();

    if (!$user) {
        return ['error' => 'Invalid or expired reset link.'];
    }

    $hash = password_hash($new_password,
        defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_BCRYPT,
        ['cost' => 12]
    );

    $pdo->prepare(
        'UPDATE users SET password_hash=?, reset_token=NULL, reset_expires=NULL,
         login_attempts=0, locked_until=NULL WHERE id=?'
    )->execute([$hash, $user['id']]);

    return ['success' => true, 'message' => 'Password reset successfully. You can now log in.'];
}
