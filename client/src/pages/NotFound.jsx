import { Link } from 'react-router-dom';
import { PageShell } from '../components/Layout.jsx';
import { useT } from '../context/AppContext.jsx';

export default function NotFound() {
  const t = useT();
  return (
    <PageShell title={{ en: 'Page not found', hi: 'पेज नहीं मिला' }} seed={97}>
      <section className="hero" style={{ padding: '140px 0' }}>
        <div className="wrap stack" style={{ '--gap': '24px', alignItems: 'flex-start' }}>
          <div className="eyebrow-lg">— 404</div>
          <h1 className="h1">{t('This page', 'यह पेज')} <em>{t('was not found.', 'नहीं मिला।')}</em></h1>
          <p className="lead">{t('The link may be out of date. Please go back to the home page and try again.', 'लिंक पुराना हो सकता है। होम पेज पर जाकर दोबारा देखें।')}</p>
          <Link to="/" className="btn">{t('Go to Home', 'होम पर जाएँ')}</Link>
        </div>
      </section>
    </PageShell>
  );
}
