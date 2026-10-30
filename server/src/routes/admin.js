import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import fs from 'node:fs';
import path from 'node:path';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import Booking, { SERVICES } from '../models/Booking.js';
import Order from '../models/Order.js';
import Lead from '../models/Lead.js';
import Yantra from '../models/Yantra.js';
import Visit from '../models/Visit.js';
import { categories } from '../data/yantras.js';
import { PRIVATE_DIR, PUBLIC_DIR, imageUpload } from '../middleware/upload.js';
import { clearLoginCookie, hashPassword, requireAdmin, setLoginCookie, verifyPassword } from '../utils/auth.js';
import { istDay } from './track.js';
import adminCountries from './adminCountries.js';
import adminPosts from './adminPosts.js';
import { refreshKnownPaths } from '../app.js';

const router = Router();
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const isId = (id) => mongoose.isValidObjectId(id);
const escapeRe = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const noStore = (_req, res, next) => { res.set('Cache-Control', 'no-store'); next(); };

router.use(noStore);

// ---------- login / logout ----------
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false, message: { error: 'Too many login attempts. Try again in 15 minutes.' } });

router.post('/login', loginLimiter, wrap(async (req, res) => {
  const email = String(req.body?.email || '').trim().toLowerCase();
  const password = String(req.body?.password || '');
  const admin = email ? await Admin.findOne({ email }) : null;
  const ok = admin ? await verifyPassword(password, admin.passwordHash) : false;
  if (!ok) return res.status(401).json({ error: 'Wrong email or password.' });
  admin.lastLoginAt = new Date();
  await admin.save();
  setLoginCookie(req, res, admin);
  res.json({ email: admin.email });
}));

router.post('/logout', (_req, res) => {
  clearLoginCookie(res);
  res.json({ ok: true });
});

router.use(requireAdmin); // everything below needs a valid login
router.use((req, _res, next) => {
  if (req.method !== 'GET') refreshKnownPaths();
  next();
});

router.get('/me', (req, res) => res.json({ email: req.admin.email, lastLoginAt: req.admin.lastLoginAt }));

router.post('/password', wrap(async (req, res) => {
  const { current = '', next: newPw = '' } = req.body || {};
  const admin = await Admin.findById(req.admin._id);
  if (!(await verifyPassword(String(current), admin.passwordHash))) return res.status(400).json({ error: 'Current password is wrong.' });
  if (String(newPw).length < 10) return res.status(400).json({ error: 'New password must be at least 10 characters.' });
  admin.passwordHash = await hashPassword(String(newPw));
  admin.tokenVersion += 1; // logs out every other device
  await admin.save();
  setLoginCookie(req, res, admin);
  res.json({ ok: true });
}));

// ---------- dashboard ----------
async function countBy(Model, field) {
  const rows = await Model.aggregate([{ $group: { _id: `$${field}`, n: { $sum: 1 } } }]);
  return Object.fromEntries(rows.map((r) => [r._id ?? 'none', r.n]));
}

router.get('/stats', wrap(async (_req, res) => {
  const d7 = istDay(new Date(Date.now() - 6 * 864e5));
  const d30 = istDay(new Date(Date.now() - 29 * 864e5));
  const [bookings, orders, leads, visits7, visits30, today, recentBookings, recentOrders, recentLeads, missingPrice] = await Promise.all([
    countBy(Booking, 'status'),
    countBy(Order, 'status'),
    countBy(Lead, 'status'),
    Visit.countDocuments({ day: { $gte: d7 } }),
    Visit.countDocuments({ day: { $gte: d30 } }),
    Visit.countDocuments({ day: istDay() }),
    Booking.find().sort({ createdAt: -1 }).limit(6).select('name service status country createdAt preferredSlot').lean(),
    Order.find().sort({ createdAt: -1 }).limit(5).select('customer.name customer.country subtotal currency status createdAt').lean(),
    Lead.find().sort({ createdAt: -1 }).limit(5).select('name type status country createdAt').lean(),
    Yantra.countDocuments({ active: true, $or: [{ priceINR: null }, { priceUSD: null }] }),
  ]);
  res.json({ bookings, orders, leads, visits: { today, last7: visits7, last30: visits30 }, recentBookings, recentOrders, recentLeads, yantrasMissingPrice: missingPrice });
}));

// ---------- bookings ----------
router.get('/bookings', wrap(async (req, res) => {
  const { status, service, q } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (service && SERVICES.includes(service)) filter.service = service;
  if (q) {
    const re = new RegExp(escapeRe(q).slice(0, 60), 'i');
    filter.$or = [{ name: re }, { phone: re }, { email: re }, { country: re }];
  }
  const items = await Booking.find(filter).sort({ createdAt: -1 }).limit(300)
    .select('service name phone email country currency mode preferredSlot status createdAt thumbImpression floorPlan').lean();
  res.json({ items });
}));

router.get('/bookings/:id', wrap(async (req, res) => {
  if (!isId(req.params.id)) return res.status(404).json({ error: 'Not found' });
  const item = await Booking.findById(req.params.id).lean();
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ item });
}));

const BOOKING_STATUS = Booking.schema.path('status').enumValues;
router.patch('/bookings/:id', wrap(async (req, res) => {
  if (!isId(req.params.id)) return res.status(404).json({ error: 'Not found' });
  const set = {};
  const b = req.body || {};
  if (b.status !== undefined) {
    if (!BOOKING_STATUS.includes(b.status)) return res.status(400).json({ error: 'Invalid status' });
    set.status = b.status;
  }
  if (b.adminNotes !== undefined) set.adminNotes = String(b.adminNotes).slice(0, 4000);
  if (b.preferredSlot !== undefined) set.preferredSlot = String(b.preferredSlot).slice(0, 120);
  if (b.paymentReference !== undefined) set['payment.reference'] = String(b.paymentReference).slice(0, 120);
  if (b.paymentAmount !== undefined) set['payment.amount'] = b.paymentAmount === '' || b.paymentAmount == null ? null : Number(b.paymentAmount);
  const item = await Booking.findByIdAndUpdate(req.params.id, { $set: set }, { new: true, runValidators: true }).lean();
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ item });
}));

// Private files (thumb impression / floor plan) — only through this logged-in route, never public.
router.get('/bookings/:id/file/:field', wrap(async (req, res) => {
  const { id, field } = req.params;
  if (!isId(id) || !['thumbImpression', 'floorPlan'].includes(field)) return res.status(404).json({ error: 'Not found' });
  const b = await Booking.findById(id).select(`name ${field}`).lean();
  const name = b?.[field];
  if (!name) return res.status(404).json({ error: 'No file' });
  const file = path.join(PRIVATE_DIR, path.basename(name));
  if (!fs.existsSync(file)) return res.status(404).json({ error: 'File missing on server' });
  const label = `${field === 'thumbImpression' ? 'thumb' : 'floor-plan'}-${String(b.name || 'client').replace(/[^\w-]+/g, '-').slice(0, 40)}${path.extname(name)}`;
  res.set({ 'Cache-Control': 'no-store', 'Content-Security-Policy': "sandbox; default-src 'none'; img-src 'self'; style-src 'unsafe-inline'", 'X-Content-Type-Options': 'nosniff' });
  const SAFE = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.pdf': 'application/pdf' };
  const type = SAFE[path.extname(name).toLowerCase()];
  if (req.query.download || !type) return res.download(file, label); // anything unexpected is never shown inline
  res.type(type).sendFile(file);
}));

// ---------- orders ----------
const ORDER_STATUS = Order.schema.path('status').enumValues;
router.get('/orders', wrap(async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  const items = await Order.find(filter).sort({ createdAt: -1 }).limit(300).lean();
  res.json({ items });
}));

router.patch('/orders/:id', wrap(async (req, res) => {
  if (!isId(req.params.id)) return res.status(404).json({ error: 'Not found' });
  const b = req.body || {};
  const set = {};
  if (b.status !== undefined) {
    if (!ORDER_STATUS.includes(b.status)) return res.status(400).json({ error: 'Invalid status' });
    set.status = b.status;
  }
  for (const k of ['courier', 'trackingNumber']) if (b[k] !== undefined) set[k] = String(b[k]).slice(0, 80);
  if (b.adminNotes !== undefined) set.adminNotes = String(b.adminNotes).slice(0, 4000);
  if (b.paymentReference !== undefined) set['payment.reference'] = String(b.paymentReference).slice(0, 120);
  const item = await Order.findByIdAndUpdate(req.params.id, { $set: set }, { new: true, runValidators: true }).lean();
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ item });
}));

// ---------- enquiries ----------
const LEAD_STATUS = Lead.schema.path('status').enumValues;
router.get('/leads', wrap(async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  const items = await Lead.find(filter).sort({ createdAt: -1 }).limit(500).lean();
  res.json({ items });
}));

router.patch('/leads/:id', wrap(async (req, res) => {
  if (!isId(req.params.id)) return res.status(404).json({ error: 'Not found' });
  const b = req.body || {};
  const set = {};
  if (b.status !== undefined) {
    if (!LEAD_STATUS.includes(b.status)) return res.status(400).json({ error: 'Invalid status' });
    set.status = b.status;
  }
  if (b.adminNotes !== undefined) set.adminNotes = String(b.adminNotes).slice(0, 4000);
  const item = await Lead.findByIdAndUpdate(req.params.id, { $set: set }, { new: true }).lean();
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ item });
}));

// ---------- yantras ----------
router.get('/yantras', wrap(async (_req, res) => {
  const items = await Yantra.find().sort({ order: 1 }).lean();
  res.json({ items, categories });
}));

const TEXT = ['name', 'material', 'deity', 'pranPratishtha', 'description', 'purpose', 'care', 'boxContents', 'videoUrl'];
const MONEY = ['priceINR', 'priceUSD', 'sankalpPriceINR', 'sankalpPriceUSD', 'weightGrams', 'order'];
const num = (v) => (v === '' || v === null || v === undefined ? null : Number(v));

router.patch('/yantras/:id', wrap(async (req, res) => {
  if (!isId(req.params.id)) return res.status(404).json({ error: 'Not found' });
  const b = req.body || {};
  const set = {};
  for (const k of TEXT) if (b[k] !== undefined) set[k] = b[k] === '' ? null : String(b[k]).slice(0, 4000);
  for (const k of MONEY) {
    if (b[k] === undefined) continue;
    const n = num(b[k]);
    if (n !== null && (!Number.isFinite(n) || n < 0)) return res.status(400).json({ error: `${k} must be a positive number` });
    set[k] = k === 'order' ? n ?? 0 : n;
  }
  if (b.name !== undefined && !String(b.name).trim()) return res.status(400).json({ error: 'Name is required' });
  if (b.category !== undefined) {
    if (!categories.includes(b.category)) return res.status(400).json({ error: 'Invalid category' });
    set.category = b.category;
  }
  if (b.stock !== undefined) set.stock = b.stock;
  for (const k of ['bestseller', 'active']) if (b[k] !== undefined) set[k] = !!b[k];
  if (Array.isArray(b.sizes)) set.sizes = b.sizes.map((s) => String(s).trim()).filter(Boolean).slice(0, 8);
  if (b.sthapana && typeof b.sthapana === 'object') {
    for (const k of ['day', 'direction', 'shuddhi', 'mantra', 'daily']) if (b.sthapana[k] !== undefined) set[`sthapana.${k}`] = String(b.sthapana[k]).slice(0, 1000) || null;
  }
  if (Array.isArray(b.images)) {
    // reorder / relabel / remove (only images that already belong to this yantra)
    const cur = await Yantra.findById(req.params.id).select('images').lean();
    const known = new Set((cur?.images || []).map((i) => i.url));
    set.images = b.images.filter((i) => i && known.has(i.url)).map((i) => ({ url: i.url, label: String(i.label || '').slice(0, 40) }));
  }
  const item = await Yantra.findByIdAndUpdate(req.params.id, { $set: set }, { new: true, runValidators: true }).lean();
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ item });
}));

router.post('/yantras/:id/images', wrap(async (req, res, next) => {
  if (!isId(req.params.id)) return res.status(404).json({ error: 'Not found' });
  const y = await Yantra.findById(req.params.id);
  if (!y) return res.status(404).json({ error: 'Not found' });
  req.params.slug = y.slug;
  imageUpload.array('images', 6)(req, res, async (err) => {
    if (err) return next(err);
    try {
      const labels = ['Front', 'Back', 'Size in hand', 'Packaging'];
      for (const f of req.files || []) {
        if (y.images.length >= 8) { fs.rmSync(f.path, { force: true }); continue; }
        y.images.push({ url: `/uploads/yantras/${f.filename}`, label: labels[y.images.length] || '' });
      }
      await y.save();
      res.json({ item: y.toObject() });
    } catch (e) {
      next(e);
    }
  });
}));

// Remove image files that no yantra uses any more (called after images are removed in the editor).
router.post('/yantras/cleanup-images', wrap(async (_req, res) => {
  const used = new Set((await Yantra.find().select('images').lean()).flatMap((y) => y.images.map((i) => path.basename(i.url))));
  const dir = path.join(PUBLIC_DIR, 'yantras');
  let removed = 0;
  for (const f of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
    if (!used.has(f)) { fs.rmSync(path.join(dir, f), { force: true }); removed++; }
  }
  res.json({ removed });
}));

// ---------- country pages ----------
router.use('/countries', adminCountries);
router.use('/posts', adminPosts);

// ---------- visitors ----------
router.get('/visitors', wrap(async (req, res) => {
  const days = Math.min(365, Math.max(7, Number(req.query.days) || 30));
  const from = istDay(new Date(Date.now() - (days - 1) * 864e5));
  const match = { $match: { day: { $gte: from } } };
  const top = (field, limit = 30) => Visit.aggregate([match, { $group: { _id: `$${field}`, n: { $sum: 1 } } }, { $sort: { n: -1 } }, { $limit: limit }]);
  const [total, inRange, byCountry, byPath, byDay, byDevice, byReferrer, sessions] = await Promise.all([
    Visit.estimatedDocumentCount(),
    Visit.countDocuments({ day: { $gte: from } }),
    top('country'),
    top('path', 25),
    Visit.aggregate([match, { $group: { _id: '$day', n: { $sum: 1 } } }, { $sort: { _id: 1 } }]),
    top('device', 3),
    top('referrer', 15),
    Visit.aggregate([match, { $group: { _id: '$sid' } }, { $count: 'n' }]),
  ]);
  const rows = (arr) => arr.map((r) => ({ key: r._id, n: r.n }));
  res.json({
    days, total, inRange, unique: sessions[0]?.n || 0,
    byCountry: rows(byCountry), byPath: rows(byPath), byDay: rows(byDay), byDevice: rows(byDevice), byReferrer: rows(byReferrer),
  });
}));

export default router;
