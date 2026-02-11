'use client';

import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Grid.module.css';

export interface GridItem {
  id: string;
}

export interface GridProps<T extends GridItem = GridItem> {
  /** Items to render */
  items: T[];
  /** Render function for each item */
  renderItem: (item: T) => ReactNode;
  /** Minimum item width for auto-fill columns @default 140 */
  minItemWidth?: number;
  /** Minimum item width on large screens (≥768px viewport). Falls back to minItemWidth. */
  minItemWidthLg?: number;
  /** Maximum item width (caps cell size so cards don't stretch too wide) */
  maxItemWidth?: number;
  /** Fixed number of columns (overrides minItemWidth) */
  columns?: number;
  /** Gap between items in pixels @default 16 */
  gap?: number;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testID?: string;
}

function GridInner<T extends GridItem>(
  {
    items,
    renderItem,
    minItemWidth = 140,
    minItemWidthLg,
    maxItemWidth,
    columns,
    gap = 16,
    className,
    testID,
  }: GridProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const gridStyle: React.CSSProperties & { [key: `--${string}`]: string } = {
    gap: `${gap}px`,
  };

  if (columns) {
    gridStyle.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  } else {
    gridStyle['--grid-min'] = `${minItemWidth}px`;
    if (minItemWidthLg != null) {
      gridStyle['--grid-min-lg'] = `${minItemWidthLg}px`;
    }
    if (maxItemWidth != null) {
      gridStyle['--grid-max'] = `${maxItemWidth}px`;
    }
  }

  return (
    <div
      ref={ref}
      className={clsx(styles.root, className)}
      style={gridStyle}
      data-testid={testID}
    >
      {items.map((item) => (
        <div key={item.id} className={styles.cell}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

export const Grid = forwardRef(GridInner) as <T extends GridItem>(
  props: GridProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => ReactNode;

(Grid as { displayName?: string }).displayName = 'Grid';
export default Grid;
