# Student Resume Builder
**Stack:** HTML · CSS · JavaScript · Node.js · Express · MySQL Workbench

---

## Quick Start (Step-by-step)

### Step 1 — Set up the database
1. Open **MySQL Workbench** and connect to your local server.
2. Open `setup.sql` from this folder.
3. Run the entire script (Ctrl+Shift+Enter or click the ⚡ button).
4. You should see `resume_db` and a `resumes` table created.

### Step 2 — Configure your MySQL credentials
Open `server.js` and update these lines if your MySQL login differs:
```js
user:     'root',   // your MySQL username
password: '',       // your MySQL password
```

### Step 3 — Install dependencies
Open a terminal in this folder and run:
```bash
npm install
```

### Step 4 — Start the server
```bash
node server.js
```
You should see:
```
✅  Connected to MySQL database (resume_db)
🚀  Server running at http://localhost:3000
```

### Step 5 — Use the app
Open your browser and go to: **http://localhost:3000**

---

## File Structure
```
resume-builder/
├── public/
│   └── index.html     ← Resume form (frontend)
├── server.js          ← Express API backend
├── setup.sql          ← Run this in MySQL Workbench first
├── package.json       ← Node project config
└── README.md          ← This file
```

---

## API Endpoints
| Method | Route           | Description              |
|--------|-----------------|--------------------------|
| POST   | /save-resume    | Save a new resume        |
| GET    | /resumes        | Fetch all saved resumes  |
| DELETE | /resumes/:id    | Delete a resume by ID    |

---

## Verifying in MySQL Workbench
Run this query to confirm data was saved:
```sql
USE resume_db;
SELECT * FROM resumes;
```

---

## Rubric Checklist
- [x] Complete HTML form with all 8 required fields
- [x] MySQL database and table created via SQL script
- [x] Node.js + Express backend with working DB connection
- [x] Data insertion and display working correctly
- [x] Files are organized, readable, and properly separated
