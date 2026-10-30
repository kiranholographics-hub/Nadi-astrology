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
          <a href="#" className="link-arrow">{t('List of all 16 kandams', 'सभी 16 कांडम की सूची')} →</a>
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
        [L('Is an online reading as accurate as one at the office?', 'क्या ऑनलाइन रीडिंग ऑफिस जितनी ही सही होती है?'), L('[Answer]', '[उत्तर]')],
        [L('Who reads the leaf, and what is Pandit ji’s role?', 'पट्टा कौन पढ़ता है और पंडित जी की भूमिका क्या है?'), L('Traditional Nadi readers read the leaf; Pandit ji interprets it alongside your birth chart and suggests remedies.', 'पट्टा पारंपरिक नाड़ी रीडर पढ़ते हैं; पंडित जी कुंडली के साथ विश्लेषण और उपाय बताते हैं।')],
      ]} />
      <div className="wrap row z" style={{ '--gap': '10px 20px', fontSize: 14, color: 'var(--muted)', paddingBottom: 100, maxWidth: 860 }}>
        {t('Related:', 'संबंधित:')} <a href="#">{t('Online Nadi Reading', 'ऑनलाइन नाड़ी रीडिंग')}</a><a href="#">{t('Nadi Astrology in Jaipur', 'जयपुर में नाड़ी ज्योतिष')}</a><Link to="/blog/vaitheeswaran-koil-nadi-tradition">{t('Vaitheeswaran Koil history', 'वैथीश्वरन कोइल का इतिहास')}</Link><Link to="/yantra-shop">{t('Shanti yantras', 'शांति यंत्र')}</Link>
      </div>
    </PageShell>
  );
}
