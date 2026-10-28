import { Link } from 'react-router-dom';
import { DISCLAIMER, PageShell } from '../components/Layout.jsx';
import { Breadcrumb, Faq, PriceCard } from '../components/ui.jsx';
import BookingForm from '../components/BookingForm.jsx';
import { useApp, useT } from '../context/AppContext.jsx';

const L = (en, hi) => ({ en, hi });

const ZONES = [[300, 40], [400, 60], [484, 116], [540, 200], [560, 300], [540, 400], [484, 484], [400, 540], [300, 560], [200, 540], [116, 484], [60, 400], [40, 300], [60, 200], [116, 116], [200, 60]];
const DIRS = [['N', 300, 30], ['NE', 500, 105], ['E', 575, 304], ['SE', 500, 508], ['S', 300, 582], ['SW', 100, 508], ['W', 25, 304], ['NW', 100, 105]];

const PROPERTIES = [
  [L('Vastu for Home', 'घर का वास्तु'), <><path d="M6 18 L20 6 L34 18 V34 H6Z" /><path d="M16 34 V24 H24 V34" /></>],
  [L('Flat / Apartment', 'फ्लैट / अपार्टमेंट'), <><rect x="10" y="4" width="20" height="32" /><path d="M15 10 H18 M22 10 H25 M15 16 H18 M22 16 H25 M15 22 H18 M22 22 H25 M18 36 V30 H22 V36" /></>],
  [L('Plot & new home', 'प्लॉट और नया घर'), <><rect x="6" y="10" width="28" height="22" strokeDasharray="3 3" /><path d="M20 4 V10" /></>],
  [L('Office', 'ऑफिस'), <><rect x="6" y="12" width="28" height="20" rx="2" /><path d="M15 12 V8 H25 V12 M6 20 H34" /></>],
  [L('Shop', 'दुकान'), <><path d="M6 14 L9 6 H31 L34 14 Z M8 14 V34 H32 V14" /><path d="M16 34 V24 H24 V34" /></>],
  [L('Factory', 'फैक्ट्री'), <path d="M4 34 V18 L14 24 V18 L24 24 V8 H32 V34 Z" />],
];
const ROOMS = [L('East facing', 'पूर्वमुखी'), L('West facing', 'पश्चिममुखी'), L('North facing', 'उत्तरमुखी'), L('South facing', 'दक्षिणमुखी'), L('Main door', 'मुख्य द्वार'), L('Kitchen', 'रसोई'), L('Bedroom', 'शयनकक्ष'), L('Pooja room', 'पूजा कक्ष'), L('Toilet', 'शौचालय'), L('Wealth zone', 'धन क्षेत्र')];

export default function Vastu() {
  const t = useT();
  const { currency } = useApp();
  const usd = currency === 'USD';
  const cta = { to: '#form', label: L('Send floor plan', 'फ्लोर प्लान भेजें') };

  return (
    <PageShell title={L('Vastu Consultant in Jaipur: Home, Office & Factory', 'जयपुर में वास्तु सलाहकार: घर, ऑफिस और फैक्ट्री')} description={L('Astro-Vastu by Pt. Rajneesh Sharma, Jaipur: your floor plan read together with the birth charts of up to 5 family members. Remedies without demolition first. Online report, quick call or site visit.', 'पं. रजनीश शर्मा, जयपुर द्वारा एस्ट्रो-वास्तु: घर के प्लान के साथ परिवार के 5 सदस्यों तक की कुंडली। पहले बिना तोड़-फोड़ उपाय। ऑनलाइन रिपोर्ट, क्विक कॉल या साइट विज़िट।')} cta={cta} disclaimer={DISCLAIMER.vastu} seed={41}>
      <section className="hero">
        <div className="wrap-wide stack" style={{ '--gap': '36px' }}>
          <Breadcrumb items={[{ label: L('Vastu Consultant', 'वास्तु सलाहकार') }]} />
          <div className="hero-row">
            <div className="hero-text rise" style={{ flexBasis: 440 }}>
              <div className="eyebrow-lg">— {t('ASTRO-VASTU', 'एस्ट्रो-वास्तु')}</div>
              <h1 className="h1">{t('Vastu Consultant in Jaipur:', 'जयपुर में वास्तु सलाहकार:')} <em>{t('Home, Office & Factory', 'घर, ऑफिस और फैक्ट्री')}</em></h1>
              <p className="lead">{t('Astro-Vastu: your floor plan is studied together with the birth charts of up to 5 family members. Remedies without demolition come first; structural changes only when truly needed.', 'एस्ट्रो-वास्तु: घर के प्लान के साथ परिवार के 5 सदस्यों तक की कुंडली देखी जाती है। पहले बिना तोड़-फोड़ उपाय, निर्माण में बदलाव सिर्फ़ ज़रूरत पर।')}</p>
              <div className="row" style={{ '--gap': '14px' }}>
                <a href="#form" className="btn">{t('Online Vastu report', 'ऑनलाइन वास्तु रिपोर्ट')}</a>
                <Link to="/online-vastu-consultation" className="btn-ghost">{t('How online Vastu works', 'ऑनलाइन वास्तु कैसे होता है')}</Link>
              </div>
            </div>
            <div style={{ flex: '1 1 560px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ position: 'relative', aspectRatio: '1 / 1', maxWidth: 620, width: '100%', border: '1px solid var(--line-2)', borderRadius: 4, background: 'var(--bg-2)', overflow: 'hidden' }}>
                <svg viewBox="0 0 600 600" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
                  <g className="draw" fill="none" stroke="#C9C3D6" strokeOpacity=".7" strokeWidth="2">
                    <rect x="110" y="110" width="380" height="380" />
                    <path d="M110 270 H290 V110 M290 270 V490 M290 360 H490 M380 360 V490 M110 400 H290" />
                    <path d="M240 490 V470 M200 490 V470" strokeWidth="3" />
                  </g>
                  <g fontFamily="Manrope, sans-serif" fontSize="13" fill="#8E89A3" textAnchor="middle">
                    <text x="200" y="195">{t('Bedroom', 'शयनकक्ष')}</text><text x="390" y="240">{t('Living', 'बैठक')}</text><text x="200" y="340">{t('Pooja', 'पूजा')}</text><text x="200" y="450">{t('Kitchen', 'रसोई')}</text><text x="335" y="430">{t('Toilet', 'शौचालय')}</text><text x="435" y="430">{t('Bedroom', 'शयनकक्ष')}</text>
                  </g>
                  <g fill="none" stroke="#D9B26F" strokeWidth="1" style={{ animation: 'pulse 4s ease-in-out infinite' }}>
                    {ZONES.map(([x, y]) => <line key={`${x}-${y}`} x1="300" y1="300" x2={x} y2={y} />)}
                    <circle cx="300" cy="300" r="40" />
                  </g>
                  <g fontFamily="Manrope, sans-serif" fontSize="12" fill="#F0D49B" textAnchor="middle" letterSpacing="1">
                    {DIRS.map(([d, x, y]) => <text key={d} x={x} y={y}>{d}</text>)}
                    <text x="300" y="304" fill="#D9B26F">{t('BRAHMA', 'ब्रह्म')}</text>
                  </g>
                  <g style={{ transformOrigin: '520px 80px', animation: 'needle 5s ease-in-out infinite' }}>
                    <circle cx="520" cy="80" r="30" fill="#06070D" stroke="#D9B26F" />
                    <path d="M520 56 L526 80 L520 104 L514 80Z" fill="#D9B26F" />
                  </g>
                </svg>
              </div>
              <div className="small">{t('Example of a 16-zone Vastu grid over a floor plan (a real client plan, name removed)', 'फ्लोर प्लान पर 16-ज़ोन वास्तु ग्रिड का उदाहरण (असली क्लाइंट प्लान, नाम हटाकर)')}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="tiers" className="band">
        <div className="wrap section stack" style={{ '--gap': '40px' }}>
          <h2 className="h2 reveal">{t('3 types of', '3 तरह का')} <em>{t('Vastu consultation', 'वास्तु परामर्श')}</em></h2>
          <div className="grid reveal" style={{ '--min': '280px' }}>
            <PriceCard title={L('Quick call', 'क्विक कॉल')} price="[₹ PRICE]" sub={L('30 min · before buying a flat or plot', '30 मिनट · फ्लैट/प्लॉट लेने से पहले')} points={[L('Verbal guidance on your floor plan', 'फ्लोर प्लान पर मौखिक मार्गदर्शन'), L('WhatsApp summary', 'WhatsApp सारांश')]} cta={L('Book a call', 'कॉल बुक करें')} />
            <PriceCard featured badge={L('ASTRO-VASTU', 'एस्ट्रो-वास्तु')} title={L('Online Astro-Vastu report', 'ऑनलाइन एस्ट्रो-वास्तु रिपोर्ट')} price={usd ? '[$ __ / sq.ft]' : '[₹ __ / sq.ft]'} sub={L(`Minimum ${usd ? '[$ PRICE]' : '[₹ PRICE]'} · India + international`, `न्यूनतम ${usd ? '[$ PRICE]' : '[₹ PRICE]'} · भारत + विदेश`)} points={[L('PDF report: doshas, zone-wise markings', 'PDF रिपोर्ट: दोष, ज़ोन-वार मार्किंग'), L('Matched with birth charts of up to 5 members', '5 सदस्यों तक कुंडली मिलान'), L('Remedies without demolition, priority list', 'बिना तोड़-फोड़ उपाय, प्राथमिकता सूची'), L('Follow-up call', 'फॉलो-अप कॉल')]} cta={L('Upload your plan', 'प्लान अपलोड करें')} />
            <PriceCard title={L('Site visit', 'साइट विज़िट')} price={t('[₹ PRICE] + travel', '[₹ PRICE] + यात्रा')} sub={L('Jaipur · Rajasthan · outstation', 'जयपुर · राजस्थान · बाहर')} points={[L('On-site compass reading', 'साइट पर कंपास रीडिंग'), L('Home, office, shop, factory', 'घर, ऑफिस, दुकान, फैक्ट्री'), L('Report + follow-up', 'रिपोर्ट + फॉलो-अप')]} cta={L('Book a visit', 'विज़िट बुक करें')} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap stack" style={{ '--gap': '64px' }}>
          <div className="stack" style={{ '--gap': '32px' }}>
            <h2 className="h2 reveal" style={{ fontSize: 'clamp(32px,3.6vw,48px)' }}>{t('Vastu for which property?', 'किस प्रॉपर्टी के लिए वास्तु?')}</h2>
            <div className="grid reveal" style={{ '--min': '170px', '--gap': '14px' }}>
              {PROPERTIES.map(([name, icon]) => (
                <a key={name.en} href="#form" className="card" style={{ padding: '28px 22px' }}>
                  <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="#D9B26F" strokeWidth="1.3" aria-hidden="true">{icon}</svg>
                  <span className="serif" style={{ fontSize: 22 }}>{t(name)}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="stack" style={{ '--gap': '28px' }}>
            <h2 className="h2 reveal" style={{ fontSize: 'clamp(32px,3.6vw,48px)' }}>{t('Directions and rooms', 'घर की दिशा और कमरे')}</h2>
            <div className="row reveal" style={{ '--gap': '10px' }}>
              {ROOMS.map((r) => <a key={r.en} href="#" className="chip" style={{ fontSize: 15, padding: '12px 20px' }}>{t(r)}</a>)}
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap section row center" style={{ '--gap': '56px' }}>
          <div className="stack reveal" style={{ flex: '1 1 380px', '--gap': '20px' }}>
            <div className="eyebrow">— {t('What sets us apart', 'हमारी विशेषता')}</div>
            <h2 className="h2">{t('Why Astro-Vastu?', 'एस्ट्रो-वास्तु क्यों?')}</h2>
            <p className="lead" style={{ fontSize: 16, lineHeight: 1.8 }}>{t('The same home affects each family member differently. So Pandit ji studies the 16 zones of the home together with each member’s birth chart, and suggests remedies accordingly — drawing on 10+ years of Vedic and KP experience.', 'एक ही घर अलग-अलग सदस्यों पर अलग असर करता है। इसलिए पंडित जी घर के 16 ज़ोन के साथ हर सदस्य की कुंडली देखते हैं, और उसी हिसाब से उपाय बताते हैं। यह 10+ साल के वैदिक और केपी अनुभव से आता है।')}</p>
          </div>
          <div className="row center reveal" style={{ flex: '1.2 1 480px', '--gap': '16px', justifyContent: 'center' }}>
            {[
              [L('Floor plan', 'फ्लोर प्लान'), L('16 zones', '16 ज़ोन'), <><rect x="8" y="8" width="44" height="44" /><path d="M8 28 H30 V8 M30 28 V52 M30 38 H52" /></>],
              '+',
              [L('Birth charts', 'कुंडली'), L('up to 5 members', '5 सदस्यों तक'), <><rect x="8" y="8" width="44" height="44" /><path d="M8 8 L52 52 M52 8 L8 52 M30 8 L52 30 L30 52 L8 30Z" /></>],
              '=',
              [L('Remedies per member', 'सदस्य-वार उपाय'), L('without demolition first', 'पहले बिना तोड़-फोड़'), <><circle cx="20" cy="22" r="7" /><circle cx="40" cy="22" r="7" /><path d="M8 50 C8 38 32 38 32 50 M28 50 C28 38 52 38 52 50" /></>, true],
            ].map((b, i) => typeof b === 'string'
              ? <span key={i} className="serif gold" style={{ fontSize: 40 }}>{b}</span>
              : (
                <div key={i} style={{ flex: '1 1 140px', border: `1px solid ${b[3] ? 'var(--gold)' : 'var(--line-2)'}`, borderRadius: 4, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, background: b[3] ? 'var(--bg-hover)' : 'var(--bg)', textAlign: 'center' }}>
                  <svg width="64" height="64" viewBox="0 0 60 60" fill="none" stroke="#D9B26F" strokeWidth="1.2" aria-hidden="true">{b[2]}</svg>
                  <span style={{ fontSize: 15 }}>{t(b[0])}</span>
                  <span className="muted" style={{ fontSize: 12 }}>{t(b[1])}</span>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap row center" style={{ '--gap': '48px' }}>
          <div className="stack reveal" style={{ flex: '1 1 420px', '--gap': '16px' }}>
            <div className="eyebrow">— {t('For a new home or plot', 'नए घर / प्लॉट के लिए')}</div>
            <h2 className="h2" style={{ fontSize: 'clamp(32px,3.6vw,48px)' }}>{t('Vastu planning', 'निर्माण से पहले')} <em>{t('before construction', 'वास्तु प्लानिंग')}</em></h2>
            <p className="body" style={{ fontSize: 16 }}>{t('If Vastu is checked before buying a plot and while the plan is being drawn, no changes are needed later. If required, Pandit ji coordinates with your architect.', 'प्लॉट लेने से पहले और नक्शा बनते समय ही वास्तु देख लिया जाए तो बाद में बदलाव नहीं करने पड़ते। ज़रूरत हो तो पंडित जी आपके आर्किटेक्ट के साथ तालमेल करते हैं।')}</p>
          </div>
          <div className="stack reveal" style={{ flex: '1 1 340px', '--gap': '12px' }}>
            {[L('Plot selection — direction and shape', 'प्लॉट चयन — दिशा और आकार'), L('Floor plan review — with your architect', 'नक्शा (फ्लोर प्लान) समीक्षा — आर्किटेक्ट के साथ'), L('Placement of main door, kitchen, pooja room, bedroom', 'मुख्य द्वार, रसोई, पूजा कक्ष, शयनकक्ष की जगह'), L('Site visits during construction', 'निर्माण के दौरान साइट विज़िट')].map((x) => <span key={x.en} className="tick" style={{ fontSize: 16 }}>{t(x)}</span>)}
            <a href="#form" className="btn" style={{ alignSelf: 'flex-start', marginTop: 10 }}>{t('Contact us for planning', 'प्लानिंग के लिए संपर्क करें')}</a>
          </div>
        </div>
      </section>

      <section id="form" className="band">
        <div className="wrap section row" style={{ '--gap': '48px' }}>
          <BookingForm
            title={L('Send your floor plan', 'अपना फ्लोर प्लान भेजें')}
            submitLabel={L('See quote and pay', 'कोटेशन देखें और भुगतान करें')}
            services={[
              { value: 'vastu-online-report', label: L('Online Astro-Vastu report', 'ऑनलाइन एस्ट्रो-वास्तु रिपोर्ट') },
              { value: 'vastu-quick-call', label: L('Quick call (30 min)', 'क्विक कॉल (30 मिनट)') },
              { value: 'vastu-site-visit', label: L('Site visit', 'साइट विज़िट') },
            ]}
            fields={[
              { name: 'name', label: L('Full name', 'पूरा नाम'), required: true },
              { name: 'phone', label: L('Phone / WhatsApp', 'फ़ोन / WhatsApp'), type: 'tel', required: true },
              { name: 'propertyType', label: L('Property type', 'प्रॉपर्टी का प्रकार'), type: 'select', options: [{ value: 'Home', label: L('Home', 'घर') }, { value: 'Flat / Apartment', label: L('Flat / Apartment', 'फ्लैट / अपार्टमेंट') }, { value: 'Plot', label: L('Plot', 'प्लॉट') }, { value: 'Office', label: L('Office', 'ऑफिस') }, { value: 'Shop', label: L('Shop', 'दुकान') }, { value: 'Factory', label: L('Factory', 'फैक्ट्री') }] },
              { name: 'areaSqft', label: L('Area (sq.ft)', 'क्षेत्रफल (वर्ग फ़ुट)'), type: 'number', min: 1 },
              { name: 'floorPlan', label: L('Floor plan (PDF / photo — please mark North)', 'फ्लोर प्लान (PDF / फोटो, उत्तर दिशा मार्क करें)'), type: 'file', full: true },
              { name: 'membersText', label: L('Date, time and place of birth of family members (up to 5)', 'सदस्यों की जन्म तिथि, समय, स्थान (5 तक)'), type: 'textarea', full: true },
              { name: 'mainProblem', label: L('Main concern', 'मुख्य समस्या'), type: 'textarea', full: true, rows: 3 },
            ]}
          />
          <div className="stack reveal" style={{ flex: '1 1 340px', '--gap': '20px' }}>
            <div className="eyebrow">— {t('What the report includes', 'रिपोर्ट में क्या मिलेगा')}</div>
            <div className="row" style={{ '--gap': '12px', flexWrap: 'nowrap' }}>
              {[0, 1].map((k) => (
                <div key={k} style={{ flex: 1, aspectRatio: '3 / 4', border: '1px solid var(--line-2)', borderRadius: 4, background: 'var(--bg-2)', padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ height: 10, width: k ? '50%' : '60%', background: 'var(--line-2)' }} />
                  {k === 0 && (
                    <div style={{ flex: 1, border: '1px solid var(--line-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="60%" viewBox="0 0 60 60" fill="none" stroke="#D9B26F" strokeOpacity=".7" aria-hidden="true"><rect x="6" y="6" width="48" height="48" /><path d="M30 6 V54 M6 30 H54 M6 6 L54 54 M54 6 L6 54" /></svg>
                    </div>
                  )}
                  {[100, 80, 90, 70, 100, 85].slice(0, k ? 6 : 2).map((w, j) => <div key={j} style={{ height: 6, width: `${w}%`, background: 'var(--line)' }} />)}
                </div>
              ))}
            </div>
            <div className="small">{t('Preview of a sample PDF report (2 pages)', 'सैंपल PDF रिपोर्ट का प्रीव्यू (2 पेज)')}</div>
            <Link to="/yantra-shop/vastu-dosh-nivaran-yantra" className="link-arrow">{t('See the Vastu Dosh yantra', 'वास्तु दोष यंत्र देखें')} →</Link>
          </div>
        </div>
      </section>

      <div style={{ height: 110 }} />
      <Faq title={L('Vastu FAQ', 'वास्तु — प्रश्न-उत्तर')} items={[
        [L('Will I need to demolish anything?', 'क्या तोड़-फोड़ करनी पड़ेगी?'), L('Remedies without demolition come first; structural changes only if truly needed.', 'पहले बिना तोड़-फोड़ के उपाय दिए जाते हैं; बदलाव सिर्फ़ ज़रूरत पर।')],
        [L('How does online Vastu work?', 'ऑनलाइन वास्तु कैसे होता है?'), L('A report is prepared from your floor plan, North direction and family details, followed by a call.', 'फ्लोर प्लान, उत्तर दिशा और सदस्यों की जानकारी से रिपोर्ट बनती है, फिर कॉल।')],
        [L('Is a south-facing home bad?', 'क्या दक्षिणमुखी घर बुरा होता है?'), L('[Pandit ji’s answer]', '[पंडित जी का उत्तर]')],
      ]} />
    </PageShell>
  );
}
