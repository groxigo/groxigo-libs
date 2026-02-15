'use client';

import { forwardRef, useCallback } from 'react';
import type { StarRatingPropsBase } from '@groxigo/contracts/elements/star-rating';
import clsx from 'clsx';
import styles from './StarRating.module.css';

export interface StarRatingProps extends StarRatingPropsBase {
  className?: string;
}

const STAR_SIZES: Record<string, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
};

const FILLED_COLOR = 'var(--status-warning, #eab308)';
const EMPTY_COLOR = 'var(--border-default, #cbd5e1)';

function StarIcon({
  size,
  fill,
  className,
  onClick,
}: {
  size: number;
  fill: 'full' | 'half' | 'empty';
  className?: string;
  onClick?: () => void;
}) {
  const id = `half-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      {fill === 'half' && (
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor={FILLED_COLOR} />
            <stop offset="50%" stopColor={EMPTY_COLOR} />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={
          fill === 'full'
            ? FILLED_COLOR
            : fill === 'empty'
              ? EMPTY_COLOR
              : `url(#${id})`
        }
      />
    </svg>
  );
}

const SIZE_CLASS: Record<string, string> = {
  xs: styles.sizeXs,
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

export const StarRating = forwardRef<HTMLDivElement, StarRatingProps>(
  (
    {
      value,
      max = 5,
      editable = false,
      onChange,
      size = 'md',
      showValue = false,
      reviewCount,
      className,
      testID,
    },
    ref
  ) => {
    const starSize = STAR_SIZES[size] ?? STAR_SIZES.md;

    const handleClick = useCallback(
      (starIndex: number) => {
        if (editable && onChange) {
          onChange(starIndex + 1);
        }
      },
      [editable, onChange]
    );

    const stars = Array.from({ length: max }, (_, i) => {
      const diff = value - i;
      let fill: 'full' | 'half' | 'empty';
      if (diff >= 1) {
        fill = 'full';
      } else if (diff >= 0.25) {
        fill = 'half';
      } else {
        fill = 'empty';
      }
      return (
        <StarIcon
          key={i}
          size={starSize}
          fill={fill}
          className={clsx(styles.star, editable && styles.starEditable)}
          onClick={editable ? () => handleClick(i) : undefined}
        />
      );
    });

    return (
      <div
        ref={ref}
        className={clsx(styles.root, SIZE_CLASS[size], className)}
        data-testid={testID}
        role={editable ? 'radiogroup' : undefined}
        aria-label={`Rating: ${value} out of ${max}`}
      >
        <div className={styles.stars}>{stars}</div>
        {showValue && <span className={styles.value}>{value.toFixed(1)}</span>}
        {reviewCount != null && (
          <span className={styles.count}>({reviewCount})</span>
        )}
      </div>
    );
  }
);

StarRating.displayName = 'StarRating';
export default StarRating;
