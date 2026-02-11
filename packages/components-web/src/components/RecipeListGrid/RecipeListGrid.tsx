'use client';

import { forwardRef, useCallback } from 'react';
import type { RecipeListGridPropsBase } from '@groxigo/contracts/components/recipe-list-grid';
import { Grid } from '../Grid';
import { RecipeCard } from '../RecipeCard';

export interface RecipeListGridProps extends RecipeListGridPropsBase {}

export const RecipeListGrid = forwardRef<HTMLDivElement, RecipeListGridProps>(
  ({ items, columns, gap = 16, onItemPress, className, testID }, ref) => {
    const renderItem = useCallback(
      (item: RecipeListGridProps['items'][number]) => (
        <RecipeCard
          key={item.id}
          {...item}
          size="sm"
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
        minItemWidth={200}
        columns={columns}
        gap={gap}
        className={className}
        testID={testID}
      />
    );
  }
);

RecipeListGrid.displayName = 'RecipeListGrid';
export default RecipeListGrid;
