/**
 * Button Component (Web)
 *
 * Implements @groxigo/contracts ButtonPropsBase for web platform.
 *
 * Accessibility features:
 * - Uses focus-visible for keyboard-only focus indicators
 * - Proper disabled state handling
 * - Accessible loading state with aria-busy
 */

import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ButtonPropsBase } from '@groxigo/contracts';

// Base button classes
// Using focus-visible instead of focus for better UX (shows ring only on keyboard navigation)
const baseClasses =
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

// Size variants (base/phone)
const sizeClasses: Record<string, string> = {
  xs: 'h-6 px-2 text-xs rounded-sm gap-1',
  sm: 'h-8 px-3 text-sm rounded gap-1.5',
  md: 'h-10 px-4 text-base rounded-md gap-2',
  lg: 'h-12 px-6 text-md rounded-lg gap-2',
  xl: 'h-14 px-8 text-lg rounded-xl gap-3',
};

// Responsive size variants (scales up on larger screens - max 1.4x for UI)
const responsiveSizeClasses: Record<string, string> = {
  xs: 'h-6 md:h-7 lg:h-8 px-2 md:px-2.5 lg:px-3 text-xs md:text-sm rounded-sm gap-1',
  sm: 'h-8 md:h-9 lg:h-10 px-3 md:px-4 lg:px-4 text-sm md:text-base rounded gap-1.5 md:gap-2',
  md: 'h-10 md:h-11 lg:h-12 px-4 md:px-5 lg:px-6 text-base md:text-lg rounded-md gap-2',
  lg: 'h-12 md:h-14 lg:h-16 px-6 md:px-7 lg:px-8 text-md md:text-lg lg:text-xl rounded-lg gap-2 md:gap-3',
  xl: 'h-14 md:h-16 lg:h-18 px-8 md:px-10 lg:px-12 text-lg md:text-xl lg:text-2xl rounded-xl gap-3',
};

// Icon-only size variants
const iconOnlySizeClasses: Record<string, string> = {
  xs: 'h-6 w-6 p-0',
  sm: 'h-8 w-8 p-0',
  md: 'h-10 w-10 p-0',
  lg: 'h-12 w-12 p-0',
  xl: 'h-14 w-14 p-0',
};

// Responsive icon-only size variants
const responsiveIconOnlySizeClasses: Record<string, string> = {
  xs: 'h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 p-0',
  sm: 'h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 p-0',
  md: 'h-10 w-10 md:h-11 md:w-11 lg:h-12 lg:w-12 p-0',
  lg: 'h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 p-0',
  xl: 'h-14 w-14 md:h-16 md:w-16 lg:h-18 lg:w-18 p-0',
};

// Variant + ColorScheme combinations
// Using focus-visible:ring for keyboard-only focus indicators
const variantColorClasses: Record<string, Record<string, string>> = {
  solid: {
    primary:
      'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-500',
    secondary:
      'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 focus-visible:ring-secondary-500',
    accent:
      'bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700 focus-visible:ring-accent-500',
    success:
      'bg-success text-white hover:bg-success-dark active:bg-green-800 focus-visible:ring-success',
    warning:
      'bg-warning text-gray-900 hover:bg-warning-dark active:bg-yellow-600 focus-visible:ring-warning',
    error:
      'bg-error text-white hover:bg-error-dark active:bg-red-800 focus-visible:ring-error',
    info: 'bg-info text-white hover:bg-info-dark active:bg-blue-800 focus-visible:ring-info',
  },
  outline: {
    primary:
      'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary-500',
    secondary:
      'border-2 border-secondary-500 text-secondary-600 hover:bg-secondary-50 active:bg-secondary-100 focus-visible:ring-secondary-500',
    accent:
      'border-2 border-accent-500 text-accent-600 hover:bg-accent-50 active:bg-accent-100 focus-visible:ring-accent-500',
    success:
      'border-2 border-success text-success hover:bg-green-50 active:bg-green-100 focus-visible:ring-success',
    warning:
      'border-2 border-warning-dark text-warning-dark hover:bg-yellow-50 active:bg-yellow-100 focus-visible:ring-warning',
    error:
      'border-2 border-error text-error hover:bg-red-50 active:bg-red-100 focus-visible:ring-error',
    info: 'border-2 border-info text-info hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-info',
  },
  ghost: {
    primary:
      'text-primary-600 hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary-500',
    secondary:
      'text-secondary-600 hover:bg-secondary-50 active:bg-secondary-100 focus-visible:ring-secondary-500',
    accent:
      'text-accent-600 hover:bg-accent-50 active:bg-accent-100 focus-visible:ring-accent-500',
    success:
      'text-success hover:bg-green-50 active:bg-green-100 focus-visible:ring-success',
    warning:
      'text-warning-dark hover:bg-yellow-50 active:bg-yellow-100 focus-visible:ring-warning',
    error: 'text-error hover:bg-red-50 active:bg-red-100 focus-visible:ring-error',
    info: 'text-info hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-info',
  },
  link: {
    primary: 'text-primary-600 hover:underline focus-visible:ring-primary-500 p-0 h-auto',
    secondary:
      'text-secondary-600 hover:underline focus-visible:ring-secondary-500 p-0 h-auto',
    accent: 'text-accent-600 hover:underline focus-visible:ring-accent-500 p-0 h-auto',
    success: 'text-success hover:underline focus-visible:ring-success p-0 h-auto',
    warning: 'text-warning-dark hover:underline focus-visible:ring-warning p-0 h-auto',
    error: 'text-error hover:underline focus-visible:ring-error p-0 h-auto',
    info: 'text-info hover:underline focus-visible:ring-info p-0 h-auto',
  },
  soft: {
    primary:
      'bg-primary-100 text-primary-700 hover:bg-primary-200 active:bg-primary-300 focus-visible:ring-primary-500',
    secondary:
      'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 active:bg-secondary-300 focus-visible:ring-secondary-500',
    accent:
      'bg-accent-100 text-accent-700 hover:bg-accent-200 active:bg-accent-300 focus-visible:ring-accent-500',
    success:
      'bg-green-100 text-green-700 hover:bg-green-200 active:bg-green-300 focus-visible:ring-success',
    warning:
      'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 active:bg-yellow-300 focus-visible:ring-warning',
    error:
      'bg-red-100 text-red-700 hover:bg-red-200 active:bg-red-300 focus-visible:ring-error',
    info: 'bg-blue-100 text-blue-700 hover:bg-blue-200 active:bg-blue-300 focus-visible:ring-info',
  },
};

export interface ButtonProps extends ButtonPropsBase {
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler (alias for onPress) */
  onClick?: () => void;
  /**
   * Whether to apply responsive sizing for tablets/large screens
   * When true, button sizes automatically scale up on larger devices
   * @default true
   */
  responsive?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'solid',
      colorScheme = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      iconOnly = false,
      disabled,
      children,
      className,
      testID,
      onPress,
      onClick,
      type = 'button',
      responsive = true,
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      if (!disabled && !loading) {
        onPress?.();
        onClick?.();
      }
    };

    // Use responsive classes if responsive prop is true
    const sizeClass = responsive
      ? (iconOnly ? responsiveIconOnlySizeClasses[size] : responsiveSizeClasses[size])
      : (iconOnly ? iconOnlySizeClasses[size] : sizeClasses[size]);

    const classes = cn(
      baseClasses,
      sizeClass,
      variantColorClasses[variant]?.[colorScheme],
      fullWidth && 'w-full',
      loading && 'cursor-wait',
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || loading}
        onClick={handleClick}
        data-testid={testID}
        aria-busy={loading || undefined}
        aria-disabled={disabled || loading || undefined}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
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
            {loadingText ? (
              <span>{loadingText}</span>
            ) : (
              <span className="sr-only">Loading</span>
            )}
          </>
        ) : (
          <>
            {leftIcon}
            {!iconOnly && children}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
