/**
 * ProductListSheet Component (Web)
 *
 * A bottom sheet overlay for displaying a scrollable list of products
 * using FluidGrid. Uses native dialog element for accessibility.
 */

'use client';

import React, { forwardRef, useRef, useEffect, useCallback } from 'react';
import { Text, cn } from '@groxigo/ui-elements-web';
import { FluidGrid } from '../FluidGrid';
import { ProductTile } from '../ProductTile';
import type { ProductListSheetProps, ProductListSheetItem } from './ProductListSheet.types';

export const ProductListSheet = forwardRef<HTMLDialogElement, ProductListSheetProps>(
  (
    {
      visible,
      onClose,
      title,
      subtitle,
      items,
      onProductPress,
      onAddToCart,
      onIncrement,
      onDecrement,
      onFavoriteToggle,
      favorites = {},
      getItemQuantity = () => 0,
      showFavorite = true,
      showAddButton = true,
      heightPercent = 0.7,
      dismissible = true,
      showDragHandle = true,
      isLoading = false,
      onEndReached,
      className,
      testID,
    },
    ref
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Sync dialog state with visible prop
    useEffect(() => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (visible && !dialog.open) {
        dialog.showModal();
      } else if (!visible && dialog.open) {
        dialog.close();
      }
    }, [visible]);

    // Handle backdrop click
    const handleDialogClick = useCallback(
      (e: React.MouseEvent<HTMLDialogElement>) => {
        if (dismissible && e.target === dialogRef.current) {
          onClose();
        }
      },
      [dismissible, onClose]
    );

    // Handle scroll for infinite loading
    const handleScroll = useCallback(
      (e: React.UIEvent<HTMLDivElement>) => {
        if (!onEndReached) return;
        const target = e.target as HTMLDivElement;
        const isNearBottom =
          target.scrollHeight - target.scrollTop - target.clientHeight < 100;
        if (isNearBottom) {
          onEndReached();
        }
      },
      [onEndReached]
    );

    // Calculate discount percent
    const getDiscountPercent = (item: ProductListSheetItem): number | undefined => {
      if (item.discountPercent) return item.discountPercent;
      if (item.compareAtPrice && item.compareAtPrice > item.price) {
        return Math.round(
          ((item.compareAtPrice - item.price) / item.compareAtPrice) * 100
        );
      }
      return undefined;
    };

    // Sheet height
    const sheetHeight = `${heightPercent * 100}vh`;

    return (
      <dialog
        ref={(node) => {
          (dialogRef as React.MutableRefObject<HTMLDialogElement | null>).current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn(
          'fixed inset-0 w-full h-full max-w-full max-h-full m-0 p-0 bg-transparent',
          'backdrop:bg-black/60 backdrop:backdrop-blur-sm',
          '[&::backdrop]:transition-opacity [&::backdrop]:duration-200',
          className
        )}
        onClick={handleDialogClick}
        data-testid={testID}
      >
        <div
          className={cn(
            'fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl',
            'animate-in slide-in-from-bottom duration-300'
          )}
          style={{ height: sheetHeight }}
        >
          {/* Drag Handle */}
          {showDragHandle && (
            <button
              className="w-full flex justify-center py-3 cursor-pointer"
              onClick={dismissible ? onClose : undefined}
            >
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </button>
          )}

          {/* Header */}
          <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-200">
            <div className="flex-1">
              {title && (
                <Text variant="h3" className="text-gray-900 text-lg font-semibold">
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text variant="caption" className="text-gray-500 text-sm mt-0.5">
                  {subtitle}
                </Text>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
            >
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto p-4 pb-8"
            style={{ height: `calc(${sheetHeight} - 100px)` }}
            onScroll={handleScroll}
          >
            {isLoading && items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                <Text className="text-gray-500 mt-3 text-sm">
                  Loading products...
                </Text>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <svg
                  className="w-12 h-12 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <Text className="text-gray-500 mt-3 text-sm text-center">
                  No products found
                </Text>
              </div>
            ) : (
              <FluidGrid minItemWidth={115} maxItemWidth={160} gap={8}>
                {items.map((item) => {
                  const quantity = getItemQuantity(item.id);
                  const discountPercent = getDiscountPercent(item);

                  return (
                    <ProductTile
                      key={item.id}
                      id={item.id}
                      name={item.name}
                      imageUrl={item.imageUrl}
                      price={item.price}
                      originalPrice={item.compareAtPrice}
                      discountPercent={discountPercent}
                      weight={item.unitSize || item.unit}
                      rating={item.rating}
                      reviewCount={item.reviewCount}
                      outOfStock={item.inStock === false}
                      showAddButton={showAddButton}
                      quantity={quantity}
                      onAddPress={() => onAddToCart?.(item)}
                      onIncrement={() => onIncrement?.(item.id)}
                      onDecrement={() => onDecrement?.(item.id)}
                      showFavorite={showFavorite}
                      isFavorite={favorites[item.id]}
                      onFavoritePress={() => onFavoriteToggle?.(item.id)}
                      onPress={() => onProductPress?.(item.id)}
                    />
                  );
                })}
              </FluidGrid>
            )}

            {/* Loading more indicator */}
            {isLoading && items.length > 0 && (
              <div className="flex justify-center mt-4">
                <div className="w-6 h-6 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      </dialog>
    );
  }
);

ProductListSheet.displayName = 'ProductListSheet';

export default ProductListSheet;
