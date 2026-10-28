import { useLayoutEffect, useRef, useState } from 'react';
import Lightbox from './Lightbox.jsx';
import { GALLERY, GALLERY_CATEGORIES, imgUrl } from '../data/gallery.js';
import { useT } from '../context/AppContext.jsx';

// Motion per row, in order: right→left, left→right, swing from the middle (left ↔ right), …
const MOTIONS = ['rtl', 'ltr', 'swing'];
const SECONDS_PER_PHOTO = 3.2;

function Row({ label, items, motion, onOpen }) {
  const t = useT();
  const rowRef = useRef(null);
  const trackRef = useRef(null);
  const [dist, setDist] = useState(0);
  const loop = motion !== 'swing';
  const list = loop ? [...items, ...items] : items; // doubled = seamless loop

  // swing: how far the track can travel = track width − visible width
  useLayoutEffect(() => {
    if (loop) return undefined;
    const measure = () => setDist(Math.max(0, (trackRef.current?.scrollWidth || 0) - (rowRef.current?.clientWidth || 0)));
    measure();
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [loop, items.length]);

  const dur = loop ? items.length * SECONDS_PER_PHOTO : Math.max(20, items.length * SECONDS_PER_PHOTO * 0.6);
  const style = {
    '--dur': `${dur}s`,
    '--dist': `${dist}px`,
    // swing starts from the middle: jump half-way into the cycle
    animationDelay: motion === 'swing' ? `-${dur / 2}s` : undefined,
  };

  return (
    <div className="prow">
      <div className="prow-head">
        <span className="serif" style={{ fontSize: 26 }}>{t(label)}</span>
        <span className="small">{items.length} {t('photos', 'फोटो')}</span>
        <button type="button" className="link-arrow" onClick={() => onOpen(0)} style={{ fontSize: 14, marginLeft: 'auto', background: 'none', border: 0, padding: 0, color: 'var(--gold)', cursor: 'pointer' }}>{t('View all', 'सभी देखें')} →</button>
      </div>
      <div className="prow-view" ref={rowRef}>
        <div ref={trackRef} className={`prow-track m-${motion}`} style={style}>
          {list.map((g, i) => (
            <button key={`${g.src}-${i}`} type="button" className="prow-tile" onClick={() => onOpen(i % items.length)} aria-label={`${t('View photo', 'फोटो देखें')}: ${t(g.alt, g.altHi)}`} tabIndex={i >= items.length ? -1 : 0}>
              <img src={imgUrl(g)} alt={i >= items.length ? '' : t(g.alt, g.altHi)} loading="lazy" decoding="async" style={{ objectFit: g.fit || 'cover' }} />
              <span className="gtile-cap">{t(g.alt, g.altHi)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// All gallery categories as auto-scrolling rows (Home + /gallery).
export default function PhotoRows({ categories }) {
  const [open, setOpen] = useState(null); // { items, index }
  const cats = GALLERY_CATEGORIES.filter((c) => c.id !== 'all' && (!categories || categories.includes(c.id)));
  return (
    <div className="stack" style={{ '--gap': '34px' }}>
      {cats.map((c, k) => {
        const items = GALLERY.filter((g) => g.cat === c.id);
        if (!items.length) return null;
        return <Row key={c.id} label={c.label} items={items} motion={MOTIONS[k % MOTIONS.length]} onOpen={(index) => setOpen({ items, index })} />;
      })}
      {open && <Lightbox items={open.items} index={open.index} onClose={() => setOpen(null)} onIndex={(index) => setOpen((o) => ({ ...o, index }))} />}
    </div>
  );
}
