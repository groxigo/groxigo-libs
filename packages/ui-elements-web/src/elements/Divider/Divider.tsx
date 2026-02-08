/**
 * Divider Component (Web)
 *
 * A divider/separator component for web platform.
 */

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Divider.module.css';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerThickness = 'thin' | 'medium' | 'thick';
export type LabelPosition = 'left' | 'center' | 'right';

export interface DividerProps {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  thickness?: DividerThickness;
  color?: string;
  spacing?: number;
  label?: string;
  labelPosition?: LabelPosition;
  className?: string;
  testID?: string;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      thickness = 'thin',
      color,
      spacing = 0,
      label,
      labelPosition = 'center',
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
      styles[thickness],
      isHorizontal ? styles.horizontal : styles.vertical
    );

    if (label) {
      return (
        <div
          ref={ref}
          className={clsx(
            styles.labelContainer,
            isHorizontal ? styles.labelContainerHorizontal : styles.labelContainerVertical,
            className
          )}
          style={spacingStyle}
          data-testid={testID}
        >
          {(labelPosition === 'center' || labelPosition === 'right') && (
            <div className={clsx(lineClasses, styles.line)} style={colorStyle} />
          )}
          <span
            className={clsx(
              styles.label,
              isHorizontal ? styles.labelHorizontal : styles.labelVertical
            )}
          >
            {label}
          </span>
          {(labelPosition === 'center' || labelPosition === 'left') && (
            <div className={clsx(lineClasses, styles.line)} style={colorStyle} />
          )}
        </div>
      );
    }

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
