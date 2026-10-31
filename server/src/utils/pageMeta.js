import fs from 'node:fs';
import Post, { liveFilter } from '../models/Post.js';
import Country from '../models/Country.js';
import Yantra from '../models/Yantra.js';

// Title / description per page, put into the HTML before it is sent, so Google and
// WhatsApp / Facebook link previews see the right text without running the React app.
// Keep in sync with the PageShell title / description in client/src/pages (English).
const NAME = 'Pt. Rajneesh Sharma';
const HOME_TITLE = `${NAME} — Vedic, KP, Nadi & Vastu Consultant, Jaipur`;
const DEFAULT_DESC = 'Pt. Rajneesh Sharma — Vedic, KP & Nadi astrologer and Vastu consultant in Jaipur. 12 years of experience, 4000+ office-visit clients, online consultations worldwide.';

const STATIC = {
  '/nadi-astrology': ['Nadi Astrology: Palm Leaf Reading in Jaipur & Online', 'Nadi palm leaf reading by traditional Nadi readers, with Vedic/KP analysis and remedies by Pt. Rajneesh Sharma. Office visit in Jaipur or online video call.'],
  '/vedic-astrology': ['Vedic Astrologer in Jaipur: Birth Chart Consultation', 'Vedic birth chart consultation with Pt. Rajneesh Sharma, Jaipur — career, marriage, business, dasha periods and remedies. 30 or 60 minutes, office visit or video call.'],
  '/kundli-milan': ['Kundli Matching — Guna Milan & Manglik Check Before Marriage', 'Kundli matching by Pt. Rajneesh Sharma, Jaipur: guna milan, Manglik check and guidance. Report + 20-minute call, at the office or by video.'],
  '/kp-prashna': ['KP Prashna — One Question, Answered with Timing', 'KP Prashna (horary astrology) with Pt. Rajneesh Sharma: pick a number from 1–249 and get your specific question answered with timing. No birth time needed.'],
  '/vastu-consultant-jaipur': ['Vastu Consultant in Jaipur: Home, Office & Factory', 'Astro-Vastu by Pt. Rajneesh Sharma, Jaipur: your floor plan read together with the birth charts of up to 5 family members. Remedies without demolition first. Online report, quick call or site visit.'],
  '/online-vastu-consultation': ['Online Vastu Consultation — Astro-Vastu Report from Your Floor Plan', 'Online Vastu consultation: a PDF Astro-Vastu report from your floor plan, true North and family birth details, with remedies without demolition. For India and abroad.'],
  '/yantra-shop': ['Energized Yantra Shop — Pran-Pratishtha by Pt. Rajneesh Sharma', '15 energized yantras with size, metal, installation guide and video. Shipping across India and worldwide.'],
  '/videos': ['Astrology & Vastu Videos', 'Videos by Pt. Rajneesh Sharma on Nadi, Vedic, KP astrology, Vastu and yantras.'],
  '/gallery': ['Photo Gallery — Consultations, Nadi Leaves, Vastu, Pooja', 'Photos of Pt. Rajneesh Sharma’s work: consultations at the Jaipur office, clients from abroad, Nadi palm leaves, Vastu site visits, pooja-havan and pilgrimages.'],
  '/about': ['About Pt. Rajneesh Sharma', null],
  '/contact': ['Contact', 'Contact Pt. Rajneesh Sharma: Jaipur office, WhatsApp, email. Online consultations worldwide.'],
  '/faq': ['Frequently Asked Questions', 'Common questions about consultations, Nadi readings, Vastu and yantras.'],
  '/blog': ['Blog — Nadi, Vedic, KP & Vastu', 'Articles and updates by Pt. Rajneesh Sharma on Nadi, Vedic, KP astrology and Vastu.'],
  '/book': ['Book Consultation', 'Book a Vedic, KP, Nadi or Vastu consultation — choose a service, pick a slot in your time zone, add your details and pay.'],
  '/privacy-policy': ['Privacy Policy', null],
  '/terms': ['Terms of Service', null],
  '/refund-policy': ['Refund & Cancellation Policy', null],
  '/shipping-policy': ['Shipping Policy', null],
};

const clip = (s, n) => {
  const t = String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return t.length > n ? `${t.slice(0, n - 1).replace(/\s+\S*$/, '')}…` : t;
};

async function lookup(p) {
  if (STATIC[p]) return STATIC[p];
  let m = p.match(/^\/blog\/([a-z0-9-]+)$/);
  if (m) {
    const post = await Post.findOne({ slug: m[1], ...liveFilter() }).select('title seoTitle excerpt metaDescription').lean();
    return post && [post.seoTitle || post.title, post.metaDescription || post.excerpt];
  }
  m = p.match(/^\/nadi-astrology\/([a-z0-9-]+)$/);
  if (m) {
    const c = await Country.findOne({ slug: m[1], status: 'active' }).select('name inName seoTitle metaDescription intro').lean();
    return c && [c.seoTitle || `Nadi Astrology in ${c.inName || c.name} — Online Palm Leaf Reading`, c.metaDescription || c.intro?.en];
  }
  m = p.match(/^\/yantra-shop\/([a-z0-9-]+)$/);
  if (m) {
    const y = await Yantra.findOne({ slug: m[1], active: true }).select('name').lean();
    return y && [`${y.name}, Energized`, `${y.name} — energized by Pt. Rajneesh Sharma. Size, metal, installation guide and video. Shipping in India and worldwide.`];
  }
  return null;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

let template;
let templatePath;

// index.html with the page's own <title>, description, canonical and Open Graph tags.
export async function renderIndex(indexHtml, pathname, origin) {
  if (templatePath !== indexHtml) {
    template = fs.readFileSync(indexHtml, 'utf8');
    templatePath = indexHtml;
  }
  const p = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  let found = null;
  try {
    found = p === '/' ? null : await lookup(p);
  } catch { /* fall back to the defaults below */ }
  const title = found?.[0] ? `${found[0]} | ${NAME}` : HOME_TITLE;
  const desc = clip(found?.[1] || DEFAULT_DESC, 165);
  const url = `${origin}${p === '/' ? '/' : p}`;
  const tags = [
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(NAME)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
  ].join('\n    ');
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(desc)}" />\n    ${tags}`);
}
