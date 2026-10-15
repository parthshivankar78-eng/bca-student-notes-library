<?php

// reset_password.php

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';

if (session_status() === PHP_SESSION_NONE) session_start();
if (is_logged_in()) { header('Location: dashboard.php'); exit; }

$token   = trim($_GET['token'] ?? '');
$message = '';
$isError = false;
$done    = false;

// Validate token exists & not expired
$pdo  = getDB();
$stmt = $pdo->prepare('SELECT id FROM users WHERE reset_token=? AND reset_expires > NOW() LIMIT 1');
$stmt->execute([$token]);
$validToken = (bool) $stmt->fetch();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_verify($_POST['csrf_token'] ?? '')) {
        $message = 'Security error. Please try again.'; $isError = true;
    } else {
        $result = reset_password($_POST['token'] ?? '', $_POST['password'] ?? '', $_POST['confirm_password'] ?? '');
        if (isset($result['error'])) {
            $message = $result['error']; $isError = true;
        } else {
            $message = $result['message']; $done = true;
        }
    }
}
$csrf_token = csrf_generate();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Reset Password – <?= htmlspecialchars(APP_NAME) ?></title>
<link rel="stylesheet" href="assets/css/auth.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body class="auth-body">
<div class="auth-wrapper auth-wrapper--center">
  <div class="auth-card auth-card--narrow">
    <div class="auth-card-header">
      <div class="card-icon"><i class="fas fa-key"></i></div>
      <h2>Reset Password</h2>
      <p>Choose a new strong password for your account.</p>
    </div>

    <?php if ($message): ?>
    <div class="alert <?= $isError ? 'alert-danger' : 'alert-success' ?>">
      <?= htmlspecialchars($message) ?>
    </div>
    <?php endif; ?>

    <?php if ($done): ?>
      <p class="auth-switch"><a href="login.php"><i class="fas fa-sign-in-alt"></i> Sign in now</a></p>
    <?php elseif (!$validToken && !$isError): ?>
      <div class="alert alert-danger"><i class="fas fa-times-circle"></i> This reset link is invalid or has expired.</div>
      <p class="auth-switch"><a href="forgot_password.php">Request a new link</a></p>
    <?php else: ?>
    <form method="POST" action="reset_password.php">
      <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">
      <input type="hidden" name="token" value="<?= htmlspecialchars($token) ?>">

      <div class="form-group">
        <label for="password">New Password</label>
        <div class="input-icon">
          <i class="fas fa-lock"></i>
          <input type="password" id="password" name="password"
                 placeholder="Min 8 chars, A-z 0-9 !@#" required>
          <button type="button" class="toggle-pw" onclick="togglePw('password')">
            <i class="fas fa-eye" id="eyeIcon_password"></i>
          </button>
        </div>
        <div class="strength-wrap"><div class="strength-bar" id="strengthBar"></div></div>
      </div>

      <div class="form-group">
        <label for="confirm_password">Confirm New Password</label>
        <div class="input-icon">
          <i class="fas fa-lock"></i>
          <input type="password" id="confirm_password" name="confirm_password"
                 placeholder="Repeat password" required>
          <button type="button" class="toggle-pw" onclick="togglePw('confirm_password')">
            <i class="fas fa-eye" id="eyeIcon_confirm_password"></i>
          </button>
        </div>
        <small class="hint" id="matchHint"></small>
      </div>

      <div class="pw-rules">
        <span id="r-len"  class="rule"><i class="fas fa-circle"></i> 8+ characters</span>
        <span id="r-upper" class="rule"><i class="fas fa-circle"></i> Uppercase letter</span>
        <span id="r-lower" class="rule"><i class="fas fa-circle"></i> Lowercase letter</span>
        <span id="r-num"  class="rule"><i class="fas fa-circle"></i> Number</span>
        <span id="r-sym"  class="rule"><i class="fas fa-circle"></i> Special char</span>
      </div>

      <button type="submit" class="btn btn-primary btn-full">
        <i class="fas fa-save"></i> Save New Password
      </button>
    </form>
    <?php endif; ?>
  </div>
</div>
<script src="assets/js/auth.js"></script>
</body>
</html>
