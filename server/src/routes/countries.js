import { Router } from 'express';
import Country from '../models/Country.js';

const router = Router();

// GET /api/countries — active country pages (for links on the site)
router.get('/', async (_req, res, next) => {
  try {
    const items = await Country.find({ status: 'active' }).sort({ order: 1, name: 1 }).select('name nameHi code slug inName').lean();
    res.json({ items });
  } catch (err) {
    next(err);
  }
});

// GET /api/countries/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const item = await Country.findOne({ slug: String(req.params.slug).toLowerCase(), status: 'active' }).lean();
    if (!item) return res.status(404).json({ error: 'Page not found.' });
    const others = await Country.find({ status: 'active', _id: { $ne: item._id } }).sort({ order: 1, name: 1 }).select('name nameHi slug').lean();
    res.json({ item, others });
  } catch (err) {
    next(err);
  }
});

export default router;
