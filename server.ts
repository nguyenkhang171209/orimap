import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'carrer_support_db',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test database connection
app.get('/api/health', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    res.json({ status: 'Database connected successfully', database: process.env.DB_NAME });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed', message: (error as Error).message });
  }
});

// Get all users (example endpoint)
app.get('/api/users', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM users');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get user profile by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    connection.release();
    res.json(rows[0] || { error: 'User not found' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Create new user
app.post('/api/users', async (req, res) => {
  const { name, email, phone, major_interest, school } = req.body;
  try {
    const connection = await pool.getConnection();
    const [result]: any = await connection.query(
      'INSERT INTO users (name, email, phone, major_interest, school) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, major_interest, school]
    );
    connection.release();
    res.status(201).json({ id: result.insertId, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get all careers
app.get('/api/careers', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM careers');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get career details by ID
app.get('/api/careers/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM careers WHERE id = ?', [req.params.id]);
    connection.release();
    res.json(rows[0] || { error: 'Career not found' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get quiz questions
app.get('/api/quizzes', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM quizzes');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Submit quiz answer
app.post('/api/quiz-answers', async (req, res) => {
  const { user_id, quiz_id, answer } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO quiz_answers (user_id, quiz_id, answer, answered_at) VALUES (?, ?, ?, NOW())',
      [user_id, quiz_id, answer]
    );
    connection.release();
    res.status(201).json({ message: 'Answer submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Get mentorship sessions
app.get('/api/sessions/:user_id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT * FROM mentorship_sessions WHERE user_id = ? ORDER BY created_at DESC',
      [req.params.user_id]
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Save mentorship session
app.post('/api/sessions', async (req, res) => {
  const { user_id, topic, response } = req.body;
  try {
    const connection = await pool.getConnection();
    const [result]: any = await connection.query(
      'INSERT INTO mentorship_sessions (user_id, topic, response, created_at) VALUES (?, ?, ?, NOW())',
      [user_id, topic, response]
    );
    connection.release();
    res.status(201).json({ id: result.insertId, message: 'Session saved successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Connected to database: ${process.env.DB_NAME}`);
});

export { pool };
