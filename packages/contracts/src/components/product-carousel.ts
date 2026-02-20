/**
 * ProductCarousel Component Contract
 *
 * Platform-agnostic interface for ProductCarousel component.
 * Horizontal scrolling carousel of ProductTile items with optional arrows.
 */

import type { ProductTilePropsBase } from './product-tile';

export interface ProductCarouselPropsBase {
  /** Carousel items (ProductTile props) */
  items: ProductTilePropsBase[];
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
