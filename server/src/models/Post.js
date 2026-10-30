import mongoose from 'mongoose';

export const POST_CATEGORIES = ['Nadi', 'Vedic', 'KP', 'Kundli Matching', 'Vastu', 'Yantra', 'General'];

// Blog post / update. Shown at /blog/<slug>; optionally also on country pages.
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    titleHi: { type: String, trim: true, maxlength: 160, default: '' },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^[a-z0-9-]{3,90}$/ },
    category: { type: String, enum: POST_CATEGORIES, default: 'General' },
    excerpt: { type: String, maxlength: 400, default: '' },
    excerptHi: { type: String, maxlength: 400, default: '' },
    content: { type: String, default: '' }, // sanitized HTML
    contentHi: { type: String, default: '' }, // optional Hindi version (sanitized HTML)
    cover: { type: String, default: '' }, // image URL
    youtubeId: { type: String, maxlength: 20, default: '' },

    // Where the post appears besides /blog: every country page, or only the chosen ones.
    allCountries: { type: Boolean, default: true },
    countries: [{ type: String, lowercase: true, trim: true }], // country slugs

    status: { type: String, enum: ['draft', 'scheduled', 'published'], default: 'draft' },
    publishAt: { type: Date, default: null }, // goes live at this time (IST shown in admin)

    seoTitle: { type: String, maxlength: 70, default: '' },
    metaDescription: { type: String, maxlength: 170, default: '' },
  },
  { timestamps: true }
);

// What visitors can see right now
export const liveFilter = () => ({ status: { $in: ['published', 'scheduled'] }, publishAt: { $lte: new Date() } });

export default mongoose.model('Post', postSchema);
