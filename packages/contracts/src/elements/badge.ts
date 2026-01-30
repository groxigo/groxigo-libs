/**
 * Badge Component Contract
 */

import type { ReactNode } from 'react';

export type BadgeVariant = 'solid' | 'outline' | 'subtle' | 'soft';
export type BadgeColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

export interface BadgePropsBase {
  /** Badge variant @default 'subtle' */
  variant?: BadgeVariant;
  /** Color scheme @default 'neutral' */
  colorScheme?: BadgeColorScheme;
  /** Badge size @default 'md' */
  size?: BadgeSize;
  /** Left icon */
  leftIcon?: ReactNode;
  /** Right icon */
  rightIcon?: ReactNode;
  /** Rounded pill style */
  rounded?: boolean;
  /** Badge content */
  children?: ReactNode;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testID?: string;
}
