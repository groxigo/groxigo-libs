/**
 * Grid Component Contract
 *
 * Platform-agnostic interface for an auto-fill responsive grid layout.
 */

import type { ReactNode } from 'react';

export interface GridItemBase {
  id: string;
}

export interface GridPropsBase<T extends GridItemBase = GridItemBase> {
  /** Items to render */
  items: T[];
  /** Render function for each item */
  renderItem: (item: T) => ReactNode;
  /** Minimum item width for auto-fill columns @default 140 */
  minItemWidth?: number;
  /** Minimum item width on large screens. Falls back to minItemWidth. */
  minItemWidthLg?: number;
  /** Maximum item width (caps cell size) */
  maxItemWidth?: number;
  /** Fixed number of columns (overrides minItemWidth) */
  columns?: number;
  /** Minimum number of columns to show regardless of item width */
  minColumns?: number;
  /** Gap between items in pixels @default 16 */
  gap?: number;
  /** Test ID for testing */
  testID?: string;
}
