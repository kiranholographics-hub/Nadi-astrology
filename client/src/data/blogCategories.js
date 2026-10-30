// Blog category names (the database stores the English key)
export const BLOG_CATEGORY = {
  Nadi: { en: 'Nadi', hi: 'नाड़ी' },
  Vedic: { en: 'Vedic', hi: 'वैदिक' },
  KP: { en: 'KP', hi: 'केपी' },
  'Kundli Matching': { en: 'Kundli Matching', hi: 'कुंडली मिलान' },
  Vastu: { en: 'Vastu', hi: 'वास्तु' },
  Yantra: { en: 'Yantra', hi: 'यंत्र' },
  General: { en: 'General', hi: 'सामान्य' },
};

// Service page linked under each post, by category
export const CATEGORY_PAGE = {
  Nadi: '/nadi-astrology', Vedic: '/vedic-astrology', KP: '/kp-prashna', 'Kundli Matching': '/kundli-milan',
  Vastu: '/vastu-consultant-jaipur', Yantra: '/yantra-shop', General: '/book',
};

export const postDate = (d, lang) => (d ? new Date(d).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }) : '');
