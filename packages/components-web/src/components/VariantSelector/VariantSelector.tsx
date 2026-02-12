'use client';

import { forwardRef, useCallback } from 'react';
import type { VariantSelectorPropsBase } from '@groxigo/contracts/components';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './VariantSelector.module.css';

export type { VariantOption } from '@groxigo/contracts/components';

export interface VariantSelectorProps extends VariantSelectorPropsBase {
  className?: string;
}

export const VariantSelector = forwardRef<HTMLDivElement, VariantSelectorProps>(
  ({ options, selectedValue, label, onSelect, className, testID }, ref) => {
    const handleSelect = useCallback(
      (value: string) => {
        onSelect?.(value);
      },
      [onSelect]
    );

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        {label && (
          <p className={styles.label}>{label}</p>
        )}

        <div role="radiogroup" className={styles.options}>
          {options.map((option) => {
            const isSelected = option.value === selectedValue;
            const isDisabled = option.disabled === true;

            return (
              <Button
                key={option.value}
                variant={isSelected ? 'solid' : 'outline'}
                colorScheme="primary"
                disabled={isDisabled}
                onPress={() => handleSelect(option.value)}
                aria-checked={isSelected}
                className={clsx(
                  styles.option,
                  isSelected ? styles.optionSelected : styles.optionDefault,
                  isDisabled && styles.optionDisabled
                )}
              >
                <span
                  className={clsx(
                    styles.optionLabel,
                    isDisabled
                      ? styles.optionLabelDisabled
                      : isSelected
                        ? styles.optionLabelSelected
                        : styles.optionLabelDefault
                  )}
                >
                  {option.label}
                </span>
                {option.price && (
                  <span
                    className={clsx(
                      styles.optionPrice,
                      isDisabled
                        ? styles.optionPriceDisabled
                        : isSelected
                          ? styles.optionPriceSelected
                          : styles.optionPriceDefault
                    )}
                  >
                    {option.price}
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    );
  }
);

VariantSelector.displayName = 'VariantSelector';
export default VariantSelector;
