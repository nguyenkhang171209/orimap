import mysql from 'mysql2/promise';
import 'dotenv/config';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  port: parseInt(process.env.DB_PORT || '3306'),
};

const dbName = process.env.DB_NAME || 'carrer_support_db';

async function initializeDatabase() {
  let connection;
  try {
    // Connect to MySQL without specifying a database
    console.log('Connecting to MySQL server...');
    connection = await mysql.createConnection(dbConfig);

    // Create database if it doesn't exist
    console.log(`Creating database: ${dbName}`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`Database ${dbName} created/verified successfully!`);

    // Switch to the created database
    await connection.query(`USE ${dbName}`);

    // Create tables
    console.log('Creating tables...');

    // Users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        phone VARCHAR(20),
        major_interest VARCHAR(255),
        school VARCHAR(255),
        avatar_url VARCHAR(500),
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Users table created');

    // Careers table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS careers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        requirements TEXT,
        salary_range VARCHAR(100),
        job_outlook VARCHAR(500),
        related_skills TEXT,
        education_level VARCHAR(100),
        industry VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Careers table created');

    // Quizzes table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS quizzes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question TEXT NOT NULL,
        option_a VARCHAR(255),
        option_b VARCHAR(255),
        option_c VARCHAR(255),
        option_d VARCHAR(255),
        correct_answer CHAR(1),
        category VARCHAR(100),
        difficulty_level VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Quizzes table created');

    // Quiz Answers table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS quiz_answers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        quiz_id INT NOT NULL,
        answer CHAR(1),
        is_correct BOOLEAN,
        answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Quiz Answers table created');

    // Mentorship Sessions table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS mentorship_sessions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        topic VARCHAR(255) NOT NULL,
        response LONGTEXT,
        rating INT,
        feedback TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ Mentorship Sessions table created');

    // User Roadmaps table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS user_roadmaps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        career_id INT NOT NULL,
        milestone_1 VARCHAR(255),
        milestone_2 VARCHAR(255),
        milestone_3 VARCHAR(255),
        milestone_4 VARCHAR(255),
        status VARCHAR(50),
        completed_percentage INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (career_id) REFERENCES careers(id) ON DELETE CASCADE
      )
    `);
    console.log('✓ User Roadmaps table created');

    // Insert sample data
    console.log('\nInserting sample data...');

    // Sample careers
    await connection.query(`
      INSERT IGNORE INTO careers (title, description, requirements, salary_range, job_outlook, related_skills, education_level, industry)
      VALUES 
      ('Software Engineer', 'Develops and maintains software applications', 'Programming, Problem-solving, Communication', '60k-150k', 'Growing 13%', 'Java, Python, JavaScript, Database Design', 'Bachelor degree', 'Technology'),
      ('Data Scientist', 'Analyzes data and builds predictive models', 'Statistics, Machine Learning, Programming', '80k-170k', 'Growing 36%', 'Python, SQL, Machine Learning, Statistics', 'Master degree', 'Technology'),
      ('UX Designer', 'Designs user experiences for digital products', 'Design thinking, Wireframing, Prototyping', '50k-120k', 'Growing 13%', 'UI/UX Design, Figma, Adobe XD, User Research', 'Bachelor degree', 'Design'),
      ('Project Manager', 'Manages project timelines and team coordination', 'Leadership, Planning, Communication', '70k-140k', 'Growing 8%', 'Project Management, Microsoft Project, Agile', 'Bachelor degree', 'Management'),
      ('DevOps Engineer', 'Manages deployment and infrastructure', 'Cloud platforms, CI/CD, Linux', '90k-160k', 'Growing 17%', 'AWS/Azure, Docker, Kubernetes, Jenkins', 'Bachelor degree', 'Technology')
    `);
    console.log('✓ Sample careers inserted');

    // Sample quizzes
    await connection.query(`
      INSERT IGNORE INTO quizzes (question, option_a, option_b, option_c, option_d, correct_answer, category, difficulty_level)
      VALUES 
      ('What does HTML stand for?', 'Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'A', 'Web Development', 'Easy'),
      ('Which programming language is known for data science?', 'JavaScript', 'Python', 'C++', 'Go', 'B', 'Data Science', 'Easy'),
      ('What is the main purpose of a database?', 'Store and manage data', 'Write code', 'Design websites', 'Create graphics', 'A', 'Database', 'Easy'),
      ('Which is NOT a soft skill?', 'Communication', 'Leadership', 'SQL', 'Time Management', 'C', 'Career Skills', 'Medium'),
      ('What does API stand for?', 'Application Programming Interface', 'Application Processing Information', 'Advanced Programming Integration', 'All Purpose Integration', 'A', 'Technology', 'Medium')
    `);
    console.log('✓ Sample quizzes inserted');

    console.log('\n✅ Database initialization completed successfully!');
    console.log(`Database: ${dbName}`);
    console.log(`Host: ${dbConfig.host}`);
    console.log(`Port: ${dbConfig.port}`);

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the initialization
initializeDatabase();
