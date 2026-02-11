'use client';

import { forwardRef, useRef, useCallback, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AngleLeft, AngleRight } from '@groxigo/icons/line';
import { SectionHeader } from '../SectionHeader';
import clsx from 'clsx';
import styles from './Carousel.module.css';

export interface CarouselItem {
  id: string;
}

export interface CarouselProps<T extends CarouselItem = CarouselItem> {
  /** Items to render */
  items: T[];
  /** Render function for each item */
  renderItem: (item: T) => ReactNode;
  /** Whether to show navigation arrows @default true */
  showArrows?: boolean;
  /** Fixed width for each slide item in pixels */
  itemWidth?: number;
  /** Gap between items in pixels @default 12 */
  gap?: number;
  /** Section title */
  title?: string;
  /** Whether to show "See All" link */
  showSeeAll?: boolean;
  /** Callback when "See All" is pressed */
  onSeeAll?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testID?: string;
}

function CarouselInner<T extends CarouselItem>(
  {
    items,
    renderItem,
    showArrows = true,
    itemWidth,
    gap = 12,
    title,
    showSeeAll,
    onSeeAll,
    className,
    testID,
  }: CarouselProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState]);

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
          showSeeAll={showSeeAll ?? !!onSeeAll}
          onSeeAllPress={onSeeAll}
        />
      )}

      <div className={styles.carouselWrapper}>
        {showArrows && canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            className={styles.arrowLeft}
          >
            <AngleLeft size={20} />
          </button>
        )}

        <div
          ref={scrollRef}
          className={styles.track}
          style={{ gap: `${gap}px` }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={styles.slide}
              style={itemWidth ? { width: `${itemWidth}px` } : undefined}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>

        {showArrows && canScrollRight && (
          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            className={styles.arrowRight}
          >
            <AngleRight size={20} />
          </button>
        )}

        {canScrollLeft && <div className={styles.gradientLeft} aria-hidden="true" />}
        {canScrollRight && <div className={styles.gradientRight} aria-hidden="true" />}
      </div>
    </div>
  );
}

export const Carousel = forwardRef(CarouselInner) as <T extends CarouselItem>(
  props: CarouselProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => ReactNode;

(Carousel as { displayName?: string }).displayName = 'Carousel';
export default Carousel;
