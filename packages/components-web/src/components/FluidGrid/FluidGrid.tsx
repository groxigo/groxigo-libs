/**
 * FluidGrid Component (Web)
 *
 * A responsive grid that:
 * 1. Calculates optimal columns based on container width
 * 2. Items stretch to fill available space
 * 3. Respects min/max item widths
 * 4. Seamlessly adjusts as container resizes
 *
 * Uses ResizeObserver for container width detection.
 * Children that accept a `width` prop will receive
 * the calculated width automatically via cloneElement.
 */

'use client';

import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@groxigo/ui-elements-web';

export interface FluidGridProps {
  /**
   * Minimum width for each item (in pixels)
   * @default 140
   */
  minItemWidth?: number;
  /**
   * Maximum width for each item (in pixels)
   * @default 200
   */
  maxItemWidth?: number;
  /**
   * Gap between items (in pixels)
   * @default 12
   */
  gap?: number;
  /**
   * Children to render in the grid
   */
  children: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const FluidGrid = forwardRef<HTMLDivElement, FluidGridProps>(
  (
    {
      minItemWidth = 140,
      maxItemWidth = 200,
      gap = 12,
      children,
      className,
      testID,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    // Calculate optimal columns and item width
    const calculateGrid = useCallback(() => {
      if (containerWidth === 0) {
        return { columns: 2, itemWidth: minItemWidth };
      }

      // Calculate maximum columns that can fit at minimum item width
      // Formula: containerWidth = (columns * minWidth) + ((columns - 1) * gap)
      // Solving for columns: columns = (containerWidth + gap) / (minWidth + gap)
      const maxColumns = Math.floor((containerWidth + gap) / (minItemWidth + gap));

      // Ensure at least 1 column
      let columns = Math.max(1, maxColumns);

      // Calculate item width for this number of columns
      // Formula: itemWidth = (containerWidth - ((columns - 1) * gap)) / columns
      let itemWidth = (containerWidth - (columns - 1) * gap) / columns;

      // If item width exceeds max, try with fewer columns
      while (itemWidth > maxItemWidth && columns > 1) {
        columns--;
        itemWidth = (containerWidth - (columns - 1) * gap) / columns;
      }

      // If item width is still less than min (single column case), use container width
      if (columns === 1) {
        itemWidth = Math.min(containerWidth, maxItemWidth);
      }

      return { columns, itemWidth };
    }, [containerWidth, minItemWidth, maxItemWidth, gap]);

    // Use ResizeObserver to track container width
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (entry) {
          setContainerWidth(entry.contentRect.width);
        }
      });

      observer.observe(container);
      return () => observer.disconnect();
    }, []);

    const { itemWidth } = calculateGrid();

    const childrenArray = React.Children.toArray(children).filter(Boolean);

    return (
      <div
        ref={(node) => {
          // Handle both refs
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn('w-full', className)}
        data-testid={testID}
      >
        {containerWidth > 0 && (
          <div
            className="flex flex-wrap justify-start"
            style={{ gap: `${gap}px` }}
          >
            {childrenArray.map((child, index) => {
              // Clone child and pass width prop if it's a valid React element
              const childWithWidth = React.isValidElement(child)
                ? React.cloneElement(child as React.ReactElement<{ width?: number }>, {
                    width: itemWidth,
                  })
                : child;

              return (
                <div
                  key={index}
                  className="overflow-hidden"
                  style={{ width: `${itemWidth}px` }}
                >
                  {childWithWidth}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

FluidGrid.displayName = 'FluidGrid';

export default FluidGrid;
