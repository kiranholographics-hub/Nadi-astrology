import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from './api.js';
import { fmtDateTime } from './format.js';
import { Badge, Empty, ErrorBox, Field, Loading, PageHead, Stat, useFlash } from './ui.jsx';

const STATUS = [['draft', 'Draft'], ['scheduled', 'Scheduled'], ['published', 'Published']];
const slugify = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 90).replace(/-$/, '');

// <input type="datetime-local"> values are read and written in India time.
const toIstInput = (d) => (d ? new Date(new Date(d).getTime() + 330 * 60000).toISOString().slice(0, 16) : '');
const fromIstInput = (v) => (v ? new Date(`${v}:00+05:30`).toISOString() : null);
const istDayKey = (d) => new Date(new Date(d).getTime() + 330 * 60000).toISOString().slice(0, 10);

const isLive = (p) => p.status !== 'draft' && p.publishAt && new Date(p.publishAt) <= new Date();
function statusOf(p) {
  if (p.status === 'draft') return ['Draft', ''];
  if (!isLive(p)) return ['Scheduled', 'gold'];
  return ['Live', 'done'];
}
function placesOf(p, countries) {
  if (p.allCountries) return 'All countries';
  if (!p.countries?.length) return 'Blog only';
  const names = p.countries.map((s) => countries.find((c) => c.slug === s)?.name || s);
  return names.length > 3 ? `${names.slice(0, 3).join(', ')} +${names.length - 3}` : names.join(', ');
}

export default function Posts() {
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();
  useEffect(() => { api.get('/posts').then(setD).catch((e) => setErr(e.message)); }, []);

  const days = useMemo(() => {
    const out = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(Date.now() + i * 864e5);
      out.push({ key: istDayKey(date), label: date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' }) });
    }
    return out;
  }, []);

  if (err) return <ErrorBox error={err} />;
  if (!d) return <Loading />;
  const live = d.items.filter(isLive).length;
  const scheduled = d.items.filter((p) => p.status !== 'draft' && !isLive(p)).length;
  const drafts = d.items.filter((p) => p.status === 'draft').length;
  const list = d.items.filter((p) => !filter || (filter === 'live' ? isLive(p) : filter === 'scheduled' ? p.status !== 'draft' && !isLive(p) : p.status === 'draft'));
  const byDay = d.items.filter((p) => p.status !== 'draft' && p.publishAt).reduce((m, p) => ({ ...m, [istDayKey(p.publishAt)]: [...(m[istDayKey(p.publishAt)] || []), p] }), {});

  return (
    <>
      <PageHead
        title="Blog posts"
        sub="Har post /blog par dikhti hai. Saath mein chuno: sabhi country pages par, sirf chune hue desh par, ya sirf blog par."
        action={<Link to="/admin/blog/new" className="adm-btn primary">+ New post</Link>}
      />
      <div className="adm-stats">
        <Stat n={d.items.length} label="All posts" onClick={() => setFilter('')} active={!filter} />
        <Stat n={live} label="Live" onClick={() => setFilter('live')} active={filter === 'live'} />
        <Stat n={scheduled} label="Scheduled" tone="gold" onClick={() => setFilter('scheduled')} active={filter === 'scheduled'} />
        <Stat n={drafts} label="Drafts" onClick={() => setFilter('draft')} active={filter === 'draft'} />
      </div>

      <section className="adm-card">
        <h2>Post schedule: next 14 days</h2>
        <div className="adm-cal">
          {days.map((day) => (
            <div key={day.key} className={`adm-cal-day${byDay[day.key] ? ' has' : ''}`}>
              <b>{day.label}</b>
              {(byDay[day.key] || []).map((p) => <Link key={p._id} to={`/admin/blog/${p._id}`}>{p.title}</Link>)}
            </div>
          ))}
        </div>
        <p className="adm-hint">Google ke liye hafte mein 2–3 achhi posts kaafi hain. Ek hi din bahut saari posts daalne se behtar hai roz/alternate din schedule karna.</p>
      </section>

      <div className="adm-card flush">
        {list.length === 0 ? <Empty>No posts here yet.</Empty> : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Title</th><th>Category</th><th>Shown on</th><th>Status</th><th>Publish (IST)</th><th /></tr></thead>
              <tbody>
                {list.map((p) => {
                  const [label, tone] = statusOf(p);
                  return (
                    <tr key={p._id} className="click" onClick={() => navigate(`/admin/blog/${p._id}`)}>
                      <td><b>{p.title}</b><small>/blog/{p.slug}</small></td>
                      <td>{p.category}</td>
                      <td>{placesOf(p, d.countries)}</td>
                      <td><Badge tone={tone}>{label}</Badge></td>
                      <td className="nowrap">{p.publishAt ? fmtDateTime(p.publishAt) : '—'}</td>
                      <td><Link className="adm-btn ghost xs" to={`/admin/blog/${p._id}`} onClick={(e) => e.stopPropagation()}>Edit</Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

const EMPTY = {
  title: '', titleHi: '', slug: '', category: 'Nadi', excerpt: '', excerptHi: '', content: '', contentHi: '', cover: '', youtubeId: '',
  allCountries: true, countries: [], status: 'draft', publishAt: '', seoTitle: '', metaDescription: '',
};
const toForm = (p) => ({ ...EMPTY, ...Object.fromEntries(Object.keys(EMPTY).map((k) => [k, p[k] ?? EMPTY[k]])), publishAt: toIstInput(p.publishAt), countries: p.countries || [] });

function countWords(html) {
  const text = String(html || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ');
  return text.split(/\s+/).filter(Boolean).length;
}
const internalLinks = (html) => (String(html || '').match(/href="\/(?!\/)[^"]*"/g) || []).length;

export function PostEdit() {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const [orig, setOrig] = useState(isNew ? EMPTY : null);
  const [f, setF] = useState(isNew ? EMPTY : null);
  const [meta, setMeta] = useState({ categories: [], countries: [] });
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [mode, setMode] = useState('edit'); // edit | preview
  const [showHi, setShowHi] = useState(false);
  const [busy, setBusy] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [err, setErr] = useState('');
  const [toast, flash] = useFlash();
  const contentRef = useRef(null);

  useEffect(() => {
    api.get('/posts').then((d) => setMeta({ categories: d.categories, countries: d.countries })).catch(() => {});
    if (!isNew) {
      api.get(`/posts/${id}`).then(({ item }) => {
        setOrig(toForm(item));
        setF(toForm(item));
        setShowHi(!!(item.titleHi || item.contentHi));
      }).catch((e) => setErr(e.message));
    }
  }, [id, isNew]);

  const dirty = useMemo(() => f && orig && JSON.stringify(f) !== JSON.stringify(orig), [f, orig]);
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  if (err) return <><Link to="/admin/blog" className="adm-backlink">← Blog posts</Link><ErrorBox error={err} /></>;
  if (!f) return <Loading />;

  const set = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setF((x) => ({ ...x, [k]: v, ...(k === 'title' && !slugTouched ? { slug: slugify(v) } : {}) }));
  };
  const words = countWords(f.content);
  const links = internalLinks(f.content);
  const hasImage = /<img\s/i.test(f.content) || !!f.cover || !!f.youtubeId;
  const missingAlt = (f.content.match(/alt="(Describe this photo in English)?"/g) || []).length;
  const activeCountries = meta.countries.filter((c) => c.status === 'active');
  const otherCountries = meta.countries.filter((c) => c.status !== 'active');
  const target = f.allCountries ? 'all' : f.countries.length ? 'some' : 'none';

  async function uploadImage(file) {
    const form = new FormData();
    form.append('image', file);
    const { url } = await api.upload('/posts/upload-image', form);
    return url;
  }
  async function onCover(e) {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      setBusy(true);
      const url = await uploadImage(file);
      setF((x) => ({ ...x, cover: url }));
      flash('Cover uploaded — save the post to keep it');
    } catch (e2) {
      flash(e2.message, 'err');
    } finally {
      setBusy(false);
    }
  }
  async function onInlineImage(e) {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      setBusy(true);
      const url = await uploadImage(file);
      const snippet = `\n<figure><img src="${url}" alt="Describe this photo in English" /><figcaption></figcaption></figure>\n`;
      const el = contentRef.current;
      const pos = el ? el.selectionStart : f.content.length;
      setF((x) => ({ ...x, content: x.content.slice(0, pos) + snippet + x.content.slice(pos) }));
      flash('Photo added — ab uska alt text (description) likhein');
    } catch (e2) {
      flash(e2.message, 'err');
    } finally {
      setBusy(false);
    }
  }

  async function save(e, statusOverride) {
    e?.preventDefault();
    const status = statusOverride || f.status;
    const body = { ...f, status, publishAt: status === 'published' && !f.publishAt ? null : fromIstInput(f.publishAt) };
    if (status === 'published' && f.publishAt && new Date(fromIstInput(f.publishAt)) > new Date()) body.status = 'scheduled';
    if (!body.allCountries && target === 'none') body.countries = [];
    setBusy(true);
    try {
      const { item } = isNew ? await api.post('/posts', body) : await api.patch(`/posts/${id}`, body);
      const nf = toForm(item);
      setOrig(nf);
      setF(nf);
      flash(item.status === 'draft' ? 'Draft saved' : isLive(item) ? 'Saved — live on the website' : `Scheduled for ${fmtDateTime(item.publishAt)}`);
      if (isNew) navigate(`/admin/blog/${item._id}`, { replace: true });
    } catch (e2) {
      flash(e2.message, 'err');
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirmDel) return setConfirmDel(true);
    try {
      await api.del(`/posts/${id}`);
      navigate('/admin/blog');
    } catch (e2) {
      flash(e2.message, 'err');
    }
  }

  const live = !isNew && orig.status !== 'draft' && orig.publishAt && new Date(fromIstInput(orig.publishAt)) <= new Date();

  return (
    <form onSubmit={save}>
      {toast}
      <Link to="/admin/blog" className="adm-backlink">← Blog posts</Link>
      <PageHead
        title={isNew ? 'New post' : orig.title || 'Untitled'}
        sub={live ? <>Live: <a href={`/blog/${orig.slug}`} target="_blank" rel="noreferrer">/blog/{orig.slug} ↗</a></> : isNew ? 'Pehle Draft save karein, phir publish ya schedule.' : `Not live — /blog/${orig.slug}`}
        action={<div className="adm-row">{dirty && <span className="adm-hint">Unsaved changes</span>}<button className="adm-btn primary" type="submit" disabled={busy || (!dirty && !isNew)}>{busy ? 'Saving…' : 'Save'}</button></div>}
      />

      <section className="adm-card">
        <div className="adm-form-grid">
          <Field label="Title" wide><input className="adm-input" value={f.title} onChange={set('title')} required placeholder="e.g. How a Nadi leaf is found from your thumb impression" /></Field>
          <Field label="URL slug" hint={`/blog/${f.slug || '…'}${live ? ' — live post ka URL mat badlein' : ''}`}><input className="adm-input" value={f.slug} onChange={(e) => { setSlugTouched(true); setF((x) => ({ ...x, slug: slugify(e.target.value) })); }} /></Field>
          <Field label="Category"><select className="adm-input" value={f.category} onChange={set('category')}>{meta.categories.map((c) => <option key={c} value={c}>{c}</option>)}</select></Field>
          <Field label={`SEO title (${f.seoTitle.length}/60)`} hint="Khaali = title"><input className="adm-input" value={f.seoTitle} maxLength={70} onChange={set('seoTitle')} placeholder="Main keyword first | Pt. Rajneesh Sharma" /></Field>
          <Field label={`Meta description (${f.metaDescription.length}/155)`} wide><input className="adm-input" value={f.metaDescription} maxLength={170} onChange={set('metaDescription')} /></Field>
          <Field label="Excerpt (blog list par dikhega)" wide><textarea className="adm-input" rows={2} maxLength={400} value={f.excerpt} onChange={set('excerpt')} /></Field>
        </div>
      </section>

      <section className="adm-card">
        <h2>Cover & video</h2>
        <div className="adm-form-grid">
          <div className="adm-field">
            <span className="adm-label">Cover image</span>
            {f.cover && <img src={f.cover} alt="" className="adm-cover" />}
            <div className="adm-row">
              <label className="adm-btn ghost sm adm-filebtn">{f.cover ? 'Change' : 'Upload'}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={onCover} disabled={busy} /></label>
              {f.cover && <button type="button" className="adm-btn danger sm" onClick={() => setF((x) => ({ ...x, cover: '' }))}>Remove</button>}
            </div>
            <input className="adm-input" value={f.cover} onChange={set('cover')} placeholder="ya https:// image link" />
          </div>
          <Field label="YouTube video (link or ID)" hint="Post ke neeche video dikhega"><input className="adm-input" value={f.youtubeId} onChange={set('youtubeId')} placeholder="https://youtu.be/…" /></Field>
        </div>
      </section>

      <section className="adm-card">
        <div className="adm-card-head">
          <h2>Content</h2>
          <div className="adm-row">
            <span className="adm-hint">{words} words · {links} internal links</span>
            <label className="adm-btn ghost sm adm-filebtn">Add photo to content<input type="file" accept="image/jpeg,image/png,image/webp" onChange={onInlineImage} disabled={busy} /></label>
            <button type="button" className="adm-btn ghost sm" onClick={() => setMode((m) => (m === 'edit' ? 'preview' : 'edit'))}>{mode === 'edit' ? 'Preview' : 'Edit'}</button>
          </div>
        </div>
        {mode === 'edit' ? (
          <>
            <textarea ref={contentRef} className="adm-input adm-code" rows={20} value={f.content} onChange={set('content')} placeholder={'<h2>Heading</h2>\n<p>Paragraph…</p>\n<p><a href="/nadi-astrology">Nadi astrology</a></p>'} />
            <p className="adm-hint">HTML: &lt;h2&gt; heading, &lt;p&gt; paragraph, &lt;ul&gt;&lt;li&gt; list, &lt;a href="/kp-prashna"&gt; link, &lt;strong&gt; bold. Script ya unsafe code save hote waqt apne-aap hat jaata hai.</p>
          </>
        ) : (
          <div className="adm-preview prose" dangerouslySetInnerHTML={{ __html: f.content || '<p>Nothing yet.</p>' }} />
        )}
        <button type="button" className="adm-btn ghost sm" style={{ marginTop: 12 }} onClick={() => setShowHi((v) => !v)}>{showHi ? 'Hide Hindi version' : '+ Hindi version (optional)'}</button>
        {showHi && (
          <div className="adm-form-grid one" style={{ marginTop: 14 }}>
            <Field label="Title in Hindi"><input className="adm-input" lang="hi" value={f.titleHi} onChange={set('titleHi')} /></Field>
            <Field label="Excerpt in Hindi"><textarea className="adm-input" lang="hi" rows={2} value={f.excerptHi} onChange={set('excerptHi')} /></Field>
            <Field label="Content in Hindi (HTML)" hint="Khaali = हिंदी चुनने वाले को English article dikhega"><textarea className="adm-input adm-code" lang="hi" rows={12} value={f.contentHi} onChange={set('contentHi')} /></Field>
          </div>
        )}
      </section>

      <section className="adm-card">
        <h2>Kin country pages par yeh post dikhe?</h2>
        <p className="adm-hint">Blog par post hamesha dikhti hai. Yahan chuno ki country pages ke "Latest updates" mein bhi dikhe ya nahi.</p>
        <div className="adm-choice">
          <label><input type="radio" name="target" checked={target === 'all'} onChange={() => setF((x) => ({ ...x, allCountries: true }))} /> <b>Sabhi countries</b> — har country page par (naye desh bhi apne-aap)</label>
          <label><input type="radio" name="target" checked={target === 'some'} onChange={() => setF((x) => ({ ...x, allCountries: false, countries: x.countries.length ? x.countries : activeCountries.slice(0, 1).map((c) => c.slug) }))} /> <b>Sirf chune hue desh</b></label>
          <label><input type="radio" name="target" checked={target === 'none'} onChange={() => setF((x) => ({ ...x, allCountries: false, countries: [] }))} /> <b>Sirf blog par</b> — country pages par nahi</label>
        </div>
        {target === 'some' && (
          <div className="adm-countrypick">
            {[...activeCountries, ...otherCountries].map((c) => (
              <label key={c.slug} className={f.countries.includes(c.slug) ? 'on' : ''}>
                <input type="checkbox" checked={f.countries.includes(c.slug)} onChange={(e) => setF((x) => ({ ...x, countries: e.target.checked ? [...x.countries, c.slug] : x.countries.filter((s) => s !== c.slug) }))} />
                {c.name}{c.status !== 'active' && <small className="inline"> ({c.status})</small>}
              </label>
            ))}
          </div>
        )}
      </section>

      <section className="adm-card">
        <h2>Publish se pehle check karein (Google spam policy)</h2>
        <ul className="adm-checklist">
          <li className={words >= 800 ? 'ok' : ''}>800–1200 words, ek specific sawal ka poora jawab (abhi {words})</li>
          <li className={hasImage ? 'ok' : ''}>Kam se kam 1 asli photo ya video (stock photo nahi)</li>
          <li className={missingAlt === 0 ? 'ok' : ''}>Har photo ka alt text (description) likha ho{missingAlt ? ` — ${missingAlt} baaki` : ''}</li>
          <li className={links >= 2 ? 'ok' : ''}>2 internal links — ek service page, ek yantra / country page (abhi {links})</li>
          <li>Pandit ji ne facts check kiye</li>
          <li>AI draft ho to rewrite karke apna anubhav joda</li>
        </ul>
      </section>

      <section className="adm-card">
        <h2>Status</h2>
        <div className="adm-form-grid">
          <Field label="Status">
            <select className="adm-input" value={f.status} onChange={set('status')}>{STATUS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
          </Field>
          <Field label="Publish date & time (IST)" hint={f.status === 'scheduled' ? 'Isi samay apne-aap live hogi' : f.status === 'published' ? 'Khaali = abhi' : 'Draft website par nahi dikhta'}>
            <input className="adm-input" type="datetime-local" value={f.publishAt} onChange={set('publishAt')} />
          </Field>
        </div>
      </section>

      <div className="adm-savebar">
        {!isNew && <button type="button" className="adm-btn danger" onClick={remove} onBlur={() => setConfirmDel(false)}>{confirmDel ? 'Sure? Click again to delete' : 'Delete'}</button>}
        {live && <a className="adm-btn ghost" href={`/blog/${orig.slug}`} target="_blank" rel="noreferrer">View ↗</a>}
        <button type="button" className="adm-btn ghost" disabled={busy} onClick={(e) => save(e, 'draft')}>Save draft</button>
        <button className="adm-btn primary" type="submit" disabled={busy}>{f.status === 'draft' ? 'Save' : f.status === 'scheduled' ? 'Schedule' : 'Publish'}</button>
      </div>
    </form>
  );
}
