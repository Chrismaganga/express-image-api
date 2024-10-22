// import { Request, Response } from 'express';
// import multer from 'multer';
// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// // Create MySQL connection pool
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: Number(process.env.DB_PORT) || 3306,
// });

// const upload = multer({ dest: 'uploads/' }).single('icon');

// const uploadHandler = async (req: Request, res: Response) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(500).json({ message: 'File upload failed', error: err.message });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const { name } = req.body;
//     const icon = req.file.filename;

//     try {
//       const sql = 'INSERT INTO users (name, icon) VALUES (?, ?)';
//       const [result] = await pool.execute(sql, [name, icon]);

//       const insertResult = result as mysql.ResultSetHeader;  // Type assertion for insertId
//       res.status(201).json({ id: insertResult.insertId, name, icon });
//     } catch (dbErr: unknown) {
//       if (dbErr instanceof Error) {
//         res.status(500).json({ message: dbErr.message });
//       } else {
//         res.status(500).json({ message: 'An unknown error occurred' });
//       }
//     }
//   });
// };

// export { uploadHandler };
// export default connection;
import { Request, Response } from 'express';
import multer from 'multer';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 3306,
});

const upload = multer({ dest: 'uploads/' }).single('icon');

const uploadHandler = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'File upload failed', error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { name } = req.body;
    const icon = req.file.filename;

    try {
      const sql = 'INSERT INTO users (name, icon) VALUES (?, ?)';
      const [result] = await pool.execute(sql, [name, icon]);

      const insertResult = result as mysql.ResultSetHeader;  // Type assertion for insertId
      res.status(201).json({ id: insertResult.insertId, name, icon });
    } catch (dbErr: unknown) {
      if (dbErr instanceof Error) {
        res.status(500).json({ message: dbErr.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  });
};

export { uploadHandler };
