/**
 * Progress Component (Web)
 *
 * A progress bar component that supports linear and circular variants.
 * Fully accessible with proper ARIA attributes.
 * Uses CSS Modules + design token CSS custom properties instead of Tailwind.
 */

import React, { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';
import type {
  ProgressPropsBase,
  ProgressSize,
} from '@groxigo/contracts';
import styles from './Progress.module.css';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const trackSizeStyleMap: Record<ProgressSize, string> = {
  xs: styles.trackXs,
  sm: styles.trackSm,
  md: styles.trackMd,
};

const labelSizeStyleMap: Record<ProgressSize, string> = {
  xs: styles.labelXs,
  sm: styles.labelSm,
  md: styles.labelMd,
};

// ============================================
// LINEAR PROGRESS COMPONENT
// ============================================

export interface ProgressProps extends ProgressPropsBase {
  className?: string;
  /** Custom inline styles for the container */
  style?: React.CSSProperties;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      min = 0,
      max = 100,
      size = 'md',
      variant = 'determinate',
      showValue = false,
      formatValue,
      hasStripe = false,
      isAnimated = false,
      borderRadius,
      'aria-label': ariaLabel,
      className,
      style,
      testID,
      ...props
    },
    ref
  ) => {
    const isIndeterminate = variant === 'indeterminate';

    // Normalize value to percentage
    const normalizedValue = useMemo(() => {
      if (isIndeterminate) return 0;
      const range = max - min;
      if (range <= 0) return 0;
      const clampedValue = Math.min(max, Math.max(min, value));
      return ((clampedValue - min) / range) * 100;
    }, [value, min, max, isIndeterminate]);

    const displayValue = useMemo(() => {
      if (isIndeterminate) return null;
      if (formatValue) return formatValue(value, max);
      return `${Math.round(normalizedValue)}%`;
    }, [value, max, normalizedValue, formatValue, isIndeterminate]);

    const radiusStyle = useMemo(() => {
      if (borderRadius === undefined) return undefined;
      if (borderRadius === 'full') return '9999px';
      return `${borderRadius}px`;
    }, [borderRadius]);

    return (
      <div
        ref={ref}
        className={clsx(styles.wrapper, className)}
        style={style}
        data-testid={testID}
        {...props}
      >
        <div
          role="progressbar"
          aria-valuenow={isIndeterminate ? undefined : normalizedValue}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={ariaLabel || `Progress: ${isIndeterminate ? 'loading' : displayValue}`}
          className={clsx(
            styles.track,
            trackSizeStyleMap[size]
          )}
          style={{ borderRadius: radiusStyle }}
        >
          <div
            className={clsx(
              styles.bar,
              styles.barPrimary,
              hasStripe && styles.stripe,
              isAnimated && hasStripe && styles.stripeAnimated,
              isIndeterminate && styles.indeterminate
            )}
            style={{
              width: isIndeterminate ? undefined : `${normalizedValue}%`,
              borderRadius: radiusStyle,
            }}
          />
        </div>
        {showValue && displayValue && (
          <div className={styles.valueContainer}>
            <span className={clsx(styles.valueLabel, labelSizeStyleMap[size])}>
              {displayValue}
            </span>
          </div>
        )}
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export default Progress;
