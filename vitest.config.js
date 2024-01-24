import path from 'path';
import { configDefaults, defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [Vue()],
  test: {
    environment: 'jsdom'
  },
  root: '.',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
