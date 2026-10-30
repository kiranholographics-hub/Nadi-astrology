import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from './api.js';
import { BOOKING_STATUS, LEAD_STATUS, LEAD_TYPE, ORDER_STATUS, SERVICE_LABEL, fmtDateTime, money } from './format.js';
import { Badge, Empty, ErrorBox, Loading, PageHead, Stat } from './ui.jsx';

const label = (list, v) => list.find(([k]) => k === v)?.[1] || v;
const sum = (o = {}, keys) => keys.reduce((n, k) => n + (o[k] || 0), 0);

export default function Dashboard() {
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  useEffect(() => { api.get('/stats').then(setD).catch((e) => setErr(e.message)); }, []);
  if (err) return <ErrorBox error={err} />;
  if (!d) return <Loading />;

  const totalBookings = Object.values(d.bookings).reduce((a, b) => a + b, 0);
  return (
    <>
      <PageHead title="Dashboard" sub="Aaj kya pending hai — ek nazar mein." />
      {d.yantrasMissingPrice > 0 && (
        <Link to="/admin/yantras" className="adm-alert">
          <b>{d.yantrasMissingPrice} yantras have no price yet.</b> Customers cannot check out until ₹ and $ prices are added. Add prices →
        </Link>
      )}
      <div className="adm-stats">
        <Stat n={sum(d.bookings, ['new', 'awaiting_payment'])} label="Bookings awaiting payment" tone="gold" />
        <Stat n={sum(d.bookings, ['paid', 'scheduled'])} label="Consultations to do" />
        <Stat n={d.orders.paid || 0} label="Yantra orders to dispatch" />
        <Stat n={d.leads.new || 0} label="New enquiries" />
      </div>
      <div className="adm-stats">
        <Stat n={d.visits.today} label="Visits today" />
        <Stat n={d.visits.last7} label="Visits · last 7 days" />
        <Stat n={d.visits.last30} label="Visits · last 30 days" />
        <Stat n={totalBookings} label="Bookings (all time)" />
      </div>

      <div className="adm-grid2">
        <section className="adm-card">
          <div className="adm-card-head"><h2>Latest bookings</h2><Link to="/admin/bookings">All →</Link></div>
          {d.recentBookings.length === 0 ? <Empty>No bookings yet.</Empty> : (
            <ul className="adm-list">
              {d.recentBookings.map((b) => (
                <li key={b._id}><Link to={`/admin/bookings/${b._id}`}>
                  <span><b>{b.name}</b><small>{SERVICE_LABEL[b.service] || b.service}{b.country ? ` · ${b.country}` : ''}</small></span>
                  <span className="adm-right"><Badge tone={b.status}>{label(BOOKING_STATUS, b.status)}</Badge><small>{fmtDateTime(b.createdAt)}</small></span>
                </Link></li>
              ))}
            </ul>
          )}
        </section>
        <section className="adm-card">
          <div className="adm-card-head"><h2>Latest yantra orders</h2><Link to="/admin/orders">All →</Link></div>
          {d.recentOrders.length === 0 ? <Empty>No orders yet.</Empty> : (
            <ul className="adm-list">
              {d.recentOrders.map((o) => (
                <li key={o._id}><Link to="/admin/orders">
                  <span><b>{o.customer?.name}</b><small>{money(o.subtotal, o.currency)}{o.customer?.country ? ` · ${o.customer.country}` : ''}</small></span>
                  <span className="adm-right"><Badge tone={o.status}>{label(ORDER_STATUS, o.status)}</Badge><small>{fmtDateTime(o.createdAt)}</small></span>
                </Link></li>
              ))}
            </ul>
          )}
          <div className="adm-card-head" style={{ marginTop: 22 }}><h2>Latest enquiries</h2><Link to="/admin/enquiries">All →</Link></div>
          {d.recentLeads.length === 0 ? <Empty>No enquiries yet.</Empty> : (
            <ul className="adm-list">
              {d.recentLeads.map((l) => (
                <li key={l._id}><Link to="/admin/enquiries">
                  <span><b>{l.name}</b><small>{LEAD_TYPE[l.type] || l.type}{l.country ? ` · ${l.country}` : ''}</small></span>
                  <span className="adm-right"><Badge tone={l.status}>{label(LEAD_STATUS, l.status)}</Badge><small>{fmtDateTime(l.createdAt)}</small></span>
                </Link></li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
