# Student Resume Builder

A web-based resume builder application that allows students to create, save, and manage their resumes. Built with Node.js, Express, and MySQL.

## Features

- **Create Professional Resumes** – Intuitive form-based interface to enter resume details
- **Persistent Storage** – Save resumes to a MySQL database
- **View Saved Records** – Browse all previously saved resumes
- **Responsive Design** – Works seamlessly on desktop and mobile devices
- **Docker Support** – Easy deployment with Docker and Docker Compose

## Tech Stack

**Backend:**
- Node.js + Express.js
- MySQL 2 (with mysql2 driver)
- CORS enabled for cross-origin requests

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript

**Deployment:**
- Docker & Docker Compose

## Prerequisites

Before running this application, ensure you have:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MySQL** (v5.7 or higher)
- **Docker & Docker Compose** (optional, for containerized deployment)

## Installation

1. **Clone or download the project:**
   ```bash
   cd resume-builder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the project root with the following variables:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=resume_db
   ```

4. **Initialize the database:**
   
   Run the SQL setup script in MySQL Workbench or MySQL CLI:
   ```bash
   mysql -u root -p < setup.sql
   ```
   
   Or manually execute the queries in `setup.sql` in your MySQL client.

## Running the Application

### Local Development

1. **Start the application:**
   ```bash
   npm start
   ```

2. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Using Docker Compose

1. **Build and run with Docker Compose:**
   ```bash
   docker compose up --build
   ```

2. **Access the application:**
   ```
   http://localhost:3000
   ```

The Docker setup automatically handles database initialization and networking.

## Project Structure

```
resume-builder/
├── public/                  # Frontend files
│   ├── index.html          # Main HTML page
│   ├── styles.css          # Styling
│   └── script.js           # Client-side JavaScript
├── server.js               # Express server
├── setup.sql               # Database schema
├── package.json            # Node.js dependencies
├── Dockerfile              # Container image configuration
├── compose.yaml            # Docker Compose configuration
├── README.md               # This file
└── README.Docker.md        # Docker-specific instructions
```

## API Endpoints

### Save Resume
- **POST** `/save-resume`
- **Body:**
  ```json
  {
    "fullName": "Juan Dela Cruz",
    "email": "juan@email.com",
    "phone": "555-1234",
    "address": "123 Main St",
    "objective": "Seeking a position as...",
    "education": "Bachelor of Science in...",
    "skills": "JavaScript, Node.js, MySQL",
    "experience": "Interned at..."
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Resume saved successfully",
    "id": 1
  }
  ```

### Get All Resumes
- **GET** `/get-resumes`
- **Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": 1,
        "full_name": "Juan Dela Cruz",
        "email": "juan@email.com",
        ...
      }
    ]
  }
  ```

## Database Schema

The application uses a single table `resumes` with the following structure:

| Column | Type | Description |
|--------|------|-------------|
| id | INT | Auto-incrementing primary key |
| full_name | VARCHAR(100) | Student's full name |
| email | VARCHAR(100) | Email address |
| phone | VARCHAR(20) | Phone number |
| address | VARCHAR(150) | Physical address |
| objective | TEXT | Career objective |
| education | TEXT | Educational background |
| skills | TEXT | Skills list |
| experience | TEXT | Work experience |
| created_at | TIMESTAMP | Record creation timestamp |

## Troubleshooting

### Database Connection Error
If you see "❌ Database connection failed":
1. Ensure MySQL is running
2. Verify your `.env` file has correct credentials
3. Confirm `setup.sql` has been executed
4. Check the database exists with: `SHOW DATABASES;`

### Port 3000 Already in Use
Change the PORT in `server.js` or kill the process using port 3000:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Docker Connection Issues
If using Docker Compose, ensure Docker daemon is running and containers are properly networked. Check logs with:
```bash
docker compose logs
```

## Development

To extend the application:

1. **Add new form fields:**
   - Update `index.html` with new input fields
   - Modify `script.js` to capture new data
   - Update `server.js` POST request handler
   - Add columns to the `resumes` table in `setup.sql`

2. **Customize styling:**
   - Edit `public/styles.css`

3. **Add new features:**
   - Create new API endpoints in `server.js`
   - Add corresponding frontend functionality in `script.js`

## License

This project is provided as-is for educational purposes.

## Support

For issues, questions, or feature requests, please check the code comments and documentation in each file.

---

**Happy Resume Building!** 🎓
