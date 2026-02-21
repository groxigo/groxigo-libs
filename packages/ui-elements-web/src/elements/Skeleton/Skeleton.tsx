'use client';

/**
 * Skeleton Component (Web)
 *
 * Uses CSS Modules + design token CSS custom properties instead of Tailwind.
 */

import { forwardRef, type CSSProperties } from 'react';
import { clsx } from 'clsx';
import type { SkeletonPropsBase } from '@groxigo/contracts';
import styles from './Skeleton.module.css';

// Variant to CSS module class mapping
const variantStyleMap: Record<string, string> = {
  text: styles.text,
  circular: styles.circular,
  rectangular: styles.rectangular,
  rounded: styles.rounded,
};

export interface SkeletonProps extends SkeletonPropsBase {
  className?: string;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'rectangular',
      width,
      height,
      borderRadius,
      animate = true,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    // Dynamic dimensions via CSS custom properties (CLAUDE.md approved pattern)
    const cssVars = {
      '--skeleton-width': typeof width === 'number' ? `${width}px` : width,
      '--skeleton-height': typeof height === 'number' ? `${height}px` : height,
      '--skeleton-radius': borderRadius !== undefined ? `${borderRadius}px` : undefined,
    } as CSSProperties;

    return (
      <div
        ref={ref}
        className={clsx(
          styles.skeleton,
          variantStyleMap[variant],
          animate && styles.animate,
          className
        )}
        style={cssVars}
        data-testid={testID}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
