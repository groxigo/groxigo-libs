'use client';

import { forwardRef } from 'react';
import type { PointsCardPropsBase } from '@groxigo/contracts/components/points-card';
import { Button, Progress } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './PointsCard.module.css';

export interface PointsCardProps extends PointsCardPropsBase {}

export const PointsCard = forwardRef<HTMLDivElement, PointsCardProps>(
  (
    {
      points,
      tier,
      nextTier,
      pointsToNextTier,
      progressPercent = 0,
      onRedeem,
      onViewHistory,
      className,
      testID,
    },
    ref
  ) => {
    const formattedPoints = points.toLocaleString();

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        {/* Top row: label + tier */}
        <div className={styles.topRow}>
          <span className={styles.label}>My Points</span>
          {tier && <span className={styles.tier}>{tier}</span>}
        </div>

        {/* Points display */}
        <div className={styles.pointsDisplay}>
          <span className={styles.pointsValue}>{formattedPoints}</span>
          <span className={styles.pointsUnit}>points</span>
        </div>

        {/* Progress toward next tier */}
        {nextTier && (
          <div className={styles.progressSection}>
            <Progress
              value={progressPercent}
              size="sm"
              colorScheme="primary"
              className={styles.progressBar}
            />
            <span className={styles.progressLabel}>
              {pointsToNextTier != null
                ? `${pointsToNextTier.toLocaleString()} points to ${nextTier}`
                : `Progress to ${nextTier}`}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className={styles.actions}>
          {onRedeem && (
            <Button
              variant="solid"
              colorScheme="primary"
              size="md"
              fullWidth
              onPress={onRedeem}
              testID={testID ? `${testID}-redeem` : undefined}
            >
              Redeem
            </Button>
          )}
          {onViewHistory && (
            <button
              type="button"
              className={styles.historyLink}
              onClick={onViewHistory}
            >
              View History
            </button>
          )}
        </div>
      </div>
    );
  }
);

PointsCard.displayName = 'PointsCard';
export default PointsCard;
