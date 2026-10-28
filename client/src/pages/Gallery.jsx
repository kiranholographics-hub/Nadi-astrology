import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageShell } from '../components/Layout.jsx';
import { Breadcrumb } from '../components/ui.jsx';
import PhotoRows from '../components/PhotoRows.jsx';
import { GALLERY, imgUrl } from '../data/gallery.js';
import { useT } from '../context/AppContext.jsx';

export default function Gallery() {
  const t = useT();
  const schema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Pt. Rajneesh Sharma — Photo Gallery',
    image: GALLERY.slice(0, 30).map((g) => ({ '@type': 'ImageObject', contentUrl: imgUrl(g), caption: t(g.alt, g.altHi) })),
  }), [t]);

  return (
    <PageShell
      title={{ en: 'Photo Gallery — Consultations, Nadi Leaves, Vastu, Pooja', hi: 'फोटो गैलरी — परामर्श, नाड़ी पट्टे, वास्तु, पूजा' }}
      description={{ en: 'Photos of Pt. Rajneesh Sharma’s work: consultations at the Jaipur office, clients from abroad, Nadi palm leaves, Vastu site visits, pooja-havan and pilgrimages.', hi: 'पं. रजनीश शर्मा के काम की तस्वीरें: जयपुर ऑफिस में परामर्श, विदेशी क्लाइंट, नाड़ी ताड़-पत्र, वास्तु साइट विज़िट, पूजा-हवन और तीर्थ यात्रा।' }}
      schema={schema}
      seed={151}
    >
      <section className="hero">
        <div className="wrap-wide stack" style={{ '--gap': '30px' }}>
          <Breadcrumb items={[{ label: { en: 'Gallery', hi: 'गैलरी' } }]} />
          <div className="row between rise" style={{ '--gap': '24px' }}>
            <h1 className="h1">{t('Photo', 'फोटो')} <em>{t('Gallery', 'गैलरी')}</em></h1>
            <p className="lead" style={{ maxWidth: 480 }}>{t('12 years of work — consultations at the Jaipur office, clients from around the world, Nadi leaves, Vastu site visits, pooja and pilgrimages.', '12 साल का काम — जयपुर ऑफिस में परामर्श, दुनिया भर के क्लाइंट, नाड़ी पट्टे, वास्तु साइट विज़िट, पूजा और तीर्थ यात्रा।')}</p>
          </div>
          <PhotoRows />
          <div className="row center" style={{ '--gap': '12px', justifyContent: 'center', paddingTop: 20 }}>
            <Link to="/book" className="btn">{t('Book Consultation', 'परामर्श बुक करें')}</Link>
            <Link to="/about" className="btn-ghost">{t('About Pandit ji', 'पंडित जी के बारे में')}</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
