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
    // Every page twice: English at /…, Hindi at /hi/… (hreflang alternates in each <url>).
    const entry = (p, extra) => {
      const en = `${base()}${p}`;
      const hi = `${base()}/hi${p === '/' ? '' : p}`;
      const alt = `<xhtml:link rel="alternate" hreflang="en" href="${en}"/><xhtml:link rel="alternate" hreflang="hi" href="${hi}"/>`;
      return [`<url><loc>${en}</loc>${extra}${alt}</url>`, `<url><loc>${hi}</loc>${extra}${alt}</url>`];
    };
    const lastmod = (d) => (d ? `<lastmod>${new Date(d).toISOString().slice(0, 10)}</lastmod>` : '');
    const urls = [
      ...STATIC_PAGES.flatMap(([p, pr]) => entry(p, `<priority>${pr}</priority>`)),
      ...posts.flatMap((p) => entry(`/blog/${p.slug}`, `${lastmod(p.updatedAt)}<priority>0.6</priority>`)),
      ...countries.flatMap((c) => entry(`/nadi-astrology/${c.slug}`, `${lastmod(c.updatedAt)}<priority>0.8</priority>`)),
      ...yantras.flatMap((y) => entry(`/yantra-shop/${y.slug}`, `${lastmod(y.updatedAt)}<priority>0.7</priority>`)),
    ];
    res.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);
  } catch (err) {
    next(err);
  }
});

export default router;
