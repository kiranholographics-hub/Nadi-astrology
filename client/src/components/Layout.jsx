import { useEffect, useMemo, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import useCountries from './useCountries.js';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useApp, useT } from '../context/AppContext.jsx';
import { SITE, show, waLink } from '../data/site.js';
import { BurgerIcon, CartIcon, ChatIcon, LogoMark } from './Icons.jsx';
import { applySeo, BASE_SCHEMA, setJsonLd, trackPage } from './seo.js';

export const NAV = [
  { to: '/nadi-astrology', label: { en: 'Nadi Astrology', hi: 'नाड़ी ज्योतिष' } },
  { to: '/vedic-astrology', label: { en: 'Vedic', hi: 'वैदिक' } },
  { to: '/kp-prashna', label: { en: 'KP Prashna', hi: 'केपी प्रश्न' } },
  { to: '/vastu-consultant-jaipur', label: { en: 'Vastu', hi: 'वास्तु' } },
  { to: '/yantra-shop', label: { en: 'Yantra Shop', hi: 'यंत्र शॉप' } },
  { to: '/videos', label: { en: 'Videos', hi: 'वीडियो' } },
  { to: '/about', label: { en: 'About', hi: 'परिचय' } },
];

export const DISCLAIMER = {
  default: {
    en: 'Astrology and Vastu are offered as guidance. They are not a substitute for medical, legal or financial advice. Outcomes depend on the individual and their circumstances.',
    hi: 'ज्योतिष और वास्तु मार्गदर्शन के लिए हैं; यह चिकित्सीय, कानूनी या वित्तीय सलाह का विकल्प नहीं हैं। परिणाम व्यक्ति और परिस्थिति पर निर्भर करते हैं।',
  },
  jyotish: {
    en: 'Astrology is offered as guidance; outcomes depend on the individual and their circumstances.',
    hi: 'ज्योतिष मार्गदर्शन के लिए है; परिणाम व्यक्ति और परिस्थिति पर निर्भर करते हैं।',
  },
  vastu: {
    en: 'Vastu is offered as guidance; outcomes depend on circumstances.',
    hi: 'वास्तु मार्गदर्शन के लिए है; परिणाम परिस्थिति पर निर्भर करते हैं।',
  },
  yantra: {
    en: 'Yantras are traditional instruments of faith; outcomes depend on the individual and their circumstances.',
    hi: 'यंत्र पारंपरिक आस्था के साधन हैं; परिणाम व्यक्ति और परिस्थिति पर निर्भर करते हैं।',
  },
};

function Starfield({ count = 80, seed = 7 }) {
  const stars = useMemo(() => {
    let s = seed;
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    return Array.from({ length: count }, () => {
      const size = rnd() < 0.85 ? 1.5 : 2.5;
      return { left: `${rnd() * 100}%`, top: `${rnd() * 100}%`, width: size, height: size, animationDelay: `${rnd() * 4}s`, animationDuration: `${3 + rnd() * 4}s` };
    });
  }, [count, seed]);
  return (
    <div className="stars" aria-hidden="true">
      {stars.map((st, i) => <div key={i} className="star" style={st} />)}
    </div>
  );
}

function TopBar() {
  const { currency, setCurrency } = useApp();
  const t = useT();
  return (
    <div className="topbar">
      <div className="wrap-wide">
        <span>{t('Jaipur office · Online consultations worldwide', 'जयपुर ऑफिस · दुनिया भर में ऑनलाइन परामर्श')}</span>
        <div className="row center" style={{ '--gap': '16px' }}>
          <LanguageSwitcher />
          <div className="toggle" role="group" aria-label={t('Currency', 'मुद्रा')}>
            <button type="button" className={currency === 'INR' ? 'on' : ''} aria-pressed={currency === 'INR'} onClick={() => setCurrency('INR')}>₹ INR</button>
            <button type="button" className={currency === 'USD' ? 'on' : ''} aria-pressed={currency === 'USD'} onClick={() => setCurrency('USD')}>$ USD</button>
          </div>
          <a href={waLink()} style={{ textDecoration: 'none' }}>WhatsApp {show(SITE.whatsappNumber && `+${SITE.whatsappNumber}`, '[NUMBER]')}</a>
        </div>
      </div>
    </div>
  );
}

function Navbar({ cta }) {
  const [open, setOpen] = useState(false);
  const { cartCount } = useApp();
  const t = useT();
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  const isShop = pathname.startsWith('/yantra-shop') || pathname === '/cart';
  return (
    <header className={`nav${open ? ' open' : ''}`}>
      <div className="wrap-wide">
        <Link to="/" className="brand" aria-label={t('Pt. Rajneesh Sharma — Home', 'पं. रजनीश शर्मा — होम')}>
          <LogoMark />
          <span>
            <span className="brand-name notranslate" translate="no" style={{ display: 'block' }}>{t(SITE.name, 'पं. रजनीश शर्मा')}</span>
            <span className="brand-sub" style={{ display: 'block' }}>{t(SITE.tagline, 'वैदिक · केपी · नाड़ी · वास्तु · जयपुर')}</span>
          </span>
        </Link>
        <nav className="nav-links" aria-label={t('Main', 'मुख्य')}>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>{t(n.label)}</NavLink>
          ))}
        </nav>
        <div className="row center" style={{ '--gap': '12px', flexWrap: 'nowrap' }}>
          {isShop ? (
            <Link to="/cart" className="btn nav-cta"><CartIcon />{t('Cart', 'कार्ट')} ({cartCount})</Link>
          ) : (
            <Link to={cta?.to || '/book'} className="btn nav-cta">{cta?.label ? t(cta.label) : t('Book Consultation', 'परामर्श बुक करें')}</Link>
          )}
          <button type="button" className="round-btn burger" aria-label={open ? t('Close menu', 'मेन्यू बंद करें') : t('Open menu', 'मेन्यू खोलें')} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <BurgerIcon open={open} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer({ disclaimer = DISCLAIMER.default }) {
  const t = useT();
  const countries = useCountries();
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-col">
          <span className="serif" style={{ fontSize: 28 }}>{t(SITE.name, 'पं. रजनीश शर्मा')}</span>
          <span className="muted">{t('Vedic, KP, Nadi & Vastu · Jaipur', 'वैदिक, केपी, नाड़ी और वास्तु · जयपुर')}</span>
          <span className="muted">WhatsApp: {show(SITE.whatsappNumber && `+${SITE.whatsappNumber}`, '[NUMBER]')} · {show(SITE.email, '[EMAIL]')}</span>
        </div>
        <div className="footer-col">
          <span className="eyebrow">{t('Services', 'सेवाएँ')}</span>
          <Link to="/nadi-astrology">{t('Nadi Astrology', 'नाड़ी ज्योतिष')}</Link>
          <Link to="/vedic-astrology">{t('Vedic Astrology', 'वैदिक ज्योतिष')}</Link>
          <Link to="/kp-prashna">{t('KP Astrology', 'केपी ज्योतिष')}</Link>
          <Link to="/kundli-milan">{t('Kundli Matching', 'कुंडली मिलान')}</Link>
          <Link to="/vastu-consultant-jaipur">{t('Vastu', 'वास्तु')}</Link>
          <Link to="/online-vastu-consultation">{t('Online Vastu', 'ऑनलाइन वास्तु')}</Link>
          <Link to="/yantra-shop">{t('Yantra Shop', 'यंत्र शॉप')}</Link>
        </div>
        {countries.length > 0 && (
          <div className="footer-col">
            <span className="eyebrow">{t('Worldwide', 'दुनिया भर में')}</span>
            {countries.map((c) => <Link key={c.slug} to={`/nadi-astrology/${c.slug}`}>{t(`Nadi in ${c.name === 'United Arab Emirates' ? 'UAE' : c.name}`, `${c.nameHi || c.name} में नाड़ी`)}</Link>)}
          </div>
        )}
        <div className="footer-col">
          <span className="eyebrow">{t('Help', 'सहायता')}</span>
          <Link to="/faq">{t('FAQ', 'सामान्य प्रश्न')}</Link>
          <Link to="/contact">{t('Contact Us', 'संपर्क करें')}</Link>
          <Link to="/shipping-policy">{t('Shipping Policy', 'शिपिंग नीति')}</Link>
          <Link to="/refund-policy">{t('Refund & Cancellation', 'रिफंड और कैंसलेशन')}</Link>
          <Link to="/privacy-policy">{t('Privacy Policy', 'गोपनीयता नीति')}</Link>
          <Link to="/terms">{t('Terms', 'नियम और शर्तें')}</Link>
        </div>
        <div className="footer-col">
          <span className="eyebrow">{t('Explore', 'और देखें')}</span>
          <Link to="/book">{t('Book Consultation', 'परामर्श बुक करें')}</Link>
          <Link to="/gallery">{t('Photo Gallery', 'फोटो गैलरी')}</Link>
          <Link to="/blog">{t('Blog', 'ब्लॉग')}</Link>
          <a href={SITE.youtube}>YouTube</a>
          <a href={SITE.instagram}>Instagram</a>
          <a href={SITE.facebook}>Facebook</a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        {t(disclaimer)}
        <br />{t('Grievance contact (DPDP)', 'शिकायत संपर्क (DPDP)')}: {show(SITE.grievanceName, t('[Name]', '[नाम]'))} · {show(SITE.grievanceEmail || SITE.email, '[EMAIL]')}
        <br />© {t(SITE.name, 'पं. रजनीश शर्मा')} · {t('Jaipur', 'जयपुर')}
      </div>
    </footer>
  );
}

function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [dep]);
}

// Wraps every page: stars, top bar, nav, footer, floating WhatsApp + mobile Book bar.
// title / description / cta.label / mobileCta.label / disclaimer accept a string or { en, hi }.
export function PageShell({ title, description, image, schema, cta, mobileCta, disclaimer, seed, children, revealKey }) {
  const { toast, lang } = useApp();
  const t = useT();
  const { pathname, hash } = useLocation();
  const titleText = title ? t(title) : '';
  const descText = description ? t(description) : '';
  useEffect(() => {
    applySeo({ title: titleText, description: descText, path: pathname, image, lang });
    trackPage(pathname);
  }, [titleText, descText, pathname, image, lang]);
  useEffect(() => {
    setJsonLd('base', BASE_SCHEMA());
    setJsonLd('page', schema || null);
    return () => setJsonLd('page', null);
  }, [schema]);
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  useReveal(`${pathname}|${revealKey ?? ''}|${lang}`);
  const mc = mobileCta || (cta && { ...cta, label: { en: 'Book Now', hi: 'अभी बुक करें' } }) || { to: '/book', label: { en: 'Book Now', hi: 'अभी बुक करें' } };

  return (
    <div className="page">
      <Starfield seed={seed} />
      <TopBar />
      <Navbar cta={cta} />
      <main>{children}</main>
      <Footer disclaimer={disclaimer} />
      <a href={waLink(t('Namaste Pandit ji, I would like to know about a consultation.', 'नमस्ते पंडित जी, मुझे परामर्श के बारे में जानना है।'))} className="btn wa-float" aria-label={t('Chat on WhatsApp', 'WhatsApp पर बात करें')}><ChatIcon />WhatsApp</a>
      <div className="mbar"><Link to={mc.to} className="btn btn-block">{t(mc.label)}</Link></div>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
