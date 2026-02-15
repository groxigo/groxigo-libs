'use client';

/**
 * Divider Component (Web)
 *
 * A divider/separator component for web platform.
 */

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { DividerPropsBase } from '@groxigo/contracts';
import styles from './Divider.module.css';

export interface DividerProps extends DividerPropsBase {
  className?: string;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      color,
      spacing = 0,
      className,
      testID,
    },
    ref
  ) => {
    const isHorizontal = orientation === 'horizontal';

    const spacingStyle: React.CSSProperties = isHorizontal
      ? { marginTop: spacing, marginBottom: spacing }
      : { marginLeft: spacing, marginRight: spacing };

    const colorStyle: React.CSSProperties = color
      ? { borderColor: color }
      : {};

    const lineClasses = clsx(
      styles.divider,
      styles[variant],
      isHorizontal ? styles.horizontal : styles.vertical
    );

    return (
      <div
        ref={ref}
        className={clsx(lineClasses, className)}
        style={{ ...spacingStyle, ...colorStyle }}
        data-testid={testID}
        role="separator"
        aria-orientation={orientation}
      />
    );
  }
);

Divider.displayName = 'Divider';

export default Divider;
