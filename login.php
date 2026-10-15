<?php
// ============================================================
// login.php  –  User Sign-In
// ============================================================

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';

if (session_status() === PHP_SESSION_NONE) session_start();

// Auto-login via remember-me cookie
try_remember_me_login();

if (is_logged_in()) {
    $dest = ($_SESSION['role'] === 'student') ? 'student_dashboard.php' : 'dashboard.php';
    header('Location: ' . $dest);
    exit;
}

$errors  = [];
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_verify($_POST['csrf_token'] ?? '')) {
        $errors[] = 'Security token mismatch. Please refresh and try again.';
    } else {
        $identifier  = trim($_POST['identifier'] ?? '');
        $password    = $_POST['password'] ?? '';
        $remember_me = !empty($_POST['remember_me']);

        if (empty($identifier) || empty($password)) {
            $errors[] = 'Please enter your email/username and password.';
        } else {
            $result = login_user($identifier, $password, $remember_me);

            if (isset($result['error'])) {
                $errors[] = $result['error'];
            } else {
                $dest = ($_SESSION['role'] === 'student') ? 'student_dashboard.php' : 'dashboard.php';
                header('Location: ' . $dest);
                exit;
            }
        }
    }
}

$csrf_token = csrf_generate();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sign In – <?= htmlspecialchars(APP_NAME) ?></title>
<link rel="stylesheet" href="assets/css/auth.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body class="auth-body">

<div class="auth-wrapper">

  <!-- ─── Brand panel ─── -->
  <div class="auth-brand">
    <div class="brand-content">
      <div class="brand-logo">
        <i class="fas fa-graduation-cap"></i>
      </div>
      <h1><?= htmlspecialchars(APP_NAME) ?></h1>
      <p>Your academic hub – secure, fast, and always available.</p>
      <div class="brand-stats">
        <div class="stat"><span>10K+</span><small>Students</small></div>
        <div class="stat"><span>500+</span><small>Teachers</small></div>
        <div class="stat"><span>99.9%</span><small>Uptime</small></div>
      </div>
    </div>
  </div>

  <!-- ─── Login form ─── -->
  <div class="auth-form-panel">
    <div class="auth-card">
      <div class="auth-card-header">
        <h2>Welcome Back</h2>
        <p>Sign in to your account</p>
      </div>

      <?php if ($success): ?>
      <div class="alert alert-success">
        <i class="fas fa-check-circle"></i> <?= htmlspecialchars($success) ?>
      </div>
      <?php endif; ?>

      <?php if ($errors): ?>
      <div class="alert alert-danger">
        <i class="fas fa-exclamation-circle"></i>
        <?= implode('<br>', array_map('htmlspecialchars', $errors)) ?>
      </div>
      <?php endif; ?>

      <form method="POST" action="login.php" id="loginForm" novalidate>
        <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">

        <div class="form-group">
          <label for="identifier">Email or Username <span class="req">*</span></label>
          <div class="input-icon">
            <i class="fas fa-user"></i>
            <input type="text" id="identifier" name="identifier"
                   value="<?= htmlspecialchars($_POST['identifier'] ?? '') ?>"
                   placeholder="you@example.com or username"
                   required autocomplete="username" autofocus>
          </div>
        </div>

        <div class="form-group">
          <label for="password">
            Password <span class="req">*</span>
            <a href="forgot_password.php" class="forgot-link">Forgot password?</a>
          </label>
          <div class="input-icon">
            <i class="fas fa-lock"></i>
            <input type="password" id="password" name="password"
                   placeholder="Your password"
                   required autocomplete="current-password">
            <button type="button" class="toggle-pw" onclick="togglePw('password')">
              <i class="fas fa-eye" id="eyeIcon_password"></i>
            </button>
          </div>
        </div>

        <div class="form-group remember-row">
          <label class="checkbox-label">
            <input type="checkbox" name="remember_me" value="1">
            Keep me signed in for <?= REMEMBER_ME_DAYS ?> days
          </label>
        </div>

        <button type="submit" class="btn btn-primary btn-full">
          <i class="fas fa-sign-in-alt"></i> Sign In
        </button>

        <div class="divider"><span>OR</span></div>

        <p class="auth-switch">
          Don't have an account? <a href="register.php">Create one free</a>
        </p>
      </form>

      <!-- ── Account Details Info Box ── -->
      <div class="info-box">
        <div class="info-box-title"><i class="fas fa-shield-alt"></i> Security Features</div>
        <ul>
          <li><i class="fas fa-check"></i> Passwords hashed with Argon2ID</li>
          <li><i class="fas fa-check"></i> Brute-force protection (<?= MAX_LOGIN_ATTEMPTS ?> attempts)</li>
          <li><i class="fas fa-check"></i> CSRF token protection</li>
          <li><i class="fas fa-check"></i> Secure session handling</li>
          <li><i class="fas fa-check"></i> Remember-me with secure tokens</li>
          <li><i class="fas fa-check"></i> Login audit logging</li>
        </ul>
      </div>

    </div><!-- .auth-card -->
  </div><!-- .auth-form-panel -->
</div><!-- .auth-wrapper -->

<script src="assets/js/auth.js"></script>
</body>
</html>
