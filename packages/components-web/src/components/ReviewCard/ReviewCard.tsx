'use client';

import { forwardRef } from 'react';
import type { ReviewCardPropsBase } from '@groxigo/contracts/components/review-card';
import { Avatar, StarRating, Badge, Button } from '@groxigo/ui-elements-web';
import { Check, ThumbsUp, Edit, Trash } from '@groxigo/icons/line';
import clsx from 'clsx';
import styles from './ReviewCard.module.css';

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
      title,
      reviewText,
      isVerifiedPurchase,
      helpfulCount,
      onHelpful,
      imageUrls,
      isOwnReview,
      onEdit,
      onDelete,
      className,
      testID,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, isOwnReview && styles.ownReview, className)}
        data-testid={testID}
      >
        <div className={styles.header}>
          <Avatar
            src={avatarUrl}
            name={name}
            size="sm"
          />
          <div className={styles.headerInfo}>
            <span className={styles.name}>
              {name}
              {isOwnReview && <span className={styles.youBadge}>You</span>}
            </span>
            <span className={styles.date}>{date}</span>
          </div>
          {isOwnReview && (onEdit || onDelete) && (
            <div className={styles.ownerActions}>
              {onEdit && (
                <button type="button" className={styles.ownerAction} onClick={onEdit} aria-label="Edit review">
                  <Edit size={14} />
                </button>
              )}
              {onDelete && (
                <button type="button" className={clsx(styles.ownerAction, styles.deleteAction)} onClick={onDelete} aria-label="Delete review">
                  <Trash size={14} />
                </button>
              )}
            </div>
          )}
        </div>

        <div className={styles.ratingRow}>
          <StarRating value={rating} size="sm" />
          {isVerifiedPurchase && (
            <Badge variant="subtle" size="xs" colorScheme="success">
              <span className={styles.verifiedBadge}>
                <Check size={12} />
                Verified Purchase
              </span>
            </Badge>
          )}
        </div>

        {title && <p className={styles.title}>{title}</p>}

        <p className={styles.text}>{reviewText}</p>

        {imageUrls && imageUrls.length > 0 && (
          <div className={styles.images}>
            {imageUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Review photo ${i + 1}`}
                className={styles.thumbnail}
                loading="lazy"
              />
            ))}
          </div>
        )}

        {(helpfulCount !== undefined || onHelpful) && (
          <div className={styles.helpfulRow}>
            {helpfulCount !== undefined && helpfulCount > 0 && (
              <span className={styles.helpfulCount}>
                {helpfulCount} {helpfulCount === 1 ? 'person' : 'people'} found this helpful
              </span>
            )}
            {onHelpful && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onHelpful}
                className={styles.helpfulButton}
              >
                <ThumbsUp size={14} />
                Helpful
              </Button>
            )}
          </div>
        )}
      </div>
    );
  }
);

ReviewCard.displayName = 'ReviewCard';
export default ReviewCard;
