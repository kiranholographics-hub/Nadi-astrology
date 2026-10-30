import { Fragment, useEffect, useMemo, useState } from 'react';
import { api } from './api.js';
import { LEAD_STATUS, LEAD_TYPE, fmtDateTime, waUrl } from './format.js';
import { Empty, ErrorBox, Loading, NotesBox, PageHead, Stat, StatusSelect, useFlash } from './ui.jsx';

export default function Enquiries() {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState('');
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(null);
  const [toast, flash] = useFlash();

  useEffect(() => { api.get('/leads').then((d) => setItems(d.items)).catch((e) => setErr(e.message)); }, []);
  const counts = useMemo(() => (items || []).reduce((c, l) => ({ ...c, [l.status]: (c[l.status] || 0) + 1 }), {}), [items]);
  const list = (items || []).filter((l) => !status || l.status === status);

  async function save(id, patch, msg = 'Saved') {
    const { item } = await api.patch(`/leads/${id}`, patch);
    setItems((xs) => xs.map((x) => (x._id === id ? item : x)));
    flash(msg);
  }

  if (err) return <ErrorBox error={err} />;
  if (!items) return <Loading />;
  return (
    <>
      {toast}
      <PageHead title="Enquiries" sub="Contact form, '10 min free yantra salaah' aur office visit requests." />
      <div className="adm-stats">
        <Stat n={items.length} label="All" onClick={() => setStatus('')} active={!status} />
        <Stat n={counts.new || 0} label="New" tone="gold" onClick={() => setStatus('new')} active={status === 'new'} />
        <Stat n={counts.contacted || 0} label="Contacted" onClick={() => setStatus('contacted')} active={status === 'contacted'} />
        <Stat n={counts.closed || 0} label="Closed" onClick={() => setStatus('closed')} active={status === 'closed'} />
      </div>
      <div className="adm-card flush">
        {list.length === 0 ? <Empty>{items.length ? 'No enquiries with this status.' : 'No enquiries yet.'}</Empty> : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead><tr><th>Date</th><th>Name</th><th>Type</th><th>Message</th><th>Status</th></tr></thead>
              <tbody>
                {list.map((l) => {
                  const isOpen = open === l._id;
                  const wa = waUrl(l.phone, `Namaste ${l.name}, this is Pt. Rajneesh Sharma's office replying to your message.`);
                  return (
                    <Fragment key={l._id}>
                      <tr className="click" onClick={() => setOpen(isOpen ? null : l._id)} aria-expanded={isOpen}>
                        <td className="nowrap">{fmtDateTime(l.createdAt)}</td>
                        <td><b>{l.name}</b><small>{l.phone}{l.country ? ` · ${l.country}` : ''}</small></td>
                        <td>{LEAD_TYPE[l.type] || l.type}</td>
                        <td className="adm-msgcell">{l.message || '—'}</td>
                        <td><StatusSelect value={l.status} options={LEAD_STATUS} onChange={(v) => save(l._id, { status: v }, 'Status updated').catch((e) => flash(e.message, 'err'))} /></td>
                      </tr>
                      {isOpen && (
                        <tr className="adm-expand"><td colSpan={5}>
                          <div className="adm-grid2 tight">
                            <div>
                              <span className="adm-label">Message</span>
                              <p className="pre adm-address">{l.message || '—'}</p>
                              <div className="adm-row">
                                {wa && <a className="adm-btn primary sm" href={wa} target="_blank" rel="noreferrer">WhatsApp {l.phone}</a>}
                                {l.email && <a className="adm-btn ghost sm" href={`mailto:${l.email}`}>Email {l.email}</a>}
                              </div>
                            </div>
                            <NotesBox value={l.adminNotes} onSave={(t) => save(l._id, { adminNotes: t }, 'Notes saved')} />
                          </div>
                        </td></tr>
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
