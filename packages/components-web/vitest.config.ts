import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// Bun workspaces use broken relative symlinks for hoisted deps.
// Resolve the real paths so Vite can find them.
const bunModules = path.resolve(__dirname, '../../node_modules/.bun');
const reactDir = path.join(bunModules, 'react@19.1.0/node_modules/react');
const reactDomDir = path.join(bunModules, 'react-dom@19.1.0/node_modules/react-dom');

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.web.tsx', '.web.ts', '.tsx', '.ts', '.js', '.jsx'],
    alias: {
      react: reactDir,
      'react-dom': reactDomDir,
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
      '@groxigo/contracts/components': path.resolve(__dirname, '../contracts/src/components'),
      '@groxigo/contracts/elements': path.resolve(__dirname, '../contracts/src/elements'),
      '@groxigo/tokens': path.resolve(__dirname, '../tokens/src'),
      '@groxigo/ui-elements-web': path.resolve(__dirname, '../ui-elements-web/src'),
      '@groxigo/icons/line': path.resolve(__dirname, '../icons/src/line'),
      '@groxigo/icons/solid': path.resolve(__dirname, '../icons/src/solid'),
      '@groxigo/icons': path.resolve(__dirname, '../icons/src'),
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
