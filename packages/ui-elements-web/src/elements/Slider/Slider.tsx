/**
 * Slider Component (Web)
 *
 * A range slider component for web platform.
 * Implements @groxigo/contracts SliderPropsBase.
 */

import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import type { SliderPropsBase, SliderSize, SliderColorScheme } from '@groxigo/contracts';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeClasses: Record<SliderSize, { track: string; thumb: string; label: string }> = {
  sm: { track: 'h-1', thumb: 'w-4 h-4', label: 'text-xs' },
  md: { track: 'h-1.5', thumb: 'w-5 h-5', label: 'text-sm' },
  lg: { track: 'h-2', thumb: 'w-6 h-6', label: 'text-base' },
};

// ============================================
// COLOR SCHEME CONFIGURATIONS
// ============================================

const colorSchemeClasses: Record<SliderColorScheme, { fill: string; thumb: string; focus: string }> = {
  primary: {
    fill: 'bg-primary-500',
    thumb: 'border-primary-500 hover:border-primary-600',
    focus: 'focus:ring-primary-500/30',
  },
  secondary: {
    fill: 'bg-secondary-500',
    thumb: 'border-secondary-500 hover:border-secondary-600',
    focus: 'focus:ring-secondary-500/30',
  },
  accent: {
    fill: 'bg-accent-500',
    thumb: 'border-accent-500 hover:border-accent-600',
    focus: 'focus:ring-accent-500/30',
  },
  success: {
    fill: 'bg-success',
    thumb: 'border-success hover:border-success/80',
    focus: 'focus:ring-success/30',
  },
  warning: {
    fill: 'bg-warning',
    thumb: 'border-warning hover:border-warning/80',
    focus: 'focus:ring-warning/30',
  },
  error: {
    fill: 'bg-error',
    thumb: 'border-error hover:border-error/80',
    focus: 'focus:ring-error/30',
  },
};

// ============================================
// SLIDER PROPS
// ============================================

export interface SliderProps extends SliderPropsBase {
  /** Label text */
  label?: string;
  /** Whether to show the current value */
  showValue?: boolean;
  /** Label class name */
  labelClassName?: string;
  /** Value class name */
  valueClassName?: string;
}

// ============================================
// SLIDER COMPONENT
// ============================================

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = 0,
      min = 0,
      max = 100,
      step = 1,
      size = 'md',
      colorScheme = 'primary',
      disabled = false,
      label,
      showValue = false,
      showTooltip = false,
      tooltipVisibility = 'focus',
      formatValue,
      name,
      'aria-label': ariaLabel,
      onChange,
      onChangeEnd,
      className,
      labelClassName,
      valueClassName,
      testID,
    },
    ref
  ) => {
    // Determine if controlled or uncontrolled
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = isControlled ? controlledValue : internalValue;

    const [isDragging, setIsDragging] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);

    const sizeConfig = sizeClasses[size];
    const colorConfig = colorSchemeClasses[colorScheme];

    // Clamp and step value
    const clampValue = useCallback(
      (val: number): number => {
        let clamped = Math.max(min, Math.min(max, val));
        if (step) {
          clamped = Math.round(clamped / step) * step;
          // Fix floating point precision
          clamped = Math.round(clamped * 1000000) / 1000000;
        }
        return clamped;
      },
      [min, max, step]
    );

    // Calculate percentage from value
    const getPercentage = useCallback(
      (val: number): number => {
        const range = max - min;
        if (range === 0) return 0;
        return ((val - min) / range) * 100;
      },
      [min, max]
    );

    // Calculate value from position
    const getValueFromPosition = useCallback(
      (clientX: number): number => {
        if (!trackRef.current) return currentValue;
        const rect = trackRef.current.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
        const range = max - min;
        const newValue = min + (percentage / 100) * range;
        return clampValue(newValue);
      },
      [min, max, currentValue, clampValue]
    );

    // Handle value change
    const handleValueChange = useCallback(
      (newValue: number) => {
        const clamped = clampValue(newValue);
        if (!isControlled) {
          setInternalValue(clamped);
        }
        onChange?.(clamped);
      },
      [clampValue, isControlled, onChange]
    );

    // Mouse/Touch event handlers
    const handlePointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (disabled) return;
        e.preventDefault();
        setIsDragging(true);
        const newValue = getValueFromPosition(e.clientX);
        handleValueChange(newValue);
      },
      [disabled, getValueFromPosition, handleValueChange]
    );

    useEffect(() => {
      if (!isDragging) return;

      const handlePointerMove = (e: PointerEvent) => {
        const newValue = getValueFromPosition(e.clientX);
        handleValueChange(newValue);
      };

      const handlePointerUp = () => {
        setIsDragging(false);
        onChangeEnd?.(currentValue);
      };

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);

      return () => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };
    }, [isDragging, getValueFromPosition, handleValueChange, onChangeEnd, currentValue]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        let newValue = currentValue;
        const largeStep = step * 10;

        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowUp':
            newValue = currentValue + step;
            break;
          case 'ArrowLeft':
          case 'ArrowDown':
            newValue = currentValue - step;
            break;
          case 'PageUp':
            newValue = currentValue + largeStep;
            break;
          case 'PageDown':
            newValue = currentValue - largeStep;
            break;
          case 'Home':
            newValue = min;
            break;
          case 'End':
            newValue = max;
            break;
          default:
            return;
        }

        e.preventDefault();
        handleValueChange(newValue);
        onChangeEnd?.(clampValue(newValue));
      },
      [disabled, currentValue, step, min, max, handleValueChange, onChangeEnd, clampValue]
    );

    const percentage = getPercentage(currentValue);
    const displayValue = formatValue ? formatValue(currentValue) : String(Math.round(currentValue));

    // Determine tooltip visibility
    const shouldShowTooltip =
      showTooltip &&
      (tooltipVisibility === 'always' ||
        (tooltipVisibility === 'focus' && (isDragging || isFocused)));

    const containerClasses = cn('w-full', disabled && 'opacity-50', className);

    const trackClasses = cn(
      'relative w-full bg-border rounded-full cursor-pointer',
      sizeConfig.track,
      disabled && 'cursor-not-allowed'
    );

    const fillClasses = cn('absolute left-0 top-0 h-full rounded-full', colorConfig.fill);

    const thumbClasses = cn(
      'absolute top-1/2 -translate-y-1/2 rounded-full bg-surface-primary border-2 shadow-sm',
      'transition-shadow duration-150 cursor-grab active:cursor-grabbing',
      'focus:outline-none focus:ring-2',
      sizeConfig.thumb,
      colorConfig.thumb,
      colorConfig.focus,
      disabled && 'cursor-not-allowed'
    );

    const labelClasses = cn('text-text-primary font-medium', sizeConfig.label, labelClassName);

    const valueClasses = cn('text-text-secondary', sizeConfig.label, valueClassName);

    return (
      <div ref={ref} className={containerClasses} data-testid={testID}>
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-2">
            {label && <span className={labelClasses}>{label}</span>}
            {showValue && <span className={valueClasses}>{displayValue}</span>}
          </div>
        )}
        <div
          ref={trackRef}
          className={trackClasses}
          onPointerDown={handlePointerDown}
        >
          <div className={fillClasses} style={{ width: `${percentage}%` }} />
          <div
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-label={ariaLabel || label || 'Slider'}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={currentValue}
            aria-valuetext={displayValue}
            aria-disabled={disabled}
            className={thumbClasses}
            style={{ left: `${percentage}%`, transform: 'translate(-50%, -50%)' }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            {shouldShowTooltip && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-surface-inverse text-text-inverse text-xs rounded whitespace-nowrap">
                {displayValue}
              </div>
            )}
          </div>
        </div>
        {name && <input type="hidden" name={name} value={currentValue} />}
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
