import { Router } from 'express';
import Booking, { SERVICES } from '../models/Booking.js';
import { upload } from '../middleware/upload.js';

const router = Router();

const truthy = (v) => v === true || v === 'true' || v === 'on' || v === '1';

// POST /api/bookings  (multipart/form-data so Nadi thumb impression / Vastu floor plan can be attached)
router.post(
  '/',
  upload.fields([
    { name: 'thumbImpression', maxCount: 1 },
    { name: 'floorPlan', maxCount: 1 },
  ]),
  async (req, res, next) => {
    try {
      const b = req.body;
      if (!SERVICES.includes(b.service)) return res.status(400).json({ error: 'Please choose a service.' });
      if (!b.name || !b.phone) return res.status(400).json({ error: 'Name and phone/WhatsApp are required.' });
      if (!truthy(b.consent)) return res.status(400).json({ error: 'Please tick the consent checkbox.' });
      if (b.service === 'kp-prashna') {
        const n = Number(b.kpNumber);
        if (!Number.isInteger(n) || n < 1 || n > 249) return res.status(400).json({ error: 'The KP number must be between 1 and 249.' });
      }

      let members = [];
      if (b.members) {
        try {
          members = JSON.parse(b.members).slice(0, 5);
        } catch {
          members = [];
        }
      }

      const booking = await Booking.create({
        service: b.service,
        name: b.name,
        phone: b.phone,
        email: b.email,
        country: b.country,
        currency: b.currency === 'USD' ? 'USD' : 'INR',
        mode: b.mode,
        preferredSlot: b.preferredSlot,
        timezone: b.timezone,
        dob: b.dob,
        tob: b.tob,
        pob: b.pob,
        question: b.question,
        gender: b.gender || null,
        kpNumber: b.kpNumber ? Number(b.kpNumber) : undefined,
        city: b.city,
        propertyType: b.propertyType,
        areaSqft: b.areaSqft ? Number(b.areaSqft) : undefined,
        members,
        membersText: b.membersText,
        mainProblem: b.mainProblem,
        thumbImpression: req.files?.thumbImpression?.[0]?.filename || null,
        floorPlan: req.files?.floorPlan?.[0]?.filename || null,
        consent: true,
        status: 'awaiting_payment',
      });

      // TODO (next phase): create Razorpay order (INR) or PayPal order (USD) here,
      // send WhatsApp + email alerts to Pandit ji and confirmation to client.
      res.status(201).json({
        id: booking._id,
        status: booking.status,
        next: booking.currency === 'USD' ? 'paypal' : 'razorpay',
        message: 'Details received. Next step: payment.',
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
