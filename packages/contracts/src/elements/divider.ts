/**
 * Divider Component Contract
 *
 * Platform-agnostic interface for Divider component.
 */

import type { ReactNode } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

/**
 * Base Divider props that all platforms must support
 */
export interface DividerPropsBase {
  /** Divider orientation @default 'horizontal' */
  orientation?: DividerOrientation;
  /** Divider style @default 'solid' */
  variant?: DividerVariant;
  /** Divider color */
  color?: string;
  /** Spacing around divider */
  spacing?: number;
  /** Test ID for testing */
  testID?: string;
}
