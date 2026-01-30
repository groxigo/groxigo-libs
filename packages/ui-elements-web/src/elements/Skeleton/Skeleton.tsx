/**
 * Skeleton Component (Web)
 */

import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { SkeletonPropsBase } from '@groxigo/contracts';

const variantClasses: Record<string, string> = {
  text: 'rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-none',
  rounded: 'rounded-lg',
};

export interface SkeletonProps extends SkeletonPropsBase {
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
        className={cn(
          'bg-gray-200',
          variantClasses[variant],
          animate && 'animate-skeleton',
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
