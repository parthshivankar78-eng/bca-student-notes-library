<?php
// ============================================================
// config/database.php  –  Secure PDO connection
// ============================================================

define('DB_HOST',     'localhost');
define('DB_PORT',     '3306');
define('DB_NAME',     'student_dashboard');
define('DB_USER',     'root');          // ← change in production
define('DB_PASS',     '');              // ← change in production
define('DB_CHARSET',  'utf8mb4');

// App-wide secret key – used for CSRF tokens & remember-me tokens
define('APP_SECRET', 'CHANGE_THIS_TO_A_LONG_RANDOM_STRING_IN_PRODUCTION');
define('APP_NAME',   'Student Dashboard');
define('APP_URL',    'http://localhost/student_dashboard');

// Session hardening
ini_set('session.use_strict_mode',       '1');
ini_set('session.cookie_httponly',        '1');
ini_set('session.cookie_samesite',        'Strict');
ini_set('session.use_only_cookies',       '1');
ini_set('session.gc_maxlifetime',         '1800');  // 30 min idle
// ini_set('session.cookie_secure', '1'); // uncomment when using HTTPS

/**
 * Returns a singleton PDO instance.
 */
function getDB(): PDO
{
    static $pdo = null;

    if ($pdo === null) {
        $dsn = sprintf(
            'mysql:host=%s;port=%s;dbname=%s;charset=%s',
            DB_HOST, DB_PORT, DB_NAME, DB_CHARSET
        );

        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
        ];

        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            // Never expose DB errors to users
            error_log('DB Connection Error: ' . $e->getMessage());
            die(json_encode(['error' => 'Database unavailable. Please try later.']));
        }
    }

    return $pdo;
}
