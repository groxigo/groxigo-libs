/**
 * Image Component (Web)
 *
 * Implements @groxigo/contracts ImagePropsBase for web platform.
 * Works with both regular <img> and can be wrapped with Next.js Image.
 * Uses CSS Modules + design token CSS custom properties instead of Tailwind.
 */

import React, { forwardRef, useState, useCallback } from 'react';
import { clsx } from 'clsx';
import type { ImagePropsBase } from '@groxigo/contracts';
import styles from './Image.module.css';

// Resize mode to CSS module class mapping
const resizeModeStyleMap: Record<string, string> = {
  cover: styles.cover,
  contain: styles.contain,
  stretch: styles.stretch,
  center: styles.center,
};

export interface ImageProps extends ImagePropsBase {
  /** Whether the image should be circular */
  circular?: boolean;
  /** Fallback type when image fails @default 'skeleton' */
  fallbackType?: 'skeleton' | 'placeholder' | 'none';
  /** Loading strategy @default 'lazy' */
  loading?: 'lazy' | 'eager';
  /** Aspect ratio (e.g., '16/9', '1/1', '4/3') */
  aspectRatio?: string;
  /** Priority loading for LCP images */
  priority?: boolean;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      resizeMode = 'cover',
      borderRadius,
      circular = false,
      fallback,
      placeholder,
      fallbackType = 'skeleton',
      loading = 'lazy',
      aspectRatio,
      priority = false,
      className,
      testID,
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const handleLoad = useCallback(() => {
      setIsLoading(false);
      onLoad?.();
    }, [onLoad]);

    const handleError = useCallback(() => {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    }, [onError]);

    // Build style for dimensions and border radius
    const style: React.CSSProperties = {};

    if (width) {
      style.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height) {
      style.height = typeof height === 'number' ? `${height}px` : height;
    }
    if (aspectRatio) {
      style.aspectRatio = aspectRatio;
    }
    if (borderRadius) {
      style.borderRadius = `${borderRadius}px`;
    }

    const containerClasses = clsx(
      styles.container,
      circular && styles.circular,
      className
    );

    const imageClasses = clsx(
      styles.image,
      resizeModeStyleMap[resizeMode] || styles.cover,
      circular && styles.circular,
      isLoading ? styles.loading : styles.loaded,
      borderRadius && !circular && `rounded-[${borderRadius}px]`
    );

    // Render fallback for loading or error states
    const renderFallback = () => {
      if (fallback) {
        return fallback;
      }

      if (fallbackType === 'skeleton') {
        return (
          <div
            className={clsx(
              styles.fallback,
              styles.skeleton,
              circular && styles.circular
            )}
          />
        );
      }

      if (fallbackType === 'placeholder') {
        return (
          <div
            className={clsx(
              styles.fallback,
              styles.placeholder,
              circular && styles.circular
            )}
          >
            <svg
              className={styles.placeholderIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        );
      }

      return null;
    };

    return (
      <div className={containerClasses} style={style} data-testid={testID}>
        {(isLoading || hasError) && renderFallback()}
        {placeholder && isLoading && !hasError && placeholder}
        {!hasError && (
          <img
            ref={ref}
            src={src}
            alt={alt}
            className={imageClasses}
            loading={priority ? 'eager' : loading}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        )}
      </div>
    );
  }
);

Image.displayName = 'Image';

export default Image;
