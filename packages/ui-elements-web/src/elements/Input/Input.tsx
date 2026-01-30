/**
 * Input Component (Web)
 *
 * Implements @groxigo/contracts InputPropsBase for web platform.
 */

import React, { forwardRef, useState, useCallback, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type InputSize = 'xs' | 'sm' | 'md' | 'lg';
export type InputVariant = 'outline' | 'filled' | 'flushed' | 'unstyled';

// Size classes
const sizeClasses: Record<string, string> = {
  xs: 'h-7 px-2 text-xs rounded-sm',
  sm: 'h-9 px-3 text-sm rounded',
  md: 'h-11 px-4 text-base rounded-md',
  lg: 'h-13 px-5 text-md rounded-lg',
};

// Base variant classes
const variantClasses: Record<string, string> = {
  outline: 'bg-surface-primary border border-border focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
  filled: 'bg-surface-secondary border-0 focus:bg-surface-primary focus:ring-2 focus:ring-primary-500/20',
  flushed: 'bg-transparent border-0 border-b-2 border-border focus:border-primary-500 rounded-none px-0',
  unstyled: 'bg-transparent border-0',
};

// Error state classes
const errorClasses: Record<string, string> = {
  outline: 'border-error focus:border-error focus:ring-error/20',
  filled: 'ring-2 ring-error/20 focus:ring-error/30',
  flushed: 'border-error focus:border-error',
  unstyled: '',
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

    const wrapperClasses = cn(
      'relative flex items-center',
      fullWidth ? 'w-full' : 'w-auto'
    );

    const inputClasses = cn(
      'w-full transition-all duration-200 outline-none font-sans text-text-primary placeholder:text-text-tertiary',
      sizeClasses[size],
      variantClasses[variant],
      hasError && errorClasses[variant],
      disabled && 'opacity-50 cursor-not-allowed bg-surface-secondary',
      leftElement && 'pl-10',
      rightElement && 'pr-10',
      className
    );

    return (
      <div className={cn('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary mb-1.5"
          >
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
        <div className={wrapperClasses}>
          {leftElement ? (
            <div className="absolute left-3 flex items-center justify-center text-text-secondary">
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
            <div className="absolute right-3 flex items-center justify-center text-text-secondary">
              {rightElement}
            </div>
          ) : null}
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

Input.displayName = 'Input';

export default Input;
