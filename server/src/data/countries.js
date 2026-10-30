// First 7 country pages (added to the database on first start; edit them later in /admin/countries).
// Facts kept general on purpose — exact shipping days / prices are filled in from the admin.
const t = (en, hi) => ({ en, hi });

const COMMON_FAQ = {
  noTime: [
    t('I don’t know my exact birth time. Can I still get a Nadi reading?', 'मुझे जन्म का सही समय नहीं पता। क्या फिर भी नाड़ी रीडिंग हो सकती है?'),
    t('Yes. A Nadi reading starts from your thumb impression, not your birth time. Your leaf is searched for from the thumb print, and the reader confirms it with yes/no questions.', 'हाँ। नाड़ी रीडिंग अंगूठे के निशान से शुरू होती है, जन्म समय से नहीं। पट्टा अंगूठे के निशान से खोजा जाता है और रीडर हाँ/ना वाले प्रश्नों से उसकी पुष्टि करते हैं।'),
  ],
  language: [
    t('Which language is the reading in?', 'रीडिंग किस भाषा में होती है?'),
    t('The leaves are written in old Tamil. The reading is translated live into English or Hindi, and Pt. Rajneesh Sharma explains the remedies in English or Hindi.', 'पट्टे पुरानी तमिल में लिखे होते हैं। रीडिंग का अनुवाद साथ-साथ अंग्रेज़ी या हिंदी में होता है, और पं. रजनीश शर्मा उपाय अंग्रेज़ी या हिंदी में समझाते हैं।'),
  ],
};

export const countries = [
  {
    name: 'United States', nameHi: 'अमेरिका', code: 'US', slug: 'usa', inName: 'the USA', status: 'active', order: 1,
    timezones: [{ label: 'New York', tz: 'America/New_York' }, { label: 'Chicago', tz: 'America/Chicago' }, { label: 'Los Angeles', tz: 'America/Los_Angeles' }],
    cities: ['New York', 'New Jersey', 'Bay Area', 'Dallas', 'Houston', 'Chicago', 'Atlanta', 'Seattle'],
    intro: t(
      'Get your Nadi palm-leaf reading from the USA without travelling to India. Send your thumb impression online, traditional Nadi readers search for your leaf, and you join the reading on a video call. Pt. Rajneesh Sharma then studies the leaf alongside your birth chart and explains the remedies.',
      'भारत आए बिना अमेरिका से अपनी नाड़ी ताड़-पत्र रीडिंग करवाएँ। अंगूठे का निशान ऑनलाइन भेजें, पारंपरिक नाड़ी रीडर आपका पट्टा खोजते हैं, और आप वीडियो कॉल पर रीडिंग में जुड़ते हैं। फिर पं. रजनीश शर्मा पट्टे को आपकी कुंडली के साथ देखकर उपाय समझाते हैं।'
    ),
    community: t(
      'The USA has the largest Indian community outside India, including many Tamil and Telugu families who grew up with the Nadi tradition. A Friday or Saturday evening in the US is Saturday or Sunday morning in India, which makes weekend calls easy.',
      'अमेरिका में भारत के बाहर सबसे बड़ा भारतीय समुदाय है, जिसमें कई तमिल और तेलुगु परिवार हैं जो नाड़ी परंपरा को जानते हैं। अमेरिका की शुक्रवार या शनिवार की शाम भारत में शनिवार या रविवार की सुबह होती है, इसलिए वीकेंड पर कॉल आसान रहती है।'
    ),
    customsNote: t('Yantras ship from Jaipur by international courier. Any US import duty or tax is charged by US customs and paid by the buyer.', 'यंत्र जयपुर से इंटरनेशनल कूरियर से भेजे जाते हैं। अमेरिका में लगने वाली कोई भी इम्पोर्ट ड्यूटी या टैक्स US कस्टम लेता है और वह खरीदार देता है।'),
    faqs: [
      [t('What time will my video call be in the US?', 'अमेरिका में मेरी वीडियो कॉल किस समय होगी?'), t('Consultation slots run from 10 am to 6 pm India time. On the US East Coast that is late night to early morning, and on the West Coast it is the evening before — the table on this page shows the exact times for New York, Chicago and Los Angeles.', 'परामर्श के स्लॉट भारत के समय से सुबह 10 से शाम 6 बजे तक हैं। अमेरिका के ईस्ट कोस्ट पर यह देर रात से सुबह तक, और वेस्ट कोस्ट पर पिछले दिन की शाम होती है — इस पेज की टेबल में न्यूयॉर्क, शिकागो और लॉस एंजेलिस का सही समय दिया है।')],
      [t('How do I pay from the USA?', 'अमेरिका से भुगतान कैसे करें?'), t('International clients pay in US dollars through PayPal (card or PayPal balance).', 'विदेशी क्लाइंट US डॉलर में PayPal से भुगतान करते हैं (कार्ड या PayPal बैलेंस)।')],
      COMMON_FAQ.noTime,
      COMMON_FAQ.language,
    ],
    seoTitle: 'Nadi Astrology in the USA — Online Palm Leaf Reading',
    metaDescription: 'Nadi palm-leaf reading from the USA by video call. Send your thumb impression online; Vedic/KP analysis and remedies by Pt. Rajneesh Sharma. Pay in USD.',
  },
  {
    name: 'United Kingdom', nameHi: 'यूनाइटेड किंगडम', code: 'GB', slug: 'uk', inName: 'the UK', status: 'active', order: 2,
    timezones: [{ label: 'London', tz: 'Europe/London' }],
    cities: ['London', 'Leicester', 'Birmingham', 'Manchester', 'Croydon', 'Harrow', 'Wembley'],
    intro: t(
      'Nadi palm-leaf readings for clients in the UK, done online. You send your thumb impression, the Nadi readers find your leaf, and you hear it read with live English translation on a video call. Pt. Rajneesh Sharma then adds Vedic/KP analysis and remedies.',
      'UK के क्लाइंट्स के लिए ऑनलाइन नाड़ी ताड़-पत्र रीडिंग। आप अंगूठे का निशान भेजते हैं, नाड़ी रीडर आपका पट्टा खोजते हैं, और वीडियो कॉल पर अंग्रेज़ी अनुवाद के साथ आप उसे सुनते हैं। फिर पं. रजनीश शर्मा वैदिक/केपी विश्लेषण और उपाय बताते हैं।'
    ),
    community: t(
      'The UK has one of the oldest Indian and Sri Lankan Tamil communities in Europe. UK time is only 4½–5½ hours behind India, so most slots fall in your morning — easy to fit before work.',
      'UK में यूरोप का सबसे पुराना भारतीय और श्रीलंकाई तमिल समुदाय है। UK का समय भारत से सिर्फ़ 4½–5½ घंटे पीछे है, इसलिए ज़्यादातर स्लॉट आपकी सुबह में आते हैं — काम से पहले आसानी से हो जाता है।'
    ),
    customsNote: t('Yantras ship from Jaipur by international courier. UK import VAT or duty, if charged, is paid by the buyer.', 'यंत्र जयपुर से इंटरनेशनल कूरियर से भेजे जाते हैं। UK में इम्पोर्ट VAT या ड्यूटी लगे तो वह खरीदार देता है।'),
    faqs: [
      [t('What time are the consultations in the UK?', 'UK में परामर्श किस समय होता है?'), t('Slots run from 10 am to 6 pm India time, which is 4:30 am to 12:30 pm in London in winter and 5:30 am to 1:30 pm in summer. The table on this page shows today’s exact times.', 'स्लॉट भारत के समय से सुबह 10 से शाम 6 बजे तक हैं, जो लंदन में सर्दियों में सुबह 4:30 से दोपहर 12:30 और गर्मियों में सुबह 5:30 से दोपहर 1:30 है। इस पेज की टेबल में आज का सही समय दिया है।')],
      [t('Can I pay in pounds?', 'क्या पाउंड में भुगतान कर सकते हैं?'), t('Payment is taken in US dollars through PayPal; PayPal or your card converts it from pounds automatically.', 'भुगतान US डॉलर में PayPal से लिया जाता है; PayPal या आपका कार्ड पाउंड से अपने-आप बदल देता है।')],
      COMMON_FAQ.noTime,
      COMMON_FAQ.language,
    ],
    seoTitle: 'Nadi Astrology in the UK — Online Palm Leaf Reading',
    metaDescription: 'Online Nadi palm-leaf reading for UK clients — thumb impression, live English translation, remedies by Pt. Rajneesh Sharma. Morning slots in UK time.',
  },
  {
    name: 'Canada', nameHi: 'कनाडा', code: 'CA', slug: 'canada', inName: 'Canada', status: 'active', order: 3,
    timezones: [{ label: 'Toronto', tz: 'America/Toronto' }, { label: 'Vancouver', tz: 'America/Vancouver' }],
    cities: ['Toronto', 'Brampton', 'Mississauga', 'Scarborough', 'Vancouver', 'Surrey', 'Calgary', 'Montreal'],
    intro: t(
      'Nadi palm-leaf reading for clients across Canada, by video call. Upload your thumb impression, the Nadi readers search for your leaf, and Pt. Rajneesh Sharma explains it alongside your birth chart with practical remedies.',
      'पूरे कनाडा के क्लाइंट्स के लिए वीडियो कॉल पर नाड़ी ताड़-पत्र रीडिंग। अंगूठे का निशान अपलोड करें, नाड़ी रीडर आपका पट्टा खोजते हैं, और पं. रजनीश शर्मा उसे कुंडली के साथ समझाकर व्यावहारिक उपाय बताते हैं।'
    ),
    community: t(
      'Canada — especially the Toronto area — is home to one of the world’s largest Tamil communities outside South Asia, where the Nadi tradition is widely known. Late evening in Toronto and Vancouver lines up with Indian morning hours.',
      'कनाडा — ख़ासकर टोरंटो क्षेत्र — दक्षिण एशिया के बाहर दुनिया के सबसे बड़े तमिल समुदायों में से एक का घर है, जहाँ नाड़ी परंपरा जानी-पहचानी है। टोरंटो और वैंकूवर की देर शाम भारत की सुबह से मेल खाती है।'
    ),
    customsNote: t('Yantras ship from Jaipur by international courier. Canadian duty and taxes, if any, are paid by the buyer on delivery.', 'यंत्र जयपुर से इंटरनेशनल कूरियर से भेजे जाते हैं। कनाडा की ड्यूटी और टैक्स, अगर लगें, तो डिलीवरी पर खरीदार देता है।'),
    faqs: [
      [t('What time will the reading be in Toronto or Vancouver?', 'टोरंटो या वैंकूवर में रीडिंग किस समय होगी?'), t('India is 9½–10½ hours ahead of Toronto and 12½–13½ hours ahead of Vancouver, so our slots fall from late night to early morning in Toronto and from evening to early morning in Vancouver. The table on this page shows today’s exact times.', 'भारत टोरंटो से 9½–10½ घंटे और वैंकूवर से 12½–13½ घंटे आगे है, इसलिए हमारे स्लॉट टोरंटो में देर रात से सुबह तक और वैंकूवर में शाम से सुबह तक आते हैं। इस पेज की टेबल में आज का सही समय दिया है।')],
      [t('How do I pay from Canada?', 'कनाडा से भुगतान कैसे करें?'), t('In US dollars through PayPal; your card or PayPal converts from Canadian dollars automatically.', 'US डॉलर में PayPal से; आपका कार्ड या PayPal कनाडाई डॉलर से अपने-आप बदल देता है।')],
      COMMON_FAQ.noTime,
      COMMON_FAQ.language,
    ],
    seoTitle: 'Nadi Astrology in Canada — Online Palm Leaf Reading',
    metaDescription: 'Nadi palm-leaf reading for Toronto, Vancouver and all of Canada by video call. Thumb impression online, remedies by Pt. Rajneesh Sharma. Pay in USD.',
  },
  {
    name: 'Australia', nameHi: 'ऑस्ट्रेलिया', code: 'AU', slug: 'australia', inName: 'Australia', status: 'active', order: 4,
    timezones: [{ label: 'Sydney', tz: 'Australia/Sydney' }, { label: 'Perth', tz: 'Australia/Perth' }],
    cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Canberra'],
    intro: t(
      'Online Nadi palm-leaf reading for clients in Australia. Send your thumb impression from home; the Nadi readers find and read your leaf on a video call, and Pt. Rajneesh Sharma adds Vedic/KP analysis and remedies.',
      'ऑस्ट्रेलिया के क्लाइंट्स के लिए ऑनलाइन नाड़ी ताड़-पत्र रीडिंग। घर से अंगूठे का निशान भेजें; नाड़ी रीडर वीडियो कॉल पर आपका पट्टा खोजकर पढ़ते हैं, और पं. रजनीश शर्मा वैदिक/केपी विश्लेषण और उपाय बताते हैं।'
    ),
    community: t(
      'Australia’s Indian and Sri Lankan Tamil communities have grown quickly, especially in Sydney and Melbourne. Australia is ahead of India, so our morning slots fall in your afternoon and evening.',
      'ऑस्ट्रेलिया में भारतीय और श्रीलंकाई तमिल समुदाय तेज़ी से बढ़े हैं, ख़ासकर सिडनी और मेलबर्न में। ऑस्ट्रेलिया भारत से आगे है, इसलिए हमारे सुबह के स्लॉट आपकी दोपहर और शाम में आते हैं।'
    ),
    customsNote: t('Yantras ship from Jaipur by international courier. Australian GST or duty, if charged on import, is paid by the buyer.', 'यंत्र जयपुर से इंटरनेशनल कूरियर से भेजे जाते हैं। ऑस्ट्रेलिया में इम्पोर्ट पर GST या ड्यूटी लगे तो वह खरीदार देता है।'),
    faqs: [
      [t('What time are consultations in Sydney or Perth?', 'सिडनी या पर्थ में परामर्श किस समय होता है?'), t('Our 10 am–6 pm India-time slots fall in the afternoon and evening in Sydney and around midday to evening in Perth. The table on this page shows today’s exact times.', 'हमारे भारत के समय वाले सुबह 10 से शाम 6 के स्लॉट सिडनी में दोपहर और शाम, और पर्थ में दोपहर से शाम तक आते हैं। इस पेज की टेबल में आज का सही समय दिया है।')],
      [t('Can I order a yantra to Australia?', 'क्या ऑस्ट्रेलिया में यंत्र मँगवा सकते हैं?'), t('Yes. Energized yantras ship worldwide with a video of the pran-pratishtha. Australia has strict biosecurity rules, so the parcel contains only the metal yantra and printed material — no seeds, flowers or other organic items.', 'हाँ। प्राण-प्रतिष्ठित यंत्र प्राण-प्रतिष्ठा के वीडियो के साथ दुनिया भर में भेजे जाते हैं। ऑस्ट्रेलिया के बायोसिक्योरिटी नियम सख़्त हैं, इसलिए पार्सल में सिर्फ़ धातु का यंत्र और छपी सामग्री होती है — बीज, फूल या दूसरी जैविक चीज़ें नहीं।')],
      COMMON_FAQ.noTime,
      COMMON_FAQ.language,
    ],
    seoTitle: 'Nadi Astrology in Australia — Online Palm Leaf Reading',
    metaDescription: 'Online Nadi palm-leaf reading for Sydney, Melbourne, Perth and all of Australia. Afternoon slots in your time zone. Remedies by Pt. Rajneesh Sharma.',
  },
  {
    name: 'Singapore', nameHi: 'सिंगापुर', code: 'SG', slug: 'singapore', inName: 'Singapore', status: 'active', order: 5,
    timezones: [{ label: 'Singapore', tz: 'Asia/Singapore' }],
    cities: ['Little India', 'Serangoon', 'Tampines', 'Jurong', 'Woodlands'],
    intro: t(
      'Nadi palm-leaf reading for clients in Singapore, online. Send your thumb impression, the Nadi readers search for your leaf, and you join the reading on a video call — in Tamil, English or Hindi. Pt. Rajneesh Sharma then explains it with your birth chart and remedies.',
      'सिंगापुर के क्लाइंट्स के लिए ऑनलाइन नाड़ी ताड़-पत्र रीडिंग। अंगूठे का निशान भेजें, नाड़ी रीडर आपका पट्टा खोजते हैं, और आप वीडियो कॉल पर रीडिंग में जुड़ते हैं — तमिल, अंग्रेज़ी या हिंदी में। फिर पं. रजनीश शर्मा कुंडली के साथ उसे और उपाय समझाते हैं।'
    ),
    community: t(
      'Tamil is one of Singapore’s official languages, and many families already know Nadi jothidam from home. Singapore is only 2½ hours ahead of India, so every slot falls in your daytime.',
      'तमिल सिंगापुर की आधिकारिक भाषाओं में से एक है, और कई परिवार नाड़ी ज्योतिष को पहले से जानते हैं। सिंगापुर भारत से सिर्फ़ 2½ घंटे आगे है, इसलिए हर स्लॉट आपके दिन में आता है।'
    ),
    customsNote: t('Yantras ship from Jaipur by international courier. Singapore GST on imports, if charged, is paid by the buyer.', 'यंत्र जयपुर से इंटरनेशनल कूरियर से भेजे जाते हैं। सिंगापुर में इम्पोर्ट पर GST लगे तो वह खरीदार देता है।'),
    faqs: [
      [t('Can the reading be in Tamil?', 'क्या रीडिंग तमिल में हो सकती है?'), t('Yes. The leaves are in old Tamil, and the Nadi reader can usually speak with you directly in Tamil. Pt. Rajneesh Sharma’s analysis and remedies are in English or Hindi.', 'हाँ। पट्टे पुरानी तमिल में होते हैं, और नाड़ी रीडर आपसे सीधे तमिल में बात कर सकते हैं। पं. रजनीश शर्मा का विश्लेषण और उपाय अंग्रेज़ी या हिंदी में होते हैं।')],
      [t('What time are the calls in Singapore?', 'सिंगापुर में कॉल किस समय होती है?'), t('Our slots are 10 am to 6 pm India time — 12:30 pm to 8:30 pm in Singapore.', 'हमारे स्लॉट भारत के समय से सुबह 10 से शाम 6 बजे तक हैं — सिंगापुर में दोपहर 12:30 से रात 8:30।')],
      COMMON_FAQ.noTime,
    ],
    seoTitle: 'Nadi Astrology in Singapore — Online Nadi Jothidam',
    metaDescription: 'Online Nadi jothidam for Singapore — thumb impression, palm-leaf reading in Tamil or English, remedies by Pt. Rajneesh Sharma. Daytime slots.',
  },
  {
    name: 'Malaysia', nameHi: 'मलेशिया', code: 'MY', slug: 'malaysia', inName: 'Malaysia', status: 'active', order: 6,
    timezones: [{ label: 'Kuala Lumpur', tz: 'Asia/Kuala_Lumpur' }],
    cities: ['Kuala Lumpur', 'Petaling Jaya', 'Klang', 'Penang', 'Ipoh', 'Johor Bahru', 'Seremban'],
    intro: t(
      'Nadi palm-leaf reading for clients in Malaysia, by video call. Send your thumb impression online; the Nadi readers find your leaf and read it with you in Tamil or English, and Pt. Rajneesh Sharma adds Vedic/KP analysis and remedies.',
      'मलेशिया के क्लाइंट्स के लिए वीडियो कॉल पर नाड़ी ताड़-पत्र रीडिंग। अंगूठे का निशान ऑनलाइन भेजें; नाड़ी रीडर आपका पट्टा खोजकर तमिल या अंग्रेज़ी में आपके साथ पढ़ते हैं, और पं. रजनीश शर्मा वैदिक/केपी विश्लेषण और उपाय बताते हैं।'
    ),
    community: t(
      'Malaysia has one of the largest Tamil communities outside India and Sri Lanka, with temples and traditions that keep Nadi jothidam well known. Malaysia is 2½ hours ahead of India, so slots fall in your afternoon and evening.',
      'मलेशिया में भारत और श्रीलंका के बाहर सबसे बड़े तमिल समुदायों में से एक है, जहाँ मंदिर और परंपराएँ नाड़ी ज्योतिष को जीवित रखती हैं। मलेशिया भारत से 2½ घंटे आगे है, इसलिए स्लॉट आपकी दोपहर और शाम में आते हैं।'
    ),
    customsNote: t('Yantras ship from Jaipur by international courier. Malaysian import tax, if charged, is paid by the buyer.', 'यंत्र जयपुर से इंटरनेशनल कूरियर से भेजे जाते हैं। मलेशिया में इम्पोर्ट टैक्स लगे तो वह खरीदार देता है।'),
    faqs: [
      [t('Can the reading be in Tamil?', 'क्या रीडिंग तमिल में हो सकती है?'), t('Yes. The Nadi reader reads the old-Tamil leaf and can usually speak with you directly in Tamil; Pt. Rajneesh Sharma’s explanation and remedies are in English or Hindi.', 'हाँ। नाड़ी रीडर पुरानी तमिल का पट्टा पढ़ते हैं और आपसे सीधे तमिल में बात कर सकते हैं; पं. रजनीश शर्मा की व्याख्या और उपाय अंग्रेज़ी या हिंदी में होते हैं।')],
      [t('How do I pay from Malaysia?', 'मलेशिया से भुगतान कैसे करें?'), t('In US dollars through PayPal; your card converts from ringgit automatically.', 'US डॉलर में PayPal से; आपका कार्ड रिंगिट से अपने-आप बदल देता है।')],
      COMMON_FAQ.noTime,
    ],
    seoTitle: 'Nadi Astrology in Malaysia — Online Nadi Jothidam',
    metaDescription: 'Online Nadi jothidam for Kuala Lumpur, Penang and all of Malaysia — palm-leaf reading in Tamil or English, remedies by Pt. Rajneesh Sharma.',
  },
  {
    name: 'United Arab Emirates', nameHi: 'संयुक्त अरब अमीरात (UAE)', code: 'AE', slug: 'uae', inName: 'the UAE', status: 'active', order: 7,
    timezones: [{ label: 'Dubai', tz: 'Asia/Dubai' }],
    cities: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Al Ain'],
    intro: t(
      'Nadi palm-leaf reading for clients in Dubai, Abu Dhabi and across the UAE — online by video call, or in person at our Jaipur office when you are visiting India. Pt. Rajneesh Sharma explains your leaf alongside your birth chart and suggests remedies.',
      'दुबई, अबू धाबी और पूरे UAE के क्लाइंट्स के लिए नाड़ी ताड़-पत्र रीडिंग — वीडियो कॉल पर ऑनलाइन, या भारत आने पर हमारे जयपुर ऑफिस में। पं. रजनीश शर्मा कुंडली के साथ आपका पट्टा समझाते हैं और उपाय बताते हैं।'
    ),
    community: t(
      'The UAE has one of the largest Indian communities in the world. Dubai is just 1½ hours behind India, so slots fit easily into your working day — and the Jaipur office is a short flight away.',
      'UAE में दुनिया के सबसे बड़े भारतीय समुदायों में से एक है। दुबई भारत से सिर्फ़ 1½ घंटे पीछे है, इसलिए स्लॉट आपके दिन में आसानी से आ जाते हैं — और जयपुर ऑफिस छोटी-सी फ़्लाइट की दूरी पर है।'
    ),
    customsNote: t('Yantras ship from Jaipur by international courier. UAE customs duty or VAT, if charged, is paid by the buyer.', 'यंत्र जयपुर से इंटरनेशनल कूरियर से भेजे जाते हैं। UAE में कस्टम ड्यूटी या VAT लगे तो वह खरीदार देता है।'),
    faqs: [
      [t('Can I meet Pandit ji in person when I visit India?', 'भारत आने पर क्या पंडित जी से मिल सकते हैं?'), t('Yes. Many clients from the Gulf book an office visit in Jaipur during their trip home. Book the slot in advance so the leaf search can start before you arrive.', 'हाँ। खाड़ी देशों के कई क्लाइंट घर आने पर जयपुर ऑफिस विज़िट बुक करते हैं। स्लॉट पहले से बुक करें ताकि आपके आने से पहले पट्टा खोज शुरू हो सके।')],
      [t('What time are calls in Dubai?', 'दुबई में कॉल किस समय होती है?'), t('Our slots are 10 am to 6 pm India time — 8:30 am to 4:30 pm in Dubai.', 'हमारे स्लॉट भारत के समय से सुबह 10 से शाम 6 बजे तक हैं — दुबई में सुबह 8:30 से शाम 4:30।')],
      COMMON_FAQ.noTime,
      COMMON_FAQ.language,
    ],
    seoTitle: 'Nadi Astrology in Dubai & UAE — Online Palm Leaf Reading',
    metaDescription: 'Nadi palm-leaf reading for Dubai, Abu Dhabi and the UAE by video call, or at the Jaipur office. Remedies by Pt. Rajneesh Sharma. Daytime slots.',
  },
].map((c) => ({ ...c, faqs: c.faqs.map(([q, a]) => ({ q, a })) }));
