'use client';

import { forwardRef, useCallback } from 'react';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './VariantSelector.module.css';

export interface VariantOption {
  label: string;
  price?: string;
  value: string;
}

export interface VariantSelectorProps {
  options: VariantOption[];
  selectedValue?: string;
  onSelect?: (value: string) => void;
  className?: string;
  testID?: string;
}

export const VariantSelector = forwardRef<HTMLDivElement, VariantSelectorProps>(
  ({ options, selectedValue, onSelect, className, testID }, ref) => {
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
        role="radiogroup"
        data-testid={testID}
      >
        {options.map((option) => {
          const isSelected = option.value === selectedValue;

          return (
            <Button
              key={option.value}
              variant={isSelected ? 'solid' : 'outline'}
              colorScheme="primary"
              size="sm"
              onPress={() => handleSelect(option.value)}
              aria-checked={isSelected}
              className={clsx(
                styles.option,
                isSelected ? styles.optionSelected : styles.optionDefault
              )}
            >
              <span
                className={clsx(
                  styles.optionLabel,
                  isSelected ? styles.optionLabelSelected : styles.optionLabelDefault
                )}
              >
                {option.label}
              </span>
              {option.price && (
                <span
                  className={clsx(
                    styles.optionPrice,
                    isSelected ? styles.optionPriceSelected : styles.optionPriceDefault
                  )}
                >
                  {option.price}
                </span>
              )}
            </Button>
          );
        })}
      </div>
    );
  }
);

VariantSelector.displayName = 'VariantSelector';
export default VariantSelector;
