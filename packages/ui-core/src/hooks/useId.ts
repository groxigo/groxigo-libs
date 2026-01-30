/**
 * useId Hook
 *
 * Generates stable unique IDs for accessibility.
 * Shared by both React Native and Web implementations.
 */

import { useRef, useState, useEffect } from 'react';

// Global counter for generating unique IDs
let idCounter = 0;

/**
 * Generate a unique ID
 */
function generateId(prefix: string = 'groxigo'): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/**
 * Hook for generating a stable unique ID
 *
 * Note: React 18+ has useId built-in. This is a fallback for compatibility.
 *
 * @param providedId - Optional provided ID (takes precedence)
 * @param prefix - Prefix for generated IDs
 * @returns Stable unique ID
 *
 * @example
 * ```tsx
 * function TextField({ id: providedId, label }) {
 *   const id = useId(providedId);
 *   const labelId = `${id}-label`;
 *   const errorId = `${id}-error`;
 *
 *   return (
 *     <View>
 *       <Text id={labelId}>{label}</Text>
 *       <Input
 *         id={id}
 *         aria-labelledby={labelId}
 *         aria-describedby={errorId}
 *       />
 *     </View>
 *   );
 * }
 * ```
 */
export function useId(providedId?: string, prefix: string = 'groxigo'): string {
  // If an ID is provided, use it
  if (providedId) {
    return providedId;
  }

  // Generate a stable ID on mount
  const idRef = useRef<string | undefined>(undefined);

  if (!idRef.current) {
    idRef.current = generateId(prefix);
  }

  return idRef.current;
}

/**
 * Hook for generating multiple related IDs
 *
 * @param baseId - Optional base ID
 * @param suffixes - Array of suffixes for related IDs
 * @returns Object with generated IDs
 *
 * @example
 * ```tsx
 * function FormField({ id, label, error }) {
 *   const ids = useIds(id, ['label', 'input', 'error', 'helper']);
 *
 *   return (
 *     <View>
 *       <Text id={ids.label}>{label}</Text>
 *       <Input
 *         id={ids.input}
 *         aria-labelledby={ids.label}
 *         aria-describedby={error ? ids.error : ids.helper}
 *       />
 *       {error && <Text id={ids.error}>{error}</Text>}
 *     </View>
 *   );
 * }
 * ```
 */
export function useIds<T extends string>(
  baseId?: string,
  suffixes: readonly T[] = [] as readonly T[]
): Record<T | 'base', string> {
  const base = useId(baseId);

  const ids: Record<string, string> = { base };

  suffixes.forEach((suffix) => {
    ids[suffix] = `${base}-${suffix}`;
  });

  return ids as Record<T | 'base', string>;
}

/**
 * SSR-safe useId hook
 * Returns undefined during SSR and generates ID on client
 */
export function useSSRSafeId(providedId?: string): string | undefined {
  const [id, setId] = useState<string | undefined>(providedId);

  useEffect(() => {
    if (!providedId) {
      setId(generateId('groxigo'));
    }
  }, [providedId]);

  return id;
}
