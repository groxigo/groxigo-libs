/**
 * useMergeRefs Hook
 *
 * Merges multiple refs into one.
 * Shared by both React Native and Web implementations.
 */

import { useCallback, type Ref, type MutableRefObject, type RefCallback } from 'react';

type PossibleRef<T> = Ref<T> | undefined | null;

/**
 * Set a ref value, handling both callback refs and ref objects
 */
function setRef<T>(ref: PossibleRef<T>, value: T): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as MutableRefObject<T>).current = value;
  }
}

/**
 * Merge multiple refs into a single callback ref
 *
 * @param refs - Array of refs to merge
 * @returns Merged callback ref
 *
 * @example
 * ```tsx
 * function Input({ innerRef, ...props }) {
 *   const localRef = useRef(null);
 *   const mergedRef = mergeRefs([localRef, innerRef]);
 *
 *   return <input ref={mergedRef} {...props} />;
 * }
 * ```
 */
export function mergeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  return (value: T) => {
    refs.forEach((ref) => setRef(ref, value));
  };
}

/**
 * Hook for merging multiple refs into one
 * Memoized version of mergeRefs
 *
 * @param refs - Array of refs to merge
 * @returns Merged callback ref
 *
 * @example
 * ```tsx
 * const Button = forwardRef(function Button({ onClick, children }, ref) {
 *   const internalRef = useRef(null);
 *   const mergedRef = useMergeRefs(ref, internalRef);
 *
 *   return (
 *     <button ref={mergedRef} onClick={onClick}>
 *       {children}
 *     </button>
 *   );
 * });
 * ```
 */
export function useMergeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(mergeRefs(...refs), refs);
}
