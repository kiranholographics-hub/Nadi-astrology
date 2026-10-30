// The 4 planned blog topics — added as DRAFTS on first start. Write the article in /admin/blog, then publish.
export const blogSeed = [
  { title: 'What is Nadi astrology and how is your leaf found?', titleHi: 'नाड़ी ज्योतिष क्या है और पट्टा कैसे मिलता है', slug: 'what-is-nadi-astrology', category: 'Nadi',
    excerpt: 'Leaf search from your thumb impression, the kandams, and Pandit ji’s Vedic/KP interpretation — the whole process in plain words.',
    excerptHi: 'अंगूठे के निशान से पट्टा खोज, कांडम और पंडित जी का वैदिक/केपी विश्लेषण — पूरी प्रक्रिया सरल भाषा में।' },
  { title: 'Vaitheeswaran Koil and the Nadi tradition', titleHi: 'वैथीश्वरन कोइल और नाड़ी परंपरा', slug: 'vaitheeswaran-koil-nadi-tradition', category: 'Nadi',
    excerpt: 'Background on the tradition of the Nadi readers.', excerptHi: 'नाड़ी रीडर्स की परंपरा का परिचय।' },
  { title: 'Vastu remedies without demolition: what to do first', titleHi: 'बिना तोड़-फोड़ वास्तु उपाय: पहले क्या करें', slug: 'vastu-remedies-without-demolition', category: 'Vastu',
    excerpt: 'Which remedies are considered before any structural change.', excerptHi: 'निर्माण में बदलाव से पहले कौन-से उपाय देखे जाते हैं।' },
  { title: 'KP Prashna: answering a question with a number from 1–249', titleHi: 'केपी प्रश्न: 1–249 नंबर से सवाल का जवाब', slug: 'kp-prashna-number-1-249', category: 'KP',
    excerpt: 'How a specific question can be answered even without a birth time.', excerptHi: 'जन्म समय न हो तब भी एक विशेष प्रश्न का उत्तर कैसे मिलता है।' },
].map((p) => ({ ...p, status: 'draft', allCountries: true, content: '<h2>[Write the article here]</h2><p>[Rewrite in fresh words — do not copy from the old site.]</p>' }));
