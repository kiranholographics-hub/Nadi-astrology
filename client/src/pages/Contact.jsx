import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '../components/Layout.jsx';
import { Breadcrumb } from '../components/ui.jsx';
import { createLead } from '../api/index.js';
import { SITE, show, waLink } from '../data/site.js';
import { useT } from '../context/AppContext.jsx';

export default function Contact() {
  const t = useT();
  const [state, setState] = useState({ status: 'idle', msg: '' });

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form));
    if (!f.consent) return setState({ status: 'err', msg: t('Please tick the consent checkbox.', 'कृपया सहमति वाला बॉक्स टिक करें।') });
    setState({ status: 'loading', msg: '' });
    try {
      await createLead({ ...f, consent: true });
      setState({ status: 'ok', msg: t('Thank you — your message has been received. We will get back to you on WhatsApp or email shortly.', 'धन्यवाद — आपका संदेश मिल गया है। हम जल्द ही WhatsApp या ईमेल पर संपर्क करेंगे।') });
      form.reset();
    } catch (err) {
      setState({ status: 'err', msg: err.message });
    }
  }

  return (
    <PageShell title={{ en: 'Contact', hi: 'संपर्क' }} description={{ en: 'Contact Pt. Rajneesh Sharma: Jaipur office, WhatsApp, email. Online consultations worldwide.', hi: 'पं. रजनीश शर्मा से संपर्क: जयपुर ऑफिस, WhatsApp, ईमेल। दुनिया भर में ऑनलाइन परामर्श।' }} seed={127}>
      <section className="hero">
        <div className="wrap stack" style={{ '--gap': '36px' }}>
          <Breadcrumb items={[{ label: { en: 'Contact', hi: 'संपर्क' } }]} />
          <h1 className="h1 rise">{t('Contact', 'संपर्क')} <em>{t('Us', 'करें')}</em></h1>
          <div className="row" style={{ '--gap': '48px', alignItems: 'flex-start' }}>
            <div className="stack" style={{ flex: '1 1 360px', '--gap': '22px' }}>
              {[
                [t('Jaipur office', 'जयपुर ऑफिस'), SITE.address],
                [t('Timings', 'समय'), show(SITE.timings, t('[Timings]', '[समय]'))],
                ['WhatsApp', show(SITE.whatsappNumber && `+${SITE.whatsappNumber}`, '[NUMBER]')],
                [t('Email', 'ईमेल'), show(SITE.email, '[EMAIL]')],
              ].map(([k, v]) => (
                <div key={k} className="stack" style={{ '--gap': '6px', paddingBottom: 18, borderBottom: '1px solid var(--line)' }}>
                  <span className="eyebrow" style={{ letterSpacing: '.25em' }}>{k}</span>
                  <span style={{ fontSize: 17, lineHeight: 1.6 }}>{v}</span>
                </div>
              ))}
              <div className="row" style={{ '--gap': '12px' }}>
                <a href={waLink(t('Hello Pandit ji', 'नमस्ते पंडित जी'))} className="btn">{t('Message on WhatsApp', 'WhatsApp करें')}</a>
                {SITE.mapsLink && <a href={SITE.mapsLink} className="btn-ghost">{t('Directions', 'रास्ता देखें')}</a>}
                <Link to="/book" className="btn-ghost">{t('Book Consultation', 'परामर्श बुक करें')}</Link>
              </div>
              {SITE.mapEmbedUrl
                ? <iframe title={t('Office map', 'ऑफिस का नक्शा')} src={SITE.mapEmbedUrl} loading="lazy" style={{ width: '100%', aspectRatio: '16/10', border: 0, borderRadius: 4 }} />
                : <div className="ph dashed" style={{ aspectRatio: '16 / 10' }}>{t('Google Map embed + office photo', 'Google मैप + ऑफिस की फोटो')}</div>}
            </div>
            <form className="form" onSubmit={onSubmit} style={{ flex: '1.2 1 420px' }}>
              <h2 className="h3" style={{ fontSize: 34 }}>{t('Send a message', 'संदेश भेजें')}</h2>
              <div className="grid" style={{ '--min': '200px', '--gap': '16px' }}>
                <label className="field">{t('Full name', 'पूरा नाम')}<input name="name" className="input" required /></label>
                <label className="field">{t('Phone / WhatsApp', 'फ़ोन / WhatsApp')}<input name="phone" type="tel" className="input" required /></label>
                <label className="field">{t('Email', 'ईमेल')}<input name="email" type="email" className="input" /></label>
                <label className="field">{t('Country', 'देश')}<input name="country" className="input" /></label>
              </div>
              <label className="field">{t('Subject', 'विषय')}
                <select name="type" className="input">
                  <option value="contact">{t('About a consultation', 'परामर्श के बारे में')}</option>
                  <option value="yantra-salaah">{t('Which yantra is right for me? (free 10-min advice)', 'कौन-सा यंत्र सही है? (10 मिनट मुफ़्त सलाह)')}</option>
                  <option value="office-visit">{t('Office visit', 'ऑफिस विज़िट')}</option>
                </select>
              </label>
              <label className="field">{t('Message', 'संदेश')}<textarea name="message" className="input" rows="5" /></label>
              <label className="consent"><input type="checkbox" name="consent" value="true" />{t('I consent to sharing my details so that I can be contacted', 'मैं संपर्क के लिए अपनी जानकारी देने की अनुमति देता/देती हूँ')} (<Link to="/privacy-policy">{t('Privacy Policy', 'गोपनीयता नीति')}</Link>).</label>
              {state.msg && <div className={`form-msg ${state.status === 'ok' ? 'ok' : 'err'}`} role="status">{state.msg}</div>}
              <button type="submit" className="btn" style={{ alignSelf: 'flex-start' }} disabled={state.status === 'loading'}>{state.status === 'loading' ? t('Sending…', 'भेज रहे हैं…') : t('Send', 'भेजें')}</button>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
