import { Router } from 'express';
import Yantra from '../models/Yantra.js';
import Order from '../models/Order.js';

const router = Router();

// POST /api/orders  { currency, items:[{slug,size,qty,sankalp,sankalpName,gotra}], customer:{...}, consent }
// Prices are always re-read from the DB — never trusted from the browser.
router.post('/', async (req, res, next) => {
  try {
    const { currency = 'INR', items = [], customer = {}, consent } = req.body || {};
    if (!consent) return res.status(400).json({ error: 'Please tick the consent checkbox.' });
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'Your cart is empty.' });
    if (!customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({ error: 'Name, phone and address are required.' });
    }
    const cur = currency === 'USD' ? 'USD' : 'INR';
    const slugs = items.map((i) => i.slug);
    const docs = await Yantra.find({ slug: { $in: slugs }, active: true }).lean();
    const bySlug = Object.fromEntries(docs.map((d) => [d.slug, d]));

    const lines = [];
    let subtotal = 0;
    let pricesMissing = false;
    for (const i of items) {
      const y = bySlug[i.slug];
      if (!y) return res.status(400).json({ error: `Yantra not found: ${i.slug}` });
      const qty = Math.min(20, Math.max(1, Number(i.qty) || 1));
      const base = cur === 'USD' ? y.priceUSD : y.priceINR;
      const extra = i.sankalp ? (cur === 'USD' ? y.sankalpPriceUSD : y.sankalpPriceINR) : 0;
      if (base == null || (i.sankalp && extra == null)) pricesMissing = true;
      const unit = (base || 0) + (extra || 0);
      subtotal += unit * qty;
      lines.push({
        yantra: y._id,
        name: y.name,
        size: y.sizes.includes(i.size) ? i.size : y.sizes[1] || y.sizes[0],
        sankalp: !!i.sankalp,
        sankalpName: i.sankalpName,
        gotra: i.gotra,
        qty,
        unitPrice: unit,
      });
    }
    if (pricesMissing) {
      return res.status(409).json({ error: 'Yantra prices have not been set yet. Please add prices in the admin before taking orders.' });
    }

    const order = await Order.create({ items: lines, currency: cur, subtotal, customer, consent: true });
    // TODO (next phase): create Razorpay / PayPal order and return its id for checkout.
    res.status(201).json({ id: order._id, subtotal, currency: cur, next: cur === 'USD' ? 'paypal' : 'razorpay' });
  } catch (err) {
    next(err);
  }
});

export default router;
