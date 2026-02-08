/**
 * Badge Component (Web)
 */

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { BadgeVariant, BadgeColorScheme, BadgeSize } from '@groxigo/contracts';
import styles from './Badge.module.css';

const sizeClassMap: Record<string, string> = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

const variantColorClassMap: Record<string, Record<string, string>> = {
  solid: {
    primary: styles.solidPrimary,
    secondary: styles.solidSecondary,
    accent: styles.solidAccent,
    success: styles.solidSuccess,
    warning: styles.solidWarning,
    error: styles.solidError,
    info: styles.solidInfo,
    neutral: styles.solidNeutral,
  },
  outline: {
    primary: styles.outlinePrimary,
    secondary: styles.outlineSecondary,
    accent: styles.outlineAccent,
    success: styles.outlineSuccess,
    warning: styles.outlineWarning,
    error: styles.outlineError,
    info: styles.outlineInfo,
    neutral: styles.outlineNeutral,
  },
  subtle: {
    primary: styles.subtlePrimary,
    secondary: styles.subtleSecondary,
    accent: styles.subtleAccent,
    success: styles.subtleSuccess,
    warning: styles.subtleWarning,
    error: styles.subtleError,
    info: styles.subtleInfo,
    neutral: styles.subtleNeutral,
  },
  soft: {
    primary: styles.softPrimary,
    secondary: styles.softSecondary,
    accent: styles.softAccent,
    success: styles.softSuccess,
    warning: styles.softWarning,
    error: styles.softError,
    info: styles.softInfo,
    neutral: styles.softNeutral,
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
    const classes = clsx(
      styles.badge,
      sizeClassMap[size],
      variantColorClassMap[variant]?.[colorScheme],
      rounded ? styles.rounded : styles.square,
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
