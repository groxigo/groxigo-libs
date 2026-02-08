'use client';

import { forwardRef } from 'react';
import type {
  PolicyCardPropsBase,
  PolicyCardVariant,
} from '@groxigo/contracts/components/policy-card';
import { InfoCircle, ExclamationTriangle } from '@groxigo/icons/line';
import clsx from 'clsx';
import styles from './PolicyCard.module.css';

export type { PolicyCardVariant };

export interface PolicyCardProps extends PolicyCardPropsBase {}

export const PolicyCard = forwardRef<HTMLDivElement, PolicyCardProps>(
  ({ variant = 'info', message, title, className, testID }, ref) => {
    const isWarning = variant === 'warning';

    return (
      <div
        ref={ref}
        className={clsx(
          styles.root,
          isWarning ? styles.warning : styles.info,
          className
        )}
        data-testid={testID}
        data-variant={variant}
        role="status"
      >
        {/* Icon */}
        <div className={styles.iconWrapper}>
          {isWarning ? <ExclamationTriangle size={18} /> : <InfoCircle size={18} />}
        </div>

        {/* Text content */}
        <div className={styles.textContent}>
          {title && <span className={styles.title}>{title}</span>}
          <span className={styles.message}>{message}</span>
        </div>
      </div>
    );
  }
);

PolicyCard.displayName = 'PolicyCard';
export default PolicyCard;
