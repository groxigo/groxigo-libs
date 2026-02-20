'use client';

import { forwardRef, useCallback, useRef, useState } from 'react';
import type { ProductImageCarouselPropsBase } from '@groxigo/contracts/components';
import clsx from 'clsx';
import styles from './ProductImageCarousel.module.css';

export interface ProductImageCarouselProps extends ProductImageCarouselPropsBase {
  className?: string;
}

const SWIPE_THRESHOLD = 50;

export const ProductImageCarousel = forwardRef<HTMLDivElement, ProductImageCarouselProps>(
  (
    {
      images,
      currentIndex: controlledIndex,
      onIndexChange,
      layout = 'stacked',
      className,
      testID,
    },
    ref
  ) => {
    // Internal state for uncontrolled mode
    const [internalIndex, setInternalIndex] = useState(0);
    const isControlled = controlledIndex !== undefined;
    const activeIndex = isControlled ? controlledIndex : internalIndex;

    const safeIndex = images.length > 0
      ? Math.min(Math.max(0, activeIndex), images.length - 1)
      : 0;

    const currentImage = images[safeIndex];
    const showDots = images.length > 1;
    const showThumbnails = images.length > 1;

    // Touch tracking refs
    const touchStartX = useRef(0);
    const touchStartY = useRef(0);

    const goTo = useCallback(
      (index: number) => {
        const clamped = Math.min(Math.max(0, index), images.length - 1);
        if (!isControlled) setInternalIndex(clamped);
        onIndexChange?.(clamped);
      },
      [images.length, isControlled, onIndexChange]
    );

    const handleDotClick = useCallback(
      (index: number) => goTo(index),
      [goTo]
    );

    const handleThumbnailClick = useCallback(
      (index: number) => goTo(index),
      [goTo]
    );

    // Touch swipe handlers
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    }, []);

    const handleTouchEnd = useCallback(
      (e: React.TouchEvent) => {
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        const deltaY = e.changedTouches[0].clientY - touchStartY.current;

        // Only swipe if horizontal movement is dominant
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
          if (deltaX < 0 && safeIndex < images.length - 1) {
            goTo(safeIndex + 1);
          } else if (deltaX > 0 && safeIndex > 0) {
            goTo(safeIndex - 1);
          }
        }
      },
      [safeIndex, images.length, goTo]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft' && safeIndex > 0) {
          e.preventDefault();
          goTo(safeIndex - 1);
        } else if (e.key === 'ArrowRight' && safeIndex < images.length - 1) {
          e.preventDefault();
          goTo(safeIndex + 1);
        }
      },
      [safeIndex, images.length, goTo]
    );

    const isGallery = layout === 'gallery';

    const thumbnailStrip = showThumbnails && (
      <div
        className={clsx(styles.thumbnails, isGallery && styles.thumbnailsGallery)}
        role="tablist"
        aria-label="Image thumbnails"
      >
        {images.map((url, index) => (
          <button
            key={index}
            type="button"
            className={clsx(
              styles.thumbnailButton,
              index === safeIndex && styles.thumbnailActive
            )}
            onClick={() => handleThumbnailClick(index)}
            role="tab"
            aria-selected={index === safeIndex}
            aria-label={`View image ${index + 1} of ${images.length}`}
          >
            <img
              src={url}
              alt=""
              className={styles.thumbnailImage}
              draggable={false}
              loading="lazy"
            />
          </button>
        ))}
      </div>
    );

    return (
      <div
        ref={ref}
        className={clsx(styles.root, isGallery && styles.rootGallery, className)}
        data-testid={testID}
      >
        {/* Gallery layout: thumbnails render before image on desktop */}
        {isGallery && thumbnailStrip}

        <div
          className={styles.imageContainer}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onKeyDown={handleKeyDown}
          tabIndex={images.length > 1 ? 0 : undefined}
          role={images.length > 1 ? 'group' : undefined}
          aria-roledescription={images.length > 1 ? 'carousel' : undefined}
          aria-label={images.length > 1 ? `Product image ${safeIndex + 1} of ${images.length}` : 'Product image'}
        >
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

        {/* Dots — shown on mobile, hidden on desktop when thumbnails exist */}
        {showDots && (
          <div className={clsx(styles.dots, showThumbnails && styles.dotsHideDesktop)} role="tablist" aria-label="Image navigation">
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

        {/* Stacked layout: thumbnails render after image */}
        {!isGallery && thumbnailStrip}
      </div>
    );
  }
);

ProductImageCarousel.displayName = 'ProductImageCarousel';
export default ProductImageCarousel;
