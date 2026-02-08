'use client';

import { forwardRef, useRef, useCallback } from 'react';
import { AngleLeft, AngleRight } from '@groxigo/icons/line';
import type { CategoryCarouselPropsBase } from '@groxigo/contracts/components/category-carousel';
import { Button } from '@groxigo/ui-elements-web';
import { CategoryCard } from '../CategoryCard';
import { SectionHeader } from '../SectionHeader';
import clsx from 'clsx';
import styles from './CategoryCarousel.module.css';

export interface CategoryCarouselProps extends CategoryCarouselPropsBase {}


export const CategoryCarousel = forwardRef<HTMLDivElement, CategoryCarouselProps>(
  (
    {
      items,
      showArrows = true,
      gap = 12,
      onItemPress,
      title,
      className,
      testID,
    },
    ref
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = useCallback(
      (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const scrollAmount = scrollRef.current.clientWidth * 0.8;
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        });
      },
      []
    );

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        {title && (
          <SectionHeader title={title} />
        )}

        <div className={styles.carouselWrapper}>
          {showArrows && (
            <Button
              variant="ghost"
              size="sm"
              onPress={() => scroll('left')}
              aria-label="Scroll left"
              className={styles.arrowLeft}
            >
              <AngleLeft size={24} />
            </Button>
          )}

          <div
            ref={scrollRef}
            className={styles.track}
            style={{ gap: `${gap}px` }}
          >
            {items.map((item) => (
              <div key={item.id} className={styles.slide}>
                <CategoryCard
                  {...item}
                  size="sm"
                  onPress={onItemPress ? () => onItemPress(item.id) : item.onPress}
                />
              </div>
            ))}
          </div>

          {showArrows && (
            <Button
              variant="ghost"
              size="sm"
              onPress={() => scroll('right')}
              aria-label="Scroll right"
              className={styles.arrowRight}
            >
              <AngleRight size={24} />
            </Button>
          )}

          <div className={styles.gradientLeft} aria-hidden="true" />
          <div className={styles.gradientRight} aria-hidden="true" />
        </div>
      </div>
    );
  }
);

CategoryCarousel.displayName = 'CategoryCarousel';
export default CategoryCarousel;
