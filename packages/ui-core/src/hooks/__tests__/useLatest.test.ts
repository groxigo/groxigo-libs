import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { useLatest } from '../useLatest';

describe('useLatest', () => {
  it('should return ref with initial value', () => {
    const { result } = renderHook(() => useLatest('initial'));
    expect(result.current.current).toBe('initial');
  });

  it('should always have the latest value in ref', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLatest(value),
      { initialProps: { value: 'first' } }
    );

    expect(result.current.current).toBe('first');

    rerender({ value: 'second' });
    expect(result.current.current).toBe('second');

    rerender({ value: 'third' });
    expect(result.current.current).toBe('third');
  });

  it('should return stable ref object', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLatest(value),
      { initialProps: { value: 'first' } }
    );

    const firstRef = result.current;

    rerender({ value: 'second' });

    const secondRef = result.current;

    // The ref object itself should be the same
    expect(firstRef).toBe(secondRef);
    // But the current value should be updated
    expect(secondRef.current).toBe('second');
  });

  it('should work with number values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLatest(value),
      { initialProps: { value: 0 } }
    );

    expect(result.current.current).toBe(0);

    rerender({ value: 42 });
    expect(result.current.current).toBe(42);

    rerender({ value: -10 });
    expect(result.current.current).toBe(-10);
  });

  it('should work with boolean values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLatest(value),
      { initialProps: { value: false } }
    );

    expect(result.current.current).toBe(false);

    rerender({ value: true });
    expect(result.current.current).toBe(true);
  });

  it('should work with object values', () => {
    const obj1 = { name: 'first', count: 1 };
    const obj2 = { name: 'second', count: 2 };

    const { result, rerender } = renderHook(
      ({ value }) => useLatest(value),
      { initialProps: { value: obj1 } }
    );

    expect(result.current.current).toBe(obj1);

    rerender({ value: obj2 });
    expect(result.current.current).toBe(obj2);
  });

  it('should work with function values', () => {
    const fn1 = () => 'first';
    const fn2 = () => 'second';

    const { result, rerender } = renderHook(
      ({ value }) => useLatest(value),
      { initialProps: { value: fn1 } }
    );

    expect(result.current.current).toBe(fn1);
    expect(result.current.current()).toBe('first');

    rerender({ value: fn2 });
    expect(result.current.current).toBe(fn2);
    expect(result.current.current()).toBe('second');
  });

  it('should work with null values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLatest(value),
      { initialProps: { value: 'initial' as string | null } }
    );

    expect(result.current.current).toBe('initial');

    rerender({ value: null });
    expect(result.current.current).toBeNull();

    rerender({ value: 'back' });
    expect(result.current.current).toBe('back');
  });

  it('should work with undefined values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLatest(value),
      { initialProps: { value: 'initial' as string | undefined } }
    );

    expect(result.current.current).toBe('initial');

    rerender({ value: undefined });
    expect(result.current.current).toBeUndefined();
  });

  it('should work with arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];

    const { result, rerender } = renderHook(
      ({ value }) => useLatest(value),
      { initialProps: { value: arr1 } }
    );

    expect(result.current.current).toBe(arr1);
    expect(result.current.current).toEqual([1, 2, 3]);

    rerender({ value: arr2 });
    expect(result.current.current).toBe(arr2);
    expect(result.current.current).toEqual([4, 5, 6]);
  });

  it('should be useful in callbacks that should not cause re-effects', () => {
    // Simulating the use case from docs
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { result, rerender } = renderHook(
      ({ callback }) => {
        const latestCallback = useLatest(callback);
        return latestCallback;
      },
      { initialProps: { callback: callback1 } }
    );

    // Store the ref
    const callbackRef = result.current;

    // Update callback
    rerender({ callback: callback2 });

    // The stored ref should now call the new callback
    callbackRef.current();
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should update synchronously via layout effect', () => {
    // This tests that useLayoutEffect (used by useLatest) updates the ref
    // synchronously during the commit phase
    const { result, rerender } = renderHook(
      ({ value }) => useLatest(value),
      { initialProps: { value: 'initial' } }
    );

    // Immediately after rerender, the ref should have the new value
    rerender({ value: 'updated' });
    expect(result.current.current).toBe('updated');
  });

  it('should handle rapid value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLatest(value),
      { initialProps: { value: 0 } }
    );

    for (let i = 1; i <= 100; i++) {
      rerender({ value: i });
      expect(result.current.current).toBe(i);
    }
  });
});
