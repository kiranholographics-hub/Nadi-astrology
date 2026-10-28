import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageShell } from '../components/Layout.jsx';
import { Breadcrumb } from '../components/ui.jsx';
import { POSTS, BLOG_CATEGORY } from '../data/blog.js';
import { useT } from '../context/AppContext.jsx';
import NotFound from './NotFound.jsx';

const ALL = 'all';
const CATS = [ALL, ...new Set(POSTS.map((p) => p.category))];

export function BlogList() {
  const t = useT();
  const [cat, setCat] = useState(ALL);
  const list = POSTS.filter((p) => cat === ALL || p.category === cat);
  const catText = (c) => (c === ALL ? t('All', 'सभी') : t(BLOG_CATEGORY[c] || c));
  return (
    <PageShell title={{ en: 'Blog — Nadi, Vedic, KP & Vastu', hi: 'ब्लॉग — नाड़ी, वैदिक, केपी और वास्तु' }} description={{ en: 'Articles by Pt. Rajneesh Sharma on Nadi, Vedic, KP astrology and Vastu.', hi: 'नाड़ी, वैदिक, केपी और वास्तु पर पं. रजनीश शर्मा के लेख।' }} seed={137} revealKey={cat}>
      <section className="hero">
        <div className="wrap stack" style={{ '--gap': '32px' }}>
          <Breadcrumb items={[{ label: { en: 'Blog', hi: 'ब्लॉग' } }]} />
          <h1 className="h1 rise">{t('Articles on astrology', 'ज्योतिष और वास्तु')} <em>{t('and Vastu', 'पर लेख')}</em></h1>
          <div className="row" style={{ '--gap': '10px' }} role="group" aria-label={t('Category', 'श्रेणी')}>
            {CATS.map((c) => <button key={c} type="button" className={`chip${cat === c ? ' on' : ''}`} style={{ minHeight: 44 }} aria-pressed={cat === c} onClick={() => setCat(c)}>{catText(c)}</button>)}
          </div>
          <div className="grid" style={{ '--min': '300px' }}>
            {list.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="card reveal" style={{ padding: 0, overflow: 'hidden', gap: 0 }}>
                <div className="ph" style={{ aspectRatio: '16 / 9', border: 0, borderBottom: '1px solid var(--line)', borderRadius: 0 }}>{t('Cover image (WebP)', 'कवर इमेज (WebP)')}</div>
                <div className="stack" style={{ padding: 26, '--gap': '10px' }}>
                  <span className="eyebrow" style={{ letterSpacing: '.25em' }}>{catText(p.category)}</span>
                  <span className="serif" style={{ fontSize: 26, lineHeight: 1.2 }}>{t(p.title)}</span>
                  <span className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>{t(p.excerpt)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export function BlogPost() {
  const t = useT();
  const { slug } = useParams();
  const p = POSTS.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const schema = { '@context': 'https://schema.org', '@type': 'Article', headline: t(p.title), author: { '@type': 'Person', name: 'Pt. Rajneesh Sharma' }, datePublished: p.date || undefined };
  return (
    <PageShell title={p.title} description={p.excerpt} schema={schema} seed={139}>
      <section className="hero">
        <article className="wrap stack" style={{ maxWidth: 780, '--gap': '28px' }}>
          <Breadcrumb items={[{ label: { en: 'Blog', hi: 'ब्लॉग' }, to: '/blog' }, { label: p.title }]} />
          <span className="eyebrow">— {t(BLOG_CATEGORY[p.category] || p.category)}</span>
          <h1 className="h1 rise" style={{ fontSize: 'clamp(36px,4.4vw,58px)' }}>{t(p.title)}</h1>
          <div className="small">{t('Pt. Rajneesh Sharma', 'पं. रजनीश शर्मा')} · {p.date || t('[Date]', '[तारीख]')}</div>
          <div className="ph" style={{ aspectRatio: '16 / 9' }}>{t('Cover image', 'कवर इमेज')}</div>
          {p.body.map((para, i) => <p key={i} className="lead" style={{ maxWidth: 'none', fontSize: 18, lineHeight: 1.9 }}>{t(para)}</p>)}
          <div className="card featured" style={{ padding: 32 }}>
            <span className="serif" style={{ fontSize: 26 }}>{t('Want to know what this means for you?', 'अपने बारे में जानना चाहते हैं?')}</span>
            <div className="row" style={{ '--gap': '12px' }}><Link to={p.related} className="btn btn-sm">{t('View service', 'सेवा देखें')}</Link><Link to="/book" className="btn-ghost btn-sm">{t('Book Consultation', 'परामर्श बुक करें')}</Link></div>
          </div>
        </article>
      </section>
    </PageShell>
  );
}
