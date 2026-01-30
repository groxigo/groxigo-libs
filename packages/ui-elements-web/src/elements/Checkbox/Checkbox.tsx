/**
 * Checkbox Component (Web)
 *
 * A versatile checkbox component for web platform.
 */

import React, { forwardRef, useCallback } from 'react';
import { cn } from '../../utils/cn';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';

const sizeClasses: Record<CheckboxSize, { box: string; icon: string; label: string; gap: string }> = {
  sm: { box: 'w-4 h-4', icon: 'w-2.5 h-2.5', label: 'text-sm', gap: 'gap-2' },
  md: { box: 'w-5 h-5', icon: 'w-3 h-3', label: 'text-base', gap: 'gap-2.5' },
  lg: { box: 'w-6 h-6', icon: 'w-3.5 h-3.5', label: 'text-md', gap: 'gap-3' },
};

// Using focus-visible for keyboard-only focus indicators
const colorSchemeClasses: Record<CheckboxColorScheme, { checked: string; focus: string }> = {
  primary: { checked: 'bg-primary-500 border-primary-500', focus: 'focus-within:ring-primary-500/20' },
  secondary: { checked: 'bg-secondary-500 border-secondary-500', focus: 'focus-within:ring-secondary-500/20' },
  accent: { checked: 'bg-accent-500 border-accent-500', focus: 'focus-within:ring-accent-500/20' },
  success: { checked: 'bg-success border-success', focus: 'focus-within:ring-success/20' },
  warning: { checked: 'bg-warning border-warning', focus: 'focus-within:ring-warning/20' },
  error: { checked: 'bg-error border-error', focus: 'focus-within:ring-error/20' },
  info: { checked: 'bg-info border-info', focus: 'focus-within:ring-info/20' },
};

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Callback when checkbox state changes */
  onChange?: (checked: boolean) => void;
  /** Whether to show indeterminate state */
  indeterminate?: boolean;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Label text */
  label?: string;
  /** Description/helper text below label */
  description?: string;
  /** Error message */
  error?: string;
  /** Checkbox size @default 'md' */
  size?: CheckboxSize;
  /** Color scheme @default 'primary' */
  colorScheme?: CheckboxColorScheme;
  /** HTML input name */
  name?: string;
  /** HTML input id */
  id?: string;
  /** HTML input value */
  value?: string;
  /** Additional CSS class */
  className?: string;
  /** Label class */
  labelClassName?: string;
  /** Test ID */
  testID?: string;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IndeterminateIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 6h8" strokeLinecap="round" />
  </svg>
);

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      onChange,
      indeterminate = false,
      disabled = false,
      label,
      description,
      error,
      size = 'md',
      colorScheme = 'primary',
      name,
      id,
      value,
      className,
      labelClassName,
      testID,
    },
    ref
  ) => {
    const sizeConfig = sizeClasses[size];
    const colorConfig = colorSchemeClasses[colorScheme];
    const isActive = checked || indeterminate;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.checked);
      },
      [onChange]
    );

    const inputId = id || name;

    const containerClasses = cn(
      'inline-flex items-center',
      sizeConfig.gap,
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      className
    );

    const boxClasses = cn(
      'relative flex items-center justify-center border-2 rounded transition-all duration-150',
      sizeConfig.box,
      colorConfig.focus,
      'focus-within:ring-2',
      isActive ? colorConfig.checked : 'border-border bg-surface-primary hover:border-text-secondary',
      disabled && 'pointer-events-none'
    );

    const iconClasses = cn(
      sizeConfig.icon,
      'text-white'
    );

    const labelClasses = cn(
      sizeConfig.label,
      'text-text-primary select-none',
      disabled && 'text-text-disabled',
      labelClassName
    );

    return (
      <div className="inline-flex flex-col" data-testid={testID}>
        <label className={containerClasses}>
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            className="sr-only"
            aria-checked={indeterminate ? 'mixed' : checked}
          />
          <span className={boxClasses}>
            {indeterminate ? (
              <IndeterminateIcon className={iconClasses} />
            ) : checked ? (
              <CheckIcon className={iconClasses} />
            ) : null}
          </span>
          {label && (
            <div className="flex flex-col">
              <span className={labelClasses}>{label}</span>
              {description && (
                <span className="text-sm text-text-secondary">{description}</span>
              )}
            </div>
          )}
        </label>
        {error && <span className="text-sm text-error mt-1">{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
