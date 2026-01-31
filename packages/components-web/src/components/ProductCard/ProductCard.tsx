/**
 * ProductCard Component (Web)
 *
 * Composite component for displaying product information.
 * Implements @groxigo/contracts ProductCardPropsBase.
 */

'use client';

import React, { forwardRef, ReactNode } from 'react';
import { Text, Badge, Card, cn } from '@groxigo/ui-elements-web';
import type { ProductCardPropsBase, ProductCategory, ProductImageVariant } from '@groxigo/contracts';
import { Rating } from '../Rating';

const sizeClasses: Record<string, { card: string; image: string; title: string }> = {
  sm: {
    card: 'w-36',
    image: 'h-28',
    title: 'text-sm',
  },
  md: {
    card: 'w-44',
    image: 'h-36',
    title: 'text-base',
  },
  lg: {
    card: 'w-56',
    image: 'h-44',
    title: 'text-md',
  },
};

export interface ProductCardProps extends ProductCardPropsBase {
  /** Custom render for recipe link */
  renderRecipeLink?: (recipeCount: number) => ReactNode;
}

export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      id,
      name,
      imageUrl,
      imageVariants,
      price,
      originalPrice,
      unit,
      weight,
      discountPercent,
      outOfStock,
      size = 'md',
      variant = 'default',
      badge,
      category,
      rating,
      reviewCount,
      recipeCount,
      isFavorite,
      quantity = 0,
      onPress,
      onAddToCart,
      onQuantityChange,
      onToggleFavorite,
      renderRecipeLink,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeClasses[size];

    // Format price
    const formatPrice = (value: number) => `$${value.toFixed(2)}`;

    // Horizontal variant
    if (variant === 'horizontal') {
      return (
        <Card
          ref={ref}
          variant="outline"
          size="sm"
          pressable={!!onPress}
          onPress={onPress}
          className={cn('flex flex-row gap-3', className)}
          testID={testID}
          {...props}
        >
          <div className="relative w-24 h-24 flex-shrink-0">
            <img
              src={imageUrl}
              alt={name}
              loading="lazy"
              className="w-full h-full object-cover rounded-lg"
            />
            {badge && (
              <Badge
                colorScheme="accent"
                size="xs"
                className="absolute top-1 left-1"
              >
                {badge}
              </Badge>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-between py-1">
            <Text variant="bodySmall" weight="medium" truncate className="line-clamp-2">
              {name}
            </Text>
            <div className="flex items-center justify-between">
              <div>
                <Text variant="body" weight="semibold" colorScheme="primary">
                  {formatPrice(price)}
                </Text>
                {originalPrice && originalPrice > price && (
                  <Text variant="caption" colorScheme="muted" className="line-through ml-1">
                    {formatPrice(originalPrice)}
                  </Text>
                )}
              </div>
              {quantity > 0 ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); onQuantityChange?.(quantity - 1); }}
                    className="w-7 h-7 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center hover:bg-primary-200"
                  >
                    -
                  </button>
                  <Text variant="body" weight="medium">{quantity}</Text>
                  <button
                    onClick={(e) => { e.stopPropagation(); onQuantityChange?.(quantity + 1); }}
                    className="w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => { e.stopPropagation(); onAddToCart?.(); }}
                  disabled={outOfStock}
                  className="px-3 py-1.5 rounded-lg bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {outOfStock ? 'Out' : 'Add'}
                </button>
              )}
            </div>
          </div>
        </Card>
      );
    }

    // Default vertical card
    return (
      <Card
        ref={ref}
        variant="outline"
        size="sm"
        pressable={!!onPress}
        onPress={onPress}
        className={cn(sizeConfig.card, 'flex flex-col', className)}
        testID={testID}
        {...props}
      >
        {/* Image container */}
        <div className={cn('relative w-full', sizeConfig.image)}>
          <img
            src={imageUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full object-cover rounded-t-lg"
          />
          {/* Discount badge */}
          {discountPercent && discountPercent > 0 && (
            <Badge
              colorScheme="error"
              size="xs"
              className="absolute top-2 left-2"
            >
              -{discountPercent}%
            </Badge>
          )}
          {/* Custom badge */}
          {badge && !discountPercent && (
            <Badge
              colorScheme="accent"
              size="xs"
              className="absolute top-2 left-2"
            >
              {badge}
            </Badge>
          )}
          {/* Favorite button */}
          {onToggleFavorite && (
            <button
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center hover:bg-white"
            >
              <svg
                className={cn('w-4 h-4', isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400')}
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          )}
          {/* Out of stock overlay */}
          {outOfStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-t-lg">
              <Text variant="bodySmall" weight="semibold" colorScheme="error">
                Out of Stock
              </Text>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col p-2 gap-1">
          <Text variant="bodySmall" weight="medium" className={cn('line-clamp-2', sizeConfig.title)}>
            {name}
          </Text>
          {weight && (
            <Text variant="caption" colorScheme="muted">
              {weight}
            </Text>
          )}
          {unit && !weight && (
            <Text variant="caption" colorScheme="muted">
              {unit}
            </Text>
          )}

          {/* Rating */}
          {rating !== undefined && rating > 0 && (
            <div className="flex items-center gap-1">
              <Rating value={rating} size="sm" showValue={false} />
              {reviewCount !== undefined && reviewCount > 0 && (
                <Text variant="caption" colorScheme="muted">
                  ({reviewCount})
                </Text>
              )}
            </div>
          )}

          {/* Recipe link */}
          {recipeCount !== undefined && recipeCount > 0 && renderRecipeLink && (
            <div className="mt-1">
              {renderRecipeLink(recipeCount)}
            </div>
          )}

          {/* Price and action */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
              <Text variant="body" weight="semibold" colorScheme="primary">
                {formatPrice(price)}
              </Text>
              {originalPrice && originalPrice > price && (
                <Text variant="caption" colorScheme="muted" className="line-through">
                  {formatPrice(originalPrice)}
                </Text>
              )}
            </div>

            {quantity > 0 ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); onQuantityChange?.(quantity - 1); }}
                  className="w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center hover:bg-primary-200 text-sm"
                >
                  -
                </button>
                <Text variant="bodySmall" weight="medium" className="w-5 text-center">
                  {quantity}
                </Text>
                <button
                  onClick={(e) => { e.stopPropagation(); onQuantityChange?.(quantity + 1); }}
                  className="w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 text-sm"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); onAddToCart?.(); }}
                disabled={outOfStock}
                className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </Card>
    );
  }
);

ProductCard.displayName = 'ProductCard';

export default ProductCard;
