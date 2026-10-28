import { Link } from 'react-router-dom';
import { PageShell } from '../components/Layout.jsx';
import { Breadcrumb, Stats } from '../components/ui.jsx';
import { CameraIcon } from '../components/Icons.jsx';
import { SITE, show, waLink } from '../data/site.js';
import { useT } from '../context/AppContext.jsx';

const L = (en, hi) => ({ en, hi });
const WORK = [
  ['/vedic-astrology', 'I · Vedic', L('Birth chart consultation', 'कुंडली परामर्श'), L('Career, marriage, business and dasha analysis. Kundli matching too.', 'करियर, शादी, व्यापार और दशा का विश्लेषण। कुंडली मिलान भी।')],
  ['/kp-prashna', 'II · KP', L('KP Prashna', 'केपी प्रश्न'), L('One question, answered with timing. No birth time needed.', 'एक प्रश्न, समय के साथ उत्तर। जन्म समय की ज़रूरत नहीं।')],
  ['/vastu-consultant-jaipur', 'III · Vastu', L('Astro-Vastu', 'एस्ट्रो-वास्तु'), L('Your floor plan + your family’s birth charts. Remedies without demolition come first.', 'घर का प्लान + परिवार की कुंडली। पहले बिना तोड़-फोड़ के उपाय।')],
  ['/nadi-astrology', 'IV · Nadi', L('Nadi reading', 'नाड़ी रीडिंग'), L('Nadi readers of the Vaitheeswaran Koil tradition read the leaf; Pandit ji adds Vedic/KP analysis and remedies.', 'वैथीश्वरन कोइल परंपरा के नाड़ी रीडर पट्टा पढ़ते हैं; पंडित जी वैदिक/केपी विश्लेषण और उपाय बताते हैं।')],
];

export default function About() {
  const t = useT();
  return (
    <PageShell title={{ en: 'About Pt. Rajneesh Sharma', hi: 'पं. रजनीश शर्मा के बारे में' }} cta={{ to: '#office', label: { en: 'Book Consultation', hi: 'परामर्श बुक करें' } }} seed={83}>
      <section className="hero">
        <div className="wrap-wide stack" style={{ '--gap': '36px' }}>
          <Breadcrumb items={[{ label: { en: 'About', hi: 'परिचय' } }]} />
          <div className="hero-row" style={{ gap: 56 }}>
            <div className="hero-art" style={{ flex: '1 1 440px', maxWidth: 560 }}>
              <svg viewBox="0 0 600 600" aria-hidden="true">
                <g className="spin" fill="none" stroke="#D9B26F" strokeOpacity=".35"><circle cx="300" cy="300" r="290" /><circle cx="300" cy="300" r="262" strokeDasharray="2 8" /></g>
                <g className="spin-rev" fill="none" stroke="#D9B26F" strokeOpacity=".5"><polygon points="300,40 525,430 75,430" /><polygon points="300,560 75,170 525,170" /></g>
              </svg>
              <div className="ph" style={{ position: 'absolute', left: '22%', right: '22%', top: '14%', bottom: '10%', borderRadius: '200px 200px 6px 6px', borderColor: 'var(--gold)' }}>
                {/* Replace with: <img src="/media/pandit-ji.webp" alt="Pt. Rajneesh Sharma" /> */}
                <CameraIcon />
                {t('Pandit ji’s professional photo', 'पंडित जी की प्रोफ़ेशनल फोटो')}
              </div>
            </div>
            <div className="hero-text rise">
              <div className="eyebrow-lg">— {t('ABOUT', 'परिचय')}</div>
              <h1 className="h1" style={{ fontSize: 'clamp(44px,5.4vw,76px)', lineHeight: 1 }}>{t('Pt. Rajneesh Sharma', 'पं. रजनीश शर्मा')}</h1>
              <div style={{ fontSize: 18 }}>{t('Vedic, KP & Vastu Consultant, Jaipur', 'वैदिक, केपी और वास्तु सलाहकार, जयपुर')}</div>
              <p className="serif gold" style={{ margin: 0, fontStyle: 'italic', fontSize: 28, lineHeight: 1.3 }}>{t('“From your birth chart to your home — astrology and Vastu together”', '“कुंडली से घर तक — ज्योतिष और वास्तु एक साथ”')}</p>
              <p className="lead" style={{ fontSize: 16, lineHeight: 1.8 }}>{t('Consulting at the Jaipur office for 12 years, with 10+ years of experience in Vedic and KP astrology alongside Vastu consultancy. 4000+ clients have visited the office, 60+ of them from abroad.', '12 साल से जयपुर ऑफिस में परामर्श। वैदिक और केपी ज्योतिष में 10+ साल का अनुभव, साथ में वास्तु परामर्श। 4000+ क्लाइंट ऑफिस आ चुके हैं, जिनमें 60+ विदेश से।')}</p>
              <div className="row" style={{ '--gap': '14px' }}>
                <Link to="/#book" className="btn">{t('Book Consultation', 'परामर्श बुक करें')}</Link>
                <Link to="/videos" className="btn-ghost">{t('Pandit ji’s videos', 'पंडित जी के वीडियो')}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ paddingBottom: 100 }}>
        <div className="wrap"><Stats items={[['12+', L('years of experience', 'साल का अनुभव')], ['4000+', L('office-visit clients', 'ऑफिस विज़िट क्लाइंट')], ['60+', L('international office visits', 'विदेशी क्लाइंट ऑफिस आए')], ['10+', L('years of Vedic & KP practice', 'साल वैदिक और केपी अभ्यास')]]} /></div>
      </section>

      <section className="band">
        <div className="wrap section stack" style={{ '--gap': '40px' }}>
          <h2 className="h2 reveal">{t('Pandit ji’s work', 'पंडित जी का काम')}</h2>
          <div className="grid reveal" style={{ '--min': '260px' }}>
            {WORK.map(([to, k, title, d]) => (
              <Link key={to} to={to} className="card">
                <span className="eyebrow" style={{ letterSpacing: '.25em', fontSize: 12 }}>{k}</span>
                <span className="serif" style={{ fontSize: 26 }}>{t(title)}</span>
                <span className="muted" style={{ fontSize: 14, lineHeight: 1.7 }}>{t(d)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap row center" style={{ '--gap': '56px' }}>
          <div className="stack reveal" style={{ flex: '1 1 400px', '--gap': '20px' }}>
            <div className="eyebrow">— {t('Story', 'कहानी')}</div>
            <h2 className="h2">{t('12 years. 4000+ families.', '12 साल। 4000+ परिवार।')} <em>{t('60+ international clients.', '60+ विदेशी क्लाइंट।')}</em></h2>
            <p className="lead" style={{ fontSize: 16, lineHeight: 1.8 }}>{t('[Pandit ji’s story — how it began, guru/lineage, the journey of the Jaipur office. Real facts only.]', '[पंडित जी की कहानी — शुरुआत, गुरु/परंपरा, जयपुर ऑफिस का सफ़र। सिर्फ़ असली तथ्य।]')}</p>
            <p className="body">{t('We speak to experience and process, not guaranteed results — remedies and guidance rooted in the shastras, in English and Hindi.', 'हम अनुभव और प्रक्रिया की बात करते हैं, परिणाम की गारंटी नहीं — शास्त्र-आधारित उपाय और मार्गदर्शन, हिंदी और अंग्रेज़ी में।')}</p>
          </div>
          <div className="reveal" style={{ flex: '1.1 1 460px', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 14 }}>
            <div className="ph dashed" style={{ gridRow: 'span 2', minHeight: 360 }}>{t('Photo: at the office', 'फोटो: ऑफिस में')}</div>
            <div className="ph dashed" style={{ aspectRatio: '4 / 3' }}>{t('Photo: during a pooja', 'फोटो: पूजा के समय')}</div>
            <div className="ph dashed" style={{ aspectRatio: '4 / 3' }}>{t('Photo: with a client', 'फोटो: क्लाइंट के साथ')}</div>
          </div>
        </div>
      </section>

      <section id="office" className="section-tight">
        <div className="wrap row" style={{ '--gap': '20px' }}>
          <div className="stack reveal" style={{ flex: '1 1 420px', border: '1px solid var(--line)', borderRadius: 4, padding: 44, background: 'var(--bg-2)', '--gap': '18px' }}>
            <div className="eyebrow">— {t('Jaipur office', 'जयपुर ऑफिस')}</div>
            <h2 className="h2" style={{ fontSize: 'clamp(30px,3.4vw,44px)' }}>{t('Visit Our Jaipur Office', 'हमारे जयपुर ऑफिस आएँ')}</h2>
            <p className="lead" style={{ fontSize: 16 }}>{SITE.address}</p>
            <p className="body">{show(SITE.timings, t('[Timings]', '[समय]'))} · WhatsApp: {show(SITE.whatsappNumber && `+${SITE.whatsappNumber}`, '[NUMBER]')} · {show(SITE.email, '[EMAIL]')}</p>
            <div className="row" style={{ '--gap': '12px', paddingTop: 6 }}>
              <a href={waLink(t('Hello, I would like to book a visit to the Jaipur office.', 'नमस्ते, मुझे जयपुर ऑफिस विज़िट बुक करनी है।'))} className="btn">{t('Book an office visit', 'ऑफिस विज़िट बुक करें')}</a>
              <a href={waLink(t('Hello, I would like to book a video call consultation.', 'नमस्ते, मुझे वीडियो कॉल परामर्श बुक करना है।'))} className="btn-ghost">{t('Book a video call', 'वीडियो कॉल बुक करें')}</a>
            </div>
          </div>
          {SITE.mapEmbedUrl
            ? <iframe title={t('Office map', 'ऑफिस का नक्शा')} src={SITE.mapEmbedUrl} loading="lazy" style={{ flex: '1 1 420px', minHeight: 320, border: 0, borderRadius: 4 }} />
            : <div className="ph dashed reveal" style={{ flex: '1 1 420px', minHeight: 320 }}>{t('Google Map embed + office photo', 'Google मैप + ऑफिस की फोटो')}</div>}
        </div>
      </section>
      <div style={{ height: 100 }} />
    </PageShell>
  );
}
