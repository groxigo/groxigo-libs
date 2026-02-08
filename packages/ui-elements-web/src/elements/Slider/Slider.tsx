/**
 * Slider Component (Web)
 *
 * A range slider component for web platform.
 * Implements @groxigo/contracts SliderPropsBase.
 * Uses CSS Modules + design token CSS custom properties instead of Tailwind.
 */

import React, { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import type { SliderPropsBase, SliderSize } from '@groxigo/contracts';
import styles from './Slider.module.css';

// ============================================
// SIZE CLASS MAPS
// ============================================

const trackSizeClass: Record<SliderSize, string> = {
  sm: styles.trackSm,
  md: styles.trackMd,
  lg: styles.trackLg,
};

const thumbSizeClass: Record<SliderSize, string> = {
  sm: styles.thumbSm,
  md: styles.thumbMd,
  lg: styles.thumbLg,
};

const labelSizeClass: Record<SliderSize, string> = {
  sm: styles.labelSm,
  md: styles.labelMd,
  lg: styles.labelLg,
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

    const containerClasses = clsx(
      styles.container,
      disabled && styles.disabled,
      className
    );

    const trackClasses = clsx(
      styles.track,
      trackSizeClass[size],
      disabled && styles.trackDisabled
    );

    const fillClasses = clsx(
      styles.fill,
      styles.primary,
      disabled && styles.fillDisabled
    );

    const thumbClasses = clsx(
      styles.thumb,
      thumbSizeClass[size],
      styles.primary,
      disabled && styles.thumbDisabled
    );

    const labelClasses = clsx(
      styles.label,
      labelSizeClass[size],
      disabled && styles.labelDisabled,
      labelClassName
    );

    const valueClasses = clsx(
      styles.value,
      labelSizeClass[size],
      disabled && styles.valueDisabled,
      valueClassName
    );

    return (
      <div ref={ref} className={containerClasses} data-testid={testID}>
        {(label || showValue) && (
          <div className={styles.header}>
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
              <div className={styles.tooltip}>
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
