/**
 * Divider Component (Web)
 *
 * A divider/separator component for web platform.
 */

import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';
export type DividerThickness = 'thin' | 'medium' | 'thick';
export type LabelPosition = 'left' | 'center' | 'right';

const thicknessClasses: Record<DividerThickness, string> = {
  thin: 'border-[1px]',
  medium: 'border-2',
  thick: 'border-4',
};

const variantClasses: Record<DividerVariant, string> = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
};

export interface DividerProps {
  /** Orientation of the divider @default 'horizontal' */
  orientation?: DividerOrientation;
  /** Visual variant @default 'solid' */
  variant?: DividerVariant;
  /** Thickness of the divider @default 'thin' */
  thickness?: DividerThickness;
  /** Custom color (Tailwind class or CSS color) */
  color?: string;
  /** Spacing around the divider in pixels @default 0 */
  spacing?: number;
  /** Optional label text */
  label?: string;
  /** Label position when label is provided @default 'center' */
  labelPosition?: LabelPosition;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
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

    // Build styles
    const spacingStyle: React.CSSProperties = isHorizontal
      ? { marginTop: spacing, marginBottom: spacing }
      : { marginLeft: spacing, marginRight: spacing };

    // Line classes
    const lineClasses = cn(
      'border-border',
      variantClasses[variant],
      isHorizontal
        ? `w-full border-t-0 border-l-0 border-r-0 ${thicknessClasses[thickness].replace('border', 'border-b')}`
        : `h-full border-t-0 border-b-0 border-r-0 ${thicknessClasses[thickness].replace('border', 'border-l')}`
    );

    const colorStyle: React.CSSProperties = color
      ? { borderColor: color }
      : {};

    // If there's a label, render with flex layout
    if (label) {
      const containerClasses = cn(
        'flex items-center',
        isHorizontal ? 'flex-row w-full' : 'flex-col h-full',
        className
      );

      return (
        <div
          ref={ref}
          className={containerClasses}
          style={spacingStyle}
          data-testid={testID}
        >
          {(labelPosition === 'center' || labelPosition === 'right') && (
            <div className={cn(lineClasses, 'flex-1')} style={colorStyle} />
          )}
          <span
            className={cn(
              'text-sm text-text-secondary',
              isHorizontal ? 'px-3' : 'py-2'
            )}
          >
            {label}
          </span>
          {(labelPosition === 'center' || labelPosition === 'left') && (
            <div className={cn(lineClasses, 'flex-1')} style={colorStyle} />
          )}
        </div>
      );
    }

    // Simple divider without label
    return (
      <div
        ref={ref}
        className={cn(lineClasses, className)}
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
