/**
 * useCallbackRef Hook
 *
 * Creates a stable callback reference that always has the latest callback.
 * Shared by both React Native and Web implementations.
 */

import { useRef, useEffect, useCallback, useMemo } from 'react';

/**
 * Hook for creating a stable callback ref that always has the latest callback
 *
 * This is useful when you need to pass a callback to a memoized component
 * or effect that shouldn't re-run when the callback changes.
 *
 * @param callback - The callback function
 * @returns Stable callback reference
 *
 * @example
 * ```tsx
 * function Component({ onSubmit }) {
 *   const onSubmitRef = useCallbackRef(onSubmit);
 *
 *   // This effect only runs once, but always calls the latest onSubmit
 *   useEffect(() => {
 *     const handleKeyDown = (e) => {
 *       if (e.key === 'Enter') {
 *         onSubmitRef();
 *       }
 *     };
 *     window.addEventListener('keydown', handleKeyDown);
 *     return () => window.removeEventListener('keydown', handleKeyDown);
 *   }, []); // No dependency on onSubmit!
 *
 *   return <Form />;
 * }
 * ```
 */
export function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T | undefined
): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Return a stable function that calls the latest callback
  return useMemo(() => {
    const fn = (...args: Parameters<T>): ReturnType<T> => {
      return callbackRef.current?.(...args);
    };
    return fn as T;
  }, []);
}

/**
 * Hook for creating a stable event handler
 * Similar to useCallbackRef but returns undefined if no callback is provided
 *
 * @param callback - The callback function
 * @returns Stable callback or undefined
 */
export function useEventCallback<T extends (...args: any[]) => any>(
  callback: T | undefined
): T | undefined {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const stableCallback = useCallback((...args: Parameters<T>): ReturnType<T> | undefined => {
    return callbackRef.current?.(...args);
  }, []) as T;

  return callback ? stableCallback : undefined;
}
