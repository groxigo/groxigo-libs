/**
 * useUpdateEffect Hook
 *
 * Like useEffect, but skips the initial mount.
 * Shared by both React Native and Web implementations.
 */

import { useEffect, useRef, type DependencyList, type EffectCallback } from 'react';

/**
 * Hook that runs an effect only on updates, not on initial mount
 *
 * @param effect - Effect callback
 * @param deps - Dependencies array
 *
 * @example
 * ```tsx
 * function SearchResults({ query }) {
 *   useUpdateEffect(() => {
 *     // This won't run on initial mount, only when query changes
 *     trackSearchQuery(query);
 *   }, [query]);
 *
 *   return <Results query={query} />;
 * }
 * ```
 */
export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Hook that returns whether this is the first render
 *
 * @returns Whether this is the first render
 *
 * @example
 * ```tsx
 * function Component({ value }) {
 *   const isFirstRender = useIsFirstRender();
 *
 *   if (isFirstRender) {
 *     // Initial render logic
 *   }
 *
 *   return <View>...</View>;
 * }
 * ```
 */
export function useIsFirstRender(): boolean {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }

  return false;
}
