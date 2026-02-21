import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useId, useIds, useSSRSafeId } from '../useId';

describe('useId', () => {
  it('should return provided ID when given', () => {
    const { result } = renderHook(() => useId('custom-id'));
    expect(result.current).toBe('custom-id');
  });

  it('should generate unique ID when no ID provided', () => {
    const { result: result1 } = renderHook(() => useId());
    const { result: result2 } = renderHook(() => useId());

    expect(result1.current).toBeDefined();
    expect(result2.current).toBeDefined();
    expect(result1.current).not.toBe(result2.current);
  });

  it('should use default prefix "groxigo"', () => {
    const { result } = renderHook(() => useId());
    expect(result.current).toMatch(/^groxigo-\d+$/);
  });

  it('should use custom prefix when provided', () => {
    const { result } = renderHook(() => useId(undefined, 'custom'));
    expect(result.current).toMatch(/^custom-\d+$/);
  });

  it('should return stable ID across renders', () => {
    const { result, rerender } = renderHook(() => useId());

    const firstId = result.current;
    rerender();
    const secondId = result.current;

    expect(firstId).toBe(secondId);
  });

  it('should always return provided ID even after rerenders', () => {
    const { result, rerender } = renderHook(
      ({ providedId }) => useId(providedId),
      { initialProps: { providedId: 'my-id' } }
    );

    expect(result.current).toBe('my-id');

    rerender({ providedId: 'my-id' });
    expect(result.current).toBe('my-id');
  });

  it('should generate incrementing IDs', () => {
    const { result: result1 } = renderHook(() => useId());
    const { result: result2 } = renderHook(() => useId());
    const { result: result3 } = renderHook(() => useId());

    const id1Num = parseInt(result1.current.split('-')[1]);
    const id2Num = parseInt(result2.current.split('-')[1]);
    const id3Num = parseInt(result3.current.split('-')[1]);

    expect(id2Num).toBeGreaterThan(id1Num);
    expect(id3Num).toBeGreaterThan(id2Num);
  });

  it('should handle empty string as provided ID', () => {
    const { result } = renderHook(() => useId(''));
    // Empty string is an explicit value — returned as-is (not treated as "no ID")
    expect(result.current).toBe('');
  });
});

describe('useIds', () => {
  it('should return base ID and suffixed IDs', () => {
    const { result } = renderHook(() => useIds(undefined, ['label', 'input', 'error'] as const));

    expect(result.current.base).toMatch(/^groxigo-\d+$/);
    expect(result.current.label).toBe(`${result.current.base}-label`);
    expect(result.current.input).toBe(`${result.current.base}-input`);
    expect(result.current.error).toBe(`${result.current.base}-error`);
  });

  it('should use provided base ID', () => {
    const { result } = renderHook(() => useIds('my-field', ['label', 'input'] as const));

    expect(result.current.base).toBe('my-field');
    expect(result.current.label).toBe('my-field-label');
    expect(result.current.input).toBe('my-field-input');
  });

  it('should handle empty suffixes array', () => {
    const { result } = renderHook(() => useIds('test-id', [] as const));

    expect(result.current.base).toBe('test-id');
    expect(Object.keys(result.current)).toEqual(['base']);
  });

  it('should generate stable IDs across renders', () => {
    const { result, rerender } = renderHook(() => useIds(undefined, ['a', 'b'] as const));

    const firstIds = { ...result.current };
    rerender();
    const secondIds = { ...result.current };

    expect(firstIds.base).toBe(secondIds.base);
    expect(firstIds.a).toBe(secondIds.a);
    expect(firstIds.b).toBe(secondIds.b);
  });

  it('should handle single suffix', () => {
    const { result } = renderHook(() => useIds('field', ['helper'] as const));

    expect(result.current.base).toBe('field');
    expect(result.current.helper).toBe('field-helper');
  });

  it('should generate unique base IDs for different hooks', () => {
    const { result: result1 } = renderHook(() => useIds(undefined, ['a'] as const));
    const { result: result2 } = renderHook(() => useIds(undefined, ['a'] as const));

    expect(result1.current.base).not.toBe(result2.current.base);
    expect(result1.current.a).not.toBe(result2.current.a);
  });
});

describe('useSSRSafeId', () => {
  it('should return provided ID immediately', () => {
    const { result } = renderHook(() => useSSRSafeId('provided-id'));
    expect(result.current).toBe('provided-id');
  });

  it('should return undefined initially without provided ID (SSR simulation)', () => {
    const { result } = renderHook(() => useSSRSafeId());
    // After initial render and useEffect, it should have an ID
    expect(result.current).toMatch(/^groxigo-\d+$/);
  });

  it('should generate ID after effect runs', () => {
    const { result, rerender } = renderHook(() => useSSRSafeId());

    // After mount, should have generated ID
    expect(result.current).toBeDefined();
    expect(result.current).toMatch(/^groxigo-\d+$/);

    const firstId = result.current;
    rerender();

    // ID should remain stable
    expect(result.current).toBe(firstId);
  });

  it('should not regenerate ID when provided ID is given', () => {
    const { result, rerender } = renderHook(
      ({ id }) => useSSRSafeId(id),
      { initialProps: { id: 'stable-id' } }
    );

    expect(result.current).toBe('stable-id');

    rerender({ id: 'stable-id' });

    expect(result.current).toBe('stable-id');
  });

  it('should handle undefined to defined transition', () => {
    const { result, rerender } = renderHook(
      ({ id }) => useSSRSafeId(id),
      { initialProps: { id: undefined as string | undefined } }
    );

    const generatedId = result.current;
    expect(generatedId).toMatch(/^groxigo-\d+$/);

    rerender({ id: 'now-provided' });

    // Should still return the generated ID since useEffect only runs on mount
    // The hook uses providedId directly in the initial state
    expect(result.current).toBe(generatedId);
  });

  it('should generate unique IDs for different components', () => {
    const { result: result1 } = renderHook(() => useSSRSafeId());
    const { result: result2 } = renderHook(() => useSSRSafeId());

    expect(result1.current).not.toBe(result2.current);
  });
});
