import { useMemo } from 'react';
import { Link } from '../components/LangLink.jsx';
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
    <PageShell title={{ en: 'FAQ — Nadi Reading, Astrology Consultation, Vastu & Yantra', hi: 'प्रश्न-उत्तर — नाड़ी रीडिंग, ज्योतिष परामर्श, वास्तु और यंत्र' }} description={{ en: 'Answers to common questions: how a Nadi palm leaf reading works, online astrology consultation, birth time, Vastu without demolition, yantra shipping and payment.', hi: 'आम सवालों के जवाब: नाड़ी ताड़-पत्र रीडिंग कैसे होती है, ऑनलाइन ज्योतिष परामर्श, जन्म समय, बिना तोड़-फोड़ वास्तु, यंत्र शिपिंग और भुगतान।' }} schema={schema} seed={131}>
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
