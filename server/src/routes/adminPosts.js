import { Router } from 'express';
import mongoose from 'mongoose';
import Post, { POST_CATEGORIES } from '../models/Post.js';
import Country from '../models/Country.js';
import { blogImageUpload } from '../middleware/upload.js';
import { cleanHtml } from '../utils/sanitize.js';

// Mounted at /api/admin/posts (login already checked by the admin router)
const router = Router();
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const isId = (id) => mongoose.isValidObjectId(id);
const slugify = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 90).replace(/-$/, '');

router.get('/', wrap(async (_req, res) => {
  const items = await Post.find().sort({ publishAt: -1, updatedAt: -1 }).select('-content -contentHi').lean();
  const countries = await Country.find().sort({ order: 1, name: 1 }).select('name slug status').lean();
  res.json({ items, categories: POST_CATEGORIES, countries });
}));

router.get('/:id', wrap(async (req, res) => {
  if (!isId(req.params.id)) return res.status(404).json({ error: 'Not found' });
  const item = await Post.findById(req.params.id).lean();
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ item });
}));

async function buildFields(b, id) {
  const set = {};
  for (const k of ['title', 'titleHi', 'excerpt', 'excerptHi', 'seoTitle', 'metaDescription']) if (b[k] !== undefined) set[k] = String(b[k]).trim();
  if (b.title !== undefined && !set.title) throw Object.assign(new Error('Title is required.'), { status: 400 });
  if (b.slug !== undefined || (b.title && !id)) {
    set.slug = slugify(b.slug || b.title);
    if (!/^[a-z0-9-]{3,90}$/.test(set.slug)) throw Object.assign(new Error('URL slug must be 3–90 letters, numbers or dashes.'), { status: 400 });
    if (await Post.exists({ slug: set.slug, ...(id ? { _id: { $ne: id } } : {}) })) throw Object.assign(new Error(`/blog/${set.slug} already exists — change the URL slug.`), { status: 409 });
  }
  if (b.category !== undefined) {
    if (!POST_CATEGORIES.includes(b.category)) throw Object.assign(new Error('Invalid category'), { status: 400 });
    set.category = b.category;
  }
  if (b.content !== undefined) set.content = cleanHtml(b.content);
  if (b.contentHi !== undefined) set.contentHi = cleanHtml(b.contentHi);
  if (b.cover !== undefined) {
    const c = String(b.cover).trim();
    if (c && !/^(\/uploads\/|https:\/\/)/.test(c)) throw Object.assign(new Error('Cover must be an uploaded image or an https:// link.'), { status: 400 });
    set.cover = c;
  }
  if (b.youtubeId !== undefined) {
    const m = String(b.youtubeId).trim().match(/(?:v=|youtu\.be\/|embed\/|shorts\/)?([\w-]{11})(?:\b|$)/);
    set.youtubeId = m ? m[1] : '';
  }
  if (b.allCountries !== undefined) set.allCountries = !!b.allCountries;
  if (Array.isArray(b.countries)) set.countries = [...new Set(b.countries.map((c) => String(c).toLowerCase().trim()).filter(Boolean))].slice(0, 100);
  if (b.status !== undefined) {
    if (!['draft', 'scheduled', 'published'].includes(b.status)) throw Object.assign(new Error('Invalid status'), { status: 400 });
    set.status = b.status;
  }
  if (b.publishAt !== undefined) {
    const d = b.publishAt ? new Date(b.publishAt) : null;
    if (d && Number.isNaN(d.getTime())) throw Object.assign(new Error('Invalid publish date'), { status: 400 });
    set.publishAt = d;
  }
  // Publishing rules: "published now" gets the current time; "scheduled" needs a future date.
  if (set.status === 'published' && !set.publishAt) set.publishAt = new Date();
  if (set.status === 'scheduled' && (!set.publishAt || set.publishAt <= new Date())) {
    throw Object.assign(new Error('Pick a future date and time to schedule this post.'), { status: 400 });
  }
  return set;
}

router.post('/', wrap(async (req, res) => {
  const set = await buildFields({ status: 'draft', ...req.body }, null);
  const item = await Post.create(set);
  res.status(201).json({ item });
}));

router.patch('/:id', wrap(async (req, res) => {
  if (!isId(req.params.id)) return res.status(404).json({ error: 'Not found' });
  const set = await buildFields(req.body || {}, req.params.id);
  const item = await Post.findByIdAndUpdate(req.params.id, { $set: set }, { new: true, runValidators: true }).lean();
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json({ item });
}));

router.delete('/:id', wrap(async (req, res) => {
  if (!isId(req.params.id)) return res.status(404).json({ error: 'Not found' });
  await Post.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
}));

// POST /api/admin/posts/upload-image  (field "image") → { url }
router.post('/upload-image', (req, res, next) => {
  blogImageUpload.single('image')(req, res, (err) => {
    if (err) return next(err);
    if (!req.file) return res.status(400).json({ error: 'No image received.' });
    res.json({ url: `/uploads/blog/${req.file.filename}` });
  });
});

export default router;
