// Second batch of blog articles (English + Hindi). Added once as DRAFTS on server start
// (see index.js — tracked in SeedState, so a post deleted in /admin/blog is not re-added).
// Read them in /admin/blog, adjust, then publish.

export const BLOG_BATCH = 'blog-batch-2';

export const blogPosts2 = [
  {
    slug: 'manglik-dosha-meaning-cancellation-remedies',
    category: 'Kundli Matching',
    title: 'Manglik Dosha: Meaning, Cancellation and Remedies',
    titleHi: 'मांगलिक दोष: अर्थ, परिहार और उपाय',
    excerpt: 'What Manglik dosha really is, why it is cancelled in many charts, and what to do before marriage if it is active.',
    excerptHi: 'मांगलिक दोष असल में क्या है, कई कुंडलियों में इसका परिहार क्यों हो जाता है, और सक्रिय हो तो शादी से पहले क्या करें।',
    seoTitle: 'Manglik Dosha: Meaning, Cancellation & Remedies',
    metaDescription: 'Manglik dosha explained simply: which houses of Mars cause it, when it is cancelled, Manglik and non-Manglik marriage, and traditional remedies.',
    content: `
<p>Few words in Indian astrology cause as much worry as <strong>Manglik</strong>. Families hear that a boy or girl is Manglik and assume the marriage is in danger. In reality, Manglik dosha is common, often cancelled, and — where it is active — manageable. Here is what it means.</p>

<h2>What is Manglik dosha?</h2>
<p>Manglik (or Kuja) dosha is formed when <strong>Mars (Mangal)</strong> sits in the <strong>1st, 2nd, 4th, 7th, 8th or 12th house</strong> of the birth chart. Mars is the planet of energy, courage and drive; in these houses it is said to bring heat into married life — arguments, impatience or delays in marriage.</p>
<p>The dosha is checked from the Ascendant (Lagna), and many astrologers also check it from the Moon and Venus. Because six of the twelve houses are involved, a large share of people are Manglik in at least one of these.</p>

<h2>When is Manglik dosha cancelled?</h2>
<p>Classical texts list many conditions in which the dosha is cancelled (<em>Mangal dosha parihar</em>), for example:</p>
<ul>
<li>Mars is in its own sign (Aries, Scorpio) or exalted (Capricorn).</li>
<li>Mars is aspected by or joined with Jupiter.</li>
<li>Both partners are Manglik — the dosha balances out.</li>
<li>Certain sign placements, such as Mars in Leo or Aquarius in the 7th house.</li>
</ul>
<p>Age also matters in popular belief: many astrologers consider the effect milder after 28. This is why a Manglik label on a computer printout is only the start — the full chart has to be read.</p>

<h2>Can a Manglik marry a non-Manglik?</h2>
<p>Yes, often. If the dosha is cancelled in the chart, there is no problem. If it is active, the traditional preference is a partner who is also Manglik, or whose chart has a strong 7th house and Jupiter. During <a href="/kundli-milan">kundli matching</a> Pandit ji checks the Manglik status of both charts along with guna milan, Nadi and Bhakoot dosha.</p>

<h2>Traditional remedies</h2>
<ul>
<li>Hanuman worship and the Hanuman Chalisa on Tuesdays.</li>
<li>The Mangal mantra “ॐ अं अंगारकाय नमः” and a <a href="/yantra-shop/mangal-yantra">Mangal Yantra</a>.</li>
<li>Fasting on Tuesdays and charity of red lentils (masoor dal) or jaggery.</li>
<li>Kumbh vivah or similar rituals — only where the dosha is strong, and on proper advice.</li>
</ul>

<h2>The bottom line</h2>
<p>Manglik dosha is a reason to look carefully, not a reason for fear. Have both charts checked together before deciding — <a href="/kundli-milan">book a kundli matching</a> or a <a href="/vedic-astrology">birth chart consultation</a>.</p>
`.trim(),
    contentHi: `
<p>भारतीय ज्योतिष में <strong>मांगलिक</strong> शब्द जितनी चिंता पैदा करता है, उतना शायद ही कोई और। परिवार सुनते हैं कि लड़का या लड़की मांगलिक है और मान लेते हैं कि शादी ख़तरे में है। असल में मांगलिक दोष आम है, अक्सर इसका परिहार हो जाता है, और जहाँ सक्रिय हो वहाँ भी संभाला जा सकता है। जानिए इसका अर्थ।</p>

<h2>मांगलिक दोष क्या है?</h2>
<p>मांगलिक (या कुज) दोष तब बनता है जब <strong>मंगल</strong> जन्म कुंडली के <strong>1, 2, 4, 7, 8 या 12वें भाव</strong> में हो। मंगल ऊर्जा, साहस और जोश का ग्रह है; इन भावों में यह वैवाहिक जीवन में गर्मी लाता माना जाता है — झगड़े, अधीरता या शादी में देरी।</p>
<p>दोष लग्न से देखा जाता है, और कई ज्योतिषी इसे चंद्र और शुक्र से भी देखते हैं। चूँकि बारह में से छह भाव शामिल हैं, इसलिए बहुत से लोग इनमें से किसी न किसी से मांगलिक होते हैं।</p>

<h2>मांगलिक दोष का परिहार कब होता है?</h2>
<p>शास्त्रों में कई स्थितियाँ बताई गई हैं जिनमें दोष का परिहार हो जाता है (<em>मंगल दोष परिहार</em>), जैसे:</p>
<ul>
<li>मंगल अपनी राशि (मेष, वृश्चिक) में या उच्च (मकर) का हो।</li>
<li>मंगल पर गुरु की दृष्टि हो या गुरु के साथ हो।</li>
<li>दोनों साथी मांगलिक हों — दोष संतुलित हो जाता है।</li>
<li>कुछ राशि स्थितियाँ, जैसे सप्तम भाव में सिंह या कुंभ का मंगल।</li>
</ul>
<p>लोक मान्यता में आयु भी मायने रखती है: कई ज्योतिषी 28 वर्ष के बाद इसका असर हल्का मानते हैं। इसीलिए कंप्यूटर प्रिंटआउट पर “मांगलिक” लिखा होना सिर्फ़ शुरुआत है — पूरी कुंडली पढ़नी पड़ती है।</p>

<h2>क्या मांगलिक की शादी गैर-मांगलिक से हो सकती है?</h2>
<p>हाँ, अक्सर। अगर कुंडली में दोष का परिहार है, तो कोई समस्या नहीं। अगर सक्रिय है, तो परंपरा से ऐसा साथी बेहतर माना जाता है जो ख़ुद मांगलिक हो, या जिसकी कुंडली में सप्तम भाव और गुरु मज़बूत हों। <a href="/kundli-milan">कुंडली मिलान</a> में पंडित जी गुण मिलान, नाड़ी और भकूट दोष के साथ दोनों कुंडलियों की मांगलिक स्थिति भी देखते हैं।</p>

<h2>पारंपरिक उपाय</h2>
<ul>
<li>मंगलवार को हनुमान पूजा और हनुमान चालीसा।</li>
<li>मंगल मंत्र “ॐ अं अंगारकाय नमः” और <a href="/yantra-shop/mangal-yantra">मंगल यंत्र</a>।</li>
<li>मंगलवार का व्रत और मसूर दाल या गुड़ का दान।</li>
<li>कुंभ विवाह जैसे अनुष्ठान — सिर्फ़ प्रबल दोष में, और सही सलाह पर।</li>
</ul>

<h2>निष्कर्ष</h2>
<p>मांगलिक दोष ध्यान से देखने का कारण है, डरने का नहीं। फ़ैसला करने से पहले दोनों कुंडलियाँ साथ दिखाएँ — <a href="/kundli-milan">कुंडली मिलान बुक करें</a> या <a href="/vedic-astrology">कुंडली परामर्श</a> लें।</p>
`.trim(),
  },

  {
    slug: 'shani-sade-sati-meaning-remedies',
    category: 'Vedic',
    title: 'Shani Sade Sati: What It Really Means and Simple Remedies',
    titleHi: 'शनि साढ़ेसाती: असली अर्थ और सरल उपाय',
    excerpt: 'The three phases of Sade Sati, why it is not the same for everyone, and remedies that cost little.',
    excerptHi: 'साढ़ेसाती के तीन चरण, यह सबके लिए एक जैसी क्यों नहीं होती, और कम ख़र्च वाले उपाय।',
    seoTitle: 'Shani Sade Sati: Meaning, Phases & Simple Remedies',
    metaDescription: 'Shani Sade Sati explained: the three phases, how to know if it is good or hard for you, Dhaiya, and simple traditional remedies for Saturn.',
    content: `
<p><strong>Sade Sati</strong> — “seven and a half” — is the period when Saturn (Shani) moves through the sign before your Moon sign, your Moon sign itself, and the sign after it. Each sign takes about two and a half years, so the whole period lasts about seven and a half years. Most people go through it two or three times in a lifetime.</p>

<h2>The three phases</h2>
<ul>
<li><strong>Rising phase</strong> — Saturn in the 12th from the Moon: expenses, travel, disturbed sleep, a feeling of change coming.</li>
<li><strong>Peak phase</strong> — Saturn over the Moon: the most intense part, testing the mind, health and relationships.</li>
<li><strong>Setting phase</strong> — Saturn in the 2nd from the Moon: pressure on family and finances, slowly easing.</li>
</ul>

<h2>Is Sade Sati always bad?</h2>
<p>No. Saturn is the planet of karma and discipline. For many people Sade Sati brings hard work that is finally rewarded — promotions, property, a settled life. How it feels depends on:</p>
<ul>
<li>Saturn’s strength and house in your birth chart,</li>
<li>whether Saturn is a friendly planet for your Ascendant (for Taurus and Libra ascendants it is often favourable),</li>
<li>the dasha you are running at the same time.</li>
</ul>
<p>That is why two people with the same Moon sign can have very different experiences.</p>

<h2>What is Shani Dhaiya?</h2>
<p>Dhaiya (or small panoti) is the two-and-a-half-year period when Saturn transits the 4th or 8th sign from the Moon. It can bring similar pressures, usually in one area of life — home and peace of mind (4th) or health and sudden changes (8th).</p>

<h2>Simple remedies</h2>
<ul>
<li>Light a mustard-oil diya on Saturday evenings and recite “ॐ शं शनैश्चराय नमः”.</li>
<li>Read the Hanuman Chalisa — Hanuman worship is the most popular remedy for Saturn.</li>
<li>Serve and give: help elderly people, workers and the needy; donate black sesame, urad dal or mustard oil on Saturdays.</li>
<li>Be honest and disciplined — Saturn rewards both.</li>
<li>A <a href="/yantra-shop/shani-yantra">Shani Yantra</a> or <a href="/yantra-shop/hanuman-yantra">Hanuman Yantra</a> in the home.</li>
</ul>
<p>Gemstones such as blue sapphire should never be worn only because of Sade Sati — only after a careful chart reading.</p>

<h2>Check your own chart</h2>
<p>Sade Sati is a transit, and a transit is always read against your birth chart. In a <a href="/vedic-astrology">Vedic birth chart consultation</a> Pandit ji shows when your Sade Sati begins and ends, how strong it is for you, and which remedies are worth doing.</p>
`.trim(),
    contentHi: `
<p><strong>साढ़ेसाती</strong> — “साढ़े सात” — वह अवधि है जब शनि आपकी चंद्र राशि से पहली राशि, चंद्र राशि और उसके बाद की राशि से गुज़रते हैं। हर राशि में लगभग ढाई साल लगते हैं, इसलिए पूरी अवधि लगभग साढ़े सात साल की होती है। ज़्यादातर लोग जीवन में दो-तीन बार इससे गुज़रते हैं।</p>

<h2>तीन चरण</h2>
<ul>
<li><strong>पहला चरण</strong> — चंद्र से 12वें शनि: ख़र्च, यात्रा, नींद में बाधा, बदलाव आने का एहसास।</li>
<li><strong>दूसरा चरण</strong> — चंद्र के ऊपर शनि: सबसे तीव्र भाग, मन, स्वास्थ्य और संबंधों की परीक्षा।</li>
<li><strong>तीसरा चरण</strong> — चंद्र से दूसरे शनि: परिवार और धन पर दबाव, धीरे-धीरे राहत।</li>
</ul>

<h2>क्या साढ़ेसाती हमेशा बुरी होती है?</h2>
<p>नहीं। शनि कर्म और अनुशासन के ग्रह हैं। बहुत से लोगों के लिए साढ़ेसाती ऐसी मेहनत लाती है जिसका आख़िरकार फल मिलता है — प्रमोशन, संपत्ति, स्थिर जीवन। यह कैसी रहेगी, यह निर्भर करता है:</p>
<ul>
<li>आपकी कुंडली में शनि की शक्ति और भाव पर,</li>
<li>आपके लग्न के लिए शनि मित्र ग्रह है या नहीं (वृषभ और तुला लग्न के लिए अक्सर शुभ),</li>
<li>उसी समय चल रही दशा पर।</li>
</ul>
<p>इसीलिए एक ही चंद्र राशि वाले दो लोगों के अनुभव बहुत अलग हो सकते हैं।</p>

<h2>शनि की ढैया क्या है?</h2>
<p>ढैया (या छोटी पनौती) वह ढाई साल की अवधि है जब शनि चंद्र से चौथी या आठवीं राशि में गोचर करते हैं। इसमें भी ऐसे ही दबाव आ सकते हैं, आमतौर पर जीवन के एक क्षेत्र में — घर और मन की शांति (चौथा) या स्वास्थ्य और अचानक बदलाव (आठवाँ)।</p>

<h2>सरल उपाय</h2>
<ul>
<li>शनिवार शाम सरसों के तेल का दीया जलाएँ और “ॐ शं शनैश्चराय नमः” जपें।</li>
<li>हनुमान चालीसा पढ़ें — हनुमान पूजा शनि का सबसे लोकप्रिय उपाय है।</li>
<li>सेवा और दान: बुज़ुर्गों, मज़दूरों और ज़रूरतमंदों की मदद करें; शनिवार को काले तिल, उड़द दाल या सरसों का तेल दान करें।</li>
<li>ईमानदार और अनुशासित रहें — शनि दोनों का फल देते हैं।</li>
<li>घर में <a href="/yantra-shop/shani-yantra">शनि यंत्र</a> या <a href="/yantra-shop/hanuman-yantra">हनुमान यंत्र</a>।</li>
</ul>
<p>नीलम जैसे रत्न सिर्फ़ साढ़ेसाती के कारण कभी न पहनें — केवल कुंडली को ध्यान से देखने के बाद।</p>

<h2>अपनी कुंडली दिखाएँ</h2>
<p>साढ़ेसाती एक गोचर है, और गोचर हमेशा जन्म कुंडली के साथ पढ़ा जाता है। <a href="/vedic-astrology">वैदिक कुंडली परामर्श</a> में पंडित जी बताते हैं कि आपकी साढ़ेसाती कब शुरू और ख़त्म होती है, आपके लिए कितनी प्रबल है, और कौन-से उपाय करने लायक हैं।</p>
`.trim(),
  },

  {
    slug: 'guna-milan-36-gunas-explained',
    category: 'Kundli Matching',
    title: 'Guna Milan Explained: What the 36 Gunas Mean',
    titleHi: 'गुण मिलान: 36 गुणों का अर्थ',
    excerpt: 'The 8 kootas of Ashtakoota matching, how many gunas you need, and why the score alone is not enough.',
    excerptHi: 'अष्टकूट मिलान के 8 कूट, कितने गुण चाहिए, और सिर्फ़ अंक क्यों काफ़ी नहीं।',
    seoTitle: 'Guna Milan Explained: 36 Gunas & 8 Kootas',
    metaDescription: 'How guna milan works: the 8 kootas and 36 gunas of Ashtakoota matching, how many gunas are needed for marriage, Nadi and Bhakoot dosha.',
    content: `
<p>When two families consider a marriage, the first question is often: <em>“How many gunas match?”</em> The answer comes from <strong>Ashtakoota guna milan</strong>, the traditional method of matching two horoscopes from the Moon’s nakshatra of the boy and the girl.</p>

<h2>The 8 kootas and their points</h2>
<ul>
<li><strong>Varna (1)</strong> — spiritual and work temperament.</li>
<li><strong>Vashya (2)</strong> — mutual attraction and influence.</li>
<li><strong>Tara (3)</strong> — destiny, health and well-being, from the distance between the two nakshatras.</li>
<li><strong>Yoni (4)</strong> — physical and intimate compatibility; each nakshatra has an animal symbol.</li>
<li><strong>Graha Maitri (5)</strong> — friendship between the lords of the two Moon signs; mental harmony.</li>
<li><strong>Gana (6)</strong> — nature: Deva (gentle), Manushya (human) or Rakshasa (intense).</li>
<li><strong>Bhakoot (7)</strong> — the relationship between the two Moon signs; family welfare, finances, children.</li>
<li><strong>Nadi (8)</strong> — Aadi, Madhya or Antya; health and progeny.</li>
</ul>
<p>Together they add up to <strong>36 gunas</strong>.</p>

<h2>How many gunas are needed?</h2>
<ul>
<li><strong>Below 18</strong> — traditionally not recommended without a closer look.</li>
<li><strong>18–24</strong> — acceptable.</li>
<li><strong>24–32</strong> — good.</li>
<li><strong>32–36</strong> — very good.</li>
</ul>

<h2>Nadi dosha and Bhakoot dosha</h2>
<p>The two kootas with the most points carry the most weight. <strong>Nadi dosha</strong> occurs when both have the same Nadi (0 of 8 points) and <strong>Bhakoot dosha</strong> when the Moon signs are in a 6–8, 9–5 or 12–2 relationship (0 of 7). Both have well-known exceptions — for example, when the Moon-sign lords are the same or friends — so a zero is not automatically a “no”.</p>

<h2>Why the score is not the whole story</h2>
<p>Guna milan uses only the Moon. A couple with 30 gunas can still face problems if the 7th house is afflicted, and a couple with 20 can do very well. A complete matching also checks:</p>
<ul>
<li><a href="/blog/manglik-dosha-meaning-cancellation-remedies">Manglik dosha</a> in both charts and its cancellation,</li>
<li>the 7th house and its lord, and Venus and Jupiter,</li>
<li>the Navamsha (D-9) chart,</li>
<li>the dasha periods both will run after marriage.</li>
</ul>

<h2>Get both charts matched</h2>
<p>Send the date, time and place of birth of both. You receive a guna milan and Manglik report and a 20-minute call with Pandit ji — <a href="/kundli-milan">book kundli matching</a>.</p>
`.trim(),
    contentHi: `
<p>जब दो परिवार किसी रिश्ते पर विचार करते हैं, तो पहला सवाल अक्सर होता है: <em>“कितने गुण मिलते हैं?”</em> इसका जवाब <strong>अष्टकूट गुण मिलान</strong> से मिलता है — लड़के और लड़की के चंद्र नक्षत्र से दो कुंडलियाँ मिलाने की पारंपरिक विधि।</p>

<h2>8 कूट और उनके अंक</h2>
<ul>
<li><strong>वर्ण (1)</strong> — आध्यात्मिक और कार्य स्वभाव।</li>
<li><strong>वश्य (2)</strong> — आपसी आकर्षण और प्रभाव।</li>
<li><strong>तारा (3)</strong> — भाग्य, स्वास्थ्य और कुशलता, दोनों नक्षत्रों की दूरी से।</li>
<li><strong>योनि (4)</strong> — शारीरिक और दांपत्य अनुकूलता; हर नक्षत्र का एक पशु प्रतीक होता है।</li>
<li><strong>ग्रह मैत्री (5)</strong> — दोनों चंद्र राशियों के स्वामियों की मित्रता; मानसिक तालमेल।</li>
<li><strong>गण (6)</strong> — स्वभाव: देव (सौम्य), मनुष्य या राक्षस (तीव्र)।</li>
<li><strong>भकूट (7)</strong> — दोनों चंद्र राशियों का संबंध; परिवार का कल्याण, धन, संतान।</li>
<li><strong>नाड़ी (8)</strong> — आदि, मध्य या अंत्य; स्वास्थ्य और संतान।</li>
</ul>
<p>सब मिलाकर <strong>36 गुण</strong> होते हैं।</p>

<h2>कितने गुण चाहिए?</h2>
<ul>
<li><strong>18 से कम</strong> — परंपरा से बिना गहराई से देखे उचित नहीं।</li>
<li><strong>18–24</strong> — स्वीकार्य।</li>
<li><strong>24–32</strong> — अच्छा।</li>
<li><strong>32–36</strong> — बहुत अच्छा।</li>
</ul>

<h2>नाड़ी दोष और भकूट दोष</h2>
<p>सबसे ज़्यादा अंक वाले दो कूट सबसे ज़्यादा महत्व रखते हैं। <strong>नाड़ी दोष</strong> तब होता है जब दोनों की नाड़ी एक हो (8 में 0 अंक), और <strong>भकूट दोष</strong> तब जब चंद्र राशियाँ 6–8, 9–5 या 12–2 के संबंध में हों (7 में 0)। दोनों के जाने-माने अपवाद हैं — जैसे जब चंद्र राशियों के स्वामी एक हों या मित्र हों — इसलिए शून्य अपने-आप “ना” नहीं है।</p>

<h2>सिर्फ़ अंक पूरी कहानी क्यों नहीं</h2>
<p>गुण मिलान में सिर्फ़ चंद्र देखा जाता है। 30 गुण वाले जोड़े को भी परेशानी हो सकती है अगर सप्तम भाव पीड़ित हो, और 20 गुण वाला जोड़ा बहुत अच्छा रह सकता है। पूरे मिलान में यह भी देखा जाता है:</p>
<ul>
<li>दोनों कुंडलियों में <a href="/blog/manglik-dosha-meaning-cancellation-remedies">मांगलिक दोष</a> और उसका परिहार,</li>
<li>सप्तम भाव और उसका स्वामी, तथा शुक्र और गुरु,</li>
<li>नवांश (D-9) कुंडली,</li>
<li>शादी के बाद दोनों की चलने वाली दशाएँ।</li>
</ul>

<h2>दोनों कुंडलियाँ मिलवाएँ</h2>
<p>दोनों की जन्म तिथि, समय और स्थान भेजें। आपको गुण मिलान और मांगलिक रिपोर्ट और पंडित जी के साथ 20 मिनट की कॉल मिलती है — <a href="/kundli-milan">कुंडली मिलान बुक करें</a>।</p>
`.trim(),
  },

  {
    slug: 'shree-yantra-meaning-placement-worship',
    category: 'Yantra',
    title: 'Shree Yantra: Meaning, Placement and How to Worship',
    titleHi: 'श्री यंत्र: अर्थ, स्थापना और पूजा विधि',
    excerpt: 'What the nine triangles mean, where to place the Shree Yantra at home or work, and a simple daily pooja.',
    excerptHi: 'नौ त्रिकोणों का अर्थ, घर या दुकान में श्री यंत्र कहाँ रखें, और रोज़ की सरल पूजा।',
    seoTitle: 'Shree Yantra: Meaning, Placement & Daily Worship',
    metaDescription: 'Shree Yantra explained: the meaning of its nine triangles, the right direction and day to install it, the mantra, daily worship and care.',
    content: `
<p>The <strong>Shree Yantra</strong> (Sri Chakra) is the most revered yantra in Hindu tradition — called <em>Yantra Raj</em>, the king of yantras. It is the yantra of Goddess Lakshmi and of Maa Tripura Sundari, and is kept in homes and businesses for prosperity and peace.</p>

<h2>What the design means</h2>
<p>At the centre is a single point, the <strong>bindu</strong>, the source of creation. Around it, <strong>nine triangles</strong> interlock: four pointing upwards (Shiva, consciousness) and five pointing downwards (Shakti, energy). Together they form 43 smaller triangles. These are enclosed by two rings of lotus petals (8 and 16), three circles and a square outer wall with four gates, the <strong>bhupur</strong>. The whole yantra is seen as a map of the universe and of the path from the outer world to the centre.</p>

<h2>Flat or Meru?</h2>
<p>The flat Shree Yantra is engraved on a plate and can be kept in the pooja room, the locker or on a wall. The <a href="/yantra-shop/meru-shree-yantra">Meru Shree Yantra</a> is the same design raised like a mountain and is placed on the altar.</p>

<h2>Where to place it</h2>
<ul>
<li><strong>At home:</strong> in the pooja room, in the north-east, or in the north (the zone of wealth), facing east or west.</li>
<li><strong>At work:</strong> near the cash counter or on the owner’s desk.</li>
<li>Above floor level, in a clean place — never in the bathroom or under a staircase.</li>
</ul>

<h2>When to install</h2>
<p>Friday morning is the traditional day. Diwali, Dhanteras, Akshaya Tritiya and Navratri are especially favoured.</p>

<h2>A simple installation</h2>
<ol>
<li>Wash the yantra with Ganga jal or raw milk mixed with water, and wipe it dry.</li>
<li>Place it on a clean red cloth on a small platform.</li>
<li>Offer kumkum, rice, flowers and a ghee diya.</li>
<li>Recite: <em>ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः</em> — 11 or 108 times.</li>
</ol>

<h2>Daily worship and care</h2>
<p>Each morning light a diya or incense and recite the mantra 11 times. On Fridays you can offer white sweets or kheer. Wipe the yantra with a soft cloth; copper and brass darken naturally and can be cleaned with a little lemon water.</p>

<h2>Why energization matters</h2>
<p>A yantra becomes a tool for worship after <strong>pran-pratishtha</strong> — invoking the deity into it with mantras on a good muhurta. Every <a href="/yantra-shop/shree-yantra">Shree Yantra in our shop</a> is energized by Pt. Rajneesh Sharma and comes with a video of the ritual and an installation guide.</p>
`.trim(),
    contentHi: `
<p><strong>श्री यंत्र</strong> (श्री चक्र) हिंदू परंपरा का सबसे पूज्य यंत्र है — इसे <em>यंत्रराज</em>, यानी यंत्रों का राजा कहा जाता है। यह माँ लक्ष्मी और माँ त्रिपुर सुंदरी का यंत्र है, और समृद्धि व शांति के लिए घर और व्यापार में रखा जाता है।</p>

<h2>आकृति का अर्थ</h2>
<p>केंद्र में एक बिंदु है, <strong>बिंदु</strong>, जो सृष्टि का स्रोत है। उसके चारों ओर <strong>नौ त्रिकोण</strong> आपस में जुड़े हैं: चार ऊपर की ओर (शिव, चेतना) और पाँच नीचे की ओर (शक्ति, ऊर्जा)। मिलकर ये 43 छोटे त्रिकोण बनाते हैं। इन्हें कमल दलों के दो घेरे (8 और 16), तीन वृत्त और चार द्वारों वाली चौकोर बाहरी दीवार, <strong>भूपुर</strong>, घेरते हैं। पूरे यंत्र को ब्रह्मांड का नक्शा और बाहरी संसार से केंद्र तक का मार्ग माना जाता है।</p>

<h2>समतल या मेरु?</h2>
<p>समतल श्री यंत्र प्लेट पर उकेरा होता है और पूजा कक्ष, तिजोरी या दीवार पर रखा जा सकता है। <a href="/yantra-shop/meru-shree-yantra">मेरु श्री यंत्र</a> वही आकृति पर्वत की तरह उठी हुई है और पूजा की चौकी पर रखा जाता है।</p>

<h2>कहाँ रखें</h2>
<ul>
<li><strong>घर में:</strong> पूजा कक्ष में, उत्तर-पूर्व में, या उत्तर में (धन का क्षेत्र), मुख पूर्व या पश्चिम की ओर।</li>
<li><strong>कार्यस्थल पर:</strong> कैश काउंटर के पास या मालिक की मेज़ पर।</li>
<li>ज़मीन से ऊपर, साफ़ जगह पर — कभी बाथरूम में या सीढ़ी के नीचे नहीं।</li>
</ul>

<h2>कब स्थापित करें</h2>
<p>शुक्रवार सुबह पारंपरिक दिन है। दीवाली, धनतेरस, अक्षय तृतीया और नवरात्रि विशेष रूप से शुभ माने जाते हैं।</p>

<h2>सरल स्थापना</h2>
<ol>
<li>यंत्र को गंगाजल या पानी मिले कच्चे दूध से धोएँ और सुखाकर पोंछें।</li>
<li>छोटी चौकी पर साफ़ लाल कपड़ा बिछाकर रखें।</li>
<li>कुमकुम, चावल, फूल और घी का दीया अर्पित करें।</li>
<li>जाप करें: <em>ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः</em> — 11 या 108 बार।</li>
</ol>

<h2>रोज़ की पूजा और देखभाल</h2>
<p>हर सुबह दीया या अगरबत्ती जलाएँ और मंत्र का 11 बार जाप करें। शुक्रवार को सफ़ेद मिठाई या खीर का भोग लगा सकते हैं। यंत्र को मुलायम कपड़े से पोंछें; ताँबा और पीतल स्वाभाविक रूप से काले पड़ते हैं और थोड़े नींबू पानी से साफ़ हो जाते हैं।</p>

<h2>प्राण-प्रतिष्ठा क्यों ज़रूरी है</h2>
<p>यंत्र <strong>प्राण-प्रतिष्ठा</strong> के बाद पूजा का साधन बनता है — शुभ मुहूर्त में मंत्रों से देवता का आवाहन। <a href="/yantra-shop/shree-yantra">हमारी शॉप का हर श्री यंत्र</a> पं. रजनीश शर्मा द्वारा प्राण-प्रतिष्ठित है और अनुष्ठान के वीडियो व स्थापना गाइड के साथ आता है।</p>
`.trim(),
  },

  {
    slug: 'main-door-vastu-direction-remedies',
    category: 'Vastu',
    title: 'Main Door Vastu: Direction, Padas and Simple Remedies',
    titleHi: 'मुख्य द्वार का वास्तु: दिशा, पद और सरल उपाय',
    excerpt: 'Why the entrance matters most in Vastu, the 32 padas, which door positions are favourable, and remedies without moving the door.',
    excerptHi: 'वास्तु में मुख्य द्वार सबसे अहम क्यों, 32 पद, कौन-सी जगह शुभ है, और द्वार हटाए बिना उपाय।',
    seoTitle: 'Main Door Vastu: Direction, Padas & Remedies',
    metaDescription: 'Main door Vastu guide: the 32 entrance padas, best door positions for north, east, south and west facing homes, and remedies without moving the door.',
    content: `
<p>In Vastu Shastra the <strong>main door</strong> is called the mouth of the house — the point through which energy, opportunities and people enter. That is why, in most Vastu consultations, the entrance is the first thing checked.</p>

<h2>Direction is not the whole answer</h2>
<p>People often ask whether a north, east, south or west facing house is good. The facing direction alone does not decide it. What matters more is <strong>where along the wall</strong> the door is placed.</p>

<h2>The 32 entrance padas</h2>
<p>The outer boundary of a house is divided into <strong>32 padas</strong> — eight on each side, each ruled by a deity of the Vastu Purush mandala. Some padas are traditionally favourable for the entrance and others are not:</p>
<ul>
<li><strong>North-facing:</strong> the middle padas (Mukhya, Bhallat, Soma) are considered among the best for wealth and opportunities.</li>
<li><strong>East-facing:</strong> the padas of Jayant, Mahendra and Surya are favoured for recognition and health.</li>
<li><strong>South-facing:</strong> not bad by itself — the Vitatha and Grihakshat padas are traditionally acceptable; the south-west end is avoided.</li>
<li><strong>West-facing:</strong> the Sugreev and Pushpadant padas are favoured for gains.</li>
</ul>
<p>This is why two south-facing houses can give very different results. In Astro-Vastu the door is also read with the birth chart of the owner.</p>

<h2>Common main door problems</h2>
<ul>
<li>Door in an unfavourable pada, especially towards the south-west.</li>
<li>Toilet, staircase or kitchen directly facing the main door.</li>
<li>Two doors in a straight line (main door and back door), so energy flows straight out.</li>
<li>Broken, creaking or very dark entrance; clutter and shoes piled at the door.</li>
</ul>

<h2>Remedies without moving the door</h2>
<ul>
<li>A metal strip at the threshold, chosen by the direction (for example brass or copper).</li>
<li>Changing the colour of the door to suit its zone.</li>
<li>Good light at the entrance, a clean nameplate and no clutter.</li>
<li>Auspicious symbols such as swastik or Om, or a <a href="/yantra-shop/vastu-dosh-nivaran-yantra">Vastu Dosh Nivaran Yantra</a> above the door inside.</li>
<li>A screen or plant to break a straight line between two doors.</li>
</ul>
<p>More ideas are in <a href="/blog/vastu-remedies-without-demolition">Vastu remedies without demolition</a>.</p>

<h2>Have your entrance checked</h2>
<p>To find the exact pada you need a floor plan and the true North. Send them for an <a href="/online-vastu-consultation">online Astro-Vastu report</a>, or book a site visit in Jaipur.</p>
`.trim(),
    contentHi: `
<p>वास्तु शास्त्र में <strong>मुख्य द्वार</strong> को घर का मुख कहा जाता है — वह बिंदु जहाँ से ऊर्जा, अवसर और लोग अंदर आते हैं। इसीलिए ज़्यादातर वास्तु परामर्श में सबसे पहले मुख्य द्वार देखा जाता है।</p>

<h2>सिर्फ़ दिशा पूरा जवाब नहीं</h2>
<p>लोग अक्सर पूछते हैं कि उत्तर, पूर्व, दक्षिण या पश्चिममुखी घर अच्छा है या नहीं। सिर्फ़ मुख की दिशा से यह तय नहीं होता। ज़्यादा मायने रखता है कि द्वार <strong>दीवार पर कहाँ</strong> है।</p>

<h2>मुख्य द्वार के 32 पद</h2>
<p>घर की बाहरी सीमा <strong>32 पदों</strong> में बँटी होती है — हर ओर आठ, और हर पद का स्वामी वास्तु पुरुष मंडल का एक देवता। कुछ पद परंपरा से मुख्य द्वार के लिए शुभ हैं और कुछ नहीं:</p>
<ul>
<li><strong>उत्तरमुखी:</strong> बीच के पद (मुख्य, भल्लाट, सोम) धन और अवसरों के लिए सबसे अच्छे माने जाते हैं।</li>
<li><strong>पूर्वमुखी:</strong> जयंत, महेंद्र और सूर्य के पद मान-सम्मान और स्वास्थ्य के लिए शुभ।</li>
<li><strong>दक्षिणमुखी:</strong> अपने-आप में बुरा नहीं — वितथ और गृहक्षत पद परंपरा से स्वीकार्य; दक्षिण-पश्चिम सिरे से बचें।</li>
<li><strong>पश्चिममुखी:</strong> सुग्रीव और पुष्पदंत पद लाभ के लिए शुभ।</li>
</ul>
<p>इसीलिए दो दक्षिणमुखी घरों के नतीजे बहुत अलग हो सकते हैं। एस्ट्रो-वास्तु में द्वार को मालिक की कुंडली के साथ भी पढ़ा जाता है।</p>

<h2>मुख्य द्वार की आम समस्याएँ</h2>
<ul>
<li>अशुभ पद में द्वार, ख़ासकर दक्षिण-पश्चिम की ओर।</li>
<li>शौचालय, सीढ़ी या रसोई ठीक मुख्य द्वार के सामने।</li>
<li>दो दरवाज़े एक सीधी रेखा में (मुख्य और पीछे का), जिससे ऊर्जा सीधे बाहर निकल जाती है।</li>
<li>टूटा, आवाज़ करता या बहुत अँधेरा प्रवेश; दरवाज़े पर सामान और जूतों का ढेर।</li>
</ul>

<h2>द्वार हटाए बिना उपाय</h2>
<ul>
<li>दहलीज़ पर दिशा के अनुसार धातु की पट्टी (जैसे पीतल या ताँबा)।</li>
<li>द्वार का रंग उसके ज़ोन के अनुसार बदलना।</li>
<li>प्रवेश पर अच्छी रोशनी, साफ़ नेमप्लेट और कोई अव्यवस्था नहीं।</li>
<li>स्वस्तिक या ॐ जैसे शुभ चिह्न, या अंदर द्वार के ऊपर <a href="/yantra-shop/vastu-dosh-nivaran-yantra">वास्तु दोष निवारण यंत्र</a>।</li>
<li>दो दरवाज़ों की सीधी रेखा तोड़ने के लिए पर्दा या पौधा।</li>
</ul>
<p>और उपाय <a href="/blog/vastu-remedies-without-demolition">बिना तोड़-फोड़ वास्तु उपाय</a> में पढ़ें।</p>

<h2>अपना मुख्य द्वार जँचवाएँ</h2>
<p>सही पद जानने के लिए फ्लोर प्लान और असली उत्तर दिशा चाहिए। इन्हें <a href="/online-vastu-consultation">ऑनलाइन एस्ट्रो-वास्तु रिपोर्ट</a> के लिए भेजें, या जयपुर में साइट विज़िट बुक करें।</p>
`.trim(),
  },

  {
    slug: 'online-nadi-reading-from-abroad',
    category: 'Nadi',
    title: 'Online Nadi Reading from Abroad: How It Works',
    titleHi: 'विदेश से ऑनलाइन नाड़ी रीडिंग: कैसे होती है',
    excerpt: 'For clients in the USA, UK, Canada, Australia, Singapore, Malaysia and the Gulf — thumb impression, time zones, language and payment.',
    excerptHi: 'अमेरिका, UK, कनाडा, ऑस्ट्रेलिया, सिंगापुर, मलेशिया और खाड़ी के क्लाइंट्स के लिए — अंगूठे का निशान, टाइम ज़ोन, भाषा और भुगतान।',
    seoTitle: 'Online Nadi Reading from Abroad: How It Works',
    metaDescription: 'How an online Nadi palm leaf reading works from the USA, UK, Canada, Australia or Singapore: thumb impression photo, video call, translation and USD payment.',
    content: `
<p>For many Indian families living abroad, a <strong>Nadi reading</strong> used to mean waiting for the next trip to Tamil Nadu. Today the whole process can be done online, without travelling. Here is how it works step by step.</p>

<h2>1. Take your thumb impression at home</h2>
<p>Buy an ink pad from any stationery shop or supermarket. Men use the <strong>right thumb</strong>, women the <strong>left thumb</strong>. Press the thumb on the pad, roll it gently from side to side on plain white paper, and take a clear photo in good light. Upload it with the booking form — nothing has to be posted to India.</p>

<h2>2. The leaf search</h2>
<p>The Nadi readers use the thumb pattern to pick the right bundles of leaves. The search may take some days. You are then called for the session.</p>

<h2>3. The reading on a video call</h2>
<p>On Zoom or WhatsApp video (Zoom in the UAE, where WhatsApp calls are restricted), the reader reads short statements from each leaf and you answer only <em>yes</em> or <em>no</em>. When your name, your parents’ names and other details match, your leaf has been found. The chapters (kandams) you chose are then read. The leaves are in old Tamil; the reading is translated live into English or Hindi, and you receive the recording.</p>

<h2>4. Pandit ji’s analysis and remedies</h2>
<p>Pt. Rajneesh Sharma then studies what the leaf says along with your birth chart and current dasha, and explains the remedies — pooja, mantra, charity or a yantra — in a way you can follow from abroad.</p>

<h2>Time zones</h2>
<p>Slots run in Indian daytime and are shown in your own time zone when you book. Roughly:</p>
<ul>
<li><a href="/nadi-astrology/usa">USA</a> — late evening to early morning, depending on the coast.</li>
<li><a href="/nadi-astrology/uk">UK</a> — early morning to lunchtime.</li>
<li><a href="/nadi-astrology/canada">Canada</a> — late night to early morning in Toronto, evening in Vancouver.</li>
<li><a href="/nadi-astrology/australia">Australia</a> — afternoon and evening.</li>
<li><a href="/nadi-astrology/singapore">Singapore</a> and <a href="/nadi-astrology/malaysia">Malaysia</a> — afternoon and evening.</li>
<li><a href="/nadi-astrology/uae">UAE</a> — your working day.</li>
</ul>

<h2>Payment</h2>
<p>International clients pay in US dollars through PayPal; your card or PayPal converts from your currency automatically.</p>

<h2>Is an online reading as good as being there?</h2>
<p>The leaf is found from the thumb impression, and you answer the questions live, so the process is the same. Many clients also invite parents or relatives in India to join the same call.</p>

<p>Ready to begin? <a href="/book?service=nadi-general-2-kandam">Book an online Nadi reading</a>, or read <a href="/blog/what-is-nadi-astrology">what Nadi astrology is</a> first.</p>
`.trim(),
    contentHi: `
<p>विदेश में रहने वाले बहुत से भारतीय परिवारों के लिए <strong>नाड़ी रीडिंग</strong> का मतलब था तमिलनाडु की अगली यात्रा का इंतज़ार। आज पूरी प्रक्रिया बिना यात्रा के ऑनलाइन हो सकती है। जानिए चरण-दर-चरण।</p>

<h2>1. घर पर अंगूठे का निशान लें</h2>
<p>किसी भी स्टेशनरी दुकान या सुपरमार्केट से इंक पैड लें। पुरुष <strong>दायाँ अंगूठा</strong>, महिलाएँ <strong>बायाँ अंगूठा</strong> इस्तेमाल करें। अंगूठा पैड पर दबाएँ, सादे सफ़ेद कागज़ पर एक ओर से दूसरी ओर हल्का घुमाएँ, और अच्छी रोशनी में साफ़ फोटो लें। इसे बुकिंग फ़ॉर्म के साथ अपलोड करें — भारत कुछ भी डाक से नहीं भेजना।</p>

<h2>2. पट्टे की खोज</h2>
<p>नाड़ी रीडर अंगूठे की रेखाओं से सही गड्डियाँ चुनते हैं। खोज में कुछ दिन लग सकते हैं। फिर आपको सत्र के लिए बुलाया जाता है।</p>

<h2>3. वीडियो कॉल पर रीडिंग</h2>
<p>Zoom या WhatsApp वीडियो पर (UAE में Zoom, जहाँ WhatsApp कॉल पर रोक है) रीडर हर पत्र से छोटे वाक्य पढ़ते हैं और आप सिर्फ़ <em>हाँ</em> या <em>ना</em> कहते हैं। जब आपका नाम, माता-पिता के नाम और बाकी बातें मिल जाती हैं, तो आपका पट्टा मिल गया। फिर आपके चुने हुए कांडम पढ़े जाते हैं। पत्र पुरानी तमिल में हैं; रीडिंग का साथ-साथ अंग्रेज़ी या हिंदी में अनुवाद होता है, और आपको रिकॉर्डिंग मिलती है।</p>

<h2>4. पंडित जी का विश्लेषण और उपाय</h2>
<p>इसके बाद पं. रजनीश शर्मा पट्टे की बातों को आपकी कुंडली और चल रही दशा के साथ देखते हैं, और उपाय — पूजा, मंत्र, दान या यंत्र — ऐसे समझाते हैं कि आप विदेश से भी कर सकें।</p>

<h2>टाइम ज़ोन</h2>
<p>स्लॉट भारत के दिन के समय में होते हैं और बुकिंग के समय आपके टाइम ज़ोन में दिखते हैं। मोटे तौर पर:</p>
<ul>
<li><a href="/nadi-astrology/usa">अमेरिका</a> — तट के अनुसार देर शाम से सुबह तक।</li>
<li><a href="/nadi-astrology/uk">UK</a> — सुबह से दोपहर तक।</li>
<li><a href="/nadi-astrology/canada">कनाडा</a> — टोरंटो में देर रात से सुबह, वैंकूवर में शाम।</li>
<li><a href="/nadi-astrology/australia">ऑस्ट्रेलिया</a> — दोपहर और शाम।</li>
<li><a href="/nadi-astrology/singapore">सिंगापुर</a> और <a href="/nadi-astrology/malaysia">मलेशिया</a> — दोपहर और शाम।</li>
<li><a href="/nadi-astrology/uae">UAE</a> — आपके काम का समय।</li>
</ul>

<h2>भुगतान</h2>
<p>विदेशी क्लाइंट PayPal से US डॉलर में भुगतान करते हैं; आपका कार्ड या PayPal आपकी मुद्रा से अपने-आप बदल देता है।</p>

<h2>क्या ऑनलाइन रीडिंग वहाँ जाने जितनी अच्छी है?</h2>
<p>पट्टा अंगूठे के निशान से मिलता है, और आप प्रश्नों का जवाब लाइव देते हैं, इसलिए प्रक्रिया वही है। कई क्लाइंट भारत में अपने माता-पिता या रिश्तेदारों को भी उसी कॉल में जोड़ लेते हैं।</p>

<p>शुरू करना चाहते हैं? <a href="/book?service=nadi-general-2-kandam">ऑनलाइन नाड़ी रीडिंग बुक करें</a>, या पहले पढ़ें <a href="/blog/what-is-nadi-astrology">नाड़ी ज्योतिष क्या है</a>।</p>
`.trim(),
  },
];
