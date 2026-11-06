import fs from 'node:fs';
import Post, { liveFilter } from '../models/Post.js';
import Country from '../models/Country.js';
import Yantra from '../models/Yantra.js';
import { yantraContent, yantraNameHi } from '../data/yantraContent.js';

// Title / description per page, put into the HTML before it is sent, so Google and
// WhatsApp / Facebook link previews see the right text without running the React app.
// Keep in sync with the PageShell title / description in client/src/pages (English).
const NAME = 'Pt. Rajneesh Sharma';
const HOME_TITLE = `${NAME} — Vedic, KP, Nadi & Vastu Consultant, Jaipur`;
const DEFAULT_DESC = 'Pt. Rajneesh Sharma — Vedic, KP & Nadi astrologer and Vastu consultant in Jaipur. 12 years of experience, 4000+ office-visit clients, online consultations worldwide.';
const NAME_HI = 'पं. रजनीश शर्मा';
const HOME_TITLE_HI = 'पं. रजनीश शर्मा — वैदिक, केपी, नाड़ी ज्योतिषी एवं वास्तु सलाहकार, जयपुर';
const DEFAULT_DESC_HI = 'पं. रजनीश शर्मा — वैदिक, केपी और नाड़ी ज्योतिषी तथा वास्तु सलाहकार, जयपुर। 12 वर्ष, 4000+ ऑफिस विज़िट क्लाइंट, दुनिया भर में ऑनलाइन परामर्श।';

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
  '/about': ['About — Vedic, KP & Nadi Astrologer in Jaipur', 'Pt. Rajneesh Sharma: Vedic, KP and Nadi astrologer and Astro-Vastu consultant in Jaipur with 12 years of experience and 4000+ office-visit clients.'],
  '/contact': ['Contact Astrologer in Jaipur — Office, WhatsApp & Email', 'Contact Pt. Rajneesh Sharma, astrologer and Vastu consultant in Jaipur: office address, map, WhatsApp, email and timings. Online consultations worldwide.'],
  '/faq': ['FAQ — Nadi Reading, Astrology Consultation, Vastu & Yantra', 'Answers to common questions: how a Nadi palm leaf reading works, online astrology consultation, birth time, Vastu without demolition, yantra shipping and payment.'],
  '/blog': ['Blog — Nadi, Vedic, KP & Vastu', 'Articles and updates by Pt. Rajneesh Sharma on Nadi, Vedic, KP astrology and Vastu.'],
  '/book': ['Book Consultation', 'Book a Vedic, KP, Nadi or Vastu consultation — choose a service, pick a slot in your time zone, add your details and pay.'],
  '/privacy-policy': ['Privacy Policy', null],
  '/terms': ['Terms of Service', null],
  '/refund-policy': ['Refund & Cancellation Policy', null],
  '/shipping-policy': ['Shipping Policy', null],
};

// Hindi (/hi/…) — same pages, from the Hindi PageShell title / description.
const STATIC_HI = {
  '/nadi-astrology': ['नाड़ी ज्योतिष: जयपुर और ऑनलाइन ताड़-पत्र रीडिंग', 'पारंपरिक नाड़ी रीडर्स द्वारा ताड़-पत्र रीडिंग, साथ में पं. रजनीश शर्मा का वैदिक/केपी विश्लेषण और उपाय। जयपुर ऑफिस या ऑनलाइन वीडियो कॉल।'],
  '/vedic-astrology': ['जयपुर में वैदिक ज्योतिषी: कुंडली परामर्श', 'पं. रजनीश शर्मा, जयपुर से वैदिक कुंडली परामर्श — करियर, शादी, व्यापार, दशा और उपाय। 30 या 60 मिनट, ऑफिस विज़िट या वीडियो कॉल।'],
  '/kundli-milan': ['कुंडली मिलान — शादी से पहले गुण मिलान और मांगलिक जाँच', 'पं. रजनीश शर्मा, जयपुर द्वारा कुंडली मिलान: गुण मिलान, मांगलिक जाँच और मार्गदर्शन। रिपोर्ट + 20 मिनट कॉल, ऑफिस या वीडियो।'],
  '/kp-prashna': ['केपी प्रश्न — एक प्रश्न, समय के साथ उत्तर', 'पं. रजनीश शर्मा के साथ केपी प्रश्न: 1–249 में से एक नंबर चुनें और अपने विशेष प्रश्न का समय के साथ उत्तर पाएँ। जन्म समय की ज़रूरत नहीं।'],
  '/vastu-consultant-jaipur': ['जयपुर में वास्तु सलाहकार: घर, ऑफिस और फैक्ट्री', 'पं. रजनीश शर्मा, जयपुर द्वारा एस्ट्रो-वास्तु: घर के प्लान के साथ परिवार के 5 सदस्यों तक की कुंडली। पहले बिना तोड़-फोड़ उपाय। ऑनलाइन रिपोर्ट, क्विक कॉल या साइट विज़िट।'],
  '/online-vastu-consultation': ['ऑनलाइन वास्तु परामर्श — फ्लोर प्लान से एस्ट्रो-वास्तु रिपोर्ट', 'ऑनलाइन वास्तु परामर्श: फ्लोर प्लान, उत्तर दिशा और परिवार के जन्म विवरण से PDF एस्ट्रो-वास्तु रिपोर्ट, बिना तोड़-फोड़ उपाय। भारत और विदेश।'],
  '/yantra-shop': ['प्राण-प्रतिष्ठित यंत्र शॉप — पं. रजनीश शर्मा द्वारा प्राण-प्रतिष्ठा', '15 प्राण-प्रतिष्ठित यंत्र — साइज़, धातु, स्थापना विधि और वीडियो के साथ। भारत और दुनिया भर में शिपिंग।'],
  '/videos': ['ज्योतिष और वास्तु वीडियो', 'क्लाइंट के अनुभव और पं. रजनीश शर्मा के नाड़ी, वैदिक, केपी, वास्तु और यंत्र स्थापना पर वीडियो।'],
  '/gallery': ['फोटो गैलरी — परामर्श, नाड़ी पट्टे, वास्तु, पूजा', 'पं. रजनीश शर्मा के काम की तस्वीरें: जयपुर ऑफिस में परामर्श, विदेशी क्लाइंट, नाड़ी ताड़-पत्र, वास्तु साइट विज़िट, पूजा-हवन और तीर्थ यात्रा।'],
  '/about': ['परिचय — जयपुर के वैदिक, केपी और नाड़ी ज्योतिषी', 'पं. रजनीश शर्मा: जयपुर के वैदिक, केपी और नाड़ी ज्योतिषी तथा एस्ट्रो-वास्तु सलाहकार — 12 वर्ष का अनुभव, 4000+ ऑफिस विज़िट क्लाइंट।'],
  '/contact': ['जयपुर में ज्योतिषी से संपर्क — ऑफिस, WhatsApp और ईमेल', 'जयपुर के ज्योतिषी और वास्तु सलाहकार पं. रजनीश शर्मा से संपर्क: ऑफिस पता, मैप, WhatsApp, ईमेल और समय। दुनिया भर में ऑनलाइन परामर्श।'],
  '/faq': ['प्रश्न-उत्तर — नाड़ी रीडिंग, ज्योतिष परामर्श, वास्तु और यंत्र', 'आम सवालों के जवाब: नाड़ी ताड़-पत्र रीडिंग कैसे होती है, ऑनलाइन ज्योतिष परामर्श, जन्म समय, बिना तोड़-फोड़ वास्तु, यंत्र शिपिंग और भुगतान।'],
  '/blog': ['ब्लॉग — नाड़ी, वैदिक, केपी और वास्तु', 'नाड़ी, वैदिक, केपी और वास्तु पर पं. रजनीश शर्मा के लेख और अपडेट।'],
  '/book': ['परामर्श बुक करें', 'वैदिक, केपी, नाड़ी या वास्तु परामर्श बुक करें — सेवा चुनें, अपने टाइम ज़ोन में स्लॉट, जानकारी और भुगतान।'],
  '/privacy-policy': ['गोपनीयता नीति', null],
  '/terms': ['नियम और शर्तें', null],
  '/refund-policy': ['रिफंड और कैंसलेशन नीति', null],
  '/shipping-policy': ['शिपिंग नीति', null],
};

const clip = (s, n) => {
  const t = String(s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return t.length > n ? `${t.slice(0, n - 1).replace(/\s+\S*$/, '')}…` : t;
};

async function lookup(p, hi) {
  if (hi && STATIC_HI[p]) return STATIC_HI[p];
  if (!hi && STATIC[p]) return STATIC[p];
  let m = p.match(/^\/blog\/([a-z0-9-]+)$/);
  if (m) {
    const post = await Post.findOne({ slug: m[1], ...liveFilter() }).select('title titleHi seoTitle excerpt excerptHi metaDescription').lean();
    if (!post) return null;
    return hi && post.titleHi ? [post.titleHi, post.excerptHi || post.excerpt] : [post.seoTitle || post.title, post.metaDescription || post.excerpt];
  }
  m = p.match(/^\/nadi-astrology\/([a-z0-9-]+)$/);
  if (m) {
    const c = await Country.findOne({ slug: m[1], status: 'active' }).select('name nameHi inName seoTitle metaDescription intro').lean();
    if (!c) return null;
    if (hi) return [`${c.nameHi || c.name} में नाड़ी ज्योतिष — ऑनलाइन ताड़-पत्र रीडिंग`, c.intro?.hi || c.intro?.en];
    return [c.seoTitle || `Nadi Astrology in ${c.inName || c.name} — Online Palm Leaf Reading`, c.metaDescription || c.intro?.en];
  }
  m = p.match(/^\/yantra-shop\/([a-z0-9-]+)$/);
  if (m) {
    const y = await Yantra.findOne({ slug: m[1], active: true }).select('name slug description').lean();
    if (!y) return null;
    const content = yantraContent[y.slug];
    if (hi) return [`${yantraNameHi[y.slug] || y.name}, प्राण-प्रतिष्ठित`, content?.description?.hi || y.description];
    return [`${y.name}, Energized`, y.description || content?.description?.en || `${y.name} — energized by Pt. Rajneesh Sharma. Size, metal, installation guide and video. Shipping in India and worldwide.`];
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
  const raw = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  // /hi/… is the Hindi version of the same page.
  const hi = raw === '/hi' || raw.startsWith('/hi/');
  const p = hi ? raw.slice(3) || '/' : raw;
  let found = null;
  try {
    found = p === '/' ? null : await lookup(p, hi);
  } catch { /* fall back to the defaults below */ }
  const title = found?.[0] ? `${found[0]} | ${hi ? NAME_HI : NAME}` : hi ? HOME_TITLE_HI : HOME_TITLE;
  const desc = clip(found?.[1] || (hi ? DEFAULT_DESC_HI : DEFAULT_DESC), 165);
  const enUrl = `${origin}${p}`;
  const hiUrl = `${origin}/hi${p === '/' ? '' : p}`;
  const url = hi ? hiUrl : enUrl;
  const tags = [
    `<link rel="canonical" href="${esc(url)}" />`,
    `<link rel="alternate" hreflang="en" href="${esc(enUrl)}" />`,
    `<link rel="alternate" hreflang="hi" href="${esc(hiUrl)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${esc(enUrl)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${hi ? 'hi_IN' : 'en_US'}" />`,
    `<meta property="og:site_name" content="${esc(hi ? NAME_HI : NAME)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
  ].join('\n    ');
  return template
    .replace(/<html lang="[^"]*"/, `<html lang="${hi ? 'hi' : 'en'}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(desc)}" />\n    ${tags}`);
}
