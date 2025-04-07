import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/widgets/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: ({ name, type }) => {
          if (type === 'asset') {
            if (!name) return 'assets/[name]-[hash][extname]';
            if (name.endsWith('.css')) return 'assets/[name]-[hash][extname]';
            if (/\.(png|jpe?g|gif|svg|ico|webp)$/.test(name)) {
              return 'assets/images/[name]-[hash][extname]';
            }
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
})
