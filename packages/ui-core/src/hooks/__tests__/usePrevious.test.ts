import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePrevious, usePreviousWithInitial, useCurrentAndPrevious } from '../usePrevious';

describe('usePrevious', () => {
  it('should return undefined on first render', () => {
    const { result } = renderHook(() => usePrevious('initial'));
    expect(result.current).toBeUndefined();
  });

  it('should return previous value after update', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 'first' } }
    );

    expect(result.current).toBeUndefined();

    rerender({ value: 'second' });

    expect(result.current).toBe('first');

    rerender({ value: 'third' });

    expect(result.current).toBe('second');
  });

  it('should track number values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 0 } }
    );

    rerender({ value: 10 });
    expect(result.current).toBe(0);

    rerender({ value: 20 });
    expect(result.current).toBe(10);
  });

  it('should track boolean values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: false } }
    );

    rerender({ value: true });
    expect(result.current).toBe(false);

    rerender({ value: false });
    expect(result.current).toBe(true);
  });

  it('should track object values', () => {
    const obj1 = { name: 'first' };
    const obj2 = { name: 'second' };

    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: obj1 } }
    );

    rerender({ value: obj2 });
    expect(result.current).toBe(obj1);

    rerender({ value: obj1 });
    expect(result.current).toBe(obj2);
  });

  it('should handle null values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 'initial' as string | null } }
    );

    rerender({ value: null });
    expect(result.current).toBe('initial');

    rerender({ value: 'back' });
    expect(result.current).toBeNull();
  });

  it('should handle same value updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevious(value),
      { initialProps: { value: 'same' } }
    );

    rerender({ value: 'same' });
    // After rerender with same value, previous should be the same value
    // (because useEffect runs and updates the ref)
    expect(result.current).toBe('same');
  });
});

describe('usePreviousWithInitial', () => {
  it('should return initial value on first render', () => {
    const { result } = renderHook(() => usePreviousWithInitial('current', 'initial'));
    expect(result.current).toBe('initial');
  });

  it('should return previous value after update', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePreviousWithInitial(value, 'default'),
      { initialProps: { value: 'first' } }
    );

    expect(result.current).toBe('default');

    rerender({ value: 'second' });
    expect(result.current).toBe('first');

    rerender({ value: 'third' });
    expect(result.current).toBe('second');
  });

  it('should handle number initial value', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePreviousWithInitial(value, 0),
      { initialProps: { value: 5 } }
    );

    expect(result.current).toBe(0);

    rerender({ value: 10 });
    expect(result.current).toBe(5);
  });

  it('should handle object initial value', () => {
    const initialObj = { count: 0 };
    const { result } = renderHook(() => usePreviousWithInitial({ count: 1 }, initialObj));

    expect(result.current).toBe(initialObj);
  });

  it('should handle null initial value', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePreviousWithInitial<string | null>(value, null),
      { initialProps: { value: 'first' } }
    );

    expect(result.current).toBeNull();

    rerender({ value: 'second' });
    expect(result.current).toBe('first');
  });

  it('should work with complex types', () => {
    interface State {
      items: string[];
      loading: boolean;
    }

    const initial: State = { items: [], loading: true };
    const state1: State = { items: ['a'], loading: false };
    const state2: State = { items: ['a', 'b'], loading: false };

    const { result, rerender } = renderHook(
      ({ value }) => usePreviousWithInitial(value, initial),
      { initialProps: { value: state1 } }
    );

    expect(result.current).toBe(initial);

    rerender({ value: state2 });
    expect(result.current).toBe(state1);
  });
});

describe('useCurrentAndPrevious', () => {
  it('should return current and undefined previous on first render', () => {
    const { result } = renderHook(() => useCurrentAndPrevious('initial'));

    const [current, previous] = result.current;
    expect(current).toBe('initial');
    expect(previous).toBeUndefined();
  });

  it('should return both current and previous values after update', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useCurrentAndPrevious(value),
      { initialProps: { value: 'first' } }
    );

    let [current, previous] = result.current;
    expect(current).toBe('first');
    expect(previous).toBeUndefined();

    rerender({ value: 'second' });

    [current, previous] = result.current;
    expect(current).toBe('second');
    expect(previous).toBe('first');

    rerender({ value: 'third' });

    [current, previous] = result.current;
    expect(current).toBe('third');
    expect(previous).toBe('second');
  });

  it('should work with number values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useCurrentAndPrevious(value),
      { initialProps: { value: 0 } }
    );

    let [current, previous] = result.current;
    expect(current).toBe(0);
    expect(previous).toBeUndefined();

    rerender({ value: 100 });

    [current, previous] = result.current;
    expect(current).toBe(100);
    expect(previous).toBe(0);
  });

  it('should compute price change correctly (from docs example)', () => {
    const { result, rerender } = renderHook(
      ({ price }) => {
        const [current, previous] = useCurrentAndPrevious(price);
        const priceChange = previous !== undefined ? current - previous : 0;
        return { current, previous, priceChange };
      },
      { initialProps: { price: 100 } }
    );

    expect(result.current.priceChange).toBe(0); // No previous yet

    rerender({ price: 120 });
    expect(result.current.current).toBe(120);
    expect(result.current.previous).toBe(100);
    expect(result.current.priceChange).toBe(20);

    rerender({ price: 90 });
    expect(result.current.priceChange).toBe(-30);
  });

  it('should handle rapid updates', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useCurrentAndPrevious(value),
      { initialProps: { value: 1 } }
    );

    for (let i = 2; i <= 10; i++) {
      rerender({ value: i });
      const [current, previous] = result.current;
      expect(current).toBe(i);
      expect(previous).toBe(i - 1);
    }
  });

  it('should work with objects', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };

    const { result, rerender } = renderHook(
      ({ value }) => useCurrentAndPrevious(value),
      { initialProps: { value: obj1 } }
    );

    let [current, previous] = result.current;
    expect(current).toBe(obj1);
    expect(previous).toBeUndefined();

    rerender({ value: obj2 });

    [current, previous] = result.current;
    expect(current).toBe(obj2);
    expect(previous).toBe(obj1);
  });
});
