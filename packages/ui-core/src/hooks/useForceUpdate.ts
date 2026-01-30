/**
 * useForceUpdate Hook
 *
 * Forces a component re-render.
 * Shared by both React Native and Web implementations.
 */

import { useState, useCallback, useReducer } from 'react';

/**
 * Hook for forcing a component re-render
 *
 * Use sparingly - in most cases, proper state management is preferred.
 *
 * @returns Function to trigger re-render
 *
 * @example
 * ```tsx
 * function ExternalDataComponent() {
 *   const forceUpdate = useForceUpdate();
 *
 *   useEffect(() => {
 *     // Subscribe to external data source
 *     externalStore.subscribe(() => {
 *       forceUpdate();
 *     });
 *   }, [forceUpdate]);
 *
 *   return <Text>{externalStore.getValue()}</Text>;
 * }
 * ```
 */
export function useForceUpdate(): () => void {
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);
  return forceUpdate;
}

/**
 * Hook for forcing a re-render with update count
 *
 * @returns [updateCount, forceUpdate]
 *
 * @example
 * ```tsx
 * function Component() {
 *   const [updateCount, forceUpdate] = useForceUpdateWithCount();
 *
 *   return (
 *     <View>
 *       <Text>Rendered {updateCount} times</Text>
 *       <Button onPress={forceUpdate}>Re-render</Button>
 *     </View>
 *   );
 * }
 * ```
 */
export function useForceUpdateWithCount(): [number, () => void] {
  const [count, setCount] = useState(0);

  const forceUpdate = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return [count, forceUpdate];
}
