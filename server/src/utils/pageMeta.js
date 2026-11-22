import fs from 'node:fs';
import Post, { liveFilter } from '../models/Post.js';
import Country from '../models/Country.js';
import Yantra from '../models/Yantra.js';
import { yantraContent, yantraNameHi } from '../data/yantraContent.js';
import { renderPage } from './ssr.js';

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
  '/rahu-kaal/delhi': ['Rahu Kaal Today Delhi: Rahu Kaal & Choghadiya Timings', 'Rahu Kaal today in Delhi with Yamaganda, Gulika Kaal, sunrise, sunset, the day and night Choghadiya and a 7-day table — worked out for Delhi\'s own sunrise. Updated daily.'],
  '/rahu-kaal/mumbai': ['Rahu Kaal Today Mumbai: Rahu Kaal & Choghadiya Timings', 'Rahu Kaal today in Mumbai with Yamaganda, Gulika Kaal, sunrise, sunset, the day and night Choghadiya and a 7-day table — worked out for Mumbai\'s own sunrise. Updated daily.'],
  '/rahu-kaal/bengaluru': ['Rahu Kaal Today Bengaluru: Rahu Kaal & Choghadiya Timings', 'Rahu Kaal today in Bengaluru with Yamaganda, Gulika Kaal, sunrise, sunset, the day and night Choghadiya and a 7-day table — worked out for Bengaluru\'s own sunrise. Updated daily.'],
  '/rahu-kaal/chennai': ['Rahu Kaal Today Chennai: Rahu Kaal & Choghadiya Timings', 'Rahu Kaal today in Chennai with Yamaganda, Gulika Kaal, sunrise, sunset, the day and night Choghadiya and a 7-day table — worked out for Chennai\'s own sunrise. Updated daily.'],
  '/rahu-kaal/kolkata': ['Rahu Kaal Today Kolkata: Rahu Kaal & Choghadiya Timings', 'Rahu Kaal today in Kolkata with Yamaganda, Gulika Kaal, sunrise, sunset, the day and night Choghadiya and a 7-day table — worked out for Kolkata\'s own sunrise. Updated daily.'],
  '/rahu-kaal/hyderabad': ['Rahu Kaal Today Hyderabad: Rahu Kaal & Choghadiya Timings', 'Rahu Kaal today in Hyderabad with Yamaganda, Gulika Kaal, sunrise, sunset, the day and night Choghadiya and a 7-day table — worked out for Hyderabad\'s own sunrise. Updated daily.'],
  '/rahu-kaal/ahmedabad': ['Rahu Kaal Today Ahmedabad: Rahu Kaal & Choghadiya Timings', 'Rahu Kaal today in Ahmedabad with Yamaganda, Gulika Kaal, sunrise, sunset, the day and night Choghadiya and a 7-day table — worked out for Ahmedabad\'s own sunrise. Updated daily.'],
  '/rahu-kaal/pune': ['Rahu Kaal Today Pune: Rahu Kaal & Choghadiya Timings', 'Rahu Kaal today in Pune with Yamaganda, Gulika Kaal, sunrise, sunset, the day and night Choghadiya and a 7-day table — worked out for Pune\'s own sunrise. Updated daily.'],
  '/rahu-kaal/lucknow': ['Rahu Kaal Today Lucknow: Rahu Kaal & Choghadiya Timings', 'Rahu Kaal today in Lucknow with Yamaganda, Gulika Kaal, sunrise, sunset, the day and night Choghadiya and a 7-day table — worked out for Lucknow\'s own sunrise. Updated daily.'],
  '/rahu-kaal/jodhpur': ['Rahu Kaal Today Jodhpur: Rahu Kaal & Choghadiya Timings', 'Rahu Kaal today in Jodhpur with Yamaganda, Gulika Kaal, sunrise, sunset, the day and night Choghadiya and a 7-day table — worked out for Jodhpur\'s own sunrise. Updated daily.'],
  '/rahu-kaal/udaipur': ['Rahu Kaal Today Udaipur: Rahu Kaal & Choghadiya Timings', 'Rahu Kaal today in Udaipur with Yamaganda, Gulika Kaal, sunrise, sunset, the day and night Choghadiya and a 7-day table — worked out for Udaipur\'s own sunrise. Updated daily.'],
  '/rahu-kaal/kota': ['Rahu Kaal Today Kota: Rahu Kaal & Choghadiya Timings', 'Rahu Kaal today in Kota with Yamaganda, Gulika Kaal, sunrise, sunset, the day and night Choghadiya and a 7-day table — worked out for Kota\'s own sunrise. Updated daily.'],
  '/rahu-kaal/ajmer': ['Rahu Kaal Today Ajmer: Rahu Kaal & Choghadiya Timings', 'Rahu Kaal today in Ajmer with Yamaganda, Gulika Kaal, sunrise, sunset, the day and night Choghadiya and a 7-day table — worked out for Ajmer\'s own sunrise. Updated daily.'],
  '/rahu-kaal-jaipur': ['Rahu Kaal Today Jaipur: Rahu Kaal & Choghadiya Timings', 'Rahu Kaal today in Jaipur with Yamaganda, Gulika Kaal, sunrise, sunset and the day and night Choghadiya — also for Delhi, Mumbai and other cities. Updated daily.'],
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
  '/privacy-policy': ['Privacy Policy', 'How Pt. Rajneesh Sharma’s website collects, uses and protects your details, thumb impressions and floor plans, and how to view or delete them.'],
  '/terms': ['Terms of Service', 'Terms for astrology, Nadi and Vastu consultations and yantra orders with Pt. Rajneesh Sharma, Jaipur: nature of the service, booking, payment and testimonials.'],
  '/refund-policy': ['Refund & Cancellation Policy', 'Refund and cancellation terms for consultations, Nadi readings, Vastu reports and yantra orders with Pt. Rajneesh Sharma.'],
  '/shipping-policy': ['Shipping Policy', 'How energized yantras are packed and shipped from Jaipur across India and worldwide, and who pays customs duty abroad.'],
};

// Hindi (/hi/…) — same pages, from the Hindi PageShell title / description.
const STATIC_HI = {
  '/nadi-astrology': ['नाड़ी ज्योतिष: जयपुर और ऑनलाइन ताड़-पत्र रीडिंग', 'पारंपरिक नाड़ी रीडर्स द्वारा ताड़-पत्र रीडिंग, साथ में पं. रजनीश शर्मा का वैदिक/केपी विश्लेषण और उपाय। जयपुर ऑफिस या ऑनलाइन वीडियो कॉल।'],
  '/vedic-astrology': ['जयपुर में वैदिक ज्योतिषी: कुंडली परामर्श', 'पं. रजनीश शर्मा, जयपुर से वैदिक कुंडली परामर्श — करियर, शादी, व्यापार, दशा और उपाय। 30 या 60 मिनट, ऑफिस विज़िट या वीडियो कॉल।'],
  '/rahu-kaal/delhi': ['आज का राहु काल दिल्ली — राहु काल और चौघड़िया समय', 'दिल्ली में आज का राहु काल, यमगंड, गुलिक काल, सूर्योदय, सूर्यास्त, दिन-रात का चौघड़िया और 7 दिन की तालिका — दिल्ली के अपने सूर्योदय से। रोज़ अपडेट।'],
  '/rahu-kaal/mumbai': ['आज का राहु काल मुंबई — राहु काल और चौघड़िया समय', 'मुंबई में आज का राहु काल, यमगंड, गुलिक काल, सूर्योदय, सूर्यास्त, दिन-रात का चौघड़िया और 7 दिन की तालिका — मुंबई के अपने सूर्योदय से। रोज़ अपडेट।'],
  '/rahu-kaal/bengaluru': ['आज का राहु काल बेंगलुरु — राहु काल और चौघड़िया समय', 'बेंगलुरु में आज का राहु काल, यमगंड, गुलिक काल, सूर्योदय, सूर्यास्त, दिन-रात का चौघड़िया और 7 दिन की तालिका — बेंगलुरु के अपने सूर्योदय से। रोज़ अपडेट।'],
  '/rahu-kaal/chennai': ['आज का राहु काल चेन्नई — राहु काल और चौघड़िया समय', 'चेन्नई में आज का राहु काल, यमगंड, गुलिक काल, सूर्योदय, सूर्यास्त, दिन-रात का चौघड़िया और 7 दिन की तालिका — चेन्नई के अपने सूर्योदय से। रोज़ अपडेट।'],
  '/rahu-kaal/kolkata': ['आज का राहु काल कोलकाता — राहु काल और चौघड़िया समय', 'कोलकाता में आज का राहु काल, यमगंड, गुलिक काल, सूर्योदय, सूर्यास्त, दिन-रात का चौघड़िया और 7 दिन की तालिका — कोलकाता के अपने सूर्योदय से। रोज़ अपडेट।'],
  '/rahu-kaal/hyderabad': ['आज का राहु काल हैदराबाद — राहु काल और चौघड़िया समय', 'हैदराबाद में आज का राहु काल, यमगंड, गुलिक काल, सूर्योदय, सूर्यास्त, दिन-रात का चौघड़िया और 7 दिन की तालिका — हैदराबाद के अपने सूर्योदय से। रोज़ अपडेट।'],
  '/rahu-kaal/ahmedabad': ['आज का राहु काल अहमदाबाद — राहु काल और चौघड़िया समय', 'अहमदाबाद में आज का राहु काल, यमगंड, गुलिक काल, सूर्योदय, सूर्यास्त, दिन-रात का चौघड़िया और 7 दिन की तालिका — अहमदाबाद के अपने सूर्योदय से। रोज़ अपडेट।'],
  '/rahu-kaal/pune': ['आज का राहु काल पुणे — राहु काल और चौघड़िया समय', 'पुणे में आज का राहु काल, यमगंड, गुलिक काल, सूर्योदय, सूर्यास्त, दिन-रात का चौघड़िया और 7 दिन की तालिका — पुणे के अपने सूर्योदय से। रोज़ अपडेट।'],
  '/rahu-kaal/lucknow': ['आज का राहु काल लखनऊ — राहु काल और चौघड़िया समय', 'लखनऊ में आज का राहु काल, यमगंड, गुलिक काल, सूर्योदय, सूर्यास्त, दिन-रात का चौघड़िया और 7 दिन की तालिका — लखनऊ के अपने सूर्योदय से। रोज़ अपडेट।'],
  '/rahu-kaal/jodhpur': ['आज का राहु काल जोधपुर — राहु काल और चौघड़िया समय', 'जोधपुर में आज का राहु काल, यमगंड, गुलिक काल, सूर्योदय, सूर्यास्त, दिन-रात का चौघड़िया और 7 दिन की तालिका — जोधपुर के अपने सूर्योदय से। रोज़ अपडेट।'],
  '/rahu-kaal/udaipur': ['आज का राहु काल उदयपुर — राहु काल और चौघड़िया समय', 'उदयपुर में आज का राहु काल, यमगंड, गुलिक काल, सूर्योदय, सूर्यास्त, दिन-रात का चौघड़िया और 7 दिन की तालिका — उदयपुर के अपने सूर्योदय से। रोज़ अपडेट।'],
  '/rahu-kaal/kota': ['आज का राहु काल कोटा — राहु काल और चौघड़िया समय', 'कोटा में आज का राहु काल, यमगंड, गुलिक काल, सूर्योदय, सूर्यास्त, दिन-रात का चौघड़िया और 7 दिन की तालिका — कोटा के अपने सूर्योदय से। रोज़ अपडेट।'],
  '/rahu-kaal/ajmer': ['आज का राहु काल अजमेर — राहु काल और चौघड़िया समय', 'अजमेर में आज का राहु काल, यमगंड, गुलिक काल, सूर्योदय, सूर्यास्त, दिन-रात का चौघड़िया और 7 दिन की तालिका — अजमेर के अपने सूर्योदय से। रोज़ अपडेट।'],
  '/rahu-kaal-jaipur': ['आज का राहु काल जयपुर — राहु काल और चौघड़िया समय', 'जयपुर में आज का राहु काल, यमगंड, गुलिक काल, सूर्योदय, सूर्यास्त और दिन-रात का चौघड़िया — दिल्ली, मुंबई और दूसरे शहरों के लिए भी। रोज़ अपडेट।'],
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
  '/privacy-policy': ['गोपनीयता नीति', 'पं. रजनीश शर्मा की वेबसाइट आपकी जानकारी, अंगूठे के निशान और फ्लोर प्लान कैसे लेती, उपयोग और सुरक्षित रखती है, और उन्हें देखने या हटाने का तरीका।'],
  '/terms': ['नियम और शर्तें', 'पं. रजनीश शर्मा, जयपुर के साथ ज्योतिष, नाड़ी और वास्तु परामर्श तथा यंत्र ऑर्डर की शर्तें: सेवा का स्वरूप, बुकिंग, भुगतान और प्रशंसापत्र।'],
  '/refund-policy': ['रिफंड और कैंसलेशन नीति', 'पं. रजनीश शर्मा के परामर्श, नाड़ी रीडिंग, वास्तु रिपोर्ट और यंत्र ऑर्डर के रिफंड और कैंसलेशन की शर्तें।'],
  '/shipping-policy': ['शिपिंग नीति', 'प्राण-प्रतिष्ठित यंत्र जयपुर से पूरे भारत और दुनिया भर में कैसे पैक और भेजे जाते हैं, और विदेश में कस्टम ड्यूटी कौन देता है।'],
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
    // Search Console / Bing ownership check — set the code in the server's environment variables.
    ...(process.env.GOOGLE_SITE_VERIFICATION ? [`<meta name="google-site-verification" content="${esc(process.env.GOOGLE_SITE_VERIFICATION)}" />`] : []),
    ...(process.env.BING_SITE_VERIFICATION ? [`<meta name="msvalidate.01" content="${esc(process.env.BING_SITE_VERIFICATION)}" />`] : []),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${hi ? 'hi_IN' : 'en_US'}" />`,
    `<meta property="og:site_name" content="${esc(hi ? NAME_HI : NAME)}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(desc)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
  ].join('\n    ');
  const page = await renderPage(raw, p);
  let out = template;
  if (page) out = out.replace('<div id="root"></div>', () => `<div id="root">${page.html}</div>\n    ${page.script}`);
  return out
    .replace(/<html lang="[^"]*"/, `<html lang="${hi ? 'hi' : 'en'}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(desc)}" />\n    ${tags}`);
}
