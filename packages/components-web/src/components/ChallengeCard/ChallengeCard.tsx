'use client';

import { forwardRef, useMemo } from 'react';
import type { ChallengeCardPropsBase } from '@groxigo/contracts/components/challenge-card';
import { Progress } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './ChallengeCard.module.css';

export interface ChallengeCardProps extends ChallengeCardPropsBase {}

export const ChallengeCard = forwardRef<HTMLDivElement, ChallengeCardProps>(
  (
    {
      title,
      description,
      progress,
      total,
      reward,
      deadline,
      className,
      testID,
    },
    ref
  ) => {
    const percent = useMemo(() => {
      if (total <= 0) return 0;
      return Math.min(100, Math.round((progress / total) * 100));
    }, [progress, total]);

    const isComplete = progress >= total;

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        {/* Content section */}
        <div className={styles.content}>
          {/* Title row with reward badge */}
          <div className={styles.titleRow}>
            <span className={styles.title}>{title}</span>
            {reward && (
              <span className={styles.reward}>{reward}</span>
            )}
          </div>

          {/* Description */}
          {description && (
            <p className={styles.description}>{description}</p>
          )}

          {/* Progress bar */}
          <Progress
            value={percent}
            size="sm"
            colorScheme={isComplete ? 'success' : 'primary'}
            aria-label={`${progress} of ${total} completed`}
          />

          {/* Meta row: progress text + deadline */}
          <div className={styles.metaRow}>
            <span className={styles.progressText}>
              {progress} of {total} completed
            </span>
            {deadline && (
              <span className={styles.deadline}>{deadline}</span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ChallengeCard.displayName = 'ChallengeCard';
export default ChallengeCard;
