import { Suspense, lazy, useEffect, useRef } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from './context/AppContext.jsx';
import { langOfPath, withLang } from './components/lang.js';
import Home from './pages/Home.jsx';
import Nadi from './pages/Nadi.jsx';
import Vedic from './pages/Vedic.jsx';
import KPPrashna from './pages/KPPrashna.jsx';
import Vastu from './pages/Vastu.jsx';
import YantraShop from './pages/YantraShop.jsx';
import YantraDetail from './pages/YantraDetail.jsx';
import Videos from './pages/Videos.jsx';
import About from './pages/About.jsx';
import Cart from './pages/Cart.jsx';
import NotFound from './pages/NotFound.jsx';
import Book from './pages/Book.jsx';
import KundliMilan from './pages/KundliMilan.jsx';
import OnlineVastu from './pages/OnlineVastu.jsx';
import Contact from './pages/Contact.jsx';
import FaqPage from './pages/FaqPage.jsx';
import { BlogList, BlogPost } from './pages/Blog.jsx';
import Legal from './pages/Legal.jsx';
import Gallery from './pages/Gallery.jsx';
import CountryPage from './pages/CountryPage.jsx';

// Admin is loaded only when someone opens /admin, so the public site stays light.
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));

// The public site, mounted twice: at / (English) and at /hi (Hindi) — see components/lang.js.
function SiteRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="nadi-astrology" element={<Nadi />} />
      <Route path="nadi-astrology/:slug" element={<CountryPage />} />
      <Route path="vedic-astrology" element={<Vedic />} />
      <Route path="kp-prashna" element={<KPPrashna />} />
      <Route path="vastu-consultant-jaipur" element={<Vastu />} />
      <Route path="yantra-shop" element={<YantraShop />} />
      <Route path="yantra-shop/:slug" element={<YantraDetail />} />
      <Route path="videos" element={<Videos />} />
      <Route path="gallery" element={<Gallery />} />
      <Route path="about" element={<About />} />
      <Route path="cart" element={<Cart />} />
      <Route path="book" element={<Book />} />
      <Route path="kundli-milan" element={<KundliMilan />} />
      <Route path="online-vastu-consultation" element={<OnlineVastu />} />
      <Route path="contact" element={<Contact />} />
      <Route path="faq" element={<FaqPage />} />
      <Route path="blog" element={<BlogList />} />
      <Route path="blog/:slug" element={<BlogPost />} />
      <Route path="privacy-policy" element={<Legal page="privacy-policy" />} />
      <Route path="terms" element={<Legal page="terms" />} />
      <Route path="refund-policy" element={<Legal page="refund-policy" />} />
      <Route path="shipping-policy" element={<Legal page="shipping-policy" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Keeps the language in step with the URL: /hi/… is Hindi, everything else English.
// A visitor who chose Hindi earlier and opens an English URL is taken to the Hindi one.
function LangSync() {
  const { lang, setLang } = useApp();
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const first = useRef(true);
  const admin = pathname === '/admin' || pathname.startsWith('/admin/');
  const urlLang = langOfPath(pathname);

  useEffect(() => {
    if (admin) return;
    if (first.current && urlLang === 'en' && lang === 'hi') {
      navigate(withLang(pathname, 'hi') + search + hash, { replace: true });
      return;
    }
    if (lang !== urlLang) setLang(urlLang);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // The language switcher only calls setLang; move to the matching URL.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!admin && lang !== urlLang) navigate(withLang(pathname, lang) + search + hash);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

export default function App() {
  return (
    <>
      <LangSync />
      <Routes>
        <Route path="/admin/*" element={<Suspense fallback={null}><AdminApp /></Suspense>} />
        <Route path="/hi/*" element={<SiteRoutes />} />
        <Route path="/*" element={<SiteRoutes />} />
      </Routes>
    </>
  );
}
