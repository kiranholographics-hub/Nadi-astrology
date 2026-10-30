import { SITE } from '../data/site.js';

const ORIGIN = (import.meta.env.VITE_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')).replace(/\/$/, '');

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function setJsonLd(id, data) {
  let el = document.getElementById(`ld-${id}`);
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = `ld-${id}`;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

// Site-wide structured data: Person + LocalBusiness (brief: schema markup)
export const BASE_SCHEMA = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${ORIGIN}/#person`,
      name: SITE.name,
      jobTitle: 'Vedic, KP & Vastu Consultant',
      knowsAbout: ['Vedic astrology', 'KP astrology', 'Nadi astrology', 'Vastu Shastra'],
      address: { '@type': 'PostalAddress', addressLocality: 'Jaipur', addressRegion: 'Rajasthan', addressCountry: 'IN' },
      url: ORIGIN,
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${ORIGIN}/#business`,
      name: `${SITE.name} — Astrology & Vastu`,
      founder: { '@id': `${ORIGIN}/#person` },
      address: { '@type': 'PostalAddress', streetAddress: SITE.address, addressLocality: 'Jaipur', postalCode: '302019', addressRegion: 'Rajasthan', addressCountry: 'IN' },
      telephone: SITE.whatsappNumber ? `+${SITE.whatsappNumber}` : undefined,
      email: SITE.email || undefined,
      url: ORIGIN,
      areaServed: 'Worldwide',
    },
  ],
});

export function applySeo({ title, description, path, image, lang = 'en' }) {
  const hi = lang === 'hi';
  const name = hi ? 'पं. रजनीश शर्मा' : SITE.name;
  const full = title ? `${title} | ${name}` : hi ? 'पं. रजनीश शर्मा — वैदिक, केपी, नाड़ी ज्योतिषी एवं वास्तु सलाहकार, जयपुर' : `${SITE.name} — Vedic, KP, Nadi & Vastu Consultant, Jaipur`;
  document.title = full;
  const desc = description || (hi
    ? 'पं. रजनीश शर्मा — वैदिक, केपी और नाड़ी ज्योतिषी तथा वास्तु सलाहकार, जयपुर। 12 वर्ष, 4000+ ऑफिस विज़िट क्लाइंट, दुनिया भर में ऑनलाइन परामर्श।'
    : 'Pt. Rajneesh Sharma — Vedic, KP & Nadi astrologer and Vastu consultant in Jaipur. 12 years, 4000+ in-office clients, online consultations worldwide.');
  setMeta('property', 'og:locale', hi ? 'hi_IN' : 'en_US');
  setMeta('name', 'description', desc);
  setMeta('property', 'og:title', full);
  setMeta('property', 'og:description', desc);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:url', `${ORIGIN}${path}`);
  if (image) setMeta('property', 'og:image', image.startsWith('http') ? image : `${ORIGIN}${image}`);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setLink('canonical', `${ORIGIN}${path}`);
}

export const faqSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items
    .filter(([q, a]) => typeof a === 'string' && !a.startsWith('['))
    .map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

// Google Analytics 4 — set VITE_GA_ID in client/.env to enable
export function initAnalytics() {
  const id = import.meta.env.VITE_GA_ID;
  if (!id || window.gtag) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); }; // eslint-disable-line prefer-rest-params
  window.gtag('js', new Date());
  window.gtag('config', id, { send_page_view: false });
}
export function trackPage(path) {
  if (window.gtag && import.meta.env.VITE_GA_ID) window.gtag('event', 'page_view', { page_path: path });
  // Own visitor stats for the admin panel (no cookies, no IP stored).
  try {
    let sid = sessionStorage.getItem('ptrs.sid');
    if (!sid) {
      sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem('ptrs.sid', sid);
    }
    const body = JSON.stringify({ path, sid, ref: document.referrer, lang: document.documentElement.lang });
    fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true }).catch(() => {});
  } catch { /* never break the page */ }
}
