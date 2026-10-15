<?php
// ============================================================
// register.php  –  User Registration
// ============================================================

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';

if (session_status() === PHP_SESSION_NONE) session_start();

// Redirect if already logged in
if (is_logged_in()) {
    header('Location: dashboard.php');
    exit;
}

$errors  = [];
$success = '';
$old     = [];  // repopulate form values

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // CSRF check
    if (!csrf_verify($_POST['csrf_token'] ?? '')) {
        $errors[] = 'Security token mismatch. Please try again.';
    } else {
        $old = [
            'full_name'     => htmlspecialchars(trim($_POST['full_name'] ?? '')),
            'email'         => htmlspecialchars(trim($_POST['email'] ?? '')),
            'username'      => htmlspecialchars(trim($_POST['username'] ?? '')),
            'phone'         => htmlspecialchars(trim($_POST['phone'] ?? '')),
            'date_of_birth' => htmlspecialchars(trim($_POST['date_of_birth'] ?? '')),
            'gender'        => $_POST['gender'] ?? '',
            'role'          => $_POST['role'] ?? 'student',
        ];

        $result = register_user($_POST);

        if (isset($result['error'])) {
            $errors[] = $result['error'];
        } else {
            $success = $result['message'];
            $old = [];  // clear form
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
<title>Register – <?= htmlspecialchars(APP_NAME) ?></title>
<link rel="stylesheet" href="assets/css/auth.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body class="auth-body">

<div class="auth-wrapper">
  <!-- ─── Left panel ─── -->
  <div class="auth-brand">
    <div class="brand-content">
      <div class="brand-logo">
        <i class="fas fa-graduation-cap"></i>
      </div>
      <h1><?= htmlspecialchars(APP_NAME) ?></h1>
      <p>Manage your academic journey in one place.</p>
      <ul class="brand-features">
        <li><i class="fas fa-check-circle"></i> Track grades &amp; attendance</li>
        <li><i class="fas fa-check-circle"></i> Submit assignments online</li>
        <li><i class="fas fa-check-circle"></i> Real-time notifications</li>
        <li><i class="fas fa-check-circle"></i> Connect with teachers</li>
      </ul>
    </div>
  </div>

  <!-- ─── Form panel ─── -->
  <div class="auth-form-panel">
    <div class="auth-card">
      <div class="auth-card-header">
        <h2>Create Account</h2>
        <p>Fill in all details to get started</p>
      </div>

      <!-- Success message -->
      <?php if ($success): ?>
      <div class="alert alert-success">
        <i class="fas fa-check-circle"></i>
        <?= htmlspecialchars($success) ?>
      </div>
      <?php endif; ?>

      <!-- Error messages -->
      <?php if ($errors): ?>
      <div class="alert alert-danger">
        <i class="fas fa-exclamation-circle"></i>
        <?= implode('<br>', array_map('htmlspecialchars', $errors)) ?>
      </div>
      <?php endif; ?>

      <?php if (!$success): ?>
      <form method="POST" action="register.php" id="registerForm" novalidate>
        <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">

        <!-- ── Section: Personal Info ── -->
        <div class="form-section-title">
          <i class="fas fa-user"></i> Personal Information
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="full_name">Full Name <span class="req">*</span></label>
            <div class="input-icon">
              <i class="fas fa-id-card"></i>
              <input type="text" id="full_name" name="full_name"
                     value="<?= $old['full_name'] ?? '' ?>"
                     placeholder="e.g. John Smith"
                     maxlength="120" required autocomplete="name">
            </div>
          </div>

          <div class="form-group">
            <label for="username">Username <span class="req">*</span></label>
            <div class="input-icon">
              <i class="fas fa-at"></i>
              <input type="text" id="username" name="username"
                     value="<?= $old['username'] ?? '' ?>"
                     placeholder="e.g. john_smith"
                     pattern="[a-zA-Z0-9_\.]{3,30}"
                     maxlength="30" required autocomplete="username">
            </div>
            <small class="hint">3–30 chars, letters/numbers/_ only</small>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="email">Email Address <span class="req">*</span></label>
            <div class="input-icon">
              <i class="fas fa-envelope"></i>
              <input type="email" id="email" name="email"
                     value="<?= $old['email'] ?? '' ?>"
                     placeholder="you@example.com"
                     maxlength="180" required autocomplete="email">
            </div>
          </div>

          <div class="form-group">
            <label for="phone">Phone Number</label>
            <div class="input-icon">
              <i class="fas fa-phone"></i>
              <input type="tel" id="phone" name="phone"
                     value="<?= $old['phone'] ?? '' ?>"
                     placeholder="+91 9876543210"
                     autocomplete="tel">
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="date_of_birth">Date of Birth</label>
            <div class="input-icon">
              <i class="fas fa-calendar-alt"></i>
              <input type="date" id="date_of_birth" name="date_of_birth"
                     value="<?= $old['date_of_birth'] ?? '' ?>"
                     max="<?= date('Y-m-d') ?>">
            </div>
          </div>

          <div class="form-group">
            <label for="gender">Gender</label>
            <div class="input-icon">
              <i class="fas fa-venus-mars"></i>
              <select id="gender" name="gender">
                <option value="">— Select gender —</option>
                <option value="male"               <?= ($old['gender'] ?? '') === 'male'               ? 'selected' : '' ?>>Male</option>
                <option value="female"             <?= ($old['gender'] ?? '') === 'female'             ? 'selected' : '' ?>>Female</option>
                <option value="other"              <?= ($old['gender'] ?? '') === 'other'              ? 'selected' : '' ?>>Other</option>
                <option value="prefer_not_to_say"  <?= ($old['gender'] ?? '') === 'prefer_not_to_say' ? 'selected' : '' ?>>Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>

        <!-- ── Section: Account Info ── -->
        <div class="form-section-title">
          <i class="fas fa-lock"></i> Account Security
        </div>

        <div class="form-group">
          <label for="role">Account Role <span class="req">*</span></label>
          <div class="input-icon">
            <i class="fas fa-user-tag"></i>
            <select id="role" name="role" required>
              <option value="student"  <?= ($old['role'] ?? 'student') === 'student'  ? 'selected' : '' ?>>Student</option>
              <option value="teacher"  <?= ($old['role'] ?? '') === 'teacher'          ? 'selected' : '' ?>>Teacher</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="password">Password <span class="req">*</span></label>
            <div class="input-icon">
              <i class="fas fa-key"></i>
              <input type="password" id="password" name="password"
                     placeholder="Min 8 chars, A-z 0-9 !@#"
                     required autocomplete="new-password">
              <button type="button" class="toggle-pw" onclick="togglePw('password')">
                <i class="fas fa-eye" id="eyeIcon_password"></i>
              </button>
            </div>
            <!-- Strength bar -->
            <div class="strength-wrap">
              <div class="strength-bar" id="strengthBar"></div>
            </div>
            <small class="strength-label" id="strengthLabel"></small>
          </div>

          <div class="form-group">
            <label for="confirm_password">Confirm Password <span class="req">*</span></label>
            <div class="input-icon">
              <i class="fas fa-key"></i>
              <input type="password" id="confirm_password" name="confirm_password"
                     placeholder="Repeat your password"
                     required autocomplete="new-password">
              <button type="button" class="toggle-pw" onclick="togglePw('confirm_password')">
                <i class="fas fa-eye" id="eyeIcon_confirm_password"></i>
              </button>
            </div>
            <small class="hint" id="matchHint"></small>
          </div>
        </div>

        <!-- Password rules checklist -->
        <div class="pw-rules">
          <span id="r-len"  class="rule"><i class="fas fa-circle"></i> 8+ characters</span>
          <span id="r-upper" class="rule"><i class="fas fa-circle"></i> Uppercase letter</span>
          <span id="r-lower" class="rule"><i class="fas fa-circle"></i> Lowercase letter</span>
          <span id="r-num"  class="rule"><i class="fas fa-circle"></i> Number</span>
          <span id="r-sym"  class="rule"><i class="fas fa-circle"></i> Special char</span>
        </div>

        <div class="form-group checkbox-group">
          <label class="checkbox-label">
            <input type="checkbox" name="agree_terms" required>
            I agree to the <a href="terms.php" target="_blank">Terms of Service</a>
            and <a href="privacy.php" target="_blank">Privacy Policy</a>
          </label>
        </div>

        <button type="submit" class="btn btn-primary btn-full" id="submitBtn">
          <i class="fas fa-user-plus"></i> Create Account
        </button>

        <p class="auth-switch">
          Already have an account? <a href="login.php">Sign in here</a>
        </p>
      </form>
      <?php endif; ?>

    </div><!-- .auth-card -->
  </div><!-- .auth-form-panel -->
</div><!-- .auth-wrapper -->

<script src="assets/js/auth.js"></script>
</body>
</html>
