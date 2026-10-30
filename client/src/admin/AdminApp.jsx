import { useCallback, useEffect, useState } from 'react';
import { NavLink, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { api } from './api.js';
import Dashboard from './Dashboard.jsx';
import Bookings, { BookingDetail } from './Bookings.jsx';
import Orders from './Orders.jsx';
import Enquiries from './Enquiries.jsx';
import Yantras, { YantraEdit } from './Yantras.jsx';
import Visitors from './Visitors.jsx';
import Countries, { CountryEdit } from './Countries.jsx';
import Posts, { PostEdit } from './Posts.jsx';
import Password from './Password.jsx';
import './admin.css';

const NAV = [
  ['', 'Dashboard', 'M3 12l9-8 9 8M5 10v10h5v-6h4v6h5V10'],
  ['bookings', 'Bookings', 'M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z'],
  ['orders', 'Yantra orders', 'M4 7h16l-1.5 12.5a1 1 0 01-1 .5h-11a1 1 0 01-1-.5zM9 7V5a3 3 0 016 0v2'],
  ['enquiries', 'Enquiries', 'M4 6h16v12H4zM4 7l8 6 8-6'],
  ['yantras', 'Yantras', 'M12 3l9 16H3zM12 21L3 5h18z'],
  ['blog', 'Blog posts', 'M4 5h16M4 10h16M4 15h10M4 20h7'],
  ['countries', 'Countries', 'M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2zM9 4v14M15 6v14'],
  ['visitors', 'Visitors', 'M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9S14.5 18.3 12 21M12 3C9.5 5.7 8.2 8.7 8.2 12s1.3 6.3 3.8 9'],
  ['password', 'Change password', 'M7 11V8a5 5 0 0110 0v3M5 11h14v10H5z'],
];

function Icon({ d }) {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;
}

function Login({ onDone }) {
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    setBusy(true);
    setErr('');
    try {
      onDone(await api.post('/login', f));
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="adm-login">
      <form className="adm-login-card" onSubmit={submit}>
        <span className="adm-mark" aria-hidden="true"><svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="#D9B26F"><circle cx="20" cy="20" r="18" /><circle cx="20" cy="20" r="11" strokeDasharray="1.5 3" /><circle cx="20" cy="20" r="3" fill="#D9B26F" /></svg></span>
        <span className="adm-kicker">Pt. Rajneesh Sharma</span>
        <h1>Admin sign in</h1>
        <label className="adm-field"><span className="adm-label">Email</span><input className="adm-input" name="email" type="email" autoComplete="username" required /></label>
        <label className="adm-field"><span className="adm-label">Password</span><input className="adm-input" name="password" type="password" autoComplete="current-password" required /></label>
        {err && <div className="adm-msg err" role="alert">{err}</div>}
        <button className="adm-btn primary" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
        <a className="adm-back" href="/">← Back to website</a>
      </form>
    </div>
  );
}

export default function AdminApp() {
  const [me, setMe] = useState(undefined); // undefined = checking, null = logged out
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = 'Admin | Pt. Rajneesh Sharma';
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex, nofollow';
    api.get('/me').then(setMe).catch(() => setMe(null));
    const out = () => setMe(null);
    window.addEventListener('admin:logout', out);
    return () => window.removeEventListener('admin:logout', out);
  }, []);
  useEffect(() => setMenu(false), [pathname]);

  const logout = useCallback(async () => {
    await api.post('/logout').catch(() => {});
    setMe(null);
  }, []);

  if (me === undefined) return <div className="adm notranslate" translate="no"><div className="adm-login"><span className="adm-sub">Loading…</span></div></div>;
  if (!me) return <div className="adm notranslate" translate="no"><Login onDone={setMe} /></div>;

  return (
    <div className={`adm notranslate${menu ? ' menu-open' : ''}`} translate="no">
      <aside className="adm-side">
        <div className="adm-brand">
          <span className="adm-mark" aria-hidden="true"><svg viewBox="0 0 40 40" width="30" height="30" fill="none" stroke="#D9B26F"><circle cx="20" cy="20" r="18" /><circle cx="20" cy="20" r="11" strokeDasharray="1.5 3" /><circle cx="20" cy="20" r="3" fill="#D9B26F" /></svg></span>
          <span><b>Pt. Rajneesh Sharma</b><small>Admin</small></span>
        </div>
        <nav className="adm-nav" aria-label="Admin">
          {NAV.map(([to, label, d]) => (
            <NavLink key={to} to={`/admin${to ? `/${to}` : ''}`} end={!to}><Icon d={d} />{label}</NavLink>
          ))}
        </nav>
        <a className="adm-live" href="/" target="_blank" rel="noreferrer">↗ View live site</a>
      </aside>
      <div className="adm-main">
        <header className="adm-top">
          <button type="button" className="adm-burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>☰</button>
          <span className="adm-who"><span className="adm-avatar">{me.email[0].toUpperCase()}</span>{me.email}</span>
          <button type="button" className="adm-btn ghost sm" onClick={logout}>Sign out</button>
        </header>
        <main className="adm-content">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:id" element={<BookingDetail />} />
            <Route path="orders" element={<Orders />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="yantras" element={<Yantras />} />
            <Route path="yantras/:id" element={<YantraEdit />} />
            <Route path="blog" element={<Posts />} />
            <Route path="blog/:id" element={<PostEdit />} />
            <Route path="countries" element={<Countries />} />
            <Route path="countries/:id" element={<CountryEdit />} />
            <Route path="visitors" element={<Visitors />} />
            <Route path="password" element={<Password />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
      <button type="button" className="adm-scrim" aria-label="Close menu" onClick={() => setMenu(false)} />
    </div>
  );
}
