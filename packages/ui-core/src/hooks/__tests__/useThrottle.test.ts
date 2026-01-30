import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useThrottle, useThrottledCallback } from '../useThrottle';

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useThrottle('initial', 300));
    expect(result.current).toBe('initial');
  });

  it('should throttle rapid updates and eventually update', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 300),
      { initialProps: { value: 'a' } }
    );

    // Initial value
    expect(result.current).toBe('a');

    // Update value
    rerender({ value: 'b' });

    // May be throttled initially since lastExecuted starts at Date.now()
    // After interval, should update
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('b');
  });

  it('should throttle rapid updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 300),
      { initialProps: { value: 'a' } }
    );

    // Initial value
    expect(result.current).toBe('a');

    // Rapid updates within throttle interval
    rerender({ value: 'b' });
    rerender({ value: 'c' });
    rerender({ value: 'd' });

    // Value may still be 'a' (throttled)
    // After interval, should update to latest value
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('d');
  });

  it('should update after interval passes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 100),
      { initialProps: { value: 0 } }
    );

    // Update and wait for interval
    rerender({ value: 50 });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toBe(50);
  });

  it('should handle object values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 100),
      { initialProps: { value: { x: 0, y: 0 } } }
    );

    rerender({ value: { x: 10, y: 20 } });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current).toEqual({ x: 10, y: 20 });
  });

  it('should cleanup timeout on unmount', () => {
    const { result, unmount, rerender } = renderHook(
      ({ value }) => useThrottle(value, 300),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });
    unmount();

    // Should not throw after unmount
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('initial');
  });

  it('should handle interval changes', () => {
    const { result, rerender } = renderHook(
      ({ value, interval }) => useThrottle(value, interval),
      { initialProps: { value: 'initial', interval: 200 } }
    );

    rerender({ value: 'updated', interval: 500 });

    // Wait for the new interval
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should handle multiple value changes with proper throttling', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 200),
      { initialProps: { value: 1 } }
    );

    // First update
    rerender({ value: 2 });
    act(() => { vi.advanceTimersByTime(200); });
    expect(result.current).toBe(2);

    // Second update should be throttled initially
    rerender({ value: 3 });
    act(() => { vi.advanceTimersByTime(200); });
    expect(result.current).toBe(3);
  });
});

describe('useThrottledCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should execute callback immediately on first call', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottledCallback(callback, 300));

    act(() => {
      result.current('arg1');
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('arg1');
  });

  it('should throttle subsequent calls within interval', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottledCallback(callback, 300));

    act(() => {
      result.current('first');
      result.current('second');
      result.current('third');
    });

    // Only first call should execute immediately
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('first');

    // After interval, trailing call should execute
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith('third');
  });

  it('should allow new calls after interval passes', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottledCallback(callback, 300));

    act(() => {
      result.current('first');
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(300);
    });

    act(() => {
      result.current('second');
    });

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith('second');
  });

  it('should pass all arguments to callback', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottledCallback(callback, 300));

    act(() => {
      result.current('a', 'b', 'c');
    });

    expect(callback).toHaveBeenCalledWith('a', 'b', 'c');
  });

  it('should use latest callback reference', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const { result, rerender } = renderHook(
      ({ callback }) => useThrottledCallback(callback, 300),
      { initialProps: { callback: callback1 } }
    );

    act(() => {
      result.current('first');
      result.current('second'); // Scheduled as trailing call
    });

    // Update callback before trailing call executes
    rerender({ callback: callback2 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // First call should use callback1
    expect(callback1).toHaveBeenCalledWith('first');
    // Trailing call should use callback2
    expect(callback2).toHaveBeenCalledWith('second');
  });

  it('should cleanup on unmount', () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() =>
      useThrottledCallback(callback, 300)
    );

    act(() => {
      result.current('first');
      result.current('second'); // Scheduled as trailing call
    });

    expect(callback).toHaveBeenCalledTimes(1);

    unmount();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Trailing call should not execute after unmount
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should have stable function reference', () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(() =>
      useThrottledCallback(callback, 300)
    );

    const fn1 = result.current;
    rerender();
    const fn2 = result.current;

    expect(fn1).toBe(fn2);
  });

  it('should handle interval changes by creating new throttled function', () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(
      ({ interval }) => useThrottledCallback(callback, interval),
      { initialProps: { interval: 200 } }
    );

    act(() => {
      result.current('first');
    });

    expect(callback).toHaveBeenCalledTimes(1);

    // Change interval - this creates a new throttled function
    rerender({ interval: 500 });

    // Wait for the new interval to pass so the next call is not throttled
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // After interval change and waiting for the interval, calling again should work
    act(() => {
      result.current('second');
    });

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should handle zero interval', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useThrottledCallback(callback, 0));

    act(() => {
      result.current('first');
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      result.current('second');
    });

    // With zero interval, should execute immediately
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should handle multiple independent throttlers', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { result: result1 } = renderHook(() =>
      useThrottledCallback(callback1, 200)
    );
    const { result: result2 } = renderHook(() =>
      useThrottledCallback(callback2, 400)
    );

    act(() => {
      result1.current('a');
      result2.current('x');
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);

    act(() => {
      result1.current('b');
      result2.current('y');
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(callback1).toHaveBeenCalledTimes(2);
    expect(callback2).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(callback2).toHaveBeenCalledTimes(2);
  });
});
