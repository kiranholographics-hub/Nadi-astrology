import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DISCLAIMER, PageShell } from '../components/Layout.jsx';
import { Breadcrumb, Faq, PriceCard, Steps } from '../components/ui.jsx';
import { useApp, usePrice, useT } from '../context/AppContext.jsx';
import { getCountry, getPosts } from '../api/index.js';
import { PostCard } from './Blog.jsx';
import { SLOTS_IST } from '../data/services.js';
import { GALLERY, imgUrl } from '../data/gallery.js';
import { waLink } from '../data/site.js';
import NotFound from './NotFound.jsx';

const L = (en, hi) => ({ en, hi });
const BOOK = '/book?service=nadi-general-2-kandam';

// Today's date in India, so slot conversions use the right daylight-saving offset.
function istToday() {
  return new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10);
}
function slotIn(tz, hhmm, lang) {
  try {
    const d = new Date(`${istToday()}T${hhmm}:00+05:30`);
    return d.toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-US', { timeZone: tz, weekday: 'short', hour: 'numeric', minute: '2-digit' });
  } catch {
    return '—';
  }
}

export default function CountryPage() {
  const { slug } = useParams();
  const t = useT();
  const { lang, currency, setCurrency } = useApp();
  const price = usePrice();
  const [data, setData] = useState(undefined); // undefined = loading, null = not found
  const [posts, setPosts] = useState([]);

  // { en, hi } from the admin — Hindi falls back to English when not filled in.
  const tt = (o) => t({ en: o?.en || '', hi: o?.hi || null });

  useEffect(() => {
    setData(undefined);
    getCountry(slug).then(setData).catch(() => setData(null));
    setPosts([]);
    getPosts({ country: slug, limit: 3 }).then(setPosts);
  }, [slug]);

  // Visitors landing on a country page see fees in USD (once per visit; they can switch back).
  useEffect(() => {
    try {
      if (currency === 'INR' && !sessionStorage.getItem('ptrs.usdSet')) {
        sessionStorage.setItem('ptrs.usdSet', '1');
        setCurrency('USD');
      }
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const c = data?.item;
  const photos = useMemo(() => {
    const intl = GALLERY.filter((g) => /international/i.test(g.alt));
    const start = ((c?.order || 1) * 7) % Math.max(1, intl.length - 6);
    return intl.slice(start, start + 6);
  }, [c?.order]);

  if (data === null) return <NotFound />;
  if (data === undefined) {
    return (
      <PageShell title={L('Nadi Astrology', 'नाड़ी ज्योतिष')} seed={39}>
        <section className="hero" style={{ minHeight: '60vh' }}><div className="wrap"><div className="eyebrow-lg">— {t('NADI ASTROLOGY · WORLDWIDE', 'नाड़ी ज्योतिष · दुनिया भर में')}</div></div></section>
      </PageShell>
    );
  }
  const name = c ? t(c.name, c.nameHi || null) : '';
  const inName = c ? t(c.inName || c.name, c.nameHi || null) : '';

  const schema = c ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Nadi Astrology Reading in ${c.inName || c.name}`,
    serviceType: 'Nadi astrology consultation',
    areaServed: { '@type': 'Country', name: c.name },
    provider: { '@type': 'Person', name: 'Pt. Rajneesh Sharma', address: { '@type': 'PostalAddress', addressLocality: 'Jaipur', addressCountry: 'IN' } },
    availableChannel: { '@type': 'ServiceChannel', serviceUrl: typeof window !== 'undefined' ? window.location.href : undefined, availableLanguage: ['English', 'Hindi', 'Tamil'] },
  } : null;

  const title = c ? L(c.seoTitle || `Nadi Astrology in ${c.inName || c.name} — Online Palm Leaf Reading`, `${c.nameHi || c.name} में नाड़ी ज्योतिष — ऑनलाइन ताड़-पत्र रीडिंग`) : L('Nadi Astrology', 'नाड़ी ज्योतिष');
  const description = c ? L(c.metaDescription || c.intro?.en?.slice(0, 160), c.intro?.hi?.slice(0, 160) || null) : undefined;
  const cta = { to: BOOK, label: L('Book Nadi Reading', 'नाड़ी रीडिंग बुक करें') };

  const generalFaq = [
    [L('How do I send my thumb impression from abroad?', 'विदेश से अंगूठे का निशान कैसे भेजें?'), L('Press your thumb on an ink pad (or use a little lipstick), press it on white paper, and upload a clear photo while booking. Men send the right thumb, women the left.', 'अंगूठे को इंक पैड (या थोड़ी लिपस्टिक) पर लगाकर सफ़ेद कागज़ पर छापें, और बुकिंग के समय उसकी साफ़ फोटो अपलोड करें। पुरुष दायाँ अंगूठा, महिलाएँ बायाँ।')],
    [L('What if my leaf is not found?', 'अगर मेरा पट्टा न मिले तो?'), L('Not every person’s leaf is found. If yours is not found, [refund policy].', 'हर व्यक्ति का पट्टा मिलना ज़रूरी नहीं। न मिले तो [रिफंड नीति]।')],
  ];
  const faqs = c ? [...(c.faqs || []).map((f) => [{ en: f.q?.en, hi: f.q?.hi || null }, { en: f.a?.en, hi: f.a?.hi || null }]), ...generalFaq] : [];
  const shipping = c?.shippingDays
    ? t(`Delivery to ${c.name}: about ${c.shippingDays} working days after dispatch.`, `${c.nameHi || c.name} में डिलीवरी: डिस्पैच के बाद लगभग ${c.shippingDays} कार्य-दिवस।`)
    : t('Delivery time to your city is confirmed on WhatsApp before dispatch.', 'आपके शहर तक डिलीवरी का समय डिस्पैच से पहले WhatsApp पर बताया जाता है।');

  return (
    <PageShell title={title} description={description} cta={cta} disclaimer={DISCLAIMER.jyotish} schema={schema} seed={(c?.order || 3) * 13} revealKey={c?.slug}>
      <section className="hero">
        <div className="wrap-wide stack" style={{ '--gap': '36px' }}>
          <Breadcrumb items={[{ label: L('Nadi Astrology', 'नाड़ी ज्योतिष'), to: '/nadi-astrology' }, { label: c ? L(c.name, c.nameHi || null) : '…' }]} />
          <div className="hero-row">
            <div className="hero-text rise">
              <div className="eyebrow-lg">— {t('NADI ASTROLOGY · WORLDWIDE', 'नाड़ी ज्योतिष · दुनिया भर में')}</div>
              <h1 className="h1">{t(`Nadi Astrology in ${inName}`, `${inName} में नाड़ी ज्योतिष`)}<br /><em>{t('Online Palm Leaf Reading', 'ऑनलाइन ताड़-पत्र रीडिंग')}</em></h1>
              <p className="lead">{c ? tt(c.intro) : '…'}</p>
              <div className="row" style={{ '--gap': '14px' }}>
                <Link to={BOOK} className="btn">{t('Book Nadi Reading', 'नाड़ी रीडिंग बुक करें')}</Link>
                <a href={waLink(t(`Hello, I am in ${c?.name || 'abroad'} and would like a Nadi reading.`, `नमस्ते, मैं ${c?.nameHi || c?.name || 'विदेश'} से हूँ और नाड़ी रीडिंग करवाना चाहता/चाहती हूँ।`))} className="btn-ghost">{t('Ask on WhatsApp', 'WhatsApp पर पूछें')}</a>
              </div>
              <div className="row" style={{ '--gap': '10px' }}>
                <span className="chip">{t(`Video call from ${c?.name || 'abroad'}`, `${c?.nameHi || c?.name || 'विदेश'} से वीडियो कॉल`)}</span>
                <span className="chip">{t('English · Hindi · Tamil', 'हिंदी · अंग्रेज़ी · तमिल')}</span>
                <span className="chip">{t('Pay in USD · PayPal', 'USD में भुगतान · PayPal')}</span>
              </div>
            </div>
            <div className="hero-art">
              <svg viewBox="0 0 600 600" aria-hidden="true">
                <g className="spin" fill="none" stroke="#D9B26F" strokeOpacity=".4">
                  <circle cx="300" cy="300" r="280" />
                  <ellipse cx="300" cy="300" rx="120" ry="280" />
                  <ellipse cx="300" cy="300" rx="220" ry="280" />
                  <ellipse cx="300" cy="300" rx="280" ry="100" />
                  <path d="M20 300 H580 M300 20 V580" />
                </g>
                <g className="spin-rev" fill="none" stroke="#EDE6D6" strokeOpacity=".2"><circle cx="300" cy="300" r="250" strokeDasharray="2 8" /></g>
                <circle cx="300" cy="300" r="118" fill="#0B0C18" stroke="#D9B26F" />
                <text x="300" y="318" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="64" fill="#F0D49B" letterSpacing="4">{c?.code || ''}</text>
                <text x="300" y="352" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="12" fill="#A7A2B8" letterSpacing="3">JAIPUR ⟷ {(c?.code || '').toUpperCase()}</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {c && (
        <>
          {c.timezones?.length > 0 && (
            <section className="band">
              <div className="wrap section stack" style={{ '--gap': '28px' }}>
                <div className="stack reveal" style={{ '--gap': '12px' }}>
                  <div className="eyebrow">— {t('Your local time', 'आपका स्थानीय समय')}</div>
                  <h2 className="h2">{t('Consultation slots in', 'परामर्श के स्लॉट —')} <em>{name}</em></h2>
                  <p className="body">{t('Slots are fixed in India time (IST). Here is what they mean where you are today — daylight saving is taken into account automatically.', 'स्लॉट भारत के समय (IST) में तय हैं। आज आपके यहाँ ये किस समय पड़ते हैं, नीचे देखें — डेलाइट सेविंग अपने-आप गिनी जाती है।')}</p>
                </div>
                <div className="reveal" style={{ overflowX: 'auto' }}>
                  <table className="slot-table">
                    <thead>
                      <tr><th>{t('India (IST)', 'भारत (IST)')}</th>{c.timezones.map((z) => <th key={z.tz}>{z.label}</th>)}</tr>
                    </thead>
                    <tbody>
                      {SLOTS_IST.map((h) => (
                        <tr key={h}><td>{h}</td>{c.timezones.map((z) => <td key={z.tz}>{slotIn(z.tz, h, lang)}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Link to={BOOK} className="btn" style={{ alignSelf: 'flex-start' }}>{t('Pick a slot', 'स्लॉट चुनें')}</Link>
              </div>
            </section>
          )}

          <section className="section">
            <div className="wrap row" style={{ '--gap': '56px', alignItems: 'flex-start' }}>
              <div className="stack reveal" style={{ flex: '1 1 420px', '--gap': '18px' }}>
                <div className="eyebrow">— {t(`Clients in ${c.name}`, `${c.nameHi || c.name} के क्लाइंट`)}</div>
                <h2 className="h2" style={{ fontSize: 'clamp(30px,3.4vw,46px)' }}>{t('The Nadi tradition,', 'नाड़ी परंपरा,')} <em>{t('far from home', 'घर से दूर')}</em></h2>
                <p className="lead" style={{ fontSize: 16, lineHeight: 1.8 }}>{tt(c.community)}</p>
                {c.cities?.length > 0 && (
                  <div className="stack" style={{ '--gap': '10px' }}>
                    <span className="muted" style={{ fontSize: 13 }}>{t('Online readings for clients in', 'इन जगहों के क्लाइंट्स के लिए ऑनलाइन रीडिंग')}</span>
                    <div className="row" style={{ '--gap': '8px' }}>{c.cities.map((city) => <span key={city} className="chip">{city}</span>)}</div>
                  </div>
                )}
              </div>
              <div className="reveal" style={{ flex: '1 1 420px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 10 }}>
                {photos.map((g) => (
                  <img key={g.src} src={imgUrl(g)} alt={t(g.alt, g.altHi)} loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '1 / 1', objectFit: g.fit || 'cover', borderRadius: 4, border: '1px solid var(--line)' }} />
                ))}
                <span className="small" style={{ gridColumn: '1 / -1' }}>{t('International clients with Pt. Rajneesh Sharma at the Jaipur office', 'जयपुर ऑफिस में पं. रजनीश शर्मा के साथ विदेशी क्लाइंट')} · <Link to="/gallery">{t('Gallery', 'गैलरी')}</Link></span>
              </div>
            </div>
          </section>

          <section className="band">
            <div className="wrap section stack" style={{ '--gap': '44px' }}>
              <h2 className="h2 reveal">{t(`How it works from ${c.name}`, `${c.nameHi || c.name} से कैसे होता है`)}</h2>
              <Steps items={[
                [L('Book and upload your thumb', 'बुक करें और अंगूठा अपलोड करें'), L('Choose a package, pay in USD via PayPal and upload a photo of your thumb impression.', 'पैकेज चुनें, PayPal से USD में भुगतान करें और अंगूठे के निशान की फोटो अपलोड करें।')],
                [L('Your leaf is searched for', 'पट्टा खोजा जाता है'), L('Nadi readers search the leaf bundles. On a short call you answer yes/no to confirm it is yours.', 'नाड़ी रीडर पट्टों के गट्ठर में खोजते हैं। छोटी कॉल पर आप हाँ/ना में बताते हैं कि पट्टा आपका है।')],
                [L('The reading, on video', 'वीडियो पर रीडिंग'), L('The leaf is read with live translation at a time that suits your time zone. You receive the recording.', 'आपके टाइम ज़ोन के हिसाब से समय पर, अनुवाद के साथ पट्टा पढ़ा जाता है। रिकॉर्डिंग मिलती है।')],
                [L('Analysis and remedies', 'विश्लेषण और उपाय'), L('Pt. Rajneesh Sharma studies the leaf with your birth chart (Vedic/KP) and sends a written summary of remedies.', 'पं. रजनीश शर्मा पट्टे को कुंडली (वैदिक/केपी) के साथ देखते हैं और उपायों का लिखित सारांश भेजते हैं।')],
              ]} />
            </div>
          </section>

          <section className="section">
            <div className="wrap stack" style={{ '--gap': '40px' }}>
              <h2 className="h2 reveal">{t('Packages & fees', 'पैकेज और फ़ीस')}{currency === 'USD' ? '' : ` (${t('switch to $ USD in the top bar', 'ऊपर $ USD चुनें')})`}</h2>
              <div className="grid reveal" style={{ '--min': '280px' }}>
                <PriceCard title={L('General (Kandam 1)', 'सामान्य (कांडम 1)')} price={price(null, null)} sub={L('International · PayPal', 'विदेश · PayPal')} points={[L('Leaf search + general reading', 'पट्टा खोज + सामान्य रीडिंग'), L('Recording', 'रिकॉर्डिंग')]} to="/book?service=nadi-general" />
                <PriceCard featured badge={L('RECOMMENDED', 'सुझाया गया')} title={L('General + 2 Kandams + Analysis', 'सामान्य + 2 कांडम + विश्लेषण')} price={price(null, null)} sub={L('International · PayPal', 'विदेश · PayPal')} points={[L('2 kandams of your choice', 'आपकी पसंद के 2 कांडम'), L('Vedic/KP analysis by Pt. Rajneesh Sharma', 'पं. रजनीश शर्मा का वैदिक/केपी विश्लेषण'), L('Written summary of remedies', 'उपायों का लिखित सारांश')]} to={BOOK} />
                <PriceCard title={L('Shanti Kandam (remedies)', 'शांति कांडम (उपाय)')} price={price(null, null)} sub={L('International · PayPal', 'विदेश · PayPal')} points={[L('Past karma and traditional remedies', 'पूर्व कर्म और पारंपरिक उपाय'), L('Yantra advice', 'यंत्र सलाह')]} to="/book?service=nadi-shanti" />
              </div>
            </div>
          </section>

          <section className="band">
            <div className="wrap section row" style={{ '--gap': '48px', alignItems: 'center' }}>
              <div className="stack reveal" style={{ flex: '1 1 420px', '--gap': '16px' }}>
                <div className="eyebrow">— {t('Remedy yantras', 'उपाय के यंत्र')}</div>
                <h2 className="h2" style={{ fontSize: 'clamp(30px,3.4vw,44px)' }}>{t(`Energized yantras, shipped to ${c.name}`, `प्राण-प्रतिष्ठित यंत्र, ${c.nameHi || c.name} तक`)}</h2>
                <p className="body">{tt(c.customsNote)}</p>
                <p className="body">{shipping}</p>
                <div className="row" style={{ '--gap': '10px 24px', fontSize: 14, color: 'var(--text-2)' }}>
                  <span className="tick">{t('Video proof of pran-pratishtha', 'प्राण-प्रतिष्ठा का वीडियो प्रमाण')}</span>
                  <span className="tick">{t('Tracking link on WhatsApp', 'WhatsApp पर ट्रैकिंग लिंक')}</span>
                  <span className="tick">{t('Free replacement if it arrives broken', 'टूटा पहुँचे तो मुफ़्त रिप्लेसमेंट')}</span>
                </div>
              </div>
              <Link to="/yantra-shop" className="btn reveal">{t('Browse the Yantra Shop', 'यंत्र शॉप देखें')}</Link>
            </div>
          </section>

          {posts.length > 0 && (
            <section className="section">
              <div className="wrap stack" style={{ '--gap': '32px' }}>
                <div className="row between reveal" style={{ '--gap': '16px', alignItems: 'flex-end' }}>
                  <div className="stack" style={{ '--gap': '10px' }}>
                    <div className="eyebrow">— {t('Latest updates', 'ताज़ा अपडेट')}</div>
                    <h2 className="h2" style={{ fontSize: 'clamp(30px,3.4vw,44px)' }}>{t('From the blog', 'ब्लॉग से')}</h2>
                  </div>
                  <Link to="/blog" className="link-arrow">{t('All articles', 'सभी लेख')} →</Link>
                </div>
                <div className="grid" style={{ '--min': '280px' }}>{posts.map((p) => <PostCard key={p.slug} p={p} />)}</div>
              </div>
            </section>
          )}

          <Faq title={L(`Nadi astrology in ${c.inName || c.name} — FAQ`, `${c.nameHi || c.name} में नाड़ी ज्योतिष — प्रश्न-उत्तर`)} items={faqs} />

          {data.others?.length > 0 && (
            <div className="wrap z" style={{ maxWidth: 860, paddingBottom: 100 }}>
              <div className="row" style={{ '--gap': '10px 20px', fontSize: 14, color: 'var(--muted)' }}>
                {t('Nadi readings for other countries:', 'दूसरे देशों के लिए नाड़ी रीडिंग:')}
                {data.others.map((o) => <Link key={o.slug} to={`/nadi-astrology/${o.slug}`}>{t(o.name, o.nameHi || null)}</Link>)}
              </div>
            </div>
          )}
        </>
      )}
    </PageShell>
  );
}
