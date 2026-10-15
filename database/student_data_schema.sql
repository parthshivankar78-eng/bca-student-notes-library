-- ============================================================
-- student_data_schema.sql
-- Attendance + Performance tables  (run AFTER schema.sql)
-- ============================================================

USE student_dashboard;

-- ─────────────────────────────────────────────────────────────
-- SUBJECTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subjects (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code         VARCHAR(20)  NOT NULL UNIQUE,
    name         VARCHAR(120) NOT NULL,
    credits      TINYINT      NOT NULL DEFAULT 3,
    department   VARCHAR(100) DEFAULT NULL,
    teacher_id   INT UNSIGNED DEFAULT NULL,
    created_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ─────────────────────────────────────────────────────────────
-- STUDENT ↔ SUBJECT ENROLMENTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS enrolments (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id  INT UNSIGNED NOT NULL,
    subject_id  INT UNSIGNED NOT NULL,
    semester    VARCHAR(20)  NOT NULL DEFAULT 'Sem-1',
    year        YEAR         NOT NULL DEFAULT (YEAR(CURDATE())),
    enrolled_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_enrol (student_id, subject_id, semester, year),
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ─────────────────────────────────────────────────────────────
-- ATTENDANCE
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS attendance (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id  INT UNSIGNED NOT NULL,
    subject_id  INT UNSIGNED NOT NULL,
    class_date  DATE         NOT NULL,
    status      ENUM('present','absent','late','excused') NOT NULL DEFAULT 'absent',
    notes       VARCHAR(255) DEFAULT NULL,
    marked_by   INT UNSIGNED DEFAULT NULL,   -- teacher user_id
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_att (student_id, subject_id, class_date),
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
    FOREIGN KEY (marked_by)  REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_att_student (student_id),
    INDEX idx_att_date    (class_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ─────────────────────────────────────────────────────────────
-- ASSESSMENTS (exams, assignments, quizzes)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS assessments (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    subject_id  INT UNSIGNED NOT NULL,
    title       VARCHAR(150) NOT NULL,
    type        ENUM('exam','assignment','quiz','project','lab') NOT NULL DEFAULT 'exam',
    max_marks   DECIMAL(6,2) NOT NULL DEFAULT 100,
    held_on     DATE         DEFAULT NULL,
    semester    VARCHAR(20)  NOT NULL DEFAULT 'Sem-1',
    year        YEAR         NOT NULL DEFAULT (YEAR(CURDATE())),
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ─────────────────────────────────────────────────────────────
-- MARKS  (student scores per assessment)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS marks (
    id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    student_id     INT UNSIGNED NOT NULL,
    assessment_id  INT UNSIGNED NOT NULL,
    marks_obtained DECIMAL(6,2) NOT NULL DEFAULT 0,
    grade          VARCHAR(5)   DEFAULT NULL,   -- A+, A, B, C, D, F
    remarks        VARCHAR(255) DEFAULT NULL,
    graded_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_mark (student_id, assessment_id),
    FOREIGN KEY (student_id)    REFERENCES users(id)        ON DELETE CASCADE,
    FOREIGN KEY (assessment_id) REFERENCES assessments(id)  ON DELETE CASCADE,
    INDEX idx_marks_student (student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ─────────────────────────────────────────────────────────────
-- NOTIFICATIONS  (alerts visible on dashboard)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     INT UNSIGNED NOT NULL,
    title       VARCHAR(150) NOT NULL,
    body        TEXT         DEFAULT NULL,
    type        ENUM('info','success','warning','danger') NOT NULL DEFAULT 'info',
    is_read     TINYINT(1)   NOT NULL DEFAULT 0,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_notif_user (user_id, is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
