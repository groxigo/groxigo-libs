/**
 * ImageGallery Component (Web)
 *
 * Image carousel/gallery with pagination, navigation, and lightbox support.
 * Supports keyboard navigation with arrow keys.
 */

'use client';

import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { cn, Icon } from '@groxigo/ui-elements-web';

export interface ImageGalleryImage {
  /** Image URL */
  src: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Thumbnail URL (optional, uses src if not provided) */
  thumbnail?: string;
}

export interface ImageGalleryProps {
  /** Array of images */
  images: ImageGalleryImage[];
  /** Initial image index @default 0 */
  initialIndex?: number;
  /** Whether to show pagination dots @default true */
  showPagination?: boolean;
  /** Whether to show navigation arrows @default true */
  showArrows?: boolean;
  /** Whether to show thumbnails @default false */
  showThumbnails?: boolean;
  /** Whether gallery is looped @default false */
  loop?: boolean;
  /** Auto-play interval in milliseconds (0 = disabled) @default 0 */
  autoPlay?: number;
  /** Whether to enable lightbox/zoom on click @default true */
  enableLightbox?: boolean;
  /** Callback when image index changes */
  onIndexChange?: (index: number) => void;
  /** Image aspect ratio @default '16/9' */
  aspectRatio?: string;
  /** Object fit for images @default 'cover' */
  objectFit?: 'cover' | 'contain' | 'fill';
  /** Additional CSS class */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

export const ImageGallery = forwardRef<HTMLDivElement, ImageGalleryProps>(
  (
    {
      images,
      initialIndex = 0,
      showPagination = true,
      showArrows = true,
      showThumbnails = false,
      loop = false,
      autoPlay = 0,
      enableLightbox = true,
      onIndexChange,
      aspectRatio = '16/9',
      objectFit = 'cover',
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Sync with initialIndex prop
    useEffect(() => {
      if (initialIndex !== currentIndex && initialIndex >= 0 && initialIndex < images.length) {
        setCurrentIndex(initialIndex);
      }
    }, [initialIndex]);

    // Auto-play functionality
    useEffect(() => {
      if (autoPlay > 0 && images.length > 1 && !isLightboxOpen) {
        autoPlayTimerRef.current = setInterval(() => {
          goToNext();
        }, autoPlay);

        return () => {
          if (autoPlayTimerRef.current) {
            clearInterval(autoPlayTimerRef.current);
          }
        };
      }
    }, [autoPlay, currentIndex, images.length, isLightboxOpen]);

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (isLightboxOpen) {
          if (event.key === 'Escape') {
            setIsLightboxOpen(false);
          } else if (event.key === 'ArrowLeft') {
            goToPrevious();
          } else if (event.key === 'ArrowRight') {
            goToNext();
          }
        }
      };

      if (isLightboxOpen) {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }, [isLightboxOpen, currentIndex, loop]);

    const goToPrevious = useCallback(() => {
      setCurrentIndex((prev) => {
        if (prev > 0) {
          const newIndex = prev - 1;
          onIndexChange?.(newIndex);
          return newIndex;
        } else if (loop) {
          const newIndex = images.length - 1;
          onIndexChange?.(newIndex);
          return newIndex;
        }
        return prev;
      });
    }, [loop, images.length, onIndexChange]);

    const goToNext = useCallback(() => {
      setCurrentIndex((prev) => {
        if (prev < images.length - 1) {
          const newIndex = prev + 1;
          onIndexChange?.(newIndex);
          return newIndex;
        } else if (loop) {
          const newIndex = 0;
          onIndexChange?.(newIndex);
          return newIndex;
        }
        return prev;
      });
    }, [loop, images.length, onIndexChange]);

    const goToIndex = (index: number) => {
      if (index >= 0 && index < images.length) {
        setCurrentIndex(index);
        onIndexChange?.(index);
      }
    };

    if (images.length === 0) return null;

    const canGoPrevious = currentIndex > 0 || loop;
    const canGoNext = currentIndex < images.length - 1 || loop;
    const currentImage = images[currentIndex];

    return (
      <>
        <div
          ref={ref}
          className={cn('relative w-full', className)}
          data-testid={testID}
          {...props}
        >
          {/* Main image container */}
          <div
            ref={containerRef}
            className="relative w-full overflow-hidden rounded-lg bg-gray-100"
            style={{ aspectRatio }}
          >
            <img
              src={currentImage.src}
              alt={currentImage.alt || `Image ${currentIndex + 1}`}
              className={cn(
                'w-full h-full transition-opacity duration-300',
                objectFit === 'cover' && 'object-cover',
                objectFit === 'contain' && 'object-contain',
                objectFit === 'fill' && 'object-fill',
                enableLightbox && 'cursor-zoom-in'
              )}
              onClick={() => enableLightbox && setIsLightboxOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && enableLightbox) {
                  setIsLightboxOpen(true);
                }
              }}
              tabIndex={enableLightbox ? 0 : undefined}
              role={enableLightbox ? 'button' : undefined}
              aria-label={enableLightbox ? 'Open image in lightbox' : undefined}
            />

            {/* Navigation arrows */}
            {showArrows && images.length > 1 && (
              <>
                {canGoPrevious && (
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={goToPrevious}
                    className={cn(
                      'absolute left-3 top-1/2 -translate-y-1/2',
                      'flex items-center justify-center',
                      'w-10 h-10 rounded-full',
                      'bg-black/40 text-white backdrop-blur-sm',
                      'hover:bg-black/60 transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                    )}
                  >
                    <Icon name="chevron-left" size="md" />
                  </button>
                )}
                {canGoNext && (
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={goToNext}
                    className={cn(
                      'absolute right-3 top-1/2 -translate-y-1/2',
                      'flex items-center justify-center',
                      'w-10 h-10 rounded-full',
                      'bg-black/40 text-white backdrop-blur-sm',
                      'hover:bg-black/60 transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                    )}
                  >
                    <Icon name="chevron-right" size="md" />
                  </button>
                )}
              </>
            )}

            {/* Pagination dots */}
            {showPagination && images.length > 1 && (
              <div
                className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5"
                role="tablist"
                aria-label="Image navigation"
              >
                {images.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={index === currentIndex}
                    aria-label={`Go to image ${index + 1}`}
                    onClick={() => goToIndex(index)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-200',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2',
                      index === currentIndex
                        ? 'bg-white w-4'
                        : 'bg-white/50 hover:bg-white/75'
                    )}
                  />
                ))}
              </div>
            )}

            {/* Image counter */}
            <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/40 text-white text-sm backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnails */}
          {showThumbnails && images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`View image ${index + 1}`}
                  onClick={() => goToIndex(index)}
                  className={cn(
                    'flex-shrink-0 w-16 h-16 rounded-md overflow-hidden',
                    'border-2 transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                    index === currentIndex
                      ? 'border-primary-500 opacity-100'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                >
                  <img
                    src={image.thumbnail || image.src}
                    alt={image.alt || `Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox modal */}
        {isLightboxOpen && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close lightbox"
              onClick={() => setIsLightboxOpen(false)}
              className={cn(
                'absolute top-4 right-4 z-10',
                'flex items-center justify-center',
                'w-10 h-10 rounded-full',
                'bg-white/10 text-white backdrop-blur-sm',
                'hover:bg-white/20 transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
              )}
            >
              <Icon name="close" size="lg" />
            </button>

            {/* Main lightbox image */}
            <img
              src={currentImage.src}
              alt={currentImage.alt || `Image ${currentIndex + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Navigation arrows in lightbox */}
            {images.length > 1 && (
              <>
                {canGoPrevious && (
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}
                    className={cn(
                      'absolute left-4 top-1/2 -translate-y-1/2',
                      'flex items-center justify-center',
                      'w-12 h-12 rounded-full',
                      'bg-white/10 text-white backdrop-blur-sm',
                      'hover:bg-white/20 transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                    )}
                  >
                    <Icon name="chevron-left" size="lg" />
                  </button>
                )}
                {canGoNext && (
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    className={cn(
                      'absolute right-4 top-1/2 -translate-y-1/2',
                      'flex items-center justify-center',
                      'w-12 h-12 rounded-full',
                      'bg-white/10 text-white backdrop-blur-sm',
                      'hover:bg-white/20 transition-colors',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-white'
                    )}
                  >
                    <Icon name="chevron-right" size="lg" />
                  </button>
                )}
              </>
            )}

            {/* Image counter in lightbox */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-md bg-black/50 text-white text-sm backdrop-blur-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        )}
      </>
    );
  }
);

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;
