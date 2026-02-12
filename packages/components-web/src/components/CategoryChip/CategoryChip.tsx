'use client';

import { forwardRef, type ReactNode } from 'react';
import type { CategoryChipPropsBase } from '@groxigo/contracts/components/category-chip';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './CategoryChip.module.css';

export interface CategoryChipProps extends CategoryChipPropsBase {
  className?: string;
  /** Icon rendered as a ReactNode (overrides icon name hint) */
  iconNode?: ReactNode;
}

export const CategoryChip = forwardRef<HTMLButtonElement, CategoryChipProps>(
  (
    {
      label,
      icon,
      iconNode,
      selected = false,
      onPress,
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
        onPress={onPress}
        className={clsx(
          styles.root,
          selected ? styles.selected : styles.default,
          className
        )}
        aria-pressed={selected}
        testID={testID}
      >
        {iconNode && (
          <span className={styles.icon} aria-hidden="true">
            {iconNode}
          </span>
        )}
        <span
          className={clsx(
            styles.label,
            selected ? styles.labelSelected : styles.labelDefault
          )}
        >
          {label}
        </span>
      </Button>
    );
  }
);

CategoryChip.displayName = 'CategoryChip';
export default CategoryChip;
