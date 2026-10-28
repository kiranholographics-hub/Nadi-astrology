import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '../components/Layout.jsx';
import { Breadcrumb } from '../components/ui.jsx';
import { PlusIcon } from '../components/Icons.jsx';
import { faqSchema } from '../components/seo.js';
import { FAQ_GROUPS } from '../data/faqs.js';
import { useT } from '../context/AppContext.jsx';

export default function FaqPage() {
  const t = useT();
  const schema = useMemo(() => faqSchema(FAQ_GROUPS.flatMap((g) => g.items).map(([q, a]) => [t(q), t(a)])), [t]);
  return (
    <PageShell title={{ en: 'Frequently Asked Questions', hi: 'अक्सर पूछे जाने वाले प्रश्न' }} description={{ en: 'Common questions about consultations, Nadi readings, Vastu and yantras.', hi: 'परामर्श, नाड़ी, वास्तु और यंत्र के बारे में अक्सर पूछे जाने वाले प्रश्न।' }} schema={schema} seed={131}>
      <section className="hero">
        <div className="wrap stack" style={{ maxWidth: 900, '--gap': '36px' }}>
          <Breadcrumb items={[{ label: { en: 'FAQ', hi: 'प्रश्न-उत्तर' } }]} />
          <h1 className="h1 rise">{t('Frequently Asked', 'अक्सर पूछे जाने वाले')} <em>{t('Questions', 'प्रश्न')}</em></h1>
          {FAQ_GROUPS.map((g) => (
            <div key={g.title.en} className="stack reveal" style={{ '--gap': '6px' }}>
              <div className="eyebrow">— {t(g.title)}</div>
              <div className="faq">
                {g.items.map(([q, a]) => <details key={q.en}><summary>{t(q)}<PlusIcon /></summary><p>{t(a)}</p></details>)}
              </div>
            </div>
          ))}
          <div className="row reveal" style={{ '--gap': '12px' }}>
            <Link to="/contact" className="btn">{t('Ask your question', 'अपना प्रश्न पूछें')}</Link>
            <Link to="/book" className="btn-ghost">{t('Book Consultation', 'परामर्श बुक करें')}</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
