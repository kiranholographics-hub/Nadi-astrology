import mongoose from 'mongoose';

// Contact form + "10 min free yantra salaah" requests
const leadSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['contact', 'yantra-salaah', 'office-visit'], default: 'contact' },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, trim: true, lowercase: true, maxlength: 160 },
    country: { type: String, maxlength: 80 },
    subject: { type: String, maxlength: 160 },
    message: { type: String, maxlength: 2000 },
    consent: { type: Boolean, required: true },
    status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
    adminNotes: { type: String, maxlength: 4000, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Lead', leadSchema);
