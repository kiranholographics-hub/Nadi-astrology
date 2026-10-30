import mongoose from 'mongoose';

export const SERVICES = [
  'nadi-general',
  'nadi-general-2-kandam',
  'nadi-shanti',
  'vedic-30',
  'vedic-60',
  'kundli-milan',
  'kp-prashna',
  'vastu-quick-call',
  'vastu-online-report',
  'vastu-site-visit',
  'office-visit',
];

const memberSchema = new mongoose.Schema({ name: String, dob: String, tob: String, pob: String }, { _id: false });

const bookingSchema = new mongoose.Schema(
  {
    service: { type: String, enum: SERVICES, required: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, trim: true, lowercase: true, maxlength: 160 },
    country: { type: String, trim: true, maxlength: 80 },
    currency: { type: String, enum: ['INR', 'USD'], default: 'INR' },
    mode: { type: String, enum: ['office', 'video', 'site-visit', 'report'], default: 'video' },
    preferredSlot: { type: String, maxlength: 120 },
    timezone: { type: String, maxlength: 60 }, // client's time zone, e.g. 'America/New_York'

    // Vedic / Kundli
    dob: String,
    tob: String,
    pob: String,
    question: { type: String, maxlength: 2000 },

    // Nadi
    gender: { type: String, enum: ['purush', 'mahila', null], default: null },
    thumbImpression: { type: String, default: null }, // private file key (never public)

    // KP
    kpNumber: { type: Number, min: 1, max: 249 },
    city: String,

    // Vastu
    propertyType: String,
    areaSqft: Number,
    floorPlan: { type: String, default: null }, // private file key
    members: [memberSchema],
    membersText: { type: String, maxlength: 2000 }, // free-text DOB/TOB/POB of up to 5 family members
    mainProblem: { type: String, maxlength: 2000 },

    consent: { type: Boolean, required: true },
    status: { type: String, enum: ['new', 'awaiting_payment', 'paid', 'scheduled', 'done', 'cancelled'], default: 'new' },
    payment: {
      gateway: { type: String, enum: ['razorpay', 'paypal', null], default: null },
      reference: String,
      amount: Number,
    },
    adminNotes: { type: String, maxlength: 4000, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
