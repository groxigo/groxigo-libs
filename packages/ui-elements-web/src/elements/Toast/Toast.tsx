/**
 * Toast Component (Web)
 *
 * Implements @groxigo/contracts ToastPropsBase for web platform.
 * A notification toast component with support for different statuses,
 * variants, positions, and auto-dismiss functionality.
 */

import React, { forwardRef, useEffect, useCallback } from 'react';
import { clsx } from 'clsx';
import type { ToastPropsBase, ToastStatus, ToastVariant } from '@groxigo/contracts';
import styles from './Toast.module.css';

// Status icon components
const CheckCircleIcon = () => (
  <svg className={styles.iconSvg} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const ExclamationCircleIcon = () => (
  <svg className={styles.iconSvg} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const ExclamationTriangleIcon = () => (
  <svg className={styles.iconSvg} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const InformationCircleIcon = () => (
  <svg className={styles.iconSvg} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

const CloseIcon = () => (
  <svg className={styles.closeIconSvg} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

// Status to icon mapping
const statusIcons: Record<ToastStatus, React.FC> = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
};

// Status + variant class mapping
const statusVariantClassMap: Record<ToastStatus, Record<ToastVariant, string>> = {
  success: {
    subtle: styles.subtleSuccess,
    'left-accent': styles.leftAccentSuccess,
  },
  error: {
    subtle: styles.subtleError,
    'left-accent': styles.leftAccentError,
  },
  warning: {
    subtle: styles.subtleWarning,
    'left-accent': styles.leftAccentWarning,
  },
  info: {
    subtle: styles.subtleInfo,
    'left-accent': styles.leftAccentInfo,
  },
};

// Icon color classes for non-solid variants
const iconColorClassMap: Record<ToastStatus, string> = {
  success: styles.iconSuccess,
  error: styles.iconError,
  warning: styles.iconWarning,
  info: styles.iconInfo,
};

// Action button color classes for non-solid variants
const actionColorClassMap: Record<ToastStatus, string> = {
  success: styles.actionSuccess,
  error: styles.actionError,
  warning: styles.actionWarning,
  info: styles.actionInfo,
};

export interface ToastProps extends ToastPropsBase {}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      id,
      title,
      description,
      status = 'info',
      variant = 'subtle',
      duration = 5000,
      isClosable = true,
      icon,
      render,
      onClose,
      action,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    // Auto-dismiss timer
    useEffect(() => {
      if (duration !== null && duration > 0 && onClose) {
        const timer = setTimeout(() => {
          onClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, onClose]);

    const handleClose = useCallback(() => {
      onClose?.();
    }, [onClose]);

    // Custom render function
    if (render) {
      return <>{render({ id, onClose: handleClose })}</>;
    }

    const StatusIcon = statusIcons[status];
    const iconColorClass = iconColorClassMap[status];

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        className={clsx(
          styles.toast,
          statusVariantClassMap[status][variant],
          className
        )}
        data-testid={testID}
        {...props}
      >
        {/* Icon */}
        <div className={clsx(styles.icon, iconColorClass)}>
          {icon || <StatusIcon />}
        </div>

        {/* Content */}
        <div className={styles.content}>
          {title && (
            <p className={clsx(styles.title, styles.titleSubtle)}>
              {title}
            </p>
          )}
          {description && (
            <p
              className={clsx(
                styles.description,
                styles.descriptionSubtle
              )}
            >
              {description}
            </p>
          )}
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className={clsx(
                styles.actionButton,
                actionColorClassMap[status]
              )}
            >
              {action.label}
            </button>
          )}
        </div>

        {/* Close button */}
        {isClosable && (
          <button
            type="button"
            onClick={handleClose}
            className={clsx(
              styles.closeButton,
              styles.closeButtonSubtle
            )}
            aria-label="Close notification"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export default Toast;
