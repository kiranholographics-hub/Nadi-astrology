import { Router } from 'express';
import mongoose from 'mongoose';
import Country from '../models/Country.js';

// Mounted at /api/admin/countries (login already checked by the admin router)
const router = Router();
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const isId = (id) => mongoose.isValidObjectId(id);
const slugify = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 40);
const tx = (v) => ({ en: String(v?.en ?? '').slice(0, 4000), hi: String(v?.hi ?? '').slice(0, 4000) });

router.get('/', wrap(async (_req, res) => {
  const items = await Country.find().sort({ order: 1, name: 1 }).lean();
  res.json({ items });
}));

router.post('/', wrap(async (req, res) => {
  const name = String(req.body?.name || '').trim();
  const code = String(req.body?.code || '').trim().toUpperCase();
  const slug = slugify(req.body?.slug || name);
  if (!name) return res.status(400).json({ error: 'Country name is required.' });
  if (!/^[A-Z]{2}$/.test(code)) return res.status(400).json({ error: 'Country code must be 2 letters, e.g. NZ.' });
  if (!/^[a-z0-9-]{2,40}$/.test(slug)) return res.status(400).json({ error: 'URL slug must be 2–40 letters, numbers or dashes.' });
  if (await Country.exists({ slug })) return res.status(409).json({ error: `/nadi-astrology/${slug} already exists.` });
  const last = await Country.findOne().sort({ order: -1 }).select('order').lean();
  const item = await Country.create({ name, code, slug, inName: name, status: 'draft', order: (last?.order || 0) + 1 });
  res.status(201).json({ item });
}));

router.patch('/:id', wrap(async (req, res) => {
  if (!isId(req.params.id)) return res.status(404).json({ error: 'Not found' });
  const b = req.body || {};
  const set = {};
  for (const k of ['name', 'nameHi', 'inName', 'shippingDays', 'seoTitle', 'metaDescription']) if (b[k] !== undefined) set[k] = String(b[k]).trim();
  if (b.name !== undefined && !set.name) return res.status(400).json({ error: 'Country name is required.' });
  if (b.code !== undefined) {
    set.code = String(b.code).trim().toUpperCase();
    if (!/^[A-Z]{2}$/.test(set.code)) return res.status(400).json({ error: 'Country code must be 2 letters.' });
  }
  if (b.slug !== undefined) {
    set.slug = slugify(b.slug);
    if (!/^[a-z0-9-]{2,40}$/.test(set.slug)) return res.status(400).json({ error: 'URL slug must be 2–40 letters, numbers or dashes.' });
    if (await Country.exists({ slug: set.slug, _id: { $ne: req.params.id } })) return res.status(409).json({ error: 'Another country already uses this URL.' });
  }
  if (b.status !== undefined) {
    if (!['active', 'draft', 'paused'].includes(b.status)) return res.status(400).json({ error: 'Invalid status' });
    set.status = b.status;
  }
  if (b.order !== undefined) set.order = Number(b.order) || 0;
  for (const k of ['intro', 'community', 'customsNote']) if (b[k] !== undefined) set[k] = tx(b[k]);
  if (Array.isArray(b.cities)) set.cities = b.cities.map((c) => String(c).trim()).filter(Boolean).slice(0, 20);
  if (Array.isArray(b.timezones)) {
    const valid = (tz) => { try { new Intl.DateTimeFormat('en', { timeZone: tz }); return true; } catch { return false; } };
    const zones = b.timezones.map((z) => ({ label: String(z?.label || '').trim(), tz: String(z?.tz || '').trim() })).filter((z) => z.label && z.tz).slice(0, 6);
    const bad = zones.find((z) => !valid(z.tz));
    if (bad) return res.status(400).json({ error: `Unknown time zone "${bad.tz}". Use names like America/New_York or Asia/Dubai.` });
    set.timezones = zones;
  }
  if (Array.isArray(b.faqs)) set.faqs = b.faqs.map((f) => ({ q: tx(f?.q), a: tx(f?.a) })).filter((f) => f.q.en && f.a.en).slice(0, 12);
  const item = await Country.findByIdAndUpdate(req.params.id, { $set: set }, { new: true, runValidators: true }).lean();
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ item });
}));

router.delete('/:id', wrap(async (req, res) => {
  if (!isId(req.params.id)) return res.status(404).json({ error: 'Not found' });
  await Country.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}));

export default router;
