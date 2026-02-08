'use client';

import { forwardRef } from 'react';
import type { RecipeHeroPropsBase } from '@groxigo/contracts/components/recipe-hero';
import clsx from 'clsx';
import { Star } from '@groxigo/icons/line';
import styles from './RecipeHero.module.css';

export interface RecipeHeroProps extends RecipeHeroPropsBase {}

export const RecipeHero = forwardRef<HTMLDivElement, RecipeHeroProps>(
  (
    {
      title,
      imageUrl,
      cookTime,
      difficulty,
      servings,
      rating,
      className,
      testID,
    },
    ref
  ) => {
    const hasMeta = !!(cookTime || difficulty || servings || rating);

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}

        <div className={styles.gradient} />

        <div className={styles.textOverlay}>
          <h2 className={styles.title}>{title}</h2>

          {hasMeta && (
            <div className={styles.meta}>
              {cookTime && (
                <span className={styles.metaItem}>{cookTime}</span>
              )}
              {difficulty && (
                <span className={styles.metaItem}>{difficulty}</span>
              )}
              {servings != null && (
                <span className={styles.metaItem}>
                  {servings} {servings === 1 ? 'serving' : 'servings'}
                </span>
              )}
              {rating != null && (
                <span className={styles.rating}>
                  <Star size={13} />
                  <span className={styles.ratingValue}>{rating}</span>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

RecipeHero.displayName = 'RecipeHero';
export default RecipeHero;
