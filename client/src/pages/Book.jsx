import { useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PageShell } from '../components/Layout.jsx';
import { Breadcrumb } from '../components/ui.jsx';
import { ThumbIcon, UploadIcon } from '../components/Icons.jsx';
import { GROUP_LABEL, MODE_LABEL, SERVICES, SLOTS_IST } from '../data/services.js';
import { useApp, usePrice, useT } from '../context/AppContext.jsx';
import { createBooking } from '../api/index.js';

const L = (en, hi) => ({ en, hi });
const STEPS = [L('Service', 'सेवा'), L('Slot', 'स्लॉट'), L('Details', 'जानकारी'), L('Payment', 'भुगतान')];
const userTz = (() => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
  } catch {
    return 'Asia/Kolkata';
  }
})();
const fv = (ref, k) => ref.current?.elements.namedItem(k)?.value || '';
const today = () => new Date().toISOString().slice(0, 10);

function localTime(date, hhmm, lang = 'en') {
  try {
    const d = new Date(`${date}T${hhmm}:00+05:30`);
    return d.toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-US', { timeZone: userTz, weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
  } catch {
    return `${date} ${hhmm} IST`;
  }
}

export default function Book() {
  const [params] = useSearchParams();
  const { currency, lang } = useApp();
  const price = usePrice();
  const t = useT();
  const lt = (d, h) => localTime(d, h, lang);
  const initial = SERVICES.find((s) => s.value === params.get('service'));
  const [step, setStep] = useState(initial ? 1 : 0);
  const [service, setService] = useState(initial || null);
  const [mode, setMode] = useState(initial?.modes[0] || 'video');
  const [date, setDate] = useState('');
  const [slot, setSlot] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(null);
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);
  const needsSlot = service && !['report'].includes(mode);

  const groups = useMemo(() => SERVICES.reduce((g, s) => ({ ...g, [s.group]: [...(g[s.group] || []), s] }), {}), []);

  function pickService(s) {
    setService(s);
    setMode(s.modes[0]);
    setError('');
    setStep(1);
  }
  function next() {
    setError('');
    if (step === 1 && needsSlot && (!date || !slot)) return setError(t('Please choose a date and a slot.', 'कृपया तारीख और स्लॉट चुनें।'));
    if (step === 2) {
      const el = formRef.current.elements;
      if (!el.namedItem('name').value.trim() || !el.namedItem('phone').value.trim()) return setError(t('Name and phone/WhatsApp are required.', 'नाम और फ़ोन/WhatsApp ज़रूरी है।'));
      if (!el.namedItem('consent').checked) return setError(t('Please tick the consent checkbox.', 'कृपया सहमति वाला बॉक्स टिक करें।'));
      if (service.kind === 'kp') {
        const n = Number(el.namedItem('kpNumber').value);
        if (!Number.isInteger(n) || n < 1 || n > 249) return setError(t('Please choose a KP number between 1 and 249.', 'केपी नंबर 1 से 249 के बीच चुनें।'));
      }
    }
    setStep((x) => x + 1);
  }

  async function submit() {
    setSending(true);
    setError('');
    const fd = new FormData(formRef.current);
    fd.set('service', service.value);
    fd.set('mode', mode);
    fd.set('currency', currency);
    fd.set('timezone', userTz);
    if (needsSlot) fd.set('preferredSlot', `${date} ${slot} IST (${localTime(date, slot)} ${userTz})`);
    try {
      const r = await createBooking(fd);
      setDone(r);
    } catch (e) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  }

  const priceText = service ? (service.inrOnly ? t('[₹ PRICE] + travel', '[₹ PRICE] + यात्रा') : service.perSqft ? `${currency === 'USD' ? '[$ __' : '[₹ __'} / sq.ft]` : price(service.priceINR, service.priceUSD)) : '';

  return (
    <PageShell title={L('Book Consultation', 'परामर्श बुक करें')} description={L('Book a Vedic, KP, Nadi or Vastu consultation — choose a service, pick a slot in your time zone, add your details and pay.', 'वैदिक, केपी, नाड़ी या वास्तु परामर्श बुक करें — सेवा चुनें, अपने टाइम ज़ोन में स्लॉट, जानकारी और भुगतान।')} cta={{ to: '/book', label: L('Book Consultation', 'परामर्श बुक करें') }} mobileCta={{ to: '/contact', label: L('Questions? Contact us', 'प्रश्न है? संपर्क करें') }} seed={101}>
      <section className="hero">
        <div className="wrap stack" style={{ '--gap': '32px' }}>
          <Breadcrumb items={[{ label: L('Book Consultation', 'परामर्श बुक करें') }]} />
          <h1 className="h1 rise">{t('Book a', 'परामर्श')} <em>{t('Consultation', 'बुक करें')}</em></h1>

          <ol className="row" style={{ '--gap': '8px', listStyle: 'none', padding: 0, margin: 0 }} aria-label={t('Booking steps', 'बुकिंग के चरण')}>
            {STEPS.map((s, i) => (
              <li key={s.en} aria-current={i === step ? 'step' : undefined} style={{ flex: '1 1 140px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ height: 2, background: i <= step ? 'var(--gold)' : 'var(--line-2)', transition: 'background .4s' }} />
                <span style={{ fontSize: 13, color: i === step ? 'var(--gold-2)' : 'var(--muted)' }}>{String(i + 1).padStart(2, '0')} · {t(s)}</span>
              </li>
            ))}
          </ol>

          {done ? (
            <div className="card featured fade-in" style={{ padding: 44, maxWidth: 760 }}>
              <span className="eyebrow">— {t('Booking received', 'बुकिंग मिल गई')}</span>
              <h2 className="h2">{t('Thank you!', 'धन्यवाद!')} <em>{t('Ref', 'रेफ़')} {String(done.id).slice(-6).toUpperCase()}</em></h2>
              <p className="lead">{t(service.label)}{needsSlot ? ` · ${lt(date, slot)}` : ''}. {t(`You will receive the payment link (${done.next === 'paypal' ? 'PayPal' : 'Razorpay'}) and the Zoom/Meet link by email and WhatsApp.`, `भुगतान लिंक (${done.next === 'paypal' ? 'PayPal' : 'Razorpay'}) और Zoom/Meet लिंक आपको ईमेल और WhatsApp पर मिलेगा।`)}</p>
              <div className="row" style={{ '--gap': '12px' }}><Link to="/" className="btn">{t('Go to Home', 'होम पर जाएँ')}</Link><Link to="/yantra-shop" className="btn-ghost">{t('Yantra Shop', 'यंत्र शॉप')}</Link></div>
            </div>
          ) : (
            <div className="row" style={{ '--gap': '40px', alignItems: 'flex-start' }}>
              <div className="stack" style={{ flex: '2 1 560px', minWidth: 0, '--gap': '28px' }}>
                {/* STEP 1 — service */}
                {step === 0 && Object.entries(groups).map(([g, list]) => (
                  <div key={g} className="stack fade-in" style={{ '--gap': '14px' }}>
                    <div className="eyebrow">— {t(GROUP_LABEL[g] || g)}</div>
                    <div className="grid" style={{ '--min': '240px', '--gap': '14px' }}>
                      {list.map((s) => (
                        <button key={s.value} type="button" className="card" onClick={() => pickService(s)} style={{ padding: 24, textAlign: 'left', cursor: 'pointer', gap: 10, borderColor: service?.value === s.value ? 'var(--gold)' : undefined }}>
                          <span className="serif" style={{ fontSize: 24 }}>{t(s.label)}</span>
                          <span className="muted" style={{ fontSize: 13 }}>{t(s.duration)}</span>
                          <span style={{ fontSize: 14, color: 'var(--text-2)' }}>{t(s.forWhom)}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* STEP 2 — mode + slot */}
                {step === 1 && service && (
                  <div className="stack fade-in" style={{ '--gap': '26px' }}>
                    <div className="stack" style={{ '--gap': '12px' }}>
                      <span className="muted" style={{ fontSize: 13 }}>{t('How would you like to meet?', 'कैसे मिलना है')}</span>
                      <div className="row" style={{ '--gap': '10px' }}>
                        {service.modes.map((m) => <button key={m} type="button" className={`chip${mode === m ? ' on' : ''}`} style={{ minHeight: 44 }} aria-pressed={mode === m} onClick={() => setMode(m)}>{t(MODE_LABEL[m])}</button>)}
                      </div>
                    </div>
                    {needsSlot ? (
                      <>
                        <label className="field" style={{ maxWidth: 280 }}>{t('Date', 'तारीख')}
                          <input type="date" className="input" min={today()} value={date} onChange={(e) => { setDate(e.target.value); setSlot(''); }} />
                        </label>
                        <div className="stack" style={{ '--gap': '12px' }}>
                          <span className="muted" style={{ fontSize: 13 }}>{t('Slot — shown in your time zone', 'स्लॉट — आपके टाइम ज़ोन में')} ({userTz})</span>
                          <div className="grid" style={{ '--min': '170px', '--gap': '10px' }}>
                            {SLOTS_IST.map((h) => (
                              <button key={h} type="button" disabled={!date} aria-pressed={slot === h} onClick={() => setSlot(h)} className={`chip${slot === h ? ' on' : ''}`} style={{ minHeight: 56, justifyContent: 'center', flexDirection: 'column', opacity: date ? 1 : 0.5, cursor: date ? 'pointer' : 'not-allowed' }}>
                                <span>{date ? lt(date, h) : h}</span>
                                <span style={{ fontSize: 11, opacity: 0.7 }}>{h} IST</span>
                              </button>
                            ))}
                          </div>
                          <span className="small">{t('A live calendar (Cal.com) will be connected in the next phase — for now your chosen slot is sent as a request and confirmed on WhatsApp.', 'लाइव कैलेंडर (Cal.com) अगले चरण में जुड़ेगा — अभी चुना हुआ स्लॉट अनुरोध के रूप में जाता है, पुष्टि WhatsApp पर।')}</span>
                        </div>
                      </>
                    ) : (
                      <p className="body">{t('No slot is needed for an online report — the report is prepared once we receive your floor plan, followed by a follow-up call.', 'ऑनलाइन रिपोर्ट के लिए स्लॉट की ज़रूरत नहीं — फ्लोर प्लान मिलने के बाद रिपोर्ट बनती है, फिर फॉलो-अप कॉल।')}</p>
                    )}
                  </div>
                )}

                {/* STEP 3 — details (kept mounted so files/values survive step changes) */}
                <form ref={formRef} className="form" onSubmit={(e) => e.preventDefault()} style={{ display: step === 2 ? 'flex' : 'none' }} noValidate>
                  {service && <DetailFields kind={service.kind} />}
                  <label className="consent"><input type="checkbox" name="consent" value="true" />{t('I consent to sharing my details for this consultation', 'मैं अपनी जानकारी परामर्श के लिए देने की अनुमति देता/देती हूँ')} (<Link to="/privacy-policy">{t('Privacy Policy', 'गोपनीयता नीति')}</Link>).</label>
                </form>

                {/* STEP 4 — review */}
                {step === 3 && service && (
                  <div className="stack fade-in" style={{ '--gap': '18px' }}>
                    <h2 className="h3" style={{ fontSize: 32 }}>{t('Review and pay', 'समीक्षा और भुगतान')}</h2>
                    {[[t('Service', 'सेवा'), t(service.label)], [t('Format', 'माध्यम'), t(MODE_LABEL[mode])], ...(needsSlot ? [[t('Slot', 'स्लॉट'), `${lt(date, slot)} (${slot} IST)`]] : []), [t('Name', 'नाम'), fv(formRef, 'name')], [t('Phone', 'फ़ोन'), fv(formRef, 'phone')], [t('Fee', 'फ़ीस'), priceText]].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', gap: 20, padding: '14px 0', borderBottom: '1px solid var(--line)' }}><span className="muted" style={{ flex: '0 0 120px' }}>{k}</span><span>{v}</span></div>
                    ))}
                    <p className="small">{currency === 'USD' ? t('International: PayPal (USD)', 'विदेश: PayPal (USD)') : t('India: Razorpay (UPI, card, netbanking)', 'भारत: Razorpay (UPI, कार्ड, नेटबैंकिंग)')} · {t('Automatic confirmation by email and WhatsApp, with the Zoom/Meet link.', 'Zoom/Meet लिंक के साथ ईमेल और WhatsApp पर अपने-आप पुष्टि।')}</p>
                  </div>
                )}

                {error && <div className="form-msg err" role="alert">{error}</div>}
                {step > 0 && (
                  <div className="row" style={{ '--gap': '12px' }}>
                    <button type="button" className="btn-ghost" onClick={() => { setError(''); setStep((x) => x - 1); }}>← {t('Back', 'पीछे')}</button>
                    {step < 3
                      ? <button type="button" className="btn" onClick={next}>{t('Continue', 'आगे बढ़ें')}</button>
                      : <button type="button" className="btn" onClick={submit} disabled={sending}>{sending ? t('Sending…', 'भेज रहे हैं…') : t(`Pay with ${currency === 'USD' ? 'PayPal' : 'Razorpay'}`, `${currency === 'USD' ? 'PayPal' : 'Razorpay'} से भुगतान करें`)}</button>}
                  </div>
                )}
              </div>

              {service && (
                <aside className="card featured" style={{ flex: '1 1 300px', padding: 32, position: 'sticky', top: 120 }}>
                  <span className="eyebrow" style={{ letterSpacing: '.25em', fontSize: 12 }}>{t(GROUP_LABEL[service.group] || service.group)}</span>
                  <h3 className="h3">{t(service.label)}</h3>
                  <div className="card-price" style={{ fontSize: 34 }}>{priceText}</div>
                  <div className="card-list" style={{ fontSize: 14 }}>
                    <span className="tick">{t(service.duration)}</span>
                    <span className="tick">{t(service.gets)}</span>
                    <span className="tick">{t('For:', 'किसके लिए:')} {t(service.forWhom)}</span>
                  </div>
                  <Link to={service.page} className="link-arrow" style={{ fontSize: 14 }}>{t('Full service details', 'सेवा की पूरी जानकारी')} →</Link>
                  <button type="button" className="link-arrow" style={{ background: 'none', border: 0, padding: 0, textAlign: 'left', color: 'var(--gold)', cursor: 'pointer', fontSize: 14 }} onClick={() => setStep(0)}>{t('Change service', 'सेवा बदलें')}</button>
                </aside>
              )}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function Input({ name, label, type = 'text', ...rest }) {
  return <label className="field">{label}<input name={name} type={type} className="input" {...rest} /></label>;
}

function DetailFields({ kind }) {
  const t = useT();
  return (
    <>
      <div className="grid" style={{ '--min': '220px', '--gap': '18px' }}>
        <Input name="name" label={t('Full name', 'पूरा नाम')} required />
        <Input name="phone" label={t('Phone / WhatsApp', 'फ़ोन / WhatsApp')} type="tel" required />
        <Input name="email" label={t('Email', 'ईमेल')} type="email" />
        <Input name="country" label={t('Country', 'देश')} />
        {kind === 'vedic' && (<><Input name="dob" label={t('Date of birth', 'जन्म तिथि')} type="date" /><Input name="tob" label={t('Time of birth', 'जन्म समय')} type="time" /><Input name="pob" label={t('Place of birth', 'जन्म स्थान')} /></>)}
        {kind === 'milan' && (<><Input name="dob" label={t('Groom’s date of birth', 'लड़के की जन्म तिथि')} type="date" /><Input name="tob" label={t('Groom’s time of birth', 'लड़के का जन्म समय')} type="time" /><Input name="pob" label={t('Groom’s place of birth', 'लड़के का जन्म स्थान')} /></>)}
        {kind === 'kp' && (<><Input name="kpNumber" label={t('Your number (1–249)', 'आपका नंबर (1–249)')} type="number" min="1" max="249" /><Input name="city" label={t('Which city are you in right now?', 'अभी आप किस शहर में हैं')} /></>)}
        {kind === 'nadi' && (
          <label className="field">{t('Gender', 'लिंग')}<select name="gender" className="input"><option value="purush">{t('Male', 'पुरुष')}</option><option value="mahila">{t('Female', 'महिला')}</option></select></label>
        )}
        {kind === 'vastu' && (<>
          <label className="field">{t('Property type', 'प्रॉपर्टी का प्रकार')}<select name="propertyType" className="input">{[['Home', 'घर'], ['Flat / Apartment', 'फ्लैट / अपार्टमेंट'], ['Plot', 'प्लॉट'], ['Office', 'ऑफिस'], ['Shop', 'दुकान'], ['Factory', 'फैक्ट्री']].map(([en, hi]) => <option key={en} value={en}>{t(en, hi)}</option>)}</select></label>
          <Input name="areaSqft" label={t('Area (sq.ft)', 'क्षेत्रफल (वर्ग फ़ुट)')} type="number" min="1" />
        </>)}
      </div>
      {kind === 'milan' && <label className="field">{t('Bride’s date, time and place of birth', 'लड़की की जन्म तिथि, समय, स्थान')}<textarea name="membersText" className="input" rows="2" /></label>}
      {kind === 'nadi' && (
        <label className="field">{t('Thumb impression photo', 'अंगूठे के निशान की फोटो')}
          <span className="drop"><ThumbIcon />{t('Men: right thumb · Women: left thumb', 'पुरुष: दायाँ अंगूठा · महिला: बायाँ')}<input type="file" name="thumbImpression" accept="image/*" /></span>
        </label>
      )}
      {kind === 'vastu' && (<>
        <label className="field">{t('Floor plan (PDF / photo — please mark North)', 'फ्लोर प्लान (PDF / फोटो, उत्तर दिशा मार्क करें)')}
          <span className="drop"><UploadIcon /><input type="file" name="floorPlan" accept="image/*,application/pdf" /></span>
        </label>
        <label className="field">{t('Date, time and place of birth of family members (up to 5)', 'घर वालों की जन्म तिथि, समय, स्थान (5 तक)')}<textarea name="membersText" className="input" rows="3" /></label>
        <label className="field">{t('Main concern', 'मुख्य समस्या')}<textarea name="mainProblem" className="input" rows="3" /></label>
      </>)}
      {kind !== 'vastu' && <label className="field">{kind === 'kp' ? t('Your one question', 'आपका एक प्रश्न') : t('Your question', 'आपका प्रश्न')}<textarea name="question" className="input" rows="3" /></label>}
    </>
  );
}
