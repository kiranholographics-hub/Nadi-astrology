import { Link } from 'react-router-dom';
import { DISCLAIMER, PageShell } from '../components/Layout.jsx';
import { Breadcrumb, ClientQuote, Faq, PriceCard, Steps } from '../components/ui.jsx';
import BookingForm from '../components/BookingForm.jsx';
import { usePrice, useT } from '../context/AppContext.jsx';

const L = (en, hi) => ({ en, hi });

const PLANETS = [['Su · Bu', 300, 220], ['Ma', 215, 165], ['Gu', 385, 165], ['Sa', 170, 305], ['Ra', 430, 305], ['Ch · Sh', 300, 395], ['Ke', 215, 445]];

export default function Vedic() {
  const t = useT();
  const price = usePrice();
  const cta = { to: '#form', label: L('Book Birth Chart Consultation', 'कुंडली परामर्श बुक करें') };
  return (
    <PageShell title={L('Vedic Astrologer in Jaipur: Birth Chart Consultation', 'जयपुर में वैदिक ज्योतिषी: कुंडली परामर्श')} description={L('Vedic birth chart consultation with Pt. Rajneesh Sharma, Jaipur — career, marriage, business, dasha periods and remedies. 30 or 60 minutes, office visit or video call.', 'पं. रजनीश शर्मा, जयपुर से वैदिक कुंडली परामर्श — करियर, शादी, व्यापार, दशा और उपाय। 30 या 60 मिनट, ऑफिस विज़िट या वीडियो कॉल।')} cta={cta} disclaimer={DISCLAIMER.default} seed={23}>
      <section className="hero">
        <div className="wrap-wide stack" style={{ '--gap': '36px' }}>
          <Breadcrumb items={[{ label: L('Vedic Astrology', 'वैदिक ज्योतिष') }]} />
          <div className="hero-row">
            <div className="hero-text rise">
              <div className="eyebrow-lg">— {t('VEDIC ASTROLOGY · 10+ YEARS', 'वैदिक ज्योतिष · 10+ साल')}</div>
              <h1 className="h1">{t('Vedic Astrologer in Jaipur:', 'जयपुर में वैदिक ज्योतिषी:')} <em>{t('Birth Chart Consultation', 'कुंडली परामर्श')}</em></h1>
              <p className="lead">{t('A complete reading of your birth chart for career, marriage, business and life direction — with dasha periods, remedies and a recording. 30 or 60 minutes, at the office or by video call.', 'करियर, शादी, व्यापार और जीवन की दिशा के लिए कुंडली का पूरा विश्लेषण — दशा, उपाय और रिकॉर्डिंग के साथ। 30 या 60 मिनट, ऑफिस विज़िट या वीडियो कॉल।')}</p>
              <div className="row" style={{ '--gap': '14px' }}>
                <a href="#form" className="btn">{t('Book Birth Chart Consultation', 'कुंडली परामर्श बुक करें')}</a>
                <Link to="/kundli-milan" className="btn-ghost">{t('Kundli Matching', 'कुंडली मिलान')}</Link>
              </div>
            </div>
            <div className="hero-art">
              <svg viewBox="0 0 600 600" aria-hidden="true">
                <g className="spin" fill="none" stroke="#D9B26F" strokeOpacity=".35"><circle cx="300" cy="300" r="290" /><circle cx="300" cy="300" r="270" strokeDasharray="2 61" /></g>
                <g className="spin-rev" fill="none" stroke="#EDE6D6" strokeOpacity=".2"><circle cx="300" cy="300" r="250" strokeDasharray="1 6" /></g>
                <g className="draw" fill="none" stroke="#D9B26F" strokeWidth="1.4">
                  <rect x="130" y="130" width="340" height="340" />
                  <path d="M130 130 L470 470 M470 130 L130 470" />
                  <path d="M300 130 L470 300 L300 470 L130 300Z" />
                </g>
                <g fontFamily="Manrope, sans-serif" fontSize="15" fill="#F0D49B" textAnchor="middle">
                  {PLANETS.map(([p, x, y], i) => <text key={p} className="pulse" x={x} y={y} style={{ animationDelay: `${i * 0.5}s` }}>{p}</text>)}
                </g>
                <text x="300" y="290" fontFamily="Cormorant Garamond, serif" fontSize="13" fill="#A7A2B8" textAnchor="middle">LAGNA</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap section row" style={{ '--gap': '56px' }}>
          <div className="stack reveal" style={{ flex: '1 1 380px', '--gap': '22px' }}>
            <div className="eyebrow">— {t('Who it’s for', 'किसके लिए')}</div>
            <h2 className="h2" style={{ fontSize: 'clamp(32px,3.6vw,48px)' }}>{t('When the decision is a big one.', 'जब फ़ैसला बड़ा हो।')}</h2>
            <div className="row" style={{ '--gap': '10px' }}>
              {[L('Career', 'करियर'), L('Marriage', 'शादी'), L('Business', 'व्यापार'), L('Life direction', 'जीवन की दिशा')].map((c) => <span key={c.en} className="chip" style={{ fontSize: 15, padding: '12px 20px' }}>{t(c)}</span>)}
            </div>
          </div>
          <div className="hairline reveal" style={{ flex: '1.3 1 480px', '--min': '200px' }}>
            {[['I', L('Chart analysis', 'कुंडली विश्लेषण'), L('Analysis of the ascendant, planets and houses', 'लग्न, ग्रह और भाव का विश्लेषण')], ['II', L('Dasha', 'दशा'), L('Which period you are in now, and what comes next', 'अभी कौन-सा समय चल रहा है, आगे क्या')], ['III', L('Remedies', 'उपाय'), L('Remedies and guidance rooted in the shastras', 'शास्त्र-आधारित उपाय और मार्गदर्शन')], ['IV', L('Recording', 'रिकॉर्डिंग'), L('Call recording and a written summary on WhatsApp', 'कॉल की रिकॉर्डिंग और लिखित सारांश WhatsApp पर')]].map(([n, head, d]) => (
              <div key={n} style={{ padding: '30px 26px', gap: 10 }}>
                <span className="big-num" style={{ fontSize: 40 }}>{n}</span>
                <span style={{ fontSize: 18, fontWeight: 600 }}>{t(head)}</span>
                <span className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>{t(d)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="section">
        <div className="wrap stack" style={{ '--gap': '40px' }}>
          <h2 className="h2 reveal">{t('Packages & Fees', 'पैकेज और फ़ीस')}</h2>
          <div className="grid reveal" style={{ '--min': '280px' }}>
            <PriceCard kicker={L('30 MIN · OFFICE OR VIDEO CALL', '30 मिनट · ऑफिस या वीडियो कॉल')} title={L('Vedic Birth Chart — 30 min', 'वैदिक कुंडली — 30 मिनट')} price={price(null, null)} points={[L('1–2 main questions', '1–2 मुख्य प्रश्न'), L('Dasha and remedies', 'दशा और उपाय'), L('Recording', 'रिकॉर्डिंग')]} />
            <PriceCard featured kicker={L('60 MIN · OFFICE OR VIDEO CALL', '60 मिनट · ऑफिस या वीडियो कॉल')} title={L('Vedic Birth Chart — 60 min', 'वैदिक कुंडली — 60 मिनट')} price={price(null, null)} points={[L('Full birth chart analysis', 'पूरी कुंडली का विश्लेषण'), L('Career, marriage, business, dasha', 'करियर, शादी, व्यापार, दशा'), L('Remedies + recording + written summary', 'उपाय + रिकॉर्डिंग + लिखित सारांश')]} />
            <PriceCard kicker={L('BEFORE MARRIAGE', 'शादी से पहले')} title={L('Kundli Matching', 'कुंडली मिलान')} price={price(null, null)} points={[L('Report + 20 min call', 'रिपोर्ट + 20 मिनट कॉल'), L('Guna milan, Manglik check', 'गुण मिलान, मांगलिक जाँच'), L('Guidance', 'मार्गदर्शन')]} to="/kundli-milan" cta={L('View Kundli Matching', 'कुंडली मिलान देखें')} />
          </div>
          <p className="body" style={{ fontSize: 14 }}>{t('India: Razorpay (UPI, card, netbanking) · International: PayPal (USD).', 'भारत: Razorpay (UPI, कार्ड, नेटबैंकिंग) · विदेश: PayPal (USD)।')}</p>
        </div>
      </section>

      <section className="band">
        <div className="wrap section stack" style={{ '--gap': '44px' }}>
          <h2 className="h2 reveal">{t('How it works', 'कैसे काम करता है')}</h2>
          <Steps min={260} items={[
            [L('Choose a service and slot', 'सेवा और स्लॉट चुनें'), L('A calendar in your own time zone. Office visit or video call.', 'आपके टाइम ज़ोन में कैलेंडर। ऑफिस विज़िट या वीडियो कॉल।')],
            [L('Birth details and payment', 'जन्म विवरण और भुगतान'), L('Date, time and place of birth, and your question. India: Razorpay · International: PayPal.', 'जन्म तिथि, समय, स्थान और आपका प्रश्न। भारत: Razorpay · विदेश: PayPal।')],
            [L('Consultation and recording', 'परामर्श और रिकॉर्डिंग'), L('Speak directly with Pandit ji; a written summary of remedies follows on WhatsApp.', 'पंडित जी से सीधी बात, उपायों का लिखित सारांश WhatsApp पर।')],
          ]} />
        </div>
      </section>

      <section id="form" className="section">
        <div className="wrap row" style={{ '--gap': '48px' }}>
          <BookingForm
            title={L('Send your birth details', 'जन्म विवरण भेजें')}
            submitLabel={L('Choose a slot and pay', 'स्लॉट चुनें और भुगतान करें')}
            services={[
              { value: 'vedic-60', label: L('Vedic Birth Chart — 60 min', 'वैदिक कुंडली — 60 मिनट') },
              { value: 'vedic-30', label: L('Vedic Birth Chart — 30 min', 'वैदिक कुंडली — 30 मिनट') },
              { value: 'kundli-milan', label: L('Kundli Matching', 'कुंडली मिलान') },
            ]}
            fields={[
              { name: 'name', label: L('Full name', 'पूरा नाम'), required: true },
              { name: 'phone', label: L('Phone / WhatsApp', 'फ़ोन / WhatsApp'), type: 'tel', required: true },
              { name: 'dob', label: L('Date of birth', 'जन्म तिथि'), type: 'date' },
              { name: 'tob', label: L('Time of birth', 'जन्म समय'), type: 'time' },
              { name: 'pob', label: L('Place of birth', 'जन्म स्थान') },
              { name: 'mode', label: L('How would you like to meet?', 'कैसे मिलना है'), type: 'select', options: [{ value: 'video', label: L('Video call', 'वीडियो कॉल') }, { value: 'office', label: L('Office visit (Jaipur)', 'ऑफिस विज़िट (जयपुर)') }] },
              { name: 'question', label: L('Your question', 'आपका प्रश्न'), type: 'textarea', full: true },
            ]}
          />
          <ClientQuote label={L('Birth chart client video testimonial', 'कुंडली क्लाइंट का वीडियो अनुभव')} city={L('[Name], [City]', '[नाम], [शहर]')} />
        </div>
      </section>

      <Faq title={L('Vedic Astrology FAQ', 'वैदिक ज्योतिष — प्रश्न-उत्तर')} items={[
        [L('How long is a consultation?', 'परामर्श कितनी देर का होता है?'), L('30 or 60 minutes. Kundli Matching is a report + 20-minute call.', '30 या 60 मिनट। कुंडली मिलान में रिपोर्ट + 20 मिनट कॉल।')],
        [L('What if I don’t know my birth time?', 'जन्म समय नहीं पता तो क्या करें?'), <>{t('KP Prashna does not need a birth time.', 'केपी प्रश्न में जन्म समय की ज़रूरत नहीं होती।')} <Link to="/kp-prashna">{t('See KP Prashna', 'केपी प्रश्न देखें')} →</Link></>],
        [L('Do you also suggest yantras?', 'क्या यंत्र भी सुझाया जाता है?'), <>{t('If needed, a yantra is suggested during the consultation and the direct link is sent to you on WhatsApp.', 'ज़रूरत हो तो परामर्श में यंत्र सुझाया जाता है, और उसका सीधा लिंक WhatsApp पर भेजा जाता है।')} <Link to="/yantra-shop">{t('Yantra Shop', 'यंत्र शॉप')} →</Link></>],
      ]} />
    </PageShell>
  );
}
