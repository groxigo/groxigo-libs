/**
 * Input Component (Web)
 *
 * Implements @groxigo/contracts InputPropsBase for web platform.
 * Uses CSS Modules + design token CSS custom properties instead of Tailwind.
 */

import React, { forwardRef, useState, useCallback, type ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './Input.module.css';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg';
export type InputVariant = 'outline' | 'filled' | 'flushed' | 'unstyled';

/** Maps variant + error → CSS module error class */
const errorStyleMap: Record<string, string | undefined> = {
  outline: styles.outlineError,
  filled: styles.filledError,
  flushed: styles.flushedError,
  unstyled: undefined,
};

export interface InputProps {
  /** Input size @default 'md' */
  size?: InputSize;
  /** Input variant @default 'outline' */
  variant?: InputVariant;
  /** Input type @default 'text' */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** Label text */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Error message (also marks input as invalid) */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is read-only */
  readOnly?: boolean;
  /** Whether input is required */
  required?: boolean;
  /** Whether input has error state */
  isInvalid?: boolean;
  /** Whether the input takes full width @default false */
  fullWidth?: boolean;
  /** Left element (icon or text) */
  leftElement?: ReactNode;
  /** Right element (icon or text) */
  rightElement?: ReactNode;
  /** HTML input name */
  name?: string;
  /** HTML input id */
  id?: string;
  /** Autocomplete hint */
  autoComplete?: string;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testID?: string;
  /** Change handler */
  onChangeText?: (text: string) => void;
  /** Native change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Focus handler */
  onFocus?: () => void;
  /** Blur handler */
  onBlur?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      variant = 'outline',
      type = 'text',
      label,
      error,
      helperText,
      placeholder,
      value,
      defaultValue,
      disabled = false,
      readOnly = false,
      required = false,
      isInvalid = false,
      leftElement,
      rightElement,
      fullWidth = false,
      name,
      id,
      autoComplete,
      className,
      testID,
      onChangeText,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasError = isInvalid || !!error;

    const handleFocus = useCallback(() => {
      setIsFocused(true);
      onFocus?.();
    }, [onFocus]);

    const handleBlur = useCallback(() => {
      setIsFocused(false);
      onBlur?.();
    }, [onBlur]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        onChangeText?.(e.target.value);
      },
      [onChange, onChangeText]
    );

    const inputId = id || name;

    const wrapperClasses = clsx(
      styles.wrapper,
      fullWidth ? styles.fullWidth : styles.wrapperAuto
    );

    const inputClasses = clsx(
      styles.input,
      styles[size],
      styles[variant],
      hasError && errorStyleMap[variant],
      disabled && styles.disabled,
      leftElement && styles.hasLeftElement,
      rightElement && styles.hasRightElement,
      className
    );

    return (
      <div className={clsx(styles.container, fullWidth && styles.fullWidth)}>
        {label && (
          <label
            htmlFor={inputId}
            className={styles.label}
          >
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={wrapperClasses}>
          {leftElement ? (
            <div className={styles.leftElement}>
              {leftElement}
            </div>
          ) : null}
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            className={inputClasses}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            autoComplete={autoComplete}
            aria-invalid={hasError}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            data-testid={testID}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          {rightElement ? (
            <div className={styles.rightElement}>
              {rightElement}
            </div>
          ) : null}
        </div>
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

Input.displayName = 'Input';

export default Input;
