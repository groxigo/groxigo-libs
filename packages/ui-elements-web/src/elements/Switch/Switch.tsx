/**
 * Switch Component (Web)
 *
 * A versatile toggle switch component for web platform.
 * Follows the SwitchPropsBase contract from @groxigo/contracts.
 */

import React, { forwardRef, useCallback, useState } from 'react';
import { cn } from '../../utils/cn';
import type { SwitchPropsBase, SwitchSize, SwitchColorScheme } from '@groxigo/contracts';

// Re-export types for convenience
export type { SwitchSize, SwitchColorScheme };

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeClasses: Record<SwitchSize, {
  track: string;
  thumb: string;
  thumbTranslate: string;
  label: string;
  gap: string;
}> = {
  sm: {
    track: 'w-9 h-5',
    thumb: 'w-4 h-4',
    thumbTranslate: 'translate-x-4',
    label: 'text-sm',
    gap: 'gap-2'
  },
  md: {
    track: 'w-11 h-6',
    thumb: 'w-5 h-5',
    thumbTranslate: 'translate-x-5',
    label: 'text-base',
    gap: 'gap-2.5'
  },
  lg: {
    track: 'w-[52px] h-7',
    thumb: 'w-6 h-6',
    thumbTranslate: 'translate-x-6',
    label: 'text-lg',
    gap: 'gap-3'
  },
};

// ============================================
// COLOR SCHEME CONFIGURATIONS
// ============================================

const colorSchemeClasses: Record<SwitchColorScheme, { checked: string; focus: string }> = {
  primary: { checked: 'bg-primary-500', focus: 'focus-visible:ring-primary-500/20' },
  secondary: { checked: 'bg-secondary-500', focus: 'focus-visible:ring-secondary-500/20' },
  accent: { checked: 'bg-accent-500', focus: 'focus-visible:ring-accent-500/20' },
  success: { checked: 'bg-success', focus: 'focus-visible:ring-success/20' },
  warning: { checked: 'bg-warning', focus: 'focus-visible:ring-warning/20' },
  error: { checked: 'bg-error', focus: 'focus-visible:ring-error/20' },
};

// ============================================
// SWITCH PROPS
// ============================================

export interface SwitchProps extends SwitchPropsBase {
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
      colorScheme = 'primary',
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

    const sizeConfig = sizeClasses[size];
    const colorConfig = colorSchemeClasses[colorScheme];

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

    // Container classes based on label position
    const containerClasses = cn(
      'inline-flex items-center',
      sizeConfig.gap,
      labelPosition === 'left' ? 'flex-row-reverse' : 'flex-row',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      className
    );

    // Track classes
    const trackClasses = cn(
      'relative inline-flex shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
      sizeConfig.track,
      colorConfig.focus,
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      isChecked ? colorConfig.checked : 'bg-border',
      disabled ? 'pointer-events-none' : ''
    );

    // Thumb classes
    const thumbClasses = cn(
      'pointer-events-none inline-block rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out',
      sizeConfig.thumb,
      isChecked ? sizeConfig.thumbTranslate : 'translate-x-0.5'
    );

    // Label classes
    const labelClasses = cn(
      sizeConfig.label,
      'text-text-primary select-none',
      disabled && 'text-text-disabled',
      labelClassName
    );

    return (
      <div className="inline-flex flex-col" data-testid={testID}>
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
            onChange={() => {}} // Handled by button
            className="sr-only"
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
          <span className="text-sm text-text-secondary mt-1">{helperText}</span>
        )}

        {/* Error message */}
        {error && <span className="text-sm text-error mt-1">{error}</span>}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
