// Written content for the 15 yantra pages (English + Hindi), keyed by slug.
// Sent with GET /api/yantras/:slug as `content`. A value filled in from /admin/yantras
// (description, deity, purpose, care, sthapana) is shown instead of the text here.
// Traditional information only — no promises of results.

const t = (en, hi) => ({ en, hi });

const SHUDDHI = t(
  'Wash the yantra with Ganga jal, or raw milk mixed with water, wipe it dry and place it on a clean red cloth.',
  'यंत्र को गंगाजल, या पानी मिले कच्चे दूध से धोएँ, सुखाकर पोंछें और साफ़ लाल कपड़े पर रखें।'
);
const SHUDDHI_YELLOW = t(
  'Wash the yantra with Ganga jal, wipe it dry and place it on a clean yellow cloth.',
  'यंत्र को गंगाजल से धोएँ, सुखाकर पोंछें और साफ़ पीले कपड़े पर रखें।'
);
const daily = (n) => t(
  `Light a ghee diya or incense and recite the mantra ${n} times, ideally in the morning after bathing.`,
  `घी का दीया या अगरबत्ती जलाएँ और मंत्र का ${n} बार जाप करें, संभव हो तो सुबह स्नान के बाद।`
);
const CARE = t(
  'Wipe with a soft dry cloth. Keep it in a clean place, never on the floor or near the toilet. Copper and brass darken with time and can be cleaned with a little lemon water.',
  'मुलायम सूखे कपड़े से पोंछें। साफ़ जगह पर रखें, कभी ज़मीन पर या शौचालय के पास नहीं। ताँबा और पीतल समय के साथ काले पड़ते हैं, इन्हें थोड़े नींबू पानी से साफ़ कर सकते हैं।'
);

// Hindi names (same as client/src/data/yantraI18n.js), for the /hi page titles.
export const yantraNameHi = {
  'shree-yantra': 'श्री यंत्र',
  'meru-shree-yantra': 'मेरु श्री यंत्र',
  'kuber-yantra': 'कुबेर यंत्र',
  'mahalaxmi-yantra': 'महालक्ष्मी यंत्र',
  'vyapar-vriddhi-yantra': 'व्यापार वृद्धि यंत्र',
  'navgrah-yantra': 'नवग्रह यंत्र',
  'shani-yantra': 'शनि यंत्र',
  'mahamrityunjay-yantra': 'महामृत्युंजय यंत्र',
  'baglamukhi-yantra': 'बगलामुखी यंत्र',
  'kaal-sarp-yantra': 'काल सर्प यंत्र',
  'vastu-dosh-nivaran-yantra': 'वास्तु दोष निवारण यंत्र',
  'saraswati-yantra': 'सरस्वती यंत्र',
  'mangal-yantra': 'मंगल यंत्र',
  'hanuman-yantra': 'हनुमान यंत्र',
  'sarva-karya-siddhi-yantra': 'सर्व कार्य सिद्धि यंत्र',
};

export const yantraContent = {
  'shree-yantra': {
    description: t(
      'The Shree Yantra is the yantra of Goddess Lakshmi and Maa Tripura Sundari — nine interlocking triangles around a central bindu. It is traditionally kept in the home or business for prosperity, harmony and spiritual growth.',
      'श्री यंत्र माँ लक्ष्मी और माँ त्रिपुर सुंदरी का यंत्र है — केंद्र के बिंदु के चारों ओर नौ आपस में जुड़े त्रिकोण। परंपरा से इसे घर या व्यापार में समृद्धि, सुख-शांति और आध्यात्मिक उन्नति के लिए रखा जाता है।'
    ),
    about: t(
      'Called the “king of yantras” (Yantra Raj), the Shree Yantra is described in the Shakta tradition as the form of the Goddess herself. Its nine triangles — four pointing up for Shiva and five pointing down for Shakti — form 43 smaller triangles, surrounded by lotus petals and a square gate (bhupur). Many families keep it in the pooja room for steady wealth and peace at home; businesses keep it near the cash counter.',
      'श्री यंत्र को “यंत्रराज” कहा जाता है, और शाक्त परंपरा में इसे स्वयं देवी का स्वरूप माना गया है। इसके नौ त्रिकोण — शिव के चार ऊपर की ओर और शक्ति के पाँच नीचे की ओर — मिलकर 43 छोटे त्रिकोण बनाते हैं, जिनके चारों ओर कमल दल और चौकोर द्वार (भूपुर) होता है। कई परिवार इसे घर में स्थिर धन और शांति के लिए पूजा कक्ष में रखते हैं; व्यापारी इसे कैश काउंटर के पास रखते हैं।'
    ),
    deity: t('Goddess Lakshmi, Maa Tripura Sundari', 'माँ लक्ष्मी, माँ त्रिपुर सुंदरी'),
    purpose: t('Prosperity, steady income, harmony at home and spiritual practice.', 'समृद्धि, स्थिर आय, घर में सुख-शांति और साधना।'),
    sthapana: {
      day: t('Friday morning, or on Diwali, Dhanteras or Akshaya Tritiya.', 'शुक्रवार सुबह, या दीवाली, धनतेरस या अक्षय तृतीया पर।'),
      direction: t('In the pooja room in the north-east, or in the north; the yantra facing east or west.', 'पूजा कक्ष में उत्तर-पूर्व या उत्तर में; यंत्र का मुख पूर्व या पश्चिम की ओर।'),
      shuddhi: SHUDDHI,
      mantra: t('ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः', 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः'),
      daily: daily(11),
    },
    care: CARE,
    faqs: [
      [t('Can the Shree Yantra be kept at home and in the office?', 'क्या श्री यंत्र घर और ऑफिस दोनों में रख सकते हैं?'), t('Yes. At home it is kept in the pooja room; in a shop or office it is kept near the cash counter or on the owner’s desk, in the north or east.', 'हाँ। घर में इसे पूजा कक्ष में रखते हैं; दुकान या ऑफिस में कैश काउंटर के पास या मालिक की मेज़ पर, उत्तर या पूर्व में।')],
      [t('What is the difference between the Shree Yantra and the Meru Shree Yantra?', 'श्री यंत्र और मेरु श्री यंत्र में क्या अंतर है?'), t('The Shree Yantra is flat (engraved on a plate). The Meru Shree Yantra is the same design raised in three dimensions like a mountain, and is placed on a flat surface rather than hung.', 'श्री यंत्र समतल होता है (प्लेट पर उकेरा हुआ)। मेरु श्री यंत्र वही आकृति पर्वत की तरह त्रि-आयामी रूप में होता है, और इसे टाँगने की बजाय समतल जगह पर रखा जाता है।')],
    ],
  },

  'meru-shree-yantra': {
    description: t(
      'The Meru Shree Yantra is the Shree Yantra in three-dimensional form, rising like Mount Meru. It is linked with Goddess Lakshmi and Maa Tripura Sundari and is traditionally placed in the pooja room for prosperity and peace.',
      'मेरु श्री यंत्र, श्री यंत्र का त्रि-आयामी रूप है, जो मेरु पर्वत की तरह उठा होता है। यह माँ लक्ष्मी और माँ त्रिपुर सुंदरी से जुड़ा है और परंपरा से समृद्धि और शांति के लिए पूजा कक्ष में रखा जाता है।'
    ),
    about: t(
      'In the Meru form each layer of the Shree Yantra — the square gate, the lotus petals, the circles of triangles and the bindu at the top — is raised one above the other. Because it stands on its own, it is kept on the altar rather than on a wall, and many devotees use it for daily Lakshmi or Lalita worship.',
      'मेरु रूप में श्री यंत्र की हर परत — चौकोर द्वार, कमल दल, त्रिकोणों के वृत्त और शिखर पर बिंदु — एक के ऊपर एक उठी होती है। चूँकि यह ख़ुद खड़ा रहता है, इसलिए इसे दीवार की बजाय पूजा की चौकी पर रखा जाता है, और कई भक्त इसे रोज़ की लक्ष्मी या ललिता पूजा में उपयोग करते हैं।'
    ),
    deity: t('Goddess Lakshmi, Maa Tripura Sundari', 'माँ लक्ष्मी, माँ त्रिपुर सुंदरी'),
    purpose: t('Prosperity, peace at home and daily worship of the Goddess.', 'समृद्धि, घर में शांति और देवी की नित्य पूजा।'),
    sthapana: {
      day: t('Friday morning, or on Diwali or Akshaya Tritiya.', 'शुक्रवार सुबह, या दीवाली या अक्षय तृतीया पर।'),
      direction: t('On the altar in the pooja room, in the north-east, on a flat and steady surface.', 'पूजा कक्ष में उत्तर-पूर्व में चौकी पर, समतल और स्थिर जगह पर।'),
      shuddhi: SHUDDHI,
      mantra: t('ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः', 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः'),
      daily: daily(11),
    },
    care: CARE,
    faqs: [
      [t('Where should the Meru Shree Yantra be placed?', 'मेरु श्री यंत्र कहाँ रखना चाहिए?'), t('On the altar of the pooja room, ideally in the north-east, on a flat surface and slightly above floor level — not hung on a wall.', 'पूजा कक्ष की चौकी पर, संभव हो तो उत्तर-पूर्व में, समतल जगह पर और ज़मीन से थोड़ा ऊपर — दीवार पर टाँगकर नहीं।')],
      [t('Is the Meru form better than the flat Shree Yantra?', 'क्या मेरु रूप समतल श्री यंत्र से बेहतर है?'), t('Both carry the same design and are equally respected. The Meru form suits daily worship on an altar; the flat form is easier to keep in a locker, office or on a wall.', 'दोनों में एक ही आकृति है और दोनों समान रूप से पूज्य हैं। मेरु रूप चौकी पर नित्य पूजा के लिए ठीक है; समतल रूप तिजोरी, ऑफिस या दीवार पर रखना आसान है।')],
    ],
  },

  'kuber-yantra': {
    description: t(
      'The Kuber Yantra is dedicated to Lord Kuber, the treasurer of the gods and guardian of the north. It is traditionally kept in the locker or cash box to protect savings and attract steady income.',
      'कुबेर यंत्र देवताओं के कोषाध्यक्ष और उत्तर दिशा के स्वामी भगवान कुबेर को समर्पित है। परंपरा से इसे बचत की रक्षा और स्थिर आय के लिए तिजोरी या कैश बॉक्स में रखा जाता है।'
    ),
    about: t(
      'In Vastu the north is the zone of Kuber — money, opportunities and new openings. That is why the Kuber Yantra is placed in the north of the house or inside the locker, which itself is ideally kept against the south-west wall opening towards the north. It is often worshipped together with the Shree Yantra on Dhanteras.',
      'वास्तु में उत्तर दिशा कुबेर का क्षेत्र है — धन, अवसर और नए रास्ते। इसीलिए कुबेर यंत्र घर के उत्तर में या तिजोरी के अंदर रखा जाता है, और तिजोरी ख़ुद दक्षिण-पश्चिम दीवार के सहारे, उत्तर की ओर खुलती हुई होनी चाहिए। धनतेरस पर इसकी पूजा अक्सर श्री यंत्र के साथ की जाती है।'
    ),
    deity: t('Lord Kuber', 'भगवान कुबेर'),
    purpose: t('Protecting savings, steady income and wealth that stays.', 'बचत की रक्षा, स्थिर आय और टिकने वाला धन।'),
    sthapana: {
      day: t('Thursday or Friday, or on Dhanteras.', 'गुरुवार या शुक्रवार, या धनतेरस पर।'),
      direction: t('In the north of the house, or inside the locker or cash box.', 'घर के उत्तर में, या तिजोरी या कैश बॉक्स के अंदर।'),
      shuddhi: SHUDDHI,
      mantra: t('ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा', 'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा'),
      daily: daily(11),
    },
    care: CARE,
    faqs: [
      [t('Where should the Kuber Yantra be kept?', 'कुबेर यंत्र कहाँ रखना चाहिए?'), t('In the north of the house, or inside the locker, safe or cash box — the locker itself is best kept against the south-west wall, opening towards the north.', 'घर के उत्तर में, या तिजोरी, सेफ़ या कैश बॉक्स के अंदर — तिजोरी ख़ुद दक्षिण-पश्चिम दीवार के सहारे, उत्तर की ओर खुलती हुई सबसे अच्छी है।')],
      [t('Can the Kuber Yantra and Shree Yantra be kept together?', 'क्या कुबेर यंत्र और श्री यंत्र साथ रख सकते हैं?'), t('Yes. Lakshmi brings wealth and Kuber protects it, so they are traditionally worshipped together, especially on Dhanteras and Diwali.', 'हाँ। लक्ष्मी धन लाती हैं और कुबेर उसकी रक्षा करते हैं, इसलिए परंपरा से दोनों की पूजा साथ होती है, ख़ासकर धनतेरस और दीवाली पर।')],
    ],
  },

  'mahalaxmi-yantra': {
    description: t(
      'The Mahalaxmi Yantra is dedicated to Goddess Mahalakshmi, the giver of wealth, abundance and good fortune. It is traditionally installed in the pooja room or at the place of business.',
      'महालक्ष्मी यंत्र धन, वैभव और सौभाग्य देने वाली माँ महालक्ष्मी को समर्पित है। परंपरा से इसे पूजा कक्ष में या व्यापार स्थल पर स्थापित किया जाता है।'
    ),
    about: t(
      'Lakshmi is worshipped not only for money but for all eight forms of abundance (Ashta Lakshmi) — wealth, grain, courage, children, success, knowledge and more. The Mahalaxmi Yantra is a simpler form of Lakshmi worship than the Shree Yantra and suits daily household pooja, especially on Fridays.',
      'लक्ष्मी की पूजा सिर्फ़ धन के लिए नहीं, बल्कि समृद्धि के सभी आठ रूपों (अष्ट लक्ष्मी) के लिए होती है — धन, धान्य, साहस, संतान, विजय, विद्या आदि। महालक्ष्मी यंत्र, श्री यंत्र की तुलना में लक्ष्मी उपासना का सरल रूप है और रोज़ की घरेलू पूजा के लिए, ख़ासकर शुक्रवार को, उपयुक्त है।'
    ),
    deity: t('Goddess Mahalakshmi', 'माँ महालक्ष्मी'),
    purpose: t('Wealth, abundance and good fortune for the family.', 'परिवार के लिए धन, वैभव और सौभाग्य।'),
    sthapana: {
      day: t('Friday morning, or on Diwali or Sharad Purnima.', 'शुक्रवार सुबह, या दीवाली या शरद पूर्णिमा पर।'),
      direction: t('In the pooja room in the north or north-east, facing east.', 'पूजा कक्ष में उत्तर या उत्तर-पूर्व में, मुख पूर्व की ओर।'),
      shuddhi: SHUDDHI,
      mantra: t('ॐ श्रीं ह्रीं श्रीं महालक्ष्म्यै नमः', 'ॐ श्रीं ह्रीं श्रीं महालक्ष्म्यै नमः'),
      daily: daily(11),
    },
    care: CARE,
    faqs: [
      [t('Which day is best to install the Mahalaxmi Yantra?', 'महालक्ष्मी यंत्र की स्थापना किस दिन करें?'), t('Friday is the day of Lakshmi. Diwali, Dhanteras and Sharad Purnima are also traditionally chosen.', 'शुक्रवार लक्ष्मी का दिन है। दीवाली, धनतेरस और शरद पूर्णिमा भी परंपरा से चुने जाते हैं।')],
      [t('Should I choose the Mahalaxmi Yantra or the Shree Yantra?', 'महालक्ष्मी यंत्र लूँ या श्री यंत्र?'), t('Both are for Lakshmi. The Mahalaxmi Yantra is simpler for daily home worship; the Shree Yantra is the more complete form. Ask on WhatsApp if you are unsure.', 'दोनों लक्ष्मी के लिए हैं। महालक्ष्मी यंत्र रोज़ की घरेलू पूजा के लिए सरल है; श्री यंत्र अधिक पूर्ण रूप है। पक्का न हो तो WhatsApp पर पूछ लें।')],
    ],
  },

  'vyapar-vriddhi-yantra': {
    description: t(
      'The Vyapar Vriddhi Yantra is traditionally installed at a shop, office or factory for growth in business — new customers, smooth cash flow and the blessings of Lord Ganesha and Goddess Lakshmi.',
      'व्यापार वृद्धि यंत्र परंपरा से दुकान, ऑफिस या फैक्ट्री में व्यापार में बढ़ोतरी के लिए स्थापित किया जाता है — नए ग्राहक, सुचारु नकद प्रवाह और भगवान गणेश व माँ लक्ष्मी का आशीर्वाद।'
    ),
    about: t(
      'Ganesha removes obstacles at the start of every undertaking and Lakshmi brings prosperity; the Vyapar Vriddhi Yantra combines both for a place of work. It is usually installed on the opening day of a new shop or office, or on an auspicious day when business has slowed down, and kept where the money comes in.',
      'गणेश हर काम की शुरुआत की बाधाएँ दूर करते हैं और लक्ष्मी समृद्धि लाती हैं; व्यापार वृद्धि यंत्र कार्यस्थल के लिए दोनों को साथ लाता है। इसे आमतौर पर नई दुकान या ऑफिस के उद्घाटन के दिन, या व्यापार मंदा होने पर किसी शुभ दिन स्थापित किया जाता है, और वहाँ रखा जाता है जहाँ पैसा आता है।'
    ),
    deity: t('Lord Ganesha and Goddess Lakshmi', 'भगवान गणेश और माँ लक्ष्मी'),
    purpose: t('Growth in business, new customers and smooth cash flow.', 'व्यापार में वृद्धि, नए ग्राहक और सुचारु नकद प्रवाह।'),
    sthapana: {
      day: t('Wednesday or Friday, or the opening day of the shop or office.', 'बुधवार या शुक्रवार, या दुकान/ऑफिस के उद्घाटन का दिन।'),
      direction: t('Near the cash counter or on the owner’s desk, on the north or east wall.', 'कैश काउंटर के पास या मालिक की मेज़ पर, उत्तर या पूर्व की दीवार पर।'),
      shuddhi: SHUDDHI,
      mantra: t('ॐ गं गणपतये नमः · ॐ श्रीं महालक्ष्म्यै नमः', 'ॐ गं गणपतये नमः · ॐ श्रीं महालक्ष्म्यै नमः'),
      daily: t('Before opening for the day, light incense and recite each mantra 11 times.', 'रोज़ दुकान/ऑफिस खोलने से पहले अगरबत्ती जलाएँ और हर मंत्र का 11 बार जाप करें।'),
    },
    care: CARE,
    faqs: [
      [t('Where should the Vyapar Vriddhi Yantra be placed in a shop?', 'दुकान में व्यापार वृद्धि यंत्र कहाँ रखें?'), t('Near the cash counter or on the owner’s desk, on the north or east wall, at or above eye level — not behind the door or on the floor.', 'कैश काउंटर के पास या मालिक की मेज़ पर, उत्तर या पूर्व की दीवार पर, आँखों के स्तर या उससे ऊपर — दरवाज़े के पीछे या ज़मीन पर नहीं।')],
      [t('Can it be installed in a home office?', 'क्या इसे घर के ऑफिस में रख सकते हैं?'), t('Yes. In a home office keep it on the north or east side of the work desk.', 'हाँ। घर के ऑफिस में इसे काम की मेज़ के उत्तर या पूर्व की ओर रखें।')],
    ],
  },

  'navgrah-yantra': {
    description: t(
      'The Navgrah Yantra honours all nine planets — Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu and Ketu. It is traditionally installed to bring balance when several planets are weak or afflicted in the birth chart.',
      'नवग्रह यंत्र सभी नौ ग्रहों — सूर्य, चंद्र, मंगल, बुध, गुरु, शुक्र, शनि, राहु और केतु — को समर्पित है। परंपरा से इसे तब स्थापित किया जाता है जब कुंडली में कई ग्रह कमज़ोर या पीड़ित हों, ताकि संतुलन आए।'
    ),
    about: t(
      'Each square of the Navgrah Yantra belongs to one planet, arranged as in the Navagraha mandala of temples. Instead of separate remedies for each planet, one yantra is worshipped for all nine — which is why it is often suggested during a difficult dasha or when the chart shows several doshas at once.',
      'नवग्रह यंत्र का हर खाना एक ग्रह का होता है, उसी तरह सजा हुआ जैसे मंदिरों के नवग्रह मंडल में। हर ग्रह के अलग उपाय की बजाय, एक ही यंत्र की नौ ग्रहों के लिए पूजा होती है — इसीलिए इसे अक्सर कठिन दशा के समय या कुंडली में एक साथ कई दोष होने पर सुझाया जाता है।'
    ),
    deity: t('The nine planets (Navagraha)', 'नौ ग्रह (नवग्रह)'),
    purpose: t('Balance and peace when several planets are weak or afflicted.', 'कई ग्रह कमज़ोर या पीड़ित हों तो संतुलन और शांति।'),
    sthapana: {
      day: t('Sunday morning, or on an auspicious day chosen from your chart.', 'रविवार सुबह, या आपकी कुंडली से चुना गया शुभ दिन।'),
      direction: t('In the pooja room, in the north-east, facing east.', 'पूजा कक्ष में, उत्तर-पूर्व में, मुख पूर्व की ओर।'),
      shuddhi: SHUDDHI,
      mantra: t('ॐ ब्रह्मा मुरारिस्त्रिपुरान्तकारी भानुः शशी भूमिसुतो बुधश्च। गुरुश्च शुक्रः शनिराहुकेतवः सर्वे ग्रहाः शान्तिकरा भवन्तु॥', 'ॐ ब्रह्मा मुरारिस्त्रिपुरान्तकारी भानुः शशी भूमिसुतो बुधश्च। गुरुश्च शुक्रः शनिराहुकेतवः सर्वे ग्रहाः शान्तिकरा भवन्तु॥'),
      daily: daily(3),
    },
    care: CARE,
    faqs: [
      [t('Who should keep the Navgrah Yantra?', 'नवग्रह यंत्र किसे रखना चाहिए?'), t('Traditionally, anyone going through a difficult dasha or with several weak or afflicted planets in the chart. A consultation shows whether one planet needs its own yantra instead.', 'परंपरा से वे लोग जो कठिन दशा से गुज़र रहे हों या जिनकी कुंडली में कई ग्रह कमज़ोर या पीड़ित हों। परामर्श से पता चलता है कि कहीं किसी एक ग्रह के लिए उसका अपना यंत्र तो नहीं चाहिए।')],
      [t('Can the Navgrah Yantra be kept with other yantras?', 'क्या नवग्रह यंत्र दूसरे यंत्रों के साथ रख सकते हैं?'), t('Yes. It can be kept in the same pooja room as the Shree Yantra or a deity’s yantra.', 'हाँ। इसे श्री यंत्र या किसी देवता के यंत्र के साथ उसी पूजा कक्ष में रख सकते हैं।')],
    ],
  },

  'shani-yantra': {
    description: t(
      'The Shani Yantra is dedicated to Shani Dev (Saturn), the planet of karma, discipline and justice. It is traditionally installed during Shani Sade Sati, Dhaiya or a Saturn dasha to ease delays and hardship.',
      'शनि यंत्र कर्म, अनुशासन और न्याय के ग्रह शनि देव को समर्पित है। परंपरा से इसे शनि की साढ़ेसाती, ढैया या शनि की दशा में देरी और कठिनाइयाँ कम करने के लिए स्थापित किया जाता है।'
    ),
    about: t(
      'Saturn rewards patience and honest work, but its periods can bring delays, pressure at work and health worries. Sade Sati — the seven and a half years when Saturn moves over the Moon sign — is the best-known of these. Along with the yantra, traditional Saturn remedies include service, charity on Saturdays and lighting a mustard-oil diya.',
      'शनि धैर्य और ईमानदार मेहनत का फल देते हैं, लेकिन इनकी अवधि में देरी, काम का दबाव और स्वास्थ्य की चिंता आ सकती है। साढ़ेसाती — वे साढ़े सात साल जब शनि चंद्र राशि के ऊपर से गुज़रते हैं — इनमें सबसे प्रसिद्ध है। यंत्र के साथ शनि के पारंपरिक उपायों में सेवा, शनिवार को दान और सरसों के तेल का दीया जलाना शामिल है।'
    ),
    deity: t('Shani Dev (Saturn)', 'शनि देव'),
    purpose: t('Easing Sade Sati, Dhaiya and Saturn periods; patience and stability.', 'साढ़ेसाती, ढैया और शनि की दशा में राहत; धैर्य और स्थिरता।'),
    sthapana: {
      day: t('Saturday evening, after sunset.', 'शनिवार शाम, सूर्यास्त के बाद।'),
      direction: t('In the west of the pooja room, on a blue or black cloth.', 'पूजा कक्ष के पश्चिम में, नीले या काले कपड़े पर।'),
      shuddhi: t('Wash the yantra with Ganga jal, wipe it dry and place it on a clean blue or black cloth.', 'यंत्र को गंगाजल से धोएँ, सुखाकर पोंछें और साफ़ नीले या काले कपड़े पर रखें।'),
      mantra: t('ॐ शं शनैश्चराय नमः', 'ॐ शं शनैश्चराय नमः'),
      daily: t('Recite the mantra 11 times daily; on Saturdays light a mustard-oil diya and recite it 108 times.', 'रोज़ मंत्र का 11 बार जाप करें; शनिवार को सरसों के तेल का दीया जलाकर 108 बार जाप करें।'),
    },
    care: CARE,
    faqs: [
      [t('Should I install the Shani Yantra during Sade Sati?', 'क्या साढ़ेसाती में शनि यंत्र स्थापित करना चाहिए?'), t('It is one of the traditional remedies. Sade Sati is not equally hard for everyone — it depends on Saturn’s position in your chart — so it is worth checking your chart first.', 'यह पारंपरिक उपायों में से एक है। साढ़ेसाती सबके लिए एक जैसी कठिन नहीं होती — यह कुंडली में शनि की स्थिति पर निर्भर करती है — इसलिए पहले कुंडली दिखा लेना अच्छा है।')],
      [t('Where should the Shani Yantra be placed?', 'शनि यंत्र कहाँ रखना चाहिए?'), t('In the west, the direction of Saturn, in the pooja room or a clean corner of the house — not in the bedroom.', 'पश्चिम में, जो शनि की दिशा है, पूजा कक्ष में या घर के किसी साफ़ कोने में — शयनकक्ष में नहीं।')],
    ],
  },

  'mahamrityunjay-yantra': {
    description: t(
      'The Mahamrityunjay Yantra is dedicated to Lord Shiva as Mrityunjaya, the conqueror of death. It is traditionally installed for protection, good health and recovery, together with the Mahamrityunjaya mantra.',
      'महामृत्युंजय यंत्र मृत्यु पर विजय पाने वाले भगवान शिव (मृत्युंजय) को समर्पित है। परंपरा से इसे महामृत्युंजय मंत्र के साथ रक्षा, अच्छे स्वास्थ्य और रोग से उबरने के लिए स्थापित किया जाता है।'
    ),
    about: t(
      'The Mahamrityunjaya mantra from the Rig Veda is one of the most widely chanted prayers for health and protection. Families often install this yantra when a member is unwell, before surgery, or during a period the chart shows as sensitive for health — alongside, never instead of, medical treatment.',
      'ऋग्वेद का महामृत्युंजय मंत्र स्वास्थ्य और रक्षा के लिए सबसे अधिक जपे जाने वाले मंत्रों में से एक है। परिवार अक्सर यह यंत्र तब स्थापित करते हैं जब कोई सदस्य बीमार हो, ऑपरेशन से पहले, या जब कुंडली में स्वास्थ्य के लिए संवेदनशील समय हो — इलाज के साथ, कभी उसकी जगह नहीं।'
    ),
    deity: t('Lord Shiva (Mrityunjaya)', 'भगवान शिव (मृत्युंजय)'),
    purpose: t('Protection, good health and strength during illness — alongside medical care.', 'रक्षा, अच्छा स्वास्थ्य और बीमारी में शक्ति — इलाज के साथ।'),
    sthapana: {
      day: t('Monday morning, or on Mahashivratri or a Monday of Shravan.', 'सोमवार सुबह, या महाशिवरात्रि या सावन के सोमवार को।'),
      direction: t('In the pooja room in the north-east, facing east.', 'पूजा कक्ष में उत्तर-पूर्व में, मुख पूर्व की ओर।'),
      shuddhi: t('Wash the yantra with Ganga jal or raw milk, wipe it dry and place it on a clean white cloth.', 'यंत्र को गंगाजल या कच्चे दूध से धोएँ, सुखाकर पोंछें और साफ़ सफ़ेद कपड़े पर रखें।'),
      mantra: t('ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥', 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥'),
      daily: daily(11),
    },
    care: CARE,
    faqs: [
      [t('Can the yantra be kept for a family member who is ill?', 'क्या बीमार सदस्य के लिए यंत्र रख सकते हैं?'), t('Yes. Another family member can do the daily pooja and mantra with the sick person’s name in the sankalp. It supports, but does not replace, medical treatment.', 'हाँ। परिवार का दूसरा सदस्य संकल्प में बीमार व्यक्ति का नाम लेकर रोज़ पूजा और जाप कर सकता है। यह इलाज में सहायक है, उसकी जगह नहीं।')],
      [t('How many times should the Mahamrityunjaya mantra be chanted?', 'महामृत्युंजय मंत्र कितनी बार जपें?'), t('11 times daily is a good start; 108 times (one mala) is traditional. For a serious illness, a longer jaap can be arranged as a separate pooja.', 'रोज़ 11 बार अच्छी शुरुआत है; 108 बार (एक माला) पारंपरिक है। गंभीर बीमारी में लंबा जाप अलग पूजा के रूप में करवाया जा सकता है।')],
    ],
  },

  'baglamukhi-yantra': {
    description: t(
      'The Baglamukhi Yantra is dedicated to Maa Baglamukhi, the eighth of the ten Mahavidyas, who “stops” the speech and harmful intent of enemies. It is traditionally installed for victory in court cases, disputes and competition.',
      'बगलामुखी यंत्र दस महाविद्याओं में आठवीं माँ बगलामुखी को समर्पित है, जो शत्रुओं की वाणी और बुरे इरादे को “स्तंभित” करती हैं। परंपरा से इसे कोर्ट-केस, विवाद और प्रतिस्पर्धा में विजय के लिए स्थापित किया जाता है।'
    ),
    about: t(
      'Maa Baglamukhi is also called Pitambara — the goddess dressed in yellow — so her worship uses yellow cloth, yellow flowers and turmeric. Because she is a Mahavidya, her yantra is treated with extra care and is best installed after a consultation, with a clear and fair sankalp.',
      'माँ बगलामुखी को पीतांबरा भी कहा जाता है — पीले वस्त्र धारण करने वाली देवी — इसलिए इनकी पूजा में पीला कपड़ा, पीले फूल और हल्दी का उपयोग होता है। महाविद्या होने के कारण इनके यंत्र को विशेष सावधानी से रखा जाता है, और इसे परामर्श के बाद, साफ़ और न्यायपूर्ण संकल्प के साथ स्थापित करना सबसे अच्छा है।'
    ),
    deity: t('Maa Baglamukhi (Pitambara)', 'माँ बगलामुखी (पीतांबरा)'),
    purpose: t('Victory in court cases, disputes and competition; protection from enemies.', 'कोर्ट-केस, विवाद और प्रतिस्पर्धा में विजय; शत्रुओं से रक्षा।'),
    sthapana: {
      day: t('Thursday morning.', 'गुरुवार सुबह।'),
      direction: t('In the pooja room, in the east, on a yellow cloth.', 'पूजा कक्ष में, पूर्व में, पीले कपड़े पर।'),
      shuddhi: SHUDDHI_YELLOW,
      mantra: t('ॐ ह्लीं बगलामुखि सर्वदुष्टानां वाचं मुखं पदं स्तम्भय जिह्वां कीलय बुद्धिं विनाशय ह्लीं ॐ स्वाहा', 'ॐ ह्लीं बगलामुखि सर्वदुष्टानां वाचं मुखं पदं स्तम्भय जिह्वां कीलय बुद्धिं विनाशय ह्लीं ॐ स्वाहा'),
      daily: t('Light a ghee diya, offer yellow flowers or turmeric, and recite the mantra 11 times.', 'घी का दीया जलाएँ, पीले फूल या हल्दी चढ़ाएँ, और मंत्र का 11 बार जाप करें।'),
    },
    care: CARE,
    faqs: [
      [t('Is the Baglamukhi Yantra used for court cases?', 'क्या बगलामुखी यंत्र कोर्ट-केस के लिए होता है?'), t('Yes, traditionally it is installed for success in legal matters, disputes and competitive exams. It is best done after checking the chart and with a fair sankalp — never to harm anyone.', 'हाँ, परंपरा से इसे कानूनी मामलों, विवादों और प्रतियोगी परीक्षाओं में सफलता के लिए स्थापित किया जाता है। इसे कुंडली देखकर और न्यायपूर्ण संकल्प के साथ करना सबसे अच्छा है — कभी किसी को नुक़सान पहुँचाने के लिए नहीं।')],
      [t('Why is yellow used in Baglamukhi worship?', 'बगलामुखी पूजा में पीला रंग क्यों?'), t('Maa Baglamukhi is Pitambara, the goddess in yellow. Yellow cloth, yellow flowers, turmeric and chana dal are traditional offerings.', 'माँ बगलामुखी पीतांबरा हैं, पीले वस्त्रों वाली देवी। पीला कपड़ा, पीले फूल, हल्दी और चने की दाल पारंपरिक भेंट हैं।')],
    ],
  },

  'kaal-sarp-yantra': {
    description: t(
      'The Kaal Sarp Yantra is traditionally installed when Kaal Sarp dosha is present in the birth chart — all seven planets placed between Rahu and Ketu. It is worshipped with Lord Shiva and the Nag devtas to ease the obstacles linked with this yoga.',
      'काल सर्प यंत्र परंपरा से तब स्थापित किया जाता है जब कुंडली में काल सर्प दोष हो — यानी सातों ग्रह राहु और केतु के बीच हों। इस योग से जुड़ी बाधाएँ कम करने के लिए इसकी पूजा भगवान शिव और नाग देवताओं के साथ की जाती है।'
    ),
    about: t(
      'Kaal Sarp dosha is often feared, but its effect depends on which houses Rahu and Ketu occupy and on the rest of the chart — in many charts it is mild or cancelled. Where it is active, the yantra is one of the traditional remedies, along with Shiva worship and a Kaal Sarp shanti pooja on Nag Panchami or at Trimbakeshwar.',
      'काल सर्प दोष से लोग अक्सर डरते हैं, लेकिन इसका असर इस पर निर्भर करता है कि राहु-केतु किन भावों में हैं और बाकी कुंडली कैसी है — कई कुंडलियों में यह हल्का होता है या इसका परिहार हो जाता है। जहाँ यह सक्रिय हो, वहाँ यंत्र पारंपरिक उपायों में से एक है, साथ में शिव पूजा और नाग पंचमी पर या त्र्यंबकेश्वर में काल सर्प शांति पूजा।'
    ),
    deity: t('Lord Shiva and the Nag devtas (Rahu–Ketu)', 'भगवान शिव और नाग देवता (राहु–केतु)'),
    purpose: t('Easing the obstacles and delays linked with Kaal Sarp dosha.', 'काल सर्प दोष से जुड़ी बाधाओं और देरी में राहत।'),
    sthapana: {
      day: t('Monday, or on Nag Panchami or Mahashivratri.', 'सोमवार, या नाग पंचमी या महाशिवरात्रि पर।'),
      direction: t('In the pooja room, in the north-east.', 'पूजा कक्ष में, उत्तर-पूर्व में।'),
      shuddhi: t('Wash the yantra with Ganga jal or raw milk, wipe it dry and place it on a clean white cloth.', 'यंत्र को गंगाजल या कच्चे दूध से धोएँ, सुखाकर पोंछें और साफ़ सफ़ेद कपड़े पर रखें।'),
      mantra: t('ॐ नमः शिवाय', 'ॐ नमः शिवाय'),
      daily: t('Light a diya and recite “ॐ नमः शिवाय” 108 times; on Mondays offer water or milk.', 'दीया जलाएँ और “ॐ नमः शिवाय” का 108 बार जाप करें; सोमवार को जल या दूध चढ़ाएँ।'),
    },
    care: CARE,
    faqs: [
      [t('How do I know if I have Kaal Sarp dosha?', 'कैसे पता चले कि मेरी कुंडली में काल सर्प दोष है?'), t('It is seen when all seven planets fall on one side of the Rahu–Ketu axis. Its strength varies a lot, so have your chart checked before doing remedies.', 'यह तब होता है जब सातों ग्रह राहु–केतु अक्ष के एक ही ओर हों। इसकी तीव्रता बहुत अलग-अलग होती है, इसलिए उपाय से पहले कुंडली दिखा लें।')],
      [t('Is the yantra enough, or is a pooja also needed?', 'क्या यंत्र काफ़ी है, या पूजा भी करानी होगी?'), t('For a mild dosha, the yantra with daily Shiva mantra is often enough. For a strong one, a Kaal Sarp shanti pooja is traditionally done as well.', 'हल्के दोष में रोज़ शिव मंत्र के साथ यंत्र अक्सर काफ़ी होता है। प्रबल दोष में परंपरा से काल सर्प शांति पूजा भी कराई जाती है।')],
    ],
  },

  'vastu-dosh-nivaran-yantra': {
    description: t(
      'The Vastu Dosh Nivaran Yantra is a traditional remedy for Vastu doshas that cannot be corrected without demolition — a wrong entrance, a cut corner or a toilet in the north-east. It honours Vastu Purush, the deity of the building.',
      'वास्तु दोष निवारण यंत्र उन वास्तु दोषों का पारंपरिक उपाय है जिन्हें बिना तोड़-फोड़ ठीक नहीं किया जा सकता — गलत मुख्य द्वार, कटा हुआ कोना या उत्तर-पूर्व में शौचालय। यह भवन के देवता वास्तु पुरुष को समर्पित है।'
    ),
    about: t(
      'In Vastu Shastra every building rests on Vastu Purush, whose body is mapped onto the plan of the house. When a zone is disturbed and the structure cannot be changed, a Vastu yantra is placed in the affected zone or at the main entrance. It works best as part of a full plan — see our guide to Vastu remedies without demolition.',
      'वास्तु शास्त्र में हर भवन वास्तु पुरुष पर टिका माना जाता है, जिनका शरीर घर के नक्शे पर फैला होता है। जब कोई ज़ोन बिगड़ा हो और निर्माण बदला न जा सके, तो प्रभावित ज़ोन में या मुख्य द्वार पर वास्तु यंत्र रखा जाता है। यह पूरी योजना के हिस्से के रूप में सबसे अच्छा काम करता है — बिना तोड़-फोड़ वास्तु उपायों पर हमारी गाइड देखें।'
    ),
    deity: t('Vastu Purush', 'वास्तु पुरुष'),
    purpose: t('Balancing Vastu doshas in a home, office or shop without demolition.', 'घर, ऑफिस या दुकान के वास्तु दोषों को बिना तोड़-फोड़ संतुलित करना।'),
    sthapana: {
      day: t('Thursday, or an auspicious muhurta such as a griha pravesh.', 'गुरुवार, या गृह प्रवेश जैसा कोई शुभ मुहूर्त।'),
      direction: t('In the zone that has the dosha, or above the main entrance inside the house; otherwise in the north-east.', 'जिस ज़ोन में दोष है वहाँ, या घर के अंदर मुख्य द्वार के ऊपर; अन्यथा उत्तर-पूर्व में।'),
      shuddhi: SHUDDHI,
      mantra: t('ॐ वास्तु देवाय नमः', 'ॐ वास्तु देवाय नमः'),
      daily: daily(11),
    },
    care: CARE,
    faqs: [
      [t('Where should the Vastu Dosh Nivaran Yantra be placed?', 'वास्तु दोष निवारण यंत्र कहाँ रखें?'), t('In the zone where the dosha is — for example the north-east if the toilet is there — or above the main door inside the house. An online Vastu report shows the exact zone.', 'उस ज़ोन में जहाँ दोष है — जैसे शौचालय उत्तर-पूर्व में हो तो वहाँ — या घर के अंदर मुख्य द्वार के ऊपर। ऑनलाइन वास्तु रिपोर्ट से सही ज़ोन पता चलता है।')],
      [t('Can one yantra correct every Vastu dosha?', 'क्या एक यंत्र हर वास्तु दोष ठीक कर देता है?'), t('A yantra is one remedy among several. Changing how rooms are used, colours and placement often matter more, so it is best used as part of a Vastu plan.', 'यंत्र कई उपायों में से एक है। कमरों का उपयोग, रंग और सामान की जगह बदलना अक्सर ज़्यादा मायने रखता है, इसलिए इसे वास्तु योजना के हिस्से के रूप में रखना सबसे अच्छा है।')],
    ],
  },

  'saraswati-yantra': {
    description: t(
      'The Saraswati Yantra is dedicated to Maa Saraswati, the goddess of knowledge, speech, music and the arts. It is traditionally kept in the study room for students, teachers, writers and artists.',
      'सरस्वती यंत्र ज्ञान, वाणी, संगीत और कला की देवी माँ सरस्वती को समर्पित है। परंपरा से इसे विद्यार्थियों, शिक्षकों, लेखकों और कलाकारों के लिए पढ़ाई के कमरे में रखा जाता है।'
    ),
    about: t(
      'Saraswati is worshipped for a clear mind, good memory and pleasant speech. The yantra is usually installed on Basant Panchami or before exams, in the north-east or east of the study room — the zones Vastu links with learning — with the student facing east or north while studying.',
      'सरस्वती की पूजा साफ़ मन, अच्छी स्मरण शक्ति और मधुर वाणी के लिए होती है। यह यंत्र आमतौर पर बसंत पंचमी पर या परीक्षा से पहले, पढ़ाई के कमरे के उत्तर-पूर्व या पूर्व में स्थापित किया जाता है — जिन्हें वास्तु विद्या से जोड़ता है — और पढ़ते समय विद्यार्थी का मुख पूर्व या उत्तर की ओर हो।'
    ),
    deity: t('Maa Saraswati', 'माँ सरस्वती'),
    purpose: t('Focus, memory and success in studies, speech and the arts.', 'पढ़ाई, वाणी और कला में एकाग्रता, स्मरण शक्ति और सफलता।'),
    sthapana: {
      day: t('Basant Panchami, or a Thursday or Wednesday morning.', 'बसंत पंचमी, या गुरुवार या बुधवार सुबह।'),
      direction: t('In the study room, in the north-east or east, at eye level.', 'पढ़ाई के कमरे में, उत्तर-पूर्व या पूर्व में, आँखों के स्तर पर।'),
      shuddhi: t('Wash the yantra with Ganga jal, wipe it dry and place it on a clean white or yellow cloth.', 'यंत्र को गंगाजल से धोएँ, सुखाकर पोंछें और साफ़ सफ़ेद या पीले कपड़े पर रखें।'),
      mantra: t('ॐ ऐं सरस्वत्यै नमः', 'ॐ ऐं सरस्वत्यै नमः'),
      daily: t('Before studying, light incense and recite the mantra 11 times.', 'पढ़ाई शुरू करने से पहले अगरबत्ती जलाएँ और मंत्र का 11 बार जाप करें।'),
    },
    care: CARE,
    faqs: [
      [t('Where should the Saraswati Yantra be kept for a student?', 'विद्यार्थी के लिए सरस्वती यंत्र कहाँ रखें?'), t('In the study room in the north-east or east, at eye level, so that the student faces east or north while studying.', 'पढ़ाई के कमरे में उत्तर-पूर्व या पूर्व में, आँखों के स्तर पर, ताकि पढ़ते समय विद्यार्थी का मुख पूर्व या उत्तर की ओर हो।')],
      [t('Can a child do the pooja?', 'क्या बच्चा ख़ुद पूजा कर सकता है?'), t('Yes. A short pooja — lighting incense and reciting “ॐ ऐं सरस्वत्यै नमः” — is simple enough for children; a parent can help.', 'हाँ। छोटी पूजा — अगरबत्ती जलाना और “ॐ ऐं सरस्वत्यै नमः” जपना — बच्चों के लिए भी आसान है; माता-पिता मदद कर सकते हैं।')],
    ],
  },

  'mangal-yantra': {
    description: t(
      'The Mangal Yantra is dedicated to Mangal (Mars), the planet of energy, courage, land and siblings. It is traditionally installed for Manglik dosha, delays in marriage, property matters and relief from debt.',
      'मंगल यंत्र ऊर्जा, साहस, ज़मीन और भाई-बहनों के ग्रह मंगल को समर्पित है। परंपरा से इसे मांगलिक दोष, विवाह में देरी, संपत्ति के मामलों और कर्ज़ से राहत के लिए स्थापित किया जाता है।'
    ),
    about: t(
      'When Mars sits in the 1st, 2nd, 4th, 7th, 8th or 12th house, the chart is called Manglik. In many charts the dosha is cancelled by other factors; where it is not, the Mangal Yantra and Hanuman worship on Tuesdays are traditional remedies. Mars is also called Rin-mochak — the one who frees from debt.',
      'जब मंगल कुंडली के 1, 2, 4, 7, 8 या 12वें भाव में हो, तो कुंडली मांगलिक कहलाती है। कई कुंडलियों में दूसरे कारणों से इस दोष का परिहार हो जाता है; जहाँ नहीं होता, वहाँ मंगल यंत्र और मंगलवार को हनुमान पूजा पारंपरिक उपाय हैं। मंगल को ऋण-मोचक भी कहा जाता है — कर्ज़ से मुक्ति दिलाने वाले।'
    ),
    deity: t('Mangal (Mars), Lord Hanuman', 'मंगल ग्रह, भगवान हनुमान'),
    purpose: t('Manglik dosha, delays in marriage, property matters and relief from debt.', 'मांगलिक दोष, विवाह में देरी, संपत्ति के मामले और कर्ज़ से राहत।'),
    sthapana: {
      day: t('Tuesday morning.', 'मंगलवार सुबह।'),
      direction: t('In the pooja room, in the south, on a red cloth.', 'पूजा कक्ष में, दक्षिण में, लाल कपड़े पर।'),
      shuddhi: SHUDDHI,
      mantra: t('ॐ अं अंगारकाय नमः', 'ॐ अं अंगारकाय नमः'),
      daily: t('Recite the mantra 11 times daily; on Tuesdays offer red flowers and recite it 108 times.', 'रोज़ मंत्र का 11 बार जाप करें; मंगलवार को लाल फूल चढ़ाकर 108 बार जाप करें।'),
    },
    care: CARE,
    faqs: [
      [t('Does the Mangal Yantra help with Manglik dosha?', 'क्या मंगल यंत्र मांगलिक दोष में मदद करता है?'), t('It is one of the traditional remedies. First check whether the dosha is really active in your chart — it is often cancelled — through kundli matching or a birth chart consultation.', 'यह पारंपरिक उपायों में से एक है। पहले कुंडली मिलान या कुंडली परामर्श से देखें कि दोष सच में सक्रिय है या नहीं — अक्सर इसका परिहार हो जाता है।')],
      [t('Which day should the Mangal Yantra be installed?', 'मंगल यंत्र किस दिन स्थापित करें?'), t('Tuesday, the day of Mars and of Lord Hanuman, in the morning.', 'मंगलवार सुबह, जो मंगल और भगवान हनुमान का दिन है।')],
    ],
  },

  'hanuman-yantra': {
    description: t(
      'The Hanuman Yantra is dedicated to Lord Hanuman — strength, courage, devotion and protection. It is traditionally installed to remove fear and negativity and to calm the effects of Saturn and Mars.',
      'हनुमान यंत्र भगवान हनुमान को समर्पित है — बल, साहस, भक्ति और रक्षा। परंपरा से इसे भय और नकारात्मकता दूर करने तथा शनि और मंगल के प्रभाव को शांत करने के लिए स्थापित किया जाता है।'
    ),
    about: t(
      'Hanuman ji is worshipped as Sankat Mochan, the remover of troubles. Devotees believe Saturn does not trouble those who worship Hanuman, which is why his yantra is popular during Sade Sati, and Tuesday worship links it with Mars as well. The Hanuman Chalisa can be recited with it every day.',
      'हनुमान जी की पूजा संकट मोचन के रूप में होती है। भक्तों का विश्वास है कि हनुमान की पूजा करने वालों को शनि परेशान नहीं करते, इसलिए साढ़ेसाती में इनका यंत्र लोकप्रिय है, और मंगलवार की पूजा इसे मंगल से भी जोड़ती है। इसके साथ रोज़ हनुमान चालीसा का पाठ कर सकते हैं।'
    ),
    deity: t('Lord Hanuman', 'भगवान हनुमान'),
    purpose: t('Courage, protection from fear and negativity, relief during Saturn and Mars periods.', 'साहस, भय और नकारात्मकता से रक्षा, शनि और मंगल की अवधि में राहत।'),
    sthapana: {
      day: t('Tuesday or Saturday morning, or on Hanuman Jayanti.', 'मंगलवार या शनिवार सुबह, या हनुमान जयंती पर।'),
      direction: t('In the pooja room, in the south or east, on a red cloth.', 'पूजा कक्ष में, दक्षिण या पूर्व में, लाल कपड़े पर।'),
      shuddhi: SHUDDHI,
      mantra: t('ॐ हं हनुमते नमः', 'ॐ हं हनुमते नमः'),
      daily: t('Light a diya and recite the mantra 11 times, or the Hanuman Chalisa once.', 'दीया जलाएँ और मंत्र का 11 बार जाप करें, या एक बार हनुमान चालीसा पढ़ें।'),
    },
    care: CARE,
    faqs: [
      [t('Is the Hanuman Yantra good during Shani Sade Sati?', 'क्या साढ़ेसाती में हनुमान यंत्र अच्छा है?'), t('Yes. Hanuman worship is one of the most popular traditional remedies for Saturn, especially on Saturdays and Tuesdays.', 'हाँ। हनुमान पूजा शनि के सबसे लोकप्रिय पारंपरिक उपायों में से एक है, ख़ासकर शनिवार और मंगलवार को।')],
      [t('Can I recite the Hanuman Chalisa instead of the mantra?', 'क्या मंत्र की जगह हनुमान चालीसा पढ़ सकते हैं?'), t('Yes. Reciting the Hanuman Chalisa once a day in front of the yantra is a complete daily worship.', 'हाँ। यंत्र के सामने रोज़ एक बार हनुमान चालीसा का पाठ पूरी नित्य पूजा है।')],
    ],
  },

  'sarva-karya-siddhi-yantra': {
    description: t(
      'The Sarva Karya Siddhi Yantra is traditionally installed for success in all undertakings — a new job, business, exam or important project — with the blessings of Lord Ganesha, the remover of obstacles.',
      'सर्व कार्य सिद्धि यंत्र परंपरा से हर काम में सफलता के लिए स्थापित किया जाता है — नई नौकरी, व्यापार, परीक्षा या कोई ज़रूरी प्रोजेक्ट — विघ्नहर्ता भगवान गणेश के आशीर्वाद के साथ।'
    ),
    about: t(
      '“Sarva karya siddhi” means “success in every task”. The yantra combines the energies of Ganesha with those of the other deities invoked in it, and is chosen when there is no single problem but work keeps getting stuck. It suits both the home pooja room and the workplace.',
      '“सर्व कार्य सिद्धि” का अर्थ है “हर कार्य में सफलता”। इस यंत्र में गणेश जी के साथ अन्य देवताओं की शक्तियाँ भी आवाहित होती हैं, और इसे तब चुना जाता है जब कोई एक समस्या न हो, पर काम बार-बार अटक रहे हों। यह घर के पूजा कक्ष और कार्यस्थल दोनों के लिए उपयुक्त है।'
    ),
    deity: t('Lord Ganesha', 'भगवान गणेश'),
    purpose: t('Removing obstacles and success in work, business, exams and new beginnings.', 'बाधाएँ दूर करना और काम, व्यापार, परीक्षा व नई शुरुआत में सफलता।'),
    sthapana: {
      day: t('Wednesday morning, or on Ganesh Chaturthi.', 'बुधवार सुबह, या गणेश चतुर्थी पर।'),
      direction: t('In the pooja room in the north-east, or on the work desk facing east.', 'पूजा कक्ष में उत्तर-पूर्व में, या काम की मेज़ पर मुख पूर्व की ओर।'),
      shuddhi: SHUDDHI,
      mantra: t('ॐ गं गणपतये नमः', 'ॐ गं गणपतये नमः'),
      daily: daily(11),
    },
    care: CARE,
    faqs: [
      [t('When should I choose the Sarva Karya Siddhi Yantra?', 'सर्व कार्य सिद्धि यंत्र कब चुनें?'), t('When work keeps getting stuck without one clear reason, or before a new beginning — a job, business or exam.', 'जब बिना किसी एक साफ़ कारण के काम बार-बार अटकें, या किसी नई शुरुआत से पहले — नौकरी, व्यापार या परीक्षा।')],
      [t('Can it be kept at the office?', 'क्या इसे ऑफिस में रख सकते हैं?'), t('Yes. On the work desk or the north-east of the office, facing east.', 'हाँ। काम की मेज़ पर या ऑफिस के उत्तर-पूर्व में, मुख पूर्व की ओर।')],
    ],
  },
};
