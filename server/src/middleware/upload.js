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
    // Extension comes from the checked file type, never from the visitor's file name.
    const ext = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/heic': '.heic', 'application/pdf': '.pdf' }[file.mimetype] || '.bin';
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

// Public images (yantra photos) — these ARE meant to be shown on the website, served from /uploads.
export const PUBLIC_DIR = path.resolve(SERVER_ROOT, process.env.PUBLIC_UPLOAD_DIR || 'uploads');
const YANTRA_DIR = path.join(PUBLIC_DIR, 'yantras');
fs.mkdirSync(YANTRA_DIR, { recursive: true });

const IMAGES = new Set(['image/jpeg', 'image/png', 'image/webp']);
export const imageUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, YANTRA_DIR),
    filename: (req, file, cb) => {
      const ext = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' }[file.mimetype];
      const base = String(req.params.slug || 'yantra').replace(/[^a-z0-9-]/g, '').slice(0, 40) || 'yantra';
      cb(null, `${base}-${Date.now()}-${crypto.randomBytes(3).toString('hex')}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 6 },
  fileFilter: (_req, file, cb) => {
    if (IMAGES.has(file.mimetype)) return cb(null, true);
    const err = new Error('Please upload JPG, PNG or WEBP images only (max 5 MB).');
    err.status = 400;
    cb(err);
  },
});

// Blog cover / inline photos (public), saved in uploads/blog
const BLOG_DIR = path.join(PUBLIC_DIR, 'blog');
fs.mkdirSync(BLOG_DIR, { recursive: true });
export const blogImageUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, BLOG_DIR),
    filename: (_req, file, cb) => {
      const ext = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp' }[file.mimetype];
      cb(null, `blog-${Date.now()}-${crypto.randomBytes(4).toString('hex')}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (IMAGES.has(file.mimetype)) return cb(null, true);
    const err = new Error('Please upload a JPG, PNG or WEBP image (max 5 MB).');
    err.status = 400;
    cb(err);
  },
});
