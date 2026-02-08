/**
 * CategoryListGrid Component Contract
 *
 * Platform-agnostic interface for CategoryListGrid component.
 * Responsive grid layout for CategoryCard items.
 */

import type { CategoryCardPropsBase } from './category-card';

export interface CategoryListGridPropsBase {
  /** Grid items (CategoryCard props) */
  items: CategoryCardPropsBase[];
  /** Gap between items in pixels @default 12 */
  gap?: number;
  /** Callback when an item is pressed */
  onItemPress?: (id: string) => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
