'use client';

import { forwardRef, useCallback } from 'react';
import type { RecipeCarouselPropsBase } from '@groxigo/contracts/components/recipe-carousel';
import { Carousel } from '../Carousel';
import { RecipeCard } from '../RecipeCard';

export interface RecipeCarouselProps extends RecipeCarouselPropsBase {}

export const RecipeCarousel = forwardRef<HTMLDivElement, RecipeCarouselProps>(
  ({ items, onItemPress, onSeeAll, title, showArrows, gap, className, testID }, ref) => {
    const renderItem = useCallback(
      (item: RecipeCarouselProps['items'][number]) => (
        <RecipeCard
          {...item}
          size="md"
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
        gap={gap}
        title={title}
        onSeeAll={onSeeAll}
        className={className}
        testID={testID}
      />
    );
  }
);

RecipeCarousel.displayName = 'RecipeCarousel';
export default RecipeCarousel;
