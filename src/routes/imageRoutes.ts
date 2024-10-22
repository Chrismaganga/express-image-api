
import { Router, Request, Response } from 'express';
import multer from 'multer';
import { getConnection } from '../../database';
// import { getConnection } from '../db/database'; // Adjust path as necessary

const router = Router();
const upload = multer({ dest: 'images/' }); // Configure multer to save uploaded images
router.post('/upload', upload.single('icon'), async (req: Request, res: Response) => {
    const { name } = req.body;
    const icon = req.file?.path;

    if (!icon) {
        res.status(400).json({ message: 'No file uploaded' });
        return;
    }

    const connection = await getConnection();
    const sql = 'INSERT INTO users (name, icon) VALUES (?, ?)';

    try {
        const [result] = await connection.query(sql, [name, icon]);
        if ('insertId' in result) {
            res.status(201).json({ id: result.insertId, name, icon });
        } else {
            res.status(201).json({ name, icon });
        }
    } catch (dbErr: unknown) {
        console.error('Database error:', dbErr);
        if (dbErr instanceof Error) {
            res.status(500).json({ message: 'Database error', error: dbErr.message });
        } else {
            res.status(500).json({ message: 'Unknown database error' });
        }
    } finally {
        connection.release();
    }
});
export default router;