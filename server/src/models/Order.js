import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    yantra: { type: mongoose.Schema.Types.ObjectId, ref: 'Yantra', required: true },
    name: String,
    size: String,
    sankalp: { type: Boolean, default: false },
    sankalpName: String,
    gotra: String,
    qty: { type: Number, min: 1, max: 20, default: 1 },
    unitPrice: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    items: { type: [itemSchema], validate: (v) => v.length > 0 },
    currency: { type: String, enum: ['INR', 'USD'], required: true },
    subtotal: Number,
    customer: {
      name: { type: String, required: true, maxlength: 120 },
      phone: { type: String, required: true, maxlength: 30 },
      email: { type: String, maxlength: 160 },
      address: { type: String, required: true, maxlength: 600 },
      city: String,
      pincode: String,
      country: { type: String, default: 'India' },
    },
    consent: { type: Boolean, required: true },
    status: { type: String, enum: ['pending_payment', 'paid', 'dispatched', 'delivered', 'cancelled'], default: 'pending_payment' },
    payment: {
      gateway: { type: String, enum: ['razorpay', 'paypal', null], default: null },
      reference: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
