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
              // Vendor chunks
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

              // Shared components used across pages
              if (id.includes('Navbar') || id.includes('Footer') || id.includes('ScrollToTop')) {
                return 'shared';
              }

              // Lazy-loaded page components
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

              // Lazy-loaded sub-components on home page
              if (id.includes('TopBottomLists') || id.includes('Methodology') || id.includes('HomeIncentive')) {
                return 'component-home-sections';
              }

              // Lazy-loaded visualization components
              if (id.includes('AnimalRadarChart') || id.includes('AttributeExplorer') || id.includes('MetricCorrelations')) {
                return 'component-charts';
              }

              // Split other utility components
              if (id.includes('components/')) {
                const match = id.match(/components\/([^/]+)\.tsx?/);
                if (match) {
                  const componentName = match[1];
                  // Don't split tiny/core components
                  if (['LoadingThrobber', 'LazyBoundary', 'Tooltip', 'FadeIn'].includes(componentName)) {
                    return 'shared-utils';
                  }
                  // Group other components
                  return 'components';
                }
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
