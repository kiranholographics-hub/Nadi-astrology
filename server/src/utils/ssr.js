import fs from 'node:fs';
import mongoose from 'mongoose';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import Post, { liveFilter } from '../models/Post.js';
import Country from '../models/Country.js';
import Yantra from '../models/Yantra.js';
import { categories } from '../data/yantras.js';
import { yantraContent } from '../data/yantraContent.js';

// Server-side rendering: the page's text goes into the first HTML response, so search engines
// (and link previews) see the content without running JavaScript. The bundle is built by
// scripts/build-client.js into server/ssr. If it is missing or fails, the site still works as before.
const BUNDLE = path.join(path.dirname(fileURLToPath(import.meta.url)), '../../ssr/entry-server.js');
let renderer; // Promise<render | null>

function loadRenderer() {
  if (!renderer) {
    renderer = fs.existsSync(BUNDLE)
      ? import(pathToFileURL(BUNDLE).href).then((m) => m.render).catch((err) => {
          console.error('[ssr] bundle failed to load:', err.message);
          return null;
        })
      : Promise.resolve(null);
  }
  return renderer;
}

const POST_LIST = 'title titleHi slug category excerpt excerptHi cover publishAt allCountries countries';

// The same data the page would fetch from /api, keyed the way the pages read it (useInitialData).
async function loadData(p) {
  const data = {};
  data.countries = await Country.find({ status: 'active' }).sort({ order: 1, name: 1 }).select('name nameHi code slug inName').lean();
  const yantraList = async () => ({ categories, items: await Yantra.find({ active: true }).sort({ order: 1 }).lean() });
  const postList = () => Post.find(liveFilter()).sort({ publishAt: -1 }).limit(100).select(POST_LIST).lean();

  if (p === '/') {
    data.yantras = await yantraList();
    data.posts = await postList();
  } else if (p === '/yantra-shop') {
    data.yantras = await yantraList();
  } else if (p === '/blog') {
    data.posts = await postList();
  }
  let m = p.match(/^\/yantra-shop\/([a-z0-9-]+)$/);
  if (m) {
    const item = await Yantra.findOne({ slug: m[1], active: true }).lean();
    const related = item ? await Yantra.find({ category: item.category, _id: { $ne: item._id }, active: true }).sort({ order: 1 }).limit(2).select('name slug priceINR priceUSD art category').lean() : [];
    data[`yantra:${m[1]}`] = item ? { item, related, content: yantraContent[item.slug] || null } : null;
  }
  m = p.match(/^\/blog\/([a-z0-9-]+)$/);
  if (m) {
    const item = await Post.findOne({ ...liveFilter(), slug: m[1] }).lean();
    const related = item ? await Post.find({ ...liveFilter(), _id: { $ne: item._id }, category: item.category }).sort({ publishAt: -1 }).limit(3).select(POST_LIST).lean() : [];
    data[`post:${m[1]}`] = item ? { item, related } : null;
  }
  m = p.match(/^\/nadi-astrology\/([a-z0-9-]+)$/);
  if (m) {
    const item = await Country.findOne({ slug: m[1], status: 'active' }).lean();
    const others = item ? await Country.find({ status: 'active', _id: { $ne: item._id } }).sort({ order: 1, name: 1 }).select('name nameHi slug').lean() : [];
    data[`country:${m[1]}`] = item ? { item, others } : null;
    data[`posts:country:${m[1]}`] = item
      ? await Post.find({ ...liveFilter(), $or: [{ allCountries: true }, { countries: m[1] }] }).sort({ publishAt: -1 }).limit(3).select(POST_LIST).lean()
      : [];
  }
  // Same shape as the JSON the API sends (ids as strings, dates as ISO text).
  return JSON.parse(JSON.stringify(data));
}

// "<div id=root>…page…</div><script>window.__INITIAL_DATA__=…</script>", or null to skip.
export async function renderPage(url, bare) {
  if (bare === '/admin' || bare.startsWith('/admin/') || bare === '/cart') return null;
  const render = await loadRenderer();
  if (!render) return null;
  try {
    // Without a database connection the queries would wait; render the static text only.
    const data = mongoose.connection.readyState === 1 ? await loadData(bare).catch(() => ({})) : {};
    const html = render(url, data);
    // Safe inside <script>: no "</script>" and no JS line separators.
    const json = JSON.stringify(data).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
    return { html, script: `<script>window.__INITIAL_DATA__=${json}</script>` };
  } catch (err) {
    console.error('[ssr] render failed for', url, '-', err.message);
    return null;
  }
}
