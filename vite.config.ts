import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      base: "/yogicanimals/",
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks(id) {
              // Vendor chunks (always separate)
              if (id.includes('node_modules')) {
                if (id.includes('react')) {
                  return 'vendor-react';
                }
                if (id.includes('recharts')) {
                  return 'vendor-charts';
                }
                if (id.includes('lucide-react')) {
                  return 'vendor-icons';
                }
                return 'vendor-other';
              }

              // Shared utilities
              if (id.includes('LoadingThrobber') || id.includes('LazyBoundary') || id.includes('Tooltip') || id.includes('FadeIn')) {
                return 'shared-utils';
              }

              // Shared components used across pages
              if (id.includes('Navbar') || id.includes('Footer') || id.includes('ScrollToTop')) {
                return 'shared-layout';
              }

              // Page-level chunks (lazy-loaded routes)
              if (id.includes('HomePage')) {
                return 'page-home';
              }
              if (id.includes('AnimalList')) {
                return 'page-animals';
              }
              if (id.includes('AnimalDetail')) {
                return 'page-animal-detail';
              }
              if (id.includes('Analytics')) {
                return 'page-analytics';
              }
              if (id.includes('PersonalScoreCalculator')) {
                return 'page-calculator';
              }

              // All other components go to a shared-components chunk to avoid circular deps
              if (id.includes('components/')) {
                return 'components-shared';
              }
            },
            chunkFileNames: 'js/[name]-[hash].js',
            entryFileNames: 'js/[name]-[hash].js',
            assetFileNames: (assetInfo) => {
              const info = assetInfo.name.split('.');
              const ext = info[info.length - 1];
              if (/png|jpe?g|gif|svg/.test(ext)) {
                return `assets/images/[name]-[hash][extname]`;
              } else if (ext === 'css') {
                return `css/[name]-[hash][extname]`;
              }
              return `assets/[name]-[hash][extname]`;
            },
          },
        },
        minify: 'terser',
        sourcemap: false,
        chunkSizeWarningLimit: 600,
      }
    };
});
