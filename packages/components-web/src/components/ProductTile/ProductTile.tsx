/**
 * ProductTile Component (Web)
 *
 * A flexible product display for deals, trending, and compact listings.
 * Matches modern grocery app design patterns (Blinkit-style).
 *
 * Features:
 * - 1:1 image ratio
 * - Badge overlay (top-left)
 * - Favorite icon (top-right)
 * - ADD button / Quantity stepper (bottom-right of image)
 * - Info section with weight, name, rating, discount, price
 * - Supports product mode (with price) and category mode (no price)
 */

'use client';

import React, { forwardRef, useState } from 'react';
import { Text, cn } from '@groxigo/ui-elements-web';
import { Rating } from '../Rating';
import type { ProductTileProps } from './ProductTile.types';

// Base size configurations
const BASE_SIZE_CONFIG = {
  sm: { width: 80 },
  md: { width: 130 },
  lg: { width: 150 },
};

export const ProductTile = forwardRef<HTMLDivElement, ProductTileProps>(
  (
    {
      id,
      name,
      imageUrl,
      price,
      originalPrice,
      discountPercent,
      discountText,
      weight,
      brand,
      badge,
      badgeVariant = 'primary',
      rating,
      reviewCount,
      timerText,
      outOfStock = false,
      showAddButton = false,
      addButtonText = 'ADD',
      optionsText,
      quantity = 0,
      onAddPress,
      onIncrement,
      onDecrement,
      showFavorite = false,
      isFavorite = false,
      onFavoritePress,
      size = 'md',
      width,
      onPress,
      className,
      testID,
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    // Calculate tile width
    const baseConfig = BASE_SIZE_CONFIG[size];
    const tileWidth = width ?? baseConfig.width;
    // 1:1 ratio - image height equals width
    const imageSize = tileWidth;

    // Badge colors
    const badgeColors = {
      primary: 'bg-primary-500',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-error',
    };

    // Calculate discount display
    const displayDiscountText =
      discountText ?? (discountPercent ? `${discountPercent}% OFF` : null);

    // Info section height based on mode
    const infoSectionHeight = price !== undefined ? 135 : 55;

    const content = (
      <div
        ref={ref}
        className={cn(
          'relative overflow-visible rounded-lg bg-white shadow-sm',
          outOfStock && 'opacity-70',
          className
        )}
        style={{ width: `${tileWidth}px` }}
        data-testid={testID}
      >
        {/* Image Section */}
        <div
          className="relative rounded-t-lg"
          style={{ backgroundColor: '#F5F5F5' }}
        >
          {/* Custom Badge (top-left) */}
          {badge && !outOfStock && (
            <div
              className={cn(
                'absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded text-white text-[9px] font-bold',
                badgeColors[badgeVariant]
              )}
            >
              {badge}
            </div>
          )}

          {/* Favorite Icon (top-right) */}
          {showFavorite && (
            <button
              className="absolute top-1 right-1 z-10 p-1"
              onClick={(e) => {
                e.stopPropagation();
                onFavoritePress?.();
              }}
            >
              <svg
                className={cn(
                  'w-[18px] h-[18px]',
                  isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
                )}
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

          {/* Product Image - 1:1 ratio, edge to edge */}
          <div className="flex items-center justify-center bg-transparent">
            {imageUrl && !imageError ? (
              <img
                src={imageUrl}
                alt={name}
                className={cn(
                  'object-cover rounded-t-lg',
                  outOfStock && 'opacity-50'
                )}
                style={{
                  width: `${imageSize}px`,
                  height: `${imageSize}px`,
                  backgroundColor: '#F5F5F5',
                }}
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className="flex items-center justify-center rounded-t-lg bg-gray-100"
                style={{ width: `${imageSize}px`, height: `${imageSize}px` }}
              >
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* ADD Button / Quantity Stepper (bottom-right of image) */}
          {showAddButton && !outOfStock && (
            <div className="absolute bottom-1.5 right-1.5 z-10">
              {quantity > 0 ? (
                // Quantity Stepper
                <div className="flex items-center gap-1 bg-primary-500 rounded-lg px-1 py-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDecrement?.();
                    }}
                    className="p-1 text-white hover:bg-primary-600 rounded"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <span className="text-white font-semibold text-xs min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onIncrement?.();
                    }}
                    className="p-1 text-white hover:bg-primary-600 rounded"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                // ADD Button (+ icon)
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddPress?.();
                  }}
                  className="w-7 h-7 bg-primary-500 rounded-md flex items-center justify-center hover:bg-primary-600"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Out of Stock Overlay */}
          {outOfStock && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-t-lg">
              <span className="text-gray-600 font-semibold text-[10px]">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info Section - fixed height for consistent card heights */}
        <div
          className="px-2 pb-2 pt-1.5"
          style={{ height: `${infoSectionHeight}px` }}
        >
          {/* Weight/Size - shown prominently (only for products with price) */}
          {weight && price !== undefined && (
            <div className="inline-block px-1 py-0.5 rounded bg-gray-100">
              <span className="text-gray-600 text-[10px] font-medium">
                {weight}
              </span>
            </div>
          )}

          {/* Product Name - 2 lines max with ellipsis */}
          <p
            className={cn(
              'text-gray-900 text-xs leading-[15px] line-clamp-2',
              price !== undefined ? 'mt-1 text-left' : 'text-center'
            )}
            style={{ height: '30px' }}
          >
            {name}
          </p>

          {/* Rating - compact with reviews on right (only for products) */}
          {price !== undefined && (
            <div className="flex items-center mt-1">
              <Rating value={rating ?? 0} size="sm" showValue={false} />
              {reviewCount !== undefined && reviewCount > 0 && (
                <span className="text-gray-500 text-[9px] ml-auto">
                  {reviewCount.toLocaleString()}
                </span>
              )}
            </div>
          )}

          {/* Discount Text - only shown when discount exists */}
          {price !== undefined &&
            discountPercent != null &&
            discountPercent > 0 &&
            !outOfStock && (
              <p className="text-[#2E7D32] text-[10px] font-semibold mt-0.5 leading-3">
                {discountPercent}% OFF
              </p>
            )}

          {/* Price Row - only shown when price exists */}
          {price !== undefined && (
            <div className="flex items-baseline">
              <span className="text-gray-900 font-bold text-[13px]">
                ${price.toFixed(2)}
              </span>
              {originalPrice != null && originalPrice > price && (
                <span className="text-gray-400 text-[10px] ml-1 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );

    if (onPress) {
      return (
        <div
          role="button"
          tabIndex={0}
          onClick={onPress}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onPress();
            }
          }}
          className="text-left hover:opacity-90 active:scale-[0.98] transition-all duration-150 cursor-pointer"
        >
          {content}
        </div>
      );
    }

    return content;
  }
);

ProductTile.displayName = 'ProductTile';

export default ProductTile;
