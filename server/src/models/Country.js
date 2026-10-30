import mongoose from 'mongoose';

const text = { en: { type: String, default: '' }, hi: { type: String, default: '' } };
const faqSchema = new mongoose.Schema({ q: text, a: text }, { _id: false });
const zoneSchema = new mongoose.Schema({ label: String, tz: String }, { _id: false });

// One country page: /nadi-astrology/<slug>
const countrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    nameHi: { type: String, trim: true, maxlength: 80, default: '' },
    code: { type: String, required: true, uppercase: true, trim: true, match: /^[A-Z]{2}$/ },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^[a-z0-9-]{2,40}$/ },
    status: { type: String, enum: ['active', 'draft', 'paused'], default: 'draft' },
    order: { type: Number, default: 0 },

    // "in the USA" / "in Malaysia" — how the name reads inside a sentence
    inName: { type: String, trim: true, maxlength: 90, default: '' },
    timezones: [zoneSchema], // e.g. [{ label: 'New York', tz: 'America/New_York' }]
    cities: [{ type: String, trim: true }],
    intro: text,
    community: text, // who is there / why Nadi readings are sought there
    shippingDays: { type: String, default: '' }, // e.g. '7–12'
    customsNote: text,
    faqs: [faqSchema],

    seoTitle: { type: String, maxlength: 70, default: '' },
    metaDescription: { type: String, maxlength: 170, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Country', countrySchema);
