// frontend/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  root: __dirname,
  plugins: [
    react(),
    tailwindcss(),
  ],
  publicDir: path.resolve(__dirname, 'public'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    port: 5173,
    allowedHosts: [
      ".ngrok-free.app"
    ],
    open: true,
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.BACKEND_PORT || 3002}`,
        changeOrigin: true,
      },
      '/auth': {
        target: `http://localhost:${process.env.BACKEND_PORT || 3000}`,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});