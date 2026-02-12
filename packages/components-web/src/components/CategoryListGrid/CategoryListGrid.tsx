'use client';

import { forwardRef, useCallback } from 'react';
import type { CategoryListGridPropsBase } from '@groxigo/contracts/components/category-list-grid';
import { Grid } from '../Grid';
import { CategoryCard } from '../CategoryCard';

export interface CategoryListGridProps extends CategoryListGridPropsBase {
  className?: string;
}

export const CategoryListGrid = forwardRef<HTMLDivElement, CategoryListGridProps>(
  ({ items, gap = 12, onItemPress, className, testID }, ref) => {
    const renderItem = useCallback(
      (item: CategoryListGridProps['items'][number]) => (
        <CategoryCard
          key={item.id}
          {...item}
          onPress={onItemPress ? () => onItemPress(item.id) : item.onPress}
        />
      ),
      [onItemPress]
    );

    return (
      <Grid
        ref={ref}
        items={items}
        renderItem={renderItem}
        minItemWidth={110}
        gap={gap}
        className={className}
        testID={testID}
      />
    );
  }
);

CategoryListGrid.displayName = 'CategoryListGrid';
export default CategoryListGrid;
