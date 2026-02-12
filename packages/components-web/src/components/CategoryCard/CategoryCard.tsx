'use client';

import { forwardRef } from 'react';
import type { CategoryCardPropsBase } from '@groxigo/contracts/components/category-card';
import { Badge } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './CategoryCard.module.css';

export interface CategoryCardProps extends CategoryCardPropsBase {
  className?: string;
}

export const CategoryCard = forwardRef<HTMLDivElement, CategoryCardProps>(
  (
    {
      id,
      name,
      imageUrl,
      icon,
      productCount,
      size = 'md',
      variant = 'default',
      backgroundColor,
      onPress,
      className,
      testID,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, styles[size], styles[variant], className)}
        style={backgroundColor ? { backgroundColor } : undefined}
        data-testid={testID}
        role={onPress ? 'button' : undefined}
        tabIndex={onPress ? 0 : undefined}
        onClick={onPress}
        onKeyDown={
          onPress
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPress();
                }
              }
            : undefined
        }
      >
        {imageUrl ? (
          <div className={styles.imageWrapper}>
            <img
              src={imageUrl}
              alt={name}
              className={styles.image}
              loading="lazy"
            />
          </div>
        ) : icon ? (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true" />
        )}

        <span className={styles.name}>{name}</span>

        {productCount !== undefined && (
          <Badge
            variant="subtle"
            colorScheme="neutral"
            size="xs"
            className={styles.count}
          >
            {productCount} items
          </Badge>
        )}
      </div>
    );
  }
);

CategoryCard.displayName = 'CategoryCard';
export default CategoryCard;
