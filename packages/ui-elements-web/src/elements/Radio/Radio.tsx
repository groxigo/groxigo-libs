/**
 * Radio Component (Web)
 *
 * A versatile radio button component for web platform.
 * Implements RadioPropsBase from @groxigo/contracts.
 * Uses CSS Modules + design token CSS custom properties instead of Tailwind.
 *
 * Accessibility notes:
 * - Uses native <input type="radio"> which has implicit role="radio"
 * - Native input handles aria-checked automatically via checked attribute
 * - No need to add redundant ARIA attributes to native form controls
 */

import React, { forwardRef, useCallback, useContext } from 'react';
import { clsx } from 'clsx';
import type { RadioPropsBase } from '@groxigo/contracts';
import { RadioGroupContext } from './RadioGroup';
import styles from './Radio.module.css';

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';

// ============================================
// SIZE CLASS MAPS
// ============================================

const outerSizeClass: Record<RadioSize, string> = {
  sm: styles.outerSm,
  md: styles.outerMd,
  lg: styles.outerLg,
};

const innerSizeClass: Record<RadioSize, string> = {
  sm: styles.innerSm,
  md: styles.innerMd,
  lg: styles.innerLg,
};

const gapClass: Record<RadioSize, string> = {
  sm: styles.gapSm,
  md: styles.gapMd,
  lg: styles.gapLg,
};

const labelSizeClass: Record<RadioSize, string> = {
  sm: styles.labelSm,
  md: styles.labelMd,
  lg: styles.labelLg,
};

const colorSchemeClass: Record<RadioColorScheme, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  accent: styles.accent,
  success: styles.success,
  warning: styles.warning,
  error: styles.error,
};

// ============================================
// RADIO PROPS
// ============================================

export interface RadioProps extends RadioPropsBase {
  /** HTML input name */
  name?: string;
  /** HTML input id */
  id?: string;
  /** Label class */
  labelClassName?: string;
  /** Callback when radio is selected */
  onSelect?: () => void;
}

// ============================================
// RADIO COMPONENT
// ============================================

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      value,
      size = 'md',
      colorScheme = 'primary',
      disabled = false,
      isInvalid = false,
      label,
      helperText,
      className,
      testID,
      name,
      id,
      labelClassName,
      onSelect,
    },
    ref
  ) => {
    const groupContext = useContext(RadioGroupContext);

    // Use group context values if available
    const effectiveSize = groupContext.size || size;
    const effectiveColorScheme = groupContext.colorScheme || colorScheme;
    const effectiveDisabled = groupContext.disabled || disabled;
    const effectiveName = groupContext.name || name;
    const isSelected = groupContext.value !== undefined
      ? groupContext.value === value
      : false;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
          if (groupContext.onChange) {
            groupContext.onChange(value);
          } else if (onSelect) {
            onSelect();
          }
        }
      },
      [groupContext, value, onSelect]
    );

    const inputId = id || `radio-${value}`;

    const containerClasses = clsx(
      styles.container,
      gapClass[effectiveSize],
      effectiveDisabled ? styles.cursorDisabled : styles.cursorPointer,
      className
    );

    const outerClasses = clsx(
      styles.outer,
      outerSizeClass[effectiveSize],
      isSelected && styles.selected,
      isSelected && colorSchemeClass[effectiveColorScheme],
      isInvalid && styles.invalid,
      effectiveDisabled && styles.disabled
    );

    const innerClasses = clsx(
      styles.inner,
      innerSizeClass[effectiveSize],
      colorSchemeClass[effectiveColorScheme],
      effectiveDisabled && styles.innerDisabled
    );

    const labelClasses = clsx(
      styles.label,
      labelSizeClass[effectiveSize],
      effectiveDisabled && styles.labelDisabled,
      labelClassName
    );

    return (
      <div className={styles.wrapper} data-testid={testID}>
        <label className={containerClasses}>
          <input
            ref={ref}
            type="radio"
            id={inputId}
            name={effectiveName}
            value={value}
            checked={isSelected}
            disabled={effectiveDisabled}
            onChange={handleChange}
            className={styles.srOnly}
            // Note: role="radio" and aria-checked are redundant on native <input type="radio">
            // The browser automatically exposes these semantics
            aria-invalid={isInvalid || undefined}
            aria-describedby={helperText ? `${inputId}-helper` : undefined}
          />
          <span className={outerClasses}>
            {isSelected && <span className={innerClasses} />}
          </span>
          {label && (
            <div className={styles.labelContent}>
              <span className={labelClasses}>{label}</span>
              {helperText && (
                <span
                  id={`${inputId}-helper`}
                  className={styles.helperText}
                >
                  {helperText}
                </span>
              )}
            </div>
          )}
        </label>
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;
