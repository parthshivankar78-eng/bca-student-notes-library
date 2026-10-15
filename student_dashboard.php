<?php
// ============================================================
// student_dashboard.php  –  Personalized Student Dashboard
// Each student sees ONLY their own data, keyed to their email
// ============================================================

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/student_data.php';

if (session_status() === PHP_SESSION_NONE) session_start();
require_login();

// Only students access this page
if ($_SESSION['role'] !== 'student') {
    header('Location: dashboard.php');
    exit;
}

$uid = (int)$_SESSION['user_id'];

// ── Fetch full user + student profile ──────────────────────
$pdo  = getDB();
$stmt = $pdo->prepare(
    'SELECT u.*, sp.student_id, sp.department, sp.program,
            sp.enrollment_year, sp.current_grade
     FROM users u
     LEFT JOIN student_profiles sp ON sp.user_id = u.id
     WHERE u.id = ? LIMIT 1'
);
$stmt->execute([$uid]);
$user = $stmt->fetch();

// ── Analytics data ──────────────────────────────────────────
$overallAtt     = get_overall_attendance($uid);
$subjectAtt     = get_subject_attendance($uid);
$monthlyTrend   = get_monthly_attendance_trend($uid);
$recentAtt      = get_recent_attendance($uid, 10);
$overallPerf    = get_overall_performance($uid);
$subjectPerf    = get_subject_performance($uid);
$assessmentMrks = get_assessment_marks($uid);
$perfByType     = get_performance_by_type($uid);
$notifications  = get_notifications($uid, 6);
$unreadCount    = get_unread_count($uid);

// Mark notifications read after fetching count
mark_notifications_read($uid);

// ── Build chart data ────────────────────────────────────────
$chartMonths    = array_column($monthlyTrend, 'month_label');
$chartAttPct    = array_column($monthlyTrend, 'percentage');
$chartSubNames  = array_column($subjectAtt, 'name');
$chartSubAttPct = array_column($subjectAtt, 'percentage');
$chartSubPerfPct= array_column($subjectPerf, 'percentage');
$chartTypeLabels= array_column($perfByType, 'type');
$chartTypeAvg   = array_column($perfByType, 'avg_pct');

// Group assessment marks by subject for radar/bar
$marksBySubject = [];
foreach ($assessmentMrks as $m) {
    $marksBySubject[$m['subject_name']][] = $m;
}

$attPct = (float)$overallAtt['percentage'];
$attColor = $attPct >= 75 ? '#10b981' : ($attPct >= 60 ? '#f59e0b' : '#ef4444');
$perfPct  = (float)$overallPerf['percentage'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>My Dashboard – <?= htmlspecialchars($user['full_name']) ?></title>
<link rel="stylesheet" href="assets/css/auth.css">
<link rel="stylesheet" href="assets/css/student_dashboard.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
</head>
<body class="sd-body">

<!-- ══════════════════════════════════════════════════════════
     TOP NAVIGATION
═══════════════════════════════════════════════════════════ -->
<nav class="sd-nav">
  <div class="sd-nav-brand">
    <i class="fas fa-graduation-cap"></i>
    <span>Student Portal</span>
  </div>

  <div class="sd-nav-tabs">
    <a href="#overview"    class="sd-nav-tab active" data-target="overview">
      <i class="fas fa-th-large"></i> Overview
    </a>
    <a href="#attendance"  class="sd-nav-tab" data-target="attendance">
      <i class="fas fa-calendar-check"></i> Attendance
    </a>
    <a href="#performance" class="sd-nav-tab" data-target="performance">
      <i class="fas fa-chart-line"></i> Performance
    </a>
    <a href="#marks"       class="sd-nav-tab" data-target="marks">
      <i class="fas fa-star"></i> Marks
    </a>
  </div>

  <div class="sd-nav-right">
    <!-- Notification bell -->
    <div class="notif-bell" id="notifBell">
      <i class="fas fa-bell"></i>
      <?php if ($unreadCount > 0): ?>
      <span class="notif-dot"><?= $unreadCount ?></span>
      <?php endif; ?>
    </div>

    <div class="sd-user-pill">
      <i class="fas fa-user-circle"></i>
      <span class="sd-user-name"><?= htmlspecialchars($user['username']) ?></span>
    </div>
    <a href="logout.php" class="btn-logout"><i class="fas fa-sign-out-alt"></i> Logout</a>
  </div>
</nav>

<!-- Notification dropdown -->
<div class="notif-panel" id="notifPanel">
  <div class="notif-panel-header"><i class="fas fa-bell"></i> Notifications</div>
  <?php if ($notifications): ?>
    <?php foreach ($notifications as $n): ?>
    <div class="notif-item notif-<?= $n['type'] ?>">
      <strong><?= htmlspecialchars($n['title']) ?></strong>
      <span><?= htmlspecialchars($n['body'] ?? '') ?></span>
      <small><?= date('d M, H:i', strtotime($n['created_at'])) ?></small>
    </div>
    <?php endforeach; ?>
  <?php else: ?>
    <div class="notif-empty">No notifications</div>
  <?php endif; ?>
</div>

<!-- ══════════════════════════════════════════════════════════
     STUDENT IDENTITY BANNER
═══════════════════════════════════════════════════════════ -->
<div class="sd-identity-banner">
  <div class="sd-identity-avatar">
    <i class="fas fa-user-graduate"></i>
  </div>
  <div class="sd-identity-info">
    <h1><?= htmlspecialchars($user['full_name']) ?></h1>
    <div class="sd-identity-meta">
      <span><i class="fas fa-envelope"></i> <?= htmlspecialchars($user['email']) ?></span>
      <span><i class="fas fa-id-badge"></i> <?= htmlspecialchars($user['student_id'] ?? 'N/A') ?></span>
      <span><i class="fas fa-building"></i> <?= htmlspecialchars($user['department'] ?? 'Not set') ?></span>
      <span><i class="fas fa-book-open"></i> <?= htmlspecialchars($user['program'] ?? 'Not set') ?></span>
      <span><i class="fas fa-calendar"></i> Enrolled <?= htmlspecialchars($user['enrollment_year'] ?? '—') ?></span>
    </div>
  </div>
  <div class="sd-identity-scores">
    <!-- Attendance ring -->
    <div class="score-ring">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" class="ring-bg"/>
        <circle cx="50" cy="50" r="40" class="ring-fill"
          stroke="<?= $attColor ?>"
          stroke-dasharray="<?= round($attPct * 2.513, 1) ?> 251.3"/>
      </svg>
      <div class="ring-label">
        <span class="ring-val"><?= $attPct ?>%</span>
        <small>Attendance</small>
      </div>
    </div>
    <!-- Performance ring -->
    <div class="score-ring">
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" class="ring-bg"/>
        <circle cx="50" cy="50" r="40" class="ring-fill"
          stroke="#4f46e5"
          stroke-dasharray="<?= round($perfPct * 2.513, 1) ?> 251.3"/>
      </svg>
      <div class="ring-label">
        <span class="ring-val"><?= $perfPct ?>%</span>
        <small>Performance</small>
      </div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════════════════════
     MAIN CONTENT SECTIONS
═══════════════════════════════════════════════════════════ -->
<div class="sd-container">

  <!-- ──────────────────────────────────────────────────────
       SECTION: OVERVIEW
  ────────────────────────────────────────────────────────── -->
  <section id="overview" class="sd-section active">

    <!-- KPI cards row -->
    <div class="kpi-grid">
      <div class="kpi-card kpi-purple">
        <div class="kpi-icon"><i class="fas fa-calendar-check"></i></div>
        <div class="kpi-data">
          <span class="kpi-val"><?= $overallAtt['percentage'] ?>%</span>
          <span class="kpi-label">Overall Attendance</span>
        </div>
        <div class="kpi-sub"><?= $overallAtt['present'] ?> / <?= $overallAtt['total'] ?> classes</div>
      </div>

      <div class="kpi-card kpi-blue">
        <div class="kpi-icon"><i class="fas fa-chart-bar"></i></div>
        <div class="kpi-data">
          <span class="kpi-val"><?= $overallPerf['percentage'] ?>%</span>
          <span class="kpi-label">Overall Performance</span>
        </div>
        <div class="kpi-sub">Grade: <?= $overallPerf['grade'] ?></div>
      </div>

      <div class="kpi-card kpi-green">
        <div class="kpi-icon"><i class="fas fa-book"></i></div>
        <div class="kpi-data">
          <span class="kpi-val"><?= count($subjectAtt) ?></span>
          <span class="kpi-label">Subjects Enrolled</span>
        </div>
        <div class="kpi-sub"><?= $overallPerf['total_assessments'] ?> assessments</div>
      </div>

      <div class="kpi-card kpi-red">
        <div class="kpi-icon"><i class="fas fa-times-circle"></i></div>
        <div class="kpi-data">
          <span class="kpi-val"><?= $overallAtt['absent'] ?></span>
          <span class="kpi-label">Total Absences</span>
        </div>
        <div class="kpi-sub"><?= $overallAtt['late'] ?> late | <?= $overallAtt['excused'] ?> excused</div>
      </div>
    </div>

    <!-- Charts row -->
    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-card-header">
          <i class="fas fa-chart-line"></i> Attendance Trend (Last 6 Months)
        </div>
        <div class="chart-body">
          <canvas id="chartAttTrend"></canvas>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card-header">
          <i class="fas fa-chart-radar"></i> Subject-wise Performance vs Attendance
        </div>
        <div class="chart-body">
          <canvas id="chartSubCompare"></canvas>
        </div>
      </div>
    </div>

    <!-- Quick subject table -->
    <div class="sd-card mt-20">
      <div class="sd-card-header">
        <i class="fas fa-table"></i> Quick Subject Summary
      </div>
      <div class="table-wrap">
        <table class="sd-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Attendance %</th>
              <th>Performance %</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          <?php
          $perfMap = array_column($subjectPerf, null, 'id');
          foreach ($subjectAtt as $s):
            $perf = $perfMap[$s['id']] ?? null;
          ?>
            <tr>
              <td>
                <strong><?= htmlspecialchars($s['code']) ?></strong><br>
                <small><?= htmlspecialchars($s['name']) ?></small>
              </td>
              <td>
                <div class="mini-bar-wrap">
                  <div class="mini-bar <?= $s['status_class'] ?>"
                       style="width:<?= $s['percentage'] ?>%"></div>
                </div>
                <span class="bar-label"><?= $s['percentage'] ?>%</span>
              </td>
              <td>
                <?php if ($perf): ?>
                <div class="mini-bar-wrap">
                  <div class="mini-bar <?= $perf['status_class'] ?>"
                       style="width:<?= $perf['percentage'] ?>%"></div>
                </div>
                <span class="bar-label"><?= $perf['percentage'] ?>%</span>
                <?php else: ?>—<?php endif; ?>
              </td>
              <td>
                <span class="grade-badge grade-<?= strtolower(str_replace('+','p', $perf['grade'] ?? 'f')) ?>">
                  <?= $perf['grade'] ?? '—' ?>
                </span>
              </td>
              <td>
                <?php if ($s['percentage'] >= 75): ?>
                  <span class="badge badge-success"><i class="fas fa-check"></i> Good</span>
                <?php elseif ($s['percentage'] >= 60): ?>
                  <span class="badge badge-warning"><i class="fas fa-exclamation"></i> Warning</span>
                <?php else: ?>
                  <span class="badge badge-danger"><i class="fas fa-times"></i> Critical</span>
                <?php endif; ?>
              </td>
            </tr>
          <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>

  </section>


  <!-- ──────────────────────────────────────────────────────
       SECTION: ATTENDANCE
  ────────────────────────────────────────────────────────── -->
  <section id="attendance" class="sd-section">

    <!-- Attendance KPI cards -->
    <div class="kpi-grid kpi-grid-5">
      <div class="kpi-card kpi-blue">
        <div class="kpi-icon"><i class="fas fa-calendar-alt"></i></div>
        <div class="kpi-data"><span class="kpi-val"><?= $overallAtt['total'] ?></span>
          <span class="kpi-label">Total Classes</span></div>
      </div>
      <div class="kpi-card kpi-green">
        <div class="kpi-icon"><i class="fas fa-check-circle"></i></div>
        <div class="kpi-data"><span class="kpi-val"><?= $overallAtt['present'] ?></span>
          <span class="kpi-label">Present</span></div>
      </div>
      <div class="kpi-card kpi-red">
        <div class="kpi-icon"><i class="fas fa-times-circle"></i></div>
        <div class="kpi-data"><span class="kpi-val"><?= $overallAtt['absent'] ?></span>
          <span class="kpi-label">Absent</span></div>
      </div>
      <div class="kpi-card kpi-yellow">
        <div class="kpi-icon"><i class="fas fa-clock"></i></div>
        <div class="kpi-data"><span class="kpi-val"><?= $overallAtt['late'] ?></span>
          <span class="kpi-label">Late</span></div>
      </div>
      <div class="kpi-card kpi-purple">
        <div class="kpi-icon"><i class="fas fa-info-circle"></i></div>
        <div class="kpi-data"><span class="kpi-val"><?= $overallAtt['excused'] ?></span>
          <span class="kpi-label">Excused</span></div>
      </div>
    </div>

    <!-- Monthly trend chart -->
    <div class="charts-row">
      <div class="chart-card chart-card--wide">
        <div class="chart-card-header">
          <i class="fas fa-chart-area"></i> Monthly Attendance % (Last 6 Months)
        </div>
        <div class="chart-body chart-body--tall">
          <canvas id="chartMonthlyAtt"></canvas>
        </div>
      </div>

      <div class="chart-card">
        <div class="chart-card-header">
          <i class="fas fa-chart-pie"></i> Attendance Breakdown
        </div>
        <div class="chart-body">
          <canvas id="chartAttBreakdown"></canvas>
        </div>
      </div>
    </div>

    <!-- Subject-wise attendance detail -->
    <div class="sd-card mt-20">
      <div class="sd-card-header">
        <i class="fas fa-book-reader"></i> Subject-wise Attendance Detail
      </div>
      <div class="att-subject-grid">
        <?php foreach ($subjectAtt as $s): ?>
        <div class="att-subj-card <?= $s['status_class'] ?>">
          <div class="att-subj-top">
            <div>
              <span class="att-subj-code"><?= htmlspecialchars($s['code']) ?></span>
              <span class="att-subj-name"><?= htmlspecialchars($s['name']) ?></span>
            </div>
            <div class="att-subj-pct"><?= $s['percentage'] ?>%</div>
          </div>
          <div class="att-subj-bar">
            <div class="att-subj-fill <?= $s['status_class'] ?>"
                 style="width:<?= $s['percentage'] ?>%"></div>
          </div>
          <div class="att-subj-stats">
            <span><i class="fas fa-check" style="color:#10b981"></i> <?= $s['present'] ?> Present</span>
            <span><i class="fas fa-times" style="color:#ef4444"></i> <?= $s['absent'] ?> Absent</span>
            <span><i class="fas fa-clock" style="color:#f59e0b"></i> <?= $s['late'] ?> Late</span>
          </div>
          <?php if ($s['percentage'] < 75): ?>
          <div class="att-alert">
            <i class="fas fa-exclamation-triangle"></i>
            <?php
              $need = 0;
              if ($s['total'] > 0 && $s['percentage'] < 75) {
                  // classes needed: ceil((0.75*T - A)/(1-0.75)) where T=total, A=attended
                  $att   = $s['present'] + $s['late'] + $s['excused'];
                  $extra = (int)ceil((0.75 * $s['total'] - $att) / 0.25);
                  $need  = max(0, $extra);
              }
            ?>
            Need <?= $need ?> more class(es) to reach 75%
          </div>
          <?php endif; ?>
        </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Recent attendance log -->
    <div class="sd-card mt-20">
      <div class="sd-card-header">
        <i class="fas fa-list"></i> Recent Attendance Log
      </div>
      <div class="table-wrap">
        <table class="sd-table">
          <thead>
            <tr><th>Date</th><th>Subject</th><th>Status</th><th>Notes</th></tr>
          </thead>
          <tbody>
          <?php foreach ($recentAtt as $r): ?>
            <tr>
              <td><?= date('d M Y (D)', strtotime($r['class_date'])) ?></td>
              <td><strong><?= htmlspecialchars($r['code']) ?></strong> – <?= htmlspecialchars($r['subject_name']) ?></td>
              <td><?= attendance_status_badge($r['status']) ?></td>
              <td><?= htmlspecialchars($r['notes'] ?? '—') ?></td>
            </tr>
          <?php endforeach; ?>
          <?php if (!$recentAtt): ?>
            <tr><td colspan="4" class="empty-cell">No attendance records yet.</td></tr>
          <?php endif; ?>
          </tbody>
        </table>
      </div>
    </div>

  </section>


  <!-- ──────────────────────────────────────────────────────
       SECTION: PERFORMANCE
  ────────────────────────────────────────────────────────── -->
  <section id="performance" class="sd-section">

    <!-- Overall performance banner -->
    <div class="perf-banner">
      <div class="perf-banner-left">
        <div class="overall-grade grade-<?= strtolower(str_replace('+','p', $overallPerf['grade'])) ?>">
          <?= $overallPerf['grade'] ?>
        </div>
        <div>
          <h2><?= $overallPerf['percentage'] ?>% Overall Score</h2>
          <p><?= $overallPerf['total_obtained'] ?> / <?= $overallPerf['total_max'] ?> marks across all subjects</p>
        </div>
      </div>
      <div class="perf-banner-right">
        <?php foreach ($perfByType as $t): ?>
        <div class="type-stat">
          <span><?= ucfirst($t['type']) ?></span>
          <strong><?= $t['avg_pct'] ?>%</strong>
        </div>
        <?php endforeach; ?>
      </div>
    </div>

    <!-- Charts -->
    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-card-header">
          <i class="fas fa-chart-bar"></i> Subject Performance %
        </div>
        <div class="chart-body">
          <canvas id="chartSubPerf"></canvas>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-card-header">
          <i class="fas fa-chart-pie"></i> Performance by Assessment Type
        </div>
        <div class="chart-body">
          <canvas id="chartPerfType"></canvas>
        </div>
      </div>
    </div>

    <!-- Subject performance cards -->
    <div class="perf-card-grid mt-20">
      <?php foreach ($subjectPerf as $s): ?>
      <div class="perf-subject-card">
        <div class="perf-subj-header">
          <div>
            <span class="perf-code"><?= htmlspecialchars($s['code']) ?></span>
            <span class="perf-name"><?= htmlspecialchars($s['name']) ?></span>
          </div>
          <span class="grade-badge grade-<?= strtolower(str_replace('+','p', $s['grade'])) ?>">
            <?= $s['grade'] ?>
          </span>
        </div>
        <div class="perf-pct"><?= $s['percentage'] ?>%</div>
        <div class="perf-bar-wrap">
          <div class="perf-bar <?= $s['status_class'] ?>" style="width:<?= $s['percentage'] ?>%"></div>
        </div>
        <div class="perf-meta">
          <span><?= $s['marks_obtained'] ?> / <?= $s['max_marks'] ?> marks</span>
          <span><?= $s['total_assessments'] ?> assessments</span>
          <span><?= $s['credits'] ?> credits</span>
        </div>
      </div>
      <?php endforeach; ?>
    </div>

  </section>


  <!-- ──────────────────────────────────────────────────────
       SECTION: MARKS
  ────────────────────────────────────────────────────────── -->
  <section id="marks" class="sd-section">

    <div class="marks-filters">
      <label>Filter by subject:</label>
      <select id="subjectFilter" onchange="filterMarks()">
        <option value="">All Subjects</option>
        <?php foreach (array_keys($marksBySubject) as $sn): ?>
        <option value="<?= htmlspecialchars($sn) ?>"><?= htmlspecialchars($sn) ?></option>
        <?php endforeach; ?>
      </select>
      <label>Filter by type:</label>
      <select id="typeFilter" onchange="filterMarks()">
        <option value="">All Types</option>
        <option value="exam">Exam</option>
        <option value="assignment">Assignment</option>
        <option value="quiz">Quiz</option>
        <option value="project">Project</option>
        <option value="lab">Lab</option>
      </select>
    </div>

    <div class="sd-card mt-16">
      <div class="sd-card-header"><i class="fas fa-star"></i> All Assessment Marks</div>
      <div class="table-wrap">
        <table class="sd-table" id="marksTable">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Assessment</th>
              <th>Type</th>
              <th>Marks</th>
              <th>Max</th>
              <th>Percentage</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
          <?php foreach ($assessmentMrks as $m): ?>
            <tr data-subject="<?= htmlspecialchars($m['subject_name']) ?>"
                data-type="<?= htmlspecialchars($m['type']) ?>">
              <td>
                <strong><?= htmlspecialchars($m['code']) ?></strong>
                <small><?= htmlspecialchars($m['subject_name']) ?></small>
              </td>
              <td><?= htmlspecialchars($m['title']) ?></td>
              <td>
                <span class="type-badge type-<?= $m['type'] ?>">
                  <?= ucfirst($m['type']) ?>
                </span>
              </td>
              <td class="marks-num"><?= $m['marks_obtained'] ?></td>
              <td class="marks-num muted"><?= $m['max_marks'] ?></td>
              <td>
                <div class="mini-bar-wrap">
                  <div class="mini-bar <?= $m['percentage'] >= 75 ? 'good' : ($m['percentage'] >= 50 ? 'warn' : 'danger') ?>"
                       style="width:<?= $m['percentage'] ?>%"></div>
                </div>
                <span class="bar-label"><?= $m['percentage'] ?>%</span>
              </td>
              <td>
                <span class="grade-badge grade-<?= strtolower(str_replace('+','p', $m['grade'] ?? 'f')) ?>">
                  <?= $m['grade'] ?? '—' ?>
                </span>
              </td>
            </tr>
          <?php endforeach; ?>
          <?php if (!$assessmentMrks): ?>
            <tr><td colspan="7" class="empty-cell">No marks recorded yet.</td></tr>
          <?php endif; ?>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Subject-wise marks chart -->
    <div class="sd-card mt-20">
      <div class="sd-card-header"><i class="fas fa-chart-bar"></i> Marks by Subject (Bar)</div>
      <div class="chart-body chart-body--xl">
        <canvas id="chartMarksBar"></canvas>
      </div>
    </div>

  </section>

</div><!-- .sd-container -->

<!-- ════ CHART + UI SCRIPTS ════ -->
<script>
// ── Data from PHP ──────────────────────────────────────────
const months      = <?= json_encode($chartMonths) ?>;
const attTrend    = <?= json_encode($chartAttPct) ?>;
const subNames    = <?= json_encode($chartSubNames) ?>;
const subAttPct   = <?= json_encode($chartSubAttPct) ?>;
const subPerfPct  = <?= json_encode($chartSubPerfPct) ?>;
const typeLabels  = <?= json_encode($chartTypeLabels) ?>;
const typeAvg     = <?= json_encode($chartTypeAvg) ?>;

// Assessment marks per subject (for bar chart)
const marksBySubject = <?= json_encode(array_map(function($items){
    return [
        'name'      => $items[0]['subject_name'] ?? '',
        'obtained'  => array_sum(array_column($items, 'marks_obtained')),
        'max'       => array_sum(array_column($items, 'max_marks')),
    ];
}, $marksBySubject)) ?>;

const COLORS = [
  '#4f46e5','#7c3aed','#10b981','#f59e0b',
  '#ef4444','#3b82f6','#ec4899','#14b8a6'
];

Chart.defaults.font.family = "'Segoe UI', system-ui, sans-serif";
Chart.defaults.color = '#6b7280';

// ── 1. Attendance trend line ───────────────────────────────
if (months.length) {
  new Chart(document.getElementById('chartAttTrend'), {
    type: 'line',
    data: {
      labels: months,
      datasets: [{
        label: 'Attendance %',
        data: attTrend,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79,70,229,.08)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#4f46e5',
        pointRadius: 5,
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        y: { min: 0, max: 100, ticks: { callback: v => v + '%' },
             grid: { color: 'rgba(0,0,0,.05)' } },
        x: { grid: { display: false } }
      }
    }
  });

  // Monthly line (attendance section)
  new Chart(document.getElementById('chartMonthlyAtt'), {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Attendance %',
          data: attTrend,
          backgroundColor: attTrend.map(v => v >= 75 ? '#10b981' : v >= 60 ? '#f59e0b' : '#ef4444'),
          borderRadius: 6,
        },
        {
          label: '75% Threshold',
          data: months.map(() => 75),
          type: 'line',
          borderColor: '#ef4444',
          borderDash: [6, 4],
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false,
        }
      ]
    },
    options: {
      plugins: { legend: { position: 'top' } },
      scales: {
        y: { min: 0, max: 100, ticks: { callback: v => v + '%' } },
        x: { grid: { display: false } }
      }
    }
  });
}

// ── 2. Attendance breakdown donut ─────────────────────────
new Chart(document.getElementById('chartAttBreakdown'), {
  type: 'doughnut',
  data: {
    labels: ['Present', 'Late', 'Excused', 'Absent'],
    datasets: [{
      data: [
        <?= (int)$overallAtt['present'] ?>,
        <?= (int)$overallAtt['late'] ?>,
        <?= (int)$overallAtt['excused'] ?>,
        <?= (int)$overallAtt['absent'] ?>,
      ],
      backgroundColor: ['#10b981','#f59e0b','#3b82f6','#ef4444'],
      hoverOffset: 6,
      borderWidth: 0,
    }]
  },
  options: {
    cutout: '68%',
    plugins: { legend: { position: 'bottom' } }
  }
});

// ── 3. Subject att vs perf grouped bar ─────────────────────
if (subNames.length) {
  new Chart(document.getElementById('chartSubCompare'), {
    type: 'bar',
    data: {
      labels: subNames,
      datasets: [
        { label: 'Attendance %',  data: subAttPct,  backgroundColor: 'rgba(79,70,229,.75)',  borderRadius: 4 },
        { label: 'Performance %', data: subPerfPct, backgroundColor: 'rgba(16,185,129,.75)', borderRadius: 4 },
      ]
    },
    options: {
      plugins: { legend: { position: 'top' } },
      scales: {
        y: { min: 0, max: 100, ticks: { callback: v => v + '%' } },
        x: { grid: { display: false } }
      }
    }
  });

  // Subject performance bar
  new Chart(document.getElementById('chartSubPerf'), {
    type: 'bar',
    data: {
      labels: subNames,
      datasets: [{
        label: 'Performance %',
        data: subPerfPct,
        backgroundColor: subPerfPct.map(v => v >= 75 ? '#10b981' : v >= 50 ? '#f59e0b' : '#ef4444'),
        borderRadius: 6,
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: { legend: { display: false } },
      scales: {
        x: { min: 0, max: 100, ticks: { callback: v => v + '%' } },
        y: { grid: { display: false } }
      }
    }
  });
}

// ── 4. Performance by type donut ──────────────────────────
if (typeLabels.length) {
  new Chart(document.getElementById('chartPerfType'), {
    type: 'polarArea',
    data: {
      labels: typeLabels.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
      datasets: [{
        data: typeAvg,
        backgroundColor: COLORS.slice(0, typeLabels.length).map(c => c + 'cc'),
        borderWidth: 0,
      }]
    },
    options: {
      plugins: { legend: { position: 'right' } },
      scales: { r: { min: 0, max: 100 } }
    }
  });
}

// ── 5. Marks bar chart ─────────────────────────────────────
const mbNames     = Object.values(marksBySubject).map(s => s.name);
const mbObtained  = Object.values(marksBySubject).map(s => s.obtained);
const mbMax       = Object.values(marksBySubject).map(s => s.max);

if (mbNames.length) {
  new Chart(document.getElementById('chartMarksBar'), {
    type: 'bar',
    data: {
      labels: mbNames,
      datasets: [
        { label: 'Marks Obtained', data: mbObtained, backgroundColor: 'rgba(79,70,229,.8)',  borderRadius: 4 },
        { label: 'Total Max Marks',data: mbMax,       backgroundColor: 'rgba(209,213,219,.6)', borderRadius: 4 },
      ]
    },
    options: {
      plugins: { legend: { position: 'top' } },
      scales: { x: { grid: { display: false } } }
    }
  });
}

// ══════════════════════════════════════════════════════════
// TAB NAVIGATION
// ══════════════════════════════════════════════════════════
document.querySelectorAll('.sd-nav-tab').forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    const target = tab.dataset.target;
    document.querySelectorAll('.sd-nav-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.sd-section').forEach(s => s.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(target)?.classList.add('active');
  });
});

// Notification panel toggle
document.getElementById('notifBell')?.addEventListener('click', () => {
  document.getElementById('notifPanel')?.classList.toggle('open');
});
document.addEventListener('click', e => {
  if (!e.target.closest('#notifBell') && !e.target.closest('#notifPanel')) {
    document.getElementById('notifPanel')?.classList.remove('open');
  }
});

// Marks filter
function filterMarks() {
  const subj = document.getElementById('subjectFilter').value.toLowerCase();
  const type = document.getElementById('typeFilter').value.toLowerCase();
  document.querySelectorAll('#marksTable tbody tr[data-subject]').forEach(row => {
    const rSubj = row.dataset.subject.toLowerCase();
    const rType = row.dataset.type.toLowerCase();
    const show  = (!subj || rSubj === subj) && (!type || rType === type);
    row.style.display = show ? '' : 'none';
  });
}
</script>

</body>
</html>
