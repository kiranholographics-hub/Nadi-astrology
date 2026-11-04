// Ready-to-publish text for the 4 starter blog posts (English + Hindi), written for SEO:
// one main keyword per article, H2/H3 structure, internal links to the service pages.
// They are filled into the drafts on server start (only while a draft still has the
// placeholder text), and stay DRAFTS — read them in /admin/blog, adjust, then publish.

export const blogArticles = {
  'what-is-nadi-astrology': {
    seoTitle: 'What is Nadi Astrology? How Your Palm Leaf is Found',
    metaDescription: 'Nadi astrology explained: how your palm leaf is found from a thumb impression, what the 16 kandams cover, and how a reading works in Jaipur or online.',
    content: `
<p><strong>Nadi astrology</strong> (Nadi Jyotish) is one of the most unusual forms of Indian astrology. Instead of drawing a fresh birth chart, the Nadi reader searches for an old palm leaf that is believed to have been written about you long ago — and then reads your life from it. This article explains, in plain words, what Nadi astrology is, how your leaf is found, and what you can expect from a reading.</p>

<h2>The origin of Nadi astrology</h2>
<p>According to tradition, great sages such as Agastya, Kaushika, Vasishta and Bhrigu saw the lives of people who would come to them in the future and wrote them down on palm leaves (<em>taada patra</em>) in an old form of Tamil. Over the centuries the leaves were copied, preserved and passed on within families of Nadi readers in Tamil Nadu. The best-known centre is <a href="/blog/vaitheeswaran-koil-nadi-tradition">Vaitheeswaran Koil</a>, a temple town near Chidambaram.</p>
<p>The word <em>nadi</em> is usually explained as “to search” — because the heart of a reading is searching for the one leaf that belongs to you.</p>

<h2>How is your leaf found?</h2>
<p>A Nadi leaf is not found from your date of birth. It is found from your <strong>thumb impression</strong>:</p>
<ol>
<li><strong>Thumb impression</strong> — men give the right thumb, women the left thumb. The leaves are sorted into bundles according to thumb-print patterns.</li>
<li><strong>Yes / no questions</strong> — the reader takes the matching bundle and reads short statements from each leaf: “Your father’s name begins with…”, “You have two siblings…”. You answer only <em>yes</em> or <em>no</em>.</li>
<li><strong>The leaf is confirmed</strong> — when a leaf matches every statement, including your name and your parents’ names, it is your leaf. This can take one sitting or a few days.</li>
</ol>
<p>Because the search uses the thumb impression, <strong>you do not need a birth chart or birth time</strong>. This is one reason people who do not know their exact time of birth come to Nadi astrology.</p>

<h2>The 16 kandams (chapters)</h2>
<p>Once the leaf is found, it is read in chapters called <em>kandams</em>. The first kandam gives a summary of your whole life; the others go deeper into one area each:</p>
<ul>
<li>Kandam 1 — general life summary</li>
<li>Kandam 2 — family, wealth, education</li>
<li>Kandam 7 — marriage and life partner</li>
<li>Kandam 10 — career, job and business</li>
<li>Kandam 12 — expenses, foreign travel, settling abroad</li>
<li>Kandam 13 (Shanti) — past-life karma and remedies</li>
</ul>
<p>There are 16 kandams in all, including health, children, property, longevity and planetary periods (dasa-bhukti). See the full list on the <a href="/nadi-astrology">Nadi astrology page</a>.</p>

<h2>What does Pandit ji add to the reading?</h2>
<p>The leaf is read by traditional Nadi readers. Pt. Rajneesh Sharma, a Vedic and KP astrologer in Jaipur, then studies what the leaf says alongside your <a href="/vedic-astrology">birth chart</a> and the dasha you are running now. This turns a reading into practical guidance: which period is favourable, which remedies to do first, and whether a yantra or pooja will help.</p>

<h2>Online Nadi reading or office visit?</h2>
<p>Both follow the same process. At the Jaipur office you give your thumb impression in person. For an <strong>online Nadi reading</strong> you upload a clear photo of the thumb impression, and you join the reading on a video call — answering the yes/no questions live, with translation into Hindi or English. You receive the recording either way.</p>

<h2>Is a leaf found for everyone?</h2>
<p>No. Not every person has a leaf, and an honest Nadi reader will tell you so. That is why it is important to know the refund policy before you book.</p>

<h2>Book a Nadi reading</h2>
<p>If you would like your leaf searched, you can <a href="/book?service=nadi-general-2-kandam">book a Nadi reading online</a> or visit the office in Jaipur. Send your thumb impression and details, and we will guide you through each step.</p>
`.trim(),
    contentHi: `
<p><strong>नाड़ी ज्योतिष</strong> भारतीय ज्योतिष का एक अनोखा रूप है। इसमें नई कुंडली बनाने की बजाय नाड़ी रीडर एक पुराना ताड़-पत्र खोजते हैं, जिसके बारे में माना जाता है कि वह बहुत पहले आपके लिए लिखा गया था — और फिर उसी से आपका जीवन पढ़ा जाता है। इस लेख में सरल भाषा में समझिए कि नाड़ी ज्योतिष क्या है, आपका पट्टा कैसे मिलता है, और रीडिंग में क्या होता है।</p>

<h2>नाड़ी ज्योतिष की उत्पत्ति</h2>
<p>परंपरा के अनुसार अगस्त्य, कौशिक, वशिष्ठ और भृगु जैसे ऋषियों ने भविष्य में आने वाले लोगों का जीवन देखकर उसे पुरानी तमिल में ताड़-पत्रों पर लिखा। सदियों तक ये पत्र तमिलनाडु के नाड़ी रीडर परिवारों में नकल किए गए, सँभाले गए और पीढ़ी-दर-पीढ़ी आगे बढ़े। इसका सबसे प्रसिद्ध केंद्र चिदंबरम के पास स्थित मंदिर नगर <a href="/blog/vaitheeswaran-koil-nadi-tradition">वैथीश्वरन कोइल</a> है।</p>
<p>“नाड़ी” शब्द का अर्थ अक्सर “खोजना” बताया जाता है — क्योंकि रीडिंग का मूल काम उसी एक पत्र को खोजना है जो आपका है।</p>

<h2>आपका पट्टा कैसे मिलता है?</h2>
<p>नाड़ी पट्टा जन्म तिथि से नहीं, बल्कि <strong>अंगूठे के निशान</strong> से खोजा जाता है:</p>
<ol>
<li><strong>अंगूठे का निशान</strong> — पुरुष दायाँ और महिलाएँ बायाँ अंगूठा देती हैं। पत्र अंगूठे की रेखाओं के प्रकार के अनुसार गड्डियों में बँटे होते हैं।</li>
<li><strong>हाँ / ना वाले प्रश्न</strong> — रीडर मिलती-जुलती गड्डी लेकर हर पत्र से छोटे वाक्य पढ़ते हैं: “आपके पिता का नाम … से शुरू होता है”, “आपके दो भाई-बहन हैं”। आप सिर्फ़ <em>हाँ</em> या <em>ना</em> कहते हैं।</li>
<li><strong>पट्टे की पुष्टि</strong> — जब कोई पत्र हर बात से मेल खाता है, आपके और माता-पिता के नाम सहित, तो वही आपका पट्टा है। इसमें एक बैठक या कुछ दिन लग सकते हैं।</li>
</ol>
<p>चूँकि खोज अंगूठे के निशान से होती है, इसलिए <strong>कुंडली या जन्म समय की ज़रूरत नहीं</strong>। यही कारण है कि जिन्हें अपना सही जन्म समय नहीं पता, वे भी नाड़ी ज्योतिष की ओर आते हैं।</p>

<h2>16 कांडम (अध्याय)</h2>
<p>पट्टा मिलने के बाद उसे <em>कांडम</em> नाम के अध्यायों में पढ़ा जाता है। पहला कांडम पूरे जीवन का सार देता है; बाकी कांडम एक-एक विषय में गहराई से जाते हैं:</p>
<ul>
<li>कांडम 1 — जीवन का सामान्य सार</li>
<li>कांडम 2 — परिवार, धन, शिक्षा</li>
<li>कांडम 7 — विवाह और जीवनसाथी</li>
<li>कांडम 10 — करियर, नौकरी और व्यापार</li>
<li>कांडम 12 — खर्च, विदेश यात्रा, विदेश में बसना</li>
<li>कांडम 13 (शांति) — पूर्व जन्म के कर्म और उपाय</li>
</ul>
<p>कुल 16 कांडम हैं, जिनमें स्वास्थ्य, संतान, संपत्ति, आयु और दशा-भुक्ति भी शामिल हैं। पूरी सूची <a href="/nadi-astrology">नाड़ी ज्योतिष पेज</a> पर देखें।</p>

<h2>पंडित जी रीडिंग में क्या जोड़ते हैं?</h2>
<p>पट्टा पारंपरिक नाड़ी रीडर पढ़ते हैं। उसके बाद जयपुर के वैदिक और केपी ज्योतिषी पं. रजनीश शर्मा पट्टे की बातों को आपकी <a href="/vedic-astrology">कुंडली</a> और अभी चल रही दशा के साथ मिलाकर देखते हैं। इससे रीडिंग व्यावहारिक मार्गदर्शन बन जाती है: कौन-सा समय अनुकूल है, पहले कौन-से उपाय करें, और क्या कोई यंत्र या पूजा मदद करेगी।</p>

<h2>ऑनलाइन नाड़ी रीडिंग या ऑफिस विज़िट?</h2>
<p>दोनों की प्रक्रिया एक ही है। जयपुर ऑफिस में आप खुद अंगूठे का निशान देते हैं। <strong>ऑनलाइन नाड़ी रीडिंग</strong> में आप अंगूठे के निशान की साफ़ फोटो अपलोड करते हैं और वीडियो कॉल पर रीडिंग में जुड़ते हैं — हाँ/ना वाले प्रश्नों का जवाब लाइव देते हैं, हिंदी या अंग्रेज़ी अनुवाद के साथ। दोनों में रिकॉर्डिंग मिलती है।</p>

<h2>क्या हर किसी का पट्टा मिलता है?</h2>
<p>नहीं। हर व्यक्ति का पट्टा होना ज़रूरी नहीं, और एक ईमानदार नाड़ी रीडर यह साफ़ बताएगा। इसलिए बुकिंग से पहले रिफंड नीति जान लेना ज़रूरी है।</p>

<h2>नाड़ी रीडिंग बुक करें</h2>
<p>अगर आप अपना पट्टा खुलवाना चाहते हैं, तो <a href="/book?service=nadi-general-2-kandam">ऑनलाइन नाड़ी रीडिंग बुक करें</a> या जयपुर ऑफिस आएँ। अंगूठे का निशान और जानकारी भेजें, हम हर चरण में आपका मार्गदर्शन करेंगे।</p>
`.trim(),
  },

  'vaitheeswaran-koil-nadi-tradition': {
    seoTitle: 'Vaitheeswaran Koil Nadi Astrology: History & Tradition',
    metaDescription: 'Why Vaitheeswaran Koil in Tamil Nadu is the home of Nadi astrology: the temple, the families of Nadi readers, the palm leaves, and how to get a reading online.',
    content: `
<p>When people speak of <strong>Nadi astrology</strong>, one place comes up again and again: <strong>Vaitheeswaran Koil</strong>. This small temple town in Tamil Nadu is known across India — and among Indians abroad — as the home of the Nadi palm leaf tradition. Here is the background.</p>

<h2>Where is Vaitheeswaran Koil?</h2>
<p>Vaitheeswaran Koil is in the Mayiladuthurai district of Tamil Nadu, a short distance from Chidambaram and Sirkazhi. The town grew around the ancient Vaidyanatha Swamy temple, dedicated to Lord Shiva as <em>Vaidyanathan</em> — “the Lord of healing”. Devotees come here to pray for relief from illness.</p>

<h2>A temple of the planets</h2>
<p>The temple is also one of the nine Navagraha temples of Tamil Nadu; it is associated with <strong>Angaraka (Mars)</strong>. Because of this link with the planets, the town has long been a natural centre for astrology — and in particular for the Nadi readers.</p>

<h2>The families of Nadi readers</h2>
<p>The palm leaves are kept by families who have read them for generations. The leaves are written in an old form of Tamil verse, which takes years of training to read. Different families hold different “Nadis”, named after the sage believed to have written them — Agastya Nadi, Kaushika Nadi, Shiva Nadi and others.</p>
<p>Many of the leaves have been copied again and again as the older ones became brittle. That is part of the tradition: the content is preserved, the leaf is renewed.</p>

<h2>What happens in a reading</h2>
<p>The process is the same whether you travel to Tamil Nadu or take a reading online: your thumb impression is used to pick the right bundle, the reader asks yes/no questions until your own leaf is found, and then the kandams (chapters) are read. Read the step-by-step guide in <a href="/blog/what-is-nadi-astrology">What is Nadi astrology?</a></p>

<h2>Do you need to travel to Vaitheeswaran Koil?</h2>
<p>Not any more. Readers trained in the Vaitheeswaran Koil tradition now also read leaves for clients who cannot travel — including those living in the USA, UK, Canada, Australia and the Gulf. You give your thumb impression at our Jaipur office or upload a photo, and the reading happens on a video call with translation.</p>
<p>What we add is interpretation: after the leaf is read, Pt. Rajneesh Sharma studies it with your Vedic/KP birth chart, so the remedies and timing are clear and practical.</p>

<h2>A note of caution</h2>
<p>Because the name is well known, not everyone using “Vaitheeswaran Koil” is a genuine reader. Before you book anywhere, ask who reads the leaf, in which language, whether you get the recording, and what happens if no leaf is found.</p>

<p>Learn more on our <a href="/nadi-astrology">Nadi astrology page</a>, or <a href="/book?service=nadi-general-2-kandam">book a Nadi reading</a>.</p>
`.trim(),
    contentHi: `
<p>जब <strong>नाड़ी ज्योतिष</strong> की बात होती है, तो एक जगह का नाम बार-बार आता है: <strong>वैथीश्वरन कोइल</strong>। तमिलनाडु का यह छोटा मंदिर नगर पूरे भारत में — और विदेश में बसे भारतीयों में भी — नाड़ी ताड़-पत्र परंपरा के घर के रूप में जाना जाता है। पढ़िए इसकी पृष्ठभूमि।</p>

<h2>वैथीश्वरन कोइल कहाँ है?</h2>
<p>वैथीश्वरन कोइल तमिलनाडु के मयिलादुथुरै ज़िले में, चिदंबरम और सिरकाज़ी से थोड़ी दूरी पर है। यह नगर प्राचीन वैद्यनाथ स्वामी मंदिर के चारों ओर बसा है, जो भगवान शिव को <em>वैद्यनाथन</em> — “रोगों को दूर करने वाले” — के रूप में समर्पित है। श्रद्धालु यहाँ रोगों से मुक्ति के लिए प्रार्थना करने आते हैं।</p>

<h2>ग्रहों का मंदिर</h2>
<p>यह मंदिर तमिलनाडु के नौ नवग्रह मंदिरों में से भी एक है; इसका संबंध <strong>अंगारक (मंगल)</strong> से है। ग्रहों से इसी जुड़ाव के कारण यह नगर लंबे समय से ज्योतिष का — और ख़ास तौर पर नाड़ी रीडर्स का — स्वाभाविक केंद्र रहा है।</p>

<h2>नाड़ी रीडर्स के परिवार</h2>
<p>ताड़-पत्र उन परिवारों के पास हैं जो पीढ़ियों से इन्हें पढ़ते आए हैं। पत्र पुरानी तमिल पद्य शैली में लिखे हैं, जिन्हें पढ़ना सीखने में वर्षों लगते हैं। अलग-अलग परिवारों के पास अलग-अलग “नाड़ी” हैं, जिनका नाम उस ऋषि पर है जिन्होंने उन्हें लिखा माना जाता है — अगस्त्य नाड़ी, कौशिक नाड़ी, शिव नाड़ी आदि।</p>
<p>पुराने पत्र भुरभुरे होने पर कई पत्रों की बार-बार नकल की गई है। यह भी परंपरा का हिस्सा है: विषय सुरक्षित रहता है, पत्र नया होता है।</p>

<h2>रीडिंग में क्या होता है</h2>
<p>चाहे आप तमिलनाडु जाएँ या ऑनलाइन रीडिंग लें, प्रक्रिया एक ही है: अंगूठे के निशान से सही गड्डी चुनी जाती है, रीडर हाँ/ना वाले प्रश्न पूछते हैं जब तक आपका पट्टा न मिल जाए, फिर कांडम (अध्याय) पढ़े जाते हैं। पूरी प्रक्रिया <a href="/blog/what-is-nadi-astrology">नाड़ी ज्योतिष क्या है?</a> में पढ़ें।</p>

<h2>क्या वैथीश्वरन कोइल जाना ज़रूरी है?</h2>
<p>अब नहीं। वैथीश्वरन कोइल परंपरा में प्रशिक्षित रीडर अब उन लोगों के लिए भी पट्टे पढ़ते हैं जो यात्रा नहीं कर सकते — अमेरिका, ब्रिटेन, कनाडा, ऑस्ट्रेलिया और खाड़ी देशों में रहने वाले भी। आप जयपुर ऑफिस में अंगूठे का निशान दें या फोटो अपलोड करें, और रीडिंग अनुवाद के साथ वीडियो कॉल पर होती है।</p>
<p>हम इसमें विश्लेषण जोड़ते हैं: पट्टा पढ़े जाने के बाद पं. रजनीश शर्मा उसे आपकी वैदिक/केपी कुंडली के साथ देखते हैं, ताकि उपाय और समय साफ़ और व्यावहारिक हों।</p>

<h2>एक सावधानी</h2>
<p>नाम प्रसिद्ध होने के कारण “वैथीश्वरन कोइल” नाम लेने वाला हर व्यक्ति असली रीडर नहीं होता। कहीं भी बुक करने से पहले पूछें: पट्टा कौन पढ़ेगा, किस भाषा में, रिकॉर्डिंग मिलेगी या नहीं, और पट्टा न मिलने पर क्या होगा।</p>

<p>और जानें हमारे <a href="/nadi-astrology">नाड़ी ज्योतिष पेज</a> पर, या <a href="/book?service=nadi-general-2-kandam">नाड़ी रीडिंग बुक करें</a>।</p>
`.trim(),
  },

  'vastu-remedies-without-demolition': {
    seoTitle: 'Vastu Remedies Without Demolition: What to Do First',
    metaDescription: 'Vastu dosh remedies without demolition: what to fix first in the main door, kitchen, toilet and bedroom, and when structural change is really needed.',
    content: `
<p>The first fear most people have about Vastu is: <em>“Will I have to break walls?”</em> In most homes and offices the answer is no. Many Vastu doshas can be balanced <strong>without demolition</strong>. This article explains the order in which remedies are usually considered, and when a structural change really is needed.</p>

<h2>Step 1 — Find the real dosha first</h2>
<p>A remedy is only as good as the diagnosis. A correct Vastu analysis needs:</p>
<ul>
<li>an accurate floor plan,</li>
<li>the true North, measured with a compass on site (not the North on the builder’s drawing), and</li>
<li>in Astro-Vastu, the birth charts of the main family members.</li>
</ul>
<p>The same south-facing door can suit one family and trouble another. That is why we read the plan together with the charts — see <a href="/vastu-consultant-jaipur">Astro-Vastu consultation in Jaipur</a>.</p>

<h2>Step 2 — Change how the space is used</h2>
<p>Often the simplest remedy is to use a room differently:</p>
<ul>
<li>moving the master bedroom to the south-west,</li>
<li>shifting the cash locker to the south-west wall, opening towards the north,</li>
<li>clearing heavy storage out of the north-east,</li>
<li>keeping the centre of the house (Brahmasthan) open and uncluttered.</li>
</ul>
<p>These changes cost little and are often the most effective.</p>

<h2>Step 3 — Balance with colours, metals and elements</h2>
<p>Each zone belongs to one of the five elements. A dosha can often be reduced by adding the balancing element: specific colours on a wall, metal strips, a light, a plant or water feature in the right zone — and avoiding the element that clashes with it.</p>

<h2>Step 4 — Remedies for the most common doshas</h2>
<h3>Main door in a weak pada</h3>
<p>The entrance is the most important point. If it falls in an unfavourable pada, remedies such as a metal strip at the threshold, a change of door colour, or a protective symbol can be used before thinking of moving the door.</p>
<h3>Kitchen in the north-east</h3>
<p>If moving the kitchen is not possible, the position of the stove, the direction the cook faces, and colours can reduce the effect.</p>
<h3>Toilet in the north-east or centre</h3>
<p>This is one of the stronger doshas. Remedies include keeping the toilet closed, specific colours and materials, and correcting the zone around it.</p>

<h2>Step 5 — Energized yantras</h2>
<p>For doshas that cannot be changed physically, an energized Vastu yantra placed in the correct direction is a traditional remedy. Each yantra in our <a href="/yantra-shop">yantra shop</a> comes with an installation guide.</p>

<h2>When is demolition really needed?</h2>
<p>Only rarely — for example, when a large cut in the north-east or south-west corner seriously affects the health or finances of the family, or during new construction when it is cheap to correct the plan. If you are <em>building</em> a new home, a Vastu check before construction saves the most money.</p>

<h2>Get your plan checked</h2>
<p>You can send your floor plan for an <a href="/online-vastu-consultation">online Astro-Vastu report</a> from anywhere, or book a site visit in Jaipur. You receive a priority list: what to fix first, with remedies without demolition.</p>
`.trim(),
    contentHi: `
<p>वास्तु के बारे में ज़्यादातर लोगों का पहला डर होता है: <em>“क्या दीवारें तोड़नी पड़ेंगी?”</em> ज़्यादातर घरों और ऑफिस में जवाब है — नहीं। कई वास्तु दोष <strong>बिना तोड़-फोड़</strong> संतुलित किए जा सकते हैं। इस लेख में जानिए उपाय किस क्रम में देखे जाते हैं, और कब वास्तव में निर्माण में बदलाव ज़रूरी होता है।</p>

<h2>चरण 1 — पहले असली दोष पहचानें</h2>
<p>उपाय उतना ही अच्छा होता है जितनी सही जाँच। सही वास्तु विश्लेषण के लिए चाहिए:</p>
<ul>
<li>सही फ्लोर प्लान,</li>
<li>साइट पर कंपास से नापी गई असली उत्तर दिशा (बिल्डर के नक्शे वाली नहीं), और</li>
<li>एस्ट्रो-वास्तु में परिवार के मुख्य सदस्यों की कुंडलियाँ।</li>
</ul>
<p>एक ही दक्षिणमुखी द्वार किसी परिवार के लिए अच्छा और किसी के लिए परेशानी वाला हो सकता है। इसीलिए हम प्लान को कुंडलियों के साथ पढ़ते हैं — देखें <a href="/vastu-consultant-jaipur">जयपुर में एस्ट्रो-वास्तु परामर्श</a>।</p>

<h2>चरण 2 — जगह का उपयोग बदलें</h2>
<p>अक्सर सबसे आसान उपाय है कमरे का उपयोग बदलना:</p>
<ul>
<li>मुख्य शयनकक्ष को दक्षिण-पश्चिम में ले जाना,</li>
<li>तिजोरी को दक्षिण-पश्चिम दीवार पर रखना, जिसका दरवाज़ा उत्तर की ओर खुले,</li>
<li>उत्तर-पूर्व से भारी सामान हटाना,</li>
<li>घर का बीच का भाग (ब्रह्मस्थान) खुला और खाली रखना।</li>
</ul>
<p>इनमें खर्च कम है और ये अक्सर सबसे असरदार होते हैं।</p>

<h2>चरण 3 — रंग, धातु और तत्वों से संतुलन</h2>
<p>हर क्षेत्र पंचतत्वों में से किसी एक का होता है। सही क्षेत्र में संतुलन वाला तत्व जोड़कर — दीवार पर ख़ास रंग, धातु की पट्टी, रोशनी, पौधा या पानी — और विरोधी तत्व हटाकर अक्सर दोष कम किया जा सकता है।</p>

<h2>चरण 4 — आम दोषों के उपाय</h2>
<h3>कमज़ोर पद में मुख्य द्वार</h3>
<p>मुख्य द्वार सबसे महत्वपूर्ण बिंदु है। अगर यह अशुभ पद में है, तो द्वार बदलने से पहले चौखट पर धातु की पट्टी, दरवाज़े का रंग बदलना या रक्षा-चिह्न जैसे उपाय किए जा सकते हैं।</p>
<h3>उत्तर-पूर्व में रसोई</h3>
<p>अगर रसोई हटाना संभव न हो, तो चूल्हे की जगह, खाना बनाने वाले का मुख और रंगों से असर कम किया जा सकता है।</p>
<h3>उत्तर-पूर्व या बीच में शौचालय</h3>
<p>यह बड़े दोषों में से एक है। उपायों में शौचालय का दरवाज़ा बंद रखना, ख़ास रंग और सामग्री, और आसपास के क्षेत्र को ठीक करना शामिल है।</p>

<h2>चरण 5 — प्राण-प्रतिष्ठित यंत्र</h2>
<p>जिन दोषों को भौतिक रूप से बदला नहीं जा सकता, उनके लिए सही दिशा में रखा गया प्राण-प्रतिष्ठित वास्तु यंत्र एक पारंपरिक उपाय है। हमारी <a href="/yantra-shop">यंत्र शॉप</a> का हर यंत्र स्थापना गाइड के साथ आता है।</p>

<h2>तोड़-फोड़ कब वास्तव में ज़रूरी है?</h2>
<p>बहुत कम — जैसे जब उत्तर-पूर्व या दक्षिण-पश्चिम कोने में बड़ा कटाव परिवार के स्वास्थ्य या धन पर गंभीर असर डाल रहा हो, या नए निर्माण के समय जब नक्शा ठीक करना सस्ता हो। अगर आप नया घर <em>बना</em> रहे हैं, तो निर्माण से पहले वास्तु जाँच सबसे ज़्यादा पैसे बचाती है।</p>

<h2>अपना प्लान जँचवाएँ</h2>
<p>आप कहीं से भी <a href="/online-vastu-consultation">ऑनलाइन एस्ट्रो-वास्तु रिपोर्ट</a> के लिए फ्लोर प्लान भेज सकते हैं, या जयपुर में साइट विज़िट बुक कर सकते हैं। आपको प्राथमिकता सूची मिलती है: पहले क्या ठीक करें, बिना तोड़-फोड़ वाले उपायों के साथ।</p>
`.trim(),
  },

  'kp-prashna-number-1-249': {
    seoTitle: 'KP Prashna Number 1–249: Horary Astrology Explained',
    metaDescription: 'How KP Prashna (horary astrology) answers one question with a number from 1 to 249 — no birth time needed. What to ask, how timing is given, and how to book.',
    content: `
<p>“Will I get this job?” “When will my visa come?” “Is this the right person to marry?” When you have <strong>one clear question</strong>, a full birth chart reading is not always the fastest route. <strong>KP Prashna</strong> — horary astrology in the Krishnamurti Paddhati system — answers a single question from a number you choose between 1 and 249.</p>

<h2>What is KP astrology?</h2>
<p>KP (Krishnamurti Paddhati) is a system of astrology developed by Prof. K. S. Krishnamurti in the 20th century. It divides each zodiac sign further into <em>sub-lords</em>, which makes it very precise for answering yes/no questions and for timing events.</p>

<h2>Why the numbers 1 to 249?</h2>
<p>In KP, the zodiac is divided into 249 parts based on the star (nakshatra) and sub-lord. Each number from 1 to 249 corresponds to one of these parts. When you think of your question and say a number, that number fixes the Ascendant of the horary (prashna) chart, cast for the moment and place the question is judged.</p>
<p>This is why <strong>KP Prashna does not need your birth time</strong> — the chart is built from the number and the moment, not from your birth.</p>

<h2>How to ask a good question</h2>
<ul>
<li><strong>One question at a time.</strong> “Will I get the job at company X?” — not “Tell me about my career”.</li>
<li><strong>Ask sincerely,</strong> about something that truly matters to you now.</li>
<li><strong>Do not repeat</strong> the same question with a new number if you do not like the answer.</li>
<li>Think of the question, then say the <strong>first number</strong> that comes to mind between 1 and 249.</li>
</ul>

<h2>What kind of answer do you get?</h2>
<p>KP Prashna gives two things: <strong>whether</strong> the matter will happen (based on the sub-lord of the relevant house), and <strong>when</strong> (based on the dasha and the ruling planets). For example: the job will come through, most likely in a period of a few weeks, with the factors that may delay it.</p>

<h2>Questions KP Prashna suits well</h2>
<ul>
<li>Job, promotion or transfer</li>
<li>Visa, travel or settlement abroad</li>
<li>Marriage — whether and when; a specific proposal</li>
<li>Property purchase or sale</li>
<li>Court case or a recovery of money</li>
<li>Lost items, a missing person or pet</li>
</ul>
<p>For a broader view of life — career direction, overall marriage prospects, long-term planning — a <a href="/vedic-astrology">Vedic birth chart consultation</a> is the better choice. For matching before marriage, see <a href="/kundli-milan">Kundli Milan</a>.</p>

<h2>How a KP Prashna session works</h2>
<p>You book a 20–30 minute call, state your question and give your number. Pt. Rajneesh Sharma casts the prashna chart, explains the answer and the likely timing, and suggests a simple remedy if needed. You can do it from anywhere in the world — <a href="/kp-prashna">book a KP Prashna</a>.</p>
`.trim(),
    contentHi: `
<p>“क्या मुझे यह नौकरी मिलेगी?” “वीज़ा कब आएगा?” “क्या इसी व्यक्ति से शादी करना ठीक है?” जब आपके पास <strong>एक साफ़ सवाल</strong> हो, तो पूरी कुंडली देखना हमेशा सबसे तेज़ रास्ता नहीं होता। <strong>केपी प्रश्न</strong> — कृष्णमूर्ति पद्धति का प्रश्न ज्योतिष — 1 से 249 के बीच आपके चुने नंबर से एक सवाल का जवाब देता है।</p>

<h2>केपी ज्योतिष क्या है?</h2>
<p>केपी (कृष्णमूर्ति पद्धति) 20वीं सदी में प्रो. के. एस. कृष्णमूर्ति द्वारा विकसित ज्योतिष पद्धति है। इसमें हर राशि को आगे <em>उप-स्वामियों (सब-लॉर्ड)</em> में बाँटा जाता है, जिससे हाँ/ना वाले सवालों और घटनाओं का समय बताने में यह बहुत सटीक होती है।</p>

<h2>1 से 249 नंबर ही क्यों?</h2>
<p>केपी में राशिचक्र को नक्षत्र और सब-लॉर्ड के आधार पर 249 भागों में बाँटा जाता है। 1 से 249 तक का हर नंबर इनमें से एक भाग से जुड़ा है। जब आप सवाल मन में रखकर एक नंबर बोलते हैं, तो वही नंबर प्रश्न कुंडली का लग्न तय करता है, जो सवाल देखे जाने के समय और स्थान पर बनाई जाती है।</p>
<p>इसीलिए <strong>केपी प्रश्न में जन्म समय की ज़रूरत नहीं होती</strong> — कुंडली नंबर और उस पल से बनती है, जन्म से नहीं।</p>

<h2>अच्छा सवाल कैसे पूछें</h2>
<ul>
<li><strong>एक बार में एक सवाल।</strong> “क्या मुझे कंपनी X में नौकरी मिलेगी?” — न कि “मेरे करियर के बारे में बताइए”।</li>
<li><strong>सच्चे मन से पूछें,</strong> ऐसी बात जो अभी आपके लिए सच में मायने रखती हो।</li>
<li>जवाब पसंद न आए तो वही सवाल नए नंबर से <strong>दोबारा न पूछें</strong>।</li>
<li>सवाल मन में रखें, फिर 1 से 249 के बीच जो <strong>पहला नंबर</strong> मन में आए, वह बोलें।</li>
</ul>

<h2>किस तरह का जवाब मिलता है?</h2>
<p>केपी प्रश्न दो बातें बताता है: काम <strong>होगा या नहीं</strong> (संबंधित भाव के सब-लॉर्ड से), और <strong>कब होगा</strong> (दशा और रूलिंग प्लैनेट्स से)। जैसे: नौकरी मिलेगी, संभवतः कुछ हफ़्तों के भीतर, और किन कारणों से देरी हो सकती है।</p>

<h2>किन सवालों के लिए केपी प्रश्न अच्छा है</h2>
<ul>
<li>नौकरी, प्रमोशन या ट्रांसफ़र</li>
<li>वीज़ा, यात्रा या विदेश में बसना</li>
<li>विवाह — होगा या नहीं, कब; कोई ख़ास रिश्ता</li>
<li>संपत्ति ख़रीदना या बेचना</li>
<li>कोर्ट केस या पैसे की वसूली</li>
<li>खोई वस्तु, लापता व्यक्ति या पालतू जानवर</li>
</ul>
<p>जीवन की बड़ी तस्वीर के लिए — करियर की दिशा, विवाह की संभावनाएँ, लंबी योजना — <a href="/vedic-astrology">वैदिक कुंडली परामर्श</a> बेहतर है। शादी से पहले मिलान के लिए देखें <a href="/kundli-milan">कुंडली मिलान</a>।</p>

<h2>केपी प्रश्न सत्र कैसे होता है</h2>
<p>आप 20–30 मिनट की कॉल बुक करते हैं, अपना सवाल बताते हैं और नंबर देते हैं। पं. रजनीश शर्मा प्रश्न कुंडली बनाते हैं, उत्तर और संभावित समय समझाते हैं, और ज़रूरत हो तो सरल उपाय बताते हैं। आप दुनिया में कहीं से भी यह करा सकते हैं — <a href="/kp-prashna">केपी प्रश्न बुक करें</a>।</p>
`.trim(),
  },
};

// The placeholder the drafts were created with — only these are filled in automatically.
export const isPlaceholder = (html) => !html || html.includes('[Write the article here]');
