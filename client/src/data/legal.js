// DRAFT policy pages built from the website brief — get them reviewed by a CA / lawyer before launch.
// [Brackets] = details still to be filled in. Each title / heading / text is { en, hi }.
const L = (en, hi) => ({ en, hi });

export const LEGAL = {
  'privacy-policy': {
    title: L('Privacy Policy', 'गोपनीयता नीति'),
    sections: [
      [L('Who we are', 'हम कौन हैं'), L('This website belongs to Pt. Rajneesh Sharma (Vedic, KP, Nadi & Vastu consultant, Jaipur). Address: Shyam Nagar Metro Station, opp. Pillar No. 118, New Sanganer Road, Sodala, Jaipur 302019, India.', 'यह वेबसाइट पं. रजनीश शर्मा (वैदिक, केपी, नाड़ी और वास्तु सलाहकार, जयपुर) की है। पता: श्याम नगर मेट्रो स्टेशन, पिलर नं. 118 के सामने, न्यू सांगानेर रोड, सोडाला, जयपुर 302019।')],
      [L('What data we collect', 'हम कौन-सी जानकारी लेते हैं'), L('Name, phone/WhatsApp, email and country; date, time and place of birth for consultations; thumb impression for Nadi readings; floor plan and family birth details for Vastu; delivery address for yantra orders.', 'नाम, फ़ोन/WhatsApp, ईमेल, देश; परामर्श के लिए जन्म तिथि, समय और स्थान; नाड़ी रीडिंग के लिए अंगूठे का निशान; वास्तु के लिए फ्लोर प्लान और परिवार की जन्म जानकारी; यंत्र ऑर्डर के लिए डिलीवरी पता।')],
      [L('Why we collect it', 'क्यों लेते हैं'), L('Only to deliver your consultation, report or order, and to contact you about your booking or order. We never sell your data.', 'सिर्फ़ आपका परामर्श, रिपोर्ट या ऑर्डर पूरा करने और बुकिंग/ऑर्डर के बारे में संपर्क करने के लिए। हम आपका डेटा कभी नहीं बेचते।')],
      [L('How long we keep it', 'कितने समय तक रखते हैं'), L('[Retention period — e.g. __ months after the consultation]. After that, the data is deleted.', '[अवधि — जैसे परामर्श के बाद __ महीने]। उसके बाद डेटा डिलीट कर दिया जाता है।')],
      [L('Where and how it is stored', 'कहाँ और कैसे रखते हैं'), L('Thumb impressions and floor plans are kept in secure storage with no public link. Only Pandit ji and the necessary team can access them.', 'अंगूठे का निशान और फ्लोर प्लान सुरक्षित स्टोरेज में रखे जाते हैं; इनका कोई पब्लिक लिंक नहीं होता। सिर्फ़ पंडित जी और ज़रूरी टीम इन्हें देख सकती है।')],
      [L('Who it is shared with', 'किसके साथ साझा होता है'), L('For Nadi readings, the thumb impression is shared only with the Nadi readers to find your leaf. Payments are processed by Razorpay / PayPal; we do not store card details. Your address is shared with the courier partner for shipping.', 'नाड़ी रीडिंग के लिए अंगूठे का निशान सिर्फ़ पट्टा खोजने के लिए नाड़ी रीडर्स के साथ। भुगतान Razorpay / PayPal से होता है; कार्ड की जानकारी हम नहीं रखते। शिपिंग के लिए पता कूरियर पार्टनर के साथ।')],
      [L('Your rights', 'आपके अधिकार'), L('You can write to us at any time to view, correct or delete your data. You may also withdraw your consent.', 'आप कभी भी अपना डेटा देखने, सुधारने या डिलीट करवाने के लिए लिख सकते हैं। सहमति वापस लेना भी आपका अधिकार है।')],
      [L('Grievance contact (DPDP Act)', 'शिकायत संपर्क (DPDP एक्ट)'), L('Name: [Name] · Email: [EMAIL]. We will respond within [__] days.', 'नाम: [नाम] · ईमेल: [EMAIL]। हम [__] दिन में जवाब देंगे।')],
      [L('Cookies and analytics', 'कुकीज़ और एनालिटिक्स'), L('We may use tools such as Google Analytics to improve the website.', 'वेबसाइट को बेहतर बनाने के लिए Google Analytics जैसे टूल इस्तेमाल हो सकते हैं।')],
    ],
  },
  terms: {
    title: L('Terms of Service', 'नियम और शर्तें'),
    sections: [
      [L('Nature of the service', 'सेवा का स्वरूप'), L('Astrology and Vastu are offered as guidance. They are not a substitute for medical, legal or financial advice. Outcomes depend on the individual and their circumstances.', 'ज्योतिष और वास्तु मार्गदर्शन के लिए हैं। यह चिकित्सीय, कानूनी या वित्तीय सलाह का विकल्प नहीं हैं। परिणाम व्यक्ति और परिस्थिति पर निर्भर करते हैं।')],
      [L('No guarantees', 'कोई गारंटी नहीं'), L('We speak to our experience and our traditional process — we do not guarantee any outcome.', 'हम अनुभव और शास्त्र-आधारित प्रक्रिया की बात करते हैं, किसी परिणाम की गारंटी नहीं।')],
      [L('Nadi reading', 'नाड़ी रीडिंग'), L('Traditional Nadi readers search for and read the leaf; Pt. Rajneesh Sharma interprets it alongside your birth chart (Vedic/KP) and suggests remedies. A leaf is not found for every person.', 'पट्टा पारंपरिक नाड़ी रीडर खोजते और पढ़ते हैं; पं. रजनीश शर्मा कुंडली के साथ वैदिक/केपी विश्लेषण और उपाय बताते हैं। हर व्यक्ति का पट्टा मिलना ज़रूरी नहीं।')],
      [L('Booking and payment', 'बुकिंग और भुगतान'), L('India: Razorpay (UPI, card, netbanking). International: PayPal (USD). A booking is confirmed once payment is received.', 'भारत: Razorpay (UPI, कार्ड, नेटबैंकिंग)। विदेश: PayPal (USD)। भुगतान के बाद बुकिंग कन्फ़र्म होती है।')],
      [L('Testimonials', 'प्रशंसापत्र'), L('Client videos and names appear on the website only with their written permission (WhatsApp is fine).', 'वेबसाइट पर क्लाइंट का वीडियो/नाम सिर्फ़ उनकी लिखित (WhatsApp भी चलेगा) अनुमति के बाद।')],
      [L('Changes', 'बदलाव'), L('These terms may be updated from time to time. [Last updated: date]', 'ये शर्तें समय-समय पर अपडेट हो सकती हैं। [अंतिम अपडेट: तारीख]')],
    ],
  },
  'refund-policy': {
    title: L('Refund & Cancellation Policy', 'रिफंड और कैंसलेशन नीति'),
    sections: [
      [L('Cancelling / rescheduling a consultation', 'परामर्श कैंसल / री-शेड्यूल'), L('[How many hours in advance, how much refund, rescheduling terms]', '[कितने घंटे पहले कैंसल करने पर कितना रिफंड; री-शेड्यूल की शर्तें]')],
      [L('Nadi — if the leaf is not found', 'नाड़ी — पट्टा न मिले तो'), L('[Refund policy, agreed with the Nadi readers — e.g. “No leaf, no payment”]', '[रिफंड नीति, नाड़ी रीडर्स से तय करके — जैसे “पट्टा नहीं, भुगतान नहीं”]')],
      [L('Yantra — genuine metal', 'यंत्र — असली धातु'), L('Pure copper / ashtadhatu, exactly the size stated — or your money back in full.', 'शुद्ध तांबा / अष्टधातु, साइज़ जैसा लिखा है वैसा — नहीं तो पूरा पैसा वापस।')],
      [L('Yantra — broken or wrong item', 'यंत्र — टूटा या गलत'), L('If a yantra arrives broken or wrong, we replace it free. Please send an unboxing video / photo within [__] days.', 'टूटा या गलत यंत्र पहुँचे तो मुफ़्त रिप्लेसमेंट। अनबॉक्सिंग वीडियो / फोटो [__] दिन के अंदर भेजें।')],
      [L('How refunds are paid', 'रिफंड कैसे मिलेगा'), L('To the original payment method (Razorpay / PayPal) within [__] working days.', 'उसी भुगतान माध्यम में (Razorpay / PayPal), [__] कार्य-दिवस में।')],
      [L('Other returns', 'अन्य रिटर्न'), L('[Other conditions]', '[बाकी शर्तें]')],
    ],
  },
  'shipping-policy': {
    title: L('Shipping Policy', 'शिपिंग नीति'),
    sections: [
      [L('Dispatch', 'डिस्पैच'), L('Each yantra is dispatched within [__] days after its pran-pratishtha.', 'प्राण-प्रतिष्ठा के बाद यंत्र [__] दिन में डिस्पैच होता है।')],
      [L('India', 'भारत'), L('Shipped via Shiprocket (multiple couriers). Delivery: [__] days. Cash on delivery: [yes/no].', 'Shiprocket से कई कूरियर। डिलीवरी: [__] दिन। कैश ऑन डिलीवरी: [हाँ/नहीं]।')],
      [L('International', 'विदेश'), L('India Post / DHL / FedEx. Delivery: [__] days. Customs duty is paid by the buyer.', 'India Post / DHL / FedEx। डिलीवरी: [__] दिन। कस्टम ड्यूटी खरीदार देगा।')],
      [L('Free shipping', 'फ़्री शिपिंग'), L('Free shipping in India on orders above [₹___].', '[₹___] से ऊपर के ऑर्डर पर भारत में फ़्री शिपिंग।')],
      [L('Tracking', 'ट्रैकिंग'), L('You receive a tracking link on WhatsApp and email as soon as your order is dispatched.', 'डिस्पैच होते ही ट्रैकिंग लिंक WhatsApp और ईमेल पर।')],
      [L('In the box', 'बॉक्स में'), L('Yantra, installation guide (PDF), mantra card, certificate.', 'यंत्र, स्थापना विधि PDF, मंत्र कार्ड, सर्टिफ़िकेट।')],
    ],
  },
};
