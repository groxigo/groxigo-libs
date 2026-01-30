/**
 * PriceDisplay Component (Web)
 *
 * Displays formatted price with currency and optional discount.
 * Implements @groxigo/contracts PriceDisplayPropsBase.
 */

'use client';

import React, { forwardRef } from 'react';
import { Text, cn } from '@groxigo/ui-elements-web';
import type { PriceDisplayPropsBase } from '@groxigo/contracts';

const sizeClasses: Record<string, { variant: 'bodySmall' | 'body' | 'h4' | 'h3' }> = {
  sm: { variant: 'bodySmall' },
  md: { variant: 'body' },
  lg: { variant: 'h4' },
  xl: { variant: 'h3' },
};

const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '\u20AC',
  GBP: '\u00A3',
  INR: '\u20B9',
  JPY: '\u00A5',
};

export interface PriceDisplayProps extends PriceDisplayPropsBase {}

/**
 * Format a price value to 2 decimal places
 */
const formatPrice = (value: number | string): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return '0.00';
  return numValue.toFixed(2);
};

/**
 * Get the currency symbol for a currency code
 */
const getCurrencySymbol = (code: string): string => {
  return currencySymbols[code] || code;
};

export const PriceDisplay = forwardRef<HTMLDivElement, PriceDisplayProps>(
  (
    {
      price,
      currency = 'USD',
      originalPrice,
      size = 'md',
      showCurrency = true,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeClasses[size];
    const currencySymbol = getCurrencySymbol(currency);
    const formattedPrice = formatPrice(price);
    const formattedOriginalPrice = originalPrice ? formatPrice(originalPrice) : null;
    const hasDiscount = originalPrice && parseFloat(String(originalPrice)) > parseFloat(String(price));

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        data-testid={testID}
        {...props}
      >
        {hasDiscount && formattedOriginalPrice && (
          <Text
            variant={sizeConfig.variant}
            colorScheme="muted"
            className="line-through"
          >
            {showCurrency && currencySymbol}
            {formattedOriginalPrice}
          </Text>
        )}
        <Text
          variant={sizeConfig.variant}
          weight="semibold"
          colorScheme={hasDiscount ? 'error' : 'default'}
        >
          {showCurrency && currencySymbol}
          {formattedPrice}
        </Text>
      </div>
    );
  }
);

PriceDisplay.displayName = 'PriceDisplay';

export default PriceDisplay;
