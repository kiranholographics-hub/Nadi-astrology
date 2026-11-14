import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from '../components/LangLink.jsx';
import { DISCLAIMER, PageShell } from '../components/Layout.jsx';
import { Breadcrumb, PlayBox } from '../components/ui.jsx';
import { YantraArt } from '../components/Yantra.jsx';
import { PlayIcon, PlusIcon } from '../components/Icons.jsx';
import { getYantra } from '../api/index.js';
import { faqSchema, setJsonLd } from '../components/seo.js';
import { useApp, usePrice, useT } from '../context/AppContext.jsx';
import { catLabel, yName, SIZE_HI } from '../data/yantraI18n.js';
import { SITE, waLink } from '../data/site.js';
import NotFound from './NotFound.jsx';
import { useInitialData } from '../context/InitialData.jsx';

const L = (en, hi) => ({ en, hi });
const clip160 = (x) => (x.length > 160 ? `${x.slice(0, 159).replace(/\s+\S*$/, '')}…` : x);
const VIEWS = [L('Front', 'सामने'), L('Back', 'पीछे'), L('Size in hand', 'हाथ में साइज़'), L('Packaging', 'पैकिंग'), L('Video', 'वीडियो')];
const DEFAULT_BOX = L('Yantra, installation guide (PDF), mantra card, certificate', 'यंत्र, स्थापना विधि PDF, मंत्र कार्ड, सर्टिफ़िकेट');

export default function YantraDetail() {
  const t = useT();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, currency } = useApp();
  const price = usePrice();
  const initial = useInitialData(`yantra:${slug}`); // undefined = not loaded by the server, null = not found
  const [data, setData] = useState(initial || null);
  const [missing, setMissing] = useState(initial === null);
  const [view, setView] = useState(0);
  const [size, setSize] = useState(1);
  const [sankalp, setSankalp] = useState(false);

  useEffect(() => {
    setView(0);
    if (initial !== undefined) {
      setData(initial);
      setMissing(initial === null);
      return;
    }
    setData(null);
    setMissing(false);
    getYantra(slug).then(setData).catch(() => setMissing(true));
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const y = data?.item;
  const sizes = y?.sizes?.length ? y.sizes : ['2 x 2 inch', '3 x 3 inch', '6 x 6 inch'];
  const s = y?.sthapana || {};
  // Written content from the server (data/yantraContent.js); admin values win.
  const c = data?.content || null;
  const ct = (v) => (v ? t(v) : '');
  const cs = c?.sthapana || {};
  const descText = y?.description || ct(c?.description);
  const faqs = [
    ...(c?.faqs || []),
  ];
  const faqKey = `${y?.slug}|${faqs.length}|${t('a', 'b')}`;
  useEffect(() => {
    if (!y) return undefined;
    setJsonLd('faq', faqSchema(faqs.map(([q, a]) => [t(q), t(a)]).filter(([, a]) => !a.includes('['))));
    return () => setJsonLd('faq', null);
  }, [faqKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const img = y?.images?.[view]?.url;
  const name = y ? t(yName(y)) : '…';
  const energized = t('Energized', 'प्राण-प्रतिष्ठित');
  const sizeText = (z) => t(z, SIZE_HI(z));

  const schema = y ? {
    '@context': 'https://schema.org', '@type': 'Product', name: `${y.name}, Energized`, category: y.category,
    description: y.description || c?.description?.en || undefined, image: y.images?.map((i) => i.url),
    brand: { '@type': 'Person', name: 'Pt. Rajneesh Sharma' },
    offers: y.priceINR != null ? { '@type': 'Offer', priceCurrency: 'INR', price: y.priceINR, availability: y.stock === 'out_of_stock' ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock' } : undefined,
  } : null;
  if (missing) return <NotFound />;
  const add = () => y && addToCart({ slug: y.slug, name: y.name, nameHi: yName(y).hi, size: sizes[size], sankalp, priceINR: y.priceINR, priceUSD: y.priceUSD, sankalpPriceINR: y.sankalpPriceINR, sankalpPriceUSD: y.sankalpPriceUSD });

  return (
    <PageShell title={y ? `${name}, ${energized}` : L('Yantra', 'यंत्र')} description={y ? (descText ? { en: clip160(descText), hi: clip160(descText) } : undefined) || t(`${y.name} — energized by Pt. Rajneesh Sharma. Size, metal, installation guide and video. Shipping in India and worldwide.`, `${name} — पं. रजनीश शर्मा द्वारा प्राण-प्रतिष्ठित। साइज़, धातु, स्थापना विधि और वीडियो। भारत और विदेश में शिपिंग।`) : undefined} schema={schema} disclaimer={DISCLAIMER.yantra} seed={61} mobileCta={{ to: '/cart', label: L('Cart · Checkout', 'कार्ट · चेकआउट') }} revealKey={y?.slug}>
      <section className="hero" style={{ paddingBottom: 'var(--sp-section)' }}>
        <div className="wrap-wide stack" style={{ '--gap': '32px' }}>
          <Breadcrumb items={[{ label: L('Yantra Shop', 'यंत्र शॉप'), to: '/yantra-shop' }, { label: y ? catLabel(y.category) : '…', to: y ? `/yantra-shop?category=${encodeURIComponent(y.category)}` : undefined }, { label: name }]} />
          <div className="row" style={{ '--gap': '56px', alignItems: 'flex-start' }}>
            <div className="stack" style={{ flex: '1.1 1 480px', minWidth: 0, '--gap': '14px' }}>
              <div style={{ position: 'relative', aspectRatio: '1 / 1', border: '1px solid var(--line-2)', borderRadius: 4, background: 'var(--bg-2)', overflow: 'hidden' }}>
                <svg viewBox="0 0 600 600" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} fill="none" stroke="#D9B26F" aria-hidden="true">
                  <circle cx="300" cy="300" r="260" strokeOpacity=".4" className="pulse" />
                  <g className="spin-rev"><circle cx="300" cy="300" r="280" strokeDasharray="2 10" strokeOpacity=".4" /></g>
                </svg>
                <div key={view} className="fade-in" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '12%' }}>
                  {view === 4 ? (
                    y?.videoUrl ? <video src={y.videoUrl} controls playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : (
                      <>
                        <div className="play" style={{ width: 84, height: 84 }}><PlayIcon size={26} /></div>
                        <div className="muted" style={{ fontSize: 13, textAlign: 'center' }}>{t('30–60 sec video: Pandit ji — the yantra, its pran-pratishtha and installation', '30–60 सेकंड वीडियो: पंडित जी — यंत्र, प्राण-प्रतिष्ठा, स्थापना')}</div>
                      </>
                    )
                  ) : img ? (
                    <img src={img} alt={`${name} — ${t(VIEWS[view])}`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <>
                      <div style={{ width: '78%' }}><YantraArt variant={y?.art || 'A'} /></div>
                    </>
                  )}
                </div>
              </div>
              {(y?.images?.length > 0 || y?.videoUrl) && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: 10 }}>
                {VIEWS.map((v, i) => (
                  <button key={v.en} type="button" aria-pressed={i === view} onClick={() => setView(i)} style={{ minHeight: 56, padding: 6, borderRadius: 4, fontSize: 12, cursor: 'pointer', background: 'var(--bg-2)', color: i === view ? 'var(--gold-2)' : 'var(--muted)', border: `1px solid ${i === view ? 'var(--gold)' : 'var(--line-2)'}` }}>{t(v)}</button>
                ))}
              </div>}
            </div>

            <div className="stack" style={{ flex: '1 1 420px', '--gap': '22px' }}>
              <div className="eyebrow-lg">{y ? t(catLabel(y.category)).toUpperCase() : ''}</div>
              <h1 className="h1" style={{ fontSize: 'clamp(38px,4.4vw,58px)' }}>{name}, <em>{energized}</em></h1>
              <p className="lead" style={{ fontSize: 16 }}>{descText || t('[2–3 lines: which deity/planet the yantra is linked to and what it is traditionally installed for. No guarantee language.]', '[2–3 पंक्ति: यंत्र किस देवता/ग्रह से जुड़ा है, पारंपरिक रूप से किस काम के लिए स्थापित किया जाता है। गारंटी की भाषा नहीं।]')}</p>
              <div className="row" style={{ '--gap': '14px', alignItems: 'baseline' }}>
                <span className="serif" style={{ fontSize: 44, color: 'var(--gold-2)', lineHeight: 1 }}>{price(y?.priceINR, y?.priceUSD)}</span>
                <span className="small">{currency === 'USD' ? t('International · PayPal', 'विदेश · PayPal') : y?.priceUSD != null ? `$${y.priceUSD} ${t('international', 'विदेश')}` : ''}</span>
              </div>
              <div className="stack" style={{ '--gap': '10px' }}>
                <span className="muted" style={{ fontSize: 13 }}>{t('Size', 'साइज़')}</span>
                <div className="row" style={{ '--gap': '10px' }} role="group" aria-label={t('Size', 'साइज़')}>
                  {sizes.map((z, i) => <button key={z} type="button" aria-pressed={i === size} className={`chip${i === size ? ' on' : ''}`} style={{ minHeight: 44 }} onClick={() => setSize(i)}>{sizeText(z)}</button>)}
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '18px 20px', border: '1px solid var(--line-2)', borderRadius: 4, cursor: 'pointer', background: 'var(--bg-2)' }}>
                <input type="checkbox" checked={sankalp} onChange={(e) => setSankalp(e.target.checked)} style={{ width: 20, height: 20, marginTop: 2, accentColor: 'var(--gold)' }} />
                <span className="stack" style={{ '--gap': '4px' }}>
                  <span style={{ fontSize: 15 }}>{t('Pran-pratishtha with a personal sankalp', 'व्यक्तिगत संकल्प के साथ प्राण-प्रतिष्ठा')} (+{price(y?.sankalpPriceINR, y?.sankalpPriceUSD)})</span>
                  <span className="muted" style={{ fontSize: 13 }}>{t('In your name and gotra, with video proof on WhatsApp', 'आपके नाम और गोत्र से, वीडियो प्रमाण WhatsApp पर')}</span>
                </span>
              </label>
              <div className="row" style={{ '--gap': '12px' }}>
                <button type="button" className="btn" style={{ flex: '1 1 180px' }} onClick={add}>{t('Add to cart', 'कार्ट में जोड़ें')}</button>
                <button type="button" className="btn-ghost" style={{ flex: '1 1 180px', borderColor: 'var(--gold)' }} onClick={() => { add(); navigate('/cart'); }}>{t('Buy now', 'अभी खरीदें')}</button>
              </div>
              <div className="small">{t('India: Razorpay (UPI, card) · International: PayPal · Delivery time confirmed on WhatsApp before dispatch', 'भारत: Razorpay (UPI, कार्ड) · विदेश: PayPal · डिलीवरी का समय डिस्पैच से पहले WhatsApp पर')}{SITE.freeShippingAbove ? t(` · Free shipping above ₹${SITE.freeShippingAbove}`, ` · ₹${SITE.freeShippingAbove} से ऊपर फ़्री शिपिंग`) : ''}</div>
              <div className="grid" style={{ '--min': '200px', '--gap': '10px 20px', fontSize: 14, color: 'var(--text-2)', paddingTop: 14, borderTop: '1px solid var(--line)' }}>
                <span className="tick">{t('Genuine metal, or your money back', 'असली धातु, नहीं तो पैसा वापस')}</span>
                <span className="tick">{t('Video proof of pran-pratishtha', 'प्राण-प्रतिष्ठा का वीडियो प्रमाण')}</span>
                <span className="tick">{t('Free replacement if it arrives broken', 'टूटा पहुँचे तो मुफ़्त रिप्लेसमेंट')}</span>
                <span className="tick">{t('30 days of WhatsApp support', '30 दिन WhatsApp सपोर्ट')}</span>
              </div>
              <a href={waLink(t(`Hello, I would like advice about the ${y?.name || 'yantra'}.`, `नमस्ते, मुझे ${name} के बारे में सलाह चाहिए।`))} className="link-arrow">{t('Not sure this yantra is right for you? Get 10 minutes of free advice', 'पक्का नहीं कि यह यंत्र आपके लिए सही है? 10 मिनट मुफ़्त सलाह लें')} →</a>
              <Link to="/book?service=vedic-30" className="btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }}>{t('Which yantra is right? Book a consultation first', 'कौन-सा यंत्र सही है? पहले परामर्श लें')}</Link>
            </div>
          </div>
        </div>
      </section>

      {c?.about && (
        <section className="section-tight">
          <div className="wrap stack" style={{ '--gap': '20px', maxWidth: 900 }}>
            <h2 className="h2 reveal" style={{ fontSize: 'clamp(32px,3.6vw,46px)' }}>{t('About the', 'जानिए')} <em>{name}</em></h2>
            <div className="prose reveal"><p>{t(c.about)}</p></div>
          </div>
        </section>
      )}

      <section className="band">
        <div className="wrap section row" style={{ '--gap': '56px' }}>
          <div className="stack reveal" style={{ flex: '1.2 1 440px', '--gap': '24px' }}>
            <h2 className="h2" style={{ fontSize: 'clamp(32px,3.6vw,46px)' }}>{t('Full yantra details', 'यंत्र की पूरी जानकारी')}</h2>
            <div>
              {[
                [t('Size', 'साइज़'), y ? sizeText(sizes[size]) : ''],
                [t('Metal / material', 'धातु / सामग्री'), y?.material || ''],
                [t('Weight', 'वज़न'), y?.weightGrams ? `${y.weightGrams} ${t('g', 'ग्राम')}` : ''],
                [t('Pran-pratishtha', 'प्राण-प्रतिष्ठा'), y?.pranPratishtha || t('By Pt. Rajneesh Sharma, with its mantras on an auspicious muhurta — you receive the video', 'पं. रजनीश शर्मा द्वारा, शुभ मुहूर्त में मंत्रों के साथ — वीडियो आपको मिलता है')],
                [t('Deity / planet', 'देवता / ग्रह'), y?.deity || ct(c?.deity) || ''],
                [t('Used for', 'किसके लिए'), y?.purpose || ct(c?.purpose) || ''],
                [t('Care', 'देखभाल'), y?.care || ct(c?.care) || ''],
                [t('Stock', 'स्टॉक'), y?.stock === 'made_to_order' ? t('Made to order', 'ऑर्डर पर बनता है') : y?.stock === 'out_of_stock' ? t('Currently unavailable', 'अभी उपलब्ध नहीं') : t('Available', 'उपलब्ध')],
                [t('In the box', 'बॉक्स में'), y?.boxContents && y.boxContents !== DEFAULT_BOX.en ? y.boxContents : t(DEFAULT_BOX)],
                [t('Shipping', 'शिपिंग'), t('Across India and worldwide; delivery time is confirmed on WhatsApp before dispatch', 'पूरे भारत और दुनिया भर में; डिलीवरी का समय डिस्पैच से पहले WhatsApp पर बताया जाता है')],
              ].filter(([, v]) => v).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: 20, padding: '16px 0', borderBottom: '1px solid var(--line)', fontSize: 15 }}>
                  <span className="muted" style={{ flex: '0 0 160px' }}>{k}</span><span>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="stack reveal" style={{ flex: '1 1 380px', '--gap': '24px' }}>
            <h2 className="h2" style={{ fontSize: 'clamp(32px,3.6vw,46px)' }}>{t('How to install', 'स्थापना विधि')}</h2>
            <div className="stack" style={{ '--gap': '14px', fontSize: 15 }}>
              {[[t('Day', 'दिन'), s.day || ct(cs.day) || t('[auspicious day and time]', '[शुभ दिन और समय]')], [t('Direction', 'दिशा'), s.direction || ct(cs.direction) || t('[which direction, which place]', '[किस दिशा में, किस जगह]')], [t('Purification', 'शुद्धि'), s.shuddhi || ct(cs.shuddhi) || t('[Ganga jal / raw milk]', '[गंगाजल / कच्चा दूध]')], [t('Mantra', 'मंत्र'), s.mantra || ct(cs.mantra) || t('[mantra, how many times]', '[मंत्र, कितनी बार]')], [t('Daily', 'रोज़'), s.daily || ct(cs.daily) || t('[lamp, incense, upkeep]', '[दीपक, धूप, देखभाल]')]].map(([k, v], i) => (
                <div key={k} style={{ display: 'flex', gap: 14 }}>
                  <span className="serif gold" style={{ fontSize: 20, width: 24 }}>{i + 1}</span>
                  <span><span className="muted">{k}:</span> {v}</span>
                </div>
              ))}
            </div>
            {y?.videoUrl && <PlayBox label={L('Installation video (Pandit ji)', 'स्थापना विधि वीडियो (पंडित जी)')} src={y.videoUrl} />}
          </div>
        </div>
      </section>

      {/* Client videos for this yantra go here once there are real ones (with permission). */}

      <section className="section-tight">
        <div className="wrap row" style={{ '--gap': '56px' }}>
          <div className="faq reveal" style={{ flex: '1.6 1 480px' }}>
            <h2 className="h2" style={{ fontSize: 'clamp(32px,3.6vw,46px)', marginBottom: 12 }}>{t('Questions & answers', 'प्रश्न-उत्तर')}</h2>
            {faqs.map(([q, a]) => (
              <details key={q.en}><summary>{t(q)}<PlusIcon /></summary><p>{t(a)}</p></details>
            ))}
          </div>
          <div className="stack reveal" style={{ flex: '1 1 280px', '--gap': '16px' }}>
            <h3 className="h3" style={{ fontSize: 30 }}>{t('You may also like', 'साथ में देखें')}</h3>
            {(data?.related || []).map((r) => (
              <Link key={r.slug} to={`/yantra-shop/${r.slug}`} className="card" style={{ flexDirection: 'row', alignItems: 'center', padding: 14 }}>
                <span style={{ flex: '0 0 72px', height: 72, borderRadius: 4, background: 'var(--bg-2)', padding: 6 }}><YantraArt variant={r.art} /></span>
                <span className="stack" style={{ '--gap': '4px' }}><span className="serif" style={{ fontSize: 20 }}>{t(yName(r))}</span><span className="muted" style={{ fontSize: 13 }}>{price(r.priceINR, r.priceUSD)}</span></span>
              </Link>
            ))}
            <div className="stack" style={{ '--gap': '8px', fontSize: 14, paddingTop: 10 }}>{t('Related:', 'संबंधित:')} <Link to="/vedic-astrology">{t('Vedic birth chart consultation', 'वैदिक कुंडली परामर्श')}</Link><Link to="/vedic-astrology">{t('Which yantra suits your birth chart', 'कौन-सा यंत्र आपकी कुंडली के लिए सही है')}</Link></div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
