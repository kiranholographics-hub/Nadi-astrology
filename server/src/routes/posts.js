import { Router } from 'express';
import Post, { liveFilter } from '../models/Post.js';

const router = Router();
const LIST_FIELDS = 'title titleHi slug category excerpt excerptHi cover publishAt allCountries countries';

// GET /api/posts?country=usa&category=Nadi&limit=3
router.get('/', async (req, res, next) => {
  try {
    const filter = liveFilter();
    if (req.query.country) {
      const slug = String(req.query.country).toLowerCase();
      filter.$or = [{ allCountries: true }, { countries: slug }];
    }
    if (req.query.category) filter.category = String(req.query.category);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 100));
    const items = await Post.find(filter).sort({ publishAt: -1 }).limit(limit).select(LIST_FIELDS).lean();
    res.json({ items });
  } catch (err) {
    next(err);
  }
});

// GET /api/posts/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const item = await Post.findOne({ ...liveFilter(), slug: String(req.params.slug).toLowerCase() }).lean();
    if (!item) return res.status(404).json({ error: 'Post not found.' });
    const related = await Post.find({ ...liveFilter(), _id: { $ne: item._id }, category: item.category }).sort({ publishAt: -1 }).limit(3).select(LIST_FIELDS).lean();
    res.json({ item, related });
  } catch (err) {
    next(err);
  }
});

export default router;
