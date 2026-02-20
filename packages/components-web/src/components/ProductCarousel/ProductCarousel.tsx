'use client';

import { forwardRef, useCallback } from 'react';
import type { ProductCarouselPropsBase } from '@groxigo/contracts/components/product-carousel';
import { Carousel } from '../Carousel';
import { ProductTile } from '../ProductTile';

export interface ProductCarouselProps extends ProductCarouselPropsBase {
  className?: string;
}

export const ProductCarousel = forwardRef<HTMLDivElement, ProductCarouselProps>(
  ({ items, onItemPress, onSeeAll, title, showArrows, gap, className, testID }, ref) => {
    const renderItem = useCallback(
      (item: ProductCarouselProps['items'][number]) => (
        <ProductTile
          {...item}
          onPress={onItemPress ? () => onItemPress(item.id) : item.onPress}
        />
      ),
      [onItemPress]
    );

    return (
      <Carousel
        ref={ref}
        items={items}
        renderItem={renderItem}
        showArrows={showArrows}
        itemWidth="clamp(110px, 16vw, 192px)"
        gap={gap}
        title={title}
        onSeeAll={onSeeAll}
        className={className}
        testID={testID}
      />
    );
  }
);

ProductCarousel.displayName = 'ProductCarousel';
export default ProductCarousel;
