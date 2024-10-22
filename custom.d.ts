// src/types/custom.d.ts
import { Request } from 'express';
import { MulterFile } from 'multer';

// Extend Express Request interface to include Multer file
declare module 'express-serve-static-core' {
  interface Request {
    file?: MulterFile;
    files?: MulterFile[];
    file?: File;        // For single file upload
    files?: File[];
    // insertId: number;
  }
}

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}
