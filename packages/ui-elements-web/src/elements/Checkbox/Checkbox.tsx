/**
 * Checkbox Component (Web)
 *
 * A versatile checkbox component for web platform.
 * Uses CSS Modules + design token CSS custom properties instead of Tailwind.
 */

import React, { forwardRef, useCallback } from 'react';
import { clsx } from 'clsx';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';

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

const colorSchemeClass: Record<CheckboxColorScheme, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  accent: styles.accent,
  success: styles.success,
  warning: styles.warning,
  error: styles.error,
  info: styles.info,
};

// ============================================
// CHECKBOX PROPS
// ============================================

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
    const isActive = checked || indeterminate;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.checked);
      },
      [onChange]
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
      isActive && colorSchemeClass[colorScheme],
      disabled && styles.disabled
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
            onChange={handleChange}
            className={styles.srOnly}
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
            <div className={styles.labelContent}>
              <span className={labelClasses}>{label}</span>
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
