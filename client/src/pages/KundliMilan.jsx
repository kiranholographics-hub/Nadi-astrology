import { Link } from '../components/LangLink.jsx';
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
        <div className="wrap stack" style={{ '--gap': '28px', maxWidth: 900 }}>
          <h2 className="h2 reveal">{t('What is', 'कुंडली मिलान')} <em>{t('Kundli Matching?', 'क्या है?')}</em></h2>
          <div className="prose reveal">
            <p>{t('Kundli matching (kundli milan or horoscope matching) compares the birth charts of the bride and groom before marriage. The best-known part is Ashtakoota guna milan: eight factors (kootas) carrying 36 gunas in all, calculated from the Moon’s nakshatra of each person. Traditionally 18 or more gunas is considered acceptable, 24+ good and 28+ very good.', 'कुंडली मिलान (गुण मिलान) में शादी से पहले लड़के और लड़की की कुंडलियों को मिलाया जाता है। इसका सबसे प्रसिद्ध भाग अष्टकूट गुण मिलान है: आठ कूट, जिनमें कुल 36 गुण होते हैं, और जो दोनों के चंद्र नक्षत्र से निकाले जाते हैं। परंपरा में 18 या उससे अधिक गुण स्वीकार्य, 24+ अच्छे और 28+ बहुत अच्छे माने जाते हैं।')}</p>
            <p>{t('But the guna score alone is not enough — a match with 30 gunas can still have problems, and one with 20 can work very well. That is why Pandit ji also checks Manglik dosha in both charts and whether it is cancelled, Nadi and Bhakoot dosha and their exceptions, the 7th house and its lord, the Navamsha (D-9) chart, and the dasha periods both of you will run after marriage.', 'लेकिन सिर्फ़ गुणों की संख्या काफ़ी नहीं — 30 गुण वाले मिलान में भी परेशानी हो सकती है और 20 गुण वाला मिलान बहुत अच्छा चल सकता है। इसीलिए पंडित जी दोनों कुंडलियों में मांगलिक दोष और उसका परिहार, नाड़ी और भकूट दोष व उनके अपवाद, सप्तम भाव और उसका स्वामी, नवांश (D-9) कुंडली, और शादी के बाद दोनों की चलने वाली दशाएँ भी देखते हैं।')}</p>
          </div>
          <div className="card reveal" style={{ padding: 0, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
              <caption style={{ textAlign: 'left', padding: '18px 22px 6px', color: 'var(--muted)', fontSize: 13 }}>{t('Ashtakoota guna milan — the 8 kootas', 'अष्टकूट गुण मिलान — 8 कूट')}</caption>
              <thead>
                <tr style={{ textAlign: 'left' }}><th style={{ padding: '12px 22px' }}>{t('Koota', 'कूट')}</th><th style={{ padding: '12px 22px' }}>{t('Gunas', 'गुण')}</th><th style={{ padding: '12px 22px' }}>{t('What it shows', 'क्या बताता है')}</th></tr>
              </thead>
              <tbody>
                {[
                  [L('Varna', 'वर्ण'), 1, L('Spiritual and work temperament', 'आध्यात्मिक और कार्य स्वभाव')],
                  [L('Vashya', 'वश्य'), 2, L('Mutual attraction and influence', 'आपसी आकर्षण और प्रभाव')],
                  [L('Tara', 'तारा'), 3, L('Destiny, health and well-being', 'भाग्य, स्वास्थ्य और कुशलता')],
                  [L('Yoni', 'योनि'), 4, L('Physical and intimate compatibility', 'शारीरिक और दांपत्य अनुकूलता')],
                  [L('Graha Maitri', 'ग्रह मैत्री'), 5, L('Mental harmony and friendship', 'मानसिक तालमेल और मित्रता')],
                  [L('Gana', 'गण'), 6, L('Nature: Deva, Manushya or Rakshasa', 'स्वभाव: देव, मनुष्य या राक्षस')],
                  [L('Bhakoot', 'भकूट'), 7, L('Family welfare, finances, children', 'परिवार का कल्याण, धन, संतान')],
                  [L('Nadi', 'नाड़ी'), 8, L('Health and progeny', 'स्वास्थ्य और संतान')],
                ].map(([k, n, d]) => (
                  <tr key={k.en} style={{ borderTop: '1px solid var(--line)' }}><td style={{ padding: '12px 22px' }}>{t(k)}</td><td style={{ padding: '12px 22px' }}>{n}</td><td className="muted" style={{ padding: '12px 22px' }}>{t(d)}</td></tr>
                ))}
                <tr style={{ borderTop: '1px solid var(--line)', fontWeight: 600 }}><td style={{ padding: '12px 22px' }}>{t('Total', 'कुल')}</td><td style={{ padding: '12px 22px' }}>36</td><td style={{ padding: '12px 22px' }} /></tr>
              </tbody>
            </table>
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
        [L('How many gunas should match for marriage?', 'शादी के लिए कितने गुण मिलने चाहिए?'), L('Out of 36, 18 or more is traditionally acceptable, 24+ is good and 28+ very good. But the final advice also depends on Manglik dosha, Nadi and Bhakoot dosha and the 7th house — not on the score alone.', '36 में से 18 या अधिक परंपरा से स्वीकार्य, 24+ अच्छे और 28+ बहुत अच्छे माने जाते हैं। लेकिन अंतिम सलाह मांगलिक दोष, नाड़ी व भकूट दोष और सप्तम भाव पर भी निर्भर करती है — सिर्फ़ गुणों पर नहीं।')],
        [L('What is Manglik dosha, and can a Manglik marry a non-Manglik?', 'मांगलिक दोष क्या है, और क्या मांगलिक की शादी गैर-मांगलिक से हो सकती है?'), L('Manglik dosha is formed when Mars sits in certain houses (1, 2, 4, 7, 8 or 12) of the chart. In many charts it is cancelled by other factors. Where it is not, matching with another Manglik or specific remedies are considered — it should never be a reason for fear.', 'मांगलिक दोष तब बनता है जब मंगल कुंडली के कुछ भावों (1, 2, 4, 7, 8 या 12) में हो। कई कुंडलियों में दूसरे कारणों से इसका परिहार हो जाता है। जहाँ नहीं होता, वहाँ दूसरे मांगलिक से मिलान या ख़ास उपाय देखे जाते हैं — यह कभी डर का कारण नहीं होना चाहिए।')],
        [L('What is Nadi dosha in kundli matching?', 'कुंडली मिलान में नाड़ी दोष क्या है?'), L('When both partners have the same Nadi (Aadi, Madhya or Antya), the Nadi koota scores 0 of 8 — this is Nadi dosha. There are recognised exceptions, for example when the nakshatras or Moon signs differ in certain ways.', 'जब दोनों की नाड़ी (आदि, मध्य या अंत्य) एक हो, तो नाड़ी कूट में 8 में से 0 गुण मिलते हैं — यही नाड़ी दोष है। इसके मान्य अपवाद भी हैं, जैसे जब नक्षत्र या चंद्र राशि एक ख़ास तरह से अलग हों।')],
        [L('Is kundli matching useful for love marriage?', 'क्या लव मैरिज में कुंडली मिलान उपयोगी है?'), L('Yes. In a love marriage the question is rarely “yes or no” — the matching shows the areas that need care and the right time for the wedding, with remedies where needed.', 'हाँ। लव मैरिज में सवाल अक्सर “हाँ या ना” का नहीं होता — मिलान से पता चलता है कि किन बातों का ध्यान रखना है और शादी का सही समय क्या है, ज़रूरत हो तो उपायों के साथ।')],
        ]} />
      </section>
      <div className="wrap row z" style={{ '--gap': '10px 20px', fontSize: 14, color: 'var(--muted)', paddingBottom: 100, maxWidth: 860 }}>
        {t('Related:', 'संबंधित:')} <Link to="/vedic-astrology">{t('Vedic birth chart consultation', 'वैदिक कुंडली परामर्श')}</Link><Link to="/kp-prashna">{t('KP Prashna: “When will I get married?”', 'केपी प्रश्न: “शादी कब होगी?”')}</Link><Link to="/nadi-astrology">{t('Nadi reading — Kandam 7 (marriage)', 'नाड़ी रीडिंग — कांडम 7 (विवाह)')}</Link><Link to="/yantra-shop">{t('Yantras for marriage', 'विवाह के लिए यंत्र')}</Link>
      </div>
    </PageShell>
  );
}
