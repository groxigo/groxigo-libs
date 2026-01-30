import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    deps: {
      inline: [/react/, /react-dom/],
    },
    alias: {
      'react': path.resolve(__dirname, '../../node_modules/.bun/react@19.1.0/node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/.bun/react-dom@19.1.0/node_modules/react-dom'),
      '@groxigo/tokens': path.resolve(__dirname, '../tokens/src'),
      '@groxigo/contracts': path.resolve(__dirname, '../contracts/src'),
    },
    coverage: {
      provider: 'v8',
      include: ['src/hooks/*.ts'],
      exclude: [
        'src/hooks/__tests__/**',
        'src/hooks/index.ts',
        // useMediaQuery.ts mostly exports types and interfaces for platform-specific implementations
        // The helper functions are tested, but hooks are implemented elsewhere
        'src/hooks/useMediaQuery.ts',
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
});
