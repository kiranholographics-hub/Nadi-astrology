// Second batch of country pages (/nadi-astrology/<slug>). Added once on server start
// (SeedState 'countries-batch-2'); a slug that already exists is skipped. Edit later in /admin/countries.
// Facts kept general — exact shipping days are filled in from the admin.
const t = (en, hi) => ({ en, hi });

export const COUNTRY_BATCH2 = 'countries-batch-2';

const NO_TIME = [
  t('I don’t know my exact birth time. Can I still get a Nadi reading?', 'मुझे जन्म का सही समय नहीं पता। क्या फिर भी नाड़ी रीडिंग हो सकती है?'),
  t('Yes. A Nadi reading starts from your thumb impression, not your birth time. Your leaf is searched for from the thumb print, and the reader confirms it with yes/no questions.', 'हाँ। नाड़ी रीडिंग अंगूठे के निशान से शुरू होती है, जन्म समय से नहीं। पट्टा अंगूठे के निशान से खोजा जाता है, और रीडर हाँ/ना वाले प्रश्नों से उसकी पुष्टि करते हैं।'),
];
const PAY_USD = (name, nameHi, cur, curHi) => [
  t(`How do I pay from ${name}?`, `${nameHi} से भुगतान कैसे करें?`),
  t(`In US dollars through PayPal; your card or PayPal converts from ${cur} automatically.`, `US डॉलर में PayPal से; आपका कार्ड या PayPal ${curHi} से अपने-आप बदल देता है।`),
];

export const countries2 = [
  {
    name: 'New Zealand', nameHi: 'न्यूज़ीलैंड', code: 'NZ', slug: 'new-zealand', inName: 'New Zealand', status: 'active', order: 8,
    timezones: [{ label: 'Auckland', tz: 'Pacific/Auckland' }],
    cities: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Tauranga'],
    intro: t(
      'Nadi palm-leaf reading for clients in New Zealand, online by video call. Send a photo of your thumb impression, the Nadi readers search for your leaf, and you join the reading with live English or Hindi translation. Pt. Rajneesh Sharma then studies it with your birth chart and explains the remedies.',
      'न्यूज़ीलैंड के क्लाइंट्स के लिए वीडियो कॉल पर ऑनलाइन नाड़ी ताड़-पत्र रीडिंग। अंगूठे के निशान की फोटो भेजें, नाड़ी रीडर आपका पट्टा खोजते हैं, और आप अंग्रेज़ी या हिंदी अनुवाद के साथ रीडिंग में जुड़ते हैं। फिर पं. रजनीश शर्मा कुंडली के साथ उसका विश्लेषण कर उपाय बताते हैं।'
    ),
    community: t(
      'New Zealand’s Indian community — including many Fiji Indian and South Indian families — has grown fast, above all in Auckland. New Zealand is 6½–7½ hours ahead of India, so our daytime slots fall in your evening.',
      'न्यूज़ीलैंड का भारतीय समुदाय — जिसमें कई फ़िजी-भारतीय और दक्षिण भारतीय परिवार हैं — तेज़ी से बढ़ा है, ख़ासकर ऑकलैंड में। न्यूज़ीलैंड भारत से 6½–7½ घंटे आगे है, इसलिए हमारे दिन के स्लॉट आपकी शाम में आते हैं।'
    ),
    customsNote: t('Yantras ship from Jaipur by international courier. New Zealand has strict biosecurity rules, so the parcel holds only the metal yantra and printed material. Any GST or duty on import is paid by the buyer.', 'यंत्र जयपुर से इंटरनेशनल कूरियर से भेजे जाते हैं। न्यूज़ीलैंड में बायोसिक्योरिटी नियम सख़्त हैं, इसलिए पार्सल में सिर्फ़ धातु का यंत्र और छपी सामग्री होती है। इम्पोर्ट पर कोई GST या ड्यूटी लगे तो वह खरीदार देता है।'),
    faqs: [
      [t('What time are the consultations in Auckland?', 'ऑकलैंड में परामर्श किस समय होता है?'), t('Our slots are 10 am to 6 pm India time — roughly 5:30 pm to 1:30 am in Auckland during New Zealand summer, and an hour earlier in winter. The table on this page shows today’s exact times.', 'हमारे स्लॉट भारत के समय से सुबह 10 से शाम 6 बजे तक हैं — न्यूज़ीलैंड की गर्मियों में ऑकलैंड में लगभग शाम 5:30 से रात 1:30, और सर्दियों में एक घंटा पहले। आज का सही समय इस पेज की तालिका में है।')],
      [t('Where do I get an ink pad for the thumb impression?', 'अंगूठे के निशान के लिए इंक पैड कहाँ मिलेगा?'), t('Warehouse Stationery or Kmart sell ink pads. Roll your thumb (men: right, women: left) on plain white paper and upload a clear photo.', 'Warehouse Stationery या Kmart पर इंक पैड मिलते हैं। अंगूठा (पुरुष: दायाँ, महिला: बायाँ) सादे सफ़ेद कागज़ पर घुमाएँ और साफ़ फोटो अपलोड करें।')],
      PAY_USD('New Zealand', 'न्यूज़ीलैंड', 'NZ dollars', 'न्यूज़ीलैंड डॉलर'),
      NO_TIME,
    ],
    seoTitle: 'Nadi Astrology in New Zealand — Online Palm Leaf Reading',
    metaDescription: 'Online Nadi palm-leaf reading for Auckland, Wellington and all of New Zealand. Evening slots in NZ time, translation, remedies by Pt. Rajneesh Sharma.',
  },
  {
    name: 'Qatar', nameHi: 'क़तर', code: 'QA', slug: 'qatar', inName: 'Qatar', status: 'active', order: 9,
    timezones: [{ label: 'Doha', tz: 'Asia/Qatar' }],
    cities: ['Doha', 'Al Rayyan', 'Al Wakrah', 'Lusail', 'Al Khor'],
    intro: t(
      'Nadi palm-leaf reading for clients in Doha and across Qatar — online by video call, or at our Jaipur office when you are home in India. Pt. Rajneesh Sharma reads your leaf together with your birth chart and suggests practical remedies.',
      'दोहा और पूरे क़तर के क्लाइंट्स के लिए नाड़ी ताड़-पत्र रीडिंग — वीडियो कॉल पर ऑनलाइन, या भारत आने पर हमारे जयपुर ऑफिस में। पं. रजनीश शर्मा आपके पट्टे को कुंडली के साथ पढ़कर व्यावहारिक उपाय बताते हैं।'
    ),
    community: t(
      'Indians are the largest community in Qatar, with many families from Kerala, Tamil Nadu and other states. Qatar is 2½ hours behind India, so our slots fall in your morning and early afternoon — easy to fit around work.',
      'क़तर में भारतीय सबसे बड़ा समुदाय हैं, जिनमें केरल, तमिलनाडु और दूसरे राज्यों के कई परिवार हैं। क़तर भारत से 2½ घंटे पीछे है, इसलिए हमारे स्लॉट आपकी सुबह और दोपहर में आते हैं — काम के साथ आसानी से।'
    ),
    customsNote: t('Yantras ship from Jaipur by international courier. Any customs duty in Qatar is paid by the buyer.', 'यंत्र जयपुर से इंटरनेशनल कूरियर से भेजे जाते हैं। क़तर में कोई कस्टम ड्यूटी लगे तो वह खरीदार देता है।'),
    faqs: [
      [t('What time are calls in Doha?', 'दोहा में कॉल किस समय होती है?'), t('Our slots are 10 am to 6 pm India time — 7:30 am to 3:30 pm in Doha.', 'हमारे स्लॉट भारत के समय से सुबह 10 से शाम 6 बजे तक हैं — दोहा में सुबह 7:30 से दोपहर 3:30 तक।')],
      [t('Which app is used for the video call?', 'वीडियो कॉल किस ऐप पर होती है?'), t('Zoom, which works reliably across the Gulf, or WhatsApp video where it works on your network. You receive the recording afterwards.', 'Zoom, जो पूरे खाड़ी क्षेत्र में भरोसेमंद चलता है, या WhatsApp वीडियो जहाँ आपके नेटवर्क पर चलता हो। बाद में आपको रिकॉर्डिंग मिलती है।')],
      [t('Can I meet Pandit ji in Jaipur during my vacation?', 'छुट्टी में जयपुर आकर क्या पंडित जी से मिल सकते हैं?'), t('Yes. Book the slot before you travel, so the leaf search can start before you arrive.', 'हाँ। यात्रा से पहले स्लॉट बुक करें, ताकि आपके आने से पहले पट्टा खोज शुरू हो सके।')],
      NO_TIME,
    ],
    seoTitle: 'Nadi Astrology in Qatar — Online Palm Leaf Reading, Doha',
    metaDescription: 'Nadi palm-leaf reading for Doha and all of Qatar by video call, or at the Jaipur office. Morning slots in Qatar time, remedies by Pt. Rajneesh Sharma.',
  },
  {
    name: 'Kuwait', nameHi: 'कुवैत', code: 'KW', slug: 'kuwait', inName: 'Kuwait', status: 'active', order: 10,
    timezones: [{ label: 'Kuwait City', tz: 'Asia/Kuwait' }],
    cities: ['Kuwait City', 'Salmiya', 'Farwaniya', 'Abbasiya', 'Mangaf', 'Fahaheel'],
    intro: t(
      'Nadi palm-leaf reading for clients in Kuwait, online by video call. Upload your thumb impression, the Nadi readers find your leaf, and you hear it read with translation; Pt. Rajneesh Sharma then adds Vedic/KP analysis and remedies.',
      'कुवैत के क्लाइंट्स के लिए वीडियो कॉल पर ऑनलाइन नाड़ी ताड़-पत्र रीडिंग। अंगूठे का निशान अपलोड करें, नाड़ी रीडर आपका पट्टा खोजते हैं, और आप अनुवाद के साथ रीडिंग सुनते हैं; फिर पं. रजनीश शर्मा वैदिक/केपी विश्लेषण और उपाय जोड़ते हैं।'
    ),
    community: t(
      'Kuwait has one of the largest Indian communities in the Gulf, with many South Indian families in areas such as Abbasiya, Salmiya and Mangaf. Kuwait is 2½ hours behind India, so slots fall in your morning and early afternoon.',
      'कुवैत में खाड़ी के सबसे बड़े भारतीय समुदायों में से एक है, जिसमें अब्बासिया, सालमिया और मंगफ़ जैसे इलाक़ों में कई दक्षिण भारतीय परिवार हैं। कुवैत भारत से 2½ घंटे पीछे है, इसलिए स्लॉट आपकी सुबह और दोपहर में आते हैं।'
    ),
    customsNote: t('Yantras ship from Jaipur by international courier. Any customs duty in Kuwait is paid by the buyer.', 'यंत्र जयपुर से इंटरनेशनल कूरियर से भेजे जाते हैं। कुवैत में कोई कस्टम ड्यूटी लगे तो वह खरीदार देता है।'),
    faqs: [
      [t('What time are calls in Kuwait?', 'कुवैत में कॉल किस समय होती है?'), t('Our slots are 10 am to 6 pm India time — 7:30 am to 3:30 pm in Kuwait.', 'हमारे स्लॉट भारत के समय से सुबह 10 से शाम 6 बजे तक हैं — कुवैत में सुबह 7:30 से दोपहर 3:30 तक।')],
      [t('Can the reading be in Tamil?', 'क्या रीडिंग तमिल में हो सकती है?'), t('The leaves are in old Tamil and the Nadi reader can usually speak with you directly in Tamil; the analysis and remedies are explained in English or Hindi.', 'पट्टे पुरानी तमिल में होते हैं और नाड़ी रीडर आमतौर पर सीधे तमिल में बात कर सकते हैं; विश्लेषण और उपाय अंग्रेज़ी या हिंदी में समझाए जाते हैं।')],
      PAY_USD('Kuwait', 'कुवैत', 'Kuwaiti dinars', 'कुवैती दीनार'),
      NO_TIME,
    ],
    seoTitle: 'Nadi Astrology in Kuwait — Online Palm Leaf Reading',
    metaDescription: 'Online Nadi palm-leaf reading for Kuwait City, Salmiya, Abbasiya and all of Kuwait. Morning slots, translation, remedies by Pt. Rajneesh Sharma.',
  },
  {
    name: 'Oman', nameHi: 'ओमान', code: 'OM', slug: 'oman', inName: 'Oman', status: 'active', order: 11,
    timezones: [{ label: 'Muscat', tz: 'Asia/Muscat' }],
    cities: ['Muscat', 'Ruwi', 'Seeb', 'Sohar', 'Salalah', 'Nizwa'],
    intro: t(
      'Nadi palm-leaf reading for clients in Muscat and across Oman — online by video call, or at our Jaipur office during your visit to India. Pt. Rajneesh Sharma explains your leaf with your birth chart and suggests remedies.',
      'मस्कट और पूरे ओमान के क्लाइंट्स के लिए नाड़ी ताड़-पत्र रीडिंग — वीडियो कॉल पर ऑनलाइन, या भारत आने पर हमारे जयपुर ऑफिस में। पं. रजनीश शर्मा कुंडली के साथ आपका पट्टा समझाते हैं और उपाय बताते हैं।'
    ),
    community: t(
      'Indian families have lived and traded in Oman for generations, from Gujarat to Kerala. Oman is just 1½ hours behind India, so every slot falls comfortably in your working day.',
      'भारतीय परिवार पीढ़ियों से ओमान में रहते और व्यापार करते आए हैं, गुजरात से केरल तक। ओमान भारत से सिर्फ़ 1½ घंटे पीछे है, इसलिए हर स्लॉट आपके दिन में आराम से आ जाता है।'
    ),
    customsNote: t('Yantras ship from Jaipur by international courier. Any customs duty or VAT in Oman is paid by the buyer.', 'यंत्र जयपुर से इंटरनेशनल कूरियर से भेजे जाते हैं। ओमान में कोई कस्टम ड्यूटी या VAT लगे तो वह खरीदार देता है।'),
    faqs: [
      [t('What time are calls in Muscat?', 'मस्कट में कॉल किस समय होती है?'), t('Our slots are 10 am to 6 pm India time — 8:30 am to 4:30 pm in Muscat.', 'हमारे स्लॉट भारत के समय से सुबह 10 से शाम 6 बजे तक हैं — मस्कट में सुबह 8:30 से शाम 4:30 तक।')],
      [t('Which app is used for the video call?', 'वीडियो कॉल किस ऐप पर होती है?'), t('Zoom, which works reliably in Oman, or WhatsApp video where it works on your network. You receive the recording afterwards.', 'Zoom, जो ओमान में भरोसेमंद चलता है, या WhatsApp वीडियो जहाँ आपके नेटवर्क पर चलता हो। बाद में आपको रिकॉर्डिंग मिलती है।')],
      PAY_USD('Oman', 'ओमान', 'Omani rials', 'ओमानी रियाल'),
      NO_TIME,
    ],
    seoTitle: 'Nadi Astrology in Oman — Online Palm Leaf Reading, Muscat',
    metaDescription: 'Nadi palm-leaf reading for Muscat and all of Oman by video call, or at the Jaipur office. Daytime slots, remedies by Pt. Rajneesh Sharma.',
  },
  {
    name: 'Germany', nameHi: 'जर्मनी', code: 'DE', slug: 'germany', inName: 'Germany', status: 'active', order: 12,
    timezones: [{ label: 'Berlin', tz: 'Europe/Berlin' }],
    cities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Stuttgart', 'Düsseldorf', 'Cologne'],
    intro: t(
      'Nadi palm-leaf reading for clients in Germany, online by video call. Send your thumb impression, the Nadi readers search for your leaf, and you hear it read with English or Hindi translation. Pt. Rajneesh Sharma then adds Vedic/KP analysis and remedies.',
      'जर्मनी के क्लाइंट्स के लिए वीडियो कॉल पर ऑनलाइन नाड़ी ताड़-पत्र रीडिंग। अंगूठे का निशान भेजें, नाड़ी रीडर आपका पट्टा खोजते हैं, और आप अंग्रेज़ी या हिंदी अनुवाद के साथ रीडिंग सुनते हैं। फिर पं. रजनीश शर्मा वैदिक/केपी विश्लेषण और उपाय जोड़ते हैं।'
    ),
    community: t(
      'Germany is home to a fast-growing community of Indian professionals and students, and to one of Europe’s larger Sri Lankan Tamil communities. Germany is 3½–4½ hours behind India, so our slots fall in your morning.',
      'जर्मनी में भारतीय प्रोफ़ेशनल्स और विद्यार्थियों का तेज़ी से बढ़ता समुदाय है, और यूरोप के बड़े श्रीलंकाई तमिल समुदायों में से एक भी। जर्मनी भारत से 3½–4½ घंटे पीछे है, इसलिए हमारे स्लॉट आपकी सुबह में आते हैं।'
    ),
    customsNote: t('Yantras ship from Jaipur by international courier. In the EU, import VAT applies to parcels of any value; it and any duty are paid by the buyer.', 'यंत्र जयपुर से इंटरनेशनल कूरियर से भेजे जाते हैं। EU में हर मूल्य के पार्सल पर इम्पोर्ट VAT लगता है; यह और कोई ड्यूटी खरीदार देता है।'),
    faqs: [
      [t('What time are consultations in Germany?', 'जर्मनी में परामर्श किस समय होता है?'), t('Our slots are 10 am to 6 pm India time — 5:30 am to 1:30 pm in Germany in winter and 6:30 am to 2:30 pm in summer. The table on this page shows today’s exact times.', 'हमारे स्लॉट भारत के समय से सुबह 10 से शाम 6 बजे तक हैं — जर्मनी में सर्दियों में सुबह 5:30 से दोपहर 1:30 और गर्मियों में सुबह 6:30 से दोपहर 2:30। आज का सही समय इस पेज की तालिका में है।')],
      [t('Where can I get an ink pad in Germany?', 'जर्मनी में इंक पैड कहाँ मिलेगा?'), t('Any stationery shop (Schreibwarenladen) or a drugstore such as dm or Rossmann sells stamp pads (Stempelkissen). Roll your thumb on plain white paper and upload a clear photo.', 'किसी भी स्टेशनरी दुकान (Schreibwarenladen) या dm, Rossmann जैसे ड्रगस्टोर पर स्टैम्प पैड (Stempelkissen) मिलते हैं। अंगूठा सादे सफ़ेद कागज़ पर घुमाएँ और साफ़ फोटो अपलोड करें।')],
      PAY_USD('Germany', 'जर्मनी', 'euros', 'यूरो'),
      NO_TIME,
    ],
    seoTitle: 'Nadi Astrology in Germany — Online Palm Leaf Reading',
    metaDescription: 'Online Nadi palm-leaf reading for Berlin, Munich, Frankfurt and all of Germany. Morning slots in German time, translation, remedies by Pt. Rajneesh Sharma.',
  },
  {
    name: 'Mauritius', nameHi: 'मॉरीशस', code: 'MU', slug: 'mauritius', inName: 'Mauritius', status: 'active', order: 13,
    timezones: [{ label: 'Port Louis', tz: 'Indian/Mauritius' }],
    cities: ['Port Louis', 'Quatre Bornes', 'Curepipe', 'Vacoas', 'Rose Hill', 'Goodlands'],
    intro: t(
      'Nadi palm-leaf reading for clients in Mauritius, online by video call. Upload your thumb impression, the Nadi readers find your leaf and read it with you in Tamil, English or Hindi, and Pt. Rajneesh Sharma adds Vedic/KP analysis and remedies.',
      'मॉरीशस के क्लाइंट्स के लिए वीडियो कॉल पर ऑनलाइन नाड़ी ताड़-पत्र रीडिंग। अंगूठे का निशान अपलोड करें, नाड़ी रीडर आपका पट्टा खोजकर तमिल, अंग्रेज़ी या हिंदी में पढ़ते हैं, और पं. रजनीश शर्मा वैदिक/केपी विश्लेषण और उपाय जोड़ते हैं।'
    ),
    community: t(
      'More than half of Mauritius traces its roots to India, and Hindu temples, kovils and festivals are part of everyday life — Tamil families know the Nadi tradition well. Mauritius is just 1½ hours behind India, so every slot falls in your daytime.',
      'मॉरीशस की आधी से ज़्यादा आबादी की जड़ें भारत में हैं, और हिंदू मंदिर, कोविल और त्योहार रोज़मर्रा के जीवन का हिस्सा हैं — तमिल परिवार नाड़ी परंपरा को अच्छी तरह जानते हैं। मॉरीशस भारत से सिर्फ़ 1½ घंटे पीछे है, इसलिए हर स्लॉट आपके दिन में आता है।'
    ),
    customsNote: t('Yantras ship from Jaipur by international courier. Any customs duty or VAT in Mauritius is paid by the buyer.', 'यंत्र जयपुर से इंटरनेशनल कूरियर से भेजे जाते हैं। मॉरीशस में कोई कस्टम ड्यूटी या VAT लगे तो वह खरीदार देता है।'),
    faqs: [
      [t('What time are calls in Mauritius?', 'मॉरीशस में कॉल किस समय होती है?'), t('Our slots are 10 am to 6 pm India time — 8:30 am to 4:30 pm in Mauritius.', 'हमारे स्लॉट भारत के समय से सुबह 10 से शाम 6 बजे तक हैं — मॉरीशस में सुबह 8:30 से शाम 4:30 तक।')],
      [t('Can the reading be in Tamil?', 'क्या रीडिंग तमिल में हो सकती है?'), t('Yes. The leaves are in old Tamil and the Nadi reader can usually speak with you directly in Tamil; Pt. Rajneesh Sharma explains the remedies in English or Hindi.', 'हाँ। पट्टे पुरानी तमिल में होते हैं और नाड़ी रीडर आमतौर पर सीधे तमिल में बात कर सकते हैं; पं. रजनीश शर्मा उपाय अंग्रेज़ी या हिंदी में समझाते हैं।')],
      PAY_USD('Mauritius', 'मॉरीशस', 'Mauritian rupees', 'मॉरीशस रुपये'),
      NO_TIME,
    ],
    seoTitle: 'Nadi Astrology in Mauritius — Online Nadi Jothidam',
    metaDescription: 'Online Nadi jothidam for Mauritius — palm-leaf reading in Tamil, English or Hindi by video call, daytime slots, remedies by Pt. Rajneesh Sharma.',
  },
].map((c) => ({ ...c, contentVersion: 1, faqs: c.faqs.map(([q, a]) => ({ q, a })) }));
