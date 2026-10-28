import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faqSchema, setJsonLd } from './seo.js';
import { PlayIcon, PlusIcon } from './Icons.jsx';
import { useT } from '../context/AppContext.jsx';

export function Breadcrumb({ items }) {
  const t = useT();
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/">{t('Home', 'होम')}</Link>
      {items.map((it, i) => (
        <span key={i}>
          {' › '}
          {it.to ? <Link to={it.to}>{t(it.label)}</Link> : <span>{t(it.label)}</span>}
        </span>
      ))}
    </nav>
  );
}

export function SectionHead({ eyebrow, title, right }) {
  return (
    <div className="row between reveal" style={{ '--gap': '20px' }}>
      <div className="stack" style={{ '--gap': '14px' }}>
        {eyebrow && <div className="eyebrow">— {eyebrow}</div>}
        <h2 className="h2" style={{ maxWidth: 820 }}>{title}</h2>
      </div>
      {right}
    </div>
  );
}

// items: [[question, answer], ...] — each may be a string, JSX or { en, hi }
export function Faq({ title, items, id }) {
  const t = useT();
  const resolved = items.map(([q, a]) => [t(q), typeof a === 'object' && a && !a.$$typeof ? t(a) : a]);
  const key = resolved.map(([q]) => q).join('|');
  useEffect(() => {
    setJsonLd('faq', faqSchema(resolved));
    return () => setJsonLd('faq', null);
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <section id={id} className="section-tight">
      <div className="wrap stack" style={{ maxWidth: 860, '--gap': '24px' }}>
        <h2 className="h2 reveal" style={{ textAlign: 'center', fontSize: 'clamp(34px,4vw,52px)' }}>{t(title)}</h2>
        <div className="faq reveal">
          {resolved.map(([q, a]) => (
            <details key={q}>
              <summary>{q}<PlusIcon /></summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlayBox({ label, ratio = '16 / 9', src, poster, style }) {
  const t = useT();
  return (
    <div className="ph card-like" style={{ aspectRatio: ratio, ...style }}>
      {src ? (
        <video src={src} poster={poster} controls playsInline preload="metadata" />
      ) : (
        <>
          <div className="play"><PlayIcon /></div>
          <span>{t(label)}</span>
        </>
      )}
    </div>
  );
}

export function Stats({ items }) {
  const t = useT();
  return (
    <div className="hairline reveal">
      {items.map(([n, l], i) => (
        <div key={i}>
          <div className="big-num">{n}</div>
          <div className="muted" style={{ fontSize: 15 }}>{t(l)}</div>
        </div>
      ))}
    </div>
  );
}

export function Steps({ items, min = 240 }) {
  const t = useT();
  return (
    <div className="hairline reveal" style={{ '--min': `${min}px` }}>
      {items.map(([title, d], i) => (
        <div key={i}>
          <div className="big-num" style={{ fontSize: 60 }}>{String(i + 1).padStart(2, '0')}</div>
          <h3 style={{ margin: 0, fontSize: 19, fontWeight: 600 }}>{t(title)}</h3>
          <p className="body">{t(d)}</p>
        </div>
      ))}
    </div>
  );
}

export function Marquee({ words }) {
  const t = useT();
  const seq = [...words, ...words];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {seq.map((w, i) => (
          <span key={i} style={{ display: 'flex', gap: 56 }}>
            <span>{t(w)}</span>
            <span className="gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function PriceCard({ title, kicker, price, sub, points, cta, to = '#form', featured, badge }) {
  const t = useT();
  const label = cta ? t(cta) : t('Book', 'बुक करें');
  return (
    <div className={`card${featured ? ' featured' : ''}`} style={{ padding: 36 }}>
      {badge && <span className="badge">{t(badge)}</span>}
      {kicker && <span className="eyebrow" style={{ letterSpacing: '.25em', fontSize: 12 }}>{t(kicker)}</span>}
      <h3 className="h3" style={{ fontSize: 30 }}>{t(title)}</h3>
      <div className="card-price">{price}</div>
      {sub && <div className="small">{t(sub)}</div>}
      <div className="card-list">
        {points.map((p, i) => <span key={i} className="tick">{t(p)}</span>)}
      </div>
      {to.startsWith('/')
        ? <Link to={to} className={featured ? 'btn btn-sm' : 'btn-ghost btn-sm'}>{label}</Link>
        : <a href={to} className={featured ? 'btn btn-sm' : 'btn-ghost btn-sm'}>{label}</a>}
    </div>
  );
}

export function ClientQuote({ label = { en: 'Client video testimonial', hi: 'क्लाइंट वीडियो प्रशंसापत्र' }, city }) {
  const t = useT();
  return (
    <div className="stack" style={{ flex: '1 1 340px', '--gap': '20px' }}>
      <div className="eyebrow">— {t('Client experiences', 'क्लाइंट्स के अनुभव')}</div>
      <PlayBox label={label} ratio="4 / 5" />
      <blockquote className="serif" style={{ margin: 0, fontStyle: 'italic', fontSize: 24, lineHeight: 1.35 }}>“{t('[Client’s words, with permission]', '[क्लाइंट के शब्द, अनुमति के साथ]')}”</blockquote>
      <div className="muted" style={{ fontSize: 14 }}>{city ? t(city) : t('[Name], [Country]', '[नाम], [देश]')}</div>
    </div>
  );
}
