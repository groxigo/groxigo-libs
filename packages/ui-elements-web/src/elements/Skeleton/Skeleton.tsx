/**
 * Skeleton Component (Web)
 *
 * Uses CSS Modules + design token CSS custom properties instead of Tailwind.
 */

import React, { forwardRef } from 'react';
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
  /** Custom inline styles */
  style?: React.CSSProperties;
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
      style: customStyle,
      testID,
      ...props
    },
    ref
  ) => {
    const style: React.CSSProperties = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderRadius: borderRadius !== undefined ? `${borderRadius}px` : undefined,
      ...customStyle,
    };

    return (
      <div
        ref={ref}
        className={clsx(
          styles.skeleton,
          variantStyleMap[variant],
          animate && styles.animate,
          className
        )}
        style={style}
        data-testid={testID}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
