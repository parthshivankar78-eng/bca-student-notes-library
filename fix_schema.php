<?php
require_once __DIR__ . '/db.php';

try {
    $pdo->exec("ALTER TABLE `student_profiles` MODIFY `current_grade` VARCHAR(60) NULL");
    // Update the values to full strings
    $pdo->prepare("UPDATE `student_profiles` SET `current_grade` = ? WHERE `student_id` = 'SBJ2026BCA001'")->execute(['Year 2 • Semester 3']);
    $pdo->prepare("UPDATE `student_profiles` SET `current_grade` = ? WHERE `student_id` = 'SBJ2026BCA042'")->execute(['Year 1 • Semester 2']);
    $pdo->prepare("UPDATE `student_profiles` SET `current_grade` = ? WHERE `student_id` = 'SBJ2026BCA089'")->execute(['Year 3 • Semester 5']);
    
    // Also check login_logs count
    $logsCount = $pdo->query("SELECT COUNT(*) FROM `login_logs`")->fetchColumn();
    $usersCount = $pdo->query("SELECT COUNT(*) FROM `users`")->fetchColumn();
    $profCount = $pdo->query("SELECT COUNT(*) FROM `student_profiles`")->fetchColumn();

    echo json_encode([
        'status' => 'success',
        'users_count' => $usersCount,
        'profiles_count' => $profCount,
        'logs_count' => $logsCount
    ]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
