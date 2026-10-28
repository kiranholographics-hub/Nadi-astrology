// Public URLs for sitemap.xml (keep in sync with client/src/App.jsx)
export const STATIC_PAGES = [
  ['/', 1.0], ['/nadi-astrology', 0.9], ['/vedic-astrology', 0.9], ['/kundli-milan', 0.8], ['/kp-prashna', 0.9],
  ['/vastu-consultant-jaipur', 0.9], ['/online-vastu-consultation', 0.8], ['/yantra-shop', 0.9], ['/videos', 0.6], ['/gallery', 0.6],
  ['/about', 0.7], ['/contact', 0.6], ['/faq', 0.5], ['/blog', 0.6], ['/book', 0.7],
  ['/privacy-policy', 0.2], ['/terms', 0.2], ['/refund-policy', 0.2], ['/shipping-policy', 0.2],
];

// Blog post slugs (keep in sync with client/src/data/blog.js) — used for sitemap.xml and 404 detection.
export const BLOG_SLUGS = ['what-is-nadi-astrology', 'vaitheeswaran-koil-nadi-tradition', 'vastu-remedies-without-demolition', 'kp-prashna-number-1-249'];

// Client-side routes that exist but are not in the sitemap.
export const OTHER_ROUTES = ['/cart'];
