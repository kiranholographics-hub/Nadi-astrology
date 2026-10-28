import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createBooking } from '../api/index.js';
import { useApp, useT } from '../context/AppContext.jsx';
import { ThumbIcon, UploadIcon } from './Icons.jsx';

/**
 * Config-driven booking form -> POST /api/bookings (multipart).
 * All labels accept a string or { en, hi }.
 * fields: [{ name, label, type, options?, full?, required?, accept?, hint?, icon? }]
 */
export default function BookingForm({ title, services, fields, submitLabel, extra }) {
  const { currency } = useApp();
  const t = useT();
  const [state, setState] = useState({ status: 'idle', msg: '' });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set('currency', currency);
    try { fd.set('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone); } catch { /* ignore */ }
    if (!fd.get('consent')) {
      setState({ status: 'err', msg: t('Please tick the consent checkbox.', 'कृपया सहमति वाला चेकबॉक्स चुनें।') });
      return;
    }
    setState({ status: 'loading', msg: '' });
    try {
      const r = await createBooking(fd);
      const ref = String(r.id).slice(-6).toUpperCase();
      const gw = r.next === 'paypal' ? 'PayPal' : 'Razorpay';
      setState({ status: 'ok', msg: t(`Thank you! We have received your details (ref: ${ref}). Next step: ${gw} payment — we will send you the link on WhatsApp.`, `धन्यवाद! आपकी जानकारी मिल गई (रेफ़: ${ref})। अगला चरण: ${gw} भुगतान — हम WhatsApp पर लिंक भेजेंगे।`) });
      form.reset();
    } catch (err) {
      setState({ status: 'err', msg: err.message || t('Something went wrong. Please try again.', 'कुछ गलत हो गया, कृपया दोबारा कोशिश करें।') });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} style={{ flex: '1.3 1 480px' }} noValidate>
      <h2 className="h2" style={{ fontSize: 'clamp(32px,3.6vw,48px)' }}>{t(title)}</h2>
      <div className="grid" style={{ '--min': '220px', '--gap': '18px' }}>
        {services.length > 1 ? (
          <label className="field">{t('Service', 'सेवा')}
            <select name="service" className="input" defaultValue={services[0].value}>
              {services.map((s) => <option key={s.value} value={s.value}>{t(s.label)}</option>)}
            </select>
          </label>
        ) : (
          <input type="hidden" name="service" value={services[0].value} />
        )}
        {fields.filter((f) => !f.full).map((f) => <Field key={f.name} f={f} t={t} />)}
      </div>
      {fields.filter((f) => f.full).map((f) => <Field key={f.name} f={f} t={t} />)}
      {extra}
      <label className="consent">
        <input type="checkbox" name="consent" value="true" />
        <span>{t('I consent to sharing my details for this consultation', 'मैं अपनी जानकारी परामर्श के लिए देने की अनुमति देता/देती हूँ')} (<Link to="/privacy-policy">{t('Privacy Policy', 'गोपनीयता नीति')}</Link>).</span>
      </label>
      {state.msg && <div className={`form-msg ${state.status === 'ok' ? 'ok' : 'err'}`} role="status">{state.msg}</div>}
      <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }} disabled={state.status === 'loading'}>
        {state.status === 'loading' ? t('Sending…', 'भेज रहे हैं…') : submitLabel ? t(submitLabel) : t('Continue to payment', 'आगे बढ़ें: भुगतान')}
      </button>
    </form>
  );
}

function Field({ f, t }) {
  const label = t(f.label);
  if (f.type === 'select') {
    return (
      <label className="field">{label}
        <select name={f.name} className="input" required={f.required}>
          {f.options.map((o) => {
            const value = typeof o === 'string' ? o : o.value;
            const text = typeof o === 'string' ? o : t(o.label);
            return <option key={value} value={value}>{text}</option>;
          })}
        </select>
      </label>
    );
  }
  if (f.type === 'textarea') {
    return <label className="field">{label}<textarea name={f.name} className="input" rows={f.rows || 4} required={f.required} /></label>;
  }
  if (f.type === 'file') {
    return (
      <label className="field">{label}
        <span className="drop">
          {f.icon === 'thumb' ? <ThumbIcon /> : <UploadIcon />}
          {f.hint && t(f.hint)}
          <input type="file" name={f.name} accept={f.accept || 'image/*,application/pdf'} style={{ fontSize: 13, color: 'var(--muted)' }} />
        </span>
      </label>
    );
  }
  return (
    <label className="field">{label}
      <input name={f.name} type={f.type || 'text'} className="input" required={f.required} min={f.min} max={f.max} defaultValue={f.defaultValue} onChange={f.onChange} value={f.value} />
    </label>
  );
}
