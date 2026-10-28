import { Link } from 'react-router-dom';
import { useApp, usePrice, useT } from '../context/AppContext.jsx';
import { PlayIcon } from './Icons.jsx';
import { catLabel, NAME_HI, yName } from '../data/yantraI18n.js';

const PETALS = [0, 45, 90, 135, 180, 225, 270, 315];

// Line-art yantra used until real product photos are uploaded.
export function YantraArt({ variant = 'A', style }) {
  return (
    <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', ...style }} fill="none" stroke="#D9B26F" strokeWidth="1.1" aria-hidden="true">
      <path d="M20 20 H80 V8 H120 V20 H180 V80 H192 V120 H180 V180 H120 V192 H80 V180 H20 V120 H8 V80 H20 Z" strokeOpacity=".6" />
      <circle cx="100" cy="100" r="72" strokeOpacity=".5" />
      <g className="spin">
        {PETALS.map((r) => <ellipse key={r} cx="100" cy="40" rx="8" ry="16" transform={`rotate(${r} 100 100)`} />)}
      </g>
      <circle cx="100" cy="100" r="56" />
      {variant === 'A' && (
        <>
          <polygon points="100,52 142,124 58,124" />
          <polygon points="100,148 58,76 142,76" />
          <polygon points="100,70 126,114 74,114" />
          <polygon points="100,130 74,86 126,86" />
          <circle cx="100" cy="100" r="3" fill="#F0D49B" stroke="none" />
        </>
      )}
      {variant === 'B' && (
        <>
          <rect x="66" y="66" width="68" height="68" transform="rotate(45 100 100)" />
          <polygon points="100,60 135,120 65,120" />
          <polygon points="100,140 65,80 135,80" />
          <circle cx="100" cy="100" r="16" />
        </>
      )}
      {variant === 'C' && (
        <>
          <rect x="62" y="62" width="76" height="76" />
          <path d="M87.3 62 V138 M112.7 62 V138 M62 87.3 H138 M62 112.7 H138" />
        </>
      )}
    </svg>
  );
}

export function YantraCard({ y }) {
  const { addToCart } = useApp();
  const t = useT();
  const price = usePrice();
  const img = y.images?.[0]?.url;
  const name = t(yName(y));
  return (
    <article className="ycard">
      <Link to={`/yantra-shop/${y.slug}`} className="ycard-art" aria-label={name}>
        {img ? <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" /> : <YantraArt variant={y.art} />}
        <span className="ycard-badge"><PlayIcon size={10} />{t('Photo + 30-sec video', 'फोटो + 30 सेकंड वीडियो')}</span>
      </Link>
      <div className="ycard-body">
        <div className="eyebrow" style={{ letterSpacing: '.25em' }}>{t(catLabel(y.category))}</div>
        <Link to={`/yantra-shop/${y.slug}`} className="ycard-name">{name}</Link>
        <div className="muted" style={{ fontSize: 13 }}>{y.sizes?.[1] || t('[Size]', '[साइज़]')} · {y.material || t('[Metal]', '[धातु]')}</div>
        <div style={{ fontSize: 15, flex: 1 }}>{price(y.priceINR, y.priceUSD)}</div>
        <button type="button" className="btn btn-sm" style={{ marginTop: 8 }} onClick={() => addToCart({ slug: y.slug, name: y.name, nameHi: NAME_HI[y.slug], size: y.sizes?.[1] || '', sankalp: false, priceINR: y.priceINR, priceUSD: y.priceUSD })}>
          {t('Add to cart', 'कार्ट में जोड़ें')}
        </button>
      </div>
    </article>
  );
}
