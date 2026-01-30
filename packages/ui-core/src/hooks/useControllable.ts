/**
 * useControllable Hook
 *
 * Handles controlled vs uncontrolled component state.
 * Shared by both React Native and Web implementations.
 */

import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseControllableOptions<T> {
  /** Controlled value (from props) */
  value?: T;
  /** Default value for uncontrolled mode */
  defaultValue?: T;
  /** Change handler */
  onChange?: (value: T) => void;
}

export interface UseControllableReturn<T> {
  /** Current value */
  value: T;
  /** Update value */
  setValue: (value: T | ((prev: T) => T)) => void;
  /** Whether the component is controlled */
  isControlled: boolean;
}

/**
 * Hook for managing controlled/uncontrolled component state
 *
 * @example
 * ```tsx
 * function Input({ value: valueProp, defaultValue, onChange }: Props) {
 *   const { value, setValue, isControlled } = useControllable({
 *     value: valueProp,
 *     defaultValue: defaultValue ?? '',
 *     onChange,
 *   });
 *
 *   return (
 *     <input
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *     />
 *   );
 * }
 * ```
 */
export function useControllable<T>(
  options: UseControllableOptions<T>
): UseControllableReturn<T> {
  const { value: valueProp, defaultValue, onChange } = options;

  // Determine if controlled on mount and keep it stable
  const isControlledRef = useRef(valueProp !== undefined);
  const isControlled = isControlledRef.current;

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<T>(() => {
    if (isControlled) {
      return valueProp as T;
    }
    return defaultValue as T;
  });

  // Get the current value
  const value = isControlled ? (valueProp as T) : internalValue;

  // Warn in development if controlled state changes
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const wasControlled = isControlledRef.current;
      const nowControlled = valueProp !== undefined;

      if (wasControlled && !nowControlled) {
        console.warn(
          'A component changed from controlled to uncontrolled. ' +
            'This is likely caused by the value prop changing from a defined value to undefined. ' +
            'Decide between using a controlled or uncontrolled component for the lifetime of the component.'
        );
      }

      if (!wasControlled && nowControlled) {
        console.warn(
          'A component changed from uncontrolled to controlled. ' +
            'This is likely caused by the value prop changing from undefined to a defined value. ' +
            'Decide between using a controlled or uncontrolled component for the lifetime of the component.'
        );
      }
    }
  }, [valueProp]);

  // setValue that works for both modes
  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const nextValue = typeof next === 'function' ? (next as (prev: T) => T)(value) : next;

      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onChange?.(nextValue);
    },
    [isControlled, onChange, value]
  );

  return {
    value,
    setValue,
    isControlled,
  };
}
