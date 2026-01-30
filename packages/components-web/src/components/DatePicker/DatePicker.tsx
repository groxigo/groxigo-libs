/**
 * DatePicker Component (Web)
 *
 * Date selection input using native HTML5 date input.
 * Supports min/max date validation and formatted display.
 */

import React, { forwardRef, useState, useCallback, useMemo } from 'react';
import { cn } from '@groxigo/ui-elements-web';

export type DatePickerSize = 'sm' | 'md' | 'lg';
export type DatePickerSection = 'groceries' | 'recipes' | 'default';

const sizeClasses: Record<DatePickerSize, string> = {
  sm: 'h-9 px-3 text-sm rounded',
  md: 'h-11 px-4 text-base rounded-md',
  lg: 'h-13 px-5 text-md rounded-lg',
};

export interface DatePickerProps {
  /** Selected date value */
  value?: Date;
  /** Callback when date changes */
  onChange?: (date: Date) => void;
  /** Label for the date picker */
  label?: string;
  /** Placeholder text @default 'Select date' */
  placeholder?: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display */
  helperText?: string;
  /** Whether the date picker is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Minimum selectable date */
  minimumDate?: Date;
  /** Maximum selectable date */
  maximumDate?: Date;
  /** Input size @default 'md' */
  size?: DatePickerSize;
  /** Section for theming */
  section?: DatePickerSection;
  /** Whether to take full width @default true */
  fullWidth?: boolean;
  /** HTML input name */
  name?: string;
  /** HTML input id */
  id?: string;
  /** Additional CSS class */
  className?: string;
  /** Additional container class */
  containerClassName?: string;
  /** Test ID for testing */
  testID?: string;
  /** Focus handler */
  onFocus?: () => void;
  /** Blur handler */
  onBlur?: () => void;
}

/**
 * Format Date to YYYY-MM-DD for input value
 */
function formatDateToInputValue(date: Date | undefined): string {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse YYYY-MM-DD string to Date
 */
function parseInputValueToDate(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder = 'Select date',
      error,
      helperText,
      disabled = false,
      required = false,
      minimumDate,
      maximumDate,
      size = 'md',
      section = 'default',
      fullWidth = true,
      name,
      id,
      className,
      containerClassName,
      testID,
      onFocus,
      onBlur,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState<Date | undefined>(value);
    const [isFocused, setIsFocused] = useState(false);

    const currentValue = value !== undefined ? value : internalValue;
    const inputValue = formatDateToInputValue(currentValue);
    const hasError = !!error;
    const inputId = id || name;

    // Format min/max dates for input
    const minDate = useMemo(() => formatDateToInputValue(minimumDate), [minimumDate]);
    const maxDate = useMemo(() => formatDateToInputValue(maximumDate), [maximumDate]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      const parsedDate = parseInputValueToDate(newValue);

      if (parsedDate) {
        // Validate against min/max
        if (minimumDate && parsedDate < minimumDate) return;
        if (maximumDate && parsedDate > maximumDate) return;

        if (value === undefined) {
          setInternalValue(parsedDate);
        }
        onChange?.(parsedDate);
      }
    }, [value, onChange, minimumDate, maximumDate]);

    const handleFocus = useCallback(() => {
      setIsFocused(true);
      onFocus?.();
    }, [onFocus]);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
      onBlur?.();
    }, [onBlur]);

    const inputClasses = cn(
      'w-full transition-all duration-200 outline-none font-sans text-text-primary',
      'bg-surface-primary border border-border',
      'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
      sizeClasses[size],
      hasError && 'border-error focus:border-error focus:ring-error/20',
      disabled && 'opacity-50 cursor-not-allowed bg-surface-secondary',
      className
    );

    return (
      <div className={cn('flex flex-col', fullWidth && 'w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary mb-1.5"
          >
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            name={name}
            type="date"
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            min={minDate}
            max={maxDate}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={inputClasses}
            data-testid={testID}
          />
          {/* Calendar icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
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

DatePicker.displayName = 'DatePicker';

export default DatePicker;
