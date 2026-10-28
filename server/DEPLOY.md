# Live server par deploy karna — Pt. Rajneesh Sharma website

Is `server` folder mein poori website hai: API (bookings, orders, contact, yantras) **aur** bani-banayi React website (`public/` folder). Live server par sirf yahi folder chahiye — `client` folder ki zaroorat nahi.

## Folder mein kya hai

| Cheez | Kaam |
|---|---|
| `src/` | Node + Express API |
| `public/` | Built website (React) — server yahin se pages dikhata hai |
| `.env.example` | Settings ka template — isse copy karke `.env` banana hai |
| `deploy/ecosystem.config.cjs` | PM2 — site ko hamesha chalu rakhta hai, crash/reboot par restart |
| `deploy/nginx.conf` | VPS ke liye Nginx config (domain + SSL) |
| `scripts/build-client.js` | Website mein badlav ke baad `public/` dobara banane ke liye |
| `private_uploads/` | Clients ke thumb impression / floor plan — **private**, kabhi public nahi hote |

## Zaroori: Node.js 18.18 ya usse naya (20 ya 22 LTS best)

---

## Step 1 — MongoDB Atlas (database, free)

1. https://cloud.mongodb.com par account → **Create cluster** (M0 Free, region: Mumbai).
2. **Database Access** → user banao (username + strong password).
3. **Network Access** → apne server ka IP add karo (Render/Hostinger shared par `0.0.0.0/0`).
4. **Connect → Drivers** → connection string copy karo, end mein `/ptrs` lagao:
   `mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/ptrs?retryWrites=true&w=majority`

Pehli baar server start hote hi 15 yantra database mein apne-aap aa jaate hain.

## Step 2 — `.env` file

`.env.example` ko copy karke `.env` naam do aur bharo:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=   (Step 1 wali string)
SITE_URL=https://nadiastrologerindia.com
TRUST_PROXY=1
```

`.env` kabhi GitHub par upload mat karna.

---

## Option A — VPS (Hostinger VPS / DigitalOcean / AWS, Ubuntu)

```bash
# 1. Node 20 + PM2 + Nginx (ek baar)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx
sudo npm i -g pm2

# 2. server folder upload karo (FileZilla / git) → /var/www/ptrs/server
cd /var/www/ptrs/server
npm ci --omit=dev
cp .env.example .env && nano .env        # Step 2 ki settings

# 3. Start + reboot ke baad bhi auto start
pm2 start deploy/ecosystem.config.cjs --env production
pm2 save && pm2 startup                  # jo command dikhaye, use chala do

# 4. Domain + free SSL
sudo cp deploy/nginx.conf /etc/nginx/sites-available/ptrs
sudo ln -s /etc/nginx/sites-available/ptrs /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d nadiastrologerindia.com -d www.nadiastrologerindia.com
```

Domain ki DNS mein **A record** (`@` aur `www`) VPS ke IP par point karo.

## Option B — Hostinger "Node.js app" / Render / Railway

| Setting | Value |
|---|---|
| Root / app folder | `server` |
| Build / install command | `npm ci --omit=dev` |
| Start command | `npm start` |
| Node version | 20 |
| Environment variables | Step 2 wali saari (`.env` ki jagah panel mein daalo) |

Dhyan do: Render ke free plan par disk har deploy par saaf ho jaati hai — thumb impression / floor plan uploads mit jaayenge. Uploads ke liye **persistent disk** wala plan ya VPS lo.

---

## Check karo ki sab chal raha hai

- `https://your-domain/api/health` → `{"ok":true,"db":true}` aana chahiye (`db:false` = MongoDB string / IP whitelist galat)
- `https://your-domain/sitemap.xml` → saare pages + 15 yantra
- `pm2 logs ptrs-website` → errors dekhne ke liye

## Website mein badlav ke baad update

Local computer par (jahan `client` aur `server` dono folders hain):

```bash
cd server
npm run build:client      # client build karke server/public mein copy
```

Phir naya `public/` folder (aur jo `src/` files badli hon) server par upload karo, aur:

```bash
npm ci --omit=dev         # sirf jab package.json badla ho
pm2 restart ptrs-website
```

## Backup

- Database: MongoDB Atlas → Backup (ya `mongodump`)
- `private_uploads/` folder — clients ka personal data hai, iska regular backup lo aur kisi ke saath share mat karo.
