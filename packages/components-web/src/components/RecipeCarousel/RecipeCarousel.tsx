'use client';

import { forwardRef, useRef, useCallback } from 'react';
import { AngleLeft, AngleRight } from '@groxigo/icons/line';
import type { RecipeCarouselPropsBase } from '@groxigo/contracts/components/recipe-carousel';
import { Button } from '@groxigo/ui-elements-web';
import { RecipeCard } from '../RecipeCard';
import { SectionHeader } from '../SectionHeader';
import clsx from 'clsx';
import styles from './RecipeCarousel.module.css';

export interface RecipeCarouselProps extends RecipeCarouselPropsBase {}


export const RecipeCarousel = forwardRef<HTMLDivElement, RecipeCarouselProps>(
  (
    {
      items,
      showArrows = true,
      gap = 12,
      onItemPress,
      onSeeAll,
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
          <SectionHeader
            title={title}
            showSeeAll={!!onSeeAll}
            onSeeAllPress={onSeeAll}
          />
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
                <RecipeCard
                  {...item}
                  size="md"
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

RecipeCarousel.displayName = 'RecipeCarousel';
export default RecipeCarousel;
