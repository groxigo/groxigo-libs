import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Resolve modules dynamically from Bun's cache (avoids hardcoding version)
function resolveModule(name: string): string {
  try {
    const resolved = import.meta.resolve(name);
    return path.dirname(fileURLToPath(resolved));
  } catch {
    const bunCache = path.resolve(__dirname, '../../node_modules/.bun');
    const entries = fs.readdirSync(bunCache).filter((e: string) => e.startsWith(`${name}@`));
    if (entries.length > 0) {
      return path.join(bunCache, entries[0], 'node_modules', name);
    }
    throw new Error(`Cannot resolve ${name}`);
  }
}

// Resolve a module's package directory (for packages with subpath exports)
function resolvePackageDir(name: string): string {
  const bunCache = path.resolve(__dirname, '../../node_modules/.bun');
  const safeName = name.replace(/\//g, '+');
  const entries = fs.readdirSync(bunCache).filter((e: string) => e.startsWith(`${safeName}@`));
  if (entries.length > 0) {
    // Use the latest version
    return path.join(bunCache, entries[entries.length - 1], 'node_modules', ...name.split('/'));
  }
  throw new Error(`Cannot resolve package ${name}`);
}

const jestDomDir = resolvePackageDir('@testing-library/jest-dom');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react': resolveModule('react'),
      'react-dom': resolveModule('react-dom'),
      '@testing-library/jest-dom': jestDomDir,
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
