import mongoose from 'mongoose';

// Remembers which one-time content batches have already been added on server start,
// so content that was later edited or deleted in the admin is never added again.
const seedStateSchema = new mongoose.Schema(
  { key: { type: String, required: true, unique: true }, doneAt: { type: Date, default: Date.now } },
  { timestamps: false }
);

export default mongoose.model('SeedState', seedStateSchema);
