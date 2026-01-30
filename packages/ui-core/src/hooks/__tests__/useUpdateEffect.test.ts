import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { useUpdateEffect, useIsFirstRender } from '../useUpdateEffect';

describe('useUpdateEffect', () => {
  it('should not run effect on initial mount', () => {
    const effect = vi.fn();

    renderHook(() => useUpdateEffect(effect));

    expect(effect).not.toHaveBeenCalled();
  });

  it('should run effect on subsequent updates', () => {
    const effect = vi.fn();

    const { rerender } = renderHook(
      ({ value }) => useUpdateEffect(effect, [value]),
      { initialProps: { value: 'initial' } }
    );

    expect(effect).not.toHaveBeenCalled();

    rerender({ value: 'updated' });

    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('should run effect on every update when no deps provided', () => {
    const effect = vi.fn();

    const { rerender } = renderHook(() => useUpdateEffect(effect));

    expect(effect).not.toHaveBeenCalled();

    rerender();
    expect(effect).toHaveBeenCalledTimes(1);

    rerender();
    expect(effect).toHaveBeenCalledTimes(2);

    rerender();
    expect(effect).toHaveBeenCalledTimes(3);
  });

  it('should not run effect when deps do not change', () => {
    const effect = vi.fn();

    const { rerender } = renderHook(
      ({ value }) => useUpdateEffect(effect, [value]),
      { initialProps: { value: 'constant' } }
    );

    expect(effect).not.toHaveBeenCalled();

    // First update (same value)
    rerender({ value: 'constant' });
    expect(effect).not.toHaveBeenCalled();

    // Second update with different value
    rerender({ value: 'changed' });
    expect(effect).toHaveBeenCalledTimes(1);

    // Third update with same value as before
    rerender({ value: 'changed' });
    expect(effect).toHaveBeenCalledTimes(1);
  });

  it('should call cleanup function on subsequent effects', () => {
    const cleanup = vi.fn();
    const effect = vi.fn(() => cleanup);

    const { rerender } = renderHook(
      ({ value }) => useUpdateEffect(effect, [value]),
      { initialProps: { value: 1 } }
    );

    // Initial mount - no effect run
    expect(effect).not.toHaveBeenCalled();
    expect(cleanup).not.toHaveBeenCalled();

    // First update
    rerender({ value: 2 });
    expect(effect).toHaveBeenCalledTimes(1);
    expect(cleanup).not.toHaveBeenCalled();

    // Second update - cleanup from first effect should be called
    rerender({ value: 3 });
    expect(effect).toHaveBeenCalledTimes(2);
    expect(cleanup).toHaveBeenCalledTimes(1);

    // Third update
    rerender({ value: 4 });
    expect(cleanup).toHaveBeenCalledTimes(2);
  });

  it('should call cleanup on unmount', () => {
    const cleanup = vi.fn();
    const effect = vi.fn(() => cleanup);

    const { rerender, unmount } = renderHook(
      ({ value }) => useUpdateEffect(effect, [value]),
      { initialProps: { value: 1 } }
    );

    // Trigger effect
    rerender({ value: 2 });
    expect(effect).toHaveBeenCalledTimes(1);

    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it('should work with multiple dependencies', () => {
    const effect = vi.fn();

    const { rerender } = renderHook(
      ({ a, b }) => useUpdateEffect(effect, [a, b]),
      { initialProps: { a: 1, b: 'x' } }
    );

    expect(effect).not.toHaveBeenCalled();

    // Change first dep
    rerender({ a: 2, b: 'x' });
    expect(effect).toHaveBeenCalledTimes(1);

    // Change second dep
    rerender({ a: 2, b: 'y' });
    expect(effect).toHaveBeenCalledTimes(2);

    // Change both deps
    rerender({ a: 3, b: 'z' });
    expect(effect).toHaveBeenCalledTimes(3);
  });

  it('should work with empty dependency array', () => {
    const effect = vi.fn();

    const { rerender } = renderHook(() => useUpdateEffect(effect, []));

    expect(effect).not.toHaveBeenCalled();

    rerender();
    expect(effect).not.toHaveBeenCalled();

    rerender();
    expect(effect).not.toHaveBeenCalled();
  });

  it('should be useful for tracking search queries (from docs example)', () => {
    const trackSearchQuery = vi.fn();

    const { rerender } = renderHook(
      ({ query }) => useUpdateEffect(() => { trackSearchQuery(query); }, [query]),
      { initialProps: { query: '' } }
    );

    // Initial mount - should not track
    expect(trackSearchQuery).not.toHaveBeenCalled();

    // User types search query
    rerender({ query: 'test' });
    expect(trackSearchQuery).toHaveBeenCalledWith('test');

    // User refines search
    rerender({ query: 'test query' });
    expect(trackSearchQuery).toHaveBeenCalledWith('test query');
  });
});

describe('useIsFirstRender', () => {
  it('should return true on first render', () => {
    const { result } = renderHook(() => useIsFirstRender());
    expect(result.current).toBe(true);
  });

  it('should return false on subsequent renders', () => {
    const { result, rerender } = renderHook(() => useIsFirstRender());

    expect(result.current).toBe(true);

    rerender();
    expect(result.current).toBe(false);

    rerender();
    expect(result.current).toBe(false);
  });

  it('should be useful for conditional initial logic', () => {
    const initialSetup = vi.fn();
    const updateLogic = vi.fn();

    const { rerender } = renderHook(() => {
      const isFirst = useIsFirstRender();

      if (isFirst) {
        initialSetup();
      } else {
        updateLogic();
      }

      return isFirst;
    });

    expect(initialSetup).toHaveBeenCalledTimes(1);
    expect(updateLogic).not.toHaveBeenCalled();

    rerender();
    expect(initialSetup).toHaveBeenCalledTimes(1);
    expect(updateLogic).toHaveBeenCalledTimes(1);

    rerender();
    expect(initialSetup).toHaveBeenCalledTimes(1);
    expect(updateLogic).toHaveBeenCalledTimes(2);
  });

  it('should work independently in different hook instances', () => {
    const { result: result1 } = renderHook(() => useIsFirstRender());
    const { result: result2, rerender: rerender2 } = renderHook(() => useIsFirstRender());

    expect(result1.current).toBe(true);
    expect(result2.current).toBe(true);

    rerender2();
    expect(result1.current).toBe(true); // Still first render for this instance
    expect(result2.current).toBe(false);
  });

  it('should handle multiple calls in same component', () => {
    const { result, rerender } = renderHook(() => {
      const isFirst1 = useIsFirstRender();
      const isFirst2 = useIsFirstRender();
      return { isFirst1, isFirst2 };
    });

    // On first render, both should be true
    expect(result.current.isFirst1).toBe(true);
    expect(result.current.isFirst2).toBe(true);

    rerender();

    // On second render, both should be false
    expect(result.current.isFirst1).toBe(false);
    expect(result.current.isFirst2).toBe(false);
  });
});
