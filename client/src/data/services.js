// Service catalog (prices to be filled in). Text fields are { en, hi }.
// `kind` decides which detail fields the booking form asks for.
const L = (en, hi) => ({ en, hi });

export const GROUP_LABEL = {
  Vedic: L('Vedic', 'वैदिक'),
  KP: L('KP', 'केपी'),
  Nadi: L('Nadi', 'नाड़ी'),
  Vastu: L('Vastu', 'वास्तु'),
};

export const SERVICES = [
  { value: 'vedic-30', group: 'Vedic', label: L('Vedic Birth Chart — 30 min', 'वैदिक कुंडली — 30 मिनट'), kind: 'vedic', duration: L('30 min', '30 मिनट'), modes: ['video', 'office'], forWhom: L('Career, marriage, business, life direction', 'करियर, शादी, व्यापार, जीवन की दिशा'), gets: L('Chart analysis, dasha periods, remedies, recording', 'कुंडली विश्लेषण, दशा, उपाय, रिकॉर्डिंग'), page: '/vedic-astrology', priceINR: null, priceUSD: null },
  { value: 'vedic-60', group: 'Vedic', label: L('Vedic Birth Chart — 60 min', 'वैदिक कुंडली — 60 मिनट'), kind: 'vedic', duration: L('60 min', '60 मिनट'), modes: ['video', 'office'], forWhom: L('Career, marriage, business, life direction', 'करियर, शादी, व्यापार, जीवन की दिशा'), gets: L('Chart analysis, dasha periods, remedies, recording', 'कुंडली विश्लेषण, दशा, उपाय, रिकॉर्डिंग'), page: '/vedic-astrology', priceINR: null, priceUSD: null },
  { value: 'kundli-milan', group: 'Vedic', label: L('Kundli Matching', 'कुंडली मिलान'), kind: 'milan', duration: L('Report + 20 min call', 'रिपोर्ट + 20 मिनट कॉल'), modes: ['video', 'office'], forWhom: L('Before marriage', 'शादी से पहले'), gets: L('Guna milan, Manglik check, guidance', 'गुण मिलान, मांगलिक जाँच, मार्गदर्शन'), page: '/kundli-milan', priceINR: null, priceUSD: null },
  { value: 'kp-prashna', group: 'KP', label: L('KP Prashna', 'केपी प्रश्न'), kind: 'kp', duration: L('20–30 min call', '20–30 मिनट कॉल'), modes: ['video'], forWhom: L('One specific question: “When will it happen? Will it happen?”', 'एक विशेष प्रश्न: “कब होगा, होगा या नहीं”'), gets: L('Horary chart from a number 1–249, answer with timing', '1–249 नंबर से प्रश्न कुंडली, समय के साथ उत्तर'), page: '/kp-prashna', priceINR: null, priceUSD: null },
  { value: 'nadi-general', group: 'Nadi', label: L('Nadi — General (Kandam 1)', 'नाड़ी — सामान्य (कांडम 1)'), kind: 'nadi', duration: L('Leaf search → video call', 'पट्टा खोज → वीडियो कॉल'), modes: ['video', 'office'], forWhom: L('In-depth past, present and future reading', 'भूत, वर्तमान और भविष्य की गहरी रीडिंग'), gets: L('Leaf search + general reading, recording', 'पट्टा खोज + सामान्य रीडिंग, रिकॉर्डिंग'), page: '/nadi-astrology', priceINR: null, priceUSD: null },
  { value: 'nadi-general-2-kandam', group: 'Nadi', label: L('Nadi — General + 2 Kandams + Analysis', 'नाड़ी — सामान्य + 2 कांडम + विश्लेषण'), kind: 'nadi', duration: L('Leaf search → video call', 'पट्टा खोज → वीडियो कॉल'), modes: ['video', 'office'], forWhom: L('In-depth past, present and future reading', 'भूत, वर्तमान और भविष्य की गहरी रीडिंग'), gets: L('Leaf reading (Nadi reader) + Pandit ji’s Vedic/KP interpretation + remedies', 'पट्टा रीडिंग (नाड़ी रीडर) + पंडित जी का वैदिक/केपी विश्लेषण + उपाय'), page: '/nadi-astrology', priceINR: null, priceUSD: null },
  { value: 'nadi-shanti', group: 'Nadi', label: L('Nadi — Shanti Kandam (remedies)', 'नाड़ी — शांति कांडम (उपाय)'), kind: 'nadi', duration: L('Leaf search → video call', 'पट्टा खोज → वीडियो कॉल'), modes: ['video', 'office'], forWhom: L('Past karma and traditional remedies', 'पूर्व कर्म और पारंपरिक उपाय'), gets: L('Shanti kandam, yantra advice', 'शांति कांडम, यंत्र सलाह'), page: '/nadi-astrology', priceINR: null, priceUSD: null },
  { value: 'vastu-quick-call', group: 'Vastu', label: L('Vastu — Quick Call', 'वास्तु — क्विक कॉल'), kind: 'vastu', duration: L('30 min call + WhatsApp summary', '30 मिनट कॉल + WhatsApp सारांश'), modes: ['video'], forWhom: L('Before buying a home or flat, or for a small issue', 'घर/फ्लैट लेने से पहले या छोटी समस्या'), gets: L('Verbal guidance on your floor plan', 'फ्लोर प्लान पर मौखिक मार्गदर्शन'), page: '/vastu-consultant-jaipur', priceINR: null, priceUSD: null },
  { value: 'vastu-online-report', group: 'Vastu', label: L('Vastu — Online Astro-Vastu Report', 'वास्तु — ऑनलाइन एस्ट्रो-वास्तु रिपोर्ट'), kind: 'vastu', duration: L('PDF report + follow-up call', 'PDF रिपोर्ट + फॉलो-अप कॉल'), modes: ['report'], forWhom: L('Home, office, shop', 'घर, ऑफिस, दुकान'), gets: L('PDF report: doshas, remedies without demolition, priority list', 'PDF रिपोर्ट: दोष, बिना तोड़-फोड़ उपाय, प्राथमिकता सूची'), page: '/online-vastu-consultation', priceINR: null, priceUSD: null, perSqft: true },
  { value: 'vastu-site-visit', group: 'Vastu', label: L('Vastu — Site Visit', 'वास्तु — साइट विज़िट'), kind: 'vastu', duration: L('Site visit + report + follow-up call', 'साइट विज़िट + रिपोर्ट + फॉलो-अप कॉल'), modes: ['site-visit'], forWhom: L('Factory, office, new construction', 'फैक्ट्री, ऑफिस, नया निर्माण'), gets: L('On-site inspection, compass reading, report, follow-up call', 'साइट पर जाँच, कंपास रीडिंग, रिपोर्ट, फॉलो-अप कॉल'), page: '/vastu-consultant-jaipur', priceINR: null, priceUSD: null, inrOnly: true },
];

export const MODE_LABEL = {
  video: L('Video call (Zoom / WhatsApp)', 'वीडियो कॉल (Zoom / WhatsApp)'),
  office: L('Office visit — Jaipur', 'ऑफिस विज़िट — जयपुर'),
  report: L('Online report (from floor plan)', 'ऑनलाइन रिपोर्ट (फ्लोर प्लान से)'),
  'site-visit': L('Site visit', 'साइट विज़िट'),
};

// Consultation slots in IST; shown to the client in their own time zone.
export const SLOTS_IST = ['10:00', '11:00', '12:00', '13:00', '15:00', '16:00', '17:00', '18:00'];
