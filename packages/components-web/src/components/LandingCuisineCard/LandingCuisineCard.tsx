'use client';

import { forwardRef, type KeyboardEvent, type Ref } from 'react';
import type { LandingCuisineCardPropsBase } from '@groxigo/contracts/components';
import clsx from 'clsx';
import styles from './LandingCuisineCard.module.css';

export interface LandingCuisineCardProps extends LandingCuisineCardPropsBase {
  className?: string;
}

/**
 * LandingCuisineCard — square image card with centered label below.
 *
 * Used in the "Explore by Cuisine" section on the landing page.
 */
export const LandingCuisineCard = forwardRef<HTMLDivElement, LandingCuisineCardProps>(
  ({ name, imageUrl, recipeCount, href, onPress, className, testID }, ref) => {
    const handleClick = () => {
      onPress?.();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onPress?.();
      }
    };

    const content = (
      <>
        <div className={styles.imageFrame}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className={styles.image}
              loading="lazy"
            />
          ) : (
            <div className={styles.imagePlaceholder} aria-hidden="true" />
          )}
        </div>
        <div className={styles.textGroup}>
          <span className={styles.name}>{name}</span>
          {recipeCount != null && (
            <span className={styles.recipeCount}>
              {recipeCount} {recipeCount === 1 ? 'recipe' : 'recipes'}
            </span>
          )}
        </div>
      </>
    );

    if (href && !onPress) {
      return (
        <a
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          ref={ref as any}
          href={href}
          className={clsx(styles.root, className)}
          data-testid={testID}
        >
          {content}
        </a>
      );
    }

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label={name}
      >
        {content}
      </div>
    );
  }
);

LandingCuisineCard.displayName = 'LandingCuisineCard';
export default LandingCuisineCard;
