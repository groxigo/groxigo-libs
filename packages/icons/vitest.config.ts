import { defineConfig } from 'vitest/config';
import path from 'path';

const reactPath = path.resolve(__dirname, '../../node_modules/.bun/react@19.1.0/node_modules/react');
const reactDomPath = path.resolve(__dirname, '../../node_modules/.bun/react-dom@19.1.0/node_modules/react-dom');

export default defineConfig({
  resolve: {
    alias: {
      'react': reactPath,
      'react-dom': reactDomPath,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/__tests__/**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      'react': reactPath,
      'react-dom': reactDomPath,
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/__tests__/**',
        'src/line/*.ts',
        'src/solid/*.ts',
      ],
    },
  },
});
