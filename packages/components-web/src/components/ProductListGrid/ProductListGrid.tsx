'use client';

import { forwardRef } from 'react';
import type { ProductListGridPropsBase } from '@groxigo/contracts/components/product-list-grid';
import { ProductTile } from '../ProductTile';
import clsx from 'clsx';
import styles from './ProductListGrid.module.css';

export interface ProductListGridProps extends ProductListGridPropsBase {}

export const ProductListGrid = forwardRef<HTMLDivElement, ProductListGridProps>(
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
          <ProductTile
            key={item.id}
            {...item}
            onPress={onItemPress ? () => onItemPress(item.id) : item.onPress}
          />
        ))}
      </div>
    );
  }
);

ProductListGrid.displayName = 'ProductListGrid';
export default ProductListGrid;
