import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import path from 'path'

export default defineConfig({
  // Vitest bundles its own Vite, causing type mismatch - plugins are compatible at runtime
  plugins: [
    react(),
    tanstackRouter(),
  ] as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    onConsoleLog: (log) => {
      if (
        typeof log === 'string' &&
        (log.includes('@tanstack/router-devtools') ||
          log.includes('moved to') ||
          log.includes('This package has moved') ||
          log.includes('Could not parse CSS stylesheet'))
      ) {
        return false
      }
      return true
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'src/test/',
        'src/routes/',
        'src/main.tsx',
        '**/*.d.ts',
        '**/*.config.*',
        '**/routeTree.gen.ts',
        '**/vite-env.d.ts',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
      ],
      include: ['src/**/*.{ts,tsx}'],
      thresholds: {
        lines: 75,
        functions: 75,
        branches: 70,
        statements: 75,
      },
    },
  },
})

