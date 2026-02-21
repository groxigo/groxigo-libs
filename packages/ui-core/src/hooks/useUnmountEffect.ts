/**
 * useUnmountEffect Hook
 *
 * Runs a callback when the component unmounts.
 * Shared by both React Native and Web implementations.
 */

import { useEffect, useRef, type MutableRefObject } from 'react';

/**
 * Hook that runs a callback when the component unmounts
 *
 * @param callback - The callback to run on unmount
 *
 * @example
 * ```tsx
 * function Modal({ onClose }) {
 *   useUnmountEffect(() => {
 *     // Cleanup when modal is removed from DOM
 *     onClose?.();
 *   });
 *
 *   return <View>...</View>;
 * }
 * ```
 */
export function useUnmountEffect(callback: () => void): void {
  const callbackRef = useRef(callback);

  // Keep ref updated
  callbackRef.current = callback;

  useEffect(() => {
    return () => {
      callbackRef.current();
    };
  }, []);
}

/**
 * Hook that returns whether the component is mounted
 *
 * @returns Ref object indicating mount status
 *
 * @example
 * ```tsx
 * function AsyncComponent() {
 *   const isMounted = useIsMounted();
 *   const [data, setData] = useState(null);
 *
 *   useEffect(() => {
 *     fetchData().then((result) => {
 *       // Only update state if still mounted
 *       if (isMounted.current) {
 *         setData(result);
 *       }
 *     });
 *   }, []);
 *
 *   return data ? <Text>{data}</Text> : <Spinner />;
 * }
 * ```
 */
export function useIsMounted(): MutableRefObject<boolean> {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
