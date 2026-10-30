import mongoose from 'mongoose';

export async function connectDB(uri) {
  if (!uri) throw new Error('MONGODB_URI is not set. Copy server/.env.example to server/.env and fill it in.');
  mongoose.set('strictQuery', true);
  // MONGODB_DB overrides the database name in the URI (e.g. when the URI has none and Mongo falls back to "test").
  await mongoose.connect(uri, process.env.MONGODB_DB ? { dbName: process.env.MONGODB_DB } : {});
  console.log(`[db] connected → ${mongoose.connection.name}`);
}
