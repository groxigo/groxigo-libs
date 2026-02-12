'use client';

import { forwardRef } from 'react';
import type { DietaryPreferenceChipPropsBase } from '@groxigo/contracts/components/dietary-preference-chip';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './DietaryPreferenceChip.module.css';
import { Check } from '@groxigo/icons/line';

export interface DietaryPreferenceChipProps extends DietaryPreferenceChipPropsBase {
  className?: string;
}

export const DietaryPreferenceChip = forwardRef<HTMLButtonElement, DietaryPreferenceChipProps>(
  (
    {
      label,
      icon,
      emoji,
      selected = false,
      onToggle,
      className,
      testID,
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        variant={selected ? 'solid' : 'outline'}
        colorScheme="primary"
        size="sm"
        onPress={() => onToggle?.()}
        className={clsx(
          styles.root,
          selected ? styles.selected : styles.default,
          className
        )}
        aria-pressed={selected}
        testID={testID}
      >
        {/* Emoji or icon */}
        {(emoji || icon) && (
          <span className={styles.icon} aria-hidden="true">
            {emoji ?? icon}
          </span>
        )}

        {/* Label */}
        <span
          className={clsx(
            styles.label,
            selected ? styles.labelSelected : styles.labelDefault
          )}
        >
          {label}
        </span>

        {/* Check mark when selected */}
        {selected && (
          <span className={styles.checkIcon} aria-hidden="true">
            <Check size={16} />
          </span>
        )}
      </Button>
    );
  }
);

DietaryPreferenceChip.displayName = 'DietaryPreferenceChip';
export default DietaryPreferenceChip;
