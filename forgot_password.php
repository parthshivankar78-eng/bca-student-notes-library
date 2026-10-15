<?php
// ============================================================
// forgot_password.php
// ============================================================
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';

if (session_status() === PHP_SESSION_NONE) session_start();
if (is_logged_in()) { header('Location: dashboard.php'); exit; }

$message = '';
$isError = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_verify($_POST['csrf_token'] ?? '')) {
        $message = 'Security error. Please try again.';
        $isError = true;
    } else {
        $result  = generate_password_reset_token(trim($_POST['email'] ?? ''));
        $message = $result['message'];
        // In dev: echo reset link (remove in production)
        if (isset($result['token'])) {
            $message .= ' <br><small style="opacity:.6">[DEV] Reset link: <a href="reset_password.php?token='
                      . htmlspecialchars($result['token']) . '">click here</a></small>';
        }
    }
}
$csrf_token = csrf_generate();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Forgot Password – <?= htmlspecialchars(APP_NAME) ?></title>
<link rel="stylesheet" href="assets/css/auth.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body class="auth-body">
<div class="auth-wrapper auth-wrapper--center">
  <div class="auth-card auth-card--narrow">
    <div class="auth-card-header">
      <div class="card-icon"><i class="fas fa-paper-plane"></i></div>
      <h2>Forgot Password</h2>
      <p>Enter your email and we'll send you a reset link.</p>
    </div>

    <?php if ($message): ?>
    <div class="alert <?= $isError ? 'alert-danger' : 'alert-success' ?>">
      <?= $message ?>
    </div>
    <?php endif; ?>

    <form method="POST" action="forgot_password.php">
      <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">
      <div class="form-group">
        <label for="email">Email Address</label>
        <div class="input-icon">
          <i class="fas fa-envelope"></i>
          <input type="email" id="email" name="email"
                 placeholder="you@example.com" required autofocus>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-full">
        <i class="fas fa-paper-plane"></i> Send Reset Link
      </button>
    </form>
    <p class="auth-switch"><a href="login.php"><i class="fas fa-arrow-left"></i> Back to login</a></p>
  </div>
</div>
</body>
</html>
