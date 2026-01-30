/**
 * useThrottle Hook
 *
 * Throttles a value or callback.
 * Shared by both React Native and Web implementations.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook for throttling a value
 *
 * @param value - The value to throttle
 * @param interval - Interval in milliseconds
 * @returns Throttled value
 *
 * @example
 * ```tsx
 * function ScrollTracker() {
 *   const [scrollY, setScrollY] = useState(0);
 *   const throttledScrollY = useThrottle(scrollY, 100);
 *
 *   // Update analytics with throttled scroll position
 *   useEffect(() => {
 *     trackScroll(throttledScrollY);
 *   }, [throttledScrollY]);
 *
 *   return <ScrollView onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)} />;
 * }
 * ```
 */
export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecuted.current;

    if (timeSinceLastExecution >= interval) {
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      const timer = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, interval - timeSinceLastExecution);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [value, interval]);

  return throttledValue;
}

/**
 * Hook for creating a throttled callback
 *
 * @param callback - The callback to throttle
 * @param interval - Interval in milliseconds
 * @param deps - Dependencies array
 * @returns Throttled callback
 *
 * @example
 * ```tsx
 * function Resizer() {
 *   const handleResize = useThrottledCallback(
 *     (width, height) => {
 *       updateLayout(width, height);
 *     },
 *     100,
 *     []
 *   );
 *
 *   return <ResizableView onResize={handleResize} />;
 * }
 * ```
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  interval: number,
  deps: React.DependencyList = []
): (...args: Parameters<T>) => void {
  const lastExecuted = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const callbackRef = useRef<T>(callback);
  const lastArgsRef = useRef<Parameters<T> | undefined>(undefined);

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const timeSinceLastExecution = now - lastExecuted.current;
      lastArgsRef.current = args;

      if (timeSinceLastExecution >= interval) {
        lastExecuted.current = now;
        callbackRef.current(...args);
      } else {
        // Clear existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Schedule trailing call
        timeoutRef.current = setTimeout(() => {
          lastExecuted.current = Date.now();
          if (lastArgsRef.current) {
            callbackRef.current(...lastArgsRef.current);
          }
        }, interval - timeSinceLastExecution);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [interval, ...deps]
  );
}
