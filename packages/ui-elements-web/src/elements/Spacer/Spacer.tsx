/**
 * Spacer Component (Web)
 *
 * A flexible spacing component for layout.
 * Uses a base unit of 4px for consistent spacing.
 */

import React, { forwardRef, useMemo } from 'react';
import { cn } from '../../utils/cn';
import type { SpacerPropsBase } from '@groxigo/contracts';

/** Base unit for spacing calculations (4px) */
const BASE_UNIT = 4;

export interface SpacerProps extends SpacerPropsBase {
  /** Additional inline styles */
  style?: React.CSSProperties;
}

export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(
  (
    {
      size = 4,
      width,
      height,
      flex = false,
      x,
      y,
      className,
      testID,
      style,
    },
    ref
  ) => {
    const computedStyle = useMemo((): React.CSSProperties => {
      // Calculate spacing value from size prop
      const spacingValue = size * BASE_UNIT;

      // Determine dimensions
      let computedWidth: number | undefined;
      let computedHeight: number | undefined;

      if (x !== undefined) {
        // Horizontal spacing only
        computedWidth = x * BASE_UNIT;
        computedHeight = 0;
      } else if (y !== undefined) {
        // Vertical spacing only
        computedWidth = 0;
        computedHeight = y * BASE_UNIT;
      } else {
        // Use width/height or fall back to size-based spacing
        computedWidth = width ?? spacingValue;
        computedHeight = height ?? spacingValue;
      }

      return {
        width: computedWidth,
        height: computedHeight,
        ...(flex && { flex: 1 }),
        ...style,
      };
    }, [size, width, height, flex, x, y, style]);

    return (
      <div
        ref={ref}
        className={cn('shrink-0', className)}
        style={computedStyle}
        data-testid={testID}
        aria-hidden="true"
      />
    );
  }
);

Spacer.displayName = 'Spacer';

export default Spacer;
