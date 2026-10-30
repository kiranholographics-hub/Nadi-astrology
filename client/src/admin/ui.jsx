import { useEffect, useState } from 'react';

export function PageHead({ title, sub, action }) {
  return (
    <div className="adm-head">
      <div>
        <h1>{title}</h1>
        {sub && <p className="adm-sub">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Stat({ n, label, tone, onClick, active }) {
  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag type={onClick ? 'button' : undefined} className={`adm-stat${tone ? ` ${tone}` : ''}${active ? ' on' : ''}`} onClick={onClick} aria-pressed={onClick ? !!active : undefined}>
      <span className="adm-stat-n">{n ?? '—'}</span>
      <span className="adm-stat-l">{label}</span>
    </Tag>
  );
}

export function StatusSelect({ value, options, onChange, disabled, label = 'Status' }) {
  return (
    <select className={`adm-status s-${value}`} value={value} disabled={disabled} aria-label={label} onChange={(e) => onChange(e.target.value)} onClick={(e) => e.stopPropagation()}>
      {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
    </select>
  );
}

export function Badge({ children, tone }) {
  return <span className={`adm-badge${tone ? ` ${tone}` : ''}`}>{children}</span>;
}

export function Empty({ children }) {
  return <div className="adm-empty">{children}</div>;
}

export function Loading() {
  return <div className="adm-empty">Loading…</div>;
}

export function ErrorBox({ error }) {
  return error ? <div className="adm-msg err" role="alert">{error}</div> : null;
}

// Tiny toast for "Saved" messages
export function useFlash() {
  const [msg, setMsg] = useState(null);
  useEffect(() => {
    if (!msg) return undefined;
    const id = setTimeout(() => setMsg(null), 2600);
    return () => clearTimeout(id);
  }, [msg]);
  const el = msg ? <div className={`adm-toast ${msg.type}`} role="status">{msg.text}</div> : null;
  return [el, (text, type = 'ok') => setMsg({ text, type })];
}

export function Field({ label, hint, children, wide }) {
  return (
    <label className={`adm-field${wide ? ' wide' : ''}`}>
      <span className="adm-label">{label}</span>
      {children}
      {hint && <span className="adm-hint">{hint}</span>}
    </label>
  );
}

// Notes box that saves on blur
export function NotesBox({ value, onSave, placeholder = 'Private notes — only visible in admin' }) {
  const [text, setText] = useState(value || '');
  const [state, setState] = useState('');
  useEffect(() => setText(value || ''), [value]);
  async function save() {
    if (text === (value || '')) return;
    setState('Saving…');
    try {
      await onSave(text);
      setState('Saved');
    } catch (e) {
      setState(e.message);
    }
  }
  return (
    <div className="adm-notes">
      <textarea className="adm-input" rows={4} value={text} placeholder={placeholder} onChange={(e) => { setText(e.target.value); setState(''); }} onBlur={save} />
      <span className="adm-hint">{state || 'Saves automatically when you click outside the box.'}</span>
    </div>
  );
}
