/**
 * CartItem Component (Web)
 *
 * Shopping cart item with image, details, price, and quantity controls.
 * Implements @groxigo/contracts CartItemPropsBase.
 */

'use client';

import React, { forwardRef } from 'react';
import { Text, Icon, cn } from '@groxigo/ui-elements-web';
import type { CartItemPropsBase } from '@groxigo/contracts';
import { QuantitySelector } from '../QuantitySelector';
import { PriceDisplay } from '../PriceDisplay';

export interface CartItemProps extends CartItemPropsBase {}

export const CartItem = forwardRef<HTMLDivElement, CartItemProps>(
  (
    {
      id,
      imageUrl,
      title,
      description,
      price,
      currency = 'USD',
      quantity = 1,
      onQuantityChange,
      onRemove,
      disabled = false,
      section = 'default',
      className,
      testID,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-row gap-3 p-3 bg-surface-primary rounded-lg border border-border',
          disabled && 'opacity-50',
          className
        )}
        data-testid={testID}
        {...props}
      >
        {/* Product Image */}
        {imageUrl && (
          <div className="flex-shrink-0">
            <img
              src={imageUrl}
              alt={title}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Header: Title and Remove button */}
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1 flex flex-col gap-0.5">
              <Text variant="body" weight="semibold" className="line-clamp-2">
                {title}
              </Text>
              {description && (
                <Text variant="caption" colorScheme="muted" className="line-clamp-1">
                  {description}
                </Text>
              )}
            </div>
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                disabled={disabled}
                className={cn(
                  'p-1 rounded-md transition-colors',
                  'hover:bg-gray-100 active:bg-gray-200',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                  disabled && 'cursor-not-allowed'
                )}
                aria-label="Remove item"
              >
                <Icon name="x" size="sm" colorScheme="muted" />
              </button>
            )}
          </div>

          {/* Footer: Price and Quantity */}
          <div className="flex justify-between items-center">
            <PriceDisplay price={price} currency={currency} size="md" />
            {onQuantityChange && (
              <QuantitySelector
                value={quantity}
                onChange={onQuantityChange}
                min={1}
                size="sm"
                disabled={disabled}
                section={section}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

CartItem.displayName = 'CartItem';

export default CartItem;
