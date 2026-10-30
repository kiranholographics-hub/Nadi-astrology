import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api, fileUrl } from './api.js';
import { BOOKING_STATUS, MODE, SERVICE_LABEL, fmtDate, fmtDateTime, money, waUrl } from './format.js';
import { Empty, ErrorBox, Loading, NotesBox, PageHead, Stat, StatusSelect, useFlash } from './ui.jsx';

export default function Bookings() {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState('');
  const [status, setStatus] = useState('');
  const [service, setService] = useState('');
  const [q, setQ] = useState('');
  const [toast, flash] = useFlash();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/bookings').then((d) => setItems(d.items)).catch((e) => setErr(e.message));
  }, []);

  const counts = useMemo(() => (items || []).reduce((c, b) => ({ ...c, [b.status]: (c[b.status] || 0) + 1 }), {}), [items]);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return (items || []).filter((b) => (!status || b.status === status) && (!service || b.service.startsWith(service))
      && (!s || [b.name, b.phone, b.email, b.country].some((v) => String(v || '').toLowerCase().includes(s))));
  }, [items, status, service, q]);

  async function setRowStatus(id, value) {
    try {
      const { item } = await api.patch(`/bookings/${id}`, { status: value });
      setItems((xs) => xs.map((x) => (x._id === id ? { ...x, status: item.status } : x)));
      flash('Status updated');
    } catch (e) {
      flash(e.message, 'err');
    }
  }

  if (err) return <ErrorBox error={err} />;
  if (!items) return <Loading />;
  return (
    <>
      {toast}
      <PageHead title="Bookings" sub="Consultation bookings — Nadi, Vedic, KP, Kundli Milan, Vastu. Row par click karke poori details dekhein." />
      <div className="adm-stats">
        <Stat n={items.length} label="All" onClick={() => setStatus('')} active={!status} />
        <Stat n={(counts.new || 0) + (counts.awaiting_payment || 0)} label="Awaiting payment" tone="gold" onClick={() => setStatus('awaiting_payment')} active={status === 'awaiting_payment'} />
        <Stat n={(counts.paid || 0) + (counts.scheduled || 0)} label="Paid / scheduled" onClick={() => setStatus('paid')} active={status === 'paid'} />
        <Stat n={counts.done || 0} label="Done" onClick={() => setStatus('done')} active={status === 'done'} />
      </div>
      <div className="adm-filters">
        <input className="adm-input" type="search" placeholder="Search name, phone, email, country" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search bookings" />
        <select className="adm-input" value={service} onChange={(e) => setService(e.target.value)} aria-label="Service">
          <option value="">All services</option>
          <option value="nadi">Nadi</option>
          <option value="vedic">Vedic</option>
          <option value="kundli-milan">Kundli Matching</option>
          <option value="kp-prashna">KP Prashna</option>
          <option value="vastu">Vastu</option>
        </select>
        <select className="adm-input" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option value="">All statuses</option>
          {BOOKING_STATUS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>
      <div className="adm-card flush">
        {list.length === 0 ? <Empty>{items.length ? 'No bookings match these filters.' : 'No bookings yet. Website se booking aate hi yahan dikhegi.'}</Empty> : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Received</th><th>Client</th><th>Service</th><th>Slot / mode</th><th>Files</th><th>Status</th></tr></thead>
              <tbody>
                {list.map((b) => (
                  <tr key={b._id} className="click" onClick={() => navigate(`/admin/bookings/${b._id}`)}>
                    <td className="nowrap">{fmtDateTime(b.createdAt)}</td>
                    <td><Link to={`/admin/bookings/${b._id}`} onClick={(e) => e.stopPropagation()}><b>{b.name}</b></Link><small>{b.phone}{b.country ? ` · ${b.country}` : ''}</small></td>
                    <td>{SERVICE_LABEL[b.service] || b.service}<small>{b.currency}</small></td>
                    <td>{b.preferredSlot ? <span>{b.preferredSlot.split(' (')[0]}</span> : '—'}<small>{MODE[b.mode] || b.mode}</small></td>
                    <td className="nowrap">{b.thumbImpression && <span className="adm-chip">Thumb</span>}{b.floorPlan && <span className="adm-chip">Plan</span>}{!b.thumbImpression && !b.floorPlan && '—'}</td>
                    <td><StatusSelect value={b.status} options={BOOKING_STATUS} onChange={(v) => setRowStatus(b._id, v)} /></td>
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

function Row({ k, v }) {
  if (v === undefined || v === null || v === '') return null;
  return <div className="adm-kv"><span>{k}</span><span>{v}</span></div>;
}

function FileBox({ id, field, label, name }) {
  if (!name) return null;
  const isImg = /\.(jpe?g|png|webp)$/i.test(name);
  return (
    <div className="adm-file">
      <span className="adm-label">{label}</span>
      {isImg ? <a href={fileUrl(id, field)} target="_blank" rel="noreferrer"><img src={fileUrl(id, field)} alt={label} /></a> : <span className="adm-hint">{name.split('.').pop().toUpperCase()} file</span>}
      <div className="adm-row">
        <a className="adm-btn ghost sm" href={fileUrl(id, field)} target="_blank" rel="noreferrer">Open</a>
        <a className="adm-btn ghost sm" href={fileUrl(id, field, true)}>Download</a>
      </div>
    </div>
  );
}

export function BookingDetail() {
  const { id } = useParams();
  const [b, setB] = useState(null);
  const [err, setErr] = useState('');
  const [toast, flash] = useFlash();

  useEffect(() => { api.get(`/bookings/${id}`).then((d) => setB(d.item)).catch((e) => setErr(e.message)); }, [id]);

  async function save(patch, msg = 'Saved') {
    const { item } = await api.patch(`/bookings/${id}`, patch);
    setB(item);
    flash(msg);
  }

  if (err) return <><Link to="/admin/bookings" className="adm-backlink">← Bookings</Link><ErrorBox error={err} /></>;
  if (!b) return <Loading />;
  const wa = waUrl(b.phone, `Namaste ${b.name}, this is Pt. Rajneesh Sharma's office regarding your ${SERVICE_LABEL[b.service] || 'consultation'} booking.`);
  const kind = b.service.split('-')[0];

  return (
    <>
      {toast}
      <Link to="/admin/bookings" className="adm-backlink">← Bookings</Link>
      <PageHead
        title={b.name}
        sub={`${SERVICE_LABEL[b.service] || b.service} · received ${fmtDateTime(b.createdAt)} · ref ${String(b._id).slice(-6).toUpperCase()}`}
        action={<StatusSelect value={b.status} options={BOOKING_STATUS} onChange={(v) => save({ status: v }, 'Status updated').catch((e) => flash(e.message, 'err'))} />}
      />
      <div className="adm-row" style={{ marginBottom: 22 }}>
        {wa && <a className="adm-btn primary sm" href={wa} target="_blank" rel="noreferrer">WhatsApp {b.phone}</a>}
        {b.email && <a className="adm-btn ghost sm" href={`mailto:${b.email}`}>Email {b.email}</a>}
        <a className="adm-btn ghost sm" href={`tel:${b.phone}`}>Call</a>
      </div>
      <div className="adm-grid2">
        <section className="adm-card">
          <h2>Client</h2>
          <Row k="Name" v={b.name} />
          <Row k="Phone / WhatsApp" v={b.phone} />
          <Row k="Email" v={b.email} />
          <Row k="Country" v={b.country} />
          <Row k="Client time zone" v={b.timezone} />
          <Row k="Currency" v={b.currency} />
          <h2 style={{ marginTop: 24 }}>Consultation</h2>
          <Row k="Service" v={SERVICE_LABEL[b.service] || b.service} />
          <Row k="Mode" v={MODE[b.mode] || b.mode} />
          <Row k="Preferred slot" v={b.preferredSlot} />
          <Row k="Payment" v={b.payment?.gateway ? `${b.payment.gateway}${b.payment.reference ? ` · ${b.payment.reference}` : ''}${b.payment.amount != null ? ` · ${money(b.payment.amount, b.currency)}` : ''}` : 'Not received yet'} />
        </section>
        <section className="adm-card">
          <h2>{kind === 'vastu' ? 'Property' : 'Birth details & question'}</h2>
          <Row k={b.service === 'kundli-milan' ? "Groom's date of birth" : 'Date of birth'} v={b.dob ? fmtDate(b.dob) : null} />
          <Row k={b.service === 'kundli-milan' ? "Groom's time of birth" : 'Time of birth'} v={b.tob} />
          <Row k={b.service === 'kundli-milan' ? "Groom's place of birth" : 'Place of birth'} v={b.pob} />
          <Row k="Gender" v={b.gender === 'purush' ? 'Male' : b.gender === 'mahila' ? 'Female' : null} />
          <Row k="KP number (1–249)" v={b.kpNumber} />
          <Row k="City at time of question" v={b.city} />
          <Row k="Property type" v={b.propertyType} />
          <Row k="Area" v={b.areaSqft ? `${b.areaSqft} sq.ft` : null} />
          <Row k={b.service === 'kundli-milan' ? "Bride's birth details" : 'Family members'} v={b.membersText && <span className="pre">{b.membersText}</span>} />
          {b.members?.length > 0 && <Row k="Members" v={b.members.map((m) => `${m.name || ''} ${m.dob || ''} ${m.tob || ''} ${m.pob || ''}`.trim()).join('\n')} />}
          <Row k="Question" v={b.question && <span className="pre">{b.question}</span>} />
          <Row k="Main concern" v={b.mainProblem && <span className="pre">{b.mainProblem}</span>} />
          <div className="adm-files">
            <FileBox id={b._id} field="thumbImpression" label="Thumb impression" name={b.thumbImpression} />
            <FileBox id={b._id} field="floorPlan" label="Floor plan" name={b.floorPlan} />
          </div>
        </section>
      </div>
      <section className="adm-card">
        <h2>Payment & notes</h2>
        <div className="adm-form-grid">
          <PaymentFields b={b} onSave={(p) => save(p).catch((e) => flash(e.message, 'err'))} />
        </div>
        <NotesBox value={b.adminNotes} onSave={(t) => save({ adminNotes: t }, 'Notes saved')} />
      </section>
    </>
  );
}

function PaymentFields({ b, onSave }) {
  const [ref, setRef] = useState(b.payment?.reference || '');
  const [amt, setAmt] = useState(b.payment?.amount ?? '');
  const [slot, setSlot] = useState(b.preferredSlot || '');
  return (
    <>
      <label className="adm-field"><span className="adm-label">Confirmed slot</span><input className="adm-input" value={slot} onChange={(e) => setSlot(e.target.value)} onBlur={() => slot !== (b.preferredSlot || '') && onSave({ preferredSlot: slot })} placeholder="e.g. 2026-11-04 16:00 IST" /></label>
      <label className="adm-field"><span className="adm-label">Payment reference (UPI / PayPal ID)</span><input className="adm-input" value={ref} onChange={(e) => setRef(e.target.value)} onBlur={() => ref !== (b.payment?.reference || '') && onSave({ paymentReference: ref })} /></label>
      <label className="adm-field"><span className="adm-label">Amount received ({b.currency})</span><input className="adm-input" type="number" min="0" value={amt} onChange={(e) => setAmt(e.target.value)} onBlur={() => String(amt) !== String(b.payment?.amount ?? '') && onSave({ paymentAmount: amt })} /></label>
    </>
  );
}
