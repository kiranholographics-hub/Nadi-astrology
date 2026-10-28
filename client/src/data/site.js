// One place for contact details — fill these in once and every page updates.
export const SITE = {
  name: 'Pt. Rajneesh Sharma',
  tagline: 'Vedic · KP · Nadi · Vastu · Jaipur',
  whatsappNumber: '', // e.g. '919XXXXXXXXX' (country code, no +) — empty shows [NUMBER]
  email: '', // e.g. 'contact@your-domain.com'
  address: 'Shyam Nagar Metro Station, opp. Pillar No. 118, New Sanganer Road, Sodala, Jaipur 302019',
  timings: '', // e.g. 'Mon–Sat, 10am–7pm'
  youtube: '#',
  instagram: '#',
  facebook: '#',
  mapEmbedUrl: '', // Google Maps embed URL
  mapsLink: '', // Google Maps share link (Directions button)
  grievanceName: '', // DPDP grievance officer name
  grievanceEmail: '',
  freeShippingAbove: null, // e.g. 999 (₹) — brief suggests a free-shipping threshold
};

export const waLink = (text = '') =>
  SITE.whatsappNumber ? `https://wa.me/${SITE.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}` : '#';

export const show = (v, placeholder) => (v ? v : placeholder);
