'use client';

import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import type { GridItemBase, GridPropsBase } from '@groxigo/contracts/components';
import clsx from 'clsx';
import styles from './Grid.module.css';

export type GridItem = GridItemBase;

export interface GridProps<T extends GridItem = GridItem> extends GridPropsBase<T> {
  className?: string;
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
