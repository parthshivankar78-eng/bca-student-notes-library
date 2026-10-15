<?php
// ============================================================
// dashboard.php  –  Protected main page
// ============================================================
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';

if (session_status() === PHP_SESSION_NONE) session_start();
require_login();   // Redirects to login.php if not authenticated

// Fetch user full details from DB
$pdo  = getDB();
$stmt = $pdo->prepare(
    'SELECT u.*, sp.student_id, sp.department, sp.program, sp.enrollment_year, sp.current_grade
     FROM users u
     LEFT JOIN student_profiles sp ON sp.user_id = u.id
     WHERE u.id = ? LIMIT 1'
);
$stmt->execute([$_SESSION['user_id']]);
$user = $stmt->fetch();

// Fetch recent login logs
$logs = $pdo->prepare(
    'SELECT * FROM login_logs WHERE user_id=? ORDER BY created_at DESC LIMIT 5'
);
$logs->execute([$_SESSION['user_id']]);
$loginHistory = $logs->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard – <?= htmlspecialchars(APP_NAME) ?></title>
<link rel="stylesheet" href="assets/css/auth.css">
<link rel="stylesheet" href="assets/css/dashboard.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body class="dashboard-body">

<!-- ─── Top Nav ─── -->
<nav class="topnav">
  <div class="topnav-brand">
    <i class="fas fa-graduation-cap"></i>
    <span><?= htmlspecialchars(APP_NAME) ?></span>
  </div>
  <div class="topnav-right">
    <span class="badge badge-role"><?= htmlspecialchars(ucfirst($user['role'])) ?></span>
    <span class="nav-username"><i class="fas fa-user-circle"></i> <?= htmlspecialchars($user['username']) ?></span>
    <a href="logout.php" class="btn btn-outline-sm"><i class="fas fa-sign-out-alt"></i> Logout</a>
  </div>
</nav>

<!-- ─── Page Content ─── -->
<div class="dashboard-container">

  <!-- Welcome Banner -->
  <div class="welcome-banner">
    <div class="welcome-avatar">
      <?php if ($user['avatar_url']): ?>
        <img src="<?= htmlspecialchars($user['avatar_url']) ?>" alt="Avatar">
      <?php else: ?>
        <i class="fas fa-user-circle"></i>
      <?php endif; ?>
    </div>
    <div class="welcome-text">
      <h2>Welcome back, <?= htmlspecialchars($user['full_name']) ?>! 👋</h2>
      <p>Last login: <?= $user['last_login'] ? date('d M Y, h:i A', strtotime($user['last_login'])) : 'First login' ?></p>
    </div>
  </div>

  <!-- ─── Account Details Card ─── -->
  <div class="detail-grid">

    <div class="detail-card">
      <div class="detail-card-header">
        <i class="fas fa-user"></i> Personal Information
      </div>
      <table class="detail-table">
        <tr><th>Full Name</th>      <td><?= htmlspecialchars($user['full_name']) ?></td></tr>
        <tr><th>Username</th>       <td><?= htmlspecialchars($user['username']) ?></td></tr>
        <tr><th>Email</th>          <td><?= htmlspecialchars($user['email']) ?></td></tr>
        <tr><th>Phone</th>          <td><?= htmlspecialchars($user['phone'] ?? '—') ?></td></tr>
        <tr><th>Date of Birth</th>  <td><?= $user['date_of_birth'] ? date('d M Y', strtotime($user['date_of_birth'])) : '—' ?></td></tr>
        <tr><th>Gender</th>         <td><?= htmlspecialchars(ucwords(str_replace('_', ' ', $user['gender'] ?? '—'))) ?></td></tr>
        <tr><th>Role</th>
          <td><span class="badge badge-role"><?= htmlspecialchars(ucfirst($user['role'])) ?></span></td>
        </tr>
        <tr><th>Verified</th>
          <td>
            <?php if ($user['is_verified']): ?>
              <span class="badge badge-success"><i class="fas fa-check"></i> Verified</span>
            <?php else: ?>
              <span class="badge badge-warning"><i class="fas fa-clock"></i> Pending</span>
            <?php endif; ?>
          </td>
        </tr>
        <tr><th>Member Since</th>   <td><?= date('d M Y', strtotime($user['created_at'])) ?></td></tr>
      </table>
    </div>

    <?php if ($user['role'] === 'student'): ?>
    <div class="detail-card">
      <div class="detail-card-header">
        <i class="fas fa-school"></i> Academic Profile
      </div>
      <table class="detail-table">
        <tr><th>Student ID</th>       <td><?= htmlspecialchars($user['student_id'] ?? '—') ?></td></tr>
        <tr><th>Department</th>       <td><?= htmlspecialchars($user['department'] ?? '—') ?></td></tr>
        <tr><th>Program</th>          <td><?= htmlspecialchars($user['program'] ?? '—') ?></td></tr>
        <tr><th>Enrollment Year</th>  <td><?= htmlspecialchars($user['enrollment_year'] ?? '—') ?></td></tr>
        <tr><th>Current Grade</th>    <td><?= htmlspecialchars($user['current_grade'] ?? '—') ?></td></tr>
      </table>
    </div>
    <?php endif; ?>

    <div class="detail-card">
      <div class="detail-card-header">
        <i class="fas fa-shield-alt"></i> Security &amp; Login History
      </div>
      <table class="detail-table">
        <tr><th>Last Login IP</th>  <td><?= htmlspecialchars($user['last_ip'] ?? '—') ?></td></tr>
        <tr><th>Last Login</th>     <td><?= $user['last_login'] ? date('d M Y H:i', strtotime($user['last_login'])) : '—' ?></td></tr>
        <tr><th>Login Attempts</th> <td><?= (int)$user['login_attempts'] ?></td></tr>
        <tr><th>Account Status</th>
          <td><?= $user['is_active'] ? '<span class="badge badge-success">Active</span>' : '<span class="badge badge-danger">Disabled</span>' ?></td>
        </tr>
      </table>

      <div class="log-header">Recent Login Activity</div>
      <table class="log-table">
        <thead><tr><th>Date</th><th>IP</th><th>Status</th></tr></thead>
        <tbody>
        <?php foreach ($loginHistory as $log): ?>
          <tr>
            <td><?= date('d M, H:i', strtotime($log['created_at'])) ?></td>
            <td><?= htmlspecialchars($log['ip_address']) ?></td>
            <td>
              <span class="badge badge-<?= $log['status'] === 'success' ? 'success' : ($log['status'] === 'locked' ? 'danger' : 'warning') ?>">
                <?= ucfirst($log['status']) ?>
              </span>
            </td>
          </tr>
        <?php endforeach; ?>
        <?php if (!$loginHistory): ?>
          <tr><td colspan="3" style="text-align:center;opacity:.6">No history yet</td></tr>
        <?php endif; ?>
        </tbody>
      </table>
    </div>

  </div><!-- .detail-grid -->

  <div class="dashboard-actions">
    <a href="profile_edit.php" class="btn btn-primary"><i class="fas fa-edit"></i> Edit Profile</a>
    <a href="change_password.php" class="btn btn-secondary"><i class="fas fa-key"></i> Change Password</a>
    <a href="logout.php" class="btn btn-danger"><i class="fas fa-sign-out-alt"></i> Logout</a>
  </div>

</div><!-- .dashboard-container -->
</body>
</html>
