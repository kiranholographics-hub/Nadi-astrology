import mongoose from 'mongoose';
import { categories } from '../data/yantras.js';

const yantraSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, enum: categories, required: true },
    order: { type: Number, default: 0 },
    bestseller: { type: Boolean, default: false },
    art: { type: String, enum: ['A', 'B', 'C'], default: 'A' },

    priceINR: { type: Number, default: null, min: 0 },
    priceUSD: { type: Number, default: null, min: 0 },
    sankalpPriceINR: { type: Number, default: null, min: 0 },
    sankalpPriceUSD: { type: Number, default: null, min: 0 },

    sizes: [{ type: String }],
    material: { type: String, default: null },
    weightGrams: { type: Number, default: null },
    deity: { type: String, default: null },
    pranPratishtha: { type: String, default: null },
    description: { type: String, default: null },
    purpose: { type: String, default: null }, // what it is used for — plain words, no guarantees
    care: { type: String, default: null }, // care: cleaning, where to keep it, what to avoid
    sthapana: {
      day: String,
      direction: String,
      shuddhi: String,
      mantra: String,
      daily: String,
    },
    boxContents: { type: String, default: null },

    images: [{ url: String, label: String }], // front, back, size in hand, packaging
    videoUrl: { type: String, default: null },
    stock: { type: String, enum: ['available', 'made_to_order', 'out_of_stock'], default: 'available' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Yantra', yantraSchema);
