'use client';

import { forwardRef } from 'react';
import type { LandingCuisineCardPropsBase } from '@groxigo/contracts/components';
import clsx from 'clsx';
import styles from './LandingCuisineCard.module.css';

export interface LandingCuisineCardProps extends LandingCuisineCardPropsBase {}

/**
 * LandingCuisineCard — square image card with centered label below.
 *
 * Used in the "Explore by Cuisine" section on the landing page.
 */
export const LandingCuisineCard = forwardRef<HTMLDivElement, LandingCuisineCardProps>(
  ({ name, imageUrl, href, onClick, className, testID }, ref) => {
    const handleClick = () => {
      onClick?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick?.();
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
        <span className={styles.name}>{name}</span>
      </>
    );

    if (href && !onClick) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
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
