/**
 * RecipeSection Component (Web)
 *
 * Enterprise section component for displaying recipes in carousel or grid layout.
 * Features:
 * - Title header (no "See all" in header)
 * - Recipe cards in horizontal scroll or grid
 * - "See all X recipes →" button at bottom
 */

'use client';

import React, { forwardRef } from 'react';
import { Text, Icon, cn } from '@groxigo/ui-elements-web';
import { RecipeCard } from '../RecipeCard';
import { SectionHeader } from '../SectionHeader';
import type { RecipeSectionPropsBase, RecipeSectionItem } from '@groxigo/contracts';

export interface RecipeSectionProps extends RecipeSectionPropsBase {}

export const RecipeSection = forwardRef<HTMLDivElement, RecipeSectionProps>(
  (
    {
      title,
      titleVariant = 'h3',
      icon,
      iconColor,
      items,
      displayType = 'carousel',
      showSeeAll = false,
      seeAllText,
      totalCount,
      onSeeAllPress,
      onRecipePress,
      cardWidth = 180,
      columns = 2,
      gap = 12,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    // Generate "See all" text
    const seeAllDisplayText = seeAllText || 'See all';
    // Show button if onSeeAllPress is provided
    const shouldShowSeeAllButton = !!onSeeAllPress;

    // Render a single recipe card
    const renderRecipeCard = (item: RecipeSectionItem) => {
      return (
        <RecipeCard
          key={item.id}
          id={item.id}
          title={item.title}
          imageUrl={item.imageUrl}
          prepTime={item.prepTime}
          cookTime={item.cookTime}
          totalTime={item.totalTime}
          servings={item.servings}
          difficulty={item.difficulty}
          cuisine={item.cuisine}
          rating={item.rating}
          ratingCount={item.ratingCount}
          tags={item.tags}
          badge={item.badge}
          width={cardWidth}
          onPress={() => onRecipePress?.(item.id)}
        />
      );
    };

    // Render "See all X recipes →" button
    const renderSeeAllButton = () => {
      if (!shouldShowSeeAllButton) return null;

      return (
        <button
          onClick={onSeeAllPress}
          className="flex items-center justify-center gap-1 mt-3 mx-auto text-primary font-medium text-sm hover:underline"
        >
          <span>{seeAllDisplayText}</span>
          <Icon name="chevron-right" size="sm" className="text-primary" />
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
          {...props}
        >
          {title && (
            <SectionHeader
              title={title}
              titleVariant={titleVariant as any}
              icon={icon}
              iconColor={iconColor}
              showSeeAll={false}
            />
          )}
          <div
            className="flex flex-wrap px-4"
            style={{ gap: `${gap}px` }}
          >
            {items.map(renderRecipeCard)}
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
        {...props}
      >
        {title && (
          <SectionHeader
            title={title}
            titleVariant={titleVariant as any}
            icon={icon}
            iconColor={iconColor}
            showSeeAll={false}
          />
        )}
        <div
          className="flex overflow-x-auto scrollbar-hide px-4"
          style={{ gap: `${gap}px` }}
        >
          {items.map(renderRecipeCard)}
        </div>
        {renderSeeAllButton()}
      </div>
    );
  }
);

RecipeSection.displayName = 'RecipeSection';

export default RecipeSection;
