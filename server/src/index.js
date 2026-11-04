import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import { createApp } from './app.js';
import Yantra from './models/Yantra.js';
import { seedYantras } from './seed/seed.js';
import { ensureAdmin } from './utils/auth.js';
import Country from './models/Country.js';
import { countries } from './data/countries.js';
import Post from './models/Post.js';
import { blogSeed } from './data/blogSeed.js';
import { blogArticles, isPlaceholder } from './data/blogArticles.js';
import { EXTRA_FAQS, COUNTRY_CONTENT_VERSION } from './data/countries.js';
import { cleanHtml } from './utils/sanitize.js';
import { BLOG_BATCH, blogPosts2 } from './data/blogArticles2.js';
import SeedState from './models/SeedState.js';

const PORT = Number(process.env.PORT) || 5000;
const HOST = process.env.HOST || '0.0.0.0';

function checkEnv() {
  const missing = ['MONGODB_URI'].filter((k) => !process.env[k]);
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.SITE_URL || process.env.SITE_URL.includes('your-domain')) missing.push('SITE_URL');
    if (!process.env.ADMIN_SECRET || process.env.ADMIN_SECRET.length < 32) missing.push('ADMIN_SECRET (32+ characters)');
  }
  if (missing.length) {
    console.error(`[server] missing settings in .env: ${missing.join(', ')} — see .env.example`);
    process.exit(1);
  }
}

async function start() {
  checkEnv();
  await connectDB(process.env.MONGODB_URI);

  // First start on a fresh database: add the 15 yantras so the shop is not empty.
  if ((await Yantra.estimatedDocumentCount()) === 0) {
    const n = await seedYantras();
    console.log(`[seed] empty database — added ${n} yantras`);
  }

  // First start: add the first 7 country pages (edit them later in /admin/countries).
  if ((await Country.estimatedDocumentCount()) === 0) {
    await Country.insertMany(countries);
    console.log(`[seed] added ${countries.length} country pages`);
  }

  if ((await Post.estimatedDocumentCount()) === 0) {
    await Post.insertMany(blogSeed);
    console.log(`[seed] added ${blogSeed.length} blog drafts`);
  }

  // Second batch of blog articles: added once as drafts (slugs that already exist are skipped).
  if (!(await SeedState.exists({ key: BLOG_BATCH }))) {
    let added = 0;
    for (const p of blogPosts2) {
      if (await Post.exists({ slug: p.slug })) continue;
      await Post.create({ ...p, content: cleanHtml(p.content), contentHi: cleanHtml(p.contentHi), status: 'draft', allCountries: true });
      added++;
    }
    await SeedState.create({ key: BLOG_BATCH });
    console.log(`[seed] added ${added} blog drafts (${BLOG_BATCH})`);
  }

  // Existing country pages get the extra FAQs once (skipping any question already there).
  for (const [slug, list] of Object.entries(EXTRA_FAQS)) {
    const c = await Country.findOne({ slug, contentVersion: { $lt: COUNTRY_CONTENT_VERSION } });
    if (!c) continue;
    const have = new Set(c.faqs.map((f) => f.q?.en));
    list.filter(([q]) => !have.has(q.en)).forEach(([q, a]) => c.faqs.push({ q, a }));
    c.contentVersion = COUNTRY_CONTENT_VERSION;
    await c.save();
    console.log(`[seed] added FAQs to country page "${slug}"`);
  }

  // Starter drafts that still hold the placeholder text get the written article.
  // Posts that were already edited in /admin/blog are never touched; status stays as it is.
  for (const [slug, a] of Object.entries(blogArticles)) {
    const post = await Post.findOne({ slug }).select('content contentHi seoTitle metaDescription');
    if (!post || !isPlaceholder(post.content)) continue;
    post.content = cleanHtml(a.content);
    if (!post.contentHi) post.contentHi = cleanHtml(a.contentHi);
    if (!post.seoTitle) post.seoTitle = a.seoTitle;
    if (!post.metaDescription) post.metaDescription = a.metaDescription;
    await post.save();
    console.log(`[seed] filled article text for blog draft "${slug}"`);
  }

  await ensureAdmin();

  const server = createApp().listen(PORT, HOST, () => console.log(`[server] listening on http://${HOST}:${PORT} (${process.env.NODE_ENV || 'development'})`));

  const shutdown = (signal) => {
    console.log(`[server] ${signal} received, shutting down…`);
    server.close(() => mongoose.disconnect().finally(() => process.exit(0)));
    setTimeout(() => process.exit(1), 10000).unref();
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

process.on('unhandledRejection', (err) => console.error('[server] unhandled rejection:', err));

start().catch((err) => {
  console.error('[server] failed to start:', err.message);
  process.exit(1);
});
