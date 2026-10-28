import { Router } from 'express';
import Yantra from '../models/Yantra.js';
import { categories } from '../data/yantras.js';

const router = Router();

// GET /api/yantras?category=Dhan&bestseller=true&sort=price_asc
router.get('/', async (req, res, next) => {
  try {
    const { category, bestseller, sort } = req.query;
    const filter = { active: true };
    if (category && categories.includes(category)) filter.category = category;
    if (bestseller === 'true') filter.bestseller = true;
    const sortBy = sort === 'price_asc' ? { priceINR: 1 } : sort === 'price_desc' ? { priceINR: -1 } : { order: 1 };
    const items = await Yantra.find(filter).sort(sortBy).lean();
    res.json({ categories, count: items.length, items });
  } catch (err) {
    next(err);
  }
});

// GET /api/yantras/:slug  (+ 2 related from same category)
router.get('/:slug', async (req, res, next) => {
  try {
    const item = await Yantra.findOne({ slug: req.params.slug, active: true }).lean();
    if (!item) return res.status(404).json({ error: 'Yantra not found.' });
    const related = await Yantra.find({ category: item.category, _id: { $ne: item._id }, active: true })
      .sort({ order: 1 })
      .limit(2)
      .select('name slug priceINR priceUSD art category')
      .lean();
    res.json({ item, related });
  } catch (err) {
    next(err);
  }
});

export default router;
