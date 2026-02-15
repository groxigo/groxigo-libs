'use client';

import { forwardRef, type ReactNode } from 'react';
import type { CategoryChipPropsBase } from '@groxigo/contracts/components/category-chip';
import clsx from 'clsx';
import styles from './CategoryChip.module.css';

export interface CategoryChipProps extends CategoryChipPropsBase {
  className?: string;
  /** Icon rendered as a ReactNode (overrides icon name hint) */
  iconNode?: ReactNode;
  /** Thumbnail image URL (overrides imageUrl from contract for web-specific rendering) */
  imageUrl?: string;
}

export const CategoryChip = forwardRef<HTMLButtonElement, CategoryChipProps>(
  (
    {
      label,
      icon,
      iconNode,
      imageUrl,
      selected = false,
      onPress,
      className,
      testID,
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onPress}
        className={clsx(
          styles.root,
          selected ? styles.selected : styles.default,
          imageUrl && styles.withImage,
          className
        )}
        aria-pressed={selected}
        data-testid={testID}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className={styles.thumbnail}
            loading="lazy"
          />
        ) : iconNode ? (
          <span className={styles.icon} aria-hidden="true">
            {iconNode}
          </span>
        ) : null}
        <span
          className={clsx(
            styles.label,
            selected ? styles.labelSelected : styles.labelDefault
          )}
        >
          {label}
        </span>
      </button>
    );
  }
);

CategoryChip.displayName = 'CategoryChip';
export default CategoryChip;
