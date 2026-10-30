import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Visit from '../models/Visit.js';

const router = Router();
const BOT = /bot|crawl|spider|slurp|preview|lighthouse|headless|facebookexternalhit|whatsapp/i;

// IST day key, so "today" matches the clock in Jaipur.
export const istDay = (d = new Date()) => new Date(d.getTime() + 330 * 60000).toISOString().slice(0, 10);

// Country comes from the CDN / proxy if it adds one (Cloudflare, Vercel, or Nginx GeoIP: X-Country-Code).
function countryOf(req) {
  const c = req.get('cf-ipcountry') || req.get('x-vercel-ip-country') || req.get('x-country-code') || '';
  return /^[A-Z]{2}$/i.test(c) && !['XX', 'T1'].includes(c.toUpperCase()) ? c.toUpperCase() : null;
}

// POST /api/track  { path, sid, ref, lang } — called by the website on each page view
router.post('/', rateLimit({ windowMs: 60 * 1000, limit: 60, standardHeaders: false, legacyHeaders: false }), async (req, res) => {
  try {
    const ua = req.get('user-agent') || '';
    const { path = '', sid = '', ref = '', lang = '' } = req.body || {};
    if (BOT.test(ua) || typeof path !== 'string' || !path.startsWith('/') || path.startsWith('/admin')) return res.status(204).end();
    let referrer = null;
    try {
      const host = ref ? new URL(ref).hostname.replace(/^www\./, '') : '';
      if (host && host !== req.hostname.replace(/^www\./, '')) referrer = host.slice(0, 120);
    } catch { /* ignore bad referrer */ }
    await Visit.create({
      day: istDay(),
      path: path.split('?')[0].slice(0, 200),
      sid: String(sid).slice(0, 40),
      country: countryOf(req),
      referrer,
      device: /mobile|android|iphone|ipad/i.test(ua) ? 'mobile' : 'desktop',
      lang: String(lang).slice(0, 10) || null,
    });
  } catch { /* tracking must never break the site */ }
  res.status(204).end();
});

export default router;
