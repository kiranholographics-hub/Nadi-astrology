import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import mongoose from 'mongoose';

import yantraRoutes from './routes/yantras.js';
import bookingRoutes from './routes/bookings.js';
import orderRoutes from './routes/orders.js';
import leadRoutes from './routes/leads.js';
import seoRoutes from './routes/seo.js';
import trackRoutes from './routes/track.js';
import countryRoutes from './routes/countries.js';
import postRoutes from './routes/posts.js';
import Post, { liveFilter } from './models/Post.js';
import Country from './models/Country.js';
import adminRoutes from './routes/admin.js';
import { PUBLIC_DIR } from './middleware/upload.js';
import Yantra from './models/Yantra.js';
import { OTHER_ROUTES, STATIC_PAGES } from './data/pages.js';
import { renderIndex } from './utils/pageMeta.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const SERVER_ROOT = path.resolve(__dirname, '..');
const isProd = process.env.NODE_ENV === 'production';

// The built React site. On the live server it lives in server/public
// (copied there by `npm run build:client`); in local dev it is read from client/dist.
function findClientBuild() {
  const candidates = [
    process.env.CLIENT_DIST && path.resolve(SERVER_ROOT, process.env.CLIENT_DIST),
    path.join(SERVER_ROOT, 'public'),
    path.resolve(SERVER_ROOT, '../client/dist'),
  ].filter(Boolean);
  return candidates.find((d) => fs.existsSync(path.join(d, 'index.html')));
}

// Known page paths → real 200. Anything else still shows the React 404 page, but with a 404 status (better for SEO).
const KNOWN = new Set([...STATIC_PAGES.map(([p]) => p), ...OTHER_ROUTES]);
let yantraSlugs = new Set();
let countrySlugs = new Set();
let postSlugs = new Set();
let slugsLoadedAt = 0;
// Admin changes (publish a post, activate a country) call this so new pages answer 200 straight away.
export function refreshKnownPaths() {
  slugsLoadedAt = 0;
}

async function isKnownPath(pathname) {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (KNOWN.has(clean) || clean === '/admin' || clean.startsWith('/admin/')) return true;
  const y = clean.match(/^\/yantra-shop\/([a-z0-9-]+)$/);
  const c = clean.match(/^\/nadi-astrology\/([a-z0-9-]+)$/);
  const b = clean.match(/^\/blog\/([a-z0-9-]+)$/);
  if (!y && !c && !b) return false;
  if (Date.now() - slugsLoadedAt > 60 * 1000 && mongoose.connection.readyState === 1) {
    // (scheduled posts go live on their own; the list refreshes at least once a minute)
    try {
      yantraSlugs = new Set((await Yantra.find({ active: true }).select('slug').lean()).map((d) => d.slug));
      countrySlugs = new Set((await Country.find({ status: 'active' }).select('slug').lean()).map((d) => d.slug));
      postSlugs = new Set((await Post.find(liveFilter()).select('slug').lean()).map((d) => d.slug));
      slugsLoadedAt = Date.now();
    } catch { /* keep the previous list */ }
  }
  if (y) return yantraSlugs.size === 0 || yantraSlugs.has(y[1]);
  if (c) return countrySlugs.has(c[1]);
  return postSlugs.has(b[1]);
}

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  // Behind Nginx / Hostinger / Render the real visitor IP comes in X-Forwarded-For (needed for rate limiting).
  app.set('trust proxy', process.env.TRUST_PROXY ? Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY : isProd ? 1 : false);

  // One address for Google: www.<domain> → <domain> (SITE_URL), so the site is not indexed twice.
  const siteUrl = (process.env.SITE_URL || '').replace(/\/$/, '');
  const siteHost = siteUrl ? new URL(siteUrl).hostname : '';
  if (siteHost && !siteHost.startsWith('www.')) {
    app.use((req, res, next) => (req.hostname === `www.${siteHost}` ? res.redirect(301, `${siteUrl}${req.originalUrl}`) : next()));
  }
  // YouTube embeds refuse to play (error 153) without a referrer, so send the origin to other sites.
  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false, referrerPolicy: { policy: 'strict-origin-when-cross-origin' } }));
  app.use(compression());
  const origins = process.env.CLIENT_ORIGIN?.split(',').map((s) => s.trim()).filter(Boolean);
  app.use('/api', cors({ origin: origins?.length ? origins : !isProd }));
  app.use(express.json({ limit: '200kb' }));
  if (process.env.NODE_ENV !== 'test') app.use(morgan(isProd ? 'combined' : 'dev'));

  const writeLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false });

  app.get('/api/health', (_req, res) => res.json({ ok: true, db: mongoose.connection.readyState === 1, uptime: Math.round(process.uptime()) }));
  app.use('/api/yantras', yantraRoutes);
  app.use('/api/bookings', writeLimiter, bookingRoutes);
  app.use('/api/orders', writeLimiter, orderRoutes);
  app.use('/api/leads', writeLimiter, leadRoutes);
  app.use('/api/track', trackRoutes);
  app.use('/api/countries', countryRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found' }));
  app.use(seoRoutes); // /sitemap.xml, /robots.txt
  // Yantra photos uploaded from the admin
  app.use('/uploads', express.static(PUBLIC_DIR, { maxAge: '30d', fallthrough: false }));

  const dist = findClientBuild();
  if (dist) {
    console.log(`[server] serving website from ${path.relative(process.cwd(), dist) || dist}`);
    // Vite file names contain a hash, so they can be cached for a year.
    app.use('/assets', express.static(path.join(dist, 'assets'), { maxAge: '365d', immutable: true, fallthrough: false }));
    app.use(express.static(dist, { maxAge: '1d', index: false }));
    const indexHtml = path.join(dist, 'index.html');
    app.get('*', async (req, res, next) => {
      try {
        const ok = await isKnownPath(req.path);
        const html = ok ? await renderIndex(indexHtml, req.path, siteUrl || `${req.protocol}://${req.get('host')}`) : null;
        res.status(ok ? 200 : 404).set('Cache-Control', 'no-cache');
        if (html) res.type('html').send(html);
        else res.sendFile(indexHtml);
      } catch (err) {
        next(err);
      }
    });
  } else {
    console.warn('[server] website build not found — run `npm run build:client` (API still works).');
    app.get('/', (_req, res) => res.type('text/plain').send('API is running. Website build not found — run `npm run build:client`.'));
  }

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    const status = err.name === 'ValidationError' || err.name === 'MulterError' ? 400 : err.status || err.statusCode || 500;
    if (status >= 500) console.error(err);
    res.status(status).json({ error: status >= 500 ? 'Server error' : err.message });
  });

  return app;
}
