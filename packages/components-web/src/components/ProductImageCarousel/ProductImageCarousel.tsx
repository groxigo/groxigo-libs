'use client';

import { forwardRef, useCallback } from 'react';
import clsx from 'clsx';
import styles from './ProductImageCarousel.module.css';

export interface ProductImageCarouselProps {
  /** Array of image URLs */
  images: string[];
  /** Currently visible image index */
  currentIndex?: number;
  /** Callback when a dot is clicked to change the image */
  onIndexChange?: (index: number) => void;
  /** Additional CSS class */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

export const ProductImageCarousel = forwardRef<HTMLDivElement, ProductImageCarouselProps>(
  (
    {
      images,
      currentIndex = 0,
      onIndexChange,
      className,
      testID,
    },
    ref
  ) => {
    const safeIndex = images.length > 0
      ? Math.min(Math.max(0, currentIndex), images.length - 1)
      : 0;

    const currentImage = images[safeIndex];
    const showDots = images.length > 1;

    const handleDotClick = useCallback(
      (index: number) => {
        onIndexChange?.(index);
      },
      [onIndexChange]
    );

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <div className={styles.imageContainer}>
          {currentImage ? (
            <img
              src={currentImage}
              alt=""
              className={styles.image}
              draggable={false}
            />
          ) : (
            <div className={styles.placeholder} />
          )}
        </div>

        {showDots && (
          <div className={styles.dots} role="tablist" aria-label="Image navigation">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={clsx(styles.dot, index === safeIndex && styles.dotActive)}
                onClick={() => handleDotClick(index)}
                role="tab"
                aria-selected={index === safeIndex}
                aria-label={`View image ${index + 1} of ${images.length}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

ProductImageCarousel.displayName = 'ProductImageCarousel';
export default ProductImageCarousel;
