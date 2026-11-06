// Language in the URL: English pages live at /…, Hindi pages at /hi/…
// so Google can index both (with hreflang). The admin, API and uploads stay unprefixed.

export const HI_PREFIX = '/hi';

export const langOfPath = (pathname) => (pathname === HI_PREFIX || pathname.startsWith(`${HI_PREFIX}/`) ? 'hi' : 'en');

// "/hi/kundli-milan" → "/kundli-milan", "/hi" → "/"
export const stripLang = (pathname) => (langOfPath(pathname) === 'hi' ? pathname.slice(HI_PREFIX.length) || '/' : pathname);

const localizable = (path) => path.startsWith('/') && !path.startsWith('//') && !/^\/(admin|api|uploads)(\/|$)/.test(path);

// Prefix an internal path for the given language ("/book?x=1#f" → "/hi/book?x=1#f").
export function withLang(to, lang) {
  if (typeof to === 'object' && to) return { ...to, pathname: to.pathname ? withLang(to.pathname, lang) : to.pathname };
  if (typeof to !== 'string' || !localizable(to)) return to;
  const bare = stripLang(to.replace(/[?#].*$/, '')) + (to.match(/[?#].*$/)?.[0] || '');
  if (lang !== 'hi') return bare;
  return bare === '/' ? HI_PREFIX : bare.startsWith('/?') || bare.startsWith('/#') ? `${HI_PREFIX}${bare.slice(1)}` : `${HI_PREFIX}${bare}`;
}

// Internal links inside article HTML (href="/…") → Hindi URLs.
export const localizeHtml = (html, lang) =>
  lang === 'hi' ? String(html || '').replace(/href="(\/(?!\/|admin|api|uploads|hi\/)[^"]*)"/g, (_m, p) => `href="${withLang(p, 'hi')}"`) : html;
