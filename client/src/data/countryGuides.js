// A short practical guide for each country page — written for that country only (its time zone,
// weekend, local temples), so the country pages are not copies of each other.
// Slot hours are 10:00–18:00 India time (IST).
const L = (en, hi) => ({ en, hi });

export const COUNTRY_GUIDES = {
  usa: {
    when: L('On the West Coast the first slots fall around 8:30–11:30 pm, which suits a Friday or Saturday evening. On the East Coast the last slots of the Indian day fall at about 6:30–7:30 am, before work.', 'वेस्ट कोस्ट पर पहले स्लॉट रात लगभग 8:30–11:30 बजे पड़ते हैं — शुक्रवार या शनिवार की शाम ठीक रहती है। ईस्ट कोस्ट पर भारत के दिन के आख़िरी स्लॉट सुबह लगभग 6:30–7:30 बजे, काम से पहले पड़ते हैं।'),
    prep: L('Ink pads are sold at any pharmacy or office store. Keep your parents’ and spouse’s names handy, because the reader confirms the leaf with them, and invite family in India to join the same video call.', 'इंक पैड किसी भी फ़ार्मेसी या ऑफिस स्टोर पर मिल जाता है। माता-पिता और जीवनसाथी के नाम पास रखें, क्योंकि रीडर इन्हीं से पट्टे की पुष्टि करते हैं, और भारत में परिवार को उसी वीडियो कॉल में जोड़ लें।'),
    remedies: L('Most remedies — mantra, fasting, charity — can be done at home. Temple visits suggested in the Shanti kandam can usually be done at a Hindu temple in your city; a pooja in India can be arranged when you visit.', 'ज़्यादातर उपाय — मंत्र, व्रत, दान — घर पर हो जाते हैं। शांति कांडम में बताए मंदिर दर्शन आमतौर पर आपके शहर के किसी हिंदू मंदिर में हो सकते हैं; भारत आने पर पूजा करवाई जा सकती है।'),
  },
  uk: {
    when: L('Slots run from early morning to lunchtime in the UK — roughly 4:30 am to 12:30 pm in winter and an hour later in summer. A Saturday morning slot is the easiest for most working clients.', 'UK में स्लॉट सुबह से दोपहर तक पड़ते हैं — सर्दियों में लगभग सुबह 4:30 से दोपहर 12:30, गर्मियों में एक घंटा बाद। ज़्यादातर नौकरीपेशा क्लाइंट्स के लिए शनिवार सुबह का स्लॉट सबसे आसान है।'),
    prep: L('Take the thumb print on plain white paper in daylight by a window; a phone photo is enough. If your parents live in India, they can join the call to help answer the reader’s questions.', 'खिड़की के पास दिन की रोशनी में सादे सफ़ेद कागज़ पर अंगूठे का निशान लें; फ़ोन की फ़ोटो काफ़ी है। माता-पिता भारत में हों तो वे कॉल में जुड़कर रीडर के सवालों के जवाब में मदद कर सकते हैं।'),
    remedies: L('The UK has many Hindu temples, including large ones in London, Leicester and Birmingham, so temple remedies from the leaf can usually be done close to home.', 'UK में कई हिंदू मंदिर हैं, लंदन, लेस्टर और बर्मिंघम में बड़े मंदिरों सहित, इसलिए पट्टे में बताए मंदिर वाले उपाय आमतौर पर घर के पास हो जाते हैं।'),
  },
  canada: {
    when: L('From Toronto, the last slots of the Indian day fall at about 6:30–7:30 am Eastern time. From Vancouver, the first slots fall in the evening, around 8:30–11:30 pm Pacific time.', 'टोरंटो से भारत के दिन के आख़िरी स्लॉट ईस्टर्न समय में सुबह लगभग 6:30–7:30 बजे पड़ते हैं। वैंकूवर से पहले स्लॉट शाम को, पैसिफ़िक समय में लगभग रात 8:30–11:30 बजे पड़ते हैं।'),
    prep: L('Families in the Greater Toronto Area often prefer the reading in Tamil — mention it when you book. Keep the names of parents and siblings ready for the leaf search.', 'ग्रेटर टोरंटो क्षेत्र के परिवार अक्सर तमिल में रीडिंग चाहते हैं — बुकिंग के समय बता दें। पट्टे की खोज के लिए माता-पिता और भाई-बहनों के नाम तैयार रखें।'),
    remedies: L('Toronto, Brampton and Vancouver have well-established Hindu and Tamil temples, so remedies that involve a temple visit or abhishekam can usually be done locally.', 'टोरंटो, ब्रैम्पटन और वैंकूवर में पुराने हिंदू और तमिल मंदिर हैं, इसलिए मंदिर दर्शन या अभिषेक वाले उपाय आमतौर पर वहीं हो जाते हैं।'),
  },
  australia: {
    when: L('Australia is ahead of India, so our slots fall in your afternoon and evening — about 3:30–11:30 pm in Sydney and Melbourne during daylight saving, and 12:30–8:30 pm in Perth. After-work slots are easy to find.', 'ऑस्ट्रेलिया भारत से आगे है, इसलिए हमारे स्लॉट आपकी दोपहर और शाम में पड़ते हैं — डेलाइट सेविंग में सिडनी और मेलबर्न में लगभग 3:30–11:30 बजे, और पर्थ में 12:30–8:30 बजे। काम के बाद के स्लॉट आसानी से मिल जाते हैं।'),
    prep: L('Officeworks and Kmart sell ink pads. Upload the thumb photo a few days before your slot so the leaf search can begin in time.', 'Officeworks और Kmart पर इंक पैड मिलते हैं। स्लॉट से कुछ दिन पहले अंगूठे की फ़ोटो अपलोड करें, ताकि पट्टे की खोज समय पर शुरू हो सके।'),
    remedies: L('Sydney, Melbourne, Brisbane and Perth all have Hindu temples where remedies from the leaf can be done. Because of biosecurity rules, yantras are sent without flowers, seeds or other organic items.', 'सिडनी, मेलबर्न, ब्रिस्बेन और पर्थ — सब जगह हिंदू मंदिर हैं जहाँ पट्टे के उपाय हो सकते हैं। बायोसिक्योरिटी नियमों के कारण यंत्र बिना फूल, बीज या दूसरी जैविक चीज़ों के भेजे जाते हैं।'),
  },
  singapore: {
    when: L('Singapore is 2½ hours ahead of India, so every slot falls between 12:30 and 8:30 pm — a lunch-hour or early-evening slot fits a working day.', 'सिंगापुर भारत से 2½ घंटे आगे है, इसलिए हर स्लॉट दोपहर 12:30 से रात 8:30 के बीच पड़ता है — लंच या शाम का स्लॉट काम के दिन में आसानी से आ जाता है।'),
    prep: L('Many Singapore families know Nadi jothidam well and prefer to hear the leaf in Tamil — say so when you book, and Pandit ji’s analysis follows in English or Hindi.', 'सिंगापुर के कई परिवार नाड़ी ज्योतिष को अच्छी तरह जानते हैं और पट्टा तमिल में सुनना चाहते हैं — बुकिंग में बता दें; पंडित जी का विश्लेषण अंग्रेज़ी या हिंदी में होता है।'),
    remedies: L('Temple remedies can be done at Singapore’s long-established Hindu temples, such as those around Serangoon Road in Little India.', 'मंदिर वाले उपाय सिंगापुर के पुराने हिंदू मंदिरों में हो सकते हैं, जैसे लिटिल इंडिया में सेरंगून रोड के आसपास के मंदिर।'),
  },
  malaysia: {
    when: L('Malaysia is 2½ hours ahead of India, so slots fall between 12:30 and 8:30 pm Malaysian time — easy to fit after office hours on a weekday.', 'मलेशिया भारत से 2½ घंटे आगे है, इसलिए स्लॉट मलेशिया के समय से दोपहर 12:30 से रात 8:30 के बीच पड़ते हैं — काम के दिन ऑफिस के बाद आसानी से।'),
    prep: L('Most Malaysian clients take the reading in Tamil. Keep the names of your parents and siblings ready; the reader confirms the leaf with them before reading the kandams.', 'मलेशिया के ज़्यादातर क्लाइंट रीडिंग तमिल में लेते हैं। माता-पिता और भाई-बहनों के नाम तैयार रखें; कांडम पढ़ने से पहले रीडर इन्हीं से पट्टे की पुष्टि करते हैं।'),
    remedies: L('With temples in every Indian neighbourhood — and Murugan worship at places like Batu Caves — temple remedies from the Shanti kandam are easy to carry out in Malaysia.', 'हर भारतीय इलाक़े में मंदिर हैं — और बातू गुफ़ाओं जैसी जगहों पर मुरुगन पूजा — इसलिए शांति कांडम के मंदिर वाले उपाय मलेशिया में आसानी से हो जाते हैं।'),
  },
  uae: {
    when: L('The UAE is 1½ hours behind India, so slots run from 8:30 am to 4:30 pm in Dubai and Abu Dhabi — a weekend morning slot is the most relaxed.', 'UAE भारत से 1½ घंटे पीछे है, इसलिए दुबई और अबू धाबी में स्लॉट सुबह 8:30 से शाम 4:30 तक हैं — वीकेंड की सुबह का स्लॉट सबसे आराम का है।'),
    prep: L('The call runs on Zoom, which works in the UAE. Many Gulf clients also book an office visit in Jaipur during their trip home — upload the thumb print before you travel.', 'कॉल Zoom पर होती है, जो UAE में चलता है। खाड़ी के कई क्लाइंट घर आने पर जयपुर ऑफिस विज़िट भी बुक करते हैं — यात्रा से पहले अंगूठे का निशान अपलोड कर दें।'),
    remedies: L('With Hindu temples now open in Dubai and Abu Dhabi, remedies that involve a temple visit can be done locally; mantra and charity remedies can be done anywhere.', 'अब दुबई और अबू धाबी में हिंदू मंदिर खुल गए हैं, इसलिए मंदिर दर्शन वाले उपाय वहीं हो सकते हैं; मंत्र और दान वाले उपाय कहीं भी हो जाते हैं।'),
  },
  'new-zealand': {
    when: L('New Zealand is far ahead of India: the first slots of the Indian morning fall around 5:30–7:30 pm in Auckland during summer time, so book an early slot for an evening call.', 'न्यूज़ीलैंड भारत से काफ़ी आगे है: गर्मियों के समय में भारत की सुबह के पहले स्लॉट ऑकलैंड में शाम लगभग 5:30–7:30 बजे पड़ते हैं, इसलिए शाम की कॉल के लिए सुबह का स्लॉट बुक करें।'),
    prep: L('Fiji Indian and South Indian families often have relatives in India or Fiji who can join the call — useful when the reader asks about parents and grandparents.', 'फ़िजी-भारतीय और दक्षिण भारतीय परिवारों के रिश्तेदार अक्सर भारत या फ़िजी में होते हैं जो कॉल में जुड़ सकते हैं — यह तब काम आता है जब रीडर माता-पिता और दादा-दादी के बारे में पूछते हैं।'),
    remedies: L('Auckland and Wellington have Hindu temples for temple remedies. New Zealand’s biosecurity rules are strict, so yantras are sent as metal and printed material only.', 'ऑकलैंड और वेलिंगटन में मंदिर वाले उपायों के लिए हिंदू मंदिर हैं। न्यूज़ीलैंड के बायोसिक्योरिटी नियम सख़्त हैं, इसलिए यंत्र सिर्फ़ धातु और छपी सामग्री के रूप में भेजे जाते हैं।'),
  },
  qatar: {
    when: L('Qatar is 2½ hours behind India, so slots run from 7:30 am to 3:30 pm in Doha. With the weekend on Friday and Saturday, a Friday or Saturday morning slot suits most families.', 'क़तर भारत से 2½ घंटे पीछे है, इसलिए दोहा में स्लॉट सुबह 7:30 से दोपहर 3:30 तक हैं। वीकेंड शुक्रवार-शनिवार होने से ज़्यादातर परिवारों को शुक्रवार या शनिवार सुबह का स्लॉट ठीक रहता है।'),
    prep: L('Use Zoom for the call. Many Doha clients are from Kerala and Tamil Nadu and prefer the leaf read in Tamil or with Malayalam-speaking family on the call — mention it when you book.', 'कॉल के लिए Zoom इस्तेमाल करें। दोहा के कई क्लाइंट केरल और तमिलनाडु से हैं और पट्टा तमिल में सुनना या मलयालम बोलने वाले परिवार को कॉल में रखना पसंद करते हैं — बुकिंग में बता दें।'),
    remedies: L('Remedies are chosen so they can be done privately at home in Qatar — mantra, fasting and charity — and any temple pooja can be done on your next visit to India.', 'उपाय ऐसे चुने जाते हैं जो क़तर में घर पर निजी तौर पर हो सकें — मंत्र, व्रत और दान — और मंदिर की कोई पूजा अगली भारत यात्रा में करवाई जा सकती है।'),
  },
  kuwait: {
    when: L('Kuwait is 2½ hours behind India, so slots run from 7:30 am to 3:30 pm. A Friday or Saturday morning slot fits the Kuwaiti weekend.', 'कुवैत भारत से 2½ घंटे पीछे है, इसलिए स्लॉट सुबह 7:30 से दोपहर 3:30 तक हैं। कुवैत के वीकेंड में शुक्रवार या शनिवार सुबह का स्लॉट ठीक रहता है।'),
    prep: L('Use Zoom for the call and a quiet room. Keep your passport-style details handy — full name, parents’ names and place of birth — as the reader matches them against the leaf.', 'कॉल के लिए Zoom और एक शांत कमरा रखें। पूरा नाम, माता-पिता के नाम और जन्मस्थान जैसी जानकारी पास रखें, क्योंकि रीडर इन्हें पट्टे से मिलाते हैं।'),
    remedies: L('Remedies are kept to what can be done at home in Kuwait — mantra, fasting, charity and a yantra in the prayer corner — with any temple pooja left for your trip to India.', 'उपाय वही रखे जाते हैं जो कुवैत में घर पर हो सकें — मंत्र, व्रत, दान और पूजा के कोने में यंत्र — मंदिर की पूजा भारत यात्रा के लिए रखी जाती है।'),
  },
  oman: {
    when: L('Oman is just 1½ hours behind India, so slots run from 8:30 am to 4:30 pm in Muscat — a weekend morning or a weekday afternoon both work.', 'ओमान भारत से सिर्फ़ 1½ घंटे पीछे है, इसलिए मस्कट में स्लॉट सुबह 8:30 से शाम 4:30 तक हैं — वीकेंड की सुबह या काम के दिन की दोपहर, दोनों ठीक हैं।'),
    prep: L('Use Zoom for the call. If you are travelling home soon, book an office visit in Jaipur instead and upload the thumb print in advance.', 'कॉल के लिए Zoom इस्तेमाल करें। जल्द घर आ रहे हों, तो जयपुर ऑफिस विज़िट बुक करें और अंगूठे का निशान पहले से अपलोड कर दें।'),
    remedies: L('Muscat has long-standing Hindu temples serving the Indian community, so temple remedies can often be done locally, alongside mantra and charity at home.', 'मस्कट में भारतीय समुदाय के लिए पुराने हिंदू मंदिर हैं, इसलिए मंदिर वाले उपाय अक्सर वहीं हो जाते हैं, साथ में घर पर मंत्र और दान।'),
  },
  germany: {
    when: L('Germany is 3½–4½ hours behind India, so slots run from early morning to early afternoon. The 13:00–18:00 India-time slots — 8:30 am to 1:30 pm in winter — are the most comfortable.', 'जर्मनी भारत से 3½–4½ घंटे पीछे है, इसलिए स्लॉट सुबह से दोपहर तक पड़ते हैं। भारत के समय से 13:00–18:00 के स्लॉट — सर्दियों में सुबह 8:30 से दोपहर 1:30 — सबसे आरामदायक हैं।'),
    prep: L('A stamp pad from any stationery shop or drugstore works for the thumb print. The reading is translated into English or Hindi; Tamil-speaking families can hear it in Tamil.', 'अंगूठे के निशान के लिए किसी भी स्टेशनरी या ड्रगस्टोर का स्टैम्प पैड चल जाता है। रीडिंग अंग्रेज़ी या हिंदी में अनुवाद होती है; तमिल बोलने वाले परिवार तमिल में सुन सकते हैं।'),
    remedies: L('Germany has Tamil Hindu temples, including well-known ones in North Rhine-Westphalia, so temple remedies from the leaf can be done there. Yantras pay EU import VAT on arrival.', 'जर्मनी में तमिल हिंदू मंदिर हैं, नॉर्थ राइन-वेस्टफ़ेलिया के जाने-माने मंदिरों सहित, इसलिए पट्टे के मंदिर वाले उपाय वहाँ हो सकते हैं। यंत्र पर पहुँचने पर EU इम्पोर्ट VAT लगता है।'),
  },
  mauritius: {
    when: L('Mauritius is 1½ hours behind India, so every slot falls between 8:30 am and 4:30 pm — easy to book on any day.', 'मॉरीशस भारत से 1½ घंटे पीछे है, इसलिए हर स्लॉट सुबह 8:30 से शाम 4:30 के बीच पड़ता है — किसी भी दिन आसानी से बुक हो जाता है।'),
    prep: L('Tamil families often prefer the leaf in Tamil, and Bhojpuri- and Hindi-speaking families can hear the translation in Hindi. Keep the names of parents and grandparents ready.', 'तमिल परिवार अक्सर पट्टा तमिल में सुनना पसंद करते हैं, और भोजपुरी व हिंदी बोलने वाले परिवार अनुवाद हिंदी में सुन सकते हैं। माता-पिता और दादा-दादी के नाम तैयार रखें।'),
    remedies: L('With temples and kovils across the island and pilgrimages such as Grand Bassin (Ganga Talao) for Mahashivratri, temple and Shiva remedies from the leaf fit naturally into life in Mauritius.', 'पूरे द्वीप में मंदिर और कोविल हैं, और महाशिवरात्रि पर ग्रैंड बेसिन (गंगा तालाब) जैसी तीर्थयात्राएँ होती हैं — इसलिए पट्टे के मंदिर और शिव उपाय मॉरीशस के जीवन में स्वाभाविक रूप से हो जाते हैं।'),
  },
};
