/**
 * Checkbox Component (Web)
 *
 * A versatile checkbox component for web platform.
 * Uses CSS Modules + design token CSS custom properties instead of Tailwind.
 */

import React, { forwardRef, useCallback, useState } from 'react';
import { clsx } from 'clsx';
import type { CheckboxPropsBase, CheckboxSize } from '@groxigo/contracts';
import styles from './Checkbox.module.css';
// ============================================
// SIZE CLASS MAPS
// ============================================

const boxSizeClass: Record<CheckboxSize, string> = {
  sm: styles.boxSm,
  md: styles.boxMd,
  lg: styles.boxLg,
};

const iconSizeClass: Record<CheckboxSize, string> = {
  sm: styles.iconSm,
  md: styles.iconMd,
  lg: styles.iconLg,
};

const gapClass: Record<CheckboxSize, string> = {
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
};

const labelSizeClass: Record<CheckboxSize, string> = {
  sm: styles.labelSm,
  md: styles.labelMd,
  lg: styles.labelLg,
};

// ============================================
// CHECKBOX PROPS
// ============================================

export interface CheckboxProps extends CheckboxPropsBase {
  /** Description/helper text below label */
  description?: string;
  /** HTML input id */
  id?: string;
  /** Label class */
  labelClassName?: string;
}

// ============================================
// ICONS
// ============================================

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

// ============================================
// CHECKBOX COMPONENT
// ============================================

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      indeterminate = false,
      disabled = false,
      isInvalid = false,
      required = false,
      label,
      helperText,
      description,
      error,
      size = 'md',
      name,
      id,
      value,
      className,
      labelClassName,
      testID,
    },
    ref
  ) => {
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : uncontrolledChecked;

    const hasError = isInvalid || !!error;
    const isActive = checked || indeterminate;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        if (!isControlled) {
          setUncontrolledChecked(newChecked);
        }
        onChange?.(newChecked);
      },
      [onChange, isControlled]
    );

    const inputId = id || name;

    const containerClasses = clsx(
      styles.container,
      gapClass[size],
      disabled ? styles.cursorDisabled : styles.cursorPointer,
      className
    );

    const boxClasses = clsx(
      styles.box,
      boxSizeClass[size],
      isActive && styles.checked,
      isActive && styles.primary,
      disabled && styles.disabled,
      hasError && styles.error
    );

    const iconClasses = clsx(
      styles.icon,
      iconSizeClass[size],
      disabled && styles.iconDisabled
    );

    const labelClasses = clsx(
      styles.label,
      labelSizeClass[size],
      disabled && styles.labelDisabled,
      labelClassName
    );

    return (
      <div className={styles.wrapper} data-testid={testID}>
        <label className={containerClasses}>
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            required={required}
            onChange={handleChange}
            className={styles.srOnly}
            aria-checked={indeterminate ? 'mixed' : checked}
            aria-invalid={hasError}
          />
          <span className={boxClasses}>
            {indeterminate ? (
              <IndeterminateIcon className={iconClasses} />
            ) : checked ? (
              <CheckIcon className={iconClasses} />
            ) : null}
          </span>
          {label && (
            <div className={styles.labelContent}>
              <span className={labelClasses}>{label}</span>
              {helperText && (
                <span className={styles.description}>{helperText}</span>
              )}
              {description && (
                <span className={styles.description}>{description}</span>
              )}
            </div>
          )}
        </label>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
