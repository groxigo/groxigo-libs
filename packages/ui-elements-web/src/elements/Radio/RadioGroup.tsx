/**
 * RadioGroup Component (Web)
 *
 * A container for Radio components that manages selection state.
 * Implements RadioGroupPropsBase from @groxigo/contracts.
 * Uses CSS Modules + design token CSS custom properties instead of Tailwind.
 */

import React, { createContext, useMemo, useState, useCallback } from 'react';
import { clsx } from 'clsx';
import type { RadioGroupPropsBase } from '@groxigo/contracts';
import type { RadioSize, RadioColorScheme } from './Radio';
import styles from './RadioGroup.module.css';

export interface RadioGroupContextValue {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  size?: RadioSize;
  colorScheme?: RadioColorScheme;
  disabled?: boolean;
}

export const RadioGroupContext = createContext<RadioGroupContextValue>({});

export interface RadioGroupProps extends RadioGroupPropsBase {
  /** Label for the radio group */
  label?: string;
  /** Label class */
  labelClassName?: string;
  /** Test ID */
  testID?: string;
}

const spacingClassMap: Record<number, string> = {
  1: styles.gap1,
  2: styles.gap2,
  3: styles.gap3,
  4: styles.gap4,
  6: styles.gap6,
  8: styles.gap8,
  12: styles.gap12,
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value: controlledValue,
  defaultValue,
  name,
  size = 'md',
  colorScheme = 'primary',
  direction = 'vertical',
  spacing = 3,
  disabled = false,
  required = false,
  error,
  onChange,
  children,
  className,
  label,
  labelClassName,
  testID,
}) => {
  // Handle controlled vs uncontrolled mode
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  const contextValue = useMemo<RadioGroupContextValue>(
    () => ({
      value: currentValue,
      onChange: handleChange,
      name,
      size,
      colorScheme,
      disabled,
    }),
    [currentValue, handleChange, name, size, colorScheme, disabled]
  );

  // Get gap class or default
  const gapClass = spacingClassMap[spacing] || styles.gap3;

  const containerClasses = clsx(
    styles.container,
    direction === 'horizontal' ? styles.horizontal : styles.vertical,
    gapClass,
    className
  );

  const labelClasses = clsx(
    styles.label,
    required && styles.required,
    labelClassName
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        role="radiogroup"
        aria-required={required}
        aria-invalid={!!error}
        data-testid={testID}
        className={styles.wrapper}
      >
        {label && <span className={labelClasses}>{label}</span>}
        <div className={containerClasses}>
          {children}
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    </RadioGroupContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
