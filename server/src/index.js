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
