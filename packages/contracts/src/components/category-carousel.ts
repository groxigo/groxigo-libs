/**
 * CategoryCarousel Component Contract
 *
 * Platform-agnostic interface for CategoryCarousel component.
 * Horizontal scrolling carousel of CategoryCard items with optional arrows.
 */

import type { CategoryCardPropsBase } from './category-card';

export interface CategoryCarouselPropsBase {
  /** Carousel items (CategoryCard props) */
  items: CategoryCardPropsBase[];
  /** Whether to show navigation arrows @default true */
  showArrows?: boolean;
  /** Gap between items in pixels @default 12 */
  gap?: number;
  /** Callback when an item is pressed */
  onItemPress?: (id: string) => void;
  /** Section title */
  title?: string;
  /** Test ID for testing */
  testID?: string;
}
