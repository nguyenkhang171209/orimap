# 🎯 Database Setup Guide for Career Support System

## Prerequisites
- MySQL Server installed and running
- Node.js 16+ installed
- npm installed

## Setup Steps

### 1. **Verify MySQL is Running**
```bash
# Windows - Check if MySQL service is running
Get-Service MySQL80  # or your MySQL version
# If not running, start it:
Start-Service MySQL80
```

### 2. **Verify MySQL Credentials**
```bash
# Test MySQL connection
mysql -h localhost -u root -p
# Enter password: 123456
```

### 3. **Install Dependencies**
```bash
cd d:\5. FPT\AI_young_guru\orimap
npm install
```

### 4. **Create Database and Tables**
```bash
npm run db:init
```

This command will:
- ✓ Connect to MySQL server
- ✓ Create the database `carrer_support_db`
- ✓ Create all necessary tables:
  - `users` - User profiles and information
  - `careers` - Career information and descriptions
  - `quizzes` - Quiz questions and answers
  - `quiz_answers` - User quiz responses
  - `mentorship_sessions` - Mentorship conversation logs
  - `user_roadmaps` - Career path planning
- ✓ Insert sample data for testing

### 5. **Start the Backend Server**
```bash
npm run server
```
The server will run on **http://localhost:5000**

### 6. **Test API Endpoints** (in another terminal)
```bash
# Test database health
curl http://localhost:5000/api/health

# Get all users
curl http://localhost:5000/api/users

# Get all careers
curl http://localhost:5000/api/careers

# Get all quizzes
curl http://localhost:5000/api/quizzes
```

## Database Schema

### users
| Field | Type | Description |
|-------|------|-------------|
| id | INT PK | User ID |
| name | VARCHAR(255) | User name |
| email | VARCHAR(255) | Email address |
| phone | VARCHAR(20) | Phone number |
| major_interest | VARCHAR(255) | Career interest |
| school | VARCHAR(255) | School/University |
| avatar_url | VARCHAR(500) | Profile picture |
| bio | TEXT | User biography |
| created_at | TIMESTAMP | Created date |
| updated_at | TIMESTAMP | Updated date |

### careers
| Field | Type | Description |
|-------|------|-------------|
| id | INT PK | Career ID |
| title | VARCHAR(255) | Job title |
| description | TEXT | Career description |
| requirements | TEXT | Job requirements |
| salary_range | VARCHAR(100) | Salary range |
| job_outlook | VARCHAR(500) | Future outlook |
| related_skills | TEXT | Required skills |
| education_level | VARCHAR(100) | Education needed |
| industry | VARCHAR(100) | Industry type |

### quizzes
| Field | Type | Description |
|-------|------|-------------|
| id | INT PK | Quiz ID |
| question | TEXT | Quiz question |
| option_a, b, c, d | VARCHAR(255) | Answer options |
| correct_answer | CHAR(1) | Correct answer |
| category | VARCHAR(100) | Quiz category |
| difficulty_level | VARCHAR(50) | Easy/Medium/Hard |

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user

### Careers
- `GET /api/careers` - Get all careers
- `GET /api/careers/:id` - Get career details

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `POST /api/quiz-answers` - Submit quiz answer

### Mentorship
- `GET /api/sessions/:user_id` - Get user sessions
- `POST /api/sessions` - Create new session

### Health Check
- `GET /api/health` - Check database connection

## Environment Variables (.env)
```
GEMINI_API_KEY=your_key_here
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=carrer_support_db
DB_PORT=3306
NODE_ENV=development
```

## Troubleshooting

### MySQL Connection Error
```
Error: connect ECONNREFUSED
- Ensure MySQL service is running
- Check host, user, password in .env file
- Verify port 3306 is not blocked
```

### Database Already Exists
```
The script will skip creating database if it already exists
To reset: npm run db:reset
```

### Port Already in Use
```
Change PORT in .env file or kill process using port 5000:
Get-Process -ID (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

## Next Steps
1. Update `.env` with your actual Gemini API key
2. Connect frontend to backend API endpoints
3. Customize database schema for your needs
4. Add authentication/authorization if needed
5. Set up environment-specific configurations

## Support
For issues with MySQL setup, refer to [MySQL Documentation](https://dev.mysql.com/doc/refman/8.0/en/)
