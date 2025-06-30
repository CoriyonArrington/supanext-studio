// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(async () => {
  // dynamically load the ESM-only plugin
  const { default: tsconfigPaths } = await import('vite-tsconfig-paths')

  return {
    plugins: [
      react(),
      tsconfigPaths(),
    ],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './vitest.setup.ts',
      include: [
        'src/**/*.{test,spec}.{js,cjs,mjs,ts,cts,mts,jsx,tsx}',
        'tests/**/*.test.{js,cjs,mjs,ts,cts,mts,jsx,tsx}',
        'tests/**/*.integration.{js,cjs,mjs,ts,cts,mts,jsx,tsx}',
      ],
      // replace deprecated `deps.inline` with `server.deps.inline`
      server: {
        deps: {
          inline: ['@chakra-ui/react', '@zag-js/focus-visible'],
        },
      },
    },
  }
})
