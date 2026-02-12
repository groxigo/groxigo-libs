'use client';

import { forwardRef } from 'react';
import type { PillarCardPropsBase } from '@groxigo/contracts/components';
import clsx from 'clsx';
import styles from './PillarCard.module.css';

export interface PillarCardProps extends PillarCardPropsBase {
  className?: string;
}

/**
 * PillarCard — vertical card with 16:9 image, title, description, and CTA link.
 *
 * Used in the "Why Groxigo" pillars section on the landing page.
 */
export const PillarCard = forwardRef<HTMLDivElement, PillarCardProps>(
  ({ title, description, ctaLabel, ctaHref, imageUrl, onPress, className, testID }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <div className={styles.imageArea}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className={styles.image}
              loading="lazy"
            />
          ) : (
            <div className={styles.imagePlaceholder} aria-hidden="true" />
          )}
        </div>

        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <a
            href={ctaHref}
            className={styles.cta}
            onClick={
              onPress
                ? (e) => {
                    e.preventDefault();
                    onPress();
                  }
                : undefined
            }
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    );
  }
);

PillarCard.displayName = 'PillarCard';
export default PillarCard;
