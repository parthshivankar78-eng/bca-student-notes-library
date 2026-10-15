<?php
header('Content-Type: application/json; charset=UTF-8');
require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? '';
if (!$action && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $rawInput = file_get_contents('php://input');
    $postData = json_decode($rawInput, true);
    if (isset($postData['action'])) {
        $action = $postData['action'];
    }
}

// Client IP & User Agent helper
$clientIp = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
    $clientIp = trim($ips[0]);
}
$userAgent = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 500);

// Helper function to seed initial users if database is empty
function ensureInitialUsersSeeded($pdo, $clientIp, $userAgent) {
    try {
        $stmt = $pdo->query("SELECT COUNT(*) AS total FROM `users`");
        $count = (int)$stmt->fetchColumn();
        if ($count > 0) {
            return;
        }

        $now = date('Y-m-d H:i:s');
        $defaultUsers = [
            [
                'username' => 'admin',
                'password' => '123',
                'role' => 'admin',
                'full_name' => 'Prof. K. Verma',
                'email' => 'k.verma@sbjit.edu.in',
                'phone' => '+91 98230 11223',
                'student_id' => 'FAC-ADMIN-01',
                'department' => 'BCA & Computer Applications',
                'program' => 'Faculty / HOD',
                'current_grade' => 'HOD'
            ],
            [
                'username' => 'student',
                'password' => '123',
                'role' => 'student',
                'full_name' => 'Rahul Deshmukh',
                'email' => 'rahul.bcayear@sbjit.edu.in',
                'phone' => '+91 88888 12345',
                'student_id' => 'SBJ2026BCA001',
                'department' => 'BCA (Bachelor of Computer Applications)',
                'program' => 'BCA - Bachelor of Computer Applications',
                'current_grade' => 'Year 2 • Semester 3'
            ],
            [
                'username' => 'sneha',
                'password' => '123',
                'role' => 'student',
                'full_name' => 'Sneha Patel',
                'email' => 'sneha.bca1@sbjit.edu.in',
                'phone' => '+91 98765 22334',
                'student_id' => 'SBJ2026BCA042',
                'department' => 'BCA (Bachelor of Computer Applications)',
                'program' => 'BCA - Bachelor of Computer Applications',
                'current_grade' => 'Year 1 • Semester 2'
            ],
            [
                'username' => 'aman',
                'password' => '123',
                'role' => 'student',
                'full_name' => 'Aman Kumar',
                'email' => 'aman.bca3@sbjit.edu.in',
                'phone' => '+91 77665 44332',
                'student_id' => 'SBJ2026BCA089',
                'department' => 'BCA (Bachelor of Computer Applications)',
                'program' => 'BCA - Bachelor of Computer Applications',
                'current_grade' => 'Year 3 • Semester 5'
            ]
        ];

        foreach ($defaultUsers as $u) {
            $hash = password_hash($u['password'], PASSWORD_BCRYPT);
            $insertUser = $pdo->prepare("
                INSERT INTO `users` 
                (`full_name`, `email`, `username`, `password_hash`, `role`, `phone`, `is_active`, `is_verified`, `last_login`, `last_ip`, `created_at`, `updated_at`)
                VALUES (?, ?, ?, ?, ?, ?, 1, 1, ?, ?, ?, ?)
            ");
            $insertUser->execute([
                $u['full_name'],
                $u['email'],
                $u['username'],
                $hash,
                $u['role'],
                $u['phone'],
                $now,
                $clientIp,
                $now,
                $now
            ]);
            $newUserId = (int)$pdo->lastInsertId();

            if ($u['role'] === 'student') {
                $insertProf = $pdo->prepare("
                    INSERT INTO `student_profiles`
                    (`user_id`, `student_id`, `department`, `program`, `current_grade`, `updated_at`)
                    VALUES (?, ?, ?, ?, ?, ?)
                ");
                $insertProf->execute([
                    $newUserId,
                    $u['student_id'],
                    $u['department'],
                    $u['program'],
                    $u['current_grade'],
                    $now
                ]);
            }

            // Record initial login log
            $insertLog = $pdo->prepare("
                INSERT INTO `login_logs`
                (`user_id`, `identifier`, `ip_address`, `user_agent`, `status`, `created_at`)
                VALUES (?, ?, ?, ?, 'success', ?)
            ");
            $insertLog->execute([
                $newUserId,
                $u['username'],
                $clientIp,
                $userAgent,
                $now
            ]);
        }
    } catch (Exception $e) {
        error_log('Error seeding users: ' . $e->getMessage());
    }
}

// Ensure initial users are seeded in MySQL database
ensureInitialUsersSeeded($pdo, $clientIp, $userAgent);

// Helper to format user row for frontend
function formatUserOutput($row) {
    $role = ucfirst($row['role'] ?? 'Student');
    if ($row['role'] === 'admin') $role = 'Admin';
    if ($row['role'] === 'student') $role = 'Student';

    return [
        'id'          => (string)($row['id']),
        'db_id'       => (int)$row['id'],
        'username'    => $row['username'],
        'name'        => $row['full_name'],
        'email'       => $row['email'],
        'phone'       => $row['phone'] ?? '',
        'role'        => $role,
        'studentId'   => $row['student_id'] ?? ($role === 'Admin' ? 'FAC-' . $row['id'] : 'SBJ-' . $row['id']),
        'department'  => $row['department'] ?? ($role === 'Admin' ? 'BCA & Computer Applications' : 'BCA (Bachelor of Computer Applications)'),
        'semester'    => $row['current_grade'] ?? ($role === 'Admin' ? 'Faculty' : 'Year 1 • Semester 1'),
        'designation' => $role === 'Admin' ? ($row['current_grade'] ?: 'Faculty') : '',
        'joinedDate'  => !empty($row['created_at']) ? date('M Y', strtotime($row['created_at'])) : date('M Y')
    ];
}

switch ($action) {
    case 'get_users':
        try {
            $stmt = $pdo->query("
                SELECT u.*, sp.student_id, sp.department, sp.program, sp.current_grade 
                FROM `users` u
                LEFT JOIN `student_profiles` sp ON u.id = sp.user_id
                ORDER BY u.id ASC
            ");
            $users = [];
            while ($row = $stmt->fetch()) {
                $users[] = formatUserOutput($row);
            }
            echo json_encode(['success' => true, 'users' => $users]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;

    case 'register':
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true) ?: $_POST;

        $name = trim($data['name'] ?? '');
        $username = trim($data['username'] ?? '');
        $email = trim(strtolower($data['email'] ?? ''));
        $password = $data['password'] ?? '';
        $phone = trim($data['phone'] ?? '');
        $roleInput = strtolower(trim($data['role'] ?? 'student'));
        $role = ($roleInput === 'admin') ? 'admin' : 'student';

        $studentId = trim($data['studentId'] ?? ($data['facultyId'] ?? ''));
        $department = trim($data['department'] ?? 'BCA (Bachelor of Computer Applications)');
        $semester = trim($data['semester'] ?? ($data['designation'] ?? 'Year 1 • Semester 1'));

        if (!$name || !$username || !$email || !$password) {
            echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
            exit;
        }

        try {
            // Check if username or email exists in users table
            $checkStmt = $pdo->prepare("SELECT id FROM `users` WHERE `username` = ? OR `email` = ?");
            $checkStmt->execute([$username, $email]);
            if ($checkStmt->fetch()) {
                echo json_encode(['success' => false, 'message' => 'An account with this Username or Email is already registered.']);
                exit;
            }

            // Check if studentId exists in student_profiles
            if ($studentId && $role === 'student') {
                $checkIdStmt = $pdo->prepare("SELECT user_id FROM `student_profiles` WHERE `student_id` = ?");
                $checkIdStmt->execute([$studentId]);
                if ($checkIdStmt->fetch()) {
                    echo json_encode(['success' => false, 'message' => "An account with PRN / Student ID '$studentId' already exists."]);
                    exit;
                }
            }

            $passwordHash = password_hash($password, PASSWORD_BCRYPT);
            $now = date('Y-m-d H:i:s');

            $insertStmt = $pdo->prepare("
                INSERT INTO `users`
                (`full_name`, `email`, `username`, `password_hash`, `role`, `phone`, `is_active`, `is_verified`, `created_at`, `updated_at`, `last_login`, `last_ip`)
                VALUES (?, ?, ?, ?, ?, ?, 1, 1, ?, ?, ?, ?)
            ");
            $insertStmt->execute([
                $name,
                $email,
                $username,
                $passwordHash,
                $role,
                $phone,
                $now,
                $now,
                $now,
                $clientIp
            ]);
            $userId = (int)$pdo->lastInsertId();

            if ($role === 'student') {
                $profileStmt = $pdo->prepare("
                    INSERT INTO `student_profiles`
                    (`user_id`, `student_id`, `department`, `program`, `current_grade`, `updated_at`)
                    VALUES (?, ?, ?, ?, ?, ?)
                ");
                $profileStmt->execute([
                    $userId,
                    $studentId,
                    $department,
                    'BCA - Bachelor of Computer Applications',
                    $semester,
                    $now
                ]);
            }

            // Log registration as successful initial login in login_logs
            $logStmt = $pdo->prepare("
                INSERT INTO `login_logs`
                (`user_id`, `identifier`, `ip_address`, `user_agent`, `status`, `created_at`)
                VALUES (?, ?, ?, ?, 'success', ?)
            ");
            $logStmt->execute([
                $userId,
                $username,
                $clientIp,
                $userAgent,
                $now
            ]);

            // Retrieve newly inserted user
            $fetchStmt = $pdo->prepare("
                SELECT u.*, sp.student_id, sp.department, sp.program, sp.current_grade 
                FROM `users` u
                LEFT JOIN `student_profiles` sp ON u.id = sp.user_id
                WHERE u.id = ?
            ");
            $fetchStmt->execute([$userId]);
            $newUserRow = $fetchStmt->fetch();

            echo json_encode([
                'success' => true,
                'message' => 'Registration successful and saved in database!',
                'user'    => formatUserOutput($newUserRow)
            ]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        }
        break;

    case 'login':
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true) ?: $_POST;

        $identifier = trim($data['identifier'] ?? '');
        $password = $data['password'] ?? '';
        $requestedRole = strtolower(trim($data['role'] ?? 'student'));

        if (!$identifier || !$password) {
            echo json_encode(['success' => false, 'message' => 'Please enter username/email and password.']);
            exit;
        }

        try {
            // Find user by username, email, or student_id
            $query = "
                SELECT u.*, sp.student_id, sp.department, sp.program, sp.current_grade 
                FROM `users` u
                LEFT JOIN `student_profiles` sp ON u.id = sp.user_id
                WHERE (LOWER(u.username) = ? OR LOWER(u.email) = ? OR LOWER(sp.student_id) = ?)
                AND u.role = ?
                LIMIT 1
            ";
            $stmt = $pdo->prepare($query);
            $stmt->execute([strtolower($identifier), strtolower($identifier), strtolower($identifier), $requestedRole]);
            $userRow = $stmt->fetch();

            $now = date('Y-m-d H:i:s');

            if (!$userRow) {
                // Record failed login log
                $failLog = $pdo->prepare("
                    INSERT INTO `login_logs`
                    (`user_id`, `identifier`, `ip_address`, `user_agent`, `status`, `created_at`)
                    VALUES (NULL, ?, ?, ?, 'fail', ?)
                ");
                $failLog->execute([$identifier, $clientIp, $userAgent, $now]);

                echo json_encode(['success' => false, 'message' => "No registered " . ucfirst($requestedRole) . " account found with that identifier."]);
                exit;
            }

            // Verify password: support bcrypt hash or plain text fallback (e.g. 123)
            $passwordValid = false;
            if (password_verify($password, $userRow['password_hash'])) {
                $passwordValid = true;
            } elseif ($userRow['password_hash'] === $password) {
                // Upgrade plain text to bcrypt hash
                $passwordValid = true;
                $newHash = password_hash($password, PASSWORD_BCRYPT);
                $updateHash = $pdo->prepare("UPDATE `users` SET `password_hash` = ? WHERE `id` = ?");
                $updateHash->execute([$newHash, $userRow['id']]);
            }

            if (!$passwordValid) {
                // Record failed login
                $failLog = $pdo->prepare("
                    INSERT INTO `login_logs`
                    (`user_id`, `identifier`, `ip_address`, `user_agent`, `status`, `created_at`)
                    VALUES (?, ?, ?, ?, 'fail', ?)
                ");
                $failLog->execute([$userRow['id'], $identifier, $clientIp, $userAgent, $now]);

                echo json_encode(['success' => false, 'message' => 'Incorrect password. Please verify your credentials.']);
                exit;
            }

            // Successful login: update last_login and last_ip
            $updateLogin = $pdo->prepare("UPDATE `users` SET `last_login` = ?, `last_ip` = ? WHERE `id` = ?");
            $updateLogin->execute([$now, $clientIp, $userRow['id']]);

            // Record success in login_logs
            $successLog = $pdo->prepare("
                INSERT INTO `login_logs`
                (`user_id`, `identifier`, `ip_address`, `user_agent`, `status`, `created_at`)
                VALUES (?, ?, ?, ?, 'success', ?)
            ");
            $successLog->execute([$userRow['id'], $userRow['username'], $clientIp, $userAgent, $now]);

            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'user'    => formatUserOutput($userRow)
            ]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        }
        break;

    case 'checkin':
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true) ?: $_POST;

        $userId = !empty($data['user_id']) ? (int)$data['user_id'] : null;
        $username = trim($data['username'] ?? 'student');
        $now = date('Y-m-d H:i:s');

        try {
            $insertLog = $pdo->prepare("
                INSERT INTO `login_logs`
                (`user_id`, `identifier`, `ip_address`, `user_agent`, `status`, `created_at`)
                VALUES (?, ?, ?, ?, 'success', ?)
            ");
            $insertLog->execute([$userId, $username, $clientIp, $userAgent, $now]);

            if ($userId) {
                $upd = $pdo->prepare("UPDATE `users` SET `last_login` = ?, `last_ip` = ? WHERE `id` = ?");
                $upd->execute([$now, $clientIp, $userId]);
            }

            echo json_encode(['success' => true, 'message' => 'Check-in recorded in database!']);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;

    case 'delete_user':
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true) ?: $_POST;

        $userId = !empty($data['user_id']) ? (int)$data['user_id'] : 0;
        $username = trim($data['username'] ?? '');

        try {
            if (!$userId && $username) {
                $find = $pdo->prepare("SELECT id FROM `users` WHERE `username` = ?");
                $find->execute([$username]);
                $userId = (int)$find->fetchColumn();
            }

            if ($userId) {
                // Delete child records first
                $pdo->prepare("DELETE FROM `student_profiles` WHERE `user_id` = ?")->execute([$userId]);
                $pdo->prepare("DELETE FROM `remember_tokens` WHERE `user_id` = ?")->execute([$userId]);
                $pdo->prepare("DELETE FROM `login_logs` WHERE `user_id` = ?")->execute([$userId]);
                $pdo->prepare("DELETE FROM `users` WHERE `id` = ?")->execute([$userId]);

                echo json_encode(['success' => true, 'message' => "User ID $userId removed from database."]);
            } else {
                echo json_encode(['success' => false, 'message' => 'User not found.']);
            }
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;

    case 'get_login_logs':
        try {
            $stmt = $pdo->query("
                SELECT l.*, u.full_name, u.username, u.role
                FROM `login_logs` l
                LEFT JOIN `users` u ON l.user_id = u.id
                ORDER BY l.id DESC
                LIMIT 50
            ");
            $logs = $stmt->fetchAll();
            echo json_encode(['success' => true, 'logs' => $logs]);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
        break;

    default:
        echo json_encode([
            'status' => 'online',
            'database' => 'student_dashboard',
            'endpoints' => [
                'get_users'     => '?action=get_users',
                'register'      => '?action=register (POST)',
                'login'         => '?action=login (POST)',
                'checkin'       => '?action=checkin (POST)',
                'delete_user'   => '?action=delete_user (POST)',
                'get_login_logs'=> '?action=get_login_logs'
            ]
        ]);
        break;
}
