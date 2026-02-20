'use client';

import { forwardRef } from 'react';
import type { RatingSummaryPropsBase } from '@groxigo/contracts/components/rating-summary';
import { StarRating, Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './RatingSummary.module.css';

export interface RatingSummaryProps extends RatingSummaryPropsBase {
  className?: string;
}

const STAR_LEVELS = [5, 4, 3, 2, 1] as const;

export const RatingSummary = forwardRef<HTMLDivElement, RatingSummaryProps>(
  (
    {
      averageRating,
      totalReviews,
      distribution,
      onWriteReview,
      className,
      testID,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <div className={styles.overview}>
          <div className={styles.averageBlock}>
            <span className={styles.averageValue}>
              {averageRating.toFixed(1)}
            </span>
            <StarRating value={averageRating} size="lg" />
            <span className={styles.totalCount}>
              {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
            </span>
          </div>

          <div className={styles.bars}>
            {STAR_LEVELS.map((star) => {
              const count = distribution[star] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

              return (
                <div key={star} className={styles.barRow}>
                  <span className={styles.barLabel}>{star}</span>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className={styles.barCount}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {onWriteReview && (
          <Button
            variant="outline"
            size="md"
            onClick={onWriteReview}
            className={styles.writeButton}
          >
            Write a Review
          </Button>
        )}
      </div>
    );
  }
);

RatingSummary.displayName = 'RatingSummary';
export default RatingSummary;
