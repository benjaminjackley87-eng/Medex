/// <reference types="vitest" />
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
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
    define: {
      // 🚨 CRITICAL SECURITY WARNING 🚨
      // Embedding the API key here exposes it in plain text via the compiled frontend JavaScript.
      // Base64 encoding does NOT encrypt the key.
      // DO NOT deploy this to production. Move the API call to the Rust Tauri backend instead.
      'process.env.API_KEY': JSON.stringify(
        env.GEMINI_API_KEY ? Buffer.from(env.GEMINI_API_KEY).toString('base64') : ''
      ),
      'process.env.GEMINI_API_KEY': JSON.stringify(
        env.GEMINI_API_KEY ? Buffer.from(env.GEMINI_API_KEY).toString('base64') : ''
      )
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  };
});
