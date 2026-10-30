import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from './api.js';
import { countryName, fmtDate } from './format.js';
import { Empty, ErrorBox, Field, Loading, PageHead, Stat, StatusSelect, useFlash } from './ui.jsx';

const STATUS = [['active', 'Active (live)'], ['draft', 'Draft'], ['paused', 'Paused']];
const slugify = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 40);

export default function Countries() {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState('');
  const [form, setForm] = useState({ name: '', code: '', slug: '' });
  const [slugTouched, setSlugTouched] = useState(false);
  const [confirmId, setConfirmId] = useState(null);
  const [toast, flash] = useFlash();
  const navigate = useNavigate();

  useEffect(() => { api.get('/countries').then((d) => setItems(d.items)).catch((e) => setErr(e.message)); }, []);
  const counts = useMemo(() => (items || []).reduce((c, x) => ({ ...c, [x.status]: (c[x.status] || 0) + 1 }), {}), [items]);

  async function add(e) {
    e.preventDefault();
    try {
      const { item } = await api.post('/countries', form);
      flash(`${item.name} added as draft — fill in the page and set it Active`);
      navigate(`/admin/countries/${item._id}`);
    } catch (e2) {
      flash(e2.message, 'err');
    }
  }
  async function setStatus(id, status) {
    try {
      const { item } = await api.patch(`/countries/${id}`, { status });
      setItems((xs) => xs.map((x) => (x._id === id ? item : x)));
      flash(status === 'active' ? 'Live on the website' : 'Status updated');
    } catch (e) {
      flash(e.message, 'err');
    }
  }
  async function remove(id) {
    if (confirmId !== id) return setConfirmId(id);
    try {
      await api.del(`/countries/${id}`);
      setItems((xs) => xs.filter((x) => x._id !== id));
      setConfirmId(null);
      flash('Deleted');
    } catch (e) {
      flash(e.message, 'err');
    }
  }

  if (err) return <ErrorBox error={err} />;
  if (!items) return <Loading />;
  return (
    <>
      {toast}
      <PageHead title="Countries" sub="Har desh ka apna page: /nadi-astrology/<slug>. Sirf 'Active' pages website aur Google sitemap mein dikhte hain." />
      <div className="adm-stats">
        <Stat n={items.length} label="Total countries" />
        <Stat n={counts.active || 0} label="Active" tone="gold" />
        <Stat n={counts.draft || 0} label="Draft" />
        <Stat n={counts.paused || 0} label="Paused" />
      </div>

      <form className="adm-card" onSubmit={add}>
        <h2>Add a country</h2>
        <div className="adm-form-grid">
          <Field label="Country name"><input className="adm-input" value={form.name} placeholder="New Zealand" required onChange={(e) => { const name = e.target.value; setForm((f) => ({ ...f, name, slug: slugTouched ? f.slug : slugify(name) })); }} /></Field>
          <Field label="Country code" hint={form.code.length === 2 ? countryName(form.code.toUpperCase()) : '2 letters, e.g. NZ'}><input className="adm-input" value={form.code} maxLength={2} placeholder="NZ" required onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))} /></Field>
          <Field label="URL slug" hint={`/nadi-astrology/${form.slug || '…'}`}><input className="adm-input" value={form.slug} placeholder="new-zealand" required onChange={(e) => { setSlugTouched(true); setForm((f) => ({ ...f, slug: slugify(e.target.value) })); }} /></Field>
        </div>
        <button className="adm-btn primary" type="submit">Add country</button>
      </form>

      <div className="adm-card flush">
        {items.length === 0 ? <Empty>No country pages yet.</Empty> : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Country</th><th>Page</th><th>Status</th><th>Updated</th><th /></tr></thead>
              <tbody>
                {items.map((c) => (
                  <tr key={c._id}>
                    <td><Link to={`/admin/countries/${c._id}`}><b>{c.name}</b></Link><small>{c.code}{c.nameHi ? ` · ${c.nameHi}` : ''}</small></td>
                    <td>{c.status === 'active' ? <a href={`/nadi-astrology/${c.slug}`} target="_blank" rel="noreferrer">/nadi-astrology/{c.slug} ↗</a> : <span className="adm-hint">/nadi-astrology/{c.slug}</span>}</td>
                    <td><StatusSelect value={c.status} options={STATUS} onChange={(v) => setStatus(c._id, v)} /></td>
                    <td className="nowrap">{fmtDate(c.updatedAt)}</td>
                    <td className="nowrap">
                      <Link className="adm-btn ghost xs" to={`/admin/countries/${c._id}`}>Edit</Link>{' '}
                      <button type="button" className="adm-btn danger xs" onClick={() => remove(c._id)} onBlur={() => setConfirmId(null)}>{confirmId === c._id ? 'Sure? Click again' : 'Delete'}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

const blankFaq = () => ({ q: { en: '', hi: '' }, a: { en: '', hi: '' } });
const toForm = (c) => ({
  name: c.name || '', nameHi: c.nameHi || '', code: c.code || '', slug: c.slug || '', inName: c.inName || '', status: c.status, order: c.order ?? 0,
  shippingDays: c.shippingDays || '', seoTitle: c.seoTitle || '', metaDescription: c.metaDescription || '',
  cities: (c.cities || []).join(', '),
  timezones: (c.timezones || []).map((z) => ({ label: z.label, tz: z.tz })),
  intro: { en: c.intro?.en || '', hi: c.intro?.hi || '' },
  community: { en: c.community?.en || '', hi: c.community?.hi || '' },
  customsNote: { en: c.customsNote?.en || '', hi: c.customsNote?.hi || '' },
  faqs: (c.faqs || []).map((f) => ({ q: { en: f.q?.en || '', hi: f.q?.hi || '' }, a: { en: f.a?.en || '', hi: f.a?.hi || '' } })),
});

function TwoLang({ label, value, onChange, rows = 3, hint }) {
  return (
    <div className="adm-twolang">
      <span className="adm-label">{label}</span>
      <div className="adm-form-grid">
        <label className="adm-field"><span className="adm-hint">English (default)</span><textarea className="adm-input" rows={rows} value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} /></label>
        <label className="adm-field"><span className="adm-hint">हिंदी (khaali = English dikhega)</span><textarea className="adm-input" rows={rows} lang="hi" value={value.hi} onChange={(e) => onChange({ ...value, hi: e.target.value })} /></label>
      </div>
      {hint && <span className="adm-hint">{hint}</span>}
    </div>
  );
}

export function CountryEdit() {
  const { id } = useParams();
  const [orig, setOrig] = useState(null);
  const [f, setF] = useState(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [toast, flash] = useFlash();

  useEffect(() => {
    api.get('/countries').then((d) => {
      const c = d.items.find((x) => x._id === id);
      if (!c) return setErr('Country not found');
      setOrig(c);
      setF(toForm(c));
    }).catch((e) => setErr(e.message));
  }, [id]);

  const dirty = useMemo(() => orig && f && JSON.stringify(toForm(orig)) !== JSON.stringify(f), [orig, f]);
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  if (err) return <><Link to="/admin/countries" className="adm-backlink">← Countries</Link><ErrorBox error={err} /></>;
  if (!f) return <Loading />;

  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const setV = (k) => (v) => setF((x) => ({ ...x, [k]: v }));

  async function save(e) {
    e?.preventDefault();
    setBusy(true);
    try {
      const body = { ...f, cities: f.cities.split(',').map((s) => s.trim()).filter(Boolean), faqs: f.faqs.filter((q) => q.q.en.trim() && q.a.en.trim()) };
      const { item } = await api.patch(`/countries/${id}`, body);
      setOrig(item);
      setF(toForm(item));
      flash(item.status === 'active' ? 'Saved — live on the website' : 'Saved');
    } catch (e2) {
      flash(e2.message, 'err');
    } finally {
      setBusy(false);
    }
  }

  const live = orig.status === 'active';
  return (
    <form onSubmit={save}>
      {toast}
      <Link to="/admin/countries" className="adm-backlink">← Countries</Link>
      <PageHead
        title={orig.name}
        sub={live ? <>Live page: <a href={`/nadi-astrology/${orig.slug}`} target="_blank" rel="noreferrer">/nadi-astrology/{orig.slug} ↗</a></> : `Not live yet — set status to Active to publish /nadi-astrology/${orig.slug}`}
        action={<div className="adm-row">{dirty && <span className="adm-hint">Unsaved changes</span>}<button className="adm-btn primary" type="submit" disabled={busy || !dirty}>{busy ? 'Saving…' : 'Save changes'}</button></div>}
      />

      <section className="adm-card">
        <h2>Basic</h2>
        <div className="adm-form-grid">
          <Field label="Country name (English)"><input className="adm-input" value={f.name} onChange={set('name')} required /></Field>
          <Field label="Name in Hindi"><input className="adm-input" lang="hi" value={f.nameHi} onChange={set('nameHi')} placeholder="न्यूज़ीलैंड" /></Field>
          <Field label="In a sentence" hint={`"Nadi Astrology in ${f.inName || '…'}"`}><input className="adm-input" value={f.inName} onChange={set('inName')} placeholder="the USA / Malaysia" /></Field>
          <Field label="Country code"><input className="adm-input" value={f.code} maxLength={2} onChange={(e) => setF((x) => ({ ...x, code: e.target.value.toUpperCase() }))} /></Field>
          <Field label="URL slug" hint="Live hone ke baad mat badlein — Google ranking reset ho jaati hai."><input className="adm-input" value={f.slug} onChange={(e) => setF((x) => ({ ...x, slug: slugify(e.target.value) }))} /></Field>
          <Field label="Status"><select className="adm-input" value={f.status} onChange={set('status')}>{STATUS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></Field>
          <Field label="Order" hint="Chhota number = pehle dikhega"><input className="adm-input" type="number" value={f.order} onChange={set('order')} /></Field>
        </div>
      </section>

      <section className="adm-card">
        <h2>Page content</h2>
        <p className="adm-hint">Google ke liye har desh ka page alag aur kaam ka hona chahiye — sirf desh ka naam badal kar copy mat karein. Us desh ke logon ki asli baatein likhein.</p>
        <TwoLang label="Intro (top of the page)" value={f.intro} onChange={setV('intro')} rows={4} />
        <TwoLang label="Community — who is there, why Nadi readings are sought" value={f.community} onChange={setV('community')} rows={4} />
        <Field label="Cities (comma separated)" wide><input className="adm-input" value={f.cities} onChange={set('cities')} placeholder="Auckland, Wellington, Christchurch" /></Field>
      </section>

      <section className="adm-card">
        <h2>Time zones</h2>
        <p className="adm-hint">Page par slot ka local time inhi se banta hai. Time zone ka naam jaise <code>America/New_York</code>, <code>Europe/London</code>, <code>Asia/Dubai</code>, <code>Pacific/Auckland</code>.</p>
        {f.timezones.map((z, i) => (
          <div key={i} className="adm-form-grid" style={{ alignItems: 'end' }}>
            <Field label="City label"><input className="adm-input" value={z.label} onChange={(e) => setF((x) => ({ ...x, timezones: x.timezones.map((t, k) => (k === i ? { ...t, label: e.target.value } : t)) }))} /></Field>
            <Field label="Time zone"><input className="adm-input" value={z.tz} onChange={(e) => setF((x) => ({ ...x, timezones: x.timezones.map((t, k) => (k === i ? { ...t, tz: e.target.value } : t)) }))} /></Field>
            <div><button type="button" className="adm-btn danger xs" onClick={() => setF((x) => ({ ...x, timezones: x.timezones.filter((_, k) => k !== i) }))}>Remove</button></div>
          </div>
        ))}
        {f.timezones.length < 6 && <button type="button" className="adm-btn ghost sm" onClick={() => setF((x) => ({ ...x, timezones: [...x.timezones, { label: '', tz: '' }] }))}>+ Add time zone</button>}
      </section>

      <section className="adm-card">
        <h2>Yantra shipping</h2>
        <div className="adm-form-grid">
          <Field label="Delivery days" hint="e.g. 7–12. Khaali = 'confirmed on WhatsApp' dikhega"><input className="adm-input" value={f.shippingDays} onChange={set('shippingDays')} /></Field>
        </div>
        <TwoLang label="Customs / duty note" value={f.customsNote} onChange={setV('customsNote')} rows={2} />
      </section>

      <section className="adm-card">
        <h2>FAQ for this country</h2>
        <p className="adm-hint">Page par 2 common sawal (thumb impression bhejna, patta na mile to) apne-aap judte hain. Yahan sirf is desh ke sawal likhein.</p>
        {f.faqs.map((q, i) => (
          <div key={i} className="adm-faq">
            <TwoLang label={`Question ${i + 1}`} value={q.q} rows={1} onChange={(v) => setF((x) => ({ ...x, faqs: x.faqs.map((y, k) => (k === i ? { ...y, q: v } : y)) }))} />
            <TwoLang label="Answer" value={q.a} rows={3} onChange={(v) => setF((x) => ({ ...x, faqs: x.faqs.map((y, k) => (k === i ? { ...y, a: v } : y)) }))} />
            <button type="button" className="adm-btn danger xs" onClick={() => setF((x) => ({ ...x, faqs: x.faqs.filter((_, k) => k !== i) }))}>Remove question</button>
          </div>
        ))}
        {f.faqs.length < 12 && <button type="button" className="adm-btn ghost sm" onClick={() => setF((x) => ({ ...x, faqs: [...x.faqs, blankFaq()] }))}>+ Add question</button>}
      </section>

      <section className="adm-card">
        <h2>Google (SEO)</h2>
        <div className="adm-form-grid one">
          <Field label={`SEO title (${f.seoTitle.length}/60)`} hint="Khaali = 'Nadi Astrology in … — Online Palm Leaf Reading'"><input className="adm-input" value={f.seoTitle} maxLength={70} onChange={set('seoTitle')} /></Field>
          <Field label={`Meta description (${f.metaDescription.length}/155)`}><textarea className="adm-input" rows={2} maxLength={170} value={f.metaDescription} onChange={set('metaDescription')} /></Field>
        </div>
      </section>

      <div className="adm-savebar">
        {live && <a className="adm-btn ghost" href={`/nadi-astrology/${orig.slug}`} target="_blank" rel="noreferrer">View page ↗</a>}
        <button className="adm-btn primary" type="submit" disabled={busy || !dirty}>{busy ? 'Saving…' : 'Save changes'}</button>
      </div>
    </form>
  );
}
