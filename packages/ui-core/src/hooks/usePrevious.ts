/**
 * usePrevious Hook
 *
 * Tracks the previous value of a variable.
 * Shared by both React Native and Web implementations.
 */

import { useRef, useEffect } from 'react';

/**
 * Hook for tracking the previous value
 *
 * @param value - The value to track
 * @returns Previous value (undefined on first render)
 *
 * @example
 * ```tsx
 * function Counter() {
 *   const [count, setCount] = useState(0);
 *   const prevCount = usePrevious(count);
 *
 *   return (
 *     <View>
 *       <Text>Current: {count}, Previous: {prevCount ?? 'none'}</Text>
 *       <Button onPress={() => setCount(count + 1)}>Increment</Button>
 *     </View>
 *   );
 * }
 * ```
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * Hook for tracking the previous value with initial value support
 *
 * @param value - The value to track
 * @param initialValue - Initial value to use on first render
 * @returns Previous value
 */
export function usePreviousWithInitial<T>(value: T, initialValue: T): T {
  const ref = useRef<T>(initialValue);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * Hook that returns both current and previous values
 *
 * @param value - The value to track
 * @returns [currentValue, previousValue]
 *
 * @example
 * ```tsx
 * function PriceDisplay({ price }) {
 *   const [current, previous] = useCurrentAndPrevious(price);
 *   const priceChange = previous !== undefined ? current - previous : 0;
 *
 *   return (
 *     <View>
 *       <Text>${current}</Text>
 *       {priceChange !== 0 && (
 *         <Text style={{ color: priceChange > 0 ? 'green' : 'red' }}>
 *           {priceChange > 0 ? '+' : ''}{priceChange}
 *         </Text>
 *       )}
 *     </View>
 *   );
 * }
 * ```
 */
export function useCurrentAndPrevious<T>(value: T): [T, T | undefined] {
  const previous = usePrevious(value);
  return [value, previous];
}
