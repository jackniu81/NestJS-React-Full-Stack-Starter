import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pkg from './package.json' with { type: 'json' };

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Injected build-time constants, available as globals in the app
    __APP_VERSION__: JSON.stringify(pkg.version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  server: {
    port: 5173,
    // Easy local dev: forward /api to the NestJS server (port 3000)
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        // Split heavy third-party deps into stable chunks so no single
        // bundle exceeds the 500 kB warning threshold and long-term
        // caching improves (vendor code changes far less than app code).
        // Page functionality (Layout/Welcome/About/NotFound) is unchanged.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(id)) {
              return 'react';
            }
            if (/[\\/]node_modules[\\/](antd|@ant-design|rc-[a-z-]+)[\\/]/.test(id)) {
              return 'antd';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});
