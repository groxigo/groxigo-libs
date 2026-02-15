'use client';

/**
 * Button Component (Web)
 *
 * Implements @groxigo/contracts ButtonPropsBase for web platform.
 * Uses CSS Modules + design token CSS custom properties instead of Tailwind.
 *
 * Accessibility features:
 * - Uses focus-visible for keyboard-only focus indicators
 * - Proper disabled state handling
 * - Accessible loading state with aria-busy
 */

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { ButtonPropsBase } from '@groxigo/contracts';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonPropsBase {
  className?: string;
  /** HTML button type */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler (alias for onPress) */
  onClick?: () => void;
  /**
   * Whether to apply responsive sizing for tablets/large screens
   * When true, button sizes automatically scale up on larger devices
   * via CSS custom property media queries in tokens.css
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

    // Build class list from CSS Module styles
    // Responsive scaling is handled by CSS custom properties that
    // change per breakpoint (defined in tokens.css media queries).
    // The `responsive` prop is preserved for API compatibility but
    // responsive behavior is now the default via token CSS vars.
    const classes = clsx(
      styles.button,
      styles[size],
      styles[variant],
      styles[colorScheme],
      iconOnly && styles.iconOnly,
      fullWidth && styles.fullWidth,
      loading && styles.loading,
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
              className={styles.spinner}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                opacity={0.25}
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                opacity={0.75}
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {loadingText ? (
              <span>{loadingText}</span>
            ) : (
              <span className={styles.srOnly}>Loading</span>
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
