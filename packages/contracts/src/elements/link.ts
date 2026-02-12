/**
 * Link Component Contract
 *
 * Platform-agnostic interface for Link component.
 */

import type { ReactNode } from 'react';

export type LinkColorScheme = 'default' | 'primary' | 'muted';
export type LinkSize = 'sm' | 'md';

/**
 * Base Link props that all platforms must support
 */
export interface LinkPropsBase {
  /** Link destination */
  href?: string;
  /** Whether link opens in new tab @default false */
  isExternal?: boolean;
  /** Link size @default 'md' */
  size?: LinkSize;
  /** Color scheme @default 'primary' */
  colorScheme?: LinkColorScheme;
  /** Whether to show underline @default true */
  underline?: boolean | 'hover' | 'always' | 'none';
  /** Whether link is disabled */
  disabled?: boolean;
  /** Link content */
  children?: ReactNode;
  /** Press/click handler */
  onPress?: () => void;
  /** Test ID for testing */
  testID?: string;
}
