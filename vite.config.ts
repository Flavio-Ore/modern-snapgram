import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { defineConfig } from 'vite'

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['@radix-ui/react-dismissable-layer'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
