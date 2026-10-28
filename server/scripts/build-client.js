// Builds the React site (../client) and copies it into server/public,
// so the server folder alone has everything needed to run the live website.
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const client = path.resolve(root, '../client');
const out = path.join(root, 'public');

if (!fs.existsSync(path.join(client, 'package.json'))) {
  console.error('client folder not found next to server/ — upload the ready-made server/public folder instead.');
  process.exit(1);
}
const run = (cmd) => execSync(cmd, { cwd: client, stdio: 'inherit' });
if (!fs.existsSync(path.join(client, 'node_modules'))) run('npm install');
run('npm run build');

fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(path.join(client, 'dist'), out, { recursive: true });
console.log(`[build] website copied to ${path.relative(process.cwd(), out)}`);
