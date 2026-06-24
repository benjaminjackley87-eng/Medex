/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
  return {
    server: {
      port: 5173,
      host: '0.0.0.0'
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts']
    },
    plugins: [react(), tailwindcss()],
    envPrefix: ['VITE_', 'GEMINI_'],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom', 'zustand'],
            lucide: ['lucide-react'],
            motion: ['motion/react'],
            recharts: ['recharts'],
            'better-sqlite3': ['better-sqlite3']
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  };
});
