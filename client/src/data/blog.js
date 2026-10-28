// Blog — planned topics. Replace `body` with the rewritten article before publishing
// (do not copy-paste from the old site — duplicate content hurts SEO). Text fields are { en, hi }.
const L = (en, hi) => ({ en, hi });

export const BLOG_CATEGORY = { Nadi: L('Nadi', 'नाड़ी'), Vastu: L('Vastu', 'वास्तु'), KP: L('KP', 'केपी') };

export const POSTS = [
  {
    slug: 'what-is-nadi-astrology',
    title: L('What is Nadi astrology and how is your leaf found?', 'नाड़ी ज्योतिष क्या है और पट्टा कैसे मिलता है'),
    category: 'Nadi',
    excerpt: L('Leaf search from your thumb impression, the kandams, and Pandit ji’s Vedic/KP interpretation — the whole process in plain words.', 'अंगूठे के निशान से पट्टा खोज, कांडम और पंडित जी का वैदिक/केपी विश्लेषण — पूरी प्रक्रिया सरल भाषा में।'),
    date: null,
    body: [L('[Article — rewrite the old Nadi article in fresh words and add it here.]', '[लेख — पुराना नाड़ी लेख नए शब्दों में लिखकर यहाँ डालें।]')],
    related: '/nadi-astrology',
  },
  {
    slug: 'vaitheeswaran-koil-nadi-tradition',
    title: L('Vaitheeswaran Koil and the Nadi tradition', 'वैथीश्वरन कोइल और नाड़ी परंपरा'),
    category: 'Nadi',
    excerpt: L('Background on the tradition of the Nadi readers.', 'नाड़ी रीडर्स की परंपरा का परिचय।'),
    date: null,
    body: [L('[Article — background of the Vaitheeswaran Koil tradition, rewritten from the old articles.]', '[लेख — वैथीश्वरन कोइल परंपरा का परिचय, पुराने लेख नए शब्दों में।]')],
    related: '/nadi-astrology',
  },
  {
    slug: 'vastu-remedies-without-demolition',
    title: L('Vastu remedies without demolition: what to do first', 'बिना तोड़-फोड़ वास्तु उपाय: पहले क्या करें'),
    category: 'Vastu',
    excerpt: L('Which remedies are considered before any structural change.', 'निर्माण में बदलाव से पहले कौन-से उपाय देखे जाते हैं।'),
    date: null,
    body: [L('[Article — in Pandit ji’s words.]', '[लेख — पंडित जी के शब्दों में।]')],
    related: '/vastu-consultant-jaipur',
  },
  {
    slug: 'kp-prashna-number-1-249',
    title: L('KP Prashna: answering a question with a number from 1–249', 'केपी प्रश्न: 1–249 नंबर से सवाल का जवाब'),
    category: 'KP',
    excerpt: L('How a specific question can be answered even without a birth time.', 'जन्म समय न हो तब भी एक विशेष प्रश्न का उत्तर कैसे मिलता है।'),
    date: null,
    body: [L('[Article — in Pandit ji’s words.]', '[लेख — पंडित जी के शब्दों में।]')],
    related: '/kp-prashna',
  },
];
