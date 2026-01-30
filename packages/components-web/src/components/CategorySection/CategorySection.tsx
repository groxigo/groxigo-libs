/**
 * CategorySection Component (Web)
 *
 * Displays a titled section with a fluid grid of category tiles.
 * Uses ProductTile for consistent sizing with product grids.
 */

'use client';

import React, { forwardRef } from 'react';
import { cn } from '@groxigo/ui-elements-web';
import { ProductTile } from '../ProductTile';
import { FluidGrid } from '../FluidGrid';
import { SectionHeader } from '../SectionHeader';
import type { CategorySectionProps, CategoryImageSource } from './CategorySection.types';

export const CategorySection = forwardRef<HTMLDivElement, CategorySectionProps>(
  (
    {
      title,
      titleVariant = 'h2',
      items,
      tileSize = 'md',
      columns,
      minColumns,
      maxColumns,
      gap = 8,
      onCategoryPress,
      onSeeAllPress,
      showSeeAll = false,
      className,
      gridClassName,
      testID,
    },
    ref
  ) => {
    // Normalize image source to string URL
    const normalizeImageUrl = (image?: CategoryImageSource): string | undefined => {
      if (!image) return undefined;
      if (typeof image === 'string') return image;
      if (typeof image === 'object' && 'uri' in image) return image.uri;
      return undefined;
    };

    return (
      <div
        ref={ref}
        className={cn('mb-4', className)}
        data-testid={testID}
      >
        {(title || showSeeAll) && (
          <SectionHeader
            title={title || ''}
            titleVariant={titleVariant}
            showSeeAll={showSeeAll}
            onSeeAllPress={onSeeAllPress}
          />
        )}

        <div className={cn('px-4', gridClassName)}>
          <FluidGrid minItemWidth={85} maxItemWidth={105} gap={gap}>
            {items.map((item) => (
              <ProductTile
                key={item.id}
                id={item.id}
                name={item.title}
                imageUrl={normalizeImageUrl(item.image)}
                showAddButton={false}
                showFavorite={false}
                onPress={() => onCategoryPress?.(item.id)}
              />
            ))}
          </FluidGrid>
        </div>
      </div>
    );
  }
);

CategorySection.displayName = 'CategorySection';

export default CategorySection;
