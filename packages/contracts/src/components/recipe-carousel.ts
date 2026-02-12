/**
 * RecipeCarousel Component Contract
 *
 * Platform-agnostic interface for RecipeCarousel component.
 * Horizontal scrolling carousel of RecipeCard items with optional arrows.
 */

import type { RecipeCardPropsBase } from './recipe-card';

export interface RecipeCarouselPropsBase {
  /** Carousel items (RecipeCard props) */
  items: RecipeCardPropsBase[];
  /** Whether to show navigation arrows @default true */
  showArrows?: boolean;
  /** Gap between items in pixels @default 12 */
  gap?: number;
  /** Callback when an item is pressed */
  onItemPress?: (id: string) => void;
  /** Callback when "See All" is pressed */
  onSeeAll?: () => void;
  /** Section title */
  title?: string;
  /** Test ID for testing */
  testID?: string;
}
