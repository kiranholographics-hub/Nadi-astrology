import { useState } from 'react';
import { PageShell } from '../components/Layout.jsx';
import { Breadcrumb } from '../components/ui.jsx';
import { PlayIcon } from '../components/Icons.jsx';
import { SITE } from '../data/site.js';
import { YT_VIDEOS, ytEmbed, ytThumb } from '../data/videos.js';
import { useT } from '../context/AppContext.jsx';

// Videos come from data/videos.js (YouTube). An mp4 in client/public/media can be added with `src`. Text fields are { en, hi }.
const L = (en, hi) => ({ en, hi });
const KIND = {
  'Pandit ji': L('Pandit ji', 'पंडित जी'),
  Client: L('Client testimonial', 'क्लाइंट का अनुभव'),
  Yantra: L('Yantra', 'यंत्र'),
  Vastu: L('Vastu', 'वास्तु'),
};
const YT = L('YouTube', 'YouTube');
const VIDEOS = YT_VIDEOS.map((v, id) => ({ id, src: '', sub: YT, len: '', kind: KIND[v.cat], ...v }));

// Only categories that have at least one video get a tab.
const TABS = [['all', L('All', 'सभी')], ['Client', L('Client testimonials', 'क्लाइंट के अनुभव')], ['Pandit ji', L('Pandit ji’s videos', 'पंडित जी के वीडियो')], ['Yantra', L('Yantra videos', 'यंत्र वीडियो')], ['Vastu', L('Vastu', 'वास्तु')]]
  .filter(([k]) => k === 'all' || VIDEOS.some((v) => v.cat === k));

export default function Videos() {
  const t = useT();
  const [tab, setTab] = useState('all');
  const [feat, setFeat] = useState(0);
  const f = VIDEOS[feat];
  const list = VIDEOS.filter((v) => tab === 'all' || v.cat === tab);

  return (
    <PageShell title={{ en: 'Astrology & Vastu Videos', hi: 'ज्योतिष और वास्तु वीडियो' }} description={{ en: 'Client testimonials and videos by Pt. Rajneesh Sharma on Nadi, Vedic, KP, Vastu and yantra installation.', hi: 'क्लाइंट के अनुभव और पं. रजनीश शर्मा के नाड़ी, वैदिक, केपी, वास्तु और यंत्र स्थापना पर वीडियो।' }} seed={71} revealKey={tab}>
      <section className="hero" style={{ paddingBottom: 72 }}>
        <div className="wrap-wide stack" style={{ '--gap': '32px' }}>
          <Breadcrumb items={[{ label: { en: 'Videos', hi: 'वीडियो' } }]} />
          <div className="row between rise" style={{ '--gap': '24px' }}>
            <h1 className="h1">{t('Astrology & Vastu', 'ज्योतिष और वास्तु')} <em>{t('Videos', 'वीडियो')}</em></h1>
            <p className="lead" style={{ maxWidth: 460 }}>{t('Clients’ experiences in their own words, and Pandit ji’s videos on Nadi, Vedic, KP, Vastu and yantra installation.', 'क्लाइंट के अनुभव उनके अपने शब्दों में, और पंडित जी के वीडियो — नाड़ी, वैदिक, केपी, वास्तु और यंत्र स्थापना।')}</p>
          </div>
          <div style={{ position: 'relative', aspectRatio: '16 / 9', border: '1px solid var(--line-2)', borderRadius: 4, background: 'var(--bg-2)', overflow: 'hidden' }}>
            {f.youtubeId ? (
              <iframe title={t(f.title)} src={ytEmbed(f.youtubeId)} loading="lazy" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
            ) : f.src ? (
              <video src={f.src} controls playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <>
                <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.2 }} fill="none" stroke="#D9B26F" aria-hidden="true"><g className="spin"><circle cx="800" cy="450" r="420" /><circle cx="800" cy="450" r="360" strokeDasharray="3 12" /><polygon points="800,90 1112,630 488,630" /><polygon points="800,810 488,270 1112,270" /></g></svg>
                <div key={feat} className="fade-in" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: 24, textAlign: 'center' }}>
                  <div style={{ position: 'relative', width: 96, height: 96 }}>
                    <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid var(--gold)', animation: 'ring 2.4s ease-out infinite' }} />
                    <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><PlayIcon size={30} color="#06070D" /></span>
                  </div>
                  <span className="eyebrow" style={{ letterSpacing: '.3em' }}>{t(f.kind)}</span>
                  <span className="serif" style={{ fontSize: 'clamp(26px,3vw,40px)' }}>{t(f.title)}</span>
                  <span className="muted" style={{ fontSize: 14 }}>{t(f.sub)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ paddingBottom: 100 }}>
        <div className="wrap-wide stack" style={{ '--gap': '28px' }}>
          {TABS.length > 2 && (
            <div className="row" style={{ '--gap': '10px' }} role="group" aria-label={t('Video category', 'वीडियो श्रेणी')}>
              {TABS.map(([k, l]) => <button key={k} type="button" aria-pressed={tab === k} className={`chip${tab === k ? ' on' : ''}`} style={{ minHeight: 44 }} onClick={() => setTab(k)}>{t(l)}</button>)}
            </div>
          )}
          <div className="grid-fill" style={{ '--min': '280px' }}>
            {list.map((v) => (
              <button key={v.id} type="button" className="ycard reveal" onClick={() => { setFeat(v.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ padding: 0, textAlign: 'left', cursor: 'pointer', borderColor: v.id === feat ? 'var(--gold)' : undefined }}>
                <span style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '16 / 9', background: 'var(--bg-3)', borderBottom: '1px solid var(--line)', overflow: 'hidden' }}>
                  {v.youtubeId && <img src={ytThumb(v.youtubeId)} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
                  <span className="play" style={{ position: 'relative', width: 52, height: 52 }}><PlayIcon size={16} /></span>
                  {v.len && <span style={{ position: 'absolute', right: 12, bottom: 10, padding: '3px 8px', borderRadius: 4, background: 'rgba(6,7,13,.85)', fontSize: 11, color: 'var(--text-2)' }}>{v.len}</span>}
                </span>
                <span className="stack" style={{ '--gap': '6px', padding: '16px 18px 20px' }}>
                  <span className="eyebrow" style={{ letterSpacing: '.25em' }}>{t(v.kind)}</span>
                  <span className="serif" style={{ fontSize: 22, color: 'var(--text)', lineHeight: 1.2 }}>{t(v.title)}</span>
                  <span className="muted" style={{ fontSize: 13 }}>{t(v.sub)}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ paddingBottom: 80 }}>
        <div className="wrap">
          <div className="row between center reveal" style={{ border: '1px solid var(--line-2)', borderRadius: 4, padding: 'clamp(36px,5vw,72px)', background: 'var(--bg-2)', '--gap': '28px', alignItems: 'center' }}>
            <h2 className="h2" style={{ fontSize: 'clamp(30px,3.6vw,48px)', maxWidth: 620 }}>{t('Watch new videos first —', 'नए वीडियो सबसे पहले देखें —')} <em>{t('on YouTube', 'YouTube पर')}</em></h2>
            <a href={SITE.youtube} className="btn">{t('Subscribe on YouTube', 'YouTube चैनल सब्सक्राइब करें')}</a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
