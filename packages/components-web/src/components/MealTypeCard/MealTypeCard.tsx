'use client';

import { forwardRef } from 'react';
import type { MealTypeCardPropsBase } from '@groxigo/contracts/components/meal-type-card';
import clsx from 'clsx';
import styles from './MealTypeCard.module.css';

export interface MealTypeCardProps extends MealTypeCardPropsBase {
  className?: string;
}

export const MealTypeCard = forwardRef<HTMLButtonElement, MealTypeCardProps>(
  ({ label, icon, emoji, selected = false, onPress, className, testID }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onPress}
        aria-pressed={selected}
        className={clsx(
          styles.root,
          selected ? styles.selected : styles.default,
          className
        )}
        data-testid={testID}
      >
        <span className={styles.emojiWrap} aria-hidden="true">
          {emoji || icon || null}
        </span>
        <span className={styles.label}>{label}</span>
      </button>
    );
  }
);

MealTypeCard.displayName = 'MealTypeCard';
export default MealTypeCard;
