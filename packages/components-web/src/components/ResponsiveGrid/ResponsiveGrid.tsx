'use client';

/**
 * ResponsiveGrid Component (Web)
 *
 * CSS Grid wrapper with responsive columns.
 * Adapts to screen size with configurable breakpoints.
 */

import { forwardRef } from 'react';
import { cn } from '@groxigo/ui-elements-web';

export interface ResponsiveGridProps {
  /**
   * Child components to render in the grid
   */
  children: React.ReactNode;

  /**
   * Number of columns per breakpoint
   */
  columns?: {
    base?: 1 | 2 | 3 | 4 | 5 | 6;
    sm?: 1 | 2 | 3 | 4 | 5 | 6;
    md?: 1 | 2 | 3 | 4 | 5 | 6;
    lg?: 1 | 2 | 3 | 4 | 5 | 6;
    xl?: 1 | 2 | 3 | 4 | 5 | 6;
  };

  /**
   * Gap between grid items (Tailwind spacing scale)
   * @default 4
   */
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;

  /**
   * Minimum item width (uses CSS grid auto-fit)
   */
  minItemWidth?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}

const colClasses: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
};

const smColClasses: Record<number, string> = {
  1: 'sm:grid-cols-1',
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-4',
  5: 'sm:grid-cols-5',
  6: 'sm:grid-cols-6',
};

const mdColClasses: Record<number, string> = {
  1: 'md:grid-cols-1',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
  5: 'md:grid-cols-5',
  6: 'md:grid-cols-6',
};

const lgColClasses: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
};

const xlColClasses: Record<number, string> = {
  1: 'xl:grid-cols-1',
  2: 'xl:grid-cols-2',
  3: 'xl:grid-cols-3',
  4: 'xl:grid-cols-4',
  5: 'xl:grid-cols-5',
  6: 'xl:grid-cols-6',
};

const gapClasses: Record<number, string> = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
};

export const ResponsiveGrid = forwardRef<HTMLDivElement, ResponsiveGridProps>(
  (
    {
      children,
      columns = { base: 1, sm: 2, md: 3, lg: 4 },
      gap = 4,
      minItemWidth,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    // If minItemWidth is specified, use CSS grid auto-fit
    if (minItemWidth) {
      return (
        <div
          ref={ref}
          className={cn('grid', gapClasses[gap], className)}
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
          }}
          data-testid={testID}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          columns.base && colClasses[columns.base],
          columns.sm && smColClasses[columns.sm],
          columns.md && mdColClasses[columns.md],
          columns.lg && lgColClasses[columns.lg],
          columns.xl && xlColClasses[columns.xl],
          gapClasses[gap],
          className
        )}
        data-testid={testID}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ResponsiveGrid.displayName = 'ResponsiveGrid';

export default ResponsiveGrid;
