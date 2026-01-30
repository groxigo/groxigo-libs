/**
 * Radio Component (Web)
 *
 * A versatile radio button component for web platform.
 * Implements RadioPropsBase from @groxigo/contracts.
 *
 * Accessibility notes:
 * - Uses native <input type="radio"> which has implicit role="radio"
 * - Native input handles aria-checked automatically via checked attribute
 * - No need to add redundant ARIA attributes to native form controls
 */

import React, { forwardRef, useCallback, useContext } from 'react';
import { cn } from '../../utils/cn';
import type { RadioPropsBase } from '@groxigo/contracts';
import { RadioGroupContext } from './RadioGroup';

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';

const sizeClasses: Record<RadioSize, { outer: string; inner: string; label: string; gap: string }> = {
  sm: { outer: 'w-4 h-4', inner: 'w-2 h-2', label: 'text-sm', gap: 'gap-2' },
  md: { outer: 'w-5 h-5', inner: 'w-2.5 h-2.5', label: 'text-base', gap: 'gap-2.5' },
  lg: { outer: 'w-6 h-6', inner: 'w-3 h-3', label: 'text-lg', gap: 'gap-3' },
};

const colorSchemeClasses: Record<RadioColorScheme, { checked: string; focus: string }> = {
  primary: { checked: 'border-primary-500', focus: 'focus:ring-primary-500/20' },
  secondary: { checked: 'border-secondary-500', focus: 'focus:ring-secondary-500/20' },
  accent: { checked: 'border-accent-500', focus: 'focus:ring-accent-500/20' },
  success: { checked: 'border-success', focus: 'focus:ring-success/20' },
  warning: { checked: 'border-warning', focus: 'focus:ring-warning/20' },
  error: { checked: 'border-error', focus: 'focus:ring-error/20' },
};

const innerColorClasses: Record<RadioColorScheme, string> = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  accent: 'bg-accent-500',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
};

export interface RadioProps extends RadioPropsBase {
  /** HTML input name */
  name?: string;
  /** HTML input id */
  id?: string;
  /** Label class */
  labelClassName?: string;
  /** Callback when radio is selected */
  onSelect?: () => void;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      size = 'md',
      colorScheme = 'primary',
      disabled = false,
      isInvalid = false,
      label,
      helperText,
      className,
      testID,
      name,
      id,
      labelClassName,
      onSelect,
    },
    ref
  ) => {
    const groupContext = useContext(RadioGroupContext);

    // Use group context values if available
    const effectiveSize = groupContext.size || size;
    const effectiveColorScheme = groupContext.colorScheme || colorScheme;
    const effectiveDisabled = groupContext.disabled || disabled;
    const effectiveName = groupContext.name || name;
    const isSelected = groupContext.value !== undefined
      ? groupContext.value === value
      : false;

    const sizeConfig = sizeClasses[effectiveSize];
    const colorConfig = colorSchemeClasses[effectiveColorScheme];
    const innerColor = innerColorClasses[effectiveColorScheme];

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
          if (groupContext.onChange) {
            groupContext.onChange(value);
          } else if (onSelect) {
            onSelect();
          }
        }
      },
      [groupContext, value, onSelect]
    );

    const inputId = id || `radio-${value}`;

    const containerClasses = cn(
      'inline-flex items-center',
      sizeConfig.gap,
      effectiveDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      className
    );

    const outerClasses = cn(
      'relative flex items-center justify-center border-2 rounded-full transition-all duration-150',
      sizeConfig.outer,
      colorConfig.focus,
      'focus-within:ring-2',
      isSelected ? colorConfig.checked : 'border-border bg-surface-primary hover:border-text-secondary',
      isInvalid && 'border-error',
      effectiveDisabled && 'pointer-events-none'
    );

    const innerClasses = cn(
      sizeConfig.inner,
      'rounded-full',
      innerColor
    );

    const labelClasses = cn(
      sizeConfig.label,
      'text-text-primary select-none',
      effectiveDisabled && 'text-text-disabled',
      labelClassName
    );

    return (
      <div className="inline-flex flex-col" data-testid={testID}>
        <label className={containerClasses}>
          <input
            ref={ref}
            type="radio"
            id={inputId}
            name={effectiveName}
            value={value}
            checked={isSelected}
            disabled={effectiveDisabled}
            onChange={handleChange}
            className="sr-only"
            // Note: role="radio" and aria-checked are redundant on native <input type="radio">
            // The browser automatically exposes these semantics
            aria-invalid={isInvalid || undefined}
            aria-describedby={helperText ? `${inputId}-helper` : undefined}
          />
          <span className={outerClasses}>
            {isSelected && <span className={innerClasses} />}
          </span>
          {label && (
            <div className="flex flex-col">
              <span className={labelClasses}>{label}</span>
              {helperText && (
                <span
                  id={`${inputId}-helper`}
                  className="text-sm text-text-secondary"
                >
                  {helperText}
                </span>
              )}
            </div>
          )}
        </label>
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
