/**
 * Toast Component (Web)
 *
 * Implements @groxigo/contracts ToastPropsBase for web platform.
 * A notification toast component with support for different statuses,
 * variants, positions, and auto-dismiss functionality.
 */

import React, { forwardRef, useEffect, useCallback } from 'react';
import { cn } from '../../utils/cn';
import type { ToastPropsBase, ToastStatus, ToastVariant, ToastPosition } from '@groxigo/contracts';

// Status icon components
const CheckCircleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const ExclamationCircleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const ExclamationTriangleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const InformationCircleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

const LoadingIcon = () => (
  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const CloseIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
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
  loading: LoadingIcon,
};

// Status color classes for different variants
const statusColors: Record<ToastStatus, Record<ToastVariant, string>> = {
  success: {
    solid: 'bg-success text-white',
    subtle: 'bg-green-50 text-green-800 border border-green-200',
    'left-accent': 'bg-green-50 text-green-800 border-l-4 border-l-success',
    'top-accent': 'bg-green-50 text-green-800 border-t-4 border-t-success',
  },
  error: {
    solid: 'bg-error text-white',
    subtle: 'bg-red-50 text-red-800 border border-red-200',
    'left-accent': 'bg-red-50 text-red-800 border-l-4 border-l-error',
    'top-accent': 'bg-red-50 text-red-800 border-t-4 border-t-error',
  },
  warning: {
    solid: 'bg-warning text-gray-900',
    subtle: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
    'left-accent': 'bg-yellow-50 text-yellow-800 border-l-4 border-l-warning',
    'top-accent': 'bg-yellow-50 text-yellow-800 border-t-4 border-t-warning',
  },
  info: {
    solid: 'bg-info text-white',
    subtle: 'bg-blue-50 text-blue-800 border border-blue-200',
    'left-accent': 'bg-blue-50 text-blue-800 border-l-4 border-l-info',
    'top-accent': 'bg-blue-50 text-blue-800 border-t-4 border-t-info',
  },
  loading: {
    solid: 'bg-gray-600 text-white',
    subtle: 'bg-gray-50 text-gray-800 border border-gray-200',
    'left-accent': 'bg-gray-50 text-gray-800 border-l-4 border-l-gray-500',
    'top-accent': 'bg-gray-50 text-gray-800 border-t-4 border-t-gray-500',
  },
};

// Icon color classes for subtle/accent variants
const iconColors: Record<ToastStatus, string> = {
  success: 'text-success',
  error: 'text-error',
  warning: 'text-warning-dark',
  info: 'text-info',
  loading: 'text-gray-500',
};

export interface ToastProps extends ToastPropsBase {}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      id,
      title,
      description,
      status = 'info',
      variant = 'solid',
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
    const isSolid = variant === 'solid';
    const iconColorClass = isSolid ? '' : iconColors[status];

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          'flex items-start gap-3 p-4 rounded-lg shadow-lg min-w-[300px] max-w-md',
          'animate-in slide-in-from-top-2 fade-in duration-200',
          statusColors[status][variant],
          className
        )}
        data-testid={testID}
        {...props}
      >
        {/* Icon */}
        <div className={cn('flex-shrink-0', iconColorClass)}>
          {icon || <StatusIcon />}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <p className={cn('font-semibold text-sm', isSolid ? '' : 'text-gray-900')}>
              {title}
            </p>
          )}
          {description && (
            <p
              className={cn(
                'text-sm mt-0.5',
                isSolid ? 'opacity-90' : 'text-gray-600'
              )}
            >
              {description}
            </p>
          )}
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className={cn(
                'mt-2 text-sm font-medium underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 rounded',
                isSolid
                  ? 'text-white/90 hover:text-white focus:ring-white/50'
                  : iconColors[status]
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
            className={cn(
              'flex-shrink-0 rounded-md p-1 -m-1 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1',
              isSolid
                ? 'text-white/70 hover:text-white hover:bg-white/10 focus:ring-white/50'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:ring-gray-400'
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
