import { Router } from 'express';
import Yantra from '../models/Yantra.js';
import Country from '../models/Country.js';
import { STATIC_PAGES } from '../data/pages.js';
import Post, { liveFilter } from '../models/Post.js';

const router = Router();
const base = () => (process.env.SITE_URL || 'https://example.com').replace(/\/$/, '');

// The public read APIs stay crawlable: Google renders the React pages and needs their data,
// otherwise country / yantra / blog pages look empty to it ("Soft 404").
router.get('/robots.txt', (_req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /cart\nDisallow: /admin\nDisallow: /api/\nAllow: /api/countries\nAllow: /api/posts\nAllow: /api/yantras\n\nSitemap: ${base()}/sitemap.xml\n`);
});

router.get('/sitemap.xml', async (_req, res, next) => {
  try {
    const yantras = await Yantra.find({ active: true }).select('slug updatedAt').lean();
    const countries = await Country.find({ status: 'active' }).select('slug updatedAt').lean();
    const posts = await Post.find(liveFilter()).select('slug updatedAt').lean();
    const urls = [
      ...STATIC_PAGES.map(([p, pr]) => `<url><loc>${base()}${p}</loc><priority>${pr}</priority></url>`),
      ...posts.map((p) => `<url><loc>${base()}/blog/${p.slug}</loc><lastmod>${new Date(p.updatedAt).toISOString().slice(0, 10)}</lastmod><priority>0.6</priority></url>`),
      ...countries.map((c) => `<url><loc>${base()}/nadi-astrology/${c.slug}</loc>${c.updatedAt ? `<lastmod>${new Date(c.updatedAt).toISOString().slice(0, 10)}</lastmod>` : ''}<priority>0.8</priority></url>`),
      ...yantras.map((y) => `<url><loc>${base()}/yantra-shop/${y.slug}</loc>${y.updatedAt ? `<lastmod>${new Date(y.updatedAt).toISOString().slice(0, 10)}</lastmod>` : ''}<priority>0.7</priority></url>`),
    ];
    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
  } catch (err) {
    next(err);
  }
});

export default router;
