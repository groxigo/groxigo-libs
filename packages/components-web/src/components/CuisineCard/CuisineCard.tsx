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
      size = 'md',
      onPress,
      className,
      testID,
    },
    ref
  ) => {
    const isSm = size === 'sm';

    return (
      <div
        ref={ref}
        className={clsx(
          styles.root,
          isSm ? styles.rootSm : styles.rootMd,
          className
        )}
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
        {/* Background image or placeholder */}
        {imageUrl ? (
          <img src={imageUrl} alt="" className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        )}

        {/* Dark overlay */}
        <div className={styles.overlay} aria-hidden="true" />

        {/* Centered text */}
        <div className={styles.textGroup}>
          <p className={clsx(styles.name, isSm ? styles.nameSm : styles.nameMd)}>
            {name}
          </p>
          {!isSm && recipeCount != null && (
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
