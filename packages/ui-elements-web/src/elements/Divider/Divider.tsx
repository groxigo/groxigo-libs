'use client';

/**
 * Divider Component (Web)
 *
 * A divider/separator component for web platform.
 */

import { forwardRef, type CSSProperties } from 'react';
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

    // Dynamic values via CSS custom properties
    const cssVars = {
      '--divider-spacing': spacing ? `${spacing}px` : undefined,
      '--divider-color': color || undefined,
    } as CSSProperties;

    const lineClasses = clsx(
      styles.divider,
      styles[variant],
      isHorizontal ? styles.horizontal : styles.vertical
    );

    return (
      <div
        ref={ref}
        className={clsx(lineClasses, className)}
        style={cssVars}
        data-testid={testID}
        role="separator"
        aria-orientation={orientation}
      />
    );
  }
);

Divider.displayName = 'Divider';

export default Divider;
