/**
 * useLatest Hook
 *
 * Returns a ref object whose .current property is always the latest value.
 * Shared by both React Native and Web implementations.
 */

import { useRef, useLayoutEffect, useEffect } from 'react';

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Hook that returns a ref with the latest value
 *
 * @param value - The value to track
 * @returns Ref object with latest value
 *
 * @example
 * ```tsx
 * function Component({ callback }) {
 *   const latestCallback = useLatest(callback);
 *
 *   useEffect(() => {
 *     const interval = setInterval(() => {
 *       // Always calls the latest callback
 *       latestCallback.current?.();
 *     }, 1000);
 *
 *     return () => clearInterval(interval);
 *   }, []); // No dependency on callback
 * }
 * ```
 */
export function useLatest<T>(value: T): React.MutableRefObject<T> {
  const ref = useRef(value);

  useIsomorphicLayoutEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}
