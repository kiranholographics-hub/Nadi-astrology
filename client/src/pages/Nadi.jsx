import { Link } from 'react-router-dom';
import { DISCLAIMER, PageShell } from '../components/Layout.jsx';
import { Breadcrumb, ClientQuote, Faq, PlayBox, PriceCard, Steps } from '../components/ui.jsx';
import BookingForm from '../components/BookingForm.jsx';
import useCountries from '../components/useCountries.js';
import { useApp, usePrice, useT } from '../context/AppContext.jsx';

const L = (en, hi) => ({ en, hi });
const KANDAMS = [
  [L('Kandam 1 · General', 'कांडम 1 · सामान्य'), L('The essence of your life', 'जीवन का सार')],
  [L('Kandam 2 · Family, wealth', 'कांडम 2 · परिवार, धन'), L('Education and family', 'शिक्षा और कुटुंब')],
  [L('Kandam 7 · Marriage', 'कांडम 7 · विवाह'), L('Marriage and life partner', 'शादी और जीवनसाथी')],
  [L('Kandam 10 · Career', 'कांडम 10 · करियर'), L('Job and business', 'नौकरी और व्यापार')],
  [L('Kandam 12 · Foreign lands', 'कांडम 12 · विदेश'), L('Expenses, travel, moksha', 'खर्च, यात्रा, मोक्ष')],
  [L('Kandam 13 · Shanti', 'कांडम 13 · शांति'), L('Past karma and remedies', 'पूर्व कर्म और उपाय')],
];

// All 16 kandams (chapters) of a Nadi leaf reading.
const ALL_KANDAMS = [
  L('1 · General — a summary of your whole life, with your name and family details', '1 · सामान्य — पूरे जीवन का सार, आपके नाम और परिवार के विवरण के साथ'),
  L('2 · Family, wealth, education and speech', '2 · परिवार, धन, शिक्षा और वाणी'),
  L('3 · Siblings, courage and effort', '3 · भाई-बहन, साहस और पराक्रम'),
  L('4 · Mother, home, land, vehicles and comforts', '4 · माता, घर, ज़मीन, वाहन और सुख'),
  L('5 · Children and their future', '5 · संतान और उनका भविष्य'),
  L('6 · Health problems, debts, enemies and court cases', '6 · रोग, कर्ज़, शत्रु और कोर्ट-केस'),
  L('7 · Marriage and life partner', '7 · विवाह और जीवनसाथी'),
  L('8 · Longevity and accidents', '8 · आयु और दुर्घटनाएँ'),
  L('9 · Father, fortune, spirituality and pilgrimages', '9 · पिता, भाग्य, आध्यात्म और तीर्थ'),
  L('10 · Career, job and business', '10 · करियर, नौकरी और व्यापार'),
  L('11 · Gains, profits and second marriage', '11 · लाभ, आय और दूसरा विवाह'),
  L('12 · Expenses, foreign travel and settlement abroad, moksha', '12 · खर्च, विदेश यात्रा और विदेश में बसना, मोक्ष'),
  L('13 · Shanti — past-life karma and the remedies for it', '13 · शांति — पूर्व जन्म के कर्म और उनके उपाय'),
  L('14 · Deeksha — mantra and protection (raksha)', '14 · दीक्षा — मंत्र और रक्षा'),
  L('15 · Aushadha — traditional medicine for illnesses', '15 · औषध — रोगों के लिए पारंपरिक औषधि'),
  L('16 · Dasa-Bhukti — predictions period by period (planetary dashas)', '16 · दशा-भुक्ति — ग्रहों की दशा के अनुसार समय-समय की भविष्यवाणी'),
];

export default function Nadi() {
  const t = useT();
  const countries = useCountries();
  const price = usePrice();
  const { currency } = useApp();
  const note = currency === 'USD' ? L('for international clients · PayPal', 'विदेशी क्लाइंट के लिए · PayPal') : L('India · Razorpay (UPI, card)', 'भारत · Razorpay (UPI, कार्ड)');
  const cta = { to: '#form', label: L('Book Nadi Reading', 'नाड़ी रीडिंग बुक करें') };

  return (
    <PageShell title={L('Nadi Astrology: Palm Leaf Reading in Jaipur & Online', 'नाड़ी ज्योतिष: जयपुर और ऑनलाइन ताड़-पत्र रीडिंग')} description={L('Nadi palm leaf reading by traditional Nadi readers, with Vedic/KP analysis and remedies by Pt. Rajneesh Sharma. Office visit in Jaipur or online video call.', 'पारंपरिक नाड़ी रीडर्स द्वारा ताड़-पत्र रीडिंग, साथ में पं. रजनीश शर्मा का वैदिक/केपी विश्लेषण और उपाय। जयपुर ऑफिस या ऑनलाइन वीडियो कॉल।')} cta={cta} disclaimer={DISCLAIMER.jyotish} seed={11}>
      <section className="hero">
        <div className="wrap-wide stack" style={{ '--gap': '36px' }}>
          <Breadcrumb items={[{ label: L('Nadi Astrology', 'नाड़ी ज्योतिष') }]} />
          <div className="hero-row">
            <div className="hero-text rise">
              <div className="eyebrow-lg">— {t('NADI ASTROLOGY', 'नाड़ी ज्योतिष')}</div>
              <h1 className="h1">{t('Nadi Astrology: Palm Leaf Reading', 'नाड़ी ज्योतिष: ताड़-पत्र रीडिंग')} <em>{t('in Jaipur & Online', 'जयपुर और ऑनलाइन')}</em></h1>
              <p className="lead">{t('Experienced Nadi readers of the Vaitheeswaran Koil tradition search for and read your leaf. Pt. Rajneesh Sharma then studies it alongside your birth chart with Vedic/KP analysis and explains the remedies and the way forward.', 'वैथीश्वरन कोइल परंपरा के अनुभवी नाड़ी रीडर आपका पट्टा खोजते और पढ़ते हैं। उसके बाद पं. रजनीश शर्मा आपकी कुंडली के साथ वैदिक/केपी विश्लेषण करके उपाय और आगे का रास्ता समझाते हैं।')}</p>
              <div className="row" style={{ '--gap': '14px' }}>
                <a href="#form" className="btn">{t('Book Nadi Reading', 'नाड़ी रीडिंग बुक करें')}</a>
                <a href="#process" className="btn-ghost">{t('See the process', 'प्रक्रिया देखें')}</a>
              </div>
              <div className="row" style={{ '--gap': '10px' }}>
                <span className="chip">{t('Office visit or video call', 'ऑफिस विज़िट या वीडियो कॉल')}</span>
                <span className="chip">{t('English · Hindi · Tamil', 'हिंदी · अंग्रेज़ी · तमिल')}</span>
                <span className="chip">{t('Refund if no leaf is found', 'पट्टा न मिले तो रिफंड')}</span>
              </div>
            </div>
            <div className="hero-art">
              <svg viewBox="0 0 600 600" aria-hidden="true">
                <g className="spin" fill="none" stroke="#D9B26F" strokeOpacity=".35"><circle cx="300" cy="300" r="290" /><circle cx="300" cy="300" r="262" strokeDasharray="2 8" /></g>
                {[[-24, 0, '#2A2238', '.4'], [-12, 0.6, '#2E2640', '.5'], [12, 1.2, '#2E2640', '.5'], [24, 1.8, '#2A2238', '.4']].map(([r, d, f, o]) => (
                  <g key={r} style={{ '--r': `${r}deg`, transformOrigin: '300px 300px', animation: `sway 7s ease-in-out ${d}s infinite` }}>
                    <rect x="70" y="282" width="460" height="36" rx="18" fill={f} stroke="#D9B26F" strokeOpacity={o} />
                  </g>
                ))}
              </svg>
              <div style={{ position: 'absolute', left: '50%', top: '50%', width: '64%', transform: 'translate(-50%,-50%)', boxShadow: '0 30px 80px rgba(0,0,0,.6)' }}>
                <PlayBox label={L('Pandit ji’s video: how a Nadi reading works (2–3 min)', 'पंडित जी का वीडियो: नाड़ी रीडिंग कैसे होती है (2–3 मिनट)')} ratio="16 / 10" style={{ borderColor: 'var(--gold)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap stack" style={{ '--gap': '28px', maxWidth: 900 }}>
          <h2 className="h2 reveal">{t('What is', 'नाड़ी ज्योतिष')} <em>{t('Nadi Astrology?', 'क्या है?')}</em></h2>
          <div className="prose reveal">
            <p>{t('Nadi astrology (Nadi Jyotish) is an ancient South Indian tradition in which predictions are read from palm leaves (taada patra) written in old Tamil script. According to the tradition, these leaves were written by sages such as Agastya and Kaushika, and each leaf describes the life of one person. The best-known centre of the Nadi tradition is Vaitheeswaran Koil in Tamil Nadu, where families of Nadi readers have kept and read the leaves for generations.', 'नाड़ी ज्योतिष दक्षिण भारत की एक प्राचीन परंपरा है, जिसमें पुरानी तमिल लिपि में लिखे ताड़-पत्रों से भविष्य पढ़ा जाता है। परंपरा के अनुसार ये पत्र अगस्त्य, कौशिक जैसे ऋषियों ने लिखे थे, और हर पत्र में एक व्यक्ति के जीवन का वर्णन होता है। नाड़ी परंपरा का सबसे प्रसिद्ध केंद्र तमिलनाडु का वैथीश्वरन कोइल है, जहाँ नाड़ी रीडर्स के परिवार पीढ़ियों से इन पत्रों को सँभालते और पढ़ते आए हैं।')}</p>
            <p>{t('Your leaf is found from your thumb impression — the right thumb for men and the left thumb for women. The leaves are grouped by thumb-print patterns; the Nadi reader then reads out short statements from each bundle and you answer only “yes” or “no”. When your name, your parents’ names and other details match, your leaf has been found. No birth chart or birth time is needed to find it.', 'आपका पट्टा अंगूठे के निशान से खोजा जाता है — पुरुषों का दायाँ और महिलाओं का बायाँ अंगूठा। पत्र अंगूठे की रेखाओं के प्रकार के अनुसार बँटे होते हैं; नाड़ी रीडर हर गड्डी से छोटे-छोटे वाक्य पढ़ते हैं और आप सिर्फ़ “हाँ” या “ना” कहते हैं। जब आपका नाम, माता-पिता के नाम और बाकी बातें मिल जाती हैं, तो आपका पट्टा मिल गया। पट्टा खोजने के लिए कुंडली या जन्म समय की ज़रूरत नहीं होती।')}</p>
            <p>{t('Once the leaf is found, it is read chapter by chapter (kandam) — general life, career, marriage, health, foreign travel, and the Shanti kandam with remedies for past karma. Pt. Rajneesh Sharma, a Vedic and KP astrologer in Jaipur, then checks what the leaf says against your birth chart and current dasha, so you get both: the Nadi reading and a clear, practical plan with remedies and timing.', 'पट्टा मिलने के बाद उसे अध्याय (कांडम) के अनुसार पढ़ा जाता है — सामान्य जीवन, करियर, विवाह, स्वास्थ्य, विदेश यात्रा, और शांति कांडम जिसमें पूर्व कर्मों के उपाय होते हैं। इसके बाद जयपुर के वैदिक और केपी ज्योतिषी पं. रजनीश शर्मा पट्टे की बातों को आपकी कुंडली और चल रही दशा से मिलाकर देखते हैं, ताकि आपको दोनों मिलें: नाड़ी रीडिंग और उपाय व समय के साथ एक साफ़, व्यावहारिक योजना।')}</p>
          </div>
          <div className="grid reveal" style={{ '--min': '240px', '--gap': '16px' }}>
            {[
              [L('Nadi reading in Jaipur', 'जयपुर में नाड़ी रीडिंग'), L('Come to the office in Jaipur, give your thumb impression and sit through the reading with a translator.', 'जयपुर ऑफिस आएँ, अंगूठे का निशान दें और अनुवादक के साथ रीडिंग में बैठें।')],
              [L('Online Nadi reading', 'ऑनलाइन नाड़ी रीडिंग'), L('From anywhere in India or abroad: upload a thumb photo and join the reading on a video call.', 'भारत या विदेश में कहीं से भी: अंगूठे की फोटो अपलोड करें और वीडियो कॉल पर रीडिंग में जुड़ें।')],
              [L('Reading + astrology', 'रीडिंग + ज्योतिष'), L('The leaf reading is cross-checked with Vedic/KP astrology, so remedies and timing are practical.', 'पट्टे की रीडिंग को वैदिक/केपी ज्योतिष से मिलाया जाता है, ताकि उपाय और समय व्यावहारिक हों।')],
            ].map(([h, d]) => (
              <div key={h.en} className="card" style={{ padding: 26, gap: 8 }}>
                <h3 className="serif" style={{ fontSize: 24, margin: 0, fontWeight: 500 }}>{t(h)}</h3>
                <p className="body">{t(d)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="band">
        <div className="wrap section stack" style={{ '--gap': '44px' }}>
          <h2 className="h2 reveal">{t('Nadi Reading Procedure:', 'नाड़ी रीडिंग की प्रक्रिया:')} <em>{t('4 Steps', '4 चरण')}</em></h2>
          <Steps items={[
            [L('Send your thumb impression', 'अंगूठे का निशान भेजें'), L('Men: right thumb · Women: left thumb. Upload online or give it at the office.', 'पुरुष: दायाँ अंगूठा · महिला: बायाँ। ऑनलाइन अपलोड या ऑफिस में।')],
            [L('Your leaf is searched for', 'पट्टा खोजा जाता है'), L('The Nadi reader asks questions; you simply answer yes or no. Time: [__] days.', 'नाड़ी रीडर प्रश्न पूछते हैं, आप सिर्फ़ हाँ या ना कहते हैं। समय: [__] दिन।')],
            [L('Your leaf is read', 'पट्टा पढ़ा जाता है'), L('On a video call or at the office, with translation. You receive the recording.', 'वीडियो कॉल या ऑफिस में, अनुवाद के साथ। रिकॉर्डिंग मिलती है।')],
            [L('Pandit ji’s analysis', 'पंडित जी का विश्लेषण'), L('Vedic/KP analysis with your birth chart, remedies and yantra advice.', 'कुंडली के साथ वैदिक/केपी विश्लेषण, उपाय और यंत्र सलाह।')],
          ]} />
        </div>
      </section>

      <section className="section">
        <div className="wrap stack" style={{ '--gap': '36px' }}>
          <h2 className="h2 reveal">{t('Nadi Kandams:', 'नाड़ी कांडम:')} <em>{t('what is read', 'क्या-क्या पढ़ा जाता है')}</em></h2>
          <div className="grid reveal" style={{ '--min': '260px', '--gap': '16px' }}>
            {KANDAMS.map(([k, d]) => (
              <div key={k.en} className="card" style={{ padding: 26, gap: 8 }}>
                <span className="eyebrow" style={{ letterSpacing: '.25em', fontSize: 12 }}>{t(k)}</span>
                <span className="serif" style={{ fontSize: 24 }}>{t(d)}</span>
              </div>
            ))}
          </div>
          <details id="all-kandams" className="card reveal" style={{ padding: '22px 26px' }}>
            <summary className="link-arrow" style={{ cursor: 'pointer' }}>{t('List of all 16 kandams', 'सभी 16 कांडम की सूची')} →</summary>
            <ol className="body" style={{ listStyle: 'none', padding: 0, margin: '18px 0 0', display: 'grid', gap: 10, fontSize: 16 }}>
              {ALL_KANDAMS.map((k) => <li key={k.en}>{t(k)}</li>)}
            </ol>
          </details>
        </div>
      </section>

      <section className="band">
        <div className="wrap section stack" style={{ '--gap': '40px' }}>
          <h2 className="h2 reveal">{t('Packages & Fees', 'पैकेज और फ़ीस')}</h2>
          <div className="grid reveal" style={{ '--min': '280px' }}>
            <PriceCard title={L('General (Kandam 1)', 'सामान्य (कांडम 1)')} price={price(null, null)} sub={note} points={[L('Leaf search + general reading', 'पट्टा खोज + सामान्य रीडिंग'), L('Recording', 'रिकॉर्डिंग')]} />
            <PriceCard featured badge={L('RECOMMENDED', 'सुझाया गया')} title={L('General + 2 Kandams + Analysis', 'सामान्य + 2 कांडम + विश्लेषण')} price={price(null, null)} sub={note} points={[L('2 kandams of your choice', 'आपकी पसंद के 2 कांडम'), L('Vedic/KP analysis by Pt. Rajneesh Sharma', 'पं. रजनीश शर्मा का वैदिक/केपी विश्लेषण'), L('Written summary of remedies', 'उपायों का लिखित सारांश')]} />
            <PriceCard title={L('Shanti Kandam (remedies)', 'शांति कांडम (उपाय)')} price={price(null, null)} sub={note} points={[L('Past karma and traditional remedies', 'पूर्व कर्म और पारंपरिक उपाय'), L('Yantra advice', 'यंत्र सलाह')]} />
          </div>
          <p className="body" style={{ fontSize: 14 }}>{t('If no leaf is found: [refund policy, agreed with the Nadi readers]. India: Razorpay (UPI, card) · International: PayPal.', 'पट्टा न मिले तो: [रिफंड नीति, नाड़ी रीडर्स से तय करके]। भारत: Razorpay (UPI, कार्ड) · विदेश: PayPal।')}</p>
        </div>
      </section>

      <section id="form" className="section">
        <div className="wrap row" style={{ '--gap': '48px' }}>
          <BookingForm
            title={L('Send your thumb impression and details', 'अंगूठे का निशान और जानकारी भेजें')}
            services={[
              { value: 'nadi-general-2-kandam', label: L('General + 2 Kandams + Analysis', 'सामान्य + 2 कांडम + विश्लेषण') },
              { value: 'nadi-general', label: L('General (Kandam 1)', 'सामान्य (कांडम 1)') },
              { value: 'nadi-shanti', label: L('Shanti Kandam (remedies)', 'शांति कांडम (उपाय)') },
            ]}
            fields={[
              { name: 'name', label: L('Full name', 'पूरा नाम'), required: true },
              { name: 'phone', label: L('WhatsApp number', 'WhatsApp नंबर'), type: 'tel', required: true },
              { name: 'gender', label: L('Gender', 'लिंग'), type: 'select', options: [{ value: 'purush', label: L('Male', 'पुरुष') }, { value: 'mahila', label: L('Female', 'महिला') }] },
              { name: 'country', label: L('Country', 'देश') },
              { name: 'thumbImpression', label: L('Thumb impression photo', 'अंगूठे के निशान की फोटो'), type: 'file', full: true, icon: 'thumb', accept: 'image/*', hint: L('Upload a photo (Men: right thumb · Women: left thumb)', 'फोटो अपलोड करें (पुरुष: दायाँ · महिला: बायाँ)') },
            ]}
          />
          <ClientQuote label={L('Nadi client video testimonial', 'नाड़ी क्लाइंट का वीडियो अनुभव')} />
        </div>
      </section>

      {countries.length > 0 && (
        <section className="section-tight">
          <div className="wrap stack" style={{ '--gap': '24px' }}>
            <div className="stack reveal" style={{ '--gap': '10px' }}>
              <div className="eyebrow">— {t('Worldwide', 'दुनिया भर में')}</div>
              <h2 className="h2" style={{ fontSize: 'clamp(30px,3.4vw,46px)' }}>{t('Online Nadi readings', 'ऑनलाइन नाड़ी रीडिंग')} <em>{t('from abroad', 'विदेश से')}</em></h2>
              <p className="body">{t('Slot times in your time zone, fees in USD, and yantra shipping to your country.', 'आपके टाइम ज़ोन में स्लॉट का समय, USD में फ़ीस, और आपके देश तक यंत्र शिपिंग।')}</p>
            </div>
            <div className="grid reveal" style={{ '--min': '200px', '--gap': '12px' }}>
              {countries.map((c) => (
                <Link key={c.slug} to={`/nadi-astrology/${c.slug}`} className="card" style={{ padding: '20px 22px', gap: 6 }}>
                  <span className="eyebrow" style={{ letterSpacing: '.25em', fontSize: 11 }}>{c.code}</span>
                  <span className="serif" style={{ fontSize: 24 }}>{t(c.name, c.nameHi || null)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Faq title={L('Nadi Astrology FAQ', 'नाड़ी ज्योतिष — प्रश्न-उत्तर')} items={[
        [L('Is a leaf found for everyone?', 'क्या हर व्यक्ति का पट्टा मिलता है?'), L('No — not everyone has a leaf. If yours is not found: [refund policy].', 'नहीं, हर किसी का पट्टा होना ज़रूरी नहीं। न मिले तो [रिफंड नीति]।')],
        [L('Is an online reading as accurate as one at the office?', 'क्या ऑनलाइन रीडिंग ऑफिस जितनी ही सही होती है?'), L('Yes. The leaf is searched from your thumb impression, so the process is the same — you answer the reader’s yes/no questions live on the video call, and you receive the recording.', 'हाँ। पट्टा अंगूठे के निशान से खोजा जाता है, इसलिए प्रक्रिया वही रहती है — आप वीडियो कॉल पर लाइव रीडर के हाँ/ना वाले सवालों का जवाब देते हैं, और रिकॉर्डिंग आपको मिलती है।')],
        [L('Who reads the leaf, and what is Pandit ji’s role?', 'पट्टा कौन पढ़ता है और पंडित जी की भूमिका क्या है?'), L('Traditional Nadi readers read the leaf; Pandit ji interprets it alongside your birth chart and suggests remedies.', 'पट्टा पारंपरिक नाड़ी रीडर पढ़ते हैं; पंडित जी कुंडली के साथ विश्लेषण और उपाय बताते हैं।')],
        [L('Do I need my birth time or birth chart for a Nadi reading?', 'क्या नाड़ी रीडिंग के लिए जन्म समय या कुंडली चाहिए?'), L('No. The leaf is found from the thumb impression alone. If you know your birth details, Pandit ji also uses them for the Vedic/KP analysis.', 'नहीं। पट्टा सिर्फ़ अंगूठे के निशान से मिलता है। जन्म विवरण पता हो तो पंडित जी उसे वैदिक/केपी विश्लेषण में भी इस्तेमाल करते हैं।')],
        [L('Which thumb impression should I send?', 'किस अंगूठे का निशान भेजें?'), L('Men send the right thumb and women the left thumb. Press the thumb on an ink pad, roll it gently on white paper, and send a clear, well-lit photo.', 'पुरुष दाएँ और महिलाएँ बाएँ अंगूठे का निशान भेजें। अंगूठे को स्याही पैड पर लगाकर सफ़ेद कागज़ पर हल्का घुमाएँ, और साफ़, अच्छी रोशनी में फोटो भेजें।')],
        [L('In which language is the leaf read?', 'पट्टा किस भाषा में पढ़ा जाता है?'), L('The leaves are written in old Tamil. The reader reads them in Tamil and it is translated into Hindi or English for you during the session.', 'पत्र पुरानी तमिल में लिखे होते हैं। रीडर तमिल में पढ़ते हैं और सत्र के दौरान आपके लिए हिंदी या अंग्रेज़ी में अनुवाद किया जाता है।')],
        [L('What is the Shanti kandam?', 'शांति कांडम क्या है?'), L('Kandam 13 describes karma from past lives that is said to cause present problems, and the traditional remedies for it — pooja, mantra, temple visits and charity.', 'कांडम 13 में पूर्व जन्म के उन कर्मों का वर्णन होता है जिन्हें वर्तमान समस्याओं का कारण माना जाता है, और उनके पारंपरिक उपाय — पूजा, मंत्र, मंदिर दर्शन और दान।')],
      ]} />
      <div className="wrap row z" style={{ '--gap': '10px 20px', fontSize: 14, color: 'var(--muted)', paddingBottom: 100, maxWidth: 860 }}>
        {t('Related:', 'संबंधित:')} <Link to="/book?service=nadi-general-2-kandam">{t('Book an Online Nadi Reading', 'ऑनलाइन नाड़ी रीडिंग बुक करें')}</Link><Link to="/contact">{t('Nadi Astrology office in Jaipur', 'जयपुर में नाड़ी ज्योतिष ऑफिस')}</Link><Link to="/blog/what-is-nadi-astrology">{t('What is Nadi astrology?', 'नाड़ी ज्योतिष क्या है?')}</Link><Link to="/vedic-astrology">{t('Vedic birth chart reading', 'वैदिक कुंडली विश्लेषण')}</Link><Link to="/blog/vaitheeswaran-koil-nadi-tradition">{t('Vaitheeswaran Koil history', 'वैथीश्वरन कोइल का इतिहास')}</Link><Link to="/yantra-shop">{t('Shanti yantras', 'शांति यंत्र')}</Link>
      </div>
    </PageShell>
  );
}
