// Vitest setup for components-web
import '@testing-library/jest-dom/vitest';

// JSDOM does not implement ResizeObserver
class ResizeObserverMock {
  private cb: ResizeObserverCallback;
  constructor(cb: ResizeObserverCallback) {
    this.cb = cb;
  }
  observe() {
    // Fire callback immediately, like the real ResizeObserver does on first observe
    this.cb([], this as unknown as ResizeObserver);
  }
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver;
