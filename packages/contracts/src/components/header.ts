/**
 * Header Component Contract
 *
 * Platform-agnostic interface for Header component.
 */

import type { ReactNode } from 'react';

export type HeaderSection = 'groceries' | 'recipes' | 'default';

/**
 * Base Header props that all platforms must support
 */
export interface HeaderPropsBase {
  /** Header title */
  title?: string;
  /** Left action (back button, menu, etc.) */
  leftAction?: ReactNode;
  /** Right actions (buttons, icons, etc.) */
  rightActions?: ReactNode[];
  /** Whether header has shadow/elevation @default true */
  elevated?: boolean;
  /** Section for theming */
  section?: HeaderSection;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
