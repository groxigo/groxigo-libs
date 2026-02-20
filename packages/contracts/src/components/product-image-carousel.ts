/**
 * ProductImageCarousel Component Contract
 *
 * Platform-agnostic interface for a product image gallery with dot indicators.
 */

export interface ProductImageCarouselPropsBase {
  /** Array of image URLs */
  images: string[];
  /** Currently visible image index */
  currentIndex?: number;
  /** Callback when image index changes */
  onIndexChange?: (index: number) => void;
  /** Layout mode: 'stacked' (default) or 'gallery' (vertical thumbs on left, desktop only) */
  layout?: 'stacked' | 'gallery';
  /** Test ID for testing */
  testID?: string;
}
