// Daily timings for the Rahu Kaal page: sunrise / sunset (NOAA solar position formulas),
// then Rahu Kaal, Yamaganda, Gulika Kaal and the day / night Choghadiya.
// All cities here are in India, so times are in IST (UTC+5:30). Pure functions — the same
// code runs on the server (page HTML) and in the browser.

export const CITIES = [
  { id: 'jaipur', name: 'Jaipur', nameHi: 'जयपुर', lat: 26.9124, lon: 75.7873 },
  { id: 'delhi', name: 'Delhi', nameHi: 'दिल्ली', lat: 28.6139, lon: 77.209 },
  { id: 'mumbai', name: 'Mumbai', nameHi: 'मुंबई', lat: 19.076, lon: 72.8777 },
  { id: 'bengaluru', name: 'Bengaluru', nameHi: 'बेंगलुरु', lat: 12.9716, lon: 77.5946 },
  { id: 'chennai', name: 'Chennai', nameHi: 'चेन्नई', lat: 13.0827, lon: 80.2707 },
  { id: 'kolkata', name: 'Kolkata', nameHi: 'कोलकाता', lat: 22.5726, lon: 88.3639 },
  { id: 'hyderabad', name: 'Hyderabad', nameHi: 'हैदराबाद', lat: 17.385, lon: 78.4867 },
  { id: 'ahmedabad', name: 'Ahmedabad', nameHi: 'अहमदाबाद', lat: 23.0225, lon: 72.5714 },
  { id: 'pune', name: 'Pune', nameHi: 'पुणे', lat: 18.5204, lon: 73.8567 },
  { id: 'lucknow', name: 'Lucknow', nameHi: 'लखनऊ', lat: 26.8467, lon: 80.9462 },
  { id: 'jodhpur', name: 'Jodhpur', nameHi: 'जोधपुर', lat: 26.2389, lon: 73.0243 },
  { id: 'udaipur', name: 'Udaipur', nameHi: 'उदयपुर', lat: 24.5854, lon: 73.7125 },
  { id: 'kota', name: 'Kota', nameHi: 'कोटा', lat: 25.2138, lon: 75.8648 },
  { id: 'ajmer', name: 'Ajmer', nameHi: 'अजमेर', lat: 26.4499, lon: 74.6399 },
];

const IST = 330; // minutes ahead of UTC
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;

// Today's date in India as { y, m, d } (m: 1–12).
export function todayIST(now = new Date()) {
  const t = new Date(now.getTime() + IST * 60000);
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}
// Minutes since midnight IST, now.
export function nowMinutesIST(now = new Date()) {
  const t = new Date(now.getTime() + IST * 60000);
  return t.getUTCHours() * 60 + t.getUTCMinutes() + t.getUTCSeconds() / 60;
}
export const addDays = ({ y, m, d }, n) => {
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
};
export const weekday = ({ y, m, d }) => new Date(Date.UTC(y, m - 1, d)).getUTCDay(); // 0 = Sunday
export const sameDate = (a, b) => a.y === b.y && a.m === b.m && a.d === b.d;
export const isoDate = ({ y, m, d }) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
export function parseIso(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  return m ? { y: +m[1], m: +m[2], d: +m[3] } : null;
}

// Sunrise and sunset in minutes after midnight IST (NOAA general solar position, apparent sunrise:
// zenith 90.833° for refraction and the sun's radius). Accurate to about a minute.
export function sunTimes(date, lat, lon) {
  const jd = Date.UTC(date.y, date.m - 1, date.d) / 86400000 + 2440587.5; // 0h UTC
  const event = (rising) => {
    // iterate: compute at the approximate time of the event for better accuracy
    let utcMin = rising ? 720 - 4 * lon - 360 : 720 - 4 * lon + 360;
    for (let k = 0; k < 3; k++) {
      const T = (jd + utcMin / 1440 - 2451545) / 36525;
      const L0 = (280.46646 + T * (36000.76983 + T * 0.0003032)) % 360;
      const M = 357.52911 + T * (35999.05029 - 0.0001537 * T);
      const e = 0.016708634 - T * (0.000042037 + 0.0000001267 * T);
      const C = Math.sin(rad(M)) * (1.914602 - T * (0.004817 + 0.000014 * T)) + Math.sin(rad(2 * M)) * (0.019993 - 0.000101 * T) + Math.sin(rad(3 * M)) * 0.000289;
      const trueLong = L0 + C;
      const omega = 125.04 - 1934.136 * T;
      const lambda = trueLong - 0.00569 - 0.00478 * Math.sin(rad(omega));
      const eps0 = 23 + (26 + (21.448 - T * (46.815 + T * (0.00059 - T * 0.001813))) / 60) / 60;
      const eps = eps0 + 0.00256 * Math.cos(rad(omega));
      const decl = deg(Math.asin(Math.sin(rad(eps)) * Math.sin(rad(lambda))));
      const y = Math.tan(rad(eps / 2)) ** 2;
      const eqTime = 4 * deg(y * Math.sin(2 * rad(L0)) - 2 * e * Math.sin(rad(M)) + 4 * e * y * Math.sin(rad(M)) * Math.cos(2 * rad(L0)) - 0.5 * y * y * Math.sin(4 * rad(L0)) - 1.25 * e * e * Math.sin(2 * rad(M)));
      const cosH = Math.cos(rad(90.833)) / (Math.cos(rad(lat)) * Math.cos(rad(decl))) - Math.tan(rad(lat)) * Math.tan(rad(decl));
      const ha = deg(Math.acos(Math.max(-1, Math.min(1, cosH))));
      utcMin = 720 - 4 * (lon + (rising ? ha : -ha)) - eqTime;
    }
    return utcMin + IST;
  };
  return { sunrise: event(true), sunset: event(false) };
}

// Which eighth of the daytime each period falls in, by weekday (Sunday first).
const RAHU = [8, 2, 7, 5, 6, 4, 3];
const YAMAGANDA = [5, 4, 3, 2, 1, 7, 6];
const GULIKA = [7, 6, 5, 4, 3, 2, 1];

export const CHOGHADIYA_INFO = {
  amrit: { en: 'Amrit', hi: 'अमृत', good: true, use: { en: 'Best for all work', hi: 'हर काम के लिए उत्तम' } },
  shubh: { en: 'Shubh', hi: 'शुभ', good: true, use: { en: 'Auspicious — ceremonies, marriage, education', hi: 'शुभ — संस्कार, विवाह, शिक्षा' } },
  labh: { en: 'Labh', hi: 'लाभ', good: true, use: { en: 'Gain — business, new start, study', hi: 'लाभ — व्यापार, नई शुरुआत, पढ़ाई' } },
  char: { en: 'Char', hi: 'चर', good: true, use: { en: 'Good for travel and movement', hi: 'यात्रा और चलने-फिरने के लिए अच्छा' } },
  udveg: { en: 'Udveg', hi: 'उद्वेग', good: false, use: { en: 'Avoid new beginnings (government work is fine)', hi: 'नई शुरुआत से बचें (सरकारी काम ठीक)' } },
  kaal: { en: 'Kaal', hi: 'काल', good: false, use: { en: 'Avoid auspicious work', hi: 'शुभ काम से बचें' } },
  rog: { en: 'Rog', hi: 'रोग', good: false, use: { en: 'Avoid; not for health matters', hi: 'बचें; स्वास्थ्य संबंधी काम नहीं' } },
};
const DAY_ORDER = ['udveg', 'char', 'labh', 'amrit', 'kaal', 'shubh', 'rog'];
const DAY_START = ['udveg', 'amrit', 'rog', 'labh', 'shubh', 'char', 'kaal'];
const NIGHT_ORDER = ['shubh', 'amrit', 'char', 'rog', 'kaal', 'labh', 'udveg'];
const NIGHT_START = ['shubh', 'char', 'kaal', 'udveg', 'amrit', 'rog', 'labh'];

const slice = (start, len, i) => ({ start: start + len * (i - 1), end: start + len * i });

// Everything for one date and place. Night periods run past midnight (minutes > 1440).
export function dayTimings(date, city) {
  const { sunrise, sunset } = sunTimes(date, city.lat, city.lon);
  const next = sunTimes(addDays(date, 1), city.lat, city.lon).sunrise + 1440;
  const wd = weekday(date);
  const part = (sunset - sunrise) / 8;
  const nightPart = (next - sunset) / 8;
  const seq = (order, startName, from, len) => {
    const k = order.indexOf(startName);
    return Array.from({ length: 8 }, (_, i) => ({ name: order[(k + i) % 7], ...slice(from, len, i + 1) }));
  };
  return {
    date, city, weekday: wd, sunrise, sunset, nextSunrise: next,
    rahu: slice(sunrise, part, RAHU[wd]),
    yamaganda: slice(sunrise, part, YAMAGANDA[wd]),
    gulika: slice(sunrise, part, GULIKA[wd]),
    dayChoghadiya: seq(DAY_ORDER, DAY_START[wd], sunrise, part),
    nightChoghadiya: seq(NIGHT_ORDER, NIGHT_START[wd], sunset, nightPart),
  };
}

// "7:32 AM" / "सुबह 7:32" from minutes after midnight (wraps past midnight).
export function fmt(min, lang = 'en') {
  const total = Math.round(min) % 1440;
  const h = Math.floor(total / 60);
  const m = String(total % 60).padStart(2, '0');
  const h12 = ((h + 11) % 12) + 1;
  if (lang === 'hi') {
    const part = h < 4 ? 'रात' : h < 12 ? 'सुबह' : h < 16 ? 'दोपहर' : h < 19 ? 'शाम' : 'रात';
    return `${part} ${h12}:${m}`;
  }
  return `${h12}:${m} ${h < 12 ? 'AM' : 'PM'}`;
}

export const WEEKDAYS = [
  { en: 'Sunday', hi: 'रविवार' }, { en: 'Monday', hi: 'सोमवार' }, { en: 'Tuesday', hi: 'मंगलवार' },
  { en: 'Wednesday', hi: 'बुधवार' }, { en: 'Thursday', hi: 'गुरुवार' }, { en: 'Friday', hi: 'शुक्रवार' }, { en: 'Saturday', hi: 'शनिवार' },
];
const MONTHS = { en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], hi: ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'] };
export const fmtDate = (date, lang = 'en') => `${WEEKDAYS[weekday(date)][lang]}, ${date.d} ${MONTHS[lang][date.m - 1]} ${date.y}`;
