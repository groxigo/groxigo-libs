/**
 * Toast Component Contract
 *
 * Platform-agnostic interface for Toast/Notification component.
 */

import type { ReactNode } from 'react';

export type ToastStatus = 'info' | 'success' | 'warning' | 'error' | 'loading';
export type ToastPosition = 'top' | 'top-left' | 'top-right' | 'bottom' | 'bottom-left' | 'bottom-right';
export type ToastVariant = 'solid' | 'subtle' | 'left-accent' | 'top-accent';

/**
 * Toast options for creating a toast
 */
export interface ToastOptions {
  /** Toast ID (auto-generated if not provided) */
  id?: string;
  /** Toast title */
  title?: string;
  /** Toast description/message */
  description?: string;
  /** Toast status @default 'info' */
  status?: ToastStatus;
  /** Toast variant @default 'solid' */
  variant?: ToastVariant;
  /** Toast position @default 'bottom' */
  position?: ToastPosition;
  /** Duration in milliseconds (null for persistent) @default 5000 */
  duration?: number | null;
  /** Whether toast is closable @default true */
  isClosable?: boolean;
  /** Custom icon */
  icon?: ReactNode;
  /** Custom render function */
  render?: (props: { id: string; onClose: () => void }) => ReactNode;
  /** Close handler */
  onClose?: () => void;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Base Toast props that all platforms must support
 */
export interface ToastPropsBase extends ToastOptions {
  /** Toast ID */
  id: string;
  /** Close handler */
  onClose: () => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Toast hook return type
 */
export interface UseToastReturn {
  /** Show a toast */
  toast: (options: ToastOptions) => string;
  /** Show info toast */
  info: (options: Omit<ToastOptions, 'status'>) => string;
  /** Show success toast */
  success: (options: Omit<ToastOptions, 'status'>) => string;
  /** Show warning toast */
  warning: (options: Omit<ToastOptions, 'status'>) => string;
  /** Show error toast */
  error: (options: Omit<ToastOptions, 'status'>) => string;
  /** Show loading toast */
  loading: (options: Omit<ToastOptions, 'status'>) => string;
  /** Update an existing toast */
  update: (id: string, options: Partial<ToastOptions>) => void;
  /** Close a specific toast */
  close: (id: string) => void;
  /** Close all toasts */
  closeAll: () => void;
  /** Check if a toast is active */
  isActive: (id: string) => boolean;
}

/**
 * Toast Provider props
 */
export interface ToastProviderPropsBase {
  /** Default toast options */
  defaultOptions?: Partial<ToastOptions>;
  /** Maximum number of toasts @default 5 */
  limit?: number;
  /** Children */
  children?: ReactNode;
}
