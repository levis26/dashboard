/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    {
      name: 'json-handler',
      transform(code, id) {
        if (id.endsWith('.json')) {
          try {
            const json = JSON.parse(code);
            return `export default ${JSON.stringify(json)};`;
          } catch (e) {
            return null;
          }
        }
        return null;
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})