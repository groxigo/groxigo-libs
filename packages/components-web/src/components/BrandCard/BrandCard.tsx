'use client';

import { forwardRef } from 'react';
import type { BrandCardPropsBase } from '@groxigo/contracts/components/brand-card';
import clsx from 'clsx';
import styles from './BrandCard.module.css';

export interface BrandCardProps extends BrandCardPropsBase {
  className?: string;
}

export const BrandCard = forwardRef<HTMLDivElement, BrandCardProps>(
  ({ name, logoUrl, onPress, className, testID }, ref) => {
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
      >
        <div className={styles.logoFrame}>
          {logoUrl ? (
            <img
              className={styles.logo}
              src={logoUrl}
              alt={`${name} logo`}
            />
          ) : (
            <div className={styles.logoPlaceholder} aria-hidden="true" />
          )}
        </div>

        <span className={styles.name} title={name}>
          {name}
        </span>
      </div>
    );
  }
);

BrandCard.displayName = 'BrandCard';
export default BrandCard;
