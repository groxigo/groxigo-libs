'use client';

import { forwardRef } from 'react';
import type { CuisineCardPropsBase } from '@groxigo/contracts/components/cuisine-card';
import clsx from 'clsx';
import styles from './CuisineCard.module.css';

export interface CuisineCardProps extends CuisineCardPropsBase {
  className?: string;
}

export const CuisineCard = forwardRef<HTMLDivElement, CuisineCardProps>(
  (
    {
      slug,
      name,
      imageUrl,
      recipeCount,
      onPress,
      className,
      testID,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
        role="button"
        tabIndex={0}
        onClick={onPress}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPress?.();
          }
        }}
        aria-label={name}
        data-slug={slug}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="" loading="lazy" className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        )}

        <div className={styles.overlay} aria-hidden="true" />

        <div className={styles.textGroup}>
          <p className={styles.name}>{name}</p>
          {recipeCount != null && (
            <span className={styles.recipeCount}>
              {recipeCount} {recipeCount === 1 ? 'recipe' : 'recipes'}
            </span>
          )}
        </div>
      </div>
    );
  }
);

CuisineCard.displayName = 'CuisineCard';
export default CuisineCard;
