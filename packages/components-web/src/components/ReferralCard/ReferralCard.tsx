'use client';

import { forwardRef } from 'react';
import type { ReferralCardPropsBase } from '@groxigo/contracts/components/referral-card';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './ReferralCard.module.css';

export interface ReferralCardProps extends ReferralCardPropsBase {}

export const ReferralCard = forwardRef<HTMLDivElement, ReferralCardProps>(
  (
    {
      title = 'Invite Friends & Earn',
      subtitle,
      referralCode,
      invitedCount,
      earnedAmount,
      onShare,
      onCopyCode,
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
        {/* Title */}
        <h3 className={styles.title}>{title}</h3>

        {/* Subtitle */}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {/* Referral code box */}
        <div className={styles.codeBox}>
          <span className={styles.code}>{referralCode}</span>
          {onCopyCode && (
            <Button
              variant="ghost"
              size="sm"
              onPress={onCopyCode}
              className={styles.copyButton}
              aria-label={`Copy referral code ${referralCode}`}
            >
              Copy
            </Button>
          )}
        </div>

        {/* Stats row */}
        {(invitedCount != null || earnedAmount) && (
          <div className={styles.statsRow}>
            {invitedCount != null && (
              <div className={styles.statItem}>
                <span className={styles.statValue}>{invitedCount}</span>
                <span className={styles.statLabel}>Invited</span>
              </div>
            )}
            {earnedAmount && (
              <div className={styles.statItem}>
                <span className={clsx(styles.statValue, styles.statEarned)}>
                  {earnedAmount}
                </span>
                <span className={styles.statLabel}>Earned</span>
              </div>
            )}
          </div>
        )}

        {/* Share button */}
        {onShare && (
          <Button
            variant="outline"
            colorScheme="primary"
            size="md"
            fullWidth
            onPress={onShare}
            testID={testID ? `${testID}-share` : undefined}
          >
            Share Invite Link
          </Button>
        )}
      </div>
    );
  }
);

ReferralCard.displayName = 'ReferralCard';
export default ReferralCard;
