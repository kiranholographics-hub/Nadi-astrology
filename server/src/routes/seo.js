import { Router } from 'express';
import Yantra from '../models/Yantra.js';
import { BLOG_SLUGS, STATIC_PAGES } from '../data/pages.js';

const router = Router();
const base = () => (process.env.SITE_URL || 'https://example.com').replace(/\/$/, '');

router.get('/robots.txt', (_req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /cart\nDisallow: /api/\n\nSitemap: ${base()}/sitemap.xml\n`);
});

router.get('/sitemap.xml', async (_req, res, next) => {
  try {
    const yantras = await Yantra.find({ active: true }).select('slug updatedAt').lean();
    const urls = [
      ...STATIC_PAGES.map(([p, pr]) => `<url><loc>${base()}${p}</loc><priority>${pr}</priority></url>`),
      ...BLOG_SLUGS.map((slug) => `<url><loc>${base()}/blog/${slug}</loc><priority>0.5</priority></url>`),
      ...yantras.map((y) => `<url><loc>${base()}/yantra-shop/${y.slug}</loc>${y.updatedAt ? `<lastmod>${new Date(y.updatedAt).toISOString().slice(0, 10)}</lastmod>` : ''}<priority>0.7</priority></url>`),
    ];
    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
  } catch (err) {
    next(err);
  }
});

export default router;
