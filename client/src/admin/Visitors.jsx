import { useEffect, useState } from 'react';
import { api } from './api.js';
import { countryName } from './format.js';
import { Empty, ErrorBox, Loading, PageHead, Stat } from './ui.jsx';

function Bars({ rows, total, label = (k) => k }) {
  if (!rows.length) return <Empty>No data yet.</Empty>;
  return (
    <table className="adm-table compact">
      <tbody>
        {rows.map((r) => {
          const pct = total ? Math.round((r.n / total) * 100) : 0;
          return (
            <tr key={String(r.key)}>
              <td>{label(r.key)}</td>
              <td className="num">{r.n.toLocaleString('en-IN')}</td>
              <td className="bar"><span style={{ width: `${Math.max(pct, 1)}%` }} /><small>{pct}%</small></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Daily({ rows, days }) {
  // fill missing days with 0
  const map = Object.fromEntries(rows.map((r) => [r.key, r.n]));
  const list = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() + 330 * 60000 - i * 864e5).toISOString().slice(0, 10);
    list.push([d, map[d] || 0]);
  }
  const max = Math.max(1, ...list.map(([, n]) => n));
  return (
    <div className="adm-chart" role="img" aria-label={`Visits per day, last ${days} days`}>
      {list.map(([d, n]) => (
        <span key={d} className="adm-col" title={`${d}: ${n} visits`}>
          <span style={{ height: `${(n / max) * 100}%` }} />
        </span>
      ))}
      <div className="adm-chart-axis"><small>{list[0][0]}</small><small>max {max}/day</small><small>{list[list.length - 1][0]}</small></div>
    </div>
  );
}

export default function Visitors() {
  const [days, setDays] = useState(30);
  const [d, setD] = useState(null);
  const [err, setErr] = useState('');
  useEffect(() => {
    setD(null);
    api.get(`/visitors?days=${days}`).then(setD).catch((e) => setErr(e.message));
  }, [days]);

  if (err) return <ErrorBox error={err} />;
  const known = d ? d.byCountry.filter((r) => r.key) : [];
  return (
    <>
      <PageHead
        title="Visitors"
        sub="Website par aane wale log — page views, desh, pages aur kahan se aaye. IP address save nahi hota."
        action={<select className="adm-input" style={{ width: 'auto' }} value={days} onChange={(e) => setDays(Number(e.target.value))} aria-label="Range">
          <option value={7}>Last 7 days</option><option value={30}>Last 30 days</option><option value={90}>Last 90 days</option><option value={365}>Last 12 months</option>
        </select>}
      />
      {!d ? <Loading /> : (
        <>
          <div className="adm-stats">
            <Stat n={d.inRange.toLocaleString('en-IN')} label={`Page views · ${days} days`} tone="gold" />
            <Stat n={d.unique.toLocaleString('en-IN')} label="Visitors (sessions)" />
            <Stat n={known[0] ? countryName(known[0].key) : '—'} label="Top country" />
            <Stat n={d.total.toLocaleString('en-IN')} label="Page views (all time)" />
          </div>
          <section className="adm-card"><h2>Visits per day</h2><Daily rows={d.byDay} days={Math.min(days, 90)} /></section>
          <div className="adm-grid2">
            <section className="adm-card">
              <h2>Visitors by country</h2>
              {known.length === 0 && d.inRange > 0 && <p className="adm-hint">Desh tabhi dikhega jab site Cloudflare (free) ke peeche ho, ya Nginx GeoIP lagaa ho — DEPLOY.md dekhein.</p>}
              <Bars rows={d.byCountry} total={d.inRange} label={countryName} />
            </section>
            <section className="adm-card">
              <h2>Top pages</h2>
              <Bars rows={d.byPath} total={d.inRange} label={(p) => <a href={p} target="_blank" rel="noreferrer">{p}</a>} />
            </section>
            <section className="adm-card">
              <h2>Came from</h2>
              <Bars rows={d.byReferrer.map((r) => ({ ...r, key: r.key || 'Direct / typed' }))} total={d.inRange} />
            </section>
            <section className="adm-card">
              <h2>Device</h2>
              <Bars rows={d.byDevice} total={d.inRange} label={(k) => (k === 'mobile' ? 'Mobile' : 'Desktop')} />
            </section>
          </div>
        </>
      )}
    </>
  );
}
