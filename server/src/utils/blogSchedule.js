// Publishing plan for the 16 starter blog articles: three a week — Monday, Wednesday and
// Friday at 10:00 India time — starting with the next such slot after the server starts.
// The posts are set to "scheduled" and go live on their own (see liveFilter in models/Post.js).

export const BLOG_SCHEDULE_KEY = 'blog-schedule-1';

// Order: core service topics first, then the rest.
export const BLOG_SCHEDULE_ORDER = [
  'what-is-nadi-astrology',
  'kp-prashna-number-1-249',
  'vastu-remedies-without-demolition',
  'manglik-dosha-meaning-cancellation-remedies',
  'online-nadi-reading-from-abroad',
  'guna-milan-36-gunas-explained',
  'shani-sade-sati-meaning-remedies',
  'vaitheeswaran-koil-nadi-tradition',
  'main-door-vastu-direction-remedies',
  'shree-yantra-meaning-placement-worship',
  'kp-vs-vedic-astrology-difference',
  'kaal-sarp-dosh-meaning-types-remedies',
  'kitchen-vastu-direction-tips',
  'vimshottari-dasha-explained',
  'bedroom-vastu-tips-sleep-direction',
  'navgrah-shanti-remedies-nine-planets',
];

const IST_OFFSET_MIN = 330; // UTC+5:30
const SLOT_DAYS = [1, 3, 5]; // Mon, Wed, Fri (in India time)
const SLOT_HOUR = 10;

// The next `count` publishing slots strictly after `from`.
export function publishSlots(from, count) {
  const slots = [];
  // Work in "India wall-clock" by shifting to IST and using UTC getters.
  const ist = new Date(from.getTime() + IST_OFFSET_MIN * 60000);
  const day = new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate(), SLOT_HOUR));
  while (slots.length < count) {
    const utc = new Date(day.getTime() - IST_OFFSET_MIN * 60000);
    if (SLOT_DAYS.includes(day.getUTCDay()) && utc > from) slots.push(utc);
    day.setUTCDate(day.getUTCDate() + 1);
  }
  return slots;
}
