'use client';

import { forwardRef, useCallback } from 'react';
import type { QuantitySelectorPropsBase } from '@groxigo/contracts/components';
import clsx from 'clsx';
import styles from './QuantityStepper.module.css';

export interface QuantityStepperProps extends Omit<QuantitySelectorPropsBase, 'section'> {}

const ADD_SIZE_CLASS: Record<string, string> = {
  sm: styles.addSm,
  md: styles.addMd,
  lg: styles.addLg,
};

export const QuantityStepper = forwardRef<HTMLDivElement, QuantityStepperProps>(
  (
    {
      value,
      onChange,
      min = 1,
      max,
      step = 1,
      size = 'md',
      disabled = false,
      label,
      className,
      testID,
    },
    ref
  ) => {
    const currentValue = value ?? 0;
    const isAddMode = currentValue <= 0;

    const handleAdd = useCallback(() => {
      if (disabled || !onChange) return;
      onChange(min);
    }, [disabled, onChange, min]);

    const handleDecrement = useCallback(() => {
      if (disabled || !onChange) return;
      const next = currentValue - step;
      onChange(Math.max(min, next));
    }, [disabled, onChange, currentValue, step, min]);

    const handleIncrement = useCallback(() => {
      if (disabled || !onChange) return;
      const ceiling = max ?? Infinity;
      const next = currentValue + step;
      onChange(Math.min(ceiling, next));
    }, [disabled, onChange, currentValue, step, max]);

    if (isAddMode) {
      return (
        <div
          ref={ref}
          className={clsx(styles.root, disabled && styles.disabled, className)}
          data-testid={testID}
        >
          <button
            type="button"
            className={clsx(styles.root, ADD_SIZE_CLASS[size])}
            onClick={handleAdd}
            disabled={disabled}
            aria-label={label ?? 'Add to cart'}
          >
            +
          </button>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={clsx(styles.root, styles.stepper, disabled && styles.disabled, className)}
        data-testid={testID}
        role="group"
        aria-label={label ?? 'Quantity selector'}
      >
        <button
          type="button"
          className={styles.stepperButton}
          onClick={handleDecrement}
          disabled={disabled || currentValue <= min}
          aria-label="Decrease quantity"
        >
          &minus;
        </button>

        <span className={styles.stepperCount} aria-live="polite">
          {currentValue}
        </span>

        <button
          type="button"
          className={styles.stepperButton}
          onClick={handleIncrement}
          disabled={disabled || (max != null && currentValue >= max)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    );
  }
);

QuantityStepper.displayName = 'QuantityStepper';
export default QuantityStepper;
