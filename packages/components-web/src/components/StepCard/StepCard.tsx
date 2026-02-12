'use client';

import { forwardRef } from 'react';
import type { StepCardPropsBase } from '@groxigo/contracts/components';
import clsx from 'clsx';
import styles from './StepCard.module.css';

export interface StepCardProps extends StepCardPropsBase {
  className?: string;
}

/**
 * StepCard — vertical card showing an icon in a circle, title, and description.
 *
 * Used in the "How It Works" section on the landing page.
 */
export const StepCard = forwardRef<HTMLDivElement, StepCardProps>(
  ({ icon, title, description, stepNumber, className, testID }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <div className={styles.iconContainer} aria-hidden="true">
          {stepNumber !== undefined ? (
            <span className={styles.stepNumber}>{stepNumber}</span>
          ) : (
            icon
          )}
        </div>
        <span className={styles.title}>{title}</span>
        <p className={styles.description}>{description}</p>
      </div>
    );
  }
);

StepCard.displayName = 'StepCard';
export default StepCard;
