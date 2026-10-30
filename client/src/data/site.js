// One place for contact details — fill these in once and every page updates.
export const SITE = {
  name: 'Pt. Rajneesh Sharma',
  tagline: 'Vedic · KP · Nadi · Vastu · Jaipur',
  whatsappNumber: '919928911181', // e.g. '919XXXXXXXXX' (country code, no +) — empty shows [NUMBER]
  email: 'astrologygovind@gmail.com', // e.g. 'contact@your-domain.com'
  address: 'Shyam Nagar Metro Station, opp. Pillar No. 118, New Sanganer Road, Sodala, Jaipur 302019',
  timings: 'Mon–Sat, 10am–7pm', // e.g. 'Mon–Sat, 10am–7pm'
  youtube: 'https://www.youtube.com/@PtRajneeshSharma',
  instagram: '#',
  facebook: '#',
  mapEmbedUrl: 'https://maps.google.com/maps?q=Shyam%20Nagar%20Metro%20Station%2C%20New%20Sanganer%20Road%2C%20Sodala%2C%20Jaipur%20302019&z=16&output=embed', // Google Maps embed URL
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Shyam%20Nagar%20Metro%20Station%2C%20New%20Sanganer%20Road%2C%20Sodala%2C%20Jaipur%20302019', // Google Maps share link (Directions button)
  grievanceName: '', // DPDP grievance officer name
  grievanceEmail: '',
  freeShippingAbove: null, // e.g. 999 (₹) — brief suggests a free-shipping threshold
};

export const waLink = (text = '') =>
  SITE.whatsappNumber ? `https://wa.me/${SITE.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}` : '#';

export const show = (v, placeholder) => (v ? v : placeholder);
