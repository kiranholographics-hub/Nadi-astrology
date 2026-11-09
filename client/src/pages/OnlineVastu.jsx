import { Link } from '../components/LangLink.jsx';
import { DISCLAIMER, PageShell } from '../components/Layout.jsx';
import { Breadcrumb, Faq, Steps } from '../components/ui.jsx';
import BookingForm from '../components/BookingForm.jsx';
import { useApp, useT } from '../context/AppContext.jsx';

const L = (en, hi) => ({ en, hi });

export default function OnlineVastu() {
  const t = useT();
  const { currency } = useApp();
  const usd = currency === 'USD';
  return (
    <PageShell title={L('Online Vastu Consultation — Astro-Vastu Report from Your Floor Plan', 'ऑनलाइन वास्तु परामर्श — फ्लोर प्लान से एस्ट्रो-वास्तु रिपोर्ट')} description={L('Online Vastu consultation: a PDF Astro-Vastu report from your floor plan, true North and family birth details, with remedies without demolition. For India and abroad.', 'ऑनलाइन वास्तु परामर्श: फ्लोर प्लान, उत्तर दिशा और परिवार के जन्म विवरण से PDF एस्ट्रो-वास्तु रिपोर्ट, बिना तोड़-फोड़ उपाय। भारत और विदेश।')} cta={{ to: '#form', label: L('Send floor plan', 'फ्लोर प्लान भेजें') }} disclaimer={DISCLAIMER.vastu} seed={113}>
      <section className="hero">
        <div className="wrap-wide stack" style={{ '--gap': '36px' }}>
          <Breadcrumb items={[{ label: L('Vastu', 'वास्तु'), to: '/vastu-consultant-jaipur' }, { label: L('Online Vastu Consultation', 'ऑनलाइन वास्तु परामर्श') }]} />
          <div className="hero-row">
            <div className="hero-text rise">
              <div className="eyebrow-lg">— {t('INDIA + INTERNATIONAL', 'भारत + विदेश')}</div>
              <h1 className="h1">{t('Online Vastu Consultation:', 'ऑनलाइन वास्तु परामर्श:')} <em>{t('a report from your floor plan', 'फ्लोर प्लान से रिपोर्ट')}</em></h1>
              <p className="lead">{t('Send your floor plan, true North and your family’s birth details. Pt. Rajneesh Sharma studies the 16 zones of your home and the birth charts of up to 5 members to prepare a PDF report — remedies without demolition first.', 'फ्लोर प्लान, उत्तर दिशा और घर वालों के जन्म विवरण भेजिए। पं. रजनीश शर्मा घर के 16 ज़ोन और 5 सदस्यों तक की कुंडली देखकर PDF रिपोर्ट बनाते हैं — पहले बिना तोड़-फोड़ उपाय।')}</p>
              <div className="row" style={{ '--gap': '14px' }}>
                <a href="#form" className="btn">{t('Upload floor plan', 'फ्लोर प्लान अपलोड करें')}</a>
                <Link to="/vastu-consultant-jaipur#tiers" className="btn-ghost">{t('Site visit / quick call', 'साइट विज़िट / क्विक कॉल')}</Link>
              </div>
            </div>
            <div className="hero-art">
              <svg viewBox="0 0 600 600" aria-hidden="true">
                <g className="spin" fill="none" stroke="#D9B26F" strokeOpacity=".3"><circle cx="300" cy="300" r="290" /><circle cx="300" cy="300" r="262" strokeDasharray="2 8" /></g>
                <g className="draw" fill="none" stroke="#C9C3D6" strokeOpacity=".8" strokeWidth="2"><rect x="150" y="150" width="300" height="300" /><path d="M150 280 H300 V150 M300 280 V450 M300 360 H450" /></g>
                <g fill="none" stroke="#D9B26F" className="pulse"><path d="M300 300 L300 110 M300 300 L490 300 M300 300 L300 490 M300 300 L110 300 M300 300 L434 166 M300 300 L434 434 M300 300 L166 434 M300 300 L166 166" /></g>
                <g style={{ transformOrigin: '300px 70px', animation: 'needle 5s ease-in-out infinite' }}><circle cx="300" cy="70" r="26" fill="#06070D" stroke="#D9B26F" /><path d="M300 48 L305 70 L300 92 L295 70Z" fill="#D9B26F" /></g>
                <text x="300" y="134" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="12" fill="#F0D49B" letterSpacing="2">{t('TRUE NORTH', 'उत्तर दिशा')}</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap stack" style={{ '--gap': '28px', maxWidth: 900 }}>
          <h2 className="h2 reveal">{t('What is', 'एस्ट्रो-वास्तु')} <em>{t('Astro-Vastu?', 'क्या है?')}</em></h2>
          <div className="prose reveal">
            <p>{t('Classical Vastu Shastra divides a home into 16 zones around its centre (Brahmasthan) and studies what is placed in each — the entrance, kitchen, bedrooms, toilets, water and storage. Astro-Vastu adds one more layer: the birth charts of the people who live there. A zone that is weak for one family member may be supportive for another, so the remedies are matched to your family, not taken from a generic list.', 'पारंपरिक वास्तु शास्त्र घर को उसके केंद्र (ब्रह्मस्थान) के चारों ओर 16 ज़ोन में बाँटता है और देखता है कि हर ज़ोन में क्या है — मुख्य द्वार, रसोई, शयनकक्ष, शौचालय, पानी और भंडारण। एस्ट्रो-वास्तु इसमें एक परत और जोड़ता है: घर में रहने वालों की कुंडलियाँ। जो ज़ोन परिवार के एक सदस्य के लिए कमज़ोर है, वह दूसरे के लिए सहायक हो सकता है, इसलिए उपाय किसी सामान्य सूची से नहीं, आपके परिवार के अनुसार तय होते हैं।')}</p>
            <p>{t('An online Vastu consultation works because everything Vastu needs can be measured from a correct floor plan and true North. That is why it suits flats and apartments, rented homes, homes abroad, and anyone who wants a Vastu check before buying a property — without waiting for a site visit.', 'ऑनलाइन वास्तु परामर्श इसलिए काम करता है क्योंकि वास्तु के लिए ज़रूरी हर चीज़ सही फ्लोर प्लान और असली उत्तर दिशा से नापी जा सकती है। इसीलिए यह फ्लैट और अपार्टमेंट, किराए के घर, विदेश में घर, और प्रॉपर्टी ख़रीदने से पहले वास्तु जाँच चाहने वालों के लिए उपयुक्त है — बिना साइट विज़िट का इंतज़ार किए।')}</p>
          </div>
          <div className="grid reveal" style={{ '--min': '190px', '--gap': '16px' }}>
            {[
              [L('Home & flat', 'घर और फ्लैट'), L('Entrance, kitchen, bedrooms, pooja room and toilets — with remedies for health, harmony and finances.', 'मुख्य द्वार, रसोई, शयनकक्ष, पूजा कक्ष और शौचालय — स्वास्थ्य, सामंजस्य और धन के लिए उपाय।')],
              [L('Office & shop', 'ऑफिस और दुकान'), L('Owner’s seat, cash counter, entrance and the flow of customers and staff.', 'मालिक की सीट, कैश काउंटर, प्रवेश द्वार और ग्राहकों व स्टाफ़ का आना-जाना।')],
              [L('Plot & new construction', 'प्लॉट और नया निर्माण'), L('Plot shape, road direction and the layout before the walls go up — the cheapest time to get Vastu right.', 'प्लॉट का आकार, सड़क की दिशा और दीवारें उठने से पहले का नक्शा — वास्तु ठीक करने का सबसे सस्ता समय।')],
              [L('Homes abroad', 'विदेश में घर'), L('Houses and apartments in the USA, UK, Canada, Australia and the Gulf — using the same 16-zone method.', 'अमेरिका, UK, कनाडा, ऑस्ट्रेलिया और खाड़ी देशों में घर और अपार्टमेंट — उसी 16-ज़ोन पद्धति से।')],
            ].map(([h, d]) => (
              <div key={h.en} className="card" style={{ padding: 24, gap: 8 }}>
                <h3 className="serif" style={{ fontSize: 22, margin: 0, fontWeight: 500 }}>{t(h)}</h3>
                <p className="body">{t(d)}</p>
              </div>
            ))}
          </div>
          <div className="card reveal" style={{ padding: '26px 28px', gap: 12 }}>
            <h3 className="serif" style={{ fontSize: 26, margin: 0, fontWeight: 500 }}>{t('How to find true North for your Vastu report', 'वास्तु रिपोर्ट के लिए सही उत्तर दिशा कैसे निकालें')}</h3>
            <ol className="body" style={{ margin: 0, paddingLeft: '1.2em', display: 'grid', gap: 8, fontSize: 16 }}>
              <li>{t('Stand in the centre of the house, away from the fridge, TV, steel almirahs and the main electrical board — metal and magnets disturb the compass.', 'घर के बीच में खड़े हों, फ्रिज, टीवी, स्टील की अलमारी और मेन बिजली बोर्ड से दूर — धातु और चुंबक कंपास को भटका देते हैं।')}</li>
              <li>{t('Open the compass app on your phone, hold the phone flat and wait until the reading is steady. Calibrate it first if the app asks you to.', 'फ़ोन में कंपास ऐप खोलें, फ़ोन को सीधा (समतल) पकड़ें और रीडिंग स्थिर होने तक रुकें। ऐप कहे तो पहले कैलिब्रेट करें।')}</li>
              <li>{t('Take the reading at 2–3 places in the house and note the degree pointing to North.', 'घर में 2–3 जगह रीडिंग लें और उत्तर दिशा की डिग्री नोट करें।')}</li>
              <li>{t('Draw an arrow for North on your floor plan. If you are unsure, send a photo of the compass screen with the main door visible behind it.', 'फ्लोर प्लान पर उत्तर का तीर बनाएँ। पक्का न हो तो कंपास स्क्रीन की फोटो इस तरह भेजें कि पीछे मुख्य द्वार दिखे।')}</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap section stack" style={{ '--gap': '44px' }}>
          <h2 className="h2 reveal">{t('How online Vastu', 'ऑनलाइन वास्तु')} <em>{t('works', 'कैसे होता है')}</em></h2>
          <Steps items={[
            [L('Upload your plan', 'प्लान अपलोड'), L('Mark North on your floor plan (PDF/photo).', 'फ्लोर प्लान (PDF/फोटो) पर उत्तर दिशा मार्क करें।')],
            [L('Family details', 'घर वालों की जानकारी'), L('Date, time and place of birth for up to 5 members.', '5 सदस्यों तक की जन्म तिथि, समय, स्थान।')],
            [L('PDF report', 'PDF रिपोर्ट'), L('Doshas, zone-wise markings, remedies without demolition, priority list.', 'दोष, ज़ोन-वार मार्किंग, बिना तोड़-फोड़ उपाय, प्राथमिकता सूची।')],
            [L('Follow-up call', 'फॉलो-अप कॉल'), L('Discuss the report with Pandit ji and ask your questions.', 'रिपोर्ट पर पंडित जी से बात और प्रश्न।')],
          ]} />
        </div>
      </section>

      <section className="section">
        <div className="wrap row" style={{ '--gap': '48px' }}>
          <div className="stack reveal" style={{ flex: '1 1 380px', '--gap': '18px' }}>
            <div className="eyebrow">— {t('Fee', 'फ़ीस')}</div>
            <div className="card-price" style={{ fontSize: 56 }}>{usd ? '[$ __ / sq.ft]' : '[₹ __ / sq.ft]'}</div>
            <p className="body">{t('Minimum', 'न्यूनतम')} {usd ? '[$ PRICE]' : '[₹ PRICE]'} · {t('India + international. International: PayPal (USD) · India: Razorpay.', 'भारत + विदेश। विदेश: PayPal (USD) · भारत: Razorpay।')}</p>
          </div>
          <div className="stack reveal" style={{ flex: '1 1 420px', '--gap': '14px' }}>
            <div className="eyebrow">— {t('For a new home or plot', 'नए घर / प्लॉट के लिए')}</div>
            <h3 className="h3" style={{ fontSize: 32 }}>{t('Vastu planning before construction', 'निर्माण से पहले वास्तु प्लानिंग')}</h3>
            <p className="body">{t('If Vastu is checked before buying a plot and while the plan is being drawn, no changes are needed later. If required, Pandit ji coordinates with your architect.', 'प्लॉट लेने से पहले और नक्शा बनते समय ही वास्तु देख लिया जाए तो बाद में बदलाव नहीं करने पड़ते। ज़रूरत हो तो पंडित जी आपके आर्किटेक्ट के साथ तालमेल करते हैं।')}</p>
          </div>
        </div>
      </section>

      <section id="form" className="band">
        <div className="wrap section row" style={{ '--gap': '48px' }}>
          <BookingForm
            title={L('Send your floor plan', 'अपना फ्लोर प्लान भेजें')}
            submitLabel={L('See quote and pay', 'कोटेशन देखें और भुगतान करें')}
            services={[{ value: 'vastu-online-report', label: L('Online Astro-Vastu report', 'ऑनलाइन एस्ट्रो-वास्तु रिपोर्ट') }]}
            fields={[
              { name: 'name', label: L('Full name', 'पूरा नाम'), required: true },
              { name: 'phone', label: L('Phone / WhatsApp', 'फ़ोन / WhatsApp'), type: 'tel', required: true },
              { name: 'country', label: L('Country', 'देश') },
              { name: 'propertyType', label: L('Property type', 'प्रॉपर्टी का प्रकार'), type: 'select', options: [{ value: 'Home', label: L('Home', 'घर') }, { value: 'Flat / Apartment', label: L('Flat / Apartment', 'फ्लैट / अपार्टमेंट') }, { value: 'Plot', label: L('Plot', 'प्लॉट') }, { value: 'Office', label: L('Office', 'ऑफिस') }, { value: 'Shop', label: L('Shop', 'दुकान') }, { value: 'Factory', label: L('Factory', 'फैक्ट्री') }] },
              { name: 'areaSqft', label: L('Area (sq.ft)', 'क्षेत्रफल (वर्ग फ़ुट)'), type: 'number', min: 1 },
              { name: 'floorPlan', label: L('Floor plan (PDF / photo — please mark North)', 'फ्लोर प्लान (PDF / फोटो, उत्तर दिशा मार्क करें)'), type: 'file', full: true },
              { name: 'membersText', label: L('Date, time and place of birth of family members (up to 5)', 'घर वालों की जन्म तिथि, समय, स्थान (5 तक)'), type: 'textarea', full: true },
              { name: 'mainProblem', label: L('Main concern', 'मुख्य समस्या'), type: 'textarea', full: true, rows: 3 },
            ]}
          />
        </div>
      </section>

      <section style={{ paddingTop: 'var(--sp-section)' }}>
        <Faq title={L('Online Vastu FAQ', 'ऑनलाइन वास्तु — प्रश्न-उत्तर')} items={[
          [L('How does online Vastu work?', 'ऑनलाइन वास्तु कैसे होता है?'), L('A report is prepared from your floor plan, North direction and family details, followed by a call.', 'फ्लोर प्लान, उत्तर दिशा और सदस्यों की जानकारी से रिपोर्ट बनती है, फिर कॉल।')],
          [L('Will I need to demolish anything?', 'क्या तोड़-फोड़ करनी पड़ेगी?'), L('Remedies without demolition come first; structural changes only if truly needed.', 'पहले बिना तोड़-फोड़ के उपाय दिए जाते हैं; बदलाव सिर्फ़ ज़रूरत पर।')],
          [L('How many days does the report take?', 'रिपोर्ट कितने दिन में मिलेगी?'), L('[__] days.', '[__] दिन।')],
        [L('Is online Vastu as accurate as a site visit?', 'क्या ऑनलाइन वास्तु साइट विज़िट जितना सही होता है?'), L('For most homes and flats, yes — provided the floor plan is to scale and North is measured correctly. A site visit is better for factories, large plots and new construction, where the surroundings matter more.', 'ज़्यादातर घरों और फ्लैट के लिए हाँ — बशर्ते फ्लोर प्लान सही नाप का हो और उत्तर दिशा ठीक से नापी गई हो। फैक्ट्री, बड़े प्लॉट और नए निर्माण के लिए साइट विज़िट बेहतर है, जहाँ आसपास का माहौल ज़्यादा मायने रखता है।')],
        [L('I don’t have a floor plan. What can I send?', 'मेरे पास फ्लोर प्लान नहीं है। क्या भेजूँ?'), L('A neat hand-drawn sketch with the room sizes, door and window positions and the North arrow is enough. Photos or a video walk-through of each room help as well.', 'कमरों के नाप, दरवाज़े-खिड़की की जगह और उत्तर के तीर के साथ साफ़ हाथ से बना स्केच काफ़ी है। हर कमरे की फोटो या वीडियो भी मदद करते हैं।')],
        [L('Can Vastu be done for a rented house or flat?', 'क्या किराए के घर या फ्लैट का वास्तु हो सकता है?'), L('Yes. In a rented home the remedies focus on how rooms are used, furniture placement, colours and yantras — nothing that needs the owner’s permission.', 'हाँ। किराए के घर में उपाय कमरों के उपयोग, फर्नीचर की जगह, रंग और यंत्रों पर केंद्रित होते हैं — ऐसा कुछ नहीं जिसके लिए मालिक की अनुमति चाहिए।')],
        [L('Why are birth details of family members needed?', 'घर वालों के जन्म विवरण क्यों चाहिए?'), L('In Astro-Vastu, the zones of the house are read together with the charts of the people living there, so the remedies suit your family — for example, which zone supports the earning member or a child’s studies.', 'एस्ट्रो-वास्तु में घर के ज़ोन को वहाँ रहने वालों की कुंडलियों के साथ पढ़ा जाता है, ताकि उपाय आपके परिवार के अनुकूल हों — जैसे कौन-सा ज़ोन कमाने वाले सदस्य या बच्चे की पढ़ाई में सहायक है।')],
        [L('Do you check a property before I buy it?', 'क्या ख़रीदने से पहले प्रॉपर्टी की जाँच करते हैं?'), L('Yes. Send the builder’s plan or brochure layout and the direction of the main road; you get a clear view of the strengths and doshas before you commit.', 'हाँ। बिल्डर का प्लान या ब्रोशर का नक्शा और मुख्य सड़क की दिशा भेजें; पैसा लगाने से पहले आपको उसकी अच्छाइयाँ और दोष साफ़ पता चल जाते हैं।')],
        ]} />
      </section>
      <div className="wrap row z" style={{ '--gap': '10px 20px', fontSize: 14, color: 'var(--muted)', paddingBottom: 'var(--sp-section)', maxWidth: 860 }}>
        {t('Related:', 'संबंधित:')} <Link to="/vastu-consultant-jaipur">{t('Vastu consultant in Jaipur — site visit', 'जयपुर में वास्तु सलाहकार — साइट विज़िट')}</Link><Link to="/blog/vastu-remedies-without-demolition">{t('Vastu remedies without demolition', 'बिना तोड़-फोड़ वास्तु उपाय')}</Link><Link to="/yantra-shop?category=Vastu">{t('Vastu yantras', 'वास्तु यंत्र')}</Link><Link to="/vedic-astrology">{t('Vedic birth chart reading', 'वैदिक कुंडली विश्लेषण')}</Link>
      </div>
    </PageShell>
  );
}
