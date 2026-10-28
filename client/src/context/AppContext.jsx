import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — keep in memory only */
  }
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => load('ptrs.lang', 'en'));
  const [currency, setCurrency] = useState(() => load('ptrs.currency', 'INR'));
  const [cart, setCart] = useState(() => load('ptrs.cart', []));
  const [toast, setToast] = useState('');

  useEffect(() => save('ptrs.lang', lang), [lang]);
  useEffect(() => save('ptrs.currency', currency), [currency]);
  useEffect(() => save('ptrs.cart', cart), [cart]);
  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
  }, [lang]);

  const notify = useCallback((msg) => {
    setToast(msg);
    window.clearTimeout(notify._t);
    notify._t = window.setTimeout(() => setToast(''), 2400);
  }, []);

  const addToCart = useCallback(
    (item) => {
      setCart((c) => {
        const key = `${item.slug}|${item.size || ''}|${item.sankalp ? 1 : 0}`;
        const existing = c.find((x) => x.key === key);
        if (existing) return c.map((x) => (x.key === key ? { ...x, qty: Math.min(20, x.qty + 1) } : x));
        return [...c, { ...item, key, qty: 1 }];
      });
      notify(lang === 'hi' ? `${item.nameHi || item.name} कार्ट में जोड़ा गया` : `${item.name} added to cart`);
    },
    [notify, lang]
  );
  const updateQty = useCallback((key, qty) => setCart((c) => c.map((x) => (x.key === key ? { ...x, qty: Math.max(1, Math.min(20, qty)) } : x))), []);
  const removeFromCart = useCallback((key) => setCart((c) => c.filter((x) => x.key !== key)), []);
  const clearCart = useCallback(() => setCart([]), []);

  const value = useMemo(
    () => ({
      lang, setLang, currency, setCurrency,
      cart, cartCount: cart.reduce((n, x) => n + x.qty, 0), addToCart, updateQty, removeFromCart, clearCart,
      toast, notify,
    }),
    [lang, currency, cart, addToCart, updateQty, removeFromCart, clearCart, toast, notify]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);

// Formats a price for the active currency, or a placeholder when not set yet.
export function usePrice() {
  const { currency } = useApp();
  return (inr, usd) => {
    if (currency === 'USD') return usd != null ? `$${Number(usd).toLocaleString('en-US')}` : '[$ PRICE]';
    return inr != null ? `₹${Number(inr).toLocaleString('en-IN')}` : '[₹ PRICE]';
  };
}

// i18n: English by default, Hindi when the visitor picks हिंदी in the top bar.
// Usage: const t = useT();  t('English text', 'हिंदी पाठ')   |   t({ en, hi })
export function useT() {
  const { lang } = useApp();
  return useCallback(
    (en, hi) => {
      if (en && typeof en === 'object' && !Array.isArray(en) && ('en' in en || 'hi' in en)) {
        return lang === 'hi' && en.hi != null ? en.hi : en.en;
      }
      return lang === 'hi' && hi != null ? hi : en;
    },
    [lang]
  );
}
