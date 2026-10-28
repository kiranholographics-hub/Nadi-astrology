import 'dotenv/config';
import mongoose from 'mongoose';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { connectDB } from '../config/db.js';
import Yantra from '../models/Yantra.js';
import { yantras } from '../data/yantras.js';

// Upserts by slug, so re-running never wipes prices/photos you have already added.
export async function seedYantras() {
  let created = 0;
  for (const y of yantras) {
    const r = await Yantra.updateOne(
      { slug: y.slug },
      { $setOnInsert: y },
      { upsert: true }
    );
    if (r.upsertedCount) created++;
  }
  return created;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  connectDB(process.env.MONGODB_URI)
    .then(seedYantras)
    .then((n) => console.log(`[seed] ${n} new yantra added (${yantras.length} total in list)`))
    .catch((e) => console.error(e))
    .finally(() => mongoose.disconnect());
}
