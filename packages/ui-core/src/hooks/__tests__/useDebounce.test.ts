import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useDebounce, useDebouncedCallback } from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300));
    expect(result.current).toBe('initial');
  });

  it('should debounce value updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } }
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });

    // Value should not change immediately
    expect(result.current).toBe('initial');

    // Fast forward time
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('updated');
  });

  it('should reset timer on rapid value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'a' } }
    );

    rerender({ value: 'b' });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ value: 'c' });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ value: 'd' });

    // Still showing initial value
    expect(result.current).toBe('a');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Now shows final value
    expect(result.current).toBe('d');
  });

  it('should handle delay changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );

    rerender({ value: 'updated', delay: 500 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Should not update yet with new delay
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe('updated');
  });

  it('should cleanup timeout on unmount', () => {
    const { result, unmount, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });

    unmount();

    // Should not throw or update after unmount
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Result should be last value before unmount
    expect(result.current).toBe('initial');
  });

  it('should handle different value types', () => {
    // Number
    const { result: numResult, rerender: numRerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      { initialProps: { value: 0 } }
    );

    numRerender({ value: 42 });
    act(() => { vi.advanceTimersByTime(100); });
    expect(numResult.current).toBe(42);

    // Object
    const { result: objResult, rerender: objRerender } = renderHook(
      ({ value }) => useDebounce(value, 100),
      { initialProps: { value: { count: 0 } } }
    );

    objRerender({ value: { count: 5 } });
    act(() => { vi.advanceTimersByTime(100); });
    expect(objResult.current).toEqual({ count: 5 });
  });

  it('should handle zero delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 0),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });

    act(() => {
      vi.advanceTimersByTime(0);
    });

    expect(result.current).toBe('updated');
  });
});

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce callback execution', () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, 300)
    );

    const [debouncedFn] = result.current;

    act(() => {
      debouncedFn();
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments to callback', () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, 300)
    );

    const [debouncedFn] = result.current;

    act(() => {
      debouncedFn('arg1', 42, { key: 'value' });
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledWith('arg1', 42, { key: 'value' });
  });

  it('should cancel previous call on rapid invocations', () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, 300)
    );

    const [debouncedFn] = result.current;

    act(() => {
      debouncedFn('first');
      debouncedFn('second');
      debouncedFn('third');
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('third');
  });

  it('should provide cancel function', () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedCallback(callback, 300)
    );

    const [debouncedFn, cancel] = result.current;

    act(() => {
      debouncedFn();
    });

    act(() => {
      cancel();
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should use latest callback reference', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const { result, rerender } = renderHook(
      ({ callback }) => useDebouncedCallback(callback, 300),
      { initialProps: { callback: callback1 } }
    );

    const [debouncedFn] = result.current;

    act(() => {
      debouncedFn();
    });

    // Update callback before timer fires
    rerender({ callback: callback2 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Should call the latest callback
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should cleanup on unmount', () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() =>
      useDebouncedCallback(callback, 300)
    );

    const [debouncedFn] = result.current;

    act(() => {
      debouncedFn();
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should handle delay changes', () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(
      ({ delay }) => useDebouncedCallback(callback, delay),
      { initialProps: { delay: 300 } }
    );

    const [debouncedFn1] = result.current;

    act(() => {
      debouncedFn1();
    });

    rerender({ delay: 500 });

    const [debouncedFn2] = result.current;

    act(() => {
      debouncedFn2();
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should handle multiple independent debouncers', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { result: result1 } = renderHook(() =>
      useDebouncedCallback(callback1, 200)
    );
    const { result: result2 } = renderHook(() =>
      useDebouncedCallback(callback2, 400)
    );

    const [debouncedFn1] = result1.current;
    const [debouncedFn2] = result2.current;

    act(() => {
      debouncedFn1();
      debouncedFn2();
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should have stable debounced function reference', () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(() =>
      useDebouncedCallback(callback, 300)
    );

    const [fn1, cancel1] = result.current;

    rerender();

    const [fn2, cancel2] = result.current;

    expect(fn1).toBe(fn2);
    expect(cancel1).toBe(cancel2);
  });
});
