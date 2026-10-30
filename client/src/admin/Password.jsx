import { useState } from 'react';
import { api } from './api.js';
import { PageHead } from './ui.jsx';

export default function Password() {
  const [state, setState] = useState({ type: '', msg: '' });
  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form));
    if (f.next !== f.again) return setState({ type: 'err', msg: 'New passwords do not match.' });
    if (f.next.length < 10) return setState({ type: 'err', msg: 'Use at least 10 characters.' });
    try {
      await api.post('/password', { current: f.current, next: f.next });
      form.reset();
      setState({ type: 'ok', msg: 'Password changed. Doosre sab devices se logout ho gaya.' });
    } catch (e2) {
      setState({ type: 'err', msg: e2.message });
    }
  }
  return (
    <>
      <PageHead title="Change password" />
      <form className="adm-card narrow" onSubmit={submit}>
        <p className="adm-hint">Kam se kam 10 characters. Badalne par baaki sab devices se logout ho jaata hai.</p>
        <label className="adm-field"><span className="adm-label">Current password</span><input className="adm-input" name="current" type="password" autoComplete="current-password" required /></label>
        <label className="adm-field"><span className="adm-label">New password</span><input className="adm-input" name="next" type="password" autoComplete="new-password" minLength={10} required /></label>
        <label className="adm-field"><span className="adm-label">New password again</span><input className="adm-input" name="again" type="password" autoComplete="new-password" minLength={10} required /></label>
        {state.msg && <div className={`adm-msg ${state.type}`} role="status">{state.msg}</div>}
        <button className="adm-btn primary" type="submit">Change password</button>
      </form>
    </>
  );
}
