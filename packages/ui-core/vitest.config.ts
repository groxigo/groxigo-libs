import { defineConfig } from 'vitest/config';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve react from Bun's module cache dynamically (avoids hardcoding version)
function resolveModule(name: string): string {
  try {
    const resolved = import.meta.resolve(name);
    return path.dirname(fileURLToPath(resolved));
  } catch {
    // Fallback: walk Bun's .bun cache
    const bunCache = path.resolve(__dirname, '../../node_modules/.bun');
    const fs = require('fs') as typeof import('fs');
    const entries = fs.readdirSync(bunCache).filter((e: string) => e.startsWith(`${name}@`));
    if (entries.length > 0) {
      return path.join(bunCache, entries[0], 'node_modules', name);
    }
    throw new Error(`Cannot resolve ${name}`);
  }
}

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
    setupFiles: ['./vitest.setup.ts'],
    alias: {
      'react': resolveModule('react'),
      'react-dom': resolveModule('react-dom'),
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
