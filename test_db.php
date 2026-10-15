<?php
header('Content-Type: application/json');

$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'student_dashboard';

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo json_encode(['error' => 'Connection failed: ' . $conn->connect_error]);
    exit;
}

$tables = ['users', 'student_profiles', 'remember_tokens', 'login_logs'];
$schema = [];

foreach ($tables as $t) {
    $res = $conn->query("DESCRIBE `$t`");
    if ($res) {
        $cols = [];
        while ($row = $res->fetch_assoc()) {
            $cols[] = $row;
        }
        $schema[$t] = $cols;
    } else {
        $schema[$t] = 'Error: ' . $conn->error;
    }
}

echo json_encode(['status' => 'connected', 'schema' => $schema], JSON_PRETTY_PRINT);
