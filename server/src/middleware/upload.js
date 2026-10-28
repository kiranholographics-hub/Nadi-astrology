import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

// Thumb impressions and floor plans are personal data (DPDP Act).
// They are stored OUTSIDE any public/static folder and are never served by URL.
// Relative paths are resolved from the server folder (not from wherever the process was started).
const SERVER_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const PRIVATE_DIR = path.resolve(SERVER_ROOT, process.env.PRIVATE_UPLOAD_DIR || 'private_uploads');
fs.mkdirSync(PRIVATE_DIR, { recursive: true });

const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'application/pdf']);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, PRIVATE_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().slice(0, 6);
    cb(null, `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 2 },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED.has(file.mimetype)) return cb(null, true);
    const err = new Error('Please upload a JPG, PNG, WEBP, HEIC or PDF file only.');
    err.status = 400;
    cb(err);
  },
});
