import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react': path.resolve(__dirname, '../../node_modules/.bun/react@19.1.0/node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/.bun/react-dom@19.1.0/node_modules/react-dom'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/__tests__/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
    alias: {
      '@groxigo/contracts': path.resolve(__dirname, '../contracts/src'),
      '@groxigo/tokens': path.resolve(__dirname, '../tokens/src'),
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.types.ts',
        'src/**/index.ts',
        'src/**/__tests__/**',
      ],
    },
  },
});
