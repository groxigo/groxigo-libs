/**
 * FloatingCartButton Component Contract
 *
 * Platform-agnostic interface for a floating action button showing cart count.
 */

import type { ReactNode } from 'react';

export interface FloatingCartButtonPropsBase {
  /** Number of items in cart */
  count?: number;
  /** Custom cart icon */
  icon?: ReactNode;
  /** Press handler */
  onPress?: () => void;
  /** Test ID for testing */
  testID?: string;
}
