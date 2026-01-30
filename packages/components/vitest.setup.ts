// Vitest setup file for components tests
// Note: Do NOT use vi.useFakeTimers() globally as it can cause tests to hang.
// Tests that need fake timers should enable them individually.

// Make React globally available for components that don't import it
import * as React from 'react';
(globalThis as any).React = React;

// Mock react-native with react-native-web
import { vi } from 'vitest';

// Suppress console warnings during tests
const originalWarn = console.warn;
beforeAll(() => {
  console.warn = (...args: unknown[]) => {
    // Filter out expected controlled/uncontrolled warnings during tests
    if (typeof args[0] === 'string' && args[0].includes('controlled')) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});
