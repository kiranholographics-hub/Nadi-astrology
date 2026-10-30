// Pandit ji's YouTube videos — shown on /videos and in the Home "Watch" section (first 3).
// Add a new one at the top: { youtubeId, cat, title: { en, hi } }. cat: 'Pandit ji' | 'Client' | 'Yantra' | 'Vastu'.
const L = (en, hi) => ({ en, hi });

export const YT_VIDEOS = [
  { youtubeId: 'epBUAZBx6zU', cat: 'Pandit ji', title: L('Pt. Rajneesh Sharma — Astro & Vastu Consultant, Nadi Astrology', 'पं. रजनीश शर्मा — एस्ट्रो व वास्तु कंसल्टेंट, नाड़ी ज्योतिष') },
  { youtubeId: '7jMrmJWPYBg', cat: 'Pandit ji', title: L('Is your golden period starting? Jupiter transit 2026', 'क्या शुरू होने वाला है आपका स्वर्णिम समय? गुरु गोचर 2026') },
  { youtubeId: 'zrz-VDAcWVo', cat: 'Pandit ji', title: L('Shani Sade Sati: don’t fear it — remedies that help', 'शनि साढ़ेसाती से डरें नहीं! ये उपाय करें') },
  { youtubeId: '9LcwWW0fKGc', cat: 'Pandit ji', title: L('Why do breakups happen even after love? The astrology reason', 'प्यार होने के बाद भी ब्रेकअप क्यों होता है? ज्योतिषीय कारण') },
];

export const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const ytEmbed = (id) => `https://www.youtube-nocookie.com/embed/${id}`;
