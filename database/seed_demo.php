<?php
// ============================================================
// database/seed_demo.php
// Run once:  http://localhost/student_dashboard/database/seed_demo.php
// Seeds demo subjects, enrolments, attendance & marks for
// every student already in the users table.
// ============================================================

require_once __DIR__ . '/../config/database.php';

$pdo = getDB();

// ── Demo subjects ──────────────────────────────────────────
$subjects = [
    ['CS101', 'Mathematics I',              4, 'Science'],
    ['CS102', 'Physics',                    3, 'Science'],
    ['CS103', 'Programming Fundamentals',   4, 'Computer Science'],
    ['CS104', 'English Communication',      2, 'Humanities'],
    ['CS105', 'Data Structures',            3, 'Computer Science'],
    ['CS106', 'Digital Electronics',        3, 'Electronics'],
];

foreach ($subjects as [$code, $name, $credits, $dept]) {
    $pdo->prepare(
        'INSERT IGNORE INTO subjects (code,name,credits,department) VALUES (?,?,?,?)'
    )->execute([$code, $name, $credits, $dept]);
}

// Fetch subject IDs
$allSubjects = $pdo->query('SELECT id, name FROM subjects')->fetchAll();

// ── Fetch all students ─────────────────────────────────────
$students = $pdo->query("SELECT id FROM users WHERE role='student'")->fetchAll();

if (empty($students)) {
    die('No students found. Register at least one student first, then run this seeder.');
}

$semester = 'Sem-1';
$year     = date('Y');

foreach ($students as $student) {
    $sid = $student['id'];

    // Enrol in all subjects
    foreach ($allSubjects as $sub) {
        $pdo->prepare(
            'INSERT IGNORE INTO enrolments (student_id,subject_id,semester,year) VALUES (?,?,?,?)'
        )->execute([$sid, $sub['id'], $semester, $year]);
    }

    // ── Attendance: last 60 school days per subject ────────
    // Generate 60 past weekdays
    $dates = [];
    $d     = new DateTime();
    while (count($dates) < 60) {
        $d->modify('-1 day');
        if ((int)$d->format('N') <= 5) {  // Mon–Fri
            $dates[] = $d->format('Y-m-d');
        }
    }

    foreach ($allSubjects as $sub) {
        // Each subject has class ~4 days/week, pick 48 of 60 days
        $classDays = array_slice($dates, 0, 48);
        foreach ($classDays as $date) {
            $rand   = mt_rand(1, 100);
            $status = $rand <= 78 ? 'present'
                    : ($rand <= 88 ? 'late'
                    : ($rand <= 95 ? 'excused' : 'absent'));

            $pdo->prepare(
                'INSERT IGNORE INTO attendance (student_id,subject_id,class_date,status)
                 VALUES (?,?,?,?)'
            )->execute([$sid, $sub['id'], $date, $status]);
        }
    }

    // ── Assessments & Marks ────────────────────────────────
    $assessmentTypes = [
        ['Mid-Term Exam',      'exam',       100],
        ['Assignment 1',       'assignment',  20],
        ['Assignment 2',       'assignment',  20],
        ['Quiz 1',             'quiz',        10],
        ['Lab Practice',       'lab',         50],
        ['Final Exam',         'exam',       100],
        ['Project',            'project',     50],
    ];

    foreach ($allSubjects as $sub) {
        foreach ($assessmentTypes as [$title, $type, $maxMarks]) {
            // Create assessment if not exists
            $check = $pdo->prepare(
                'SELECT id FROM assessments WHERE subject_id=? AND title=? AND semester=? AND year=? LIMIT 1'
            );
            $check->execute([$sub['id'], $title, $semester, $year]);
            $aRow = $check->fetch();

            if (!$aRow) {
                $pdo->prepare(
                    'INSERT INTO assessments (subject_id,title,type,max_marks,semester,year)
                     VALUES (?,?,?,?,?,?)'
                )->execute([$sub['id'], $title, $type, $maxMarks, $semester, $year]);
                $aId = (int)$pdo->lastInsertId();
            } else {
                $aId = (int)$aRow['id'];
            }

            // Realistic random mark 45–98% of max
            $pct     = mt_rand(45, 98) / 100;
            $obtained = round($maxMarks * $pct, 2);
            $grade   = gradeFromPercent($pct * 100);

            $pdo->prepare(
                'INSERT IGNORE INTO marks (student_id,assessment_id,marks_obtained,grade)
                 VALUES (?,?,?,?)'
            )->execute([$sid, $aId, $obtained, $grade]);
        }
    }

    // ── Low-attendance notification ────────────────────────
    $pdo->prepare(
        'INSERT IGNORE INTO notifications (user_id,title,body,type) VALUES
         (?,?,?,?)'
    )->execute([
        $sid,
        'Welcome to Student Dashboard!',
        'Your attendance and performance data has been loaded. Keep tracking your progress!',
        'success'
    ]);
}

function gradeFromPercent(float $pct): string {
    return $pct >= 90 ? 'A+'
         : ($pct >= 80 ? 'A'
         : ($pct >= 70 ? 'B'
         : ($pct >= 60 ? 'C'
         : ($pct >= 50 ? 'D' : 'F'))));
}

echo '<h2 style="font-family:sans-serif;color:green">✅ Demo data seeded successfully!</h2>';
echo '<p style="font-family:sans-serif">Now open <a href="../login.php">login.php</a> and sign in as a student.</p>';
echo '<p style="font-family:sans-serif"><strong>Delete this file after seeding!</strong></p>';
