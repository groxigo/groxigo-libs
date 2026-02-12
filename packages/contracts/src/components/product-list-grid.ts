/**
 * ProductListGrid Component Contract
 *
 * Platform-agnostic interface for ProductListGrid component.
 * Responsive grid layout for ProductTile items.
 */

import type { ProductTilePropsBase } from './product-tile';

export interface ProductListGridPropsBase {
  /** Grid items (ProductTile props) */
  items: ProductTilePropsBase[];
  /** Number of columns (auto-fill if not specified) */
  columns?: number;
  /** Gap between items in pixels @default 16 */
  gap?: number;
  /** Callback when an item is pressed */
  onItemPress?: (id: string) => void;
  /** Test ID for testing */
  testID?: string;
}
