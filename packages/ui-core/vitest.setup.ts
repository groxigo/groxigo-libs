// Vitest setup file for ui-core tests

// Mock timers for debounce/throttle tests
// vi.useFakeTimers() should be called in individual tests as needed

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
