'use client';

import { forwardRef, useCallback } from 'react';
import type { ProductListGridPropsBase } from '@groxigo/contracts/components/product-list-grid';
import { Grid } from '../Grid';
import { ProductTile } from '../ProductTile';

export interface ProductListGridProps extends ProductListGridPropsBase {
  className?: string;
}

export const ProductListGrid = forwardRef<HTMLDivElement, ProductListGridProps>(
  ({ items, columns, gap = 12, onItemPress, className, testID }, ref) => {
    const renderItem = useCallback(
      (item: ProductListGridProps['items'][number]) => (
        <ProductTile
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
        minItemWidthLg={160}
        columns={columns}
        gap={gap}
        className={className}
        testID={testID}
      />
    );
  }
);

ProductListGrid.displayName = 'ProductListGrid';
export default ProductListGrid;
