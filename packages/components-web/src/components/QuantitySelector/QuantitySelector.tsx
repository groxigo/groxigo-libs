/**
 * QuantitySelector Component (Web)
 *
 * Compact inline quantity selector with increment/decrement buttons.
 * Implements @groxigo/contracts QuantitySelectorPropsBase.
 */

'use client';

import React, { forwardRef, useState } from 'react';
import { Text, cn } from '@groxigo/ui-elements-web';
import type { QuantitySelectorPropsBase } from '@groxigo/contracts';

const sizeClasses: Record<string, { container: string; button: string; value: string; text: string }> = {
  sm: {
    container: 'h-7 rounded-md',
    button: 'w-7 h-7 text-sm',
    value: 'w-6 text-sm',
    text: 'text-sm',
  },
  md: {
    container: 'h-9 rounded-lg',
    button: 'w-9 h-9 text-base',
    value: 'w-8 text-base',
    text: 'text-base',
  },
  lg: {
    container: 'h-11 rounded-lg',
    button: 'w-11 h-11 text-lg',
    value: 'w-10 text-lg',
    text: 'text-lg',
  },
};

export interface QuantitySelectorProps extends QuantitySelectorPropsBase {}

export const QuantitySelector = forwardRef<HTMLDivElement, QuantitySelectorProps>(
  (
    {
      value = 1,
      onChange,
      min = 1,
      max,
      step = 1,
      size = 'md',
      disabled = false,
      label,
      section = 'default',
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(value);
    const currentValue = value !== undefined ? value : internalValue;
    const sizeConfig = sizeClasses[size];

    const handleDecrement = () => {
      if (disabled) return;
      const newValue = Math.max(0, currentValue - step);
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const handleIncrement = () => {
      if (disabled) return;
      const newValue = max !== undefined ? Math.min(max, currentValue + step) : currentValue + step;
      setInternalValue(newValue);
      onChange?.(newValue);
    };

    const isDecrementDisabled = disabled || currentValue <= 0;
    const isIncrementDisabled = disabled || (max !== undefined && currentValue >= max);

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        data-testid={testID}
        {...props}
      >
        {label && (
          <Text variant="bodySmall" colorScheme="muted" className="mr-2">
            {label}
          </Text>
        )}
        <div
          className={cn(
            'inline-flex items-center overflow-hidden bg-primary-500',
            sizeConfig.container,
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <button
            type="button"
            onClick={handleDecrement}
            disabled={isDecrementDisabled}
            className={cn(
              sizeConfig.button,
              'flex items-center justify-center text-white font-bold',
              'transition-opacity duration-150',
              'hover:bg-primary-600 active:bg-primary-700',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-inset',
              isDecrementDisabled && 'opacity-50 cursor-not-allowed hover:bg-primary-500'
            )}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <div
            className={cn(
              sizeConfig.value,
              'flex items-center justify-center text-white font-semibold min-w-[2rem]'
            )}
          >
            {currentValue}
          </div>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={isIncrementDisabled}
            className={cn(
              sizeConfig.button,
              'flex items-center justify-center text-white font-bold',
              'transition-opacity duration-150',
              'hover:bg-primary-600 active:bg-primary-700',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-inset',
              isIncrementDisabled && 'opacity-50 cursor-not-allowed hover:bg-primary-500'
            )}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
    );
  }
);

QuantitySelector.displayName = 'QuantitySelector';

export default QuantitySelector;
