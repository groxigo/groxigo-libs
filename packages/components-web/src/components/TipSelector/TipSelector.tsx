'use client';

import { forwardRef, useCallback, useState } from 'react';
import type { TipSelectorPropsBase } from '@groxigo/contracts/components/tip-selector';
import { Input } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './TipSelector.module.css';

const DEFAULT_AMOUNTS = [1, 2, 3, 5, 10];

export interface TipSelectorProps extends TipSelectorPropsBase {}

export const TipSelector = forwardRef<HTMLDivElement, TipSelectorProps>(
  (
    {
      amounts = DEFAULT_AMOUNTS,
      selectedAmount,
      customAmount,
      onSelect,
      onCustomChange,
      showCustom = false,
      className,
      testID,
    },
    ref
  ) => {
    const [isCustomActive, setIsCustomActive] = useState(false);

    const handlePresetClick = useCallback(
      (amount: number) => {
        setIsCustomActive(false);
        onSelect?.(amount);
      },
      [onSelect]
    );

    const handleCustomClick = useCallback(() => {
      setIsCustomActive(true);
      /* Clear preset selection — pass 0 or let consumer handle */
      onSelect?.(0);
    }, [onSelect]);

    const handleCustomInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) {
          onCustomChange?.(val);
        } else if (e.target.value === '') {
          onCustomChange?.(0);
        }
      },
      [onCustomChange]
    );

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        {/* ── Title ── */}
        <span className={styles.title}>Add a tip</span>

        {/* ── Tip buttons row ── */}
        <div className={styles.buttonRow}>
          {amounts.map((amount) => {
            const isSelected = !isCustomActive && selectedAmount === amount;
            return (
              <button
                key={amount}
                type="button"
                className={clsx(
                  styles.pill,
                  isSelected && styles.pillSelected
                )}
                onClick={() => handlePresetClick(amount)}
                aria-pressed={isSelected}
                aria-label={`Tip $${amount}`}
              >
                ${amount}
              </button>
            );
          })}

          {/* Custom button / input */}
          {showCustom && !isCustomActive && (
            <button
              type="button"
              className={styles.pill}
              onClick={handleCustomClick}
              aria-label="Enter custom tip"
            >
              Custom
            </button>
          )}

          {showCustom && isCustomActive && (
            <div className={styles.customInputWrapper}>
              <Input
                type="number"
                value={customAmount != null ? String(customAmount) : ''}
                onChange={handleCustomInput}
                placeholder="$0"
                aria-label="Custom tip amount"
                className={styles.customInput}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

TipSelector.displayName = 'TipSelector';
export default TipSelector;
