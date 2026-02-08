/**
 * Spacer Component (Web)
 *
 * A flexible spacing component for layout.
 * Uses a base unit of 4px for consistent spacing.
 */

import React, { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';
import type { SpacerPropsBase } from '@groxigo/contracts';
import styles from './Spacer.module.css';

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
      const spacingValue = size * BASE_UNIT;

      let computedWidth: number | undefined;
      let computedHeight: number | undefined;

      if (x !== undefined) {
        computedWidth = x * BASE_UNIT;
        computedHeight = 0;
      } else if (y !== undefined) {
        computedWidth = 0;
        computedHeight = y * BASE_UNIT;
      } else {
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
        className={clsx(styles.spacer, className)}
        style={computedStyle}
        data-testid={testID}
        aria-hidden="true"
      />
    );
  }
);

Spacer.displayName = 'Spacer';

export default Spacer;
