/**
 * RadioGroup Component (Web)
 *
 * A container for Radio components that manages selection state.
 * Implements RadioGroupPropsBase from @groxigo/contracts.
 */

import React, { createContext, useMemo, useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import type { RadioGroupPropsBase } from '@groxigo/contracts';
import type { RadioSize, RadioColorScheme } from './Radio';

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

const spacingMap: Record<number, string> = {
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  6: 'gap-6',
  8: 'gap-8',
  12: 'gap-12',
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
  const gapClass = spacingMap[spacing] || 'gap-3';

  const containerClasses = cn(
    'flex',
    direction === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
    gapClass,
    className
  );

  const labelClasses = cn(
    'text-text-primary font-medium mb-2',
    required && "after:content-['*'] after:text-error after:ml-0.5",
    labelClassName
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div
        role="radiogroup"
        aria-required={required}
        aria-invalid={!!error}
        data-testid={testID}
        className="inline-flex flex-col"
      >
        {label && <span className={labelClasses}>{label}</span>}
        <div className={containerClasses}>
          {children}
        </div>
        {error && <span className="text-sm text-error mt-1">{error}</span>}
      </div>
    </RadioGroupContext.Provider>
  );
};

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
