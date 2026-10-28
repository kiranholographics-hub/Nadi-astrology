// PM2 process file — keeps the site running and restarts it after a crash or reboot.
// Usage (from the server folder):  pm2 start deploy/ecosystem.config.cjs --env production
const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..');
fs.mkdirSync(path.join(root, 'logs'), { recursive: true });

module.exports = {
  apps: [
    {
      name: 'ptrs-website',
      cwd: root,
      script: 'src/index.js',
      instances: 1, // keep 1: uploads are stored on this machine's disk
      autorestart: true,
      max_memory_restart: '400M',
      env: { NODE_ENV: 'development' },
      env_production: { NODE_ENV: 'production' },
      out_file: path.join(root, 'logs/out.log'),
      error_file: path.join(root, 'logs/error.log'),
      time: true,
    },
  ],
};
