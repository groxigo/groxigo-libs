'use client';

import { forwardRef } from 'react';
import type { RecipeListGridPropsBase } from '@groxigo/contracts/components/recipe-list-grid';
import { RecipeCard } from '../RecipeCard';
import clsx from 'clsx';
import styles from './RecipeListGrid.module.css';

export interface RecipeListGridProps extends RecipeListGridPropsBase {}

export const RecipeListGrid = forwardRef<HTMLDivElement, RecipeListGridProps>(
  (
    {
      items,
      columns,
      gap = 16,
      onItemPress,
      className,
      testID,
    },
    ref
  ) => {
    const gridStyle: React.CSSProperties = {
      gap: `${gap}px`,
      ...(columns
        ? { gridTemplateColumns: `repeat(${columns}, 1fr)` }
        : {}),
    };

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        style={gridStyle}
        data-testid={testID}
      >
        {items.map((item) => (
          <RecipeCard
            key={item.id}
            {...item}
            size="sm"
            onPress={onItemPress ? () => onItemPress(item.id) : item.onPress}
          />
        ))}
      </div>
    );
  }
);

RecipeListGrid.displayName = 'RecipeListGrid';
export default RecipeListGrid;
