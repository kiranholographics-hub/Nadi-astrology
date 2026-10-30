import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PageShell } from '../components/Layout.jsx';
import { Breadcrumb } from '../components/ui.jsx';
import { getPost, getPosts } from '../api/index.js';
import { BLOG_CATEGORY, CATEGORY_PAGE, postDate } from '../data/blogCategories.js';
import { useApp, useT } from '../context/AppContext.jsx';
import NotFound from './NotFound.jsx';

const ALL = 'all';

export function PostCard({ p }) {
  const t = useT();
  const { lang } = useApp();
  return (
    <Link to={`/blog/${p.slug}`} className="card reveal" style={{ padding: 0, overflow: 'hidden', gap: 0 }}>
      {p.cover
        ? <img src={p.cover} alt="" loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderBottom: '1px solid var(--line)' }} />
        : <div className="ph" style={{ aspectRatio: '16 / 9', border: 0, borderBottom: '1px solid var(--line)', borderRadius: 0 }}><span className="serif gold" style={{ fontSize: 30 }}>{t(BLOG_CATEGORY[p.category] || { en: p.category })}</span></div>}
      <div className="stack" style={{ padding: 26, '--gap': '10px' }}>
        <span className="eyebrow" style={{ letterSpacing: '.25em' }}>{t(BLOG_CATEGORY[p.category] || { en: p.category })} · {postDate(p.publishAt, lang)}</span>
        <span className="serif" style={{ fontSize: 26, lineHeight: 1.2 }}>{t(p.title, p.titleHi || null)}</span>
        {(p.excerpt || p.excerptHi) && <span className="muted" style={{ fontSize: 14, lineHeight: 1.6 }}>{t(p.excerpt, p.excerptHi || null)}</span>}
      </div>
    </Link>
  );
}

export function BlogList() {
  const t = useT();
  const [posts, setPosts] = useState(null);
  const [cat, setCat] = useState(ALL);
  useEffect(() => { getPosts().then(setPosts); }, []);
  const cats = useMemo(() => [ALL, ...new Set((posts || []).map((p) => p.category))], [posts]);
  const list = (posts || []).filter((p) => cat === ALL || p.category === cat);
  const catText = (c) => (c === ALL ? t('All', 'सभी') : t(BLOG_CATEGORY[c] || { en: c }));

  return (
    <PageShell title={{ en: 'Blog — Nadi, Vedic, KP & Vastu', hi: 'ब्लॉग — नाड़ी, वैदिक, केपी और वास्तु' }} description={{ en: 'Articles and updates by Pt. Rajneesh Sharma on Nadi, Vedic, KP astrology and Vastu.', hi: 'नाड़ी, वैदिक, केपी और वास्तु पर पं. रजनीश शर्मा के लेख और अपडेट।' }} seed={137} revealKey={`${cat}-${posts?.length}`}>
      <section className="hero">
        <div className="wrap stack" style={{ '--gap': '32px' }}>
          <Breadcrumb items={[{ label: { en: 'Blog', hi: 'ब्लॉग' } }]} />
          <h1 className="h1 rise">{t('Articles on astrology', 'ज्योतिष और वास्तु')} <em>{t('and Vastu', 'पर लेख')}</em></h1>
          {cats.length > 2 && (
            <div className="row" style={{ '--gap': '10px' }} role="group" aria-label={t('Category', 'श्रेणी')}>
              {cats.map((c) => <button key={c} type="button" className={`chip${cat === c ? ' on' : ''}`} style={{ minHeight: 44 }} aria-pressed={cat === c} onClick={() => setCat(c)}>{catText(c)}</button>)}
            </div>
          )}
          {posts === null ? <p className="muted">{t('Loading…', 'लोड हो रहा है…')}</p> : list.length === 0 ? (
            <p className="lead">{t('New articles are on the way. Meanwhile, see our services or ask a question on WhatsApp.', 'नए लेख जल्द आ रहे हैं। तब तक हमारी सेवाएँ देखें या WhatsApp पर प्रश्न पूछें।')}</p>
          ) : (
            <div className="grid" style={{ '--min': '300px' }}>{list.map((p) => <PostCard key={p.slug} p={p} />)}</div>
          )}
        </div>
      </section>
    </PageShell>
  );
}

export function BlogPost() {
  const t = useT();
  const { lang } = useApp();
  const { slug } = useParams();
  const [data, setData] = useState(undefined);
  useEffect(() => {
    setData(undefined);
    getPost(slug).then(setData).catch(() => setData(null));
  }, [slug]);

  if (data === null) return <NotFound />;
  const p = data?.item;
  const html = p ? t(p.content, p.contentHi || null) : '';
  const schema = p ? {
    '@context': 'https://schema.org', '@type': 'Article', headline: p.title, description: p.excerpt || undefined,
    image: p.cover ? new URL(p.cover, window.location.origin).href : undefined,
    author: { '@type': 'Person', name: 'Pt. Rajneesh Sharma' }, publisher: { '@type': 'Person', name: 'Pt. Rajneesh Sharma' },
    datePublished: p.publishAt, dateModified: p.updatedAt, mainEntityOfPage: window.location.href,
  } : null;
  const cat = p ? t(BLOG_CATEGORY[p.category] || { en: p.category }) : '';

  return (
    <PageShell
      title={p ? { en: p.seoTitle || p.title, hi: p.titleHi || null } : { en: 'Blog', hi: 'ब्लॉग' }}
      description={p ? { en: p.metaDescription || p.excerpt, hi: p.excerptHi || null } : undefined}
      image={p?.cover || undefined}
      schema={schema}
      seed={139}
      revealKey={p?.slug}
    >
      <section className="hero">
        <article className="wrap stack" style={{ maxWidth: 780, '--gap': '28px' }}>
          <Breadcrumb items={[{ label: { en: 'Blog', hi: 'ब्लॉग' }, to: '/blog' }, { label: p ? { en: p.title, hi: p.titleHi || null } : '…' }]} />
          {!p ? <p className="muted">{t('Loading…', 'लोड हो रहा है…')}</p> : (
            <>
              <span className="eyebrow">— {cat}</span>
              <h1 className="h1 rise" style={{ fontSize: 'clamp(36px,4.4vw,58px)' }}>{t(p.title, p.titleHi || null)}</h1>
              <div className="small">{t('Pt. Rajneesh Sharma', 'पं. रजनीश शर्मा')} · {postDate(p.publishAt, lang)}</div>
              {p.cover && <img src={p.cover} alt={p.title} style={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', borderRadius: 4, border: '1px solid var(--line)' }} />}
              {/* HTML is cleaned on the server before it is saved */}
              <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
              {p.youtubeId && (
                <div style={{ position: 'relative', aspectRatio: '16 / 9', border: '1px solid var(--line-2)', borderRadius: 4, overflow: 'hidden' }}>
                  <iframe title={p.title} src={`https://www.youtube-nocookie.com/embed/${p.youtubeId}`} loading="lazy" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
                </div>
              )}
              <div className="card featured" style={{ padding: 32 }}>
                <span className="serif" style={{ fontSize: 26 }}>{t('Want to know what this means for you?', 'अपने बारे में जानना चाहते हैं?')}</span>
                <div className="row" style={{ '--gap': '12px' }}>
                  <Link to={CATEGORY_PAGE[p.category] || '/book'} className="btn btn-sm">{t('View service', 'सेवा देखें')}</Link>
                  <Link to="/book" className="btn-ghost btn-sm">{t('Book Consultation', 'परामर्श बुक करें')}</Link>
                </div>
              </div>
              {data.related?.length > 0 && (
                <div className="stack" style={{ '--gap': '18px', paddingTop: 20 }}>
                  <h2 className="h3" style={{ fontSize: 30 }}>{t('More on', 'और पढ़ें:')} {cat}</h2>
                  <div className="grid" style={{ '--min': '220px' }}>{data.related.map((r) => <PostCard key={r.slug} p={r} />)}</div>
                </div>
              )}
            </>
          )}
        </article>
      </section>
    </PageShell>
  );
}
