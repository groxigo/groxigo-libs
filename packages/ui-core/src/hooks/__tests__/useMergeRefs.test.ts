import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { createRef, useRef } from 'react';
import { useMergeRefs, mergeRefs } from '../useMergeRefs';

describe('mergeRefs', () => {
  it('should set value on all refs', () => {
    const ref1 = createRef<string>();
    const ref2 = createRef<string>();
    const ref3 = createRef<string>();

    const merged = mergeRefs(ref1, ref2, ref3);
    merged('test value');

    expect(ref1.current).toBe('test value');
    expect(ref2.current).toBe('test value');
    expect(ref3.current).toBe('test value');
  });

  it('should handle callback refs', () => {
    let value1: string | null = null;
    let value2: string | null = null;

    const callbackRef1 = (val: string | null) => { value1 = val; };
    const callbackRef2 = (val: string | null) => { value2 = val; };

    const merged = mergeRefs(callbackRef1, callbackRef2);
    merged('callback test');

    expect(value1).toBe('callback test');
    expect(value2).toBe('callback test');
  });

  it('should handle mixed ref types', () => {
    const objectRef = createRef<string>();
    let callbackValue: string | null = null;
    const callbackRef = (val: string | null) => { callbackValue = val; };

    const merged = mergeRefs(objectRef, callbackRef);
    merged('mixed test');

    expect(objectRef.current).toBe('mixed test');
    expect(callbackValue).toBe('mixed test');
  });

  it('should handle null refs', () => {
    const ref1 = createRef<string>();
    const ref2 = null;
    const ref3 = createRef<string>();

    const merged = mergeRefs(ref1, ref2, ref3);
    merged('null test');

    expect(ref1.current).toBe('null test');
    expect(ref3.current).toBe('null test');
  });

  it('should handle undefined refs', () => {
    const ref1 = createRef<string>();
    const ref2 = undefined;
    const ref3 = createRef<string>();

    const merged = mergeRefs(ref1, ref2, ref3);
    merged('undefined test');

    expect(ref1.current).toBe('undefined test');
    expect(ref3.current).toBe('undefined test');
  });

  it('should handle all null/undefined refs', () => {
    const merged = mergeRefs<string>(null, undefined, null);

    // Should not throw
    expect(() => merged('test')).not.toThrow();
  });

  it('should handle empty refs array', () => {
    const merged = mergeRefs<string>();

    // Should not throw
    expect(() => merged('test')).not.toThrow();
  });

  it('should handle null value being passed', () => {
    const ref1 = createRef<string | null>();
    const ref2 = createRef<string | null>();

    const merged = mergeRefs(ref1, ref2);
    merged('initial');
    merged(null);

    expect(ref1.current).toBe(null);
    expect(ref2.current).toBe(null);
  });
});

describe('useMergeRefs', () => {
  it('should return merged ref callback', () => {
    const { result } = renderHook(() => {
      const ref1 = useRef<string | null>(null);
      const ref2 = useRef<string | null>(null);
      const mergedRef = useMergeRefs(ref1, ref2);
      return { ref1, ref2, mergedRef };
    });

    result.current.mergedRef('hook test');

    expect(result.current.ref1.current).toBe('hook test');
    expect(result.current.ref2.current).toBe('hook test');
  });

  it('should handle forwarded ref pattern', () => {
    let forwardedValue: string | null = null;
    const forwardedRef = (val: string | null) => { forwardedValue = val; };

    const { result } = renderHook(() => {
      const internalRef = useRef<string | null>(null);
      const mergedRef = useMergeRefs(internalRef, forwardedRef);
      return { internalRef, mergedRef };
    });

    result.current.mergedRef('forwarded test');

    expect(result.current.internalRef.current).toBe('forwarded test');
    expect(forwardedValue).toBe('forwarded test');
  });

  it('should memoize the merged ref callback', () => {
    const { result, rerender } = renderHook(() => {
      const ref1 = useRef<string | null>(null);
      const ref2 = useRef<string | null>(null);
      const mergedRef = useMergeRefs(ref1, ref2);
      return { ref1, ref2, mergedRef };
    });

    const firstMergedRef = result.current.mergedRef;
    rerender();
    const secondMergedRef = result.current.mergedRef;

    // Should be the same reference due to memoization
    expect(firstMergedRef).toBe(secondMergedRef);
  });

  it('should update when refs change', () => {
    const externalRef1 = createRef<string>();
    const externalRef2 = createRef<string>();
    const externalRef3 = createRef<string>();

    const { result, rerender } = renderHook(
      ({ refs }) => useMergeRefs(...refs),
      { initialProps: { refs: [externalRef1, externalRef2] as const } }
    );

    result.current('initial');
    expect(externalRef1.current).toBe('initial');
    expect(externalRef2.current).toBe('initial');
    expect(externalRef3.current).toBe(null);

    rerender({ refs: [externalRef1, externalRef3] as const });

    result.current('updated');
    expect(externalRef1.current).toBe('updated');
    expect(externalRef3.current).toBe('updated');
  });

  it('should handle single ref', () => {
    const { result } = renderHook(() => {
      const ref = useRef<string | null>(null);
      const mergedRef = useMergeRefs(ref);
      return { ref, mergedRef };
    });

    result.current.mergedRef('single ref test');
    expect(result.current.ref.current).toBe('single ref test');
  });

  it('should work with complex types', () => {
    interface ComplexType {
      id: number;
      name: string;
    }

    const { result } = renderHook(() => {
      const ref1 = useRef<ComplexType | null>(null);
      const ref2 = useRef<ComplexType | null>(null);
      const mergedRef = useMergeRefs(ref1, ref2);
      return { ref1, ref2, mergedRef };
    });

    const testObj: ComplexType = { id: 1, name: 'test' };
    result.current.mergedRef(testObj);

    expect(result.current.ref1.current).toEqual(testObj);
    expect(result.current.ref2.current).toEqual(testObj);
    expect(result.current.ref1.current).toBe(result.current.ref2.current);
  });

  it('should work with DOM element types', () => {
    const { result } = renderHook(() => {
      const ref1 = useRef<HTMLDivElement | null>(null);
      const ref2 = useRef<HTMLDivElement | null>(null);
      const mergedRef = useMergeRefs(ref1, ref2);
      return { ref1, ref2, mergedRef };
    });

    // Simulate setting a DOM element
    const mockElement = document.createElement('div');
    result.current.mergedRef(mockElement);

    expect(result.current.ref1.current).toBe(mockElement);
    expect(result.current.ref2.current).toBe(mockElement);
  });
});
