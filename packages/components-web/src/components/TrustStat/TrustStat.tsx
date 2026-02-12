'use client';

import { forwardRef } from 'react';
import type { TrustStatPropsBase } from '@groxigo/contracts/components';
import clsx from 'clsx';
import styles from './TrustStat.module.css';

export interface TrustStatProps extends TrustStatPropsBase {
  className?: string;
}

/**
 * TrustStat — horizontal icon + label stat.
 *
 * Used in trust bar sections to display delivery speed,
 * satisfaction rating, and other trust signals.
 */
export const TrustStat = forwardRef<HTMLDivElement, TrustStatProps>(
  ({ icon, label, className, testID }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <div className={styles.iconContainer} aria-hidden="true">
          {icon}
        </div>
        <span className={styles.label}>{label}</span>
      </div>
    );
  }
);

TrustStat.displayName = 'TrustStat';
export default TrustStat;
