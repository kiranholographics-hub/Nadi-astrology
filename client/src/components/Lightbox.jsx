import { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from './Icons.jsx';
import { imgUrl } from '../data/gallery.js';
import { useT } from '../context/AppContext.jsx';

// Full-screen photo viewer: ← → keys, Esc to close, click outside to close.
export default function Lightbox({ items, index, onClose, onIndex }) {
  const t = useT();
  const item = items[index];
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % items.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [index, items.length, onClose, onIndex]);
  if (!item) return null;
  const alt = t(item.alt, item.altHi);

  return (
    <div role="dialog" aria-modal="true" aria-label={alt} onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 80, background: 'rgba(6,7,13,.94)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 16px', gap: 16 }}>
      <img key={item.src} className="fade-in" src={imgUrl(item)} alt={alt} onClick={(e) => e.stopPropagation()} style={{ maxWidth: 'min(1200px, 100%)', maxHeight: 'calc(100vh - 140px)', objectFit: 'contain', borderRadius: 4, border: '1px solid var(--line-2)' }} />
      <div onClick={(e) => e.stopPropagation()} className="row center" style={{ '--gap': '16px', alignItems: 'center', justifyContent: 'center', maxWidth: 900, textAlign: 'center' }}>
        <button type="button" className="round-btn" aria-label={t('Previous photo', 'पिछली फोटो')} onClick={() => onIndex((index - 1 + items.length) % items.length)}><ChevronLeft /></button>
        <span style={{ fontSize: 14, color: 'var(--text-2)', flex: '1 1 240px' }}>{alt} <span className="small">· {index + 1} / {items.length}</span></span>
        <button type="button" className="round-btn" aria-label={t('Next photo', 'अगली फोटो')} onClick={() => onIndex((index + 1) % items.length)}><ChevronRight /></button>
      </div>
      <button type="button" className="round-btn" aria-label={t('Close', 'बंद करें')} onClick={onClose} style={{ position: 'absolute', top: 18, right: 18 }}>✕</button>
    </div>
  );
}

export function GalleryTile({ item, onOpen }) {
  const t = useT();
  const alt = t(item.alt, item.altHi);
  return (
    <button type="button" onClick={onOpen} className="gtile" aria-label={`${t('View photo', 'फोटो देखें')}: ${alt}`}>
      <img src={imgUrl(item)} alt={alt} loading="lazy" decoding="async" style={{ objectFit: item.fit || 'cover' }} />
      <span className="gtile-cap">{alt}</span>
    </button>
  );
}
