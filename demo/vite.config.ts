import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  root: __dirname,
  base: '/vue-virtual-list/',
  build: {
    outDir: 'demo-dist',
    emptyOutDir: true,
  },
});
