import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { defineConfig } from 'vite'
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias:
    {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@shadcn': path.resolve(__dirname, './src/components/ui'),
      '@posts': path.resolve(__dirname, './src/features/posts'),
      '@auth': path.resolve(__dirname, './src/features/auth'),
      '@users': path.resolve(__dirname, './src/features/users'),
      '@chats': path.resolve(__dirname, './src/features/chats'),
      '@saved': path.resolve(__dirname, './src/features/saved'),
      '@following-followers': path.resolve(__dirname, './src/features/following-followers'),
      '@profile': path.resolve(__dirname, './src/features/profile'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@utils': path.resolve(__dirname, './src/utils'),
    }
  }
})
