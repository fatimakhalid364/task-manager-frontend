import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  // define: {
  //   'process.env.PUBLIC_KEY': JSON.stringify(process.env.PUBLIC_KEY),
  // },
define: {
  global: 'window',
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      },
    },
  }
});


