<?php
@unlink(__DIR__ . '/test_db.php');
@unlink(__DIR__ . '/fix_schema.php');
@unlink(__DIR__ . '/cleanup.php');
echo json_encode(['cleaned' => true]);
