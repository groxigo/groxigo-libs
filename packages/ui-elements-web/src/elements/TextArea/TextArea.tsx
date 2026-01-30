/**
 * TextArea Component (Web)
 *
 * Implements @groxigo/contracts TextAreaPropsBase for web platform.
 * A multi-line text input component with support for various variants and sizes.
 */

import React, { forwardRef, useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import type {
  TextAreaPropsBase,
  TextAreaSize,
  TextAreaVariant,
  TextAreaResize,
} from '@groxigo/contracts';

// Size classes for textarea
const sizeClasses: Record<TextAreaSize, string> = {
  sm: 'px-2.5 py-2 text-sm rounded',
  md: 'px-4 py-3 text-base rounded-md',
  lg: 'px-5 py-4 text-lg rounded-lg',
};

// Base variant classes
const variantClasses: Record<TextAreaVariant, string> = {
  outline:
    'bg-surface-primary border border-border focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
  filled:
    'bg-surface-secondary border-0 focus:bg-surface-primary focus:ring-2 focus:ring-primary-500/20',
  flushed:
    'bg-transparent border-0 border-b-2 border-border focus:border-primary-500 rounded-none px-0',
  unstyled: 'bg-transparent border-0',
};

// Error state classes
const errorClasses: Record<TextAreaVariant, string> = {
  outline: 'border-error focus:border-error focus:ring-error/20',
  filled: 'ring-2 ring-error/20 focus:ring-error/30',
  flushed: 'border-error focus:border-error',
  unstyled: '',
};

// Resize classes
const resizeClasses: Record<TextAreaResize, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

export interface TextAreaProps extends TextAreaPropsBase {
  /** HTML textarea id */
  id?: string;
  /** Native change handler */
  onChangeNative?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      size = 'md',
      variant = 'outline',
      rows = 3,
      minRows,
      maxRows,
      resize = 'vertical',
      maxLength,
      showCount = false,
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
      fullWidth = false,
      name,
      id,
      autoFocus = false,
      className,
      testID,
      onChange,
      onChangeNative,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(
      (value || defaultValue || '').length
    );
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
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setCharCount(newValue.length);
        onChangeNative?.(e);
        onChange?.(newValue);
      },
      [onChange, onChangeNative]
    );

    const textareaId = id || name;

    const textareaClasses = cn(
      'w-full transition-all duration-200 outline-none font-sans text-text-primary placeholder:text-text-tertiary',
      sizeClasses[size],
      variantClasses[variant],
      resizeClasses[resize],
      hasError && errorClasses[variant],
      disabled && 'opacity-50 cursor-not-allowed bg-surface-secondary',
      className
    );

    return (
      <div className={cn('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-text-primary mb-1.5"
          >
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
        <div className={cn('relative', fullWidth ? 'w-full' : 'w-auto')}>
          <textarea
            ref={ref}
            id={textareaId}
            name={name}
            className={textareaClasses}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            rows={rows}
            maxLength={maxLength}
            autoFocus={autoFocus}
            aria-invalid={hasError}
            aria-describedby={
              error
                ? `${textareaId}-error`
                : helperText
                  ? `${textareaId}-helper`
                  : undefined
            }
            data-testid={testID}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        </div>
        <div className="flex justify-between items-start mt-1">
          <div className="flex-1">
            {error && (
              <p
                id={`${textareaId}-error`}
                className="text-xs text-error"
                role="alert"
              >
                {error}
              </p>
            )}
            {!error && helperText && (
              <p
                id={`${textareaId}-helper`}
                className="text-xs text-text-secondary"
              >
                {helperText}
              </p>
            )}
          </div>
          {showCount && maxLength && (
            <span
              className={cn(
                'text-xs ml-2',
                charCount >= maxLength ? 'text-error' : 'text-text-secondary'
              )}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
