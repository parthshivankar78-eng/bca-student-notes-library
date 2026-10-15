<?php
// ============================================================
// logout.php
// ============================================================
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';

if (session_status() === PHP_SESSION_NONE) session_start();
logout_user();
header('Location: login.php?msg=logged_out');
exit;
