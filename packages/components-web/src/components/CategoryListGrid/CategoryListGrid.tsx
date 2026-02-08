'use client';

import { forwardRef } from 'react';
import type { CategoryListGridPropsBase } from '@groxigo/contracts/components/category-list-grid';
import { CategoryCard } from '../CategoryCard';
import clsx from 'clsx';
import styles from './CategoryListGrid.module.css';

export interface CategoryListGridProps extends CategoryListGridPropsBase {}

export const CategoryListGrid = forwardRef<HTMLDivElement, CategoryListGridProps>(
  (
    {
      items,
      gap = 12,
      onItemPress,
      className,
      testID,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        style={{ gap: `${gap}px` }}
        data-testid={testID}
      >
        {items.map((item) => (
          <CategoryCard
            key={item.id}
            {...item}
            onPress={onItemPress ? () => onItemPress(item.id) : item.onPress}
          />
        ))}
      </div>
    );
  }
);

CategoryListGrid.displayName = 'CategoryListGrid';
export default CategoryListGrid;
