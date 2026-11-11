import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // The server-side bundle (entry-server.jsx) carries React with it, so the server needs no client packages.
  ssr: { noExternal: true },
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:5000' },
  },
});
