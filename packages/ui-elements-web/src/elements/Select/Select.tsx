/**
 * Select Component (Web)
 *
 * A dropdown select component for web platform.
 * Uses native select for better accessibility and mobile experience.
 */

import React, { forwardRef, useCallback } from 'react';
import { cn } from '../../utils/cn';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'outline' | 'filled' | 'flushed' | 'unstyled';
export type SelectColorScheme = 'primary' | 'secondary' | 'accent' | 'neutral';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const sizeClasses: Record<SelectSize, string> = {
  sm: 'h-9 px-3 text-sm rounded',
  md: 'h-11 px-4 text-base rounded-md',
  lg: 'h-13 px-5 text-md rounded-lg',
};

const variantClasses: Record<SelectVariant, string> = {
  outline: 'bg-surface-primary border border-border focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
  filled: 'bg-surface-secondary border-0 focus:bg-surface-primary focus:ring-2 focus:ring-primary-500/20',
  flushed: 'bg-transparent border-0 border-b-2 border-border focus:border-primary-500 rounded-none px-0',
  unstyled: 'bg-transparent border-0',
};

const errorClasses: Record<SelectVariant, string> = {
  outline: 'border-error focus:border-error focus:ring-error/20',
  filled: 'ring-2 ring-error/20 focus:ring-error/30',
  flushed: 'border-error focus:border-error',
  unstyled: '',
};

export interface SelectProps {
  /** Select size @default 'md' */
  size?: SelectSize;
  /** Select variant @default 'outline' */
  variant?: SelectVariant;
  /** Color scheme @default 'primary' */
  colorScheme?: SelectColorScheme;
  /** Label text */
  label?: string;
  /** Current value */
  value?: string | number;
  /** Change handler */
  onChange?: (value: string | number) => void;
  /** Available options */
  options: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Whether to take full width @default true */
  fullWidth?: boolean;
  /** HTML select name */
  name?: string;
  /** HTML select id */
  id?: string;
  /** Additional CSS class */
  className?: string;
  /** Label class */
  labelClassName?: string;
  /** Test ID */
  testID?: string;
  /** Native change handler */
  onNativeChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = 'md',
      variant = 'outline',
      colorScheme = 'primary',
      label,
      value,
      onChange,
      options,
      placeholder = 'Select an option',
      error,
      helperText,
      disabled = false,
      required = false,
      fullWidth = true,
      name,
      id,
      className,
      labelClassName,
      testID,
      onNativeChange,
    },
    ref
  ) => {
    const hasError = !!error;
    const inputId = id || name;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        // Try to convert back to number if original options used numbers
        const numValue = Number(newValue);
        const finalValue = options.some(opt => opt.value === numValue) ? numValue : newValue;
        onChange?.(finalValue);
        onNativeChange?.(e);
      },
      [onChange, onNativeChange, options]
    );

    const selectClasses = cn(
      'w-full transition-all duration-200 outline-none font-sans text-text-primary cursor-pointer appearance-none',
      'bg-no-repeat bg-[length:16px] bg-[right_12px_center]',
      sizeClasses[size],
      variantClasses[variant],
      hasError && errorClasses[variant],
      disabled && 'opacity-50 cursor-not-allowed bg-surface-secondary',
      className
    );

    // Custom chevron as background image using data URI
    const chevronStyle: React.CSSProperties = {
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239E9E9E'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
      paddingRight: '2.5rem',
    };

    return (
      <div className={cn('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-medium text-text-primary mb-1.5',
              labelClassName
            )}
          >
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          name={name}
          value={value ?? ''}
          onChange={handleChange}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          className={selectClasses}
          style={chevronStyle}
          data-testid={testID}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={String(option.value)}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-error mt-1"
            role="alert"
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            className="text-xs text-text-secondary mt-1"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
