import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DISCLAIMER, PageShell } from '../components/Layout.jsx';
import { Breadcrumb } from '../components/ui.jsx';
import { useApp, usePrice, useT } from '../context/AppContext.jsx';
import { SIZE_HI } from '../data/yantraI18n.js';

const L = (en, hi) => ({ en, hi });
import { createOrder } from '../api/index.js';

export default function Cart() {
  const { cart, updateQty, removeFromCart, clearCart, currency } = useApp();
  const price = usePrice();
  const t = useT();
  const [state, setState] = useState({ status: 'idle', msg: '' });
  const usd = currency === 'USD';

  const unit = (x) => {
    const base = usd ? x.priceUSD : x.priceINR;
    const extra = x.sankalp ? (usd ? x.sankalpPriceUSD : x.sankalpPriceINR) : 0;
    return base == null || (x.sankalp && extra == null) ? null : base + (extra || 0);
  };
  const allPriced = cart.every((x) => unit(x) != null);
  const total = cart.reduce((n, x) => n + (unit(x) || 0) * x.qty, 0);

  async function onSubmit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    if (!f.consent) return setState({ status: 'err', msg: t('Please tick the consent checkbox.', 'कृपया सहमति वाला बॉक्स टिक करें।') });
    setState({ status: 'loading', msg: '' });
    try {
      const r = await createOrder({
        currency,
        consent: true,
        items: cart.map((x) => ({ slug: x.slug, size: x.size, qty: x.qty, sankalp: x.sankalp, sankalpName: f.sankalpName, gotra: f.gotra })),
        customer: { name: f.name, phone: f.phone, email: f.email, address: f.address, city: f.city, pincode: f.pincode, country: f.country || 'India' },
      });
      clearCart();
      setState({ status: 'ok', msg: (() => { const ref = String(r.id).slice(-6).toUpperCase(); const gw = r.next === 'paypal' ? 'PayPal' : 'Razorpay'; return t(`Order received (ref: ${ref}). Next step: ${gw} payment.`, `ऑर्डर मिल गया (रेफ़: ${ref})। अगला चरण: ${gw} भुगतान।`); })() });
    } catch (err) {
      setState({ status: 'err', msg: err.message });
    }
  }

  return (
    <PageShell title={L('Cart', 'कार्ट')} disclaimer={DISCLAIMER.yantra} seed={67} mobileCta={{ to: '/yantra-shop', label: L('Browse more yantras', 'और यंत्र देखें') }}>
      <section className="hero">
        <div className="wrap stack" style={{ '--gap': '32px' }}>
          <Breadcrumb items={[{ label: L('Yantra Shop', 'यंत्र शॉप'), to: '/yantra-shop' }, { label: L('Cart', 'कार्ट') }]} />
          <h1 className="h1">{t('Your', 'आपका')} <em>{t('cart', 'कार्ट')}</em></h1>
          {state.status === 'ok' && <div className="form-msg ok" role="status">{state.msg}</div>}
          {cart.length === 0 ? (
            <div className="stack" style={{ '--gap': '20px' }}>
              <p className="lead">{t('Your cart is empty.', 'कार्ट अभी खाली है।')}</p>
              <Link to="/yantra-shop" className="btn" style={{ alignSelf: 'flex-start' }}>{t('Browse the Yantra Shop', 'यंत्र शॉप देखें')}</Link>
            </div>
          ) : (
            <div className="row" style={{ '--gap': '48px', alignItems: 'flex-start' }}>
              <div className="stack" style={{ flex: '1.4 1 480px', '--gap': '0px' }}>
                {cart.map((x) => (
                  <div key={x.key} className="row center" style={{ '--gap': '16px', padding: '20px 0', borderBottom: '1px solid var(--line)', alignItems: 'center' }}>
                    <div className="stack" style={{ flex: '1 1 220px', '--gap': '4px' }}>
                      <Link to={`/yantra-shop/${x.slug}`} className="serif" style={{ fontSize: 24, color: 'var(--text)', textDecoration: 'none' }}>{t(x.name, x.nameHi)}</Link>
                      <span className="muted" style={{ fontSize: 13 }}>{t(x.size, SIZE_HI(x.size))}{x.sankalp ? ` · ${t('Personal sankalp', 'व्यक्तिगत संकल्प')}` : ''}</span>
                    </div>
                    <div className="row center" style={{ '--gap': '8px', alignItems: 'center' }}>
                      <button type="button" className="round-btn" aria-label={t('Decrease quantity', 'कम करें')} onClick={() => updateQty(x.key, x.qty - 1)}>−</button>
                      <span style={{ minWidth: 24, textAlign: 'center' }}>{x.qty}</span>
                      <button type="button" className="round-btn" aria-label={t('Increase quantity', 'बढ़ाएँ')} onClick={() => updateQty(x.key, x.qty + 1)}>+</button>
                    </div>
                    <span style={{ minWidth: 110, textAlign: 'right' }}>{unit(x) == null ? price(null, null) : price(usd ? null : unit(x) * x.qty, usd ? unit(x) * x.qty : null)}</span>
                    <button type="button" className="btn-ghost btn-sm" onClick={() => removeFromCart(x.key)}>{t('Remove', 'हटाएँ')}</button>
                  </div>
                ))}
                <div className="row between" style={{ padding: '24px 0', fontSize: 18 }}>
                  <span>{t('Subtotal', 'उप-योग')}</span>
                  <span className="serif gold" style={{ fontSize: 32 }}>{allPriced ? price(usd ? null : total, usd ? total : null) : price(null, null)}</span>
                </div>
                {!allPriced && <p className="small">{t('Prices for some yantras are not set yet — checkout will work once prices are added in the admin.', 'कुछ यंत्रों की कीमत अभी तय नहीं है — एडमिन में कीमत डालने के बाद चेकआउट चलेगा।')}</p>}
              </div>
              <form className="form" onSubmit={onSubmit} style={{ flex: '1 1 380px' }}>
                <h2 className="h3" style={{ fontSize: 32 }}>{t('Delivery details', 'डिलीवरी विवरण')}</h2>
                <label className="field">{t('Full name', 'पूरा नाम')}<input name="name" className="input" required /></label>
                <label className="field">{t('Phone / WhatsApp', 'फ़ोन / WhatsApp')}<input name="phone" type="tel" className="input" required /></label>
                <label className="field">{t('Email', 'ईमेल')}<input name="email" type="email" className="input" /></label>
                <label className="field">{t('Address', 'पता')}<textarea name="address" className="input" rows="3" required /></label>
                <div className="grid" style={{ '--min': '140px', '--gap': '14px' }}>
                  <label className="field">{t('City', 'शहर')}<input name="city" className="input" /></label>
                  <label className="field">{t('PIN / ZIP code', 'पिनकोड')}<input name="pincode" className="input" /></label>
                  <label className="field">{t('Country', 'देश')}<input name="country" className="input" defaultValue={usd ? '' : 'India'} /></label>
                </div>
                {cart.some((x) => x.sankalp) && (
                  <div className="grid" style={{ '--min': '160px', '--gap': '14px' }}>
                    <label className="field">{t('Name for the sankalp', 'संकल्प के लिए नाम')}<input name="sankalpName" className="input" /></label>
                    <label className="field">{t('Gotra', 'गोत्र')}<input name="gotra" className="input" /></label>
                  </div>
                )}
                <label className="consent"><input type="checkbox" name="consent" value="true" />{t('I consent to sharing my details for this order', 'मैं ऑर्डर के लिए अपनी जानकारी देने की अनुमति देता/देती हूँ')} (<Link to="/privacy-policy">{t('Privacy Policy', 'गोपनीयता नीति')}</Link>).</label>
                {state.status === 'err' && <div className="form-msg err" role="alert">{state.msg}</div>}
                <button type="submit" className="btn" disabled={state.status === 'loading'}>{state.status === 'loading' ? t('Sending…', 'भेज रहे हैं…') : t(`Pay with ${usd ? 'PayPal' : 'Razorpay'}`, `${usd ? 'PayPal' : 'Razorpay'} से भुगतान करें`)}</button>
                <span className="small">{t('India: Razorpay (UPI, card, netbanking) · International: PayPal', 'भारत: Razorpay (UPI, कार्ड, नेटबैंकिंग) · विदेश: PayPal')}</span>
              </form>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
