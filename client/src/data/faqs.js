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
    title: L('Nadi', 'नाड़ी'),
    items: [
      [L('What is the Nadi reading process?', 'नाड़ी रीडिंग की प्रक्रिया क्या है?'), L('Send your thumb impression → Nadi readers search for your leaf (you answer yes/no) → the leaf is read → Pandit ji adds Vedic/KP analysis and remedies.', 'अंगूठे का निशान भेजें → नाड़ी रीडर पट्टा खोजते हैं (आप हाँ/ना कहते हैं) → पट्टा पढ़ा जाता है → पंडित जी वैदिक/केपी विश्लेषण और उपाय बताते हैं।')],
      [L('What if my leaf is not found?', 'नाड़ी पट्टा न मिले तो?'), L('[Refund policy]', '[रिफंड नीति]')],
      [L('Who reads the leaf, and what is Pandit ji’s role?', 'पट्टा कौन पढ़ता है और पंडित जी की भूमिका क्या है?'), L('Traditional Nadi readers read the leaf; Pandit ji interprets it alongside your birth chart and suggests remedies.', 'पट्टा पारंपरिक नाड़ी रीडर पढ़ते हैं; पंडित जी कुंडली के साथ विश्लेषण और उपाय बताते हैं।')],
    ],
  },
  {
    title: L('Vastu', 'वास्तु'),
    items: [
      [L('Will I need to demolish anything?', 'क्या तोड़-फोड़ करनी पड़ेगी?'), L('Remedies without demolition come first; structural changes only if truly needed.', 'पहले बिना तोड़-फोड़ के उपाय दिए जाते हैं; बदलाव सिर्फ़ ज़रूरत पर।')],
      [L('How does online Vastu work?', 'ऑनलाइन वास्तु कैसे होता है?'), L('A report is prepared from your floor plan, North direction and family details, followed by a call.', 'फ्लोर प्लान, उत्तर दिशा और सदस्यों की जानकारी से रिपोर्ट बनती है, फिर कॉल।')],
    ],
  },
  {
    title: L('Yantra', 'यंत्र'),
    items: [
      [L('How long does a yantra take to arrive?', 'यंत्र कितने दिन में पहुँचेगा?'), L('India: [__] days · International: [__] days', 'भारत: [__] दिन · विदेश: [__] दिन')],
      [L('How do I know the yantra is genuine and energised?', 'कैसे पता चले कि यंत्र असली और प्राण-प्रतिष्ठित है?'), L('Every order comes with a video of the pran-pratishtha and a metal certificate.', 'हर ऑर्डर के साथ प्राण-प्रतिष्ठा का वीडियो और धातु का सर्टिफ़िकेट।')],
      [L('What if the yantra arrives broken or wrong?', 'टूटा या गलत यंत्र पहुँचे तो?'), L('Free replacement.', 'मुफ़्त रिप्लेसमेंट।')],
      [L('Who pays customs duty for international orders?', 'विदेश में कस्टम ड्यूटी कौन देगा?'), L('Customs duty is paid by the buyer.', 'कस्टम ड्यूटी खरीदार देगा।')],
    ],
  },
];

export const HOME_FAQ = [
  FAQ_GROUPS[0].items[0],
  FAQ_GROUPS[0].items[1],
  FAQ_GROUPS[0].items[2],
  FAQ_GROUPS[1].items[0],
  FAQ_GROUPS[1].items[1],
  FAQ_GROUPS[0].items[4],
  FAQ_GROUPS[3].items[0],
  FAQ_GROUPS[3].items[1],
];
