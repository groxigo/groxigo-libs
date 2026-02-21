'use client';

/**
 * Select Component (Web)
 *
 * A dropdown select component for web platform.
 * Uses CSS Modules + design token CSS custom properties instead of Tailwind.
 * Uses native select for better accessibility and mobile experience.
 */

import { forwardRef, useCallback, type ChangeEvent, type CSSProperties } from 'react';
import { clsx } from 'clsx';
import type { SelectPropsBase, SelectOption as ContractSelectOption } from '@groxigo/contracts';
import styles from './Select.module.css';

export type SelectColorScheme = 'primary' | 'secondary' | 'accent' | 'neutral';

export interface SelectOption extends Omit<ContractSelectOption, 'value'> {
  value: string | number;
}

/** Maps variant + error → CSS module error class */
const errorStyleMap: Record<string, string | undefined> = {
  outline: styles.outlineError,
  filled: styles.filledError,
  flushed: styles.flushedError,
};

export interface SelectProps extends Omit<SelectPropsBase, 'value' | 'onChange' | 'options'> {
  className?: string;
  /** Color scheme @default 'primary' */
  colorScheme?: SelectColorScheme;
  /** Current value (broader than contract to support numbers) */
  value?: string | number;
  /** Change handler (broader than contract to support numbers) */
  onChange?: (value: string | number) => void;
  /** Available options (broader than contract to support numbers) */
  options: SelectOption[];
  /** HTML select id */
  id?: string;
  /** Whether to take full width @default true */
  fullWidth?: boolean;
  /** Label class */
  labelClassName?: string;
  /** Native change handler */
  onNativeChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
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
      (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        // Try to convert back to number if original options used numbers
        const numValue = Number(newValue);
        const finalValue = options.some(opt => opt.value === numValue) ? numValue : newValue;
        onChange?.(finalValue);
        onNativeChange?.(e);
      },
      [onChange, onNativeChange, options]
    );

    const selectClasses = clsx(
      styles.select,
      styles[size],
      styles[variant],
      hasError && errorStyleMap[variant],
      disabled && styles.disabled,
      className
    );

    // Custom chevron as background image using data URI
    const chevronStyle: CSSProperties = {
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239E9E9E'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
    };

    return (
      <div className={clsx(styles.container, fullWidth && styles.fullWidth)}>
        {label && (
          <label
            htmlFor={inputId}
            className={clsx(styles.label, labelClassName)}
          >
            {label}
            {required && <span className={styles.required}>*</span>}
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
            className={styles.errorText}
            role="alert"
          >
            {error}
          </p>
        )}
        {!error && helperText && (
          <p
            id={`${inputId}-helper`}
            className={styles.helperText}
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
