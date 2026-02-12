'use client';

import { forwardRef } from 'react';
import type { RecipeTagChipPropsBase } from '@groxigo/contracts/components/recipe-tag-chip';
import { Badge } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './RecipeTagChip.module.css';

export interface RecipeTagChipProps extends RecipeTagChipPropsBase {
  className?: string;
}

export const RecipeTagChip = forwardRef<HTMLSpanElement, RecipeTagChipProps>(
  ({ label, colorScheme = 'neutral', onPress, className, testID }, ref) => {
    const isClickable = !!onPress;

    return (
      <span
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={onPress}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPress?.();
                }
              }
            : undefined
        }
      >
        <Badge variant="subtle" colorScheme={colorScheme as 'success' | 'warning' | 'info' | 'neutral'} size="sm">
          {label}
        </Badge>
      </span>
    );
  }
);

RecipeTagChip.displayName = 'RecipeTagChip';
export default RecipeTagChip;
