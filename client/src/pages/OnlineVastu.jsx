import { Link } from 'react-router-dom';
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

      <section style={{ paddingTop: 110 }}>
        <Faq title={L('Online Vastu FAQ', 'ऑनलाइन वास्तु — प्रश्न-उत्तर')} items={[
          [L('How does online Vastu work?', 'ऑनलाइन वास्तु कैसे होता है?'), L('A report is prepared from your floor plan, North direction and family details, followed by a call.', 'फ्लोर प्लान, उत्तर दिशा और सदस्यों की जानकारी से रिपोर्ट बनती है, फिर कॉल।')],
          [L('Will I need to demolish anything?', 'क्या तोड़-फोड़ करनी पड़ेगी?'), L('Remedies without demolition come first; structural changes only if truly needed.', 'पहले बिना तोड़-फोड़ के उपाय दिए जाते हैं; बदलाव सिर्फ़ ज़रूरत पर।')],
          [L('How many days does the report take?', 'रिपोर्ट कितने दिन में मिलेगी?'), L('[__] days.', '[__] दिन।')],
        ]} />
      </section>
    </PageShell>
  );
}
