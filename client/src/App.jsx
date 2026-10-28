import { Route, Routes } from 'react-router-dom';
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nadi-astrology" element={<Nadi />} />
      <Route path="/vedic-astrology" element={<Vedic />} />
      <Route path="/kp-prashna" element={<KPPrashna />} />
      <Route path="/vastu-consultant-jaipur" element={<Vastu />} />
      <Route path="/yantra-shop" element={<YantraShop />} />
      <Route path="/yantra-shop/:slug" element={<YantraDetail />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/about" element={<About />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/book" element={<Book />} />
      <Route path="/kundli-milan" element={<KundliMilan />} />
      <Route path="/online-vastu-consultation" element={<OnlineVastu />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/privacy-policy" element={<Legal page="privacy-policy" />} />
      <Route path="/terms" element={<Legal page="terms" />} />
      <Route path="/refund-policy" element={<Legal page="refund-policy" />} />
      <Route path="/shipping-policy" element={<Legal page="shipping-policy" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}