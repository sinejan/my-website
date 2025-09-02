import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Set base path to work from any domain/root (like my-website)
  base: './',
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/types': resolve(__dirname, 'src/types'),
      '@/data': resolve(__dirname, 'src/data'),
      '@/styles': resolve(__dirname, 'src/styles')
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
})
