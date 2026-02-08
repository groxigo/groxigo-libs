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
  CircularProgressPropsBase,
  ProgressSize,
  ProgressColorScheme,
} from '@groxigo/contracts';
import styles from './Progress.module.css';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const trackSizeStyleMap: Record<ProgressSize, string> = {
  xs: styles.trackXs,
  sm: styles.trackSm,
  md: styles.trackMd,
  lg: styles.trackLg,
};

const labelSizeStyleMap: Record<ProgressSize, string> = {
  xs: styles.labelXs,
  sm: styles.labelSm,
  md: styles.labelMd,
  lg: styles.labelLg,
};

// ============================================
// COLOR CONFIGURATIONS
// ============================================

const barColorStyleMap: Record<ProgressColorScheme, string> = {
  primary: styles.barPrimary,
  secondary: styles.barSecondary,
  accent: styles.barAccent,
  success: styles.barSuccess,
  warning: styles.barWarning,
  error: styles.barError,
  info: styles.barInfo,
};

const circularColorStyleMap: Record<ProgressColorScheme, string> = {
  primary: styles.circularPrimary,
  secondary: styles.circularSecondary,
  accent: styles.circularAccent,
  success: styles.circularSuccess,
  warning: styles.circularWarning,
  error: styles.circularError,
  info: styles.circularInfo,
};

// ============================================
// LINEAR PROGRESS COMPONENT
// ============================================

export interface ProgressProps extends ProgressPropsBase {
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
      colorScheme = 'primary',
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
              barColorStyleMap[colorScheme],
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

// ============================================
// CIRCULAR PROGRESS COMPONENT
// ============================================

export interface CircularProgressProps extends CircularProgressPropsBase {
  /** Custom inline styles for the container */
  style?: React.CSSProperties;
}

export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  (
    {
      value = 0,
      min = 0,
      max = 100,
      size = 48,
      thickness = 4,
      colorScheme = 'primary',
      variant = 'determinate',
      trackColor,
      showValue = false,
      formatValue,
      startAngle = -90,
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

    // SVG calculations
    const svgSize = size;
    const radius = (svgSize - thickness) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (normalizedValue / 100) * circumference;
    const center = svgSize / 2;

    // Calculate font size based on circle size
    const fontSize = Math.max(10, Math.floor(size / 4));

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuenow={isIndeterminate ? undefined : normalizedValue}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={ariaLabel || `Progress: ${isIndeterminate ? 'loading' : displayValue}`}
        className={clsx(styles.circularWrapper, className)}
        style={{ width: svgSize, height: svgSize, ...style }}
        data-testid={testID}
        {...props}
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className={clsx(isIndeterminate && styles.spin)}
          style={{ transform: `rotate(${startAngle}deg)` }}
        >
          {/* Track circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={trackColor || 'currentColor'}
            strokeWidth={thickness}
            className={clsx(!trackColor && styles.circularTrack)}
          />
          {/* Progress circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isIndeterminate ? circumference * 0.75 : strokeDashoffset}
            className={clsx(
              circularColorStyleMap[colorScheme],
              !isIndeterminate && styles.circularTransition
            )}
          />
        </svg>
        {showValue && displayValue && !isIndeterminate && (
          <span
            className={styles.circularValue}
            style={{ fontSize }}
          >
            {displayValue}
          </span>
        )}
      </div>
    );
  }
);

CircularProgress.displayName = 'CircularProgress';

export default Progress;
