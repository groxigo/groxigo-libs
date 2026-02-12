/**
 * Switch Component (Web)
 *
 * A versatile toggle switch component for web platform.
 * Follows the SwitchPropsBase contract from @groxigo/contracts.
 * Uses CSS Modules + design token CSS custom properties instead of Tailwind.
 */

import React, { forwardRef, useCallback, useState } from 'react';
import { clsx } from 'clsx';
import type { SwitchPropsBase, SwitchSize } from '@groxigo/contracts';
import styles from './Switch.module.css';

// Re-export types for convenience
export type { SwitchSize };

// ============================================
// SIZE CLASS MAPS
// ============================================

const trackSizeClass: Record<SwitchSize, string> = {
  sm: styles.trackSm,
  md: styles.trackMd,
  lg: styles.trackLg,
};

const thumbSizeClass: Record<SwitchSize, string> = {
  sm: styles.thumbSm,
  md: styles.thumbMd,
  lg: styles.thumbLg,
};

const gapClass: Record<SwitchSize, string> = {
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
};

const labelSizeClass: Record<SwitchSize, string> = {
  sm: styles.labelSm,
  md: styles.labelMd,
  lg: styles.labelLg,
};

// ============================================
// SWITCH PROPS
// ============================================

export interface SwitchProps extends SwitchPropsBase {
  className?: string;
  /** Error message */
  error?: string;
  /** Additional CSS class for the label */
  labelClassName?: string;
  /** HTML input id */
  id?: string;
}

// ============================================
// SWITCH COMPONENT
// ============================================

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      size = 'md',
      disabled = false,
      required = false,
      label,
      labelPosition = 'right',
      helperText,
      value,
      name,
      onChange,
      className,
      labelClassName,
      testID,
      id,
      error,
    },
    ref
  ) => {
    // Support both controlled and uncontrolled modes
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const handleToggle = useCallback(() => {
      if (disabled) return;

      const newValue = !isChecked;

      if (!isControlled) {
        setInternalChecked(newValue);
      }

      onChange?.(newValue);
    }, [disabled, isChecked, isControlled, onChange]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleToggle();
        }
      },
      [handleToggle]
    );

    const inputId = id || name;

    // Container classes
    const containerClasses = clsx(
      styles.container,
      gapClass[size],
      labelPosition === 'left' ? styles.labelLeft : undefined,
      disabled ? styles.cursorDisabled : styles.cursorPointer,
      className
    );

    // Track classes
    const trackClasses = clsx(
      styles.track,
      trackSizeClass[size],
      isChecked && styles.checked,
      isChecked && styles.primary
    );

    // Thumb classes
    const thumbClasses = clsx(
      styles.thumb,
      thumbSizeClass[size],
      isChecked ? styles.thumbChecked : styles.unchecked
    );

    // Label classes
    const labelClasses = clsx(
      styles.label,
      labelSizeClass[size],
      disabled && styles.disabled,
      labelClassName
    );

    return (
      <div className={styles.wrapper} data-testid={testID}>
        <div className={containerClasses}>
          {/* Hidden input for form submission */}
          <input
            type="checkbox"
            id={inputId}
            name={name}
            value={value}
            checked={isChecked}
            disabled={disabled}
            required={required}
            readOnly
            className={styles.srOnly}
            tabIndex={-1}
          />

          {/* Switch button */}
          <button
            ref={ref}
            type="button"
            role="switch"
            aria-checked={isChecked}
            aria-disabled={disabled}
            aria-required={required}
            aria-labelledby={label ? `${inputId}-label` : undefined}
            disabled={disabled}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
            className={trackClasses}
          >
            <span className={thumbClasses} />
          </button>

          {/* Label */}
          {label && (
            <label
              id={`${inputId}-label`}
              htmlFor={inputId}
              className={labelClasses}
              onClick={disabled ? undefined : handleToggle}
            >
              {label}
            </label>
          )}
        </div>

        {/* Helper text */}
        {helperText && !error && (
          <span className={styles.helperText}>{helperText}</span>
        )}

        {/* Error message */}
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
