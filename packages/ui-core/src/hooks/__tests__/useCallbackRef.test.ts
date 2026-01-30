import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { useCallbackRef, useEventCallback } from '../useCallbackRef';

describe('useCallbackRef', () => {
  it('should return a stable function reference', () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(
      ({ cb }) => useCallbackRef(cb),
      { initialProps: { cb: callback } }
    );

    const firstRef = result.current;

    rerender({ cb: vi.fn() });

    const secondRef = result.current;

    expect(firstRef).toBe(secondRef);
  });

  it('should call the latest callback', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { result, rerender } = renderHook(
      ({ cb }) => useCallbackRef(cb),
      { initialProps: { cb: callback1 } }
    );

    result.current('arg1');
    expect(callback1).toHaveBeenCalledWith('arg1');
    expect(callback2).not.toHaveBeenCalled();

    rerender({ cb: callback2 });

    result.current('arg2');
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledWith('arg2');
  });

  it('should handle undefined callback', () => {
    const { result } = renderHook(() => useCallbackRef(undefined));

    // Should not throw
    expect(() => result.current()).not.toThrow();
  });

  it('should pass through all arguments', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useCallbackRef(callback));

    result.current('a', 1, { key: 'value' }, [1, 2, 3]);

    expect(callback).toHaveBeenCalledWith('a', 1, { key: 'value' }, [1, 2, 3]);
  });

  it('should return callback return value', () => {
    const callback = vi.fn().mockReturnValue('result');
    const { result } = renderHook(() => useCallbackRef(callback));

    const returnValue = result.current();

    expect(returnValue).toBe('result');
  });

  it('should work with async callbacks', async () => {
    const asyncCallback = vi.fn().mockResolvedValue('async result');
    const { result } = renderHook(() => useCallbackRef(asyncCallback));

    const promise = result.current();

    await expect(promise).resolves.toBe('async result');
  });

  it('should update callback ref after render', () => {
    let callCount = 0;
    const callback1 = () => { callCount = 1; };
    const callback2 = () => { callCount = 2; };

    const { result, rerender } = renderHook(
      ({ cb }) => useCallbackRef(cb),
      { initialProps: { cb: callback1 } }
    );

    // Store reference before update
    const stableRef = result.current;

    // Update callback
    rerender({ cb: callback2 });

    // Call the stored reference (should use updated callback)
    stableRef();

    expect(callCount).toBe(2);
  });

  it('should handle callback with generic types', () => {
    interface Data {
      id: number;
      name: string;
    }

    const callback = vi.fn((data: Data) => data.name);
    const { result } = renderHook(() => useCallbackRef(callback));

    const returnValue = result.current({ id: 1, name: 'test' });

    expect(returnValue).toBe('test');
    expect(callback).toHaveBeenCalledWith({ id: 1, name: 'test' });
  });
});

describe('useEventCallback', () => {
  it('should return undefined when callback is undefined', () => {
    const { result } = renderHook(() => useEventCallback(undefined));

    expect(result.current).toBeUndefined();
  });

  it('should return stable callback when defined', () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(
      ({ cb }) => useEventCallback(cb),
      { initialProps: { cb: callback } }
    );

    const firstRef = result.current;

    rerender({ cb: vi.fn() });

    const secondRef = result.current;

    expect(firstRef).toBe(secondRef);
  });

  it('should call the latest callback', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { result, rerender } = renderHook(
      ({ cb }) => useEventCallback(cb),
      { initialProps: { cb: callback1 } }
    );

    result.current?.('arg1');
    expect(callback1).toHaveBeenCalledWith('arg1');

    rerender({ cb: callback2 });

    result.current?.('arg2');
    expect(callback2).toHaveBeenCalledWith('arg2');
  });

  it('should switch from undefined to defined', () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(
      ({ cb }) => useEventCallback(cb),
      { initialProps: { cb: undefined as (() => void) | undefined } }
    );

    expect(result.current).toBeUndefined();

    rerender({ cb: callback });

    expect(result.current).toBeDefined();
    result.current?.();
    expect(callback).toHaveBeenCalled();
  });

  it('should switch from defined to undefined', () => {
    const callback = vi.fn();
    const { result, rerender } = renderHook(
      ({ cb }) => useEventCallback(cb),
      { initialProps: { cb: callback as (() => void) | undefined } }
    );

    expect(result.current).toBeDefined();

    rerender({ cb: undefined });

    expect(result.current).toBeUndefined();
  });

  it('should return callback return value', () => {
    const callback = vi.fn().mockReturnValue(42);
    const { result } = renderHook(() => useEventCallback(callback));

    const returnValue = result.current?.();

    expect(returnValue).toBe(42);
  });

  it('should handle multiple arguments', () => {
    const callback = vi.fn((a: string, b: number) => `${a}-${b}`);
    const { result } = renderHook(() => useEventCallback(callback));

    const returnValue = result.current?.('test', 123);

    expect(returnValue).toBe('test-123');
    expect(callback).toHaveBeenCalledWith('test', 123);
  });

  it('should work in event handler context', () => {
    const mockEvent = { preventDefault: vi.fn(), target: { value: 'test' } };
    const handleChange = vi.fn((e: typeof mockEvent) => e.target.value);

    const { result } = renderHook(() => useEventCallback(handleChange));

    const returnValue = result.current?.(mockEvent);

    expect(returnValue).toBe('test');
    expect(handleChange).toHaveBeenCalledWith(mockEvent);
  });
});
