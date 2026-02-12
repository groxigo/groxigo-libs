'use client';

import { forwardRef } from 'react';
import type { ReviewCardPropsBase } from '@groxigo/contracts/components/review-card';
import { Avatar } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './ReviewCard.module.css';
import { Star } from '@groxigo/icons/line';

export interface ReviewCardProps extends ReviewCardPropsBase {
  className?: string;
}

export const ReviewCard = forwardRef<HTMLDivElement, ReviewCardProps>(
  (
    {
      avatarUrl,
      name,
      date,
      rating,
      reviewText,
      className,
      testID,
    },
    ref
  ) => {
    const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <div className={styles.header}>
          <Avatar
            src={avatarUrl}
            name={name}
            size="sm"
          />
          <div className={styles.headerInfo}>
            <span className={styles.name}>{name}</span>
            <span className={styles.date}>{date}</span>
          </div>
        </div>

        <div className={styles.stars} role="img" aria-label={`${rating} out of 5 stars`}>
          {stars.map((filled, i) => (
            <Star key={i} size={16} color={filled ? 'currentColor' : 'none'} />
          ))}
        </div>

        <p className={styles.text}>{reviewText}</p>
      </div>
    );
  }
);

ReviewCard.displayName = 'ReviewCard';
export default ReviewCard;
