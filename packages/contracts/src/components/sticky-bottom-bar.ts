/**
 * StickyBottomBar Component Contract
 *
 * Platform-agnostic interface for a fixed bottom action bar.
 */

import type { ReactNode } from 'react';

export type StickyBottomBarVariant = 'singleAction' | 'withPrice';

export interface StickyBottomBarPropsBase {
  /** Layout variant */
  variant?: StickyBottomBarVariant;
  /** Price label, e.g. "Total" (withPrice variant) */
  label?: string;
  /** Formatted price string, e.g. "$4.99" (withPrice variant) */
  price?: string;
  /** Button text */
  buttonText?: string;
  /** Button press handler */
  onButtonPress?: () => void;
  /** Show loading spinner on the button */
  isLoading?: boolean;
  /** Test ID for testing */
  testID?: string;
  /** Custom content — replaces the default button rendering */
  children?: ReactNode;
}
