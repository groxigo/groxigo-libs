/**
 * CuisineCard Component (Web)
 *
 * A visually rich card for displaying cuisine types with beautiful imagery,
 * gradient overlay, and recipe count. Designed for recipe browse pages.
 */

'use client';

import React, { forwardRef } from 'react';
import { cn } from '@groxigo/ui-elements-web';
import type { CuisineCardPropsBase } from '@groxigo/contracts';

export interface CuisineCardProps extends CuisineCardPropsBase {}

// Default placeholder image
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&h=300&fit=crop';

// Size configurations
const sizeStyles = {
  sm: 'h-24 rounded-xl',
  md: 'h-[120px] rounded-2xl',
  lg: 'h-[150px] rounded-[20px]',
};

const textStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const CuisineCard = forwardRef<HTMLDivElement, CuisineCardProps>(
  (
    {
      slug,
      name,
      imageUrl,
      recipeCount,
      size = 'md',
      variant = 'default',
      width,
      onPress,
      className,
      testID,
    },
    ref
  ) => {
    const Wrapper = onPress ? 'button' : 'div';

    return (
      <Wrapper
        ref={ref as any}
        className={cn(
          'relative overflow-hidden bg-gray-100 group',
          sizeStyles[size],
          onPress && 'cursor-pointer transition-transform duration-200 hover:scale-[0.98] active:scale-95',
          className
        )}
        style={{ width: width ? `${width}px` : undefined }}
        onClick={onPress}
        data-testid={testID}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundImage: `url(${imageUrl || PLACEHOLDER_IMAGE})`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          {/* Cuisine name */}
          <h3
            className={cn(
              'font-bold text-white drop-shadow-md',
              textStyles[size]
            )}
          >
            {name}
          </h3>

          {/* Recipe count */}
          {recipeCount !== undefined && (
            <div className="flex items-center gap-1 mt-1">
              <svg
                className="w-3 h-3 text-white/90"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
              </svg>
              <span className="text-xs text-white/90">
                {recipeCount} {recipeCount === 1 ? 'recipe' : 'recipes'}
              </span>
            </div>
          )}
        </div>
      </Wrapper>
    );
  }
);

CuisineCard.displayName = 'CuisineCard';

export default CuisineCard;
