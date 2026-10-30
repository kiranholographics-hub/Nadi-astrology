import mongoose from 'mongoose';

// One document per page view on the public site. No IP address is stored.
const visitSchema = new mongoose.Schema({
  day: { type: String, index: true }, // YYYY-MM-DD (IST)
  path: { type: String, maxlength: 200 },
  sid: { type: String, maxlength: 40 }, // random id per browser tab session — for unique visitor counts
  country: { type: String, maxlength: 2, default: null }, // ISO code from the CDN/proxy header, if any
  referrer: { type: String, maxlength: 120, default: null }, // host only
  device: { type: String, enum: ['mobile', 'desktop'], default: 'desktop' },
  lang: { type: String, maxlength: 10, default: null },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 * 400 }, // auto-delete after ~13 months
});

export default mongoose.model('Visit', visitSchema);
