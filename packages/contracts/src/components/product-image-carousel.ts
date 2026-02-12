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
  /** Test ID for testing */
  testID?: string;
}
