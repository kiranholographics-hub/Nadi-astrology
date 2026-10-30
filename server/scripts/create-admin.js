// Create the admin login, or reset its password if the email already exists.
//   npm run admin:create -- you@example.com "a-long-password"
import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import Admin from '../src/models/Admin.js';
import { hashPassword } from '../src/utils/auth.js';

const [email, password] = process.argv.slice(2);
if (!email || !password) {
  console.error('Usage: npm run admin:create -- you@example.com "password (10+ characters)"');
  process.exit(1);
}
if (password.length < 10) {
  console.error('Password must be at least 10 characters.');
  process.exit(1);
}

await connectDB(process.env.MONGODB_URI);
const passwordHash = await hashPassword(password);
const existing = await Admin.findOne({ email: email.toLowerCase() });
if (existing) {
  existing.passwordHash = passwordHash;
  existing.tokenVersion += 1;
  await existing.save();
  console.log(`[admin] password reset for ${existing.email}`);
} else {
  await Admin.create({ email, passwordHash });
  console.log(`[admin] admin created: ${email.toLowerCase()}`);
}
await mongoose.disconnect();
