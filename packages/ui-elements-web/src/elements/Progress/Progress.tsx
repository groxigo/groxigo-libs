/**
 * Progress Component (Web)
 *
 * A progress bar component that supports linear and circular variants.
 * Fully accessible with proper ARIA attributes.
 */

import React, { forwardRef, useMemo } from 'react';
import { cn } from '../../utils/cn';
import type {
  ProgressPropsBase,
  CircularProgressPropsBase,
  ProgressSize,
  ProgressColorScheme,
} from '@groxigo/contracts';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeClasses: Record<ProgressSize, string> = {
  xs: 'h-1',
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

const labelSizeClasses: Record<ProgressSize, string> = {
  xs: 'text-xs',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

// ============================================
// COLOR CONFIGURATIONS
// ============================================

const colorClasses: Record<ProgressColorScheme, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  accent: 'bg-accent-500',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
};

const circularColorClasses: Record<ProgressColorScheme, string> = {
  primary: 'text-primary-500',
  secondary: 'text-secondary-500',
  accent: 'text-accent-500',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  info: 'text-info',
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
        className={cn('w-full', className)}
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
          className={cn(
            'w-full overflow-hidden bg-gray-200',
            sizeClasses[size],
            borderRadius === 'full' ? 'rounded-full' : borderRadius !== undefined ? '' : 'rounded-full'
          )}
          style={{ borderRadius: radiusStyle }}
        >
          <div
            className={cn(
              'h-full transition-[width] duration-300 ease-out',
              colorClasses[colorScheme],
              hasStripe && 'bg-stripe',
              isAnimated && hasStripe && 'animate-stripe',
              isIndeterminate && 'animate-indeterminate w-1/3',
              borderRadius === 'full' ? 'rounded-full' : borderRadius !== undefined ? '' : 'rounded-full'
            )}
            style={{
              width: isIndeterminate ? undefined : `${normalizedValue}%`,
              borderRadius: radiusStyle,
            }}
          />
        </div>
        {showValue && displayValue && (
          <div className="mt-1 flex justify-end">
            <span className={cn('text-gray-600', labelSizeClasses[size])}>
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
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: svgSize, height: svgSize, ...style }}
        data-testid={testID}
        {...props}
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className={cn(isIndeterminate && 'animate-spin')}
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
            className={cn(!trackColor && 'text-gray-200')}
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
            className={cn(
              circularColorClasses[colorScheme],
              !isIndeterminate && 'transition-[stroke-dashoffset] duration-300 ease-out'
            )}
          />
        </svg>
        {showValue && displayValue && !isIndeterminate && (
          <span
            className="absolute text-gray-700 font-medium"
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
