import { Link } from 'react-router-dom';
import { DISCLAIMER, PageShell } from '../components/Layout.jsx';
import { Breadcrumb, ClientQuote, Faq, Steps } from '../components/ui.jsx';
import BookingForm from '../components/BookingForm.jsx';
import { usePrice, useT } from '../context/AppContext.jsx';

const L = (en, hi) => ({ en, hi });

export default function KundliMilan() {
  const t = useT();
  const price = usePrice();
  return (
    <PageShell title={L('Kundli Matching — Guna Milan & Manglik Check Before Marriage', 'कुंडली मिलान — शादी से पहले गुण मिलान और मांगलिक जाँच')} description={L('Kundli matching by Pt. Rajneesh Sharma, Jaipur: guna milan, Manglik check and guidance. Report + 20-minute call, at the office or by video.', 'पं. रजनीश शर्मा, जयपुर द्वारा कुंडली मिलान: गुण मिलान, मांगलिक जाँच और मार्गदर्शन। रिपोर्ट + 20 मिनट कॉल, ऑफिस या वीडियो।')} cta={{ to: '#form', label: L('Book Kundli Matching', 'कुंडली मिलान बुक करें') }} disclaimer={DISCLAIMER.default} seed={109}>
      <section className="hero">
        <div className="wrap-wide stack" style={{ '--gap': '36px' }}>
          <Breadcrumb items={[{ label: L('Vedic', 'वैदिक'), to: '/vedic-astrology' }, { label: L('Kundli Matching', 'कुंडली मिलान') }]} />
          <div className="hero-row">
            <div className="hero-text rise">
              <div className="eyebrow-lg">— {t('BEFORE MARRIAGE', 'शादी से पहले')}</div>
              <h1 className="h1">{t('Kundli Matching:', 'कुंडली मिलान:')} <em>{t('two charts, one path', 'दो कुंडली, एक रास्ता')}</em></h1>
              <p className="lead">{t('Guna milan, Manglik check and Pandit ji’s guidance — a report plus a 20-minute call. At the office or by video call, in English or Hindi.', 'गुण मिलान, मांगलिक जाँच और पंडित जी का मार्गदर्शन — रिपोर्ट के साथ 20 मिनट कॉल। ऑफिस विज़िट या वीडियो कॉल, हिंदी और अंग्रेज़ी में।')}</p>
              <div className="row" style={{ '--gap': '14px' }}>
                <a href="#form" className="btn">{t('Book Kundli Matching', 'कुंडली मिलान बुक करें')}</a>
                <Link to="/vedic-astrology" className="btn-ghost">{t('Vedic consultation', 'वैदिक परामर्श')}</Link>
              </div>
            </div>
            <div className="hero-art">
              <svg viewBox="0 0 600 600" aria-hidden="true">
                <g className="spin" fill="none" stroke="#D9B26F" strokeOpacity=".35"><circle cx="300" cy="300" r="290" /><circle cx="300" cy="300" r="262" strokeDasharray="2 8" /></g>
                <g className="draw" fill="none" stroke="#D9B26F" strokeWidth="1.3">
                  <rect x="90" y="200" width="200" height="200" /><path d="M90 200 L290 400 M290 200 L90 400 M190 200 L290 300 L190 400 L90 300Z" />
                  <rect x="310" y="200" width="200" height="200" /><path d="M310 200 L510 400 M510 200 L310 400 M410 200 L510 300 L410 400 L310 300Z" />
                </g>
                <g className="pulse"><circle cx="300" cy="300" r="34" fill="#06070D" stroke="#F0D49B" /><text x="300" y="306" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="18" fill="#F0D49B">36</text></g>
                <text x="300" y="470" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="13" fill="#A7A2B8" letterSpacing="3">{t('GUNA MILAN', 'गुण मिलान')}</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap section row" style={{ '--gap': '48px' }}>
          <div className="stack reveal" style={{ flex: '1 1 380px', '--gap': '20px' }}>
            <div className="eyebrow">— {t('What you get', 'क्या मिलेगा')}</div>
            <h2 className="h2">{t('Report + 20-minute call', 'रिपोर्ट + 20 मिनट कॉल')}</h2>
            <div className="card-list" style={{ fontSize: 16 }}>
              <span className="tick">{t('Guna milan (36 gunas)', 'गुण मिलान (36 गुण)')}</span>
              <span className="tick">{t('Manglik check', 'मांगलिक जाँच')}</span>
              <span className="tick">{t('Pandit ji’s guidance and remedies', 'पंडित जी का मार्गदर्शन और उपाय')}</span>
              <span className="tick">{t('Written summary on WhatsApp', 'लिखित सारांश WhatsApp पर')}</span>
            </div>
          </div>
          <div className="card featured reveal" style={{ flex: '1 1 320px', padding: 40, alignSelf: 'flex-start' }}>
            <span className="eyebrow" style={{ letterSpacing: '.25em', fontSize: 12 }}>{t('KUNDLI MATCHING', 'कुंडली मिलान')}</span>
            <div className="card-price" style={{ fontSize: 48 }}>{price(null, null)}</div>
            <div className="small">{t('India: Razorpay · International: PayPal', 'भारत: Razorpay · विदेश: PayPal')}</div>
            <a href="#form" className="btn btn-sm">{t('Book', 'बुक करें')}</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap stack" style={{ '--gap': '44px' }}>
          <h2 className="h2 reveal">{t('How it works', 'कैसे काम करता है')}</h2>
          <Steps min={260} items={[
            [L('Birth details of both', 'दोनों के जन्म विवरण'), L('Send the date, time and place of birth of the groom and the bride.', 'लड़के और लड़की की जन्म तिथि, समय, स्थान भेजें।')],
            [L('Report prepared', 'रिपोर्ट तैयार'), L('A report on guna milan and the Manglik check.', 'गुण मिलान और मांगलिक जाँच की रिपोर्ट।')],
            [L('20-minute call', '20 मिनट कॉल'), L('Discuss the report with Pandit ji, ask questions and get guidance.', 'पंडित जी के साथ रिपोर्ट पर बात, प्रश्न और मार्गदर्शन।')],
          ]} />
        </div>
      </section>

      <section id="form" className="band">
        <div className="wrap section row" style={{ '--gap': '48px' }}>
          <BookingForm
            title={L('Send the birth details of both', 'दोनों के जन्म विवरण भेजें')}
            submitLabel={L('Choose a slot and pay', 'स्लॉट चुनें और भुगतान करें')}
            services={[{ value: 'kundli-milan', label: L('Kundli Matching', 'कुंडली मिलान') }]}
            fields={[
              { name: 'name', label: L('Your name', 'आपका नाम'), required: true },
              { name: 'phone', label: L('Phone / WhatsApp', 'फ़ोन / WhatsApp'), type: 'tel', required: true },
              { name: 'dob', label: L('Groom’s date of birth', 'लड़के की जन्म तिथि'), type: 'date' },
              { name: 'tob', label: L('Groom’s time of birth', 'लड़के का जन्म समय'), type: 'time' },
              { name: 'pob', label: L('Groom’s place of birth', 'लड़के का जन्म स्थान') },
              { name: 'mode', label: L('How would you like to meet?', 'कैसे मिलना है'), type: 'select', options: [{ value: 'video', label: L('Video call', 'वीडियो कॉल') }, { value: 'office', label: L('Office visit (Jaipur)', 'ऑफिस विज़िट (जयपुर)') }] },
              { name: 'membersText', label: L('Bride’s date, time and place of birth', 'लड़की की जन्म तिथि, समय, स्थान'), type: 'textarea', full: true, rows: 2 },
              { name: 'question', label: L('Any specific question', 'कोई खास प्रश्न'), type: 'textarea', full: true, rows: 3 },
            ]}
          />
          <ClientQuote label={L('Kundli Matching client testimonial', 'कुंडली मिलान क्लाइंट का अनुभव')} city={L('[Name], [City]', '[नाम], [शहर]')} />
        </div>
      </section>

      <section style={{ paddingTop: 110 }}>
        <Faq title={L('Kundli Matching FAQ', 'कुंडली मिलान — प्रश्न-उत्तर')} items={[
          [L('How long does it take?', 'कितना समय लगता है?'), L('Report + 20-minute call. The report takes [__] days to prepare.', 'रिपोर्ट + 20 मिनट कॉल। रिपोर्ट तैयार होने का समय: [__] दिन।')],
          [L('What if a birth time is unknown?', 'जन्म समय पता न हो तो?'), L('Speak with Pandit ji — he can advise on alternatives such as KP Prashna.', 'पंडित जी से बात करें — केपी प्रश्न जैसे विकल्प पर सलाह मिल सकती है।')],
          [L('Can it be done online?', 'क्या ऑनलाइन हो सकता है?'), L('Yes, by video call. International clients can pay in USD via PayPal.', 'हाँ, वीडियो कॉल पर। विदेश के क्लाइंट PayPal से USD में भुगतान कर सकते हैं।')],
        ]} />
      </section>
    </PageShell>
  );
}
