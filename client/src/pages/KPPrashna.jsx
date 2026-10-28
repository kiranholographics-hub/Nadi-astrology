import { useState } from 'react';
import { DISCLAIMER, PageShell } from '../components/Layout.jsx';
import { Breadcrumb, Faq, Steps } from '../components/ui.jsx';
import BookingForm from '../components/BookingForm.jsx';
import { usePrice, useT } from '../context/AppContext.jsx';

const L = (en, hi) => ({ en, hi });
const QUESTIONS = [
  L('When will I get married?', 'शादी कब होगी?'),
  L('When will I get a job?', 'नौकरी कब मिलेगी?'),
  L('Will this property deal go through?', 'यह प्रॉपर्टी डील होगी या नहीं?'),
  L('Will I move abroad?', 'विदेश जाना होगा?'),
  L('When will I be promoted?', 'प्रमोशन कब होगा?'),
  L('Is this business partnership right?', 'क्या यह बिज़नेस पार्टनरशिप सही है?'),
];

export default function KPPrashna() {
  const t = useT();
  const price = usePrice();
  const [num, setNum] = useState('108');
  const onNum = (e) => {
    const v = e.target.value;
    if (v === '') return setNum('');
    const n = parseInt(v, 10);
    if (!Number.isNaN(n)) setNum(String(Math.max(1, Math.min(249, n))));
  };
  const cta = { to: '#form', label: L('Ask your question', 'अपना प्रश्न पूछें') };

  return (
    <PageShell title={L('KP Prashna — One Question, Answered with Timing', 'केपी प्रश्न — एक प्रश्न, समय के साथ उत्तर')} description={L('KP Prashna (horary astrology) with Pt. Rajneesh Sharma: pick a number from 1–249 and get your specific question answered with timing. No birth time needed.', 'पं. रजनीश शर्मा के साथ केपी प्रश्न: 1–249 में से एक नंबर चुनें और अपने विशेष प्रश्न का समय के साथ उत्तर पाएँ। जन्म समय की ज़रूरत नहीं।')} cta={cta} disclaimer={DISCLAIMER.default} seed={31}>
      <section className="hero">
        <div className="wrap-wide stack" style={{ '--gap': '36px' }}>
          <Breadcrumb items={[{ label: L('KP Prashna', 'केपी प्रश्न') }]} />
          <div className="hero-row">
            <div className="hero-text rise">
              <div className="eyebrow-lg">— {t('KRISHNAMURTI PADDHATI · HORARY', 'कृष्णमूर्ति पद्धति · प्रश्न ज्योतिष')}</div>
              <h1 className="h1">{t('KP Prashna:', 'केपी प्रश्न:')} <em>{t('one question, answered with timing', 'एक प्रश्न, समय के साथ उत्तर')}</em></h1>
              <p className="lead">{t('“When will I get married?”, “Will I get the job?” — KP Prashna is for one specific question. You choose a number between 1 and 249, and a horary chart is cast from it. No birth time needed.', '“शादी कब होगी?”, “नौकरी मिलेगी या नहीं?” — एक विशेष प्रश्न के लिए केपी प्रश्न। आप 1 से 249 के बीच एक नंबर चुनते हैं, उससे प्रश्न कुंडली बनती है। जन्म समय की ज़रूरत नहीं।')}</p>
              <div className="row" style={{ '--gap': '14px' }}>
                <a href="#form" className="btn">{t('Book KP Prashna', 'केपी प्रश्न बुक करें')}</a>
                <a href="#how" className="btn-ghost">{t('How it works', 'कैसे काम करता है')}</a>
              </div>
            </div>
            <div style={{ flex: '1 1 520px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
              <div className="hero-art" style={{ maxWidth: 560 }}>
                <svg viewBox="0 0 600 600" aria-hidden="true">
                  <g className="spin" fill="none" stroke="#D9B26F" strokeOpacity=".4"><circle cx="300" cy="300" r="290" /><circle cx="300" cy="300" r="268" strokeDasharray="1.5 5.26" strokeWidth="10" strokeOpacity=".35" /></g>
                  <g className="spin-rev" fill="none" stroke="#EDE6D6" strokeOpacity=".25"><circle cx="300" cy="300" r="230" /><circle cx="300" cy="300" r="214" strokeDasharray="2 44" /></g>
                  <g style={{ transformOrigin: '300px 300px', animation: 'spin 12s linear infinite' }}><line x1="300" y1="300" x2="300" y2="56" stroke="#D9B26F" strokeWidth="1.2" /><circle cx="300" cy="56" r="5" fill="#F0D49B" /></g>
                  <circle cx="300" cy="300" r="150" fill="#0B0C18" stroke="#D9B26F" strokeOpacity=".6" />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, textAlign: 'center' }} aria-live="polite">
                  <span className="muted" style={{ fontSize: 11, letterSpacing: '.3em' }}>{t('YOUR NUMBER', 'आपका नंबर')}</span>
                  <span className="serif pulse" style={{ fontSize: 110, lineHeight: 1, color: 'var(--gold-2)' }}>{num || '—'}</span>
                  <span className="muted" style={{ fontSize: 13 }}>1 – 249</span>
                </div>
              </div>
              <div className="row" style={{ '--gap': '12px', alignItems: 'flex-end', justifyContent: 'center' }}>
                <label className="field">{t('Think of a number (1–249)', 'एक नंबर सोचिए (1–249)')}
                  <input type="number" min="1" max="249" value={num} onChange={onNum} className="input" style={{ width: 180, fontSize: 18 }} />
                </label>
                <button type="button" className="btn-ghost" onClick={() => setNum(String(1 + Math.floor(Math.random() * 249)))}>{t('Pick one at random', 'बिना सोचे चुनें')}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap section stack" style={{ '--gap': '36px' }}>
          <div className="stack reveal" style={{ '--gap': '14px' }}>
            <div className="eyebrow">— {t('Who it’s for', 'किसके लिए')}</div>
            <h2 className="h2">{t('“When will it happen? Will it happen?”', '“कब होगा, होगा या नहीं”')} <em>{t('questions', 'वाले प्रश्न')}</em></h2>
          </div>
          <div className="row reveal" style={{ '--gap': '12px' }}>
            {QUESTIONS.map((q) => <span key={q.en} className="chip serif" style={{ fontSize: 22, padding: '14px 22px' }}>{t(q)}</span>)}
          </div>
        </div>
      </section>

      <section id="how" className="section">
        <div className="wrap stack" style={{ '--gap': '44px' }}>
          <h2 className="h2 reveal">{t('How it works', 'कैसे काम करता है')}</h2>
          <Steps items={[
            [L('One clear question', 'एक साफ़ प्रश्न'), L('Only one specific question at a time.', 'एक बार में एक ही विशेष प्रश्न।')],
            [L('A number from 1–249', '1–249 नंबर'), L('Hold your question in mind and choose a number.', 'प्रश्न मन में रखकर एक नंबर चुनें।')],
            [L('Horary chart', 'प्रश्न कुंडली'), L('A KP horary chart is cast from that number and the time.', 'उस नंबर और समय से केपी प्रश्न कुंडली बनती है।')],
            [L('Answer with timing', 'समय के साथ उत्तर'), L('The answer and likely timing on a 20–30 minute call.', '20–30 मिनट की कॉल पर उत्तर और संभावित समय।')],
          ]} />
        </div>
      </section>

      <section id="form" className="band">
        <div className="wrap section row" style={{ '--gap': '48px' }}>
          <div className="card featured reveal" style={{ flex: '1 1 320px', alignSelf: 'flex-start', padding: 40 }}>
            <span className="eyebrow" style={{ letterSpacing: '.25em', fontSize: 12 }}>{t('20–30 MIN CALL', '20–30 मिनट कॉल')}</span>
            <h3 className="h3" style={{ fontSize: 34 }}>{t('KP Prashna', 'केपी प्रश्न')}</h3>
            <div className="card-price" style={{ fontSize: 48 }}>{price(null, null)}</div>
            <div className="card-list">
              {[L('Horary chart from a number 1–249', '1–249 नंबर से प्रश्न कुंडली'), L('Answer with timing', 'समय के साथ उत्तर'), L('No birth time needed', 'जन्म समय की ज़रूरत नहीं'), L('Recording + WhatsApp summary', 'रिकॉर्डिंग + WhatsApp सारांश')].map((p) => <span key={p.en} className="tick">{t(p)}</span>)}
            </div>
            <div className="small">{t('India: Razorpay · International: PayPal', 'भारत: Razorpay · विदेश: PayPal')}</div>
          </div>
          <BookingForm
            title={L('Send your question', 'अपना प्रश्न भेजें')}
            submitLabel={L('Choose a slot and pay', 'स्लॉट चुनें और भुगतान करें')}
            services={[{ value: 'kp-prashna', label: L('KP Prashna', 'केपी प्रश्न') }]}
            fields={[
              { name: 'name', label: L('Full name', 'पूरा नाम'), required: true },
              { name: 'phone', label: L('Phone / WhatsApp', 'फ़ोन / WhatsApp'), type: 'tel', required: true },
              { name: 'kpNumber', label: L('Your number (1–249)', 'आपका नंबर (1–249)'), type: 'number', min: 1, max: 249, value: num, onChange: onNum },
              { name: 'city', label: L('Which city are you in right now?', 'अभी आप किस शहर में हैं') },
              { name: 'question', label: L('Your one question', 'आपका एक प्रश्न'), type: 'textarea', full: true, rows: 3 },
            ]}
          />
        </div>
      </section>

      <section style={{ paddingTop: 110 }}>
        <Faq title={L('KP Prashna FAQ', 'केपी प्रश्न — प्रश्न-उत्तर')} items={[
          [L('I don’t know my birth time — will it still work?', 'जन्म समय नहीं पता — फिर भी चलेगा?'), L('Yes. KP Prashna does not need a birth time; the chart is cast from the number you choose and the time of your question.', 'हाँ। केपी प्रश्न में जन्म समय की ज़रूरत नहीं होती; कुंडली आपके चुने नंबर और प्रश्न के समय से बनती है।')],
          [L('How many questions per number?', 'एक नंबर पर कितने प्रश्न?'), L('One number, one question. A second question needs a separate prashna.', 'एक नंबर, एक प्रश्न। दूसरे प्रश्न के लिए अलग प्रश्न।')],
          [L('What is the difference between KP and Vedic astrology?', 'केपी और वैदिक में क्या फ़र्क है?'), L('[Pandit ji’s answer]', '[पंडित जी का उत्तर]')],
        ]} />
      </section>
    </PageShell>
  );
}
