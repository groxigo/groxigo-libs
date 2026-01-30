'use client';

/**
 * ReviewCard Component (Web)
 *
 * Displays a product review with author avatar, rating stars, review text, date, and helpful votes.
 */

import { forwardRef } from 'react';
import { Text, Avatar, cn } from '@groxigo/ui-elements-web';

export interface ReviewCardProps {
  /**
   * Reviewer name
   */
  reviewerName: string;

  /**
   * Reviewer avatar URL
   */
  reviewerAvatar?: string;

  /**
   * Rating value (0-5)
   */
  rating: number;

  /**
   * Review text
   */
  review: string;

  /**
   * Review date
   */
  date?: Date | string;

  /**
   * Whether review is verified
   * @default false
   */
  verified?: boolean;

  /**
   * Helpful votes count
   */
  helpfulCount?: number;

  /**
   * Callback when helpful button is clicked
   */
  onHelpfulClick?: () => void;

  /**
   * Whether the user has marked this review as helpful
   */
  isHelpful?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={cn('w-4 h-4', filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300')}
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const ThumbsUpIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('w-4 h-4', className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
    />
  </svg>
);

export const ReviewCard = forwardRef<HTMLDivElement, ReviewCardProps>(
  (
    {
      reviewerName,
      reviewerAvatar,
      rating,
      review,
      date,
      verified = false,
      helpfulCount,
      onHelpfulClick,
      isHelpful = false,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const formatDate = (dateValue: Date | string | undefined): string => {
      if (!dateValue) return '';
      const dateObj = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    };

    const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(rating));

    return (
      <div
        ref={ref}
        className={cn(
          'p-4 bg-white rounded-lg border border-border',
          'flex flex-col gap-3',
          className
        )}
        data-testid={testID}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <Avatar
            size="md"
            src={reviewerAvatar}
            fallback={reviewerName.charAt(0).toUpperCase()}
          />
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Text variant="body" weight="semibold">
                {reviewerName}
              </Text>
              {verified && (
                <Text variant="caption" colorScheme="success" className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Verified
                </Text>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {stars.map((filled, index) => (
                  <StarIcon key={index} filled={filled} />
                ))}
              </div>
              {date && (
                <Text variant="caption" colorScheme="muted">
                  {formatDate(date)}
                </Text>
              )}
            </div>
          </div>
        </div>

        {/* Review text */}
        <Text variant="body" colorScheme="default">
          {review}
        </Text>

        {/* Helpful section */}
        {(helpfulCount !== undefined || onHelpfulClick) && (
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            <button
              onClick={onHelpfulClick}
              className={cn(
                'flex items-center gap-1.5 text-sm',
                'transition-colors',
                isHelpful
                  ? 'text-primary-600 font-medium'
                  : 'text-text-tertiary hover:text-text-secondary'
              )}
            >
              <ThumbsUpIcon className={isHelpful ? 'text-primary-600' : undefined} />
              Helpful
              {helpfulCount !== undefined && helpfulCount > 0 && (
                <span className="text-text-tertiary">({helpfulCount})</span>
              )}
            </button>
          </div>
        )}
      </div>
    );
  }
);

ReviewCard.displayName = 'ReviewCard';

export default ReviewCard;
