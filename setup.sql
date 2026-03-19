-- ============================================
--  Student Resume Builder — Database Setup
--  Run this in MySQL Workbench before starting
-- ============================================

CREATE DATABASE IF NOT EXISTS resume_db;
USE resume_db;

CREATE TABLE IF NOT EXISTS resumes (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  full_name   VARCHAR(100)  NOT NULL,
  email       VARCHAR(100)  NOT NULL,
  phone       VARCHAR(20)   NOT NULL,
  address     VARCHAR(150)  NOT NULL,
  objective   TEXT          NOT NULL,
  education   TEXT          NOT NULL,
  skills      TEXT          NOT NULL,
  experience  TEXT          NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- Verify setup
SELECT 'Database and table created successfully!' AS status;
SELECT TABLE_NAME, CREATE_TIME FROM information_schema.TABLES
WHERE TABLE_SCHEMA = 'resume_db';
