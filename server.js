// ============================================
//  Student Resume Builder — server.js
//  Node.js + Express + MySQL2 backend
// ============================================

const express = require('express');
const mysql   = require('mysql2');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = 3000;

// ── Middleware ────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Database Connection ───────────────────────
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('❌  Database connection failed:', err.message);
    console.error('    Make sure you ran setup.sql in MySQL Workbench first.');
    return;
  }
  console.log('✅  Connected to MySQL database (resume_db)');
});

// ── POST /save-resume ─────────────────────────
app.post('/save-resume', (req, res) => {
  const { fullName, email, phone, address, objective, education, skills, experience } = req.body;

  // Basic validation
  if (!fullName || !email || !phone || !address || !objective || !education || !skills || !experience) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const sql = `
    INSERT INTO resumes (full_name, email, phone, address, objective, education, skills, experience)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [fullName, email, phone, address, objective, education, skills, experience], (err, result) => {
    if (err) {
      console.error('Insert error:', err.message);
      return res.status(500).json({ success: false, message: 'Error saving resume.', error: err.message });
    }
    res.json({ success: true, message: 'Resume saved successfully!', id: result.insertId });
  });
});

// ── GET /resumes ──────────────────────────────
app.get('/resumes', (req, res) => {
  db.query('SELECT * FROM resumes ORDER BY id DESC', (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error fetching resumes.', error: err.message });
    }
    res.json({ success: true, data: results });
  });
});

// ── DELETE /resumes/:id ───────────────────────
app.delete('/resumes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM resumes WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error deleting resume.' });
    }
    res.json({ success: true, message: 'Resume deleted.' });
  });
});

// ── Start Server ──────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀  Server running at http://localhost:${PORT}`);
});
