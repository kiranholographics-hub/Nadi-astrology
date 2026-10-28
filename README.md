# Pt. Rajneesh Sharma — Website (MERN)

Vedic, KP, Nadi & Vastu consultation + Yantra Shop. **Akasha** design (dark + antique gold, animated mandala).

- **M**ongoDB (Mongoose) · **E**xpress · **R**eact 18 (Vite + React Router) · **N**ode 20+

## Folder structure

```
ptrs-website/
├── client/                 React frontend (Vite)
│   ├── src/pages/          Home, Nadi, Vedic, KPPrashna, Vastu, YantraShop, YantraDetail, Videos, About, Cart
│   ├── src/components/     Layout (top bar, navbar, footer, WhatsApp), BookingForm, Yantra, ui
│   ├── src/context/        language (हिंदी/English), currency (₹/$), cart
│   ├── src/data/site.js    ← WhatsApp number, email, timings, map, social links — YAHAN BHAREIN
│   └── src/styles/global.css  design tokens + animations
└── server/                 Express API
    ├── src/models/         Yantra, Booking, Order
    ├── src/routes/         /api/yantras, /api/bookings, /api/orders
    ├── src/data/yantras.js the 15 yantras (seed list)
    └── src/middleware/upload.js  thumb impression / floor plan uploads (private folder)
```

## Pages & URLs

| Page | URL |
|---|---|
| Home | `/` |
| Nadi Astrology | `/nadi-astrology` |
| Vedic (Kundli + Kundli Milan) | `/vedic-astrology` |
| KP Prashna | `/kp-prashna` |
| Vastu | `/vastu-consultant-jaipur` |
| Yantra Shop | `/yantra-shop` (filter: `?category=Dhan`) |
| Yantra product | `/yantra-shop/:slug` e.g. `/yantra-shop/shree-yantra` |
| Videos | `/videos` |
| About | `/about` |
| Cart / checkout | `/cart` |
| Book Consultation (4-step: service → slot in client time zone → details/upload → payment) | `/book` (`?service=kp-prashna` preselects) |
| Kundli Milan | `/kundli-milan` |
| Online Vastu Consultation | `/online-vastu-consultation` |
| Contact | `/contact` |
| FAQ (all) | `/faq` |
| Blog / article | `/blog`, `/blog/:slug` |
| Privacy · Terms · Refund & Cancellation · Shipping (DRAFT — CA/lawyer review) | `/privacy-policy`, `/terms`, `/refund-policy`, `/shipping-policy` |
| sitemap / robots (server) | `/sitemap.xml`, `/robots.txt` |

## Setup

```bash
# 1. dependencies
npm run install:all

# 2. env
cp server/.env.example server/.env
#   → MONGODB_URI mein MongoDB Atlas ka connection string daalein

# 3. 15 yantra database mein daalein (dobara chalane se purana data nahi mitega)
npm run seed

# 4. dev (API :5000 + React :5173)
npm run dev
```

Production: `npm run build` then `npm start` — Express serves `client/dist` and the API from one port.

## API

| Method | Endpoint | Notes |
|---|---|---|
| GET | `/api/yantras` | `?category=`, `?bestseller=true`, `?sort=price_asc\|price_desc` |
| GET | `/api/yantras/:slug` | yantra + 2 related |
| POST | `/api/bookings` | multipart. `service`, `name`, `phone`, `consent` required. Files: `thumbImpression`, `floorPlan` (JPG/PNG/WEBP/HEIC/PDF, max 10 MB) |
| POST | `/api/orders` | JSON. Prices are re-read from DB (never trusted from browser). Returns 409 until prices are set. |
| POST | `/api/leads` | JSON. Contact form / 10-min free yantra salaah. `name`, `phone`, `consent` required |
| GET | `/sitemap.xml`, `/robots.txt` | static pages + every yantra; set `SITE_URL` in `.env` |
| GET | `/api/health` | |

Services: `nadi-general`, `nadi-general-2-kandam`, `nadi-shanti`, `vedic-30`, `vedic-60`, `kundli-milan`, `kp-prashna`, `vastu-quick-call`, `vastu-online-report`, `vastu-site-visit`, `office-visit`.

## Content kahan badlein

- **Contact details** → `client/src/data/site.js` (WhatsApp number bharte hi har page ke button `wa.me` link ban jaate hain)
- **Yantra price / size / dhatu / sthapana / photos** → MongoDB `yantras` collection (fields already defined in `server/src/models/Yantra.js`). Jab tak price `null` hai, site `[₹ PRICE]` dikhati hai aur checkout block rehta hai.
- **Pandit ji ki photos / videos (Home hero slideshow)** → files `client/public/media/` mein daalein, `client/src/pages/Home.jsx` ke `SLIDES` mein `src` bharein.
- **Videos page** → `client/src/pages/Videos.jsx` ke `VIDEOS` mein `youtubeId` ya `src`.
- **FAQs** → `client/src/data/faqs.js` (Home par 8, `/faq` par sab) · **Blog** → `client/src/data/blog.js` · **Policies** → `client/src/data/legal.js` · **Services/booking list** → `client/src/data/services.js`
- **SEO**: har page ka title/description `PageShell` props se; JSON-LD (Person, LocalBusiness, FAQPage, Product, Article) auto. `client/.env` mein `VITE_SITE_URL` aur `VITE_GA_ID` (Google Analytics 4) daalein.
- Baaki `[Jawab]`, `[Refund policy]`, `[Timings]` jaise placeholders seedha page files mein.

## Wording rules (brief se)

"100%", "No.1", "guaranteed result", "black magic" — kahin nahi. Experience aur process ka daava karein, result ki guarantee nahi. Har page ke footer mein disclaimer hai.

## Data privacy (DPDP)

- Har form par consent checkbox (server bhi check karta hai).
- Thumb impression / floor plan `server/private_uploads/` mein — public URL nahi.
- Write endpoints par rate limit (30 req / 15 min / IP).

## Next phase (abhi baaki)

1. Razorpay Checkout (INR) + webhook → booking/order `paid`
2. PayPal Checkout (USD)
3. Live booking calendar (Cal.com) — abhi `/book` par slot request ke roop mein jaata hai
4. WhatsApp + email alerts (Pandit ji ko naya booking, client ko confirmation)
5. Admin panel — yantra price/photos, bookings list, orders
6. Hindi version (poora content) — abhi toggle sirf Home headline badalta hai
7. Server-side rendering / prerender (Google ke liye behtar indexing) — abhi meta tags client-side set hote hain
8. Legal pages ka final review (CA / lawyer) aur [brackets] bharna
