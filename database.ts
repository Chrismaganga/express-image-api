import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a connection pool to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost', // Default to localhost
  user: process.env.DB_USER || 'root',      // Default MySQL user
  database: process.env.DB_NAME || 'uploader', // Default database name
  password: process.env.DB_PASSWORD || '',   // Default password
  port: Number(process.env.DB_PORT) || 3306, // Default MySQL port
});

// Function to get a connection from the pool
export const getConnection = async () => {
  const connection = await pool.getConnection();
  return connection;
};

// Optional: Export pool for queries if needed
export default pool;
