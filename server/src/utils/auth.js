import crypto from 'node:crypto';
import { promisify } from 'node:util';
import Admin from '../models/Admin.js';

const scrypt = promisify(crypto.scrypt);
export const COOKIE = 'ptrs_admin';
const MAX_AGE_S = 7 * 24 * 60 * 60; // stay logged in for 7 days

export async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const key = await scrypt(password, salt, 64);
  return `scrypt$${salt.toString('base64')}$${key.toString('base64')}`;
}

export async function verifyPassword(password, stored) {
  const [algo, salt, key] = String(stored || '').split('$');
  if (algo !== 'scrypt' || !salt || !key) return false;
  const expected = Buffer.from(key, 'base64');
  const actual = await scrypt(password, Buffer.from(salt, 'base64'), expected.length);
  return crypto.timingSafeEqual(expected, actual);
}

let devSecret;
function secret() {
  if (process.env.ADMIN_SECRET && process.env.ADMIN_SECRET.length >= 32) return process.env.ADMIN_SECRET;
  if (process.env.NODE_ENV === 'production') throw new Error('ADMIN_SECRET must be set (32+ characters)');
  devSecret ||= crypto.randomBytes(32).toString('hex'); // dev only: logins reset when the server restarts
  return devSecret;
}

const b64 = (s) => Buffer.from(s).toString('base64url');
const sign = (data) => crypto.createHmac('sha256', secret()).update(data).digest('base64url');

export function createToken(admin) {
  const payload = b64(JSON.stringify({ id: String(admin._id), v: admin.tokenVersion, exp: Math.floor(Date.now() / 1000) + MAX_AGE_S }));
  return `${payload}.${sign(payload)}`;
}

function readToken(token) {
  const [payload, sig] = String(token || '').split('.');
  if (!payload || !sig) return null;
  const good = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (good.length !== given.length || !crypto.timingSafeEqual(good, given)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return data.exp > Date.now() / 1000 ? data : null;
  } catch {
    return null;
  }
}

function getCookie(req, name) {
  const raw = req.headers.cookie || '';
  for (const part of raw.split(';')) {
    const i = part.indexOf('=');
    if (i > -1 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return null;
}

export function setLoginCookie(req, res, admin) {
  res.cookie(COOKIE, createToken(admin), {
    httpOnly: true,
    sameSite: 'lax',
    secure: req.secure,
    maxAge: MAX_AGE_S * 1000,
    path: '/',
  });
}

export function clearLoginCookie(res) {
  res.clearCookie(COOKIE, { path: '/' });
}

// Protects every /api/admin route except login.
export async function requireAdmin(req, res, next) {
  try {
    const data = readToken(getCookie(req, COOKIE));
    if (!data) return res.status(401).json({ error: 'Please log in.' });
    const admin = await Admin.findById(data.id).lean();
    if (!admin || admin.tokenVersion !== data.v) return res.status(401).json({ error: 'Please log in again.' });
    // Simple CSRF guard: other websites cannot send this custom header.
    if (!['GET', 'HEAD'].includes(req.method) && req.get('X-Admin') !== '1') return res.status(403).json({ error: 'Forbidden' });
    req.admin = admin;
    next();
  } catch (err) {
    next(err);
  }
}

// First start: create the admin from ADMIN_EMAIL / ADMIN_PASSWORD in .env (only if no admin exists yet).
export async function ensureAdmin() {
  if ((await Admin.estimatedDocumentCount()) > 0) return;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn('[admin] no admin account yet — set ADMIN_EMAIL and ADMIN_PASSWORD in .env, or run: npm run admin:create -- you@mail.com "password"');
    return;
  }
  await Admin.create({ email, passwordHash: await hashPassword(password) });
  console.log(`[admin] admin account created for ${email} — you can remove ADMIN_PASSWORD from .env now`);
}
