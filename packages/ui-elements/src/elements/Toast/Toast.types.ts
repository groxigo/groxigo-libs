/**
 * Toast Component Types
 */

import type { ViewProps, ViewStyle, StyleProp } from 'react-native';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface ToastProps extends Omit<ViewProps, 'style'> {
  /**
   * Toast message
   */
  message: string;

  /**
   * Optional title
   */
  title?: string;

  /**
   * Toast variant/type
   * @default 'info'
   */
  variant?: ToastVariant;

  /**
   * Duration in milliseconds (0 = persistent)
   * @default 3000
   */
  duration?: number;

  /**
   * Position of the toast
   * @default 'bottom'
   */
  position?: ToastPosition;

  /**
   * Whether to show close button
   * @default false
   */
  showCloseButton?: boolean;

  /**
   * Custom icon (optional)
   */
  icon?: React.ReactNode;

  /**
   * Action button label
   */
  actionLabel?: string;

  /**
   * Action button callback
   */
  onAction?: () => void;

  /**
   * Callback when toast is dismissed
   */
  onDismiss?: () => void;

  /**
   * Container style
   */
  style?: StyleProp<ViewStyle>;
}

export interface ToastContextValue {
  /**
   * Show a toast notification
   */
  showToast: (props: Omit<ToastProps, 'onDismiss'>) => void;

  /**
   * Hide current toast
   */
  hideToast: () => void;

  /**
   * Show success toast
   */
  success: (message: string, title?: string) => void;

  /**
   * Show error toast
   */
  error: (message: string, title?: string) => void;

  /**
   * Show warning toast
   */
  warning: (message: string, title?: string) => void;

  /**
   * Show info toast
   */
  info: (message: string, title?: string) => void;
}
