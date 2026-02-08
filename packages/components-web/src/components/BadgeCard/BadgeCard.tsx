'use client';

import { forwardRef } from 'react';
import type {
  BadgeCardPropsBase,
  BadgeCardState,
} from '@groxigo/contracts/components/badge-card';
import { LockAlt } from '@groxigo/icons/line';
import clsx from 'clsx';
import styles from './BadgeCard.module.css';

export type { BadgeCardState };

export interface BadgeCardProps extends BadgeCardPropsBase {}

export const BadgeCard = forwardRef<HTMLDivElement, BadgeCardProps>(
  (
    {
      name,
      icon,
      state = 'earned',
      description,
      className,
      testID,
    },
    ref
  ) => {
    const isLocked = state === 'locked';

    return (
      <div
        ref={ref}
        className={clsx(
          styles.root,
          isLocked ? styles.locked : styles.earned,
          className
        )}
        data-testid={testID}
        data-state={state}
      >
        {/* Icon circle */}
        <div className={styles.iconCircle}>
          {icon ? (
            <span className={styles.icon} aria-hidden="true">
              {icon}
            </span>
          ) : (
            <span className={styles.iconPlaceholder} aria-hidden="true" />
          )}
          {isLocked && (
            <div className={styles.lockOverlay} aria-hidden="true">
              <LockAlt size={24} />
            </div>
          )}
        </div>

        {/* Badge name */}
        <span className={clsx(styles.name, isLocked && styles.nameLocked)}>
          {name}
        </span>

        {/* Description */}
        {description && (
          <span className={styles.description}>{description}</span>
        )}
      </div>
    );
  }
);

BadgeCard.displayName = 'BadgeCard';
export default BadgeCard;
