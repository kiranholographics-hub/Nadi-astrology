// Fourth batch of blog articles (English + Hindi). Added once on server start and scheduled
// to follow the posts already scheduled (same Mon/Wed/Fri 10:00 IST cadence).

export const BLOG_BATCH4 = 'blog-batch-4';

export const blogPosts4 = [
  {
    slug: 'pooja-room-vastu-direction-tips',
    category: 'Vastu',
    title: 'Pooja Room Vastu: Direction, Placement and Do’s and Don’ts',
    titleHi: 'पूजा कक्ष का वास्तु: दिशा, स्थान और क्या करें, क्या न करें',
    excerpt: 'The best zone for the pooja room or mandir, which way to face while praying, idol placement, and what to avoid in small homes and flats.',
    excerptHi: 'पूजा कक्ष या मंदिर के लिए सबसे अच्छा ज़ोन, पूजा करते समय मुख किधर हो, मूर्तियों की जगह, और छोटे घर/फ्लैट में किन बातों से बचें।',
    seoTitle: 'Pooja Room Vastu: Best Direction & Placement Tips',
    metaDescription: 'Pooja room Vastu guide: why the north-east is best, which way to face while praying, idol height and placement, colours, and tips for small flats.',
    content: `
<p>The pooja room is the spiritual centre of a home. In Vastu Shastra its placement affects the peace of mind of the whole family, so it is one of the first things checked in a consultation.</p>

<h2>The best direction</h2>
<ul>
<li><strong>North-east (Ishaan kon)</strong> — the ideal zone, ruled by water and the divine.</li>
<li><strong>East or north</strong> — good alternatives.</li>
<li><strong>Avoid:</strong> the south, the south-west, under a staircase, next to or sharing a wall with a toilet, and inside a bedroom where possible.</li>
</ul>

<h2>Which way to face while praying</h2>
<p>Face <strong>east</strong> or <strong>north</strong> while praying, so the idols face west or south. Many families keep the idols on the east wall, facing west, so that the person praying faces east.</p>

<h2>Placing idols and pictures</h2>
<ul>
<li>Keep idols on a raised platform or shelf — never directly on the floor — so their feet are around the chest level of a seated person.</li>
<li>Small idols are preferred for home worship; avoid very large idols at home.</li>
<li>Do not keep broken idols or torn pictures; immerse or respectfully give them away.</li>
<li>Keep a little space between the idols and the wall for air to move.</li>
</ul>

<h2>Colours, light and lamps</h2>
<p>Light colours suit the pooja room — white, cream, light yellow or light blue. Light the diya on the south-east side of the altar, the zone of fire. Keep the room clean and uncluttered; do not use it as storage.</p>

<h2>In a small flat</h2>
<p>A separate room is not essential. A wall-mounted mandir or a cabinet in the north-east of the living room works well. If the north-east is not available, the east wall of the living area is the next best place.</p>

<h2>Yantras in the pooja room</h2>
<p>Energized yantras such as the <a href="/yantra-shop/shree-yantra">Shree Yantra</a> or <a href="/yantra-shop/navgrah-yantra">Navgrah Yantra</a> are traditionally kept on the altar. See <a href="/blog/shree-yantra-meaning-placement-worship">how to place and worship the Shree Yantra</a>.</p>

<p>Not sure where the pooja room should go in your home? Send your floor plan for an <a href="/online-vastu-consultation">online Astro-Vastu report</a>.</p>
`.trim(),
    contentHi: `
<p>पूजा कक्ष घर का आध्यात्मिक केंद्र है। वास्तु शास्त्र में इसकी जगह पूरे परिवार की मानसिक शांति पर असर डालती है, इसलिए परामर्श में सबसे पहले देखी जाने वाली चीज़ों में से एक यही है।</p>

<h2>सबसे अच्छी दिशा</h2>
<ul>
<li><strong>उत्तर-पूर्व (ईशान कोण)</strong> — सबसे उत्तम ज़ोन, जल और देवत्व का।</li>
<li><strong>पूर्व या उत्तर</strong> — अच्छे विकल्प।</li>
<li><strong>बचें:</strong> दक्षिण, दक्षिण-पश्चिम, सीढ़ी के नीचे, शौचालय के बगल में या उसकी दीवार से सटा, और जहाँ तक हो सके शयनकक्ष के अंदर।</li>
</ul>

<h2>पूजा करते समय मुख किधर हो</h2>
<p>पूजा करते समय मुख <strong>पूर्व</strong> या <strong>उत्तर</strong> की ओर हो, ताकि मूर्तियाँ पश्चिम या दक्षिण की ओर देखें। कई परिवार मूर्तियाँ पूर्व की दीवार पर पश्चिम की ओर मुख करके रखते हैं, ताकि पूजा करने वाले का मुख पूर्व की ओर हो।</p>

<h2>मूर्तियाँ और चित्र कैसे रखें</h2>
<ul>
<li>मूर्तियाँ ऊँची चौकी या शेल्फ़ पर रखें — कभी सीधे ज़मीन पर नहीं — ताकि उनके चरण बैठे व्यक्ति की छाती के स्तर के आसपास हों।</li>
<li>घर की पूजा में छोटी मूर्तियाँ बेहतर हैं; घर में बहुत बड़ी मूर्तियाँ न रखें।</li>
<li>टूटी मूर्तियाँ या फटे चित्र न रखें; उन्हें विसर्जित करें या सम्मान से दे दें।</li>
<li>मूर्तियों और दीवार के बीच थोड़ी जगह रखें ताकि हवा चल सके।</li>
</ul>

<h2>रंग, रोशनी और दीया</h2>
<p>पूजा कक्ष के लिए हल्के रंग ठीक हैं — सफ़ेद, क्रीम, हल्का पीला या हल्का नीला। दीया चौकी के दक्षिण-पूर्व हिस्से में जलाएँ, जो अग्नि का ज़ोन है। कमरा साफ़ और खुला रखें; इसे स्टोर की तरह इस्तेमाल न करें।</p>

<h2>छोटे फ्लैट में</h2>
<p>अलग कमरा ज़रूरी नहीं। लिविंग रूम के उत्तर-पूर्व में दीवार पर लगा मंदिर या कैबिनेट अच्छा रहता है। उत्तर-पूर्व उपलब्ध न हो, तो लिविंग एरिया की पूर्वी दीवार अगला सबसे अच्छा स्थान है।</p>

<h2>पूजा कक्ष में यंत्र</h2>
<p><a href="/yantra-shop/shree-yantra">श्री यंत्र</a> या <a href="/yantra-shop/navgrah-yantra">नवग्रह यंत्र</a> जैसे प्राण-प्रतिष्ठित यंत्र परंपरा से पूजा की चौकी पर रखे जाते हैं। देखें <a href="/blog/shree-yantra-meaning-placement-worship">श्री यंत्र की स्थापना और पूजा कैसे करें</a>।</p>

<p>पक्का नहीं कि आपके घर में पूजा कक्ष कहाँ हो? <a href="/online-vastu-consultation">ऑनलाइन एस्ट्रो-वास्तु रिपोर्ट</a> के लिए फ्लोर प्लान भेजें।</p>
`.trim(),
  },

  {
    slug: 'office-shop-vastu-business-tips',
    category: 'Vastu',
    title: 'Vastu for Office and Shop: Tips for Business Growth',
    titleHi: 'ऑफिस और दुकान का वास्तु: व्यापार बढ़ाने के टिप्स',
    excerpt: 'Where the owner should sit, where to keep cash and accounts, the entrance, staff seating and simple remedies for a shop or office.',
    excerptHi: 'मालिक कहाँ बैठे, कैश और अकाउंट कहाँ रखें, प्रवेश द्वार, स्टाफ़ की जगह और दुकान या ऑफिस के सरल उपाय।',
    seoTitle: 'Office & Shop Vastu: Tips for Business Growth',
    metaDescription: 'Vastu for office and shop: owner’s seat in the south-west, cash counter and locker, entrance, staff seating, colours and simple remedies for business.',
    content: `
<p>A workplace has its own Vastu. The same principles that bring peace to a home bring stability and growth to a business — but the zones are used differently.</p>

<h2>The owner’s seat</h2>
<p>The owner or senior-most person should sit in the <strong>south-west</strong> of the office or cabin, facing <strong>north or east</strong>, with a solid wall behind and no window directly at the back. This zone gives stability and control.</p>

<h2>Cash, locker and accounts</h2>
<ul>
<li>Keep the locker or safe against the <strong>south or south-west</strong> wall, opening towards the <strong>north</strong> — the zone of Kuber.</li>
<li>In a shop, the cash counter works well in the north or east part, with the cashier facing north or east.</li>
<li>The accounts team suits the south-east or north.</li>
</ul>

<h2>Entrance</h2>
<p>A clean, well-lit entrance in a favourable pada of the north or east wall is ideal. Keep it free of clutter, broken signboards and dustbins. A clear, bright name board helps customers find you — in Vastu and in practice. See <a href="/blog/main-door-vastu-direction-remedies">main door Vastu</a>.</p>

<h2>Staff and departments</h2>
<ul>
<li><strong>Sales and marketing:</strong> north-west — the zone of movement.</li>
<li><strong>Finance:</strong> south-east or north.</li>
<li><strong>Reception:</strong> north-east or east, facing visitors.</li>
<li><strong>Pantry:</strong> south-east; <strong>toilets:</strong> west or north-west.</li>
</ul>

<h2>In a shop</h2>
<ul>
<li>Display heavy goods along the south and west walls; keep the north and east lighter and open.</li>
<li>Keep the centre of the shop free so customers can move around.</li>
<li>Do not stock damaged goods in the north-east.</li>
</ul>

<h2>Simple remedies</h2>
<p>A <a href="/yantra-shop/vyapar-vriddhi-yantra">Vyapar Vriddhi Yantra</a> near the cash counter, good lighting, a clean north-east and fresh paint often make a visible difference without any construction.</p>

<p>For factories and larger offices, a site visit is recommended — see our <a href="/vastu-consultant-jaipur">Vastu consultation in Jaipur</a>. For a shop or office anywhere else, send the floor plan for an <a href="/online-vastu-consultation">online Astro-Vastu report</a>.</p>
`.trim(),
    contentHi: `
<p>कार्यस्थल का अपना वास्तु होता है। जो सिद्धांत घर में शांति लाते हैं, वही व्यापार में स्थिरता और वृद्धि लाते हैं — बस ज़ोन का उपयोग अलग तरह से होता है।</p>

<h2>मालिक की सीट</h2>
<p>मालिक या सबसे वरिष्ठ व्यक्ति ऑफिस या केबिन के <strong>दक्षिण-पश्चिम</strong> में बैठे, मुख <strong>उत्तर या पूर्व</strong> की ओर, पीछे ठोस दीवार हो और ठीक पीछे खिड़की न हो। यह ज़ोन स्थिरता और नियंत्रण देता है।</p>

<h2>कैश, तिजोरी और अकाउंट</h2>
<ul>
<li>तिजोरी या सेफ़ <strong>दक्षिण या दक्षिण-पश्चिम</strong> दीवार के सहारे रखें, जिसका दरवाज़ा <strong>उत्तर</strong> की ओर खुले — कुबेर का ज़ोन।</li>
<li>दुकान में कैश काउंटर उत्तर या पूर्व हिस्से में अच्छा रहता है, कैशियर का मुख उत्तर या पूर्व की ओर।</li>
<li>अकाउंट विभाग के लिए दक्षिण-पूर्व या उत्तर ठीक है।</li>
</ul>

<h2>प्रवेश द्वार</h2>
<p>उत्तर या पूर्व दीवार के शुभ पद में साफ़ और रोशन प्रवेश द्वार आदर्श है। इसे अव्यवस्था, टूटे साइनबोर्ड और कूड़ेदान से मुक्त रखें। साफ़ और चमकदार नाम-पट्ट ग्राहकों को आप तक पहुँचाता है — वास्तु में भी और व्यवहार में भी। देखें <a href="/blog/main-door-vastu-direction-remedies">मुख्य द्वार का वास्तु</a>।</p>

<h2>स्टाफ़ और विभाग</h2>
<ul>
<li><strong>सेल्स और मार्केटिंग:</strong> उत्तर-पश्चिम — गति का ज़ोन।</li>
<li><strong>फ़ाइनेंस:</strong> दक्षिण-पूर्व या उत्तर।</li>
<li><strong>रिसेप्शन:</strong> उत्तर-पूर्व या पूर्व, आने वालों की ओर मुख।</li>
<li><strong>पैंट्री:</strong> दक्षिण-पूर्व; <strong>शौचालय:</strong> पश्चिम या उत्तर-पश्चिम।</li>
</ul>

<h2>दुकान में</h2>
<ul>
<li>भारी सामान दक्षिण और पश्चिम की दीवारों पर रखें; उत्तर और पूर्व हल्का और खुला रखें।</li>
<li>दुकान का बीच का भाग खाली रखें ताकि ग्राहक आसानी से घूम सकें।</li>
<li>ख़राब माल उत्तर-पूर्व में न रखें।</li>
</ul>

<h2>सरल उपाय</h2>
<p>कैश काउंटर के पास <a href="/yantra-shop/vyapar-vriddhi-yantra">व्यापार वृद्धि यंत्र</a>, अच्छी रोशनी, साफ़ उत्तर-पूर्व और नया पेंट अक्सर बिना किसी निर्माण के साफ़ फ़र्क लाते हैं।</p>

<p>फैक्ट्री और बड़े ऑफिस के लिए साइट विज़िट की सलाह है — देखें <a href="/vastu-consultant-jaipur">जयपुर में वास्तु परामर्श</a>। कहीं और की दुकान या ऑफिस के लिए <a href="/online-vastu-consultation">ऑनलाइन एस्ट्रो-वास्तु रिपोर्ट</a> के लिए फ्लोर प्लान भेजें।</p>
`.trim(),
  },

  {
    slug: 'marriage-timing-in-kundli',
    category: 'Vedic',
    title: 'When Will I Get Married? Marriage Timing in Your Kundli',
    titleHi: 'मेरी शादी कब होगी? कुंडली से विवाह का समय',
    excerpt: 'How astrologers read the timing of marriage from the 7th house, Venus, Jupiter, the Navamsha, dashas and transits — and what causes delay.',
    excerptHi: 'ज्योतिषी सप्तम भाव, शुक्र, गुरु, नवांश, दशा और गोचर से विवाह का समय कैसे देखते हैं — और देरी के कारण क्या होते हैं।',
    seoTitle: 'Marriage Timing in Kundli: When Will I Get Married?',
    metaDescription: 'How marriage timing is read in a kundli: the 7th house, Venus and Jupiter, Navamsha, dasha and Jupiter transit, reasons for delay and simple remedies.',
    content: `
<p>“When will I get married?” is one of the questions astrologers hear most. There is no single rule — the answer comes from putting several factors of the birth chart together.</p>

<h2>The promise: 7th house, Venus and Jupiter</h2>
<p>The <strong>7th house</strong> and its lord show marriage and the partner. <strong>Venus</strong> is the significator of marriage for everyone, and <strong>Jupiter</strong> also matters, traditionally more so in a woman’s chart. When these are strong and well placed, marriage tends to come on time; when they are afflicted, it may be delayed.</p>

<h2>The Navamsha (D-9)</h2>
<p>The Navamsha is the chart of marriage. Astrologers check the 7th house of the Navamsha, the placement of Venus, and whether the D-9 supports what the birth chart shows.</p>

<h2>Timing: dasha and transit</h2>
<p>Marriage usually happens when the <strong>dasha or antardasha</strong> of a planet connected to the 7th house (its lord, a planet sitting in it, Venus, or the lord of the 2nd or 11th house) is running — and, at the same time, <strong>Jupiter</strong> transits over or aspects the 7th house or its lord, often with Saturn’s support too. This “double transit” is a classic timing signal. See <a href="/blog/vimshottari-dasha-explained">Vimshottari dasha explained</a>.</p>

<h2>Common reasons for delay</h2>
<ul>
<li>Saturn aspecting or sitting in the 7th house or with its lord.</li>
<li>An afflicted Venus, or Rahu–Ketu across the 1st and 7th houses.</li>
<li><a href="/blog/manglik-dosha-meaning-cancellation-remedies">Manglik dosha</a> that is not cancelled.</li>
<li>A long, unconnected dasha running in the usual marriage years.</li>
</ul>
<p>Delay is not denial. Saturn often brings marriage later but makes it more stable.</p>

<h2>Remedies traditionally suggested</h2>
<ul>
<li>Worship of Goddess Parvati or Katyayani, and fasting on Mondays or Thursdays.</li>
<li>Strengthening Jupiter — respect for teachers and elders, charity of yellow items on Thursdays.</li>
<li>For Manglik dosha, Hanuman worship and the <a href="/yantra-shop/mangal-yantra">Mangal Yantra</a>.</li>
</ul>

<h2>Get your own answer</h2>
<p>A <a href="/vedic-astrology">birth chart consultation</a> shows the likely periods for marriage in your chart. For a specific proposal, <a href="/kundli-milan">kundli matching</a> checks compatibility, and <a href="/kp-prashna">KP Prashna</a> can answer “Will this proposal work out?” with timing.</p>
`.trim(),
    contentHi: `
<p>“मेरी शादी कब होगी?” ज्योतिषियों से सबसे ज़्यादा पूछे जाने वाले सवालों में से एक है। इसका कोई एक नियम नहीं — उत्तर कुंडली के कई कारकों को मिलाकर मिलता है।</p>

<h2>योग: सप्तम भाव, शुक्र और गुरु</h2>
<p><strong>सप्तम भाव</strong> और उसका स्वामी विवाह और जीवनसाथी दिखाते हैं। <strong>शुक्र</strong> सबके लिए विवाह का कारक है, और <strong>गुरु</strong> भी महत्वपूर्ण है, परंपरा से स्त्री की कुंडली में और अधिक। जब ये मज़बूत और अच्छी स्थिति में हों, तो विवाह समय पर होता है; पीड़ित हों तो देरी हो सकती है।</p>

<h2>नवांश (D-9)</h2>
<p>नवांश विवाह की कुंडली है। ज्योतिषी नवांश का सप्तम भाव, शुक्र की स्थिति, और यह देखते हैं कि D-9 जन्म कुंडली की बात का समर्थन करती है या नहीं।</p>

<h2>समय: दशा और गोचर</h2>
<p>विवाह आमतौर पर तब होता है जब सप्तम भाव से जुड़े ग्रह (उसका स्वामी, उसमें बैठा ग्रह, शुक्र, या दूसरे/ग्यारहवें भाव का स्वामी) की <strong>दशा या अंतर्दशा</strong> चल रही हो — और उसी समय <strong>गुरु</strong> सप्तम भाव या उसके स्वामी पर गोचर या दृष्टि करें, अक्सर शनि के सहयोग के साथ। यह “दोहरा गोचर” समय का पारंपरिक संकेत है। देखें <a href="/blog/vimshottari-dasha-explained">विंशोत्तरी दशा सरल भाषा में</a>।</p>

<h2>देरी के आम कारण</h2>
<ul>
<li>शनि की सप्तम भाव पर दृष्टि, उसमें बैठना, या उसके स्वामी के साथ होना।</li>
<li>पीड़ित शुक्र, या पहले और सातवें भाव में राहु–केतु।</li>
<li>ऐसा <a href="/blog/manglik-dosha-meaning-cancellation-remedies">मांगलिक दोष</a> जिसका परिहार न हो।</li>
<li>विवाह की सामान्य उम्र में किसी असंबंधित ग्रह की लंबी दशा।</li>
</ul>
<p>देरी का मतलब इनकार नहीं। शनि अक्सर विवाह देर से कराते हैं, पर उसे ज़्यादा स्थिर बनाते हैं।</p>

<h2>परंपरा से सुझाए जाने वाले उपाय</h2>
<ul>
<li>माँ पार्वती या माँ कात्यायनी की पूजा, और सोमवार या गुरुवार का व्रत।</li>
<li>गुरु को मज़बूत करना — गुरुजनों और बड़ों का सम्मान, गुरुवार को पीली वस्तुओं का दान।</li>
<li>मांगलिक दोष के लिए हनुमान पूजा और <a href="/yantra-shop/mangal-yantra">मंगल यंत्र</a>।</li>
</ul>

<h2>अपना उत्तर पाएँ</h2>
<p><a href="/vedic-astrology">कुंडली परामर्श</a> से आपकी कुंडली में विवाह की संभावित अवधि पता चलती है। किसी ख़ास रिश्ते के लिए <a href="/kundli-milan">कुंडली मिलान</a> अनुकूलता देखता है, और <a href="/kp-prashna">केपी प्रश्न</a> “क्या यह रिश्ता होगा?” का उत्तर समय के साथ दे सकता है।</p>
`.trim(),
  },

  {
    slug: 'career-astrology-10th-house',
    category: 'Vedic',
    title: 'Career Astrology: What Your 10th House Says About Your Work',
    titleHi: 'करियर ज्योतिष: दशम भाव आपके काम के बारे में क्या कहता है',
    excerpt: 'Job or business, which field suits you, and when change is likely — read from the 10th house, its lord, the Dashamsha and your dasha.',
    excerptHi: 'नौकरी या व्यापार, कौन-सा क्षेत्र आपके लिए सही, और बदलाव कब संभव — दशम भाव, उसके स्वामी, दशमांश और दशा से।',
    seoTitle: 'Career Astrology: Your 10th House, Job or Business',
    metaDescription: 'Career astrology explained: the 10th house and its lord, which planets suit which fields, job vs business, the Dashamsha (D-10), and timing career changes.',
    content: `
<p>Career is the most common reason people consult an astrologer. Vedic astrology looks at career from several angles: what kind of work suits you, whether a job or business is better, and when changes are likely.</p>

<h2>The 10th house — karma bhava</h2>
<p>The <strong>10th house</strong> shows your profession, status and reputation. Its sign, the planets in it and the placement of its lord describe the nature of your work. The 2nd (income), 6th (service, daily work) and 11th (gains) houses complete the picture.</p>

<h2>Planets and fields of work</h2>
<ul>
<li><strong>Sun:</strong> government, administration, leadership.</li>
<li><strong>Moon:</strong> public dealing, hospitality, care, travel.</li>
<li><strong>Mars:</strong> engineering, police, army, land, surgery, sports.</li>
<li><strong>Mercury:</strong> business, accounts, writing, IT, communication.</li>
<li><strong>Jupiter:</strong> teaching, law, finance, advisory, religion.</li>
<li><strong>Venus:</strong> arts, fashion, media, luxury, hospitality.</li>
<li><strong>Saturn:</strong> industry, labour, construction, long-term service.</li>
<li><strong>Rahu:</strong> technology, foreign companies, unconventional fields.</li>
</ul>
<p>These are tendencies, not fixed rules — the whole chart decides.</p>

<h2>Job or business?</h2>
<p>A strong 7th house (dealings with others) and 11th house, with Mercury or a well-placed 10th lord, often support business. A strong 6th house and Saturn connected with the 10th often point to steady service. Many charts support both at different times.</p>

<h2>The Dashamsha (D-10)</h2>
<p>The Dashamsha is the divisional chart of career. It refines what the birth chart shows — especially the rise and fall of status over time.</p>

<h2>Timing promotions and changes</h2>
<p>Career events come in the dashas of planets connected with the 10th, 6th and 11th houses, triggered by transits of Saturn and Jupiter. See <a href="/blog/vimshottari-dasha-explained">how dashas work</a>. For one specific question — “Will I get this job?” — <a href="/kp-prashna">KP Prashna</a> is often the fastest answer.</p>

<h2>Remedies</h2>
<p>Strengthening the 10th lord or a helpful planet — through its mantra, charity and, only where it suits the chart, a gemstone — is the traditional approach. The <a href="/yantra-shop/sarva-karya-siddhi-yantra">Sarva Karya Siddhi Yantra</a> is often kept for obstacles at work.</p>

<p>For a full career reading, book a <a href="/vedic-astrology">Vedic birth chart consultation</a>.</p>
`.trim(),
    contentHi: `
<p>करियर ज्योतिषी से परामर्श लेने का सबसे आम कारण है। वैदिक ज्योतिष करियर को कई कोणों से देखता है: कैसा काम आपके लिए सही है, नौकरी बेहतर है या व्यापार, और बदलाव कब संभव हैं।</p>

<h2>दशम भाव — कर्म भाव</h2>
<p><strong>दशम भाव</strong> आपका पेशा, पद और प्रतिष्ठा दिखाता है। इसकी राशि, इसमें बैठे ग्रह और इसके स्वामी की स्थिति आपके काम का स्वभाव बताते हैं। दूसरा (आय), छठा (सेवा, रोज़ का काम) और ग्यारहवाँ (लाभ) भाव तस्वीर पूरी करते हैं।</p>

<h2>ग्रह और काम के क्षेत्र</h2>
<ul>
<li><strong>सूर्य:</strong> सरकार, प्रशासन, नेतृत्व।</li>
<li><strong>चंद्र:</strong> जनसंपर्क, आतिथ्य, देखभाल, यात्रा।</li>
<li><strong>मंगल:</strong> इंजीनियरिंग, पुलिस, सेना, ज़मीन, सर्जरी, खेल।</li>
<li><strong>बुध:</strong> व्यापार, अकाउंट, लेखन, IT, संचार।</li>
<li><strong>गुरु:</strong> शिक्षण, क़ानून, वित्त, सलाह, धर्म।</li>
<li><strong>शुक्र:</strong> कला, फ़ैशन, मीडिया, विलासिता, आतिथ्य।</li>
<li><strong>शनि:</strong> उद्योग, श्रम, निर्माण, लंबी सेवा।</li>
<li><strong>राहु:</strong> टेक्नोलॉजी, विदेशी कंपनियाँ, अलग तरह के क्षेत्र।</li>
</ul>
<p>ये प्रवृत्तियाँ हैं, पक्के नियम नहीं — फ़ैसला पूरी कुंडली करती है।</p>

<h2>नौकरी या व्यापार?</h2>
<p>मज़बूत सप्तम भाव (दूसरों से लेन-देन) और ग्यारहवाँ भाव, साथ में बुध या अच्छी स्थिति वाला दशमेश, अक्सर व्यापार का समर्थन करते हैं। मज़बूत छठा भाव और दशम से जुड़े शनि अक्सर स्थिर नौकरी की ओर इशारा करते हैं। कई कुंडलियाँ अलग-अलग समय पर दोनों का समर्थन करती हैं।</p>

<h2>दशमांश (D-10)</h2>
<p>दशमांश करियर की विभागीय कुंडली है। यह जन्म कुंडली की बात को और स्पष्ट करती है — ख़ासकर समय के साथ पद के उतार-चढ़ाव को।</p>

<h2>प्रमोशन और बदलाव का समय</h2>
<p>करियर की घटनाएँ दशम, छठे और ग्यारहवें भाव से जुड़े ग्रहों की दशा में आती हैं, और शनि-गुरु के गोचर से सक्रिय होती हैं। देखें <a href="/blog/vimshottari-dasha-explained">दशा कैसे काम करती है</a>। किसी एक सवाल — “क्या मुझे यह नौकरी मिलेगी?” — के लिए <a href="/kp-prashna">केपी प्रश्न</a> अक्सर सबसे तेज़ उत्तर है।</p>

<h2>उपाय</h2>
<p>दशमेश या सहायक ग्रह को मज़बूत करना — उसके मंत्र, दान से, और केवल जहाँ कुंडली के अनुकूल हो वहाँ रत्न से — पारंपरिक तरीका है। काम में बाधाओं के लिए <a href="/yantra-shop/sarva-karya-siddhi-yantra">सर्व कार्य सिद्धि यंत्र</a> अक्सर रखा जाता है।</p>

<p>पूरी करियर रीडिंग के लिए <a href="/vedic-astrology">वैदिक कुंडली परामर्श</a> बुक करें।</p>
`.trim(),
  },

  {
    slug: 'gemstones-in-astrology-how-to-choose',
    category: 'Vedic',
    title: 'Gemstones in Astrology: How to Choose the Right One Safely',
    titleHi: 'ज्योतिष में रत्न: सही रत्न सुरक्षित तरीके से कैसे चुनें',
    excerpt: 'The nine planetary gemstones, why a gemstone must suit your ascendant, trial and wearing rules, and cheaper alternatives.',
    excerptHi: 'नौ ग्रहों के रत्न, रत्न का लग्न के अनुकूल होना क्यों ज़रूरी है, आज़माने और पहनने के नियम, और सस्ते विकल्प।',
    seoTitle: 'Gemstones in Astrology: How to Choose Safely',
    metaDescription: 'Astrology gemstones explained: the nine planetary stones, why they must suit your ascendant, trial period, wearing day and finger, and safer alternatives.',
    content: `
<p>Gemstones are among the most popular — and most misused — remedies in Indian astrology. A well-chosen stone can strengthen a helpful planet; a wrong one can strengthen a harmful planet. Here is how to approach them safely.</p>

<h2>The nine planetary gemstones</h2>
<table>
<thead><tr><th>Planet</th><th>Gemstone</th><th>Usual finger · day</th></tr></thead>
<tbody>
<tr><td>Sun</td><td>Ruby (Manik)</td><td>Ring finger · Sunday</td></tr>
<tr><td>Moon</td><td>Pearl (Moti)</td><td>Little finger · Monday</td></tr>
<tr><td>Mars</td><td>Red coral (Moonga)</td><td>Ring finger · Tuesday</td></tr>
<tr><td>Mercury</td><td>Emerald (Panna)</td><td>Little finger · Wednesday</td></tr>
<tr><td>Jupiter</td><td>Yellow sapphire (Pukhraj)</td><td>Index finger · Thursday</td></tr>
<tr><td>Venus</td><td>Diamond (Heera) / white sapphire</td><td>Middle or ring finger · Friday</td></tr>
<tr><td>Saturn</td><td>Blue sapphire (Neelam)</td><td>Middle finger · Saturday</td></tr>
<tr><td>Rahu</td><td>Hessonite (Gomed)</td><td>Middle finger · Saturday</td></tr>
<tr><td>Ketu</td><td>Cat’s eye (Lehsunia)</td><td>Middle or little finger · Tuesday/Saturday</td></tr>
</tbody>
</table>

<h2>The most important rule: your ascendant</h2>
<p>A gemstone <strong>strengthens</strong> its planet — it does not “fix” it. So it should be worn only for a planet that is <strong>favourable for your ascendant</strong> (for example the lord of the ascendant, the 5th or 9th house). Wearing the stone of a planet that rules difficult houses for you can make things worse. Your sun sign or Moon sign alone is not enough to choose a stone.</p>

<h2>Strong stones need care</h2>
<p>Blue sapphire, hessonite and cat’s eye act quickly and strongly. Traditionally they are tried for a few days first — kept under the pillow or worn briefly — and removed if sleep, health or events turn bad.</p>

<h2>Quality and wearing</h2>
<ul>
<li>Natural, untreated stones with a lab certificate; weight is usually suggested in carats or ratti.</li>
<li>Set so the stone touches the skin, in the metal advised for that planet.</li>
<li>Worn on the planet’s day and hora after washing in Ganga jal or raw milk and reciting its mantra.</li>
</ul>

<h2>Safer, cheaper alternatives</h2>
<p>Mantra, charity, fasting, service and an energized yantra strengthen a planet without the risk of a wrong stone. See <a href="/blog/navgrah-shanti-remedies-nine-planets">Navgrah shanti remedies</a> and the <a href="/yantra-shop">yantra shop</a>.</p>

<p>Before buying any gemstone, have your chart checked in a <a href="/vedic-astrology">Vedic birth chart consultation</a>.</p>
`.trim(),
    contentHi: `
<p>रत्न भारतीय ज्योतिष के सबसे लोकप्रिय — और सबसे ज़्यादा गलत इस्तेमाल होने वाले — उपायों में से हैं। सही चुना रत्न सहायक ग्रह को मज़बूत कर सकता है; गलत रत्न हानिकारक ग्रह को मज़बूत कर सकता है। जानिए इन्हें सुरक्षित तरीके से कैसे चुनें।</p>

<h2>नौ ग्रहों के रत्न</h2>
<table>
<thead><tr><th>ग्रह</th><th>रत्न</th><th>सामान्य उँगली · दिन</th></tr></thead>
<tbody>
<tr><td>सूर्य</td><td>माणिक</td><td>अनामिका · रविवार</td></tr>
<tr><td>चंद्र</td><td>मोती</td><td>कनिष्ठा · सोमवार</td></tr>
<tr><td>मंगल</td><td>मूँगा</td><td>अनामिका · मंगलवार</td></tr>
<tr><td>बुध</td><td>पन्ना</td><td>कनिष्ठा · बुधवार</td></tr>
<tr><td>गुरु</td><td>पुखराज</td><td>तर्जनी · गुरुवार</td></tr>
<tr><td>शुक्र</td><td>हीरा / सफ़ेद पुखराज</td><td>मध्यमा या अनामिका · शुक्रवार</td></tr>
<tr><td>शनि</td><td>नीलम</td><td>मध्यमा · शनिवार</td></tr>
<tr><td>राहु</td><td>गोमेद</td><td>मध्यमा · शनिवार</td></tr>
<tr><td>केतु</td><td>लहसुनिया</td><td>मध्यमा या कनिष्ठा · मंगलवार/शनिवार</td></tr>
</tbody>
</table>

<h2>सबसे ज़रूरी नियम: आपका लग्न</h2>
<p>रत्न अपने ग्रह को <strong>मज़बूत</strong> करता है — उसे “ठीक” नहीं करता। इसलिए रत्न केवल उसी ग्रह का पहनना चाहिए जो <strong>आपके लग्न के लिए शुभ</strong> हो (जैसे लग्नेश, पंचमेश या नवमेश)। जो ग्रह आपके लिए कठिन भावों का स्वामी है, उसका रत्न पहनने से स्थिति बिगड़ सकती है। सिर्फ़ सूर्य राशि या चंद्र राशि से रत्न चुनना काफ़ी नहीं।</p>

<h2>प्रबल रत्नों में सावधानी</h2>
<p>नीलम, गोमेद और लहसुनिया तेज़ी से और प्रबल असर करते हैं। परंपरा से इन्हें पहले कुछ दिन आज़माया जाता है — तकिए के नीचे रखकर या थोड़े समय पहनकर — और नींद, स्वास्थ्य या घटनाएँ बिगड़ें तो उतार दिया जाता है।</p>

<h2>गुणवत्ता और पहनना</h2>
<ul>
<li>प्राकृतिक, बिना ट्रीटमेंट वाले रत्न, लैब सर्टिफ़िकेट के साथ; वज़न आमतौर पर कैरेट या रत्ती में बताया जाता है।</li>
<li>रत्न ऐसे जड़ा हो कि त्वचा को छुए, और उस ग्रह के लिए बताई गई धातु में।</li>
<li>ग्रह के दिन और होरा में, गंगाजल या कच्चे दूध से धोकर और उसका मंत्र जपकर पहनें।</li>
</ul>

<h2>सुरक्षित और सस्ते विकल्प</h2>
<p>मंत्र, दान, व्रत, सेवा और प्राण-प्रतिष्ठित यंत्र, गलत रत्न के जोखिम के बिना ग्रह को मज़बूत करते हैं। देखें <a href="/blog/navgrah-shanti-remedies-nine-planets">नवग्रह शांति के उपाय</a> और <a href="/yantra-shop">यंत्र शॉप</a>।</p>

<p>कोई भी रत्न ख़रीदने से पहले <a href="/vedic-astrology">वैदिक कुंडली परामर्श</a> में अपनी कुंडली दिखाएँ।</p>
`.trim(),
  },

  {
    slug: 'rahu-ketu-meaning-effects-remedies',
    category: 'Vedic',
    title: 'Rahu and Ketu: Meaning, Effects and Remedies',
    titleHi: 'राहु और केतु: अर्थ, प्रभाव और उपाय',
    excerpt: 'What the shadow planets are, how Rahu and Ketu act in your chart and their dashas, and simple remedies for both.',
    excerptHi: 'छाया ग्रह क्या हैं, राहु और केतु कुंडली और अपनी दशा में कैसे काम करते हैं, और दोनों के सरल उपाय।',
    seoTitle: 'Rahu and Ketu in Astrology: Meaning & Remedies',
    metaDescription: 'Rahu and Ketu explained: the shadow planets and lunar nodes, their effects by house, Rahu and Ketu mahadasha, transit every 18 months, and simple remedies.',
    content: `
<p>Rahu and Ketu are called <strong>chhaya grahas</strong> — shadow planets. They are not physical bodies but the two points where the Moon’s path crosses the Sun’s path (the lunar nodes). Eclipses happen near them, which is why they are linked with sudden, intense events.</p>

<h2>The story</h2>
<p>In the Puranas, the demon Svarbhanu drank the nectar of immortality during the churning of the ocean. Lord Vishnu cut off his head with the Sudarshan chakra, but he had already become immortal: the head became Rahu and the body Ketu. They are always exactly opposite each other in the chart.</p>

<h2>What they signify</h2>
<ul>
<li><strong>Rahu</strong> — desire, ambition, the new and foreign, technology, sudden rise, confusion and obsession. It magnifies the house it sits in.</li>
<li><strong>Ketu</strong> — detachment, spirituality, past-life skills, research, sudden loss or separation. It cuts away from the house it sits in.</li>
</ul>
<p>Together they show the axis of this life: Rahu what we are drawn towards, Ketu what we already know and must let go.</p>

<h2>Rahu and Ketu dashas</h2>
<p>Rahu’s mahadasha lasts <strong>18 years</strong> and Ketu’s <strong>7 years</strong>. Rahu dasha often brings big changes, foreign travel, new fields and rapid rise — with restlessness. Ketu dasha often turns a person inward, towards spirituality, with breaks from the past. The results depend on their houses, the sign lords and conjunctions in your chart. See <a href="/blog/vimshottari-dasha-explained">Vimshottari dasha</a>.</p>

<h2>Transit</h2>
<p>Rahu and Ketu move backwards through the zodiac and change signs about every <strong>18 months</strong>. Their transit over the Moon, the ascendant or the 7th house is felt strongly.</p>

<h2>Remedies</h2>
<ul>
<li><strong>Rahu:</strong> Durga or Bhairav worship, “ॐ रां राहवे नमः”, feeding birds, and honesty in dealings.</li>
<li><strong>Ketu:</strong> Ganesha worship, “ॐ कें केतवे नमः”, feeding dogs, and charity of blankets.</li>
<li>When all planets fall between them, see <a href="/blog/kaal-sarp-dosh-meaning-types-remedies">Kaal Sarp dosh</a>.</li>
</ul>
<p>Gomed and cat’s eye are strong stones — never wear them without a careful chart reading. Book a <a href="/vedic-astrology">Vedic birth chart consultation</a> to see how Rahu and Ketu work in your chart.</p>
`.trim(),
    contentHi: `
<p>राहु और केतु को <strong>छाया ग्रह</strong> कहा जाता है। ये भौतिक पिंड नहीं, बल्कि वे दो बिंदु हैं जहाँ चंद्र का मार्ग सूर्य के मार्ग को काटता है (चंद्र पात)। ग्रहण इन्हीं के पास होते हैं, इसीलिए इन्हें अचानक और तीव्र घटनाओं से जोड़ा जाता है।</p>

<h2>कथा</h2>
<p>पुराणों में, समुद्र मंथन के समय असुर स्वर्भानु ने अमृत पी लिया। भगवान विष्णु ने सुदर्शन चक्र से उसका सिर काट दिया, पर वह अमर हो चुका था: सिर राहु बना और धड़ केतु। कुंडली में ये हमेशा एक-दूसरे के ठीक सामने होते हैं।</p>

<h2>ये क्या दर्शाते हैं</h2>
<ul>
<li><strong>राहु</strong> — इच्छा, महत्वाकांक्षा, नया और विदेशी, टेक्नोलॉजी, अचानक उन्नति, भ्रम और जुनून। जिस भाव में बैठता है उसे बढ़ा देता है।</li>
<li><strong>केतु</strong> — वैराग्य, आध्यात्म, पूर्व जन्म के कौशल, शोध, अचानक हानि या अलगाव। जिस भाव में बैठता है उससे दूर करता है।</li>
</ul>
<p>साथ में ये इस जीवन की धुरी दिखाते हैं: राहु वह जिसकी ओर हम खिंचते हैं, केतु वह जो हम पहले से जानते हैं और जिसे छोड़ना है।</p>

<h2>राहु और केतु की दशा</h2>
<p>राहु की महादशा <strong>18 साल</strong> और केतु की <strong>7 साल</strong> की होती है। राहु की दशा अक्सर बड़े बदलाव, विदेश यात्रा, नए क्षेत्र और तेज़ उन्नति लाती है — बेचैनी के साथ। केतु की दशा अक्सर व्यक्ति को भीतर की ओर, आध्यात्म की ओर ले जाती है, अतीत से अलगाव के साथ। परिणाम आपकी कुंडली में इनके भाव, राशि स्वामी और युति पर निर्भर करते हैं। देखें <a href="/blog/vimshottari-dasha-explained">विंशोत्तरी दशा</a>।</p>

<h2>गोचर</h2>
<p>राहु और केतु राशिचक्र में उल्टी दिशा में चलते हैं और लगभग हर <strong>18 महीने</strong> में राशि बदलते हैं। चंद्र, लग्न या सप्तम भाव पर इनका गोचर ज़ोरदार असर करता है।</p>

<h2>उपाय</h2>
<ul>
<li><strong>राहु:</strong> दुर्गा या भैरव पूजा, “ॐ रां राहवे नमः”, पक्षियों को दाना, और लेन-देन में ईमानदारी।</li>
<li><strong>केतु:</strong> गणेश पूजा, “ॐ कें केतवे नमः”, कुत्तों को भोजन, और कंबल का दान।</li>
<li>जब सारे ग्रह इनके बीच हों, तो देखें <a href="/blog/kaal-sarp-dosh-meaning-types-remedies">काल सर्प दोष</a>।</li>
</ul>
<p>गोमेद और लहसुनिया प्रबल रत्न हैं — कुंडली को ध्यान से देखे बिना कभी न पहनें। अपनी कुंडली में राहु-केतु का असर जानने के लिए <a href="/vedic-astrology">वैदिक कुंडली परामर्श</a> बुक करें।</p>
`.trim(),
  },
];
