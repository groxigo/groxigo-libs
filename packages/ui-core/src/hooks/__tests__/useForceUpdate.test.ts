import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useForceUpdate, useForceUpdateWithCount } from '../useForceUpdate';

describe('useForceUpdate', () => {
  it('should return a function', () => {
    const { result } = renderHook(() => useForceUpdate());
    expect(typeof result.current).toBe('function');
  });

  it('should trigger re-render when called', () => {
    let renderCount = 0;

    const { result } = renderHook(() => {
      renderCount++;
      return useForceUpdate();
    });

    expect(renderCount).toBe(1);

    act(() => {
      result.current();
    });

    expect(renderCount).toBe(2);
  });

  it('should trigger multiple re-renders', () => {
    let renderCount = 0;

    const { result } = renderHook(() => {
      renderCount++;
      return useForceUpdate();
    });

    expect(renderCount).toBe(1);

    act(() => {
      result.current();
    });
    expect(renderCount).toBe(2);

    act(() => {
      result.current();
    });
    expect(renderCount).toBe(3);

    act(() => {
      result.current();
    });
    expect(renderCount).toBe(4);
  });

  it('should have stable function reference', () => {
    const { result, rerender } = renderHook(() => useForceUpdate());

    const firstRef = result.current;
    rerender();
    const secondRef = result.current;

    expect(firstRef).toBe(secondRef);
  });

  it('should work with external data synchronization', () => {
    // Simulating external store pattern
    let externalValue = 'initial';

    const { result } = renderHook(() => {
      const forceUpdate = useForceUpdate();
      return { getValue: () => externalValue, forceUpdate };
    });

    expect(result.current.getValue()).toBe('initial');

    // Update external value
    externalValue = 'updated';

    // Without force update, component doesn't know about the change
    expect(result.current.getValue()).toBe('updated'); // Value changed but component didn't re-render

    act(() => {
      result.current.forceUpdate();
    });

    // After force update, component re-rendered
    expect(result.current.getValue()).toBe('updated');
  });

  it('should handle rapid consecutive calls', () => {
    let renderCount = 0;

    const { result } = renderHook(() => {
      renderCount++;
      return useForceUpdate();
    });

    expect(renderCount).toBe(1);

    act(() => {
      result.current();
      result.current();
      result.current();
    });

    // React may batch these, but we should have at least one additional render
    expect(renderCount).toBeGreaterThanOrEqual(2);
  });
});

describe('useForceUpdateWithCount', () => {
  it('should return update count and forceUpdate function', () => {
    const { result } = renderHook(() => useForceUpdateWithCount());

    const [count, forceUpdate] = result.current;
    expect(count).toBe(0);
    expect(typeof forceUpdate).toBe('function');
  });

  it('should increment count on each forceUpdate call', () => {
    const { result } = renderHook(() => useForceUpdateWithCount());

    expect(result.current[0]).toBe(0);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(2);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(3);
  });

  it('should have stable forceUpdate function reference', () => {
    const { result, rerender } = renderHook(() => useForceUpdateWithCount());

    const [, firstForceUpdate] = result.current;
    rerender();
    const [, secondForceUpdate] = result.current;

    expect(firstForceUpdate).toBe(secondForceUpdate);
  });

  it('should trigger re-render when called', () => {
    let renderCount = 0;

    const { result } = renderHook(() => {
      renderCount++;
      return useForceUpdateWithCount();
    });

    expect(renderCount).toBe(1);

    act(() => {
      result.current[1]();
    });

    expect(renderCount).toBe(2);
    expect(result.current[0]).toBe(1);
  });

  it('should be useful for tracking render count (from docs example)', () => {
    const { result } = renderHook(() => {
      const [updateCount, forceUpdate] = useForceUpdateWithCount();
      return { updateCount, forceUpdate };
    });

    expect(result.current.updateCount).toBe(0);

    act(() => {
      result.current.forceUpdate();
    });

    expect(result.current.updateCount).toBe(1);

    act(() => {
      result.current.forceUpdate();
      result.current.forceUpdate();
    });

    // After two more calls
    expect(result.current.updateCount).toBe(3);
  });

  it('should handle many updates', () => {
    const { result } = renderHook(() => useForceUpdateWithCount());

    for (let i = 1; i <= 50; i++) {
      act(() => {
        result.current[1]();
      });
      expect(result.current[0]).toBe(i);
    }
  });

  it('should work correctly after rerender from parent', () => {
    const { result, rerender } = renderHook(() => useForceUpdateWithCount());

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(1);

    // Rerender from parent (not from forceUpdate)
    rerender();

    // Count should remain the same
    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(2);
  });
});
