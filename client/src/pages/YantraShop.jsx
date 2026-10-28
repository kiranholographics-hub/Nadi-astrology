import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DISCLAIMER, PageShell } from '../components/Layout.jsx';
import { Breadcrumb } from '../components/ui.jsx';
import { YantraArt, YantraCard } from '../components/Yantra.jsx';
import { getYantras } from '../api/index.js';
import { SITE, waLink } from '../data/site.js';
import { Link } from 'react-router-dom';
import { useT } from '../context/AppContext.jsx';
import { catLabel } from '../data/yantraI18n.js';

const L = (en, hi) => ({ en, hi });

export default function YantraShop() {
  const t = useT();
  const [params, setParams] = useSearchParams();
  const active = params.get('category') || 'Sabhi';
  const [sort, setSort] = useState('popular');
  const [all, setAll] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getYantras().then((d) => {
      setAll(d.items);
      setCats(d.categories);
      setLoading(false);
    });
  }, []);

  const items = useMemo(() => {
    let list = active === 'Sabhi' ? all : all.filter((y) => y.category === active);
    if (sort !== 'popular') {
      const dir = sort === 'asc' ? 1 : -1;
      list = [...list].sort((a, b) => ((a.priceINR ?? Infinity) - (b.priceINR ?? Infinity)) * dir);
    }
    return list;
  }, [all, active, sort]);

  const pick = (c) => setParams(c === 'Sabhi' ? {} : { category: c }, { replace: true });

  return (
    <PageShell title={L('Energized Yantra Shop — Pran-Pratishtha by Pt. Rajneesh Sharma', 'प्राण-प्रतिष्ठित यंत्र शॉप — पं. रजनीश शर्मा द्वारा प्राण-प्रतिष्ठा')} description={L('15 energized yantras with size, metal, installation guide and video. Shipping across India and worldwide.', '15 प्राण-प्रतिष्ठित यंत्र — साइज़, धातु, स्थापना विधि और वीडियो के साथ। भारत और दुनिया भर में शिपिंग।')} disclaimer={DISCLAIMER.yantra} seed={53} mobileCta={{ to: '/cart', label: L('Cart · Checkout', 'कार्ट · चेकआउट') }} revealKey={`${active}-${items.length}`}>
      <section className="hero" style={{ paddingBottom: 72 }}>
        <div className="wrap-wide stack" style={{ '--gap': '30px' }}>
          <Breadcrumb items={[{ label: L('Yantra Shop', 'यंत्र शॉप') }]} />
          <div className="row between center" style={{ '--gap': '40px', alignItems: 'center' }}>
            <div className="stack rise" style={{ flex: '1 1 560px', '--gap': '22px' }}>
              <h1 className="h1">{t('Energized Yantras,', 'प्राण-प्रतिष्ठित यंत्र,')} <em>{t('Pran-Pratishtha by Pt. Rajneesh Sharma', 'पं. रजनीश शर्मा द्वारा प्राण-प्रतिष्ठा')}</em></h1>
              <p className="lead" style={{ maxWidth: 640 }}>{t('15 yantras, each with its size, metal, installation guide and a short video. Shipping across India and worldwide.', '15 यंत्र, हर एक का साइज़, धातु, स्थापना विधि और छोटा वीडियो। भारत और दुनिया भर में शिपिंग।')}</p>
            </div>
            <div style={{ flex: '0 1 260px', width: 260, maxWidth: '60%' }}><YantraArt variant="A" /></div>
          </div>
          <div className="hairline" style={{ '--min': '230px' }}>
            {[L('Genuine metal, or your money back', 'असली धातु, नहीं तो पैसा वापस'), L('Video proof of pran-pratishtha', 'प्राण-प्रतिष्ठा का वीडियो प्रमाण'), L('Free replacement if it arrives broken', 'टूटा पहुँचे तो मुफ़्त रिप्लेसमेंट'), L('30 days of WhatsApp support', '30 दिन WhatsApp सपोर्ट')].map((x) => (
              <div key={x.en} style={{ background: 'var(--bg-2)', padding: '20px 22px', flexDirection: 'row', alignItems: 'center', fontSize: 14 }} className="tick">{t(x)}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ paddingBottom: 100 }}>
        <div className="wrap-wide row" style={{ '--gap': '36px', alignItems: 'flex-start' }}>
          <aside className="stack" style={{ flex: '1 1 220px', maxWidth: '100%', '--gap': '28px' }}>
            <div className="stack" style={{ '--gap': '6px' }} role="group" aria-label={t('Category', 'श्रेणी')}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>{t('Category', 'श्रेणी')}</div>
              {['Sabhi', ...cats].map((c) => {
                const on = c === active;
                const n = c === 'Sabhi' ? all.length : all.filter((y) => y.category === c).length;
                return (
                  <button key={c} type="button" aria-pressed={on} onClick={() => pick(c)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', minHeight: 44, padding: '0 16px', border: 0, borderRadius: 4, fontSize: 15, textAlign: 'left', cursor: 'pointer', background: on ? 'var(--gold)' : 'transparent', color: on ? 'var(--bg)' : 'var(--text-2)' }}>
                    <span>{t(catLabel(c))}</span><span style={{ fontSize: 12, opacity: 0.7 }}>{n}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ border: '1px solid var(--line-2)', borderRadius: 4, padding: 24, background: 'var(--bg-2)', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="serif" style={{ fontSize: 24, lineHeight: 1.2 }}>{t('Which yantra is right for you?', 'कौन-सा यंत्र सही है?')}</div>
              <div className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>{t('Get 10 minutes of free advice first, then buy.', 'पहले 10 मिनट मुफ़्त सलाह लें, फिर खरीदें।')}</div>
              <a href={waLink(t('Hello, I would like advice on choosing a yantra.', 'नमस्ते, मुझे यंत्र चुनने में सलाह चाहिए।'))} className="btn btn-sm">{t('Ask on WhatsApp', 'WhatsApp पर पूछें')}</a>
              <Link to="/book?service=vedic-30" className="btn-ghost btn-sm">{t('Book a consultation first', 'पहले परामर्श लें')}</Link>
            </div>
          </aside>

          <div className="stack" style={{ flex: '999 1 600px', minWidth: 0, '--gap': '24px' }}>
            <div className="row between center" style={{ '--gap': '14px', alignItems: 'center' }}>
              <div style={{ fontSize: 15, color: 'var(--text-2)' }}>{loading ? t('Loading…', 'लोड हो रहा है…') : `${items.length} ${t(items.length === 1 ? 'yantra' : 'yantras', 'यंत्र')}${active === 'Sabhi' ? '' : ` · ${t(catLabel(active))}`}`}</div>
              <label className="field" style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>{t('Sort', 'क्रम')}
                <select className="input" style={{ padding: '10px 14px', fontSize: 14, width: 'auto' }} value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="popular">{t('Popular', 'लोकप्रिय')}</option>
                  <option value="asc">{t('Price: low to high', 'कीमत: कम से ज़्यादा')}</option>
                  <option value="desc">{t('Price: high to low', 'कीमत: ज़्यादा से कम')}</option>
                </select>
              </label>
            </div>
            <div className="grid-fill" style={{ '--min': '250px' }}>
              {items.map((y) => <div key={y.slug} className="reveal"><YantraCard y={y} /></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap grid" style={{ padding: '80px 24px', '--min': '260px', '--gap': '40px' }}>
          {[[L('Shipping', 'शिपिंग'), L(`India: [__] days (Shiprocket, COD available) · International: [__] days (India Post / DHL / FedEx); customs duty is paid by the buyer. Free shipping on orders above ${SITE.freeShippingAbove ? `₹${SITE.freeShippingAbove}` : '[₹___]'}.`, `भारत: [__] दिन (Shiprocket, COD विकल्प) · विदेश: [__] दिन (India Post / DHL / FedEx), कस्टम ड्यूटी खरीदार देगा। ${SITE.freeShippingAbove ? `₹${SITE.freeShippingAbove}` : '[₹___]'} से ऊपर फ़्री शिपिंग।`)], [L('Payment', 'भुगतान'), L('India: Razorpay (UPI, card, netbanking) · International: PayPal.', 'भारत: Razorpay (UPI, कार्ड, नेटबैंकिंग) · विदेश: PayPal।')], [L('Personal sankalp', 'व्यक्तिगत संकल्प'), L('Pran-pratishtha in your name and gotra, with video (premium).', 'आपके नाम और गोत्र से प्राण-प्रतिष्ठा, वीडियो के साथ (प्रीमियम)।')]].map(([head, d]) => (
            <div key={head.en} className="stack reveal" style={{ '--gap': '12px' }}>
              <span className="serif" style={{ fontSize: 28 }}>{t(head)}</span>
              <span className="body">{t(d)}</span>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
