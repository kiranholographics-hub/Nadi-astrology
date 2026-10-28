import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '../components/Layout.jsx';
import { Faq, Marquee, PlayBox, SectionHead, Stats, Steps } from '../components/ui.jsx';
import { YantraCard } from '../components/Yantra.jsx';
import { CameraIcon, ChevronLeft, ChevronRight, PlayIcon } from '../components/Icons.jsx';
import { useApp, usePrice, useT } from '../context/AppContext.jsx';
import { getYantras } from '../api/index.js';
import { SITE, show } from '../data/site.js';
import { HOME_FAQ } from '../data/faqs.js';
import { GALLERY } from '../data/gallery.js';
import PhotoRows from '../components/PhotoRows.jsx';

const RASHI = ['MESHA', 'VRISHABHA', 'MITHUNA', 'KARKA', 'SIMHA', 'KANYA', 'TULA', 'VRISHCHIKA', 'DHANU', 'MAKARA', 'KUMBHA', 'MEENA'];
const RASHI_HI = ['मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या', 'तुला', 'वृश्चिक', 'धनु', 'मकर', 'कुंभ', 'मीन'];

// Pandit ji's photos & videos, shown one by one inside the mandala.
// Replace `src` with real files (put them in client/public/media/) — videos autoplay muted.
const L = (en, hi) => ({ en, hi });
const PHOTO = L('Photo', 'फोटो');
const SLIDES = [
  { type: 'video', kind: L('Intro video', 'परिचय वीडियो'), title: L('Pt. Rajneesh Sharma', 'पं. रजनीश शर्मा'), label: L('Pandit ji’s 30-sec intro video (autoplay, muted, at the office)', 'पंडित जी का 30 सेकंड का परिचय वीडियो (ऑटोप्ले, म्यूट, ऑफिस में)'), src: '' },
  { type: 'photo', kind: PHOTO, title: L('Jaipur office', 'जयपुर ऑफिस'), label: L('Pandit ji — at the office', 'पंडित जी — ऑफिस में'), src: '' },
  { type: 'photo', kind: PHOTO, title: L('Pran-pratishtha', 'प्राण-प्रतिष्ठा'), label: L('Pandit ji — during a pooja', 'पंडित जी — पूजा के समय'), src: '' },
  { type: 'video', kind: L('Client video', 'क्लाइंट वीडियो'), title: L('[Client name], [Country]', '[क्लाइंट का नाम], [देश]'), label: L('Client testimonial (60–90 sec)', 'क्लाइंट का अनुभव (60–90 सेकंड)'), src: '' },
  { type: 'photo', kind: PHOTO, title: L('Consultation', 'परामर्श'), label: L('Pandit ji — with a client', 'पंडित जी — क्लाइंट के साथ'), src: '' },
];
const BGS = ['#11132A', '#141127', '#0F1624', '#16122A', '#121426'];
const DURATION = 6000;

function HeroMedia() {
  const t = useT();
  const [i, setI] = useState(0);
  const timer = useRef();
  const restart = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(() => setI((x) => (x + 1) % SLIDES.length), DURATION);
  }, []);
  useEffect(() => {
    restart();
    return () => clearInterval(timer.current);
  }, [restart]);
  const go = (d) => {
    setI((x) => (x + d + SLIDES.length) % SLIDES.length);
    restart();
  };

  return (
    <div style={{ flex: '1 1 520px', display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'center' }}>
      <div className="hero-art">
        <svg viewBox="0 0 600 600" aria-hidden="true">
          <g className="spin" fill="none" stroke="#D9B26F" strokeOpacity=".35">
            <circle cx="300" cy="300" r="290" />
            <circle cx="300" cy="300" r="258" strokeDasharray="2 8" />
            <g fontFamily="Cormorant Garamond, serif" fontSize="15" fill="#D9B26F" fillOpacity=".85" stroke="none" textAnchor="middle" letterSpacing="3">
              {RASHI.map((r, k) => <text key={r} x="300" y="34" transform={`rotate(${k * 30} 300 300)`}>{t(r, RASHI_HI[k])}</text>)}
            </g>
          </g>
          <g className="spin-rev" fill="none" stroke="#D9B26F" strokeOpacity=".55">
            <circle cx="300" cy="300" r="232" />
            <polygon points="300,62 506,419 94,419" />
            <polygon points="300,538 94,181 506,181" />
            <circle cx="300" cy="62" r="5" fill="#F0D49B" />
            <circle cx="506" cy="419" r="4" fill="#F0D49B" />
            <circle cx="94" cy="419" r="4" fill="#F0D49B" />
          </g>
          <g className="spin-fast" fill="none" stroke="#EDE6D6" strokeOpacity=".3"><circle cx="300" cy="300" r="212" strokeDasharray="1 6" /></g>
        </svg>
        <div style={{ position: 'absolute', inset: '16.5%', borderRadius: '50%', overflow: 'hidden', border: '1px solid #D9B26F', background: '#0B0C18' }}>
          {SLIDES.map((s, k) => {
            const on = k === i;
            return (
              <div key={k} aria-hidden={!on} style={{ position: 'absolute', inset: 0, transition: 'opacity 1.2s ease', opacity: on ? 1 : 0, zIndex: on ? 2 : 1 }}>
                <div style={{ position: 'absolute', inset: 0, background: BGS[k], display: 'flex', alignItems: 'center', justifyContent: 'center', animation: on ? 'kenburns 7s ease-out both' : 'none' }}>
                  {s.src ? (
                    s.type === 'video'
                      ? <video src={s.src} autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : <img src={s.src} alt={t(s.label)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center', color: 'var(--text-2)', padding: '0 18%' }}>
                      {s.type === 'video' ? <div className="play" style={{ width: 72, height: 72 }}><PlayIcon size={22} /></div> : <CameraIcon />}
                      <div style={{ fontSize: 12, letterSpacing: '.2em', lineHeight: 1.6 }}>{t(s.label)}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ width: '100%', maxWidth: 600 }} className="stack">
        <div className="row between center" style={{ '--gap': '16px', alignItems: 'center' }}>
          <div className="stack" style={{ '--gap': '4px' }} aria-live="polite">
            <span className="eyebrow" style={{ letterSpacing: '.3em' }}>{t(SLIDES[i].kind)}</span>
            <span className="serif" style={{ fontSize: 22 }}>{t(SLIDES[i].title)}</span>
          </div>
          <div className="row" style={{ '--gap': '10px' }}>
            <button type="button" className="round-btn" aria-label={t('Previous', 'पिछला')} onClick={() => go(-1)}><ChevronLeft /></button>
            <button type="button" className="round-btn" aria-label={t('Next', 'अगला')} onClick={() => go(1)}><ChevronRight /></button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${SLIDES.length}, minmax(0,1fr))`, gap: 8 }}>
          {SLIDES.map((s, k) => (
            <button key={k} type="button" aria-label={`${t('Slide', 'स्लाइड')} ${k + 1}: ${t(s.title)}`} onClick={() => { setI(k); restart(); }} style={{ height: 24, padding: 0, border: 0, background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <span style={{ display: 'block', width: '100%', height: 2, background: 'var(--line-2)', position: 'relative', overflow: 'hidden' }}>
                <span key={k === i ? `on-${i}` : 'off'} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, background: 'var(--gold)', width: k < i ? '100%' : 0, animation: k === i ? `fill ${DURATION}ms linear both` : 'none' }} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const SERVICES = [
  { to: '/nadi-astrology', title: L('Nadi Reading', 'नाड़ी रीडिंग'), text: L('Your leaf is searched for from your thumb impression, followed by Pandit ji’s Vedic/KP analysis.', 'अंगूठे के निशान से पट्टा खोजा जाता है, फिर पंडित जी का वैदिक/केपी विश्लेषण।'), icon: <path d="M6 34 C10 18 22 8 34 6 C32 18 22 30 6 34Z M10 30 L28 12" /> },
  { to: '/vedic-astrology', title: L('Vedic Birth Chart', 'वैदिक कुंडली'), text: L('A complete analysis of career, marriage, business and dasha periods — 30 or 60 minutes.', 'करियर, शादी, व्यापार और दशा का पूरा विश्लेषण, 30 या 60 मिनट।'), icon: <><rect x="6" y="6" width="28" height="28" /><path d="M6 6 L34 34 M34 6 L6 34 M20 6 L34 20 L20 34 L6 20Z" /></> },
  { to: '/kp-prashna', title: L('KP Prashna', 'केपी प्रश्न'), text: L('One question, answered with timing. No birth time needed.', 'एक प्रश्न, समय के साथ उत्तर। जन्म समय की ज़रूरत नहीं।'), icon: <><circle cx="20" cy="20" r="14" /><path d="M20 10 L20 20 L27 24" /></> },
  { to: '/vastu-consultant-jaipur', title: L('Vastu Consultation', 'वास्तु परामर्श'), text: L('Home, office, factory. Online from your floor plan or by site visit — remedies without demolition.', 'घर, ऑफिस, फैक्ट्री। फ्लोर प्लान से ऑनलाइन या साइट विज़िट, बिना तोड़-फोड़ उपाय।'), icon: <><path d="M6 18 L20 6 L34 18 V34 H6Z" /><path d="M16 34 V24 H24 V34" /></>, inrOnly: true },
];

export default function Home() {
  const { lang } = useApp();
  const price = usePrice();
  const t = useT();
  const [yantras, setYantras] = useState([]);
  useEffect(() => {
    getYantras({ bestseller: true }).then((d) => setYantras(d.items.slice(0, 4)));
  }, []);
  const hi = lang === 'hi';

  return (
    <PageShell seed={7} revealKey={yantras.length}>
      {/* hero */}
      <section className="hero" style={{ paddingTop: 64 }}>
        <div className="wrap-wide hero-row">
          <div className="hero-text rise">
            <div className="eyebrow-lg">{t('12 YEARS · JAIPUR · CLIENTS WORLDWIDE', '12 साल · जयपुर · दुनिया भर के क्लाइंट')}</div>
            <h1 className="h1">
              {hi ? 'वैदिक, केपी और नाड़ी ज्योतिषी' : 'Vedic, KP & Nadi Astrologer'}
              <br /><em>{hi ? 'एवं वास्तु सलाहकार, जयपुर' : 'and Vastu Consultant in Jaipur'}</em>
            </h1>
            <p className="lead">{t('See your life decisions clearly through your birth chart, your Nadi leaf and the Vastu of your home. Visit the office or consult by video call, in English or Hindi.', 'कुंडली, नाड़ी पट्टा और घर के वास्तु से जीवन के फ़ैसले साफ़ देखिए। ऑफिस विज़िट या वीडियो कॉल, हिंदी और अंग्रेज़ी में।')}</p>
            <div className="row" style={{ '--gap': '14px' }}>
              <Link to="/book" className="btn">{t('Book Consultation', 'परामर्श बुक करें')}</Link>
              <Link to="/yantra-shop" className="btn-ghost">{t('Shop Energized Yantras', 'प्राण-प्रतिष्ठित यंत्र देखें')}</Link>
            </div>
          </div>
          <HeroMedia />
        </div>
      </section>

      {/* trust */}
      <section className="section-tight" style={{ paddingBottom: 100 }}>
        <div className="wrap">
          <Stats items={[['12+', L('years of experience', 'साल का अनुभव')], ['4000+', L('office-visit clients', 'ऑफिस विज़िट क्लाइंट')], ['60+', L('international office visits', 'विदेशी क्लाइंट ऑफिस आए')], ['10+', L('years of Vedic & KP practice', 'साल वैदिक और केपी अभ्यास')]]} />
          <div className="small" style={{ marginTop: 16 }}>{t('[Google rating — once available]', '[Google रेटिंग — उपलब्ध होने पर]')}</div>
        </div>
      </section>

      <Marquee words={[L('Vedic Birth Chart', 'वैदिक कुंडली'), L('KP Prashna', 'केपी प्रश्न'), L('Nadi Leaf Reading', 'नाड़ी पट्टा'), L('Astro-Vastu', 'एस्ट्रो-वास्तु'), L('Kundli Matching', 'कुंडली मिलान'), L('Energized Yantras', 'प्राण-प्रतिष्ठित यंत्र')]} />

      {/* gallery */}
      <section className="section">
        <div className="wrap stack" style={{ '--gap': '40px' }}>
          <SectionHead eyebrow={t('Gallery', 'गैलरी')} title={<>{t('Our work,', 'हमारा काम,')} <em>{t('in pictures', 'तस्वीरों में')}</em></>} right={<Link to="/gallery" className="link-arrow">{t('View full gallery', 'पूरी गैलरी देखें')} ({GALLERY.length} {t('photos', 'फोटो')}) →</Link>} />
          <PhotoRows />
        </div>
      </section>

      {/* services */}
      <section id="book" className="band">
        <div className="wrap section stack" style={{ '--gap': '44px' }}>
          <SectionHead eyebrow={t('Services', 'सेवाएँ')} title={<>{t('Astrology Consultation Services:', 'ज्योतिष परामर्श सेवाएँ:')} <em>{t('Vedic, KP & Nadi', 'वैदिक, केपी और नाड़ी')}</em></>} />
          <div className="grid reveal">
            {SERVICES.map((s) => (
              <div key={s.to} className="card">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#D9B26F" strokeWidth="1.2" aria-hidden="true">{s.icon}</svg>
                <h3 className="h3" style={{ fontSize: 30 }}>{t(s.title)}</h3>
                <p className="body" style={{ flex: 1 }}>{t(s.text)}</p>
                <div style={{ fontSize: 14 }}>{t('From', 'शुरुआत')} {s.inrOnly ? '[₹ PRICE]' : price(null, null)}</div>
                <Link to={s.to} className="btn-ghost btn-sm">{t('Details & Book', 'विवरण और बुकिंग')}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* how */}
      <section className="section">
        <div className="wrap stack" style={{ '--gap': '44px' }}>
          <h2 className="h2 reveal">{t('How it works', 'कैसे काम करता है')}</h2>
          <Steps min={260} items={[
            [L('Choose a service and slot', 'सेवा और स्लॉट चुनें'), L('A calendar in your own time zone. Office visit or video call.', 'आपके टाइम ज़ोन में कैलेंडर। ऑफिस विज़िट या वीडियो कॉल।')],
            [L('Send your details and pay', 'जानकारी भेजें और भुगतान करें'), L('Birth details, thumb impression or floor plan. India: Razorpay · International: PayPal.', 'जन्म विवरण, अंगूठे का निशान या फ्लोर प्लान। भारत: Razorpay · विदेश: PayPal।')],
            [L('Consultation and recording', 'परामर्श और रिकॉर्डिंग'), L('Speak directly with Pandit ji; a written summary of remedies follows on WhatsApp.', 'पंडित जी से सीधी बात, उपायों का लिखित सारांश WhatsApp पर।')],
          ]} />
        </div>
      </section>

      {/* yantras */}
      <section className="band">
        <div className="wrap section stack" style={{ '--gap': '40px' }}>
          <SectionHead eyebrow={t('Yantra Shop', 'यंत्र शॉप')} title={<>{t('Energized Yantras:', 'प्राण-प्रतिष्ठित यंत्र:')} <em>{t('Pran-Pratishtha by Pt. Rajneesh Sharma', 'पं. रजनीश शर्मा द्वारा प्राण-प्रतिष्ठा')}</em></>} right={<Link to="/yantra-shop" className="link-arrow">{t('All 15 yantras', 'सभी 15 यंत्र')} →</Link>} />
          <div className="grid reveal" style={{ '--min': '240px' }}>
            {yantras.map((y) => <YantraCard key={y.slug} y={y} />)}
          </div>
          <div className="row" style={{ '--gap': '10px 28px', fontSize: 14, color: 'var(--text-2)' }}>
            <span className="tick">{t('Genuine metal guaranteed', 'असली धातु की गारंटी')}</span>
            <span className="tick">{t('Video proof of pran-pratishtha', 'प्राण-प्रतिष्ठा का वीडियो प्रमाण')}</span>
            <span className="tick">{t('Free replacement if it arrives broken', 'टूटा पहुँचे तो मुफ़्त रिप्लेसमेंट')}</span>
            <span className="tick">{t('30 days of WhatsApp support', '30 दिन WhatsApp सपोर्ट')}</span>
          </div>
        </div>
      </section>

      {/* youtube */}
      <section className="section">
        <div className="wrap stack" style={{ '--gap': '40px' }}>
          <SectionHead title={<>{t('Watch:', 'देखें:')} <em>{t('Astrology & Vastu Videos', 'ज्योतिष और वास्तु वीडियो')}</em></>} right={<a href={SITE.youtube} className="link-arrow">{t('Subscribe on YouTube', 'YouTube चैनल सब्सक्राइब करें')} →</a>} />
          <div className="grid reveal" style={{ '--min': '300px' }}>
            {[1, 2, 3].map((n) => <PlayBox key={n} label={L(`YouTube video ${n}`, `YouTube वीडियो ${n}`)} />)}
          </div>
        </div>
      </section>

      {/* international + office */}
      <section className="section-tight">
        <div className="wrap row" style={{ '--gap': '20px' }}>
          <div className="reveal" style={{ flex: '1 1 440px', border: '1px solid var(--line)', borderRadius: 4, padding: 44, background: 'var(--bg-2)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <svg viewBox="0 0 200 200" style={{ position: 'absolute', right: -60, top: -60, width: 260, opacity: 0.25 }} fill="none" stroke="#D9B26F" aria-hidden="true"><g className="spin"><circle cx="100" cy="100" r="90" /><ellipse cx="100" cy="100" rx="40" ry="90" /><ellipse cx="100" cy="100" rx="90" ry="34" /><path d="M10 100 H190 M100 10 V190" /></g></svg>
            <div className="eyebrow">— {t('Worldwide', 'दुनिया भर में')}</div>
            <h2 className="h2" style={{ fontSize: 'clamp(30px,3.4vw,44px)' }}>{t('Consult from the USA, UK, Dubai & worldwide', 'USA, UK, दुबई और दुनिया भर से परामर्श')}</h2>
            <p className="body">{t('Zoom or WhatsApp video call. Slots are shown in your own time zone. Pay in USD via PayPal; yantras ship worldwide.', 'Zoom या WhatsApp वीडियो कॉल। स्लॉट आपके टाइम ज़ोन में दिखते हैं। USD में PayPal से भुगतान, यंत्र की दुनिया भर में शिपिंग।')}</p>
            <div className="stack" style={{ '--gap': '10px', fontSize: 15 }}>
              <span className="tick">{t('English and Hindi', 'हिंदी और अंग्रेज़ी')}</span>
              <span className="tick">{t('Call recording and a written summary', 'कॉल की रिकॉर्डिंग और लिखित सारांश')}</span>
              <span className="tick">{t('Upload your thumb impression online for Nadi', 'नाड़ी के लिए अंगूठे का निशान ऑनलाइन अपलोड')}</span>
            </div>
          </div>
          <div className="reveal" style={{ flex: '1 1 440px', border: '1px solid var(--line)', borderRadius: 4, padding: 44, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="eyebrow">— {t('Jaipur', 'जयपुर')}</div>
            <h2 className="h2" style={{ fontSize: 'clamp(30px,3.4vw,44px)' }}>{t('Visit Our Jaipur Office', 'हमारे जयपुर ऑफिस आएँ')}</h2>
            <p className="body">{SITE.address} · {show(SITE.timings, t('[Timings]', '[समय]'))}</p>
            {SITE.mapEmbedUrl
              ? <iframe title={t('Office map', 'ऑफिस का नक्शा')} src={SITE.mapEmbedUrl} loading="lazy" style={{ aspectRatio: '16/7', width: '100%', border: 0, borderRadius: 4 }} />
              : <div className="ph dashed" style={{ aspectRatio: '16 / 7' }}>{t('Google Map embed + office photo', 'Google मैप + ऑफिस की फोटो')}</div>}
            <Link to="/book?service=vedic-60" className="btn" style={{ alignSelf: 'flex-start' }}>{t('Book an office visit', 'ऑफिस विज़िट बुक करें')}</Link>
          </div>
        </div>
      </section>

      <Faq id="faq" title={L('Frequently Asked Questions', 'अक्सर पूछे जाने वाले प्रश्न')} items={HOME_FAQ} />
      <div className="wrap z" style={{ maxWidth: 860, paddingBottom: 100, textAlign: 'center' }}><Link to="/faq" className="link-arrow">{t('See all questions', 'सभी प्रश्न-उत्तर देखें')} →</Link></div>
    </PageShell>
  );
}
