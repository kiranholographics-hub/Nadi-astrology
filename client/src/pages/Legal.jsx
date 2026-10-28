import { Link } from 'react-router-dom';
import { PageShell } from '../components/Layout.jsx';
import { Breadcrumb } from '../components/ui.jsx';
import { LEGAL } from '../data/legal.js';
import { useT } from '../context/AppContext.jsx';

export default function Legal({ page }) {
  const t = useT();
  const doc = LEGAL[page];
  return (
    <PageShell title={doc.title} seed={149}>
      <section className="hero">
        <div className="wrap stack" style={{ maxWidth: 860, '--gap': '28px' }}>
          <Breadcrumb items={[{ label: doc.title }]} />
          <h1 className="h1 rise" style={{ fontSize: 'clamp(38px,4.6vw,60px)' }}>{t(doc.title)}</h1>
          <div className="small">{t('Draft · [Last updated: date]', 'ड्राफ़्ट · [अंतिम अपडेट: तारीख]')}</div>
          {doc.sections.map(([h, body]) => (
            <div key={h.en} className="stack" style={{ '--gap': '10px', paddingBottom: 22, borderBottom: '1px solid var(--line)' }}>
              <h2 className="h3" style={{ fontSize: 26 }}>{t(h)}</h2>
              <p className="body" style={{ fontSize: 16, color: 'var(--text-2)', lineHeight: 1.8 }}>{t(body)}</p>
            </div>
          ))}
          <div className="row" style={{ '--gap': '14px 24px', fontSize: 14 }}>
            {Object.entries(LEGAL).filter(([k]) => k !== page).map(([k, v]) => <Link key={k} to={`/${k}`}>{t(v.title)}</Link>)}
            <Link to="/contact">{t('Contact Us', 'संपर्क करें')}</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
