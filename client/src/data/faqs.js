// All FAQs in one place (Home shows 8; /faq shows all). Each Q and A is { en, hi }.
// Answers in [brackets] are waiting for Pandit ji's final wording.
const L = (en, hi) => ({ en, hi });

export const FAQ_GROUPS = [
  {
    title: L('Consultation', 'परामर्श'),
    items: [
      [L('How long is a consultation?', 'परामर्श कितनी देर का होता है?'), L('Vedic birth chart: 30 or 60 minutes. KP Prashna: 20–30 minutes. Kundli Matching: report + 20-minute call.', 'वैदिक कुंडली: 30 या 60 मिनट। केपी प्रश्न: 20–30 मिनट। कुंडली मिलान: रिपोर्ट + 20 मिनट कॉल।')],
      [L('What if I don’t know my birth time?', 'जन्म समय नहीं पता तो क्या करें?'), L('KP Prashna does not need a birth time.', 'केपी प्रश्न में जन्म समय की ज़रूरत नहीं होती।')],
      [L('How does an online consultation work?', 'ऑनलाइन परामर्श कैसे होता है?'), L('Over a Zoom or WhatsApp video call. Slots are shown in your own time zone, and you receive the call recording and a written summary.', 'Zoom या WhatsApp वीडियो कॉल पर। स्लॉट आपके टाइम ज़ोन में दिखते हैं, और कॉल की रिकॉर्डिंग व लिखित सारांश मिलता है।')],
      [L('Which languages do you speak?', 'किस भाषा में बात होती है?'), L('English and Hindi. Nadi readings are translated from Tamil.', 'हिंदी और अंग्रेज़ी। नाड़ी रीडिंग में तमिल से अनुवाद होता है।')],
      [L('How do I pay?', 'भुगतान कैसे करें?'), L('India: Razorpay (UPI, card, netbanking). International: PayPal (USD).', 'भारत: Razorpay (UPI, कार्ड, नेटबैंकिंग)। विदेश: PayPal (USD)।')],
      [L('Can I cancel or reschedule a booking?', 'क्या बुकिंग कैंसल या री-शेड्यूल कर सकते हैं?'), L('[Cancellation / reschedule policy]', '[कैंसलेशन / री-शेड्यूल नीति]')],
    ],
  },
  {
    title: L('Vedic astrology & birth chart', 'वैदिक ज्योतिष और कुंडली'),
    items: [
      [L('What details do I need for a birth chart reading?', 'कुंडली परामर्श के लिए क्या जानकारी चाहिए?'), L('Date of birth, exact time of birth and place of birth. The time from a birth certificate or hospital record is best.', 'जन्म तिथि, जन्म का सही समय और जन्म स्थान। जन्म प्रमाण-पत्र या अस्पताल के रिकॉर्ड वाला समय सबसे अच्छा है।')],
      [L('What is a dasha?', 'दशा क्या होती है?'), L('In the Vimshottari dasha system your life is divided into periods ruled by the nine planets. The running dasha shows which areas of life are active now and when events are likely.', 'विंशोत्तरी दशा पद्धति में जीवन को नौ ग्रहों की अवधियों में बाँटा जाता है। चल रही दशा बताती है कि अभी जीवन के कौन-से क्षेत्र सक्रिय हैं और घटनाएँ कब संभव हैं।')],
      [L('What is Shani Sade Sati?', 'शनि साढ़ेसाती क्या है?'), L('The roughly seven and a half years when Saturn moves through the sign before your Moon sign, the Moon sign and the sign after it. How hard it is depends on your own chart — it is not the same for everyone.', 'लगभग साढ़े सात साल की वह अवधि जब शनि आपकी चंद्र राशि से पहली, चंद्र राशि और उसके बाद की राशि से गुज़रते हैं। यह कितनी कठिन होगी, यह आपकी अपनी कुंडली पर निर्भर है — सबके लिए एक जैसी नहीं।')],
      [L('Do I have to wear a gemstone?', 'क्या रत्न पहनना ज़रूरी है?'), L('No. A gemstone is suggested only when it clearly suits your chart. Mantra, daan, fasting or a yantra are simpler remedies with no risk.', 'नहीं। रत्न तभी सुझाया जाता है जब वह कुंडली के अनुसार साफ़ तौर पर उचित हो। मंत्र, दान, व्रत या यंत्र बिना जोखिम के सरल उपाय हैं।')],
    ],
  },
  {
    title: L('KP Prashna', 'केपी प्रश्न'),
    items: [
      [L('What is KP Prashna?', 'केपी प्रश्न क्या है?'), L('Horary astrology in the Krishnamurti Paddhati system. You choose a number from 1 to 249 while thinking of one question, and a chart cast from that number and the moment gives a yes/no answer with timing.', 'कृष्णमूर्ति पद्धति का प्रश्न ज्योतिष। आप एक प्रश्न मन में रखकर 1 से 249 के बीच नंबर चुनते हैं, और उस नंबर व पल से बनी कुंडली समय के साथ हाँ/ना उत्तर देती है।')],
      [L('Which questions suit KP Prashna?', 'केपी प्रश्न किन सवालों के लिए ठीक है?'), L('One clear question at a time: a job, promotion, visa, marriage proposal, property deal, court case or a lost item.', 'एक बार में एक साफ़ सवाल: नौकरी, प्रमोशन, वीज़ा, शादी का रिश्ता, प्रॉपर्टी का सौदा, कोर्ट केस या खोई वस्तु।')],
      [L('What is the difference between KP and Vedic astrology?', 'केपी और वैदिक ज्योतिष में क्या अंतर है?'), L('KP is built on Vedic astrology but adds the sub-lord, which makes it sharper for yes/no questions and timing. Vedic astrology is better for a full picture of life.', 'केपी वैदिक ज्योतिष पर ही आधारित है, लेकिन इसमें सब-लॉर्ड जुड़ता है, जिससे हाँ/ना और समय बताने में यह ज़्यादा सटीक होती है। जीवन की पूरी तस्वीर के लिए वैदिक ज्योतिष बेहतर है।')],
    ],
  },
  {
    title: L('Kundli matching', 'कुंडली मिलान'),
    items: [
      [L('How many gunas should match for marriage?', 'शादी के लिए कितने गुण मिलने चाहिए?'), L('Out of 36, 18 or more is traditionally acceptable, 24+ good and 28+ very good — but Manglik dosha, Nadi and Bhakoot dosha and the 7th house also decide the final advice.', '36 में से 18 या अधिक परंपरा से स्वीकार्य, 24+ अच्छे और 28+ बहुत अच्छे माने जाते हैं — लेकिन अंतिम सलाह मांगलिक दोष, नाड़ी व भकूट दोष और सप्तम भाव से भी तय होती है।')],
      [L('Can a Manglik marry a non-Manglik?', 'क्या मांगलिक की शादी गैर-मांगलिक से हो सकती है?'), L('Often, yes. In many charts Manglik dosha is cancelled by other factors. Where it is active, matching with another Manglik or remedies are considered.', 'अक्सर हाँ। कई कुंडलियों में दूसरे कारणों से मांगलिक दोष का परिहार हो जाता है। जहाँ सक्रिय हो, वहाँ दूसरे मांगलिक से मिलान या उपाय देखे जाते हैं।')],
      [L('What is Nadi dosha?', 'नाड़ी दोष क्या है?'), L('When both partners have the same Nadi (Aadi, Madhya or Antya), the Nadi koota scores 0 of 8. It has recognised exceptions, so it should be checked in the full charts.', 'जब दोनों की नाड़ी (आदि, मध्य या अंत्य) एक हो, तो नाड़ी कूट में 8 में से 0 गुण मिलते हैं। इसके मान्य अपवाद हैं, इसलिए इसे पूरी कुंडलियों में देखना चाहिए।')],
    ],
  },
  {
    title: L('Nadi', 'नाड़ी'),
    items: [
      [L('What is the Nadi reading process?', 'नाड़ी रीडिंग की प्रक्रिया क्या है?'), L('Send your thumb impression → Nadi readers search for your leaf (you answer yes/no) → the leaf is read → Pandit ji adds Vedic/KP analysis and remedies.', 'अंगूठे का निशान भेजें → नाड़ी रीडर पट्टा खोजते हैं (आप हाँ/ना कहते हैं) → पट्टा पढ़ा जाता है → पंडित जी वैदिक/केपी विश्लेषण और उपाय बताते हैं।')],
      [L('What if my leaf is not found?', 'नाड़ी पट्टा न मिले तो?'), L('[Refund policy]', '[रिफंड नीति]')],
      [L('Who reads the leaf, and what is Pandit ji’s role?', 'पट्टा कौन पढ़ता है और पंडित जी की भूमिका क्या है?'), L('Traditional Nadi readers read the leaf; Pandit ji interprets it alongside your birth chart and suggests remedies.', 'पट्टा पारंपरिक नाड़ी रीडर पढ़ते हैं; पंडित जी कुंडली के साथ विश्लेषण और उपाय बताते हैं।')],
      [L('Do I need my birth time for a Nadi reading?', 'क्या नाड़ी रीडिंग के लिए जन्म समय चाहिए?'), L('No. The leaf is found from the thumb impression alone — men give the right thumb, women the left.', 'नहीं। पट्टा सिर्फ़ अंगूठे के निशान से मिलता है — पुरुष दायाँ और महिलाएँ बायाँ अंगूठा देती हैं।')],
      [L('Can I get a Nadi reading from abroad?', 'क्या विदेश से नाड़ी रीडिंग हो सकती है?'), L('Yes. Upload a photo of your thumb impression, and join the reading on a video call with live translation into English or Hindi. You receive the recording.', 'हाँ। अंगूठे के निशान की फोटो अपलोड करें, और अंग्रेज़ी या हिंदी अनुवाद के साथ वीडियो कॉल पर रीडिंग में जुड़ें। रिकॉर्डिंग आपको मिलती है।')],
    ],
  },
  {
    title: L('Vastu', 'वास्तु'),
    items: [
      [L('Will I need to demolish anything?', 'क्या तोड़-फोड़ करनी पड़ेगी?'), L('Remedies without demolition come first; structural changes only if truly needed.', 'पहले बिना तोड़-फोड़ के उपाय दिए जाते हैं; बदलाव सिर्फ़ ज़रूरत पर।')],
      [L('How does online Vastu work?', 'ऑनलाइन वास्तु कैसे होता है?'), L('A report is prepared from your floor plan, North direction and family details, followed by a call.', 'फ्लोर प्लान, उत्तर दिशा और सदस्यों की जानकारी से रिपोर्ट बनती है, फिर कॉल।')],
      [L('Is a south-facing home bad?', 'क्या दक्षिणमुखी घर बुरा होता है?'), L('No. What matters is the pada of the south wall where the entrance sits, the layout and the family’s birth charts. Most doshas can be corrected without demolition.', 'नहीं। असली बात यह है कि मुख्य द्वार दक्षिण दीवार के किस पद में है, नक्शा कैसा है और परिवार की कुंडलियाँ क्या कहती हैं। ज़्यादातर दोष बिना तोड़-फोड़ ठीक हो जाते हैं।')],
      [L('Can Vastu be done for a rented home or a flat?', 'क्या किराए के घर या फ्लैट का वास्तु हो सकता है?'), L('Yes. The remedies then focus on how rooms are used, furniture placement, colours and yantras.', 'हाँ। तब उपाय कमरों के उपयोग, फर्नीचर की जगह, रंग और यंत्रों पर केंद्रित होते हैं।')],
    ],
  },
  {
    title: L('Yantra', 'यंत्र'),
    items: [
      [L('How long does a yantra take to arrive?', 'यंत्र कितने दिन में पहुँचेगा?'), L('India: [__] days · International: [__] days', 'भारत: [__] दिन · विदेश: [__] दिन')],
      [L('How do I know the yantra is genuine and energised?', 'कैसे पता चले कि यंत्र असली और प्राण-प्रतिष्ठित है?'), L('Every order comes with a video of the pran-pratishtha and a metal certificate.', 'हर ऑर्डर के साथ प्राण-प्रतिष्ठा का वीडियो और धातु का सर्टिफ़िकेट।')],
      [L('What if the yantra arrives broken or wrong?', 'टूटा या गलत यंत्र पहुँचे तो?'), L('Free replacement.', 'मुफ़्त रिप्लेसमेंट।')],
      [L('Who pays customs duty for international orders?', 'विदेश में कस्टम ड्यूटी कौन देगा?'), L('Customs duty is paid by the buyer.', 'कस्टम ड्यूटी खरीदार देगा।')],
      [L('How do I choose the right yantra?', 'सही यंत्र कैसे चुनें?'), L('Choose by purpose — wealth, business, planetary peace, protection, Vastu, education or marriage. For a dosha in your chart, ask first: there is free 10-minute advice on WhatsApp.', 'उद्देश्य से चुनें — धन, व्यापार, ग्रह शांति, रक्षा, वास्तु, शिक्षा या विवाह। कुंडली के किसी दोष के लिए पहले पूछ लें: WhatsApp पर 10 मिनट की मुफ़्त सलाह मिलती है।')],
    ],
  },
];

// Shown on Home (by group title, so adding groups above does not shift them).
const G = (en) => FAQ_GROUPS.find((g) => g.title.en === en).items;
export const HOME_FAQ = [
  G('Consultation')[0],
  G('Consultation')[1],
  G('Consultation')[2],
  G('Nadi')[0],
  G('Nadi')[1],
  G('Consultation')[4],
  G('Yantra')[0],
  G('Yantra')[1],
];
