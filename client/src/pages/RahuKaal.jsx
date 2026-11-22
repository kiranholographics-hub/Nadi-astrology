import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from '../components/LangLink.jsx';
import { DISCLAIMER, PageShell } from '../components/Layout.jsx';
import { Breadcrumb, Faq } from '../components/ui.jsx';
import { useApp, useT } from '../context/AppContext.jsx';
import {
  CHOGHADIYA_INFO, CITIES, WEEKDAYS, addDays, dayTimings, fmt, fmtDate, isoDate, nowMinutesIST, parseIso, sameDate, todayIST,
} from '../data/panchang.js';

const L = (en, hi) => ({ en, hi });

// Approximate Rahu Kaal for a 6 am – 6 pm day, the classic table people remember.
const CLASSIC = [
  [L('Sunday', 'रविवार'), '4:30 – 6:00 PM'], [L('Monday', 'सोमवार'), '7:30 – 9:00 AM'], [L('Tuesday', 'मंगलवार'), '3:00 – 4:30 PM'],
  [L('Wednesday', 'बुधवार'), '12:00 – 1:30 PM'], [L('Thursday', 'गुरुवार'), '1:30 – 3:00 PM'], [L('Friday', 'शुक्रवार'), '10:30 AM – 12:00 PM'], [L('Saturday', 'शनिवार'), '9:00 – 10:30 AM'],
];

export default function RahuKaal() {
  const t = useT();
  const { lang } = useApp();
  const [params, setParams] = useSearchParams();
  const city = CITIES.find((c) => c.id === params.get('city')) || CITIES[0];
  const today = todayIST();
  const date = parseIso(params.get('date')) || today;
  const isToday = sameDate(date, today);
  const cityName = t(city.name, city.nameHi);

  // Re-render every minute so "on now" stays right.
  const [now, setNow] = useState(() => nowMinutesIST());
  useEffect(() => {
    const id = setInterval(() => setNow(nowMinutesIST()), 60000);
    return () => clearInterval(id);
  }, []);

  const day = useMemo(() => dayTimings(date, city), [date.y, date.m, date.d, city.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const week = useMemo(() => Array.from({ length: 7 }, (_, i) => dayTimings(addDays(today, i), city)), [today.y, today.m, today.d, city.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (next) => {
    const p = {};
    const c = next.city ?? city.id;
    const d = next.date ?? date;
    if (c !== 'jaipur') p.city = c;
    if (!sameDate(d, today)) p.date = isoDate(d);
    setParams(p, { replace: true });
  };

  const range = (p) => `${fmt(p.start, lang)} – ${fmt(p.end, lang)}`;
  const isNow = (p) => isToday && now >= p.start && now < p.end;
  // night periods are after midnight on the next calendar day
  const isNowNight = (p) => (isToday && now + 1440 >= p.start && now + 1440 < p.end) || (isToday && now >= p.start && now < p.end);

  let status = null;
  if (isToday) {
    if (now < day.rahu.start) status = t(`Rahu Kaal starts at ${fmt(day.rahu.start, 'en')} today`, `आज राहु काल ${fmt(day.rahu.start, 'hi')} से शुरू होगा`);
    else if (now < day.rahu.end) status = t(`Rahu Kaal is on now — until ${fmt(day.rahu.end, 'en')}`, `अभी राहु काल चल रहा है — ${fmt(day.rahu.end, 'hi')} तक`);
    else status = t('Rahu Kaal is over for today', 'आज का राहु काल समाप्त हो चुका है');
  }

  const choghadiyaTable = (rows, night) => (
    <div style={{ overflowX: 'auto' }}>
      <table className="slots" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th style={{ padding: '10px 12px' }}>{t('Time', 'समय')}</th>
            <th style={{ padding: '10px 12px' }}>{t('Choghadiya', 'चौघड़िया')}</th>
            <th style={{ padding: '10px 12px' }}>{t('Good for', 'किसके लिए')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const info = CHOGHADIYA_INFO[r.name];
            const on = night ? isNowNight(r) : isNow(r);
            return (
              <tr key={r.start} style={{ borderTop: '1px solid var(--line)', background: on ? 'var(--bg-hover)' : undefined }}>
                <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{range(r)}{on && <span className="chip" style={{ marginLeft: 8, padding: '2px 8px', fontSize: 11 }}>{t('Now', 'अभी')}</span>}</td>
                <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                  <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 999, marginRight: 8, background: info.good ? '#6FC08F' : '#E07B6A' }} aria-hidden="true" />
                  {t(info)} <span className="muted" style={{ fontSize: 12 }}>· {info.good ? t('good', 'शुभ') : t('avoid', 'टालें')}</span>
                </td>
                <td className="muted" style={{ padding: '10px 12px' }}>{t(info.use)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const card = (label, value, sub, strong) => (
    <div className="card" style={{ padding: 22, gap: 6, borderColor: strong ? 'var(--gold)' : undefined }}>
      <span className="eyebrow" style={{ letterSpacing: '.2em', fontSize: 12 }}>{label}</span>
      <span className="serif" style={{ fontSize: strong ? 32 : 26, color: strong ? 'var(--gold-2)' : undefined, fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      {sub && <span className="muted" style={{ fontSize: 13 }}>{sub}</span>}
    </div>
  );

  return (
    <PageShell
      title={L('Rahu Kaal Today Jaipur: Rahu Kaal & Choghadiya Timings', 'आज का राहु काल जयपुर — राहु काल और चौघड़िया समय')}
      description={L('Rahu Kaal today in Jaipur with Yamaganda, Gulika Kaal, sunrise, sunset and the day and night Choghadiya — also for Delhi, Mumbai and other cities. Updated daily.', 'जयपुर में आज का राहु काल, यमगंड, गुलिक काल, सूर्योदय, सूर्यास्त और दिन-रात का चौघड़िया — दिल्ली, मुंबई और दूसरे शहरों के लिए भी। रोज़ अपडेट।')}
      disclaimer={DISCLAIMER.jyotish}
      seed={157}
    >
      <section className="hero">
        <div className="wrap stack" style={{ '--gap': '26px' }}>
          <Breadcrumb items={[{ label: L('Rahu Kaal Today', 'आज का राहु काल') }]} />
          <h1 className="h1 rise">{t('Rahu Kaal Today in', 'आज का राहु काल —')} <em>{cityName}</em></h1>
          <p className="lead" style={{ maxWidth: 700 }}>{t(`Rahu Kaal, Yamaganda and Gulika Kaal for ${city.name}, worked out from the actual sunrise and sunset of the day, with the day and night Choghadiya.`, `${city.nameHi} के लिए राहु काल, यमगंड और गुलिक काल — उस दिन के असली सूर्योदय और सूर्यास्त से निकाले गए, साथ में दिन और रात का चौघड़िया।`)}</p>

          <div className="stack" style={{ '--gap': '6px' }}>
            <span className="serif" style={{ fontSize: 24 }}>{fmtDate(date, lang)}{isToday ? ` · ${t('today', 'आज')}` : ''}</span>
            {status && <span style={{ color: 'var(--gold-2)', fontSize: 16 }}>{status}</span>}
          </div>

          <div className="grid" style={{ '--min': '200px', '--gap': '14px' }}>
            {card(t('Rahu Kaal', 'राहु काल'), range(day.rahu), t('Avoid starting new work', 'नया काम शुरू करने से बचें'), true)}
            {card(t('Yamaganda', 'यमगंड'), range(day.yamaganda), t('Inauspicious', 'अशुभ'))}
            {card(t('Gulika Kaal', 'गुलिक काल'), range(day.gulika), t('Avoid new beginnings', 'नई शुरुआत से बचें'))}
            {card(t('Sunrise · Sunset', 'सूर्योदय · सूर्यास्त'), `${fmt(day.sunrise, lang)} · ${fmt(day.sunset, lang)}`, cityName)}
          </div>
          <div className="row" style={{ '--gap': '10px 14px', alignItems: 'center' }}>
            <label className="field" style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }} htmlFor="rk-city">{t('City', 'शहर')}
              <select id="rk-city" className="input" style={{ width: 'auto', padding: '10px 14px' }} value={city.id} onChange={(e) => set({ city: e.target.value })}>
                {CITIES.map((c) => <option key={c.id} value={c.id}>{t(c.name, c.nameHi)}</option>)}
              </select>
            </label>
            <div className="row" style={{ '--gap': '8px', alignItems: 'center' }} role="group" aria-label={t('Date', 'तारीख')}>
              <button type="button" className="btn-ghost btn-sm" onClick={() => set({ date: addDays(date, -1) })} aria-label={t('Previous day', 'पिछला दिन')}>‹</button>
              <input id="rk-date" type="date" className="input" style={{ width: 'auto', padding: '9px 12px' }} value={isoDate(date)} onChange={(e) => { const d = parseIso(e.target.value); if (d) set({ date: d }); }} aria-label={t('Date', 'तारीख')} />
              <button type="button" className="btn-ghost btn-sm" onClick={() => set({ date: addDays(date, 1) })} aria-label={t('Next day', 'अगला दिन')}>›</button>
              {!isToday && <button type="button" className="btn-ghost btn-sm" onClick={() => set({ date: today })}>{t('Today', 'आज')}</button>}
            </div>
          </div>

        </div>
      </section>

      <section className="band">
        <div className="wrap section stack" style={{ '--gap': '28px' }}>
          <h2 className="h2">{t('Choghadiya', 'चौघड़िया')} <em>{t(`for ${city.name}`, `— ${city.nameHi}`)}</em></h2>
          <div className="stack" style={{ '--gap': '10px' }}>
            <h3 className="serif" style={{ fontSize: 24, margin: 0, fontWeight: 500 }}>{t('Day Choghadiya', 'दिन का चौघड़िया')} <span className="muted" style={{ fontSize: 15 }}>({fmt(day.sunrise, lang)} – {fmt(day.sunset, lang)})</span></h3>
            {choghadiyaTable(day.dayChoghadiya, false)}
          </div>
          <div className="stack" style={{ '--gap': '10px' }}>
            <h3 className="serif" style={{ fontSize: 24, margin: 0, fontWeight: 500 }}>{t('Night Choghadiya', 'रात का चौघड़िया')} <span className="muted" style={{ fontSize: 15 }}>({fmt(day.sunset, lang)} – {fmt(day.nextSunrise, lang)})</span></h3>
            {choghadiyaTable(day.nightChoghadiya, true)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap stack" style={{ '--gap': '24px' }}>
          <h2 className="h2">{t('Rahu Kaal this week', 'इस हफ़्ते का राहु काल')} <em>{t(`in ${city.name}`, `— ${city.nameHi}`)}</em></h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th style={{ padding: '10px 12px' }}>{t('Day', 'दिन')}</th>
                  <th style={{ padding: '10px 12px' }}>{t('Rahu Kaal', 'राहु काल')}</th>
                  <th style={{ padding: '10px 12px' }}>{t('Yamaganda', 'यमगंड')}</th>
                  <th style={{ padding: '10px 12px' }}>{t('Gulika', 'गुलिक')}</th>
                </tr>
              </thead>
              <tbody>
                {week.map((w) => (
                  <tr key={isoDate(w.date)} style={{ borderTop: '1px solid var(--line)' }}>
                    <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>{t(WEEKDAYS[w.weekday])}, {w.date.d}/{w.date.m}</td>
                    <td style={{ padding: '10px 12px', whiteSpace: 'nowrap', color: 'var(--gold-2)', fontVariantNumeric: 'tabular-nums' }}>{range(w.rahu)}</td>
                    <td className="muted" style={{ padding: '10px 12px', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{range(w.yamaganda)}</td>
                    <td className="muted" style={{ padding: '10px 12px', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{range(w.gulika)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap section stack" style={{ '--gap': '22px', maxWidth: 900 }}>
          <h2 className="h2">{t('What is', 'राहु काल')} <em>{t('Rahu Kaal?', 'क्या है?')}</em></h2>
          <div className="prose">
            <p>{t('Rahu Kaal (Rahu Kalam) is a period of about one and a half hours every day that is ruled by Rahu, the shadow planet. In Vedic tradition it is considered unfavourable for starting anything new — a business, a journey, a purchase, an important meeting or a ceremony. Work that is already under way can continue as usual.', 'राहु काल (राहु कालम) हर दिन लगभग डेढ़ घंटे की वह अवधि है जिसका स्वामी छाया ग्रह राहु है। वैदिक परंपरा में इसे कोई भी नया काम शुरू करने के लिए अशुभ माना जाता है — व्यापार, यात्रा, ख़रीदारी, ज़रूरी मीटिंग या कोई संस्कार। जो काम पहले से चल रहा है, वह सामान्य रूप से जारी रह सकता है।')}</p>
            <p>{t('It is worked out from the actual sunrise and sunset of the place. The daytime is divided into eight equal parts, and Rahu Kaal falls in a fixed part for each weekday: the 8th on Sunday, 2nd on Monday, 7th on Tuesday, 5th on Wednesday, 6th on Thursday, 4th on Friday and 3rd on Saturday. Because the length of the day changes with the season and the city, the clock times change every day — which is why a fixed table is only an approximation.', 'इसे उस जगह के असली सूर्योदय और सूर्यास्त से निकाला जाता है। दिन के समय को आठ बराबर भागों में बाँटा जाता है, और हर वार के लिए राहु काल एक तय भाग में आता है: रविवार को 8वाँ, सोमवार को 2रा, मंगलवार को 7वाँ, बुधवार को 5वाँ, गुरुवार को 6ठा, शुक्रवार को 4था और शनिवार को 3रा। मौसम और शहर के साथ दिन की लंबाई बदलती है, इसलिए घड़ी का समय रोज़ बदलता है — इसीलिए कोई तय तालिका सिर्फ़ अनुमान होती है।')}</p>
            <p>{t('Yamaganda and Gulika Kaal (in tradition, the time of Gulika, Saturn’s son) are worked out the same way and are also avoided for new beginnings. Choghadiya divides the day and the night into eight periods each, named Amrit, Shubh, Labh, Char, Udveg, Kaal and Rog — the first four are favourable, the last three are avoided.', 'यमगंड और गुलिक काल (परंपरा में शनि के पुत्र गुलिक का समय) भी इसी तरह निकाले जाते हैं और नई शुरुआत के लिए टाले जाते हैं। चौघड़िया दिन और रात — दोनों को आठ-आठ भागों में बाँटता है, जिनके नाम अमृत, शुभ, लाभ, चर, उद्वेग, काल और रोग हैं — पहले चार शुभ हैं, बाकी तीन टाले जाते हैं।')}</p>
          </div>
          <h3 className="serif" style={{ fontSize: 24, margin: 0, fontWeight: 500 }}>{t('Approximate Rahu Kaal by weekday (for a 6 am – 6 pm day)', 'वार के अनुसार अनुमानित राहु काल (सुबह 6 से शाम 6 के दिन के लिए)')}</h3>
          <div className="grid" style={{ '--min': '200px', '--gap': '10px' }}>
            {CLASSIC.map(([d, time]) => (
              <div key={d.en} className="card" style={{ padding: '14px 18px', gap: 4 }}>
                <span style={{ fontWeight: 600 }}>{t(d)}</span>
                <span className="muted" style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq title={L('Rahu Kaal — questions', 'राहु काल — प्रश्न-उत्तर')} items={[
        [L('Is Rahu Kaal at the same time every day?', 'क्या राहु काल रोज़ एक ही समय पर होता है?'), L('No. It depends on the weekday and on that day’s sunrise and sunset in your city, so it shifts a little every day and differs between cities.', 'नहीं। यह वार और आपके शहर में उस दिन के सूर्योदय-सूर्यास्त पर निर्भर करता है, इसलिए रोज़ थोड़ा बदलता है और शहरों में अलग होता है।')],
        [L('Can I travel during Rahu Kaal?', 'क्या राहु काल में यात्रा कर सकते हैं?'), L('Traditionally, starting a journey in Rahu Kaal is avoided. If the timing cannot be changed, many families leave a little before it begins or after it ends, or begin with a short prayer.', 'परंपरा से राहु काल में यात्रा शुरू करना टाला जाता है। समय बदल न सके, तो कई परिवार इसके शुरू होने से पहले या ख़त्म होने के बाद निकलते हैं, या एक छोटी प्रार्थना से शुरुआत करते हैं।')],
        [L('What if something important must start in Rahu Kaal?', 'अगर कोई ज़रूरी काम राहु काल में ही शुरू करना हो तो?'), L('Rahu Kaal is a guide, not a ban. Work already in progress continues normally. For an important new start, a muhurat can be chosen from your own chart — or a KP Prashna can answer a specific “when” question.', 'राहु काल मार्गदर्शन है, रोक नहीं। जो काम चल रहा है वह सामान्य रूप से जारी रहता है। किसी ज़रूरी नई शुरुआत के लिए आपकी कुंडली से मुहूर्त चुना जा सकता है — या केपी प्रश्न किसी ख़ास “कब” वाले सवाल का उत्तर दे सकता है।')],
        [L('Which Choghadiya is best?', 'कौन-सा चौघड़िया सबसे अच्छा है?'), L('Amrit is considered best for all work, Shubh for ceremonies and marriage, Labh for business and study, and Char for travel. Udveg, Kaal and Rog are avoided for new beginnings.', 'अमृत हर काम के लिए सबसे अच्छा माना जाता है, शुभ संस्कार और विवाह के लिए, लाभ व्यापार और पढ़ाई के लिए, और चर यात्रा के लिए। उद्वेग, काल और रोग नई शुरुआत के लिए टाले जाते हैं।')],
        [L('Why do other panchangs show a slightly different time?', 'दूसरे पंचांग में समय थोड़ा अलग क्यों दिखता है?'), L('Panchangs define sunrise slightly differently (the top edge or the centre of the sun) and use exact or rounded city coordinates, so times can differ by a minute or two.', 'पंचांग सूर्योदय को थोड़ा अलग तरह से मानते हैं (सूर्य का ऊपरी किनारा या केंद्र) और शहर के सटीक या गोल निर्देशांक लेते हैं, इसलिए समय में एक-दो मिनट का अंतर हो सकता है।')],
      ]} />

      <section className="section-tight">
        <div className="wrap row center" style={{ '--gap': '14px', justifyContent: 'center' }}>
          <Link to="/kp-prashna" className="btn">{t('Ask one question with KP Prashna', 'केपी प्रश्न से एक सवाल पूछें')}</Link>
          <Link to="/vedic-astrology" className="btn-ghost">{t('Muhurat from your birth chart', 'कुंडली से मुहूर्त')}</Link>
        </div>
      </section>
    </PageShell>
  );
}
