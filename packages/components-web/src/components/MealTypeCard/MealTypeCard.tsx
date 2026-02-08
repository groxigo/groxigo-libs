'use client';

import { forwardRef } from 'react';
import type { MealTypeCardPropsBase } from '@groxigo/contracts/components/meal-type-card';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './MealTypeCard.module.css';

export interface MealTypeCardProps extends MealTypeCardPropsBase {}

export const MealTypeCard = forwardRef<HTMLButtonElement, MealTypeCardProps>(
  ({ label, icon, emoji, selected = false, onPress, className, testID }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        onPress={onPress}
        aria-pressed={selected}
        className={clsx(styles.root, className)}
        testID={testID}
      >
        <span
          className={clsx(
            styles.iconCircle,
            selected && styles.iconCircleSelected
          )}
          aria-hidden="true"
        >
          {emoji ? (
            <span className={styles.emoji}>{emoji}</span>
          ) : icon ? (
            <span className={styles.emoji}>{icon}</span>
          ) : null}
        </span>

        <span className={styles.label}>{label}</span>
      </Button>
    );
  }
);

MealTypeCard.displayName = 'MealTypeCard';
export default MealTypeCard;
