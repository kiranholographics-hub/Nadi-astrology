import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { YantraArt } from '../components/Yantra.jsx';
import { CATEGORY_LABEL } from '../data/yantraI18n.js';
import { api } from './api.js';
import { money } from './format.js';
import { Badge, Empty, ErrorBox, Field, Loading, PageHead, Stat, useFlash } from './ui.jsx';

const STOCK = [['available', 'Available'], ['made_to_order', 'Made to order'], ['out_of_stock', 'Out of stock']];
const catName = (c) => `${CATEGORY_LABEL[c]?.en || c} (${c})`;

export default function Yantras() {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState('');
  const [filter, setFilter] = useState('');
  useEffect(() => { api.get('/yantras').then((d) => setItems(d.items)).catch((e) => setErr(e.message)); }, []);

  const noPrice = useMemo(() => (items || []).filter((y) => y.priceINR == null || y.priceUSD == null), [items]);
  const list = (items || []).filter((y) => filter === 'noprice' ? y.priceINR == null || y.priceUSD == null : filter === 'hidden' ? !y.active : filter === 'nophoto' ? !y.images?.length : true);

  if (err) return <ErrorBox error={err} />;
  if (!items) return <Loading />;
  return (
    <>
      <PageHead title="Yantras" sub="Price, photo, size, dhatu, stock aur sthapana vidhi yahan se badlein — website par turant dikhta hai." />
      <div className="adm-stats">
        <Stat n={items.length} label="All yantras" onClick={() => setFilter('')} active={!filter} />
        <Stat n={noPrice.length} label="Price missing" tone={noPrice.length ? 'gold' : ''} onClick={() => setFilter('noprice')} active={filter === 'noprice'} />
        <Stat n={items.filter((y) => !y.images?.length).length} label="No photo yet" onClick={() => setFilter('nophoto')} active={filter === 'nophoto'} />
        <Stat n={items.filter((y) => !y.active).length} label="Hidden from site" onClick={() => setFilter('hidden')} active={filter === 'hidden'} />
      </div>
      {list.length === 0 ? <Empty>Nothing here.</Empty> : (
        <div className="adm-ygrid">
          {list.map((y) => (
            <Link key={y._id} to={`/admin/yantras/${y._id}`} className="adm-ycard">
              <span className="adm-ythumb">{y.images?.[0]?.url ? <img src={y.images[0].url} alt="" /> : <YantraArt variant={y.art} />}</span>
              <span className="adm-ybody">
                <b>{y.name}</b>
                <small>{catName(y.category)}</small>
                <span className="adm-yprice">{y.priceINR == null ? <em>₹ price missing</em> : money(y.priceINR, 'INR')} · {y.priceUSD == null ? <em>$ missing</em> : money(y.priceUSD, 'USD')}</span>
                <span className="adm-row">
                  {!y.active && <Badge tone="cancelled">Hidden</Badge>}
                  {y.bestseller && <Badge tone="gold">Bestseller</Badge>}
                  {y.stock !== 'available' && <Badge>{STOCK.find(([k]) => k === y.stock)?.[1]}</Badge>}
                  <Badge>{y.images?.length || 0} photos</Badge>
                </span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

const toForm = (y) => ({
  name: y.name || '', category: y.category, order: y.order ?? 0, bestseller: !!y.bestseller, active: y.active !== false, stock: y.stock || 'available',
  priceINR: y.priceINR ?? '', priceUSD: y.priceUSD ?? '', sankalpPriceINR: y.sankalpPriceINR ?? '', sankalpPriceUSD: y.sankalpPriceUSD ?? '',
  sizes: (y.sizes || []).join(', '), material: y.material || '', weightGrams: y.weightGrams ?? '', deity: y.deity || '', pranPratishtha: y.pranPratishtha || '',
  description: y.description || '', purpose: y.purpose || '', care: y.care || '', boxContents: y.boxContents || '', videoUrl: y.videoUrl || '',
  sthapana: { day: '', direction: '', shuddhi: '', mantra: '', daily: '', ...Object.fromEntries(Object.entries(y.sthapana || {}).map(([k, v]) => [k, v || ''])) },
});

export function YantraEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [y, setY] = useState(null);
  const [cats, setCats] = useState([]);
  const [f, setF] = useState(null);
  const [images, setImages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const [toast, flash] = useFlash();

  useEffect(() => {
    api.get('/yantras').then((d) => {
      const item = d.items.find((x) => x._id === id);
      if (!item) return setErr('Yantra not found');
      setCats(d.categories);
      setY(item);
      setF(toForm(item));
      setImages(item.images || []);
    }).catch((e) => setErr(e.message));
  }, [id]);

  const dirty = useMemo(() => y && f && (JSON.stringify(toForm(y)) !== JSON.stringify(f) || JSON.stringify(y.images || []) !== JSON.stringify(images)), [y, f, images]);
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  if (err) return <><Link to="/admin/yantras" className="adm-backlink">← Yantras</Link><ErrorBox error={err} /></>;
  if (!f) return <Loading />;

  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const setS = (k) => (e) => setF((x) => ({ ...x, sthapana: { ...x.sthapana, [k]: e.target.value } }));

  async function save(e) {
    e?.preventDefault();
    setBusy(true);
    try {
      const body = { ...f, sizes: f.sizes.split(',').map((s) => s.trim()).filter(Boolean), images: images.map(({ url, label }) => ({ url, label })) };
      const { item } = await api.patch(`/yantras/${id}`, body);
      const removedPhotos = (y.images || []).length > images.length;
      setY(item);
      setF(toForm(item));
      setImages(item.images || []);
      if (removedPhotos) api.post('/yantras/cleanup-images').catch(() => {});
      flash('Saved — live on the website');
    } catch (e2) {
      flash(e2.message, 'err');
    } finally {
      setBusy(false);
    }
  }

  async function upload(e) {
    const files = [...e.target.files];
    e.target.value = '';
    if (!files.length) return;
    if (dirty) return flash('Pehle "Save changes" dabayein, phir photo upload karein.', 'err');
    const form = new FormData();
    files.forEach((file) => form.append('images', file));
    setBusy(true);
    try {
      const { item } = await api.upload(`/yantras/${id}/images`, form);
      setY(item);
      setImages(item.images || []);
      flash(`${files.length} photo uploaded`);
    } catch (e2) {
      flash(e2.message, 'err');
    } finally {
      setBusy(false);
    }
  }

  const move = (i, d) => setImages((xs) => { const a = [...xs]; [a[i], a[i + d]] = [a[i + d], a[i]]; return a; });

  return (
    <form onSubmit={save}>
      {toast}
      <Link to="/admin/yantras" className="adm-backlink">← Yantras</Link>
      <PageHead
        title={y.name}
        sub={<>Live page: <a href={`/yantra-shop/${y.slug}`} target="_blank" rel="noreferrer">/yantra-shop/{y.slug}</a></>}
        action={<div className="adm-row">{dirty && <span className="adm-hint">Unsaved changes</span>}<button className="adm-btn primary" type="submit" disabled={busy || !dirty}>{busy ? 'Saving…' : 'Save changes'}</button></div>}
      />

      <section className="adm-card">
        <h2>Prices</h2>
        <p className="adm-hint">Dono price (₹ aur $) bharne ke baad hi customer checkout kar paayega. Khaali = website par "[₹ PRICE]" dikhega.</p>
        <div className="adm-form-grid">
          <Field label="Price in India (₹)"><input className="adm-input" type="number" min="0" step="1" value={f.priceINR} onChange={set('priceINR')} /></Field>
          <Field label="International price ($)"><input className="adm-input" type="number" min="0" step="0.01" value={f.priceUSD} onChange={set('priceUSD')} /></Field>
          <Field label="Personal sankalp extra (₹)"><input className="adm-input" type="number" min="0" value={f.sankalpPriceINR} onChange={set('sankalpPriceINR')} /></Field>
          <Field label="Personal sankalp extra ($)"><input className="adm-input" type="number" min="0" step="0.01" value={f.sankalpPriceUSD} onChange={set('sankalpPriceUSD')} /></Field>
        </div>
      </section>

      <section className="adm-card">
        <h2>Photos</h2>
        <p className="adm-hint">Pehli photo shop aur card par dikhti hai. Order: Front, Back, Haath mein size, Packaging. JPG / PNG / WEBP, max 5 MB, 8 photos tak.</p>
        <div className="adm-photos">
          {images.map((img, i) => (
            <div key={img.url} className="adm-photo">
              <img src={img.url} alt={img.label || y.name} />
              <input className="adm-input sm" value={img.label || ''} placeholder="Label" aria-label="Photo label" onChange={(e) => setImages((xs) => xs.map((x, k) => (k === i ? { ...x, label: e.target.value } : x)))} />
              <div className="adm-row">
                <button type="button" className="adm-btn ghost xs" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move left">←</button>
                <button type="button" className="adm-btn ghost xs" disabled={i === images.length - 1} onClick={() => move(i, 1)} aria-label="Move right">→</button>
                <button type="button" className="adm-btn danger xs" onClick={() => setImages((xs) => xs.filter((_, k) => k !== i))}>Remove</button>
              </div>
            </div>
          ))}
          {images.length < 8 && (
            <label className="adm-photo add">
              <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={upload} disabled={busy} />
              <span>+ Upload photos</span>
            </label>
          )}
        </div>
        <Field label="Video URL (30–60 sec, YouTube or .mp4)" wide><input className="adm-input" value={f.videoUrl} onChange={set('videoUrl')} placeholder="https://…" /></Field>
      </section>

      <section className="adm-card">
        <h2>Basic</h2>
        <div className="adm-form-grid">
          <Field label="Name"><input className="adm-input" value={f.name} onChange={set('name')} required /></Field>
          <Field label="Category"><select className="adm-input" value={f.category} onChange={set('category')}>{cats.map((c) => <option key={c} value={c}>{catName(c)}</option>)}</select></Field>
          <Field label="Stock"><select className="adm-input" value={f.stock} onChange={set('stock')}>{STOCK.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></Field>
          <Field label="Order in shop" hint="Chhota number = pehle dikhega"><input className="adm-input" type="number" value={f.order} onChange={set('order')} /></Field>
        </div>
        <div className="adm-row checks">
          <label><input type="checkbox" checked={f.active} onChange={set('active')} /> Show on website</label>
          <label><input type="checkbox" checked={f.bestseller} onChange={set('bestseller')} /> Bestseller (home page par dikhega)</label>
        </div>
      </section>

      <section className="adm-card">
        <h2>Details</h2>
        <div className="adm-form-grid">
          <Field label="Sizes" hint="Comma se alag karein: 2 x 2 inch, 3 x 3 inch"><input className="adm-input" value={f.sizes} onChange={set('sizes')} /></Field>
          <Field label="Metal / material"><input className="adm-input" value={f.material} onChange={set('material')} placeholder="Copper, gold plated / Ashtadhatu / Bhojpatra" /></Field>
          <Field label="Weight (grams)"><input className="adm-input" type="number" min="0" value={f.weightGrams} onChange={set('weightGrams')} /></Field>
          <Field label="Deity / planet"><input className="adm-input" value={f.deity} onChange={set('deity')} /></Field>
          <Field label="Pran-pratishtha" wide><input className="adm-input" value={f.pranPratishtha} onChange={set('pranPratishtha')} placeholder="Kis din, kis vidhi se, Pt. Rajneesh Sharma dwara" /></Field>
          <Field label="Description (2–3 lines)" wide hint="English mein likhein — website ki default language English hai. Guarantee ki bhasha nahi."><textarea className="adm-input" rows={3} value={f.description} onChange={set('description')} /></Field>
          <Field label="Used for" wide><textarea className="adm-input" rows={2} value={f.purpose} onChange={set('purpose')} /></Field>
          <Field label="Care" wide><textarea className="adm-input" rows={2} value={f.care} onChange={set('care')} placeholder="Cleaning, where to keep it, what to avoid" /></Field>
          <Field label="In the box" wide><input className="adm-input" value={f.boxContents} onChange={set('boxContents')} /></Field>
        </div>
      </section>

      <section className="adm-card">
        <h2>Installation (sthapana vidhi)</h2>
        <div className="adm-form-grid">
          <Field label="Day & time"><input className="adm-input" value={f.sthapana.day} onChange={setS('day')} /></Field>
          <Field label="Direction / place"><input className="adm-input" value={f.sthapana.direction} onChange={setS('direction')} /></Field>
          <Field label="Purification"><input className="adm-input" value={f.sthapana.shuddhi} onChange={setS('shuddhi')} /></Field>
          <Field label="Mantra (how many times)"><input className="adm-input" value={f.sthapana.mantra} onChange={setS('mantra')} /></Field>
          <Field label="Daily care" wide><input className="adm-input" value={f.sthapana.daily} onChange={setS('daily')} /></Field>
        </div>
      </section>

      <div className="adm-savebar">
        <button type="button" className="adm-btn ghost" onClick={() => navigate('/admin/yantras')}>Back</button>
        <button className="adm-btn primary" type="submit" disabled={busy || !dirty}>{busy ? 'Saving…' : 'Save changes'}</button>
      </div>
    </form>
  );
}
