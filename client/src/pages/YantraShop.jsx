import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DISCLAIMER, PageShell } from '../components/Layout.jsx';
import { Breadcrumb, Faq } from '../components/ui.jsx';
import { YantraArt, YantraCard } from '../components/Yantra.jsx';
import { getYantras } from '../api/index.js';
import { SITE, waLink } from '../data/site.js';
import { Link } from '../components/LangLink.jsx';
import { useT } from '../context/AppContext.jsx';
import { catLabel } from '../data/yantraI18n.js';
import { useInitialData } from '../context/InitialData.jsx';

const L = (en, hi) => ({ en, hi });

export default function YantraShop() {
  const t = useT();
  const [params, setParams] = useSearchParams();
  const active = params.get('category') || 'Sabhi';
  const [sort, setSort] = useState('popular');
  const initial = useInitialData('yantras');
  const [all, setAll] = useState(initial?.items || []);
  const [cats, setCats] = useState(initial?.categories || []);
  const [loading, setLoading] = useState(!initial);

  useEffect(() => {
    if (initial) return;
    getYantras().then((d) => {
      setAll(d.items);
      setCats(d.categories);
      setLoading(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

      <section id="yantras" className="section-tight" style={{ paddingBottom: 'var(--sp-section)' }}>
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

      <section className="section">
        <div className="wrap stack" style={{ '--gap': '28px', maxWidth: 900 }}>
          <h2 className="h2 reveal">{t('What is an', 'प्राण-प्रतिष्ठित')} <em>{t('energized yantra?', 'यंत्र क्या है?')}</em></h2>
          <div className="prose reveal">
            <p>{t('A yantra is a sacred geometric diagram — of a deity or a planet — engraved on metal. In the Vedic tradition it becomes a living tool for worship only after pran-pratishtha: the ritual of invoking the deity into the yantra with mantras, done on an auspicious muhurta. A yantra bought off a shelf is only a design; an energized yantra has had this ritual done for it.', 'यंत्र किसी देवता या ग्रह का पवित्र ज्यामितीय रूप है, जो धातु पर उकेरा जाता है। वैदिक परंपरा में यह पूजा का जीवंत साधन तभी बनता है जब इसकी प्राण-प्रतिष्ठा होती है: शुभ मुहूर्त में मंत्रों द्वारा देवता का यंत्र में आवाहन। दुकान की शेल्फ़ से लिया यंत्र सिर्फ़ एक डिज़ाइन है; प्राण-प्रतिष्ठित यंत्र वह है जिसके लिए यह अनुष्ठान किया गया हो।')}</p>
            <p>{t('Every yantra here is energized by Pt. Rajneesh Sharma, and you receive a video of its pran-pratishtha along with a simple installation guide — the direction, the day, and the mantra to recite. A yantra works best as part of a remedy that fits your birth chart, so if you are unsure which one you need, ask before you buy.', 'यहाँ का हर यंत्र पं. रजनीश शर्मा द्वारा प्राण-प्रतिष्ठित है, और आपको उसकी प्राण-प्रतिष्ठा का वीडियो और सरल स्थापना गाइड मिलती है — दिशा, दिन और जपने का मंत्र। यंत्र तब सबसे अच्छा काम करता है जब वह आपकी कुंडली के अनुसार उपाय का हिस्सा हो, इसलिए अगर पक्का न हो कि कौन-सा चाहिए, तो ख़रीदने से पहले पूछ लें।')}</p>
          </div>
          <h3 className="h3 reveal" style={{ fontSize: 30 }}>{t('Which yantra for which purpose?', 'किस काम के लिए कौन-सा यंत्र?')}</h3>
          <div className="grid reveal" style={{ '--min': '190px', '--gap': '14px' }}>
            {[
              ['Dhan', L('Wealth & prosperity', 'धन और समृद्धि'), L('Shree Yantra, Kuber and Mahalaxmi yantra — kept in the north or in the locker, for steady income and savings.', 'श्री यंत्र, कुबेर और महालक्ष्मी यंत्र — उत्तर दिशा या तिजोरी में, स्थिर आय और बचत के लिए।')],
              ['Vyapar', L('Business & success', 'व्यापार और सफलता'), L('Vyapar Vriddhi and Sarva Karya Siddhi yantra — at the shop, office or cash counter.', 'व्यापार वृद्धि और सर्व कार्य सिद्धि यंत्र — दुकान, ऑफिस या कैश काउंटर पर।')],
              ['Grah shanti', L('Planetary peace', 'ग्रह शांति'), L('Navgrah, Shani and Kaal Sarp yantra — when a planet or dosha is troubling your chart, ideally after a consultation.', 'नवग्रह, शनि और काल सर्प यंत्र — जब कोई ग्रह या दोष कुंडली में परेशान कर रहा हो, बेहतर है परामर्श के बाद।')],
              ['Raksha', L('Protection & health', 'रक्षा और स्वास्थ्य'), L('Mahamrityunjay, Hanuman and Baglamukhi yantra — for protection, courage and victory over obstacles.', 'महामृत्युंजय, हनुमान और बगलामुखी यंत्र — रक्षा, साहस और बाधाओं पर विजय के लिए।')],
              ['Vastu', L('Vastu dosh', 'वास्तु दोष'), L('Vastu Dosh Nivaran yantra — for a dosha that cannot be corrected without demolition.', 'वास्तु दोष निवारण यंत्र — ऐसे दोष के लिए जो बिना तोड़-फोड़ ठीक न हो सके।')],
              ['Shiksha', L('Education', 'शिक्षा'), L('Saraswati yantra — in the study room, in the north-east or east, for focus and learning.', 'सरस्वती यंत्र — पढ़ाई के कमरे में, उत्तर-पूर्व या पूर्व में, एकाग्रता और विद्या के लिए।')],
              ['Vivah', L('Marriage', 'विवाह'), L('Mangal yantra — for Manglik dosha and delays in marriage, as advised after kundli matching.', 'मंगल यंत्र — मांगलिक दोष और विवाह में देरी के लिए, कुंडली मिलान के बाद सलाह अनुसार।')],
            ].map(([c, h, d]) => (
              <button key={c} type="button" onClick={() => { pick(c); document.getElementById('yantras')?.scrollIntoView({ behavior: 'smooth' }); }} className="card" style={{ padding: 22, gap: 8, textAlign: 'left', cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
                <span className="serif" style={{ fontSize: 22 }}>{t(h)}</span>
                <span className="body">{t(d)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap grid" style={{ paddingBlock: 'var(--sp-band)', '--min': '260px', '--gap': '40px' }}>
          {[[L('Shipping', 'शिपिंग'), L(`Across India by courier and worldwide by international courier; customs duty abroad is paid by the buyer. The delivery time to your city is confirmed on WhatsApp before dispatch.${SITE.freeShippingAbove ? ` Free shipping in India above ₹${SITE.freeShippingAbove}.` : ''}`, `पूरे भारत में कूरियर से और विदेश में इंटरनेशनल कूरियर से; विदेश में कस्टम ड्यूटी खरीदार देता है। आपके शहर तक डिलीवरी का समय डिस्पैच से पहले WhatsApp पर बताया जाता है।${SITE.freeShippingAbove ? ` ₹${SITE.freeShippingAbove} से ऊपर भारत में फ़्री शिपिंग।` : ''}`)], [L('Payment', 'भुगतान'), L('India: Razorpay (UPI, card, netbanking) · International: PayPal.', 'भारत: Razorpay (UPI, कार्ड, नेटबैंकिंग) · विदेश: PayPal।')], [L('Personal sankalp', 'व्यक्तिगत संकल्प'), L('Pran-pratishtha in your name and gotra, with video (premium).', 'आपके नाम और गोत्र से प्राण-प्रतिष्ठा, वीडियो के साथ (प्रीमियम)।')]].map(([head, d]) => (
            <div key={head.en} className="stack reveal" style={{ '--gap': '12px' }}>
              <span className="serif" style={{ fontSize: 28 }}>{t(head)}</span>
              <span className="body">{t(d)}</span>
            </div>
          ))}
        </div>
      </section>
      <Faq title={L('Yantra FAQ', 'यंत्र — प्रश्न-उत्तर')} items={[
        [L('What is pran-pratishtha of a yantra?', 'यंत्र की प्राण-प्रतिष्ठा क्या है?'), L('It is the Vedic ritual of invoking the deity into the yantra with mantras on an auspicious muhurta. Every yantra here is energized this way, and you receive a video of the ritual.', 'यह शुभ मुहूर्त में मंत्रों द्वारा यंत्र में देवता का आवाहन करने का वैदिक अनुष्ठान है। यहाँ का हर यंत्र इसी तरह प्राण-प्रतिष्ठित है, और आपको अनुष्ठान का वीडियो मिलता है।')],
        [L('How do I choose the right yantra?', 'सही यंत्र कैसे चुनें?'), L('Choose by purpose — wealth, business, planetary peace, protection, Vastu, education or marriage. For a dosha in your chart, it is best to ask first: there is free 10-minute advice on WhatsApp.', 'उद्देश्य से चुनें — धन, व्यापार, ग्रह शांति, रक्षा, वास्तु, शिक्षा या विवाह। कुंडली के किसी दोष के लिए पहले पूछ लेना अच्छा है: WhatsApp पर 10 मिनट की मुफ़्त सलाह मिलती है।')],
        [L('Where and how should a yantra be installed?', 'यंत्र कहाँ और कैसे स्थापित करें?'), L('Each yantra comes with its own guide. Generally it is placed in a clean spot in the pooja room or the zone it belongs to (for example, wealth yantras in the north), on an auspicious day, facing east or north, after a short pooja.', 'हर यंत्र के साथ उसकी अपनी गाइड आती है। सामान्यतः इसे पूजा कक्ष या उससे जुड़े ज़ोन (जैसे धन यंत्र उत्तर में) में साफ़ जगह पर, शुभ दिन, पूर्व या उत्तर की ओर मुख करके, छोटी पूजा के बाद रखा जाता है।')],
        [L('Do I need to worship the yantra every day?', 'क्या रोज़ यंत्र की पूजा करनी होगी?'), L('A few minutes daily — lighting a diya or incense and reciting its mantra — is ideal. If you miss days, the yantra does not become harmful; simply continue.', 'रोज़ कुछ मिनट — दीया या अगरबत्ती जलाना और उसका मंत्र जपना — सबसे अच्छा है। कुछ दिन छूट जाएँ तो यंत्र हानिकारक नहीं होता; बस फिर से जारी रखें।')],
        [L('How do I clean a yantra?', 'यंत्र को कैसे साफ़ करें?'), L('Wipe it gently with a soft dry cloth. Copper and brass darken naturally over time; they can be cleaned with a little lemon water or tamarind and dried well.', 'मुलायम सूखे कपड़े से हल्के से पोंछें। ताँबा और पीतल समय के साथ स्वाभाविक रूप से काले पड़ते हैं; इन्हें थोड़े नींबू पानी या इमली से साफ़ करके अच्छी तरह सुखा लें।')],
        [L('Can women install a yantra?', 'क्या महिलाएँ यंत्र स्थापित कर सकती हैं?'), L('Yes. Women can install a yantra and do its daily pooja. Some families pause pooja on certain days by their own custom — you can follow your family’s tradition.', 'हाँ। महिलाएँ यंत्र की स्थापना और रोज़ की पूजा कर सकती हैं। कुछ परिवार अपनी परंपरा से कुछ दिनों पूजा रोकते हैं — आप अपने परिवार की परंपरा मान सकते हैं।')],
        [L('Do you ship yantras outside India?', 'क्या विदेश में यंत्र भेजते हैं?'), L('Yes, yantras ship worldwide from Jaipur by international courier. Any customs duty or import tax in your country is paid by the buyer.', 'हाँ, यंत्र जयपुर से इंटरनेशनल कूरियर द्वारा दुनिया भर में भेजे जाते हैं। आपके देश की कस्टम ड्यूटी या इम्पोर्ट टैक्स खरीदार देता है।')],
      ]} />
      <div className="wrap row z" style={{ '--gap': '10px 20px', fontSize: 14, color: 'var(--muted)', paddingBottom: 'var(--sp-section)', maxWidth: 860 }}>
        {t('Related:', 'संबंधित:')} <Link to="/vedic-astrology">{t('Find the right remedy — birth chart consultation', 'सही उपाय जानें — कुंडली परामर्श')}</Link><Link to="/online-vastu-consultation">{t('Online Vastu consultation', 'ऑनलाइन वास्तु परामर्श')}</Link><Link to="/nadi-astrology">{t('Nadi Shanti kandam remedies', 'नाड़ी शांति कांडम उपाय')}</Link><Link to="/kundli-milan">{t('Kundli matching', 'कुंडली मिलान')}</Link>
      </div>
    </PageShell>
  );
}
