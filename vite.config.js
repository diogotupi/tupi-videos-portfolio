import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        es: resolve(__dirname, 'es/index.html'),
        pt: resolve(__dirname, 'pt/index.html'),
      },
    },
  },
  test: {
    environment: 'jsdom',
  },
});
