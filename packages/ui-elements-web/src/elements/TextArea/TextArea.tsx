'use client';

/**
 * TextArea Component (Web)
 *
 * Implements @groxigo/contracts TextAreaPropsBase for web platform.
 * Uses CSS Modules + design token CSS custom properties instead of Tailwind.
 * A multi-line text input component with support for various variants and sizes.
 */

import React, { forwardRef, useState, useCallback } from 'react';
import { clsx } from 'clsx';
import type {
  TextAreaPropsBase,
  TextAreaSize,
  TextAreaVariant,
  TextAreaResize,
} from '@groxigo/contracts';
import styles from './TextArea.module.css';

/** Maps variant + error → CSS module error class */
const errorStyleMap: Record<string, string | undefined> = {
  outline: styles.outlineError,
  filled: styles.filledError,
  flushed: styles.flushedError,
  unstyled: undefined,
};

/** Maps resize → CSS module resize class */
const resizeStyleMap: Record<TextAreaResize, string> = {
  none: styles.resizeNone,
  vertical: styles.resizeVertical,
  horizontal: styles.resizeHorizontal,
  both: styles.resizeBoth,
};

export interface TextAreaProps extends TextAreaPropsBase {
  className?: string;
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

    const textareaClasses = clsx(
      styles.textarea,
      styles[size],
      styles[variant],
      resizeStyleMap[resize],
      hasError && errorStyleMap[variant],
      disabled && styles.disabled,
      className
    );

    return (
      <div className={clsx(styles.container, fullWidth && styles.fullWidth)}>
        {label && (
          <label
            htmlFor={textareaId}
            className={styles.label}
          >
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={clsx(styles.wrapper, fullWidth ? styles.fullWidth : styles.wrapperAuto)}>
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
        <div className={styles.footerRow}>
          <div className={styles.footerContent}>
            {error && (
              <p
                id={`${textareaId}-error`}
                className={styles.errorText}
                role="alert"
              >
                {error}
              </p>
            )}
            {!error && helperText && (
              <p
                id={`${textareaId}-helper`}
                className={styles.helperText}
              >
                {helperText}
              </p>
            )}
          </div>
          {showCount && maxLength && (
            <span
              className={clsx(
                styles.charCount,
                charCount >= maxLength && styles.charCountError
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
