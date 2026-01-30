/**
 * useToast Hook (Web)
 *
 * Hook for showing toast notifications.
 * Must be used within a ToastProvider.
 */

import { useCallback, useMemo } from 'react';
import { useToastContext } from './ToastProvider';
import type { ToastOptions, UseToastReturn } from '@groxigo/contracts';

/**
 * Hook for managing toast notifications
 *
 * @example
 * ```tsx
 * const { toast, success, error } = useToast();
 *
 * // Show a basic toast
 * toast({ title: 'Hello', description: 'World' });
 *
 * // Show a success toast
 * success({ title: 'Saved!', description: 'Your changes have been saved.' });
 *
 * // Show an error toast
 * error({ title: 'Error', description: 'Something went wrong.' });
 * ```
 */
export function useToast(): UseToastReturn {
  const { addToast, updateToast, removeToast, removeAllToasts, isActive } = useToastContext();

  const toast = useCallback(
    (options: ToastOptions): string => {
      return addToast(options);
    },
    [addToast]
  );

  const info = useCallback(
    (options: Omit<ToastOptions, 'status'>): string => {
      return addToast({ ...options, status: 'info' });
    },
    [addToast]
  );

  const success = useCallback(
    (options: Omit<ToastOptions, 'status'>): string => {
      return addToast({ ...options, status: 'success' });
    },
    [addToast]
  );

  const warning = useCallback(
    (options: Omit<ToastOptions, 'status'>): string => {
      return addToast({ ...options, status: 'warning' });
    },
    [addToast]
  );

  const error = useCallback(
    (options: Omit<ToastOptions, 'status'>): string => {
      return addToast({ ...options, status: 'error' });
    },
    [addToast]
  );

  const loading = useCallback(
    (options: Omit<ToastOptions, 'status'>): string => {
      // Loading toasts don't auto-dismiss by default
      return addToast({
        ...options,
        status: 'loading',
        duration: options.duration !== undefined ? options.duration : null,
        isClosable: options.isClosable !== undefined ? options.isClosable : false,
      });
    },
    [addToast]
  );

  const update = useCallback(
    (id: string, options: Partial<ToastOptions>): void => {
      updateToast(id, options);
    },
    [updateToast]
  );

  const close = useCallback(
    (id: string): void => {
      removeToast(id);
    },
    [removeToast]
  );

  const closeAll = useCallback((): void => {
    removeAllToasts();
  }, [removeAllToasts]);

  return useMemo(
    () => ({
      toast,
      info,
      success,
      warning,
      error,
      loading,
      update,
      close,
      closeAll,
      isActive,
    }),
    [toast, info, success, warning, error, loading, update, close, closeAll, isActive]
  );
}

export default useToast;
