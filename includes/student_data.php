<?php
// ============================================================
// includes/student_data.php
// All DB-query helpers for the student dashboard
// ============================================================

require_once __DIR__ . '/../config/database.php';

// ============================================================
// ATTENDANCE
// ============================================================

/**
 * Overall attendance summary for a student.
 * Returns: [ total, present, absent, late, excused, percentage ]
 */
function get_overall_attendance(int $student_id): array
{
    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'SELECT
            COUNT(*)                                    AS total,
            SUM(status = "present")                     AS present,
            SUM(status = "absent")                      AS absent,
            SUM(status = "late")                        AS late,
            SUM(status = "excused")                     AS excused
         FROM attendance
         WHERE student_id = ?'
    );
    $stmt->execute([$student_id]);
    $r = $stmt->fetch();

    $effective = ($r['present'] + $r['late'] + $r['excused']);
    $r['percentage'] = $r['total'] > 0
        ? round(($effective / $r['total']) * 100, 1)
        : 0;

    return $r;
}

/**
 * Subject-wise attendance for a student.
 */
function get_subject_attendance(int $student_id): array
{
    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'SELECT
            s.id,
            s.name,
            s.code,
            s.credits,
            COUNT(a.id)                       AS total,
            SUM(a.status = "present")         AS present,
            SUM(a.status = "absent")          AS absent,
            SUM(a.status = "late")            AS late,
            SUM(a.status = "excused")         AS excused
         FROM subjects s
         JOIN enrolments e  ON e.subject_id = s.id AND e.student_id = ?
         LEFT JOIN attendance a ON a.subject_id = s.id AND a.student_id = ?
         GROUP BY s.id, s.name, s.code, s.credits
         ORDER BY s.name'
    );
    $stmt->execute([$student_id, $student_id]);
    $rows = $stmt->fetchAll();

    foreach ($rows as &$r) {
        $effective = ($r['present'] + $r['late'] + $r['excused']);
        $r['percentage'] = $r['total'] > 0
            ? round(($effective / $r['total']) * 100, 1)
            : 0;
        $r['status_class'] = $r['percentage'] >= 75 ? 'good'
                           : ($r['percentage'] >= 60 ? 'warn' : 'danger');
    }
    return $rows;
}

/**
 * Monthly attendance trend (last 6 months).
 */
function get_monthly_attendance_trend(int $student_id): array
{
    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'SELECT
            DATE_FORMAT(class_date, "%b %Y")        AS month_label,
            DATE_FORMAT(class_date, "%Y-%m")        AS month_key,
            COUNT(*)                                AS total,
            SUM(status IN ("present","late","excused")) AS attended
         FROM attendance
         WHERE student_id = ?
           AND class_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
         GROUP BY month_key, month_label
         ORDER BY month_key ASC'
    );
    $stmt->execute([$student_id]);
    $rows = $stmt->fetchAll();

    foreach ($rows as &$r) {
        $r['percentage'] = $r['total'] > 0
            ? round(($r['attended'] / $r['total']) * 100, 1)
            : 0;
    }
    return $rows;
}

/**
 * Recent 10 attendance records for a student.
 */
function get_recent_attendance(int $student_id, int $limit = 10): array
{
    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'SELECT a.class_date, a.status, a.notes, s.name AS subject_name, s.code
         FROM attendance a
         JOIN subjects s ON s.id = a.subject_id
         WHERE a.student_id = ?
         ORDER BY a.class_date DESC, s.name ASC
         LIMIT ' . (int)$limit
    );
    $stmt->execute([$student_id]);
    return $stmt->fetchAll();
}

// ============================================================
// PERFORMANCE / MARKS
// ============================================================

/**
 * Subject-wise performance summary.
 */
function get_subject_performance(int $student_id): array
{
    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'SELECT
            s.id,
            s.name,
            s.code,
            s.credits,
            COUNT(m.id)                                     AS total_assessments,
            SUM(m.marks_obtained)                           AS marks_obtained,
            SUM(a2.max_marks)                               AS max_marks,
            ROUND(SUM(m.marks_obtained)/SUM(a2.max_marks)*100, 1) AS percentage
         FROM subjects s
         JOIN enrolments e   ON e.subject_id = s.id AND e.student_id = ?
         LEFT JOIN assessments a2 ON a2.subject_id = s.id
         LEFT JOIN marks m        ON m.assessment_id = a2.id AND m.student_id = ?
         GROUP BY s.id, s.name, s.code, s.credits
         ORDER BY s.name'
    );
    $stmt->execute([$student_id, $student_id]);
    $rows = $stmt->fetchAll();

    foreach ($rows as &$r) {
        $r['percentage']  = $r['percentage'] ?? 0;
        $r['grade']       = grade_from_percent((float)$r['percentage']);
        $r['status_class'] = $r['percentage'] >= 75 ? 'good'
                           : ($r['percentage'] >= 50 ? 'warn' : 'danger');
    }
    return $rows;
}

/**
 * Assessment-wise marks for a student per subject.
 */
function get_assessment_marks(int $student_id): array
{
    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'SELECT
            s.name  AS subject_name,
            s.code,
            a2.title,
            a2.type,
            a2.max_marks,
            m.marks_obtained,
            m.grade,
            m.graded_at,
            ROUND(m.marks_obtained / a2.max_marks * 100, 1) AS percentage
         FROM marks m
         JOIN assessments a2 ON a2.id = m.assessment_id
         JOIN subjects s     ON s.id  = a2.subject_id
         WHERE m.student_id = ?
         ORDER BY s.name, a2.type, a2.title'
    );
    $stmt->execute([$student_id]);
    return $stmt->fetchAll();
}

/**
 * Overall GPA-like percentage.
 */
function get_overall_performance(int $student_id): array
{
    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'SELECT
            COUNT(m.id)                                        AS total_assessments,
            COALESCE(SUM(m.marks_obtained), 0)                 AS total_obtained,
            COALESCE(SUM(a2.max_marks), 0)                     AS total_max,
            COALESCE(ROUND(SUM(m.marks_obtained)/NULLIF(SUM(a2.max_marks),0)*100, 1), 0) AS percentage
         FROM marks m
         JOIN assessments a2 ON a2.id = m.assessment_id
         WHERE m.student_id = ?'
    );
    $stmt->execute([$student_id]);
    $r = $stmt->fetch();
    $r['grade'] = grade_from_percent((float)$r['percentage']);
    return $r;
}

/**
 * Performance trend by assessment type.
 */
function get_performance_by_type(int $student_id): array
{
    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'SELECT
            a2.type,
            COUNT(m.id)                                             AS count,
            ROUND(AVG(m.marks_obtained / a2.max_marks * 100), 1)   AS avg_pct
         FROM marks m
         JOIN assessments a2 ON a2.id = m.assessment_id
         WHERE m.student_id = ?
         GROUP BY a2.type
         ORDER BY a2.type'
    );
    $stmt->execute([$student_id]);
    return $stmt->fetchAll();
}

// ============================================================
// NOTIFICATIONS
// ============================================================

function get_notifications(int $user_id, int $limit = 8): array
{
    $pdo  = getDB();
    $stmt = $pdo->prepare(
        'SELECT * FROM notifications WHERE user_id = ?
         ORDER BY created_at DESC LIMIT ' . (int)$limit
    );
    $stmt->execute([$user_id]);
    return $stmt->fetchAll();
}

function mark_notifications_read(int $user_id): void
{
    getDB()->prepare('UPDATE notifications SET is_read=1 WHERE user_id=?')
           ->execute([$user_id]);
}

function get_unread_count(int $user_id): int
{
    $stmt = getDB()->prepare(
        'SELECT COUNT(*) FROM notifications WHERE user_id=? AND is_read=0'
    );
    $stmt->execute([$user_id]);
    return (int)$stmt->fetchColumn();
}

// ============================================================
// HELPERS
// ============================================================

function grade_from_percent(float $pct): string
{
    return $pct >= 90 ? 'A+'
         : ($pct >= 80 ? 'A'
         : ($pct >= 70 ? 'B'
         : ($pct >= 60 ? 'C'
         : ($pct >= 50 ? 'D' : 'F'))));
}

function attendance_status_badge(string $status): string
{
    $map = [
        'present' => ['success', 'check-circle',  'Present'],
        'absent'  => ['danger',  'times-circle',  'Absent'],
        'late'    => ['warning', 'clock',          'Late'],
        'excused' => ['info',    'info-circle',    'Excused'],
    ];
    $b = $map[$status] ?? ['secondary', 'circle', ucfirst($status)];
    return '<span class="badge badge-' . $b[0] . '"><i class="fas fa-' . $b[1] . '"></i> ' . $b[2] . '</span>';
}
