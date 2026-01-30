/**
 * Badge Component (Web)
 */

import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { BadgeVariant, BadgeColorScheme, BadgeSize } from '@groxigo/contracts';

const sizeClasses: Record<string, string> = {
  xs: 'text-xs px-1.5 py-0.5',
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
  lg: 'text-base px-3 py-1',
};

const variantColorClasses: Record<string, Record<string, string>> = {
  solid: {
    primary: 'bg-primary-500 text-white',
    secondary: 'bg-secondary-500 text-white',
    accent: 'bg-accent-500 text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-gray-900',
    error: 'bg-error text-white',
    info: 'bg-info text-white',
    neutral: 'bg-gray-500 text-white',
  },
  outline: {
    primary: 'border border-primary-500 text-primary-600',
    secondary: 'border border-secondary-500 text-secondary-600',
    accent: 'border border-accent-500 text-accent-600',
    success: 'border border-success text-success',
    warning: 'border border-warning-dark text-warning-dark',
    error: 'border border-error text-error',
    info: 'border border-info text-info',
    neutral: 'border border-gray-400 text-gray-600',
  },
  subtle: {
    primary: 'bg-primary-50 text-primary-700',
    secondary: 'bg-secondary-50 text-secondary-700',
    accent: 'bg-accent-50 text-accent-700',
    success: 'bg-green-50 text-green-700',
    warning: 'bg-yellow-50 text-yellow-700',
    error: 'bg-red-50 text-red-700',
    info: 'bg-blue-50 text-blue-700',
    neutral: 'bg-gray-100 text-gray-700',
  },
  soft: {
    primary: 'bg-primary-100 text-primary-800',
    secondary: 'bg-secondary-100 text-secondary-800',
    accent: 'bg-accent-100 text-accent-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    neutral: 'bg-gray-200 text-gray-800',
  },
};

export interface BadgeProps {
  variant?: BadgeVariant;
  colorScheme?: BadgeColorScheme;
  size?: BadgeSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rounded?: boolean;
  children?: React.ReactNode;
  className?: string;
  testID?: string;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'subtle',
      colorScheme = 'neutral',
      size = 'md',
      leftIcon,
      rightIcon,
      rounded = false,
      children,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      'inline-flex items-center gap-1 font-medium',
      sizeClasses[size],
      variantColorClasses[variant]?.[colorScheme],
      rounded ? 'rounded-full' : 'rounded',
      className
    );

    return (
      <span ref={ref} className={classes} data-testid={testID} {...props}>
        {leftIcon}
        {children}
        {rightIcon}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;
