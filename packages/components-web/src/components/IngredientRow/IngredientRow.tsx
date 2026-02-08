'use client';

import { forwardRef } from 'react';
import type { IngredientRowPropsBase } from '@groxigo/contracts/components/ingredient-row';
import { Checkbox } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './IngredientRow.module.css';

export interface IngredientRowProps extends IngredientRowPropsBase {
  /** Slot for product carousel rendered below the ingredient info */
  children?: React.ReactNode;
}

export const IngredientRow = forwardRef<HTMLDivElement, IngredientRowProps>(
  ({ name, quantity, checked = false, onToggle, children, className, testID }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <div className={styles.ingredientInfo}>
          <Checkbox
            checked={checked}
            onChange={onToggle ? () => onToggle() : undefined}
            size="md"
            className={styles.checkbox}
            aria-label={`Mark ${name} as ${checked ? 'needed' : 'done'}`}
          />
          <div className={styles.content}>
            <span className={clsx(styles.name, checked && styles.nameChecked)}>
              {name}
            </span>
            <span className={clsx(styles.quantity, checked && styles.quantityChecked)}>
              {quantity}
            </span>
          </div>
        </div>

        {children && (
          <div className={styles.productCarousel}>{children}</div>
        )}
      </div>
    );
  }
);

IngredientRow.displayName = 'IngredientRow';
export default IngredientRow;
