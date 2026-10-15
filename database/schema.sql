-- ============================================================
-- Student Dashboard - MySQL Database Schema
-- ============================================================

CREATE DATABASE IF NOT EXISTS student_dashboard 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;

USE student_dashboard;

-- ============================================================
-- USERS TABLE  (Registration & Login)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name       VARCHAR(120)    NOT NULL,
    email           VARCHAR(180)    NOT NULL UNIQUE,
    username        VARCHAR(60)     NOT NULL UNIQUE,
    password_hash   VARCHAR(255)    NOT NULL,          -- bcrypt / Argon2
    role            ENUM('student','teacher','admin') NOT NULL DEFAULT 'student',
    gender          ENUM('male','female','other','prefer_not_to_say') DEFAULT NULL,
    date_of_birth   DATE            DEFAULT NULL,
    phone           VARCHAR(20)     DEFAULT NULL,
    avatar_url      VARCHAR(500)    DEFAULT NULL,
    bio             TEXT            DEFAULT NULL,

    -- Security fields
    is_active       TINYINT(1)      NOT NULL DEFAULT 1,
    is_verified     TINYINT(1)      NOT NULL DEFAULT 0,
    verify_token    VARCHAR(128)    DEFAULT NULL,
    verify_expires  DATETIME        DEFAULT NULL,

    reset_token     VARCHAR(128)    DEFAULT NULL,
    reset_expires   DATETIME        DEFAULT NULL,

    login_attempts  TINYINT         NOT NULL DEFAULT 0,
    locked_until    DATETIME        DEFAULT NULL,

    last_login      DATETIME        DEFAULT NULL,
    last_ip         VARCHAR(45)     DEFAULT NULL,      -- supports IPv6
    created_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_email    (email),
    INDEX idx_username (username),
    INDEX idx_role     (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- SESSION / REMEMBER-ME TOKENS
-- ============================================================
CREATE TABLE IF NOT EXISTS remember_tokens (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     INT UNSIGNED NOT NULL,
    token_hash  VARCHAR(128) NOT NULL UNIQUE,
    expires_at  DATETIME     NOT NULL,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token_hash)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- LOGIN AUDIT LOG
-- ============================================================
CREATE TABLE IF NOT EXISTS login_logs (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id     INT UNSIGNED DEFAULT NULL,
    identifier  VARCHAR(180) NOT NULL,                -- email or username tried
    ip_address  VARCHAR(45)  NOT NULL,
    user_agent  VARCHAR(512) DEFAULT NULL,
    status      ENUM('success','fail','locked') NOT NULL,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_ip   (ip_address),
    INDEX idx_uid  (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================================
-- STUDENT PROFILES  (extended info)
-- ============================================================
CREATE TABLE IF NOT EXISTS student_profiles (
    user_id         INT UNSIGNED PRIMARY KEY,
    student_id      VARCHAR(30)  UNIQUE DEFAULT NULL,  -- e.g. STU-2024-0001
    department      VARCHAR(100) DEFAULT NULL,
    program         VARCHAR(120) DEFAULT NULL,
    enrollment_year YEAR         DEFAULT NULL,
    current_grade   VARCHAR(10)  DEFAULT NULL,          -- GPA / letter
    address         TEXT         DEFAULT NULL,
    guardian_name   VARCHAR(120) DEFAULT NULL,
    guardian_phone  VARCHAR(20)  DEFAULT NULL,
    updated_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
