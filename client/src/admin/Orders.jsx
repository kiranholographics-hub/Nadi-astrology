import { Fragment, useEffect, useMemo, useState } from 'react';
import { api } from './api.js';
import { ORDER_STATUS, fmtDateTime, money, waUrl } from './format.js';
import { Empty, ErrorBox, Loading, NotesBox, PageHead, Stat, StatusSelect, useFlash } from './ui.jsx';

export default function Orders() {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState('');
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(null);
  const [toast, flash] = useFlash();

  useEffect(() => { api.get('/orders').then((d) => setItems(d.items)).catch((e) => setErr(e.message)); }, []);
  const counts = useMemo(() => (items || []).reduce((c, o) => ({ ...c, [o.status]: (c[o.status] || 0) + 1 }), {}), [items]);
  const list = (items || []).filter((o) => !status || o.status === status);

  async function save(id, patch, msg = 'Saved') {
    try {
      const { item } = await api.patch(`/orders/${id}`, patch);
      setItems((xs) => xs.map((x) => (x._id === id ? item : x)));
      flash(msg);
    } catch (e) {
      flash(e.message, 'err');
      throw e;
    }
  }

  if (err) return <ErrorBox error={err} />;
  if (!items) return <Loading />;
  return (
    <>
      {toast}
      <PageHead title="Yantra orders" sub="Payment aate hi status 'Paid' karein; courier aur tracking number daal kar 'Dispatched'." />
      <div className="adm-stats">
        <Stat n={items.length} label="All" onClick={() => setStatus('')} active={!status} />
        <Stat n={counts.pending_payment || 0} label="Pending payment" onClick={() => setStatus('pending_payment')} active={status === 'pending_payment'} />
        <Stat n={counts.paid || 0} label="To dispatch" tone="gold" onClick={() => setStatus('paid')} active={status === 'paid'} />
        <Stat n={counts.dispatched || 0} label="Dispatched" onClick={() => setStatus('dispatched')} active={status === 'dispatched'} />
      </div>
      <div className="adm-card flush">
        {list.length === 0 ? <Empty>{items.length ? 'No orders with this status.' : 'No yantra orders yet.'}</Empty> : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Date</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {list.map((o) => {
                  const isOpen = open === o._id;
                  return (
                    <Fragment key={o._id}>
                      <tr className="click" onClick={() => setOpen(isOpen ? null : o._id)} aria-expanded={isOpen}>
                        <td className="nowrap">{fmtDateTime(o.createdAt)}<small>#{String(o._id).slice(-6).toUpperCase()}</small></td>
                        <td><b>{o.customer?.name}</b><small>{o.customer?.phone} · {o.customer?.country}</small></td>
                        <td>{o.items.map((i, k) => <span key={k} className="adm-line">{i.qty} × {i.name} <small className="inline">({i.size}{i.sankalp ? ', sankalp' : ''})</small></span>)}</td>
                        <td className="nowrap"><b>{money(o.subtotal, o.currency)}</b></td>
                        <td><StatusSelect value={o.status} options={ORDER_STATUS} onChange={(v) => save(o._id, { status: v }, 'Status updated').catch(() => {})} /></td>
                      </tr>
                      {isOpen && (
                        <tr className="adm-expand"><td colSpan={5}><OrderDetail o={o} onSave={(p, m) => save(o._id, p, m)} /></td></tr>
                      )}
                    </Fragment>
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

function OrderDetail({ o, onSave }) {
  const [courier, setCourier] = useState(o.courier || '');
  const [tracking, setTracking] = useState(o.trackingNumber || '');
  const [pay, setPay] = useState(o.payment?.reference || '');
  const c = o.customer || {};
  const wa = waUrl(c.phone, `Namaste ${c.name}, your yantra order #${String(o._id).slice(-6).toUpperCase()} from Pt. Rajneesh Sharma${tracking ? ` has been dispatched${courier ? ` via ${courier}` : ''}. Tracking: ${tracking}` : ''}.`);
  return (
    <div className="adm-grid2 tight">
      <div>
        <span className="adm-label">Ship to</span>
        <p className="adm-address">{c.name}<br />{c.address}<br />{[c.city, c.pincode].filter(Boolean).join(' ')}<br />{c.country}<br />{c.phone}{c.email ? <><br />{c.email}</> : null}</p>
        {o.items.filter((i) => i.sankalp).map((i, k) => <p key={k} className="adm-hint">Sankalp for {i.name}: <b>{i.sankalpName || '—'}</b>, gotra <b>{i.gotra || '—'}</b></p>)}
        <div className="adm-row">
          {wa && <a className="adm-btn primary sm" href={wa} target="_blank" rel="noreferrer">WhatsApp customer</a>}
          {c.email && <a className="adm-btn ghost sm" href={`mailto:${c.email}`}>Email</a>}
        </div>
      </div>
      <div className="adm-form-grid one">
        <label className="adm-field"><span className="adm-label">Payment reference</span><input className="adm-input" value={pay} onChange={(e) => setPay(e.target.value)} onBlur={() => pay !== (o.payment?.reference || '') && onSave({ paymentReference: pay }).catch(() => {})} /></label>
        <label className="adm-field"><span className="adm-label">Courier</span><input className="adm-input" value={courier} placeholder="e.g. DTDC, India Post, DHL" onChange={(e) => setCourier(e.target.value)} onBlur={() => courier !== (o.courier || '') && onSave({ courier }).catch(() => {})} /></label>
        <label className="adm-field"><span className="adm-label">Tracking number</span><input className="adm-input" value={tracking} onChange={(e) => setTracking(e.target.value)} onBlur={() => tracking !== (o.trackingNumber || '') && onSave({ trackingNumber: tracking }).catch(() => {})} /></label>
        <NotesBox value={o.adminNotes} onSave={(t) => onSave({ adminNotes: t }, 'Notes saved')} />
      </div>
    </div>
  );
}
