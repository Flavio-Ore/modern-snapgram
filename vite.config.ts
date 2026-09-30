import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@shared': path.resolve(__dirname, './src/shared')
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks (id) {
          if (id.includes('node_modules')) {
            if (id.includes('@tanstack/react-query')) {
              return 'query-vendor'
            }
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'ui-vendor'
            }
            if (id.includes('appwrite')) {
              return 'appwrite-vendor'
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor'
            }
          }
        }
      }
    }
  }
})
