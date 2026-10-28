import { Router } from 'express';
import Lead from '../models/Lead.js';

const router = Router();

// POST /api/leads  { type, name, phone, email, country, subject, message, consent }
router.post('/', async (req, res, next) => {
  try {
    const b = req.body || {};
    if (!b.name || !b.phone) return res.status(400).json({ error: 'Name and phone/WhatsApp are required.' });
    if (!(b.consent === true || b.consent === 'true')) return res.status(400).json({ error: 'Please tick the consent checkbox.' });
    const lead = await Lead.create({
      type: ['contact', 'yantra-salaah', 'office-visit'].includes(b.type) ? b.type : 'contact',
      name: b.name, phone: b.phone, email: b.email, country: b.country, subject: b.subject, message: b.message,
      consent: true,
    });
    // TODO (next phase): WhatsApp/email alert to Pandit ji
    res.status(201).json({ id: lead._id, message: 'Message received. We will be in touch soon.' });
  } catch (err) {
    next(err);
  }
});

export default router;
