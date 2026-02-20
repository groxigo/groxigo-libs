/**
 * Carousel Component Contract
 *
 * Platform-agnostic interface for a horizontally-scrolling carousel.
 */

import type { ReactNode } from 'react';

export interface CarouselItemBase {
  id: string;
}

export interface CarouselPropsBase<T extends CarouselItemBase = CarouselItemBase> {
  /** Items to render */
  items: T[];
  /** Render function for each item */
  renderItem: (item: T) => ReactNode;
  /** Whether to show navigation arrows @default true */
  showArrows?: boolean;
  /** Width for each slide item — number (px) or string (CSS value like clamp()) */
  itemWidth?: number | string;
  /** Gap between items in pixels @default 12 */
  gap?: number;
  /** Section title */
  title?: string;
  /** Whether to show "See All" link */
  showSeeAll?: boolean;
  /** Callback when "See All" is pressed */
  onSeeAll?: () => void;
  /** Test ID for testing */
  testID?: string;
}
