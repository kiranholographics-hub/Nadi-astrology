import { useEffect, useRef, useState } from 'react';
import { useApp, useT } from '../context/AppContext.jsx';

// English + Hindi are written by hand (see useT). Every other language is
// machine-translated from the English page by Google Translate.
export const AUTO_LANGS = [
  ['de', 'Deutsch'], ['fr', 'Français'], ['es', 'Español'], ['it', 'Italiano'],
  ['pt', 'Português'], ['nl', 'Nederlands'], ['ru', 'Русский'], ['pl', 'Polski'],
  ['ar', 'العربية'], ['tr', 'Türkçe'], ['ja', '日本語'], ['zh-CN', '中文 (简体)'],
  ['ko', '한국어'], ['th', 'ไทย'], ['vi', 'Tiếng Việt'], ['id', 'Bahasa Indonesia'],
  ['ms', 'Bahasa Melayu'], ['ne', 'नेपाली'], ['ta', 'தமிழ்'], ['te', 'తెలుగు'],
  ['gu', 'ગુજરાતી'], ['mr', 'मराठी'], ['bn', 'বাংলা'], ['pa', 'ਪੰਜਾਬੀ'],
];
const CODES = AUTO_LANGS.map(([c]) => c);

function readCookieLang() {
  try {
    const m = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]*\/([^;]+)/);
    const code = m ? decodeURIComponent(m[1]) : '';
    return CODES.includes(code) ? code : '';
  } catch {
    return '';
  }
}

function setCookie(value) {
  const host = window.location.hostname;
  const parts = host.split('.');
  const domains = ['', host, parts.length > 1 ? `.${parts.slice(-2).join('.')}` : ''];
  domains.forEach((d) => {
    const dom = d ? `;domain=${d}` : '';
    document.cookie = value
      ? `googtrans=${value};path=/${dom}`
      : `googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${dom}`;
  });
}

let scriptPromise;
function loadGoogle() {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (!document.getElementById('gt-host')) {
      const host = document.createElement('div');
      host.id = 'gt-host';
      host.style.display = 'none';
      document.body.appendChild(host);
    }
    window.googleTranslateElementInit = () => {
      // eslint-disable-next-line no-new
      new window.google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: CODES.join(','), autoDisplay: false }, 'gt-host');
      resolve();
    };
    const s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    s.onerror = () => { scriptPromise = null; reject(new Error('Translator could not load')); };
    document.head.appendChild(s);
  });
  return scriptPromise;
}

// Google's widget keeps a hidden <select>; changing it translates the page in place.
function applyCombo(code, tries = 40) {
  const combo = document.querySelector('#gt-host select.goog-te-combo');
  if (combo && combo.options.length > 1) {
    combo.value = code;
    combo.dispatchEvent(new Event('change'));
    return;
  }
  if (tries > 0) setTimeout(() => applyCombo(code, tries - 1), 150);
}

export default function LanguageSwitcher() {
  const { lang, setLang } = useApp();
  const t = useT();
  const [auto, setAuto] = useState(readCookieLang);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState('');
  const box = useRef(null);

  // A visitor who chose e.g. Deutsch earlier: translate again on the next visit.
  useEffect(() => {
    if (auto) {
      if (lang !== 'en') setLang('en');
      loadGoogle().then(() => applyCombo(auto)).catch(() => setErr('x'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => { if (box.current && !box.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, [open]);

  function pickManual(code) {
    setOpen(false);
    setLang(code);
    if (auto) {
      // Leaving a machine translation: clear it and reload the clean page.
      setCookie('');
      try { localStorage.setItem('ptrs.lang', JSON.stringify(code)); } catch { /* ignore */ }
      window.location.reload();
    }
  }

  function pickAuto(code) {
    setOpen(false);
    setErr('');
    setLang('en'); // always translate from the English text
    setCookie(`/en/${code}`);
    setAuto(code);
    loadGoogle().then(() => applyCombo(code)).catch(() => setErr('x'));
  }

  const current = auto ? AUTO_LANGS.find(([c]) => c === auto)?.[1] : lang === 'hi' ? 'हिंदी' : 'English';

  return (
    <div className="lang-switch notranslate" translate="no" ref={box}>
      <button type="button" className="lang-btn" aria-haspopup="listbox" aria-expanded={open} aria-label={t('Choose language', 'भाषा चुनें')} onClick={() => setOpen((o) => !o)}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9.5" /><path d="M2.5 12h19M12 2.5c2.6 2.8 3.9 6 3.9 9.5S14.6 18.7 12 21.5M12 2.5C9.4 5.3 8.1 8.5 8.1 12s1.3 6.7 3.9 9.5" /></svg>
        <span>{current}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
      </button>
      {open && (
        <div className="lang-menu" role="listbox" aria-label={t('Languages', 'भाषाएँ')}>
          {[['en', 'English'], ['hi', 'हिंदी']].map(([c, label]) => (
            <button key={c} type="button" role="option" aria-selected={!auto && lang === c} className={!auto && lang === c ? 'on' : ''} onClick={() => pickManual(c)}>{label}</button>
          ))}
          <div className="lang-sep">{t('Auto-translated (Google)', 'अपने-आप अनुवाद (Google)')}</div>
          <div className="lang-grid">
            {AUTO_LANGS.map(([c, label]) => (
              <button key={c} type="button" role="option" lang={c} dir={c === 'ar' ? 'rtl' : undefined} aria-selected={auto === c} className={auto === c ? 'on' : ''} onClick={() => pickAuto(c)}>{label}</button>
            ))}
          </div>
        </div>
      )}
      {err && <span className="lang-err" role="status">{t('Translation is not available right now.', 'अनुवाद अभी उपलब्ध नहीं है।')}</span>}
    </div>
  );
}
