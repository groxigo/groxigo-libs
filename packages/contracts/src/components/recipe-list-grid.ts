/**
 * RecipeListGrid Component Contract
 *
 * Platform-agnostic interface for RecipeListGrid component.
 * Responsive grid layout for RecipeCard items.
 */

import type { RecipeCardPropsBase } from './recipe-card';

export interface RecipeListGridPropsBase {
  /** Grid items (RecipeCard props) */
  items: RecipeCardPropsBase[];
  /** Number of columns (auto-fill if not specified) */
  columns?: number;
  /** Gap between items in pixels @default 16 */
  gap?: number;
  /** Callback when an item is pressed */
  onItemPress?: (id: string) => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
