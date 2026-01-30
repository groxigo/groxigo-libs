/**
 * ProductSection Component (Web)
 *
 * Enterprise section component for displaying products in carousel or grid layout.
 * Used by SDUI to render product sections dynamically.
 */

'use client';

import React, { forwardRef } from 'react';
import { Text, cn } from '@groxigo/ui-elements-web';
import { ProductTile } from '../ProductTile';
import { SectionHeader } from '../SectionHeader';
import type { ProductSectionProps, ProductSectionItem } from './ProductSection.types';

export const ProductSection = forwardRef<HTMLDivElement, ProductSectionProps>(
  (
    {
      title,
      titleVariant,
      items,
      displayType = 'carousel',
      showSeeAll = false,
      seeAllText,
      totalCount,
      onSeeAllPress,
      onProductPress,
      onAddToCart,
      onIncrement,
      onDecrement,
      onFavoriteToggle,
      favorites = {},
      getItemQuantity = () => 0,
      showFavorite = true,
      showAddButton = true,
      tileSize = 'md',
      columns = 2,
      gap = 12,
      className,
      testID,
    },
    ref
  ) => {
    // Generate "See all" text
    const seeAllDisplayText = seeAllText || 'See all';
    // Show button if onSeeAllPress is provided (regardless of showSeeAll flag)
    const shouldShowSeeAllButton = !!onSeeAllPress;

    // Calculate discount percent from prices
    const getDiscountPercent = (item: ProductSectionItem): number | undefined => {
      if (item.discountPercent) return item.discountPercent;
      const price = item.dealPrice || item.price;
      if (item.compareAtPrice && item.compareAtPrice > price) {
        return Math.round(
          ((item.compareAtPrice - price) / item.compareAtPrice) * 100
        );
      }
      return undefined;
    };

    // Render a single product tile
    const renderProductTile = (item: ProductSectionItem) => {
      const quantity = getItemQuantity(item.id);
      const discountPercent = getDiscountPercent(item);

      return (
        <ProductTile
          key={item.id}
          id={item.id}
          name={item.name}
          imageUrl={item.imageUrl}
          price={item.dealPrice || item.price}
          originalPrice={item.compareAtPrice}
          discountPercent={discountPercent}
          weight={item.unitSize || item.unit}
          rating={item.rating}
          reviewCount={item.reviewCount}
          badge={item.badge}
          badgeVariant={item.badgeVariant}
          outOfStock={item.inStock === false}
          showAddButton={showAddButton}
          quantity={quantity}
          onAddPress={() => onAddToCart?.(item)}
          onIncrement={() => onIncrement?.(item.id)}
          onDecrement={() => onDecrement?.(item.id)}
          showFavorite={showFavorite}
          isFavorite={favorites[item.id]}
          onFavoritePress={() => onFavoriteToggle?.(item.id)}
          size={tileSize}
          onPress={() => onProductPress?.(item.id)}
        />
      );
    };

    // Render "See all X items" button
    const renderSeeAllButton = () => {
      if (!shouldShowSeeAllButton) return null;

      return (
        <button
          onClick={onSeeAllPress}
          className="flex items-center justify-center gap-1 mt-3 px-4 text-primary-500 font-medium text-sm hover:text-primary-600"
        >
          {seeAllDisplayText}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      );
    };

    // Grid layout
    if (displayType === 'grid') {
      return (
        <div
          ref={ref}
          className={cn('mb-4', className)}
          data-testid={testID}
        >
          {title && (
            <SectionHeader
              title={title}
              titleVariant={titleVariant}
              showSeeAll={false}
            />
          )}
          <div
            className="px-4 flex flex-wrap"
            style={{ gap: `${gap}px` }}
          >
            {items.map(renderProductTile)}
          </div>
          {renderSeeAllButton()}
        </div>
      );
    }

    // Carousel layout (default)
    return (
      <div
        ref={ref}
        className={cn('mb-4', className)}
        data-testid={testID}
      >
        {title && (
          <SectionHeader
            title={title}
            titleVariant={titleVariant}
            showSeeAll={false}
          />
        )}
        <div
          className="px-4 overflow-x-auto scrollbar-hide"
          style={{
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <div
            className="flex"
            style={{ gap: `${gap}px` }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0"
                style={{ scrollSnapAlign: 'start' }}
              >
                {renderProductTile(item)}
              </div>
            ))}
          </div>
        </div>
        {renderSeeAllButton()}
      </div>
    );
  }
);

ProductSection.displayName = 'ProductSection';

export default ProductSection;
