import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/__tests__/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      'react': path.resolve(__dirname, '../../node_modules/.bun/react@19.1.0/node_modules/react'),
      'react-dom': path.resolve(__dirname, '../../node_modules/.bun/react-dom@19.1.0/node_modules/react-dom'),
      'react-native': path.resolve(__dirname, '../../node_modules/.bun/react-native-web@0.21.2/node_modules/react-native-web'),
      '@groxigo/tokens/react-native': path.resolve(__dirname, '../tokens/src/platforms/react-native'),
      '@groxigo/tokens/web': path.resolve(__dirname, '../tokens/src/platforms/web'),
      '@groxigo/tokens': path.resolve(__dirname, '../tokens/src'),
      '@groxigo/ui-elements': path.resolve(__dirname, '../ui-elements/src'),
      '@groxigo/ui-core': path.resolve(__dirname, '../ui-core/src'),
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
