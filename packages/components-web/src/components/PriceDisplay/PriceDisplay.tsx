'use client';

import { forwardRef } from 'react';
import type { PriceDisplayPropsBase } from '@groxigo/contracts/components';
import { Badge } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './PriceDisplay.module.css';

export interface PriceDisplayProps extends PriceDisplayPropsBase {}

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '\u20AC',
  GBP: '\u00A3',
  INR: '\u20B9',
  PKR: 'Rs',
  BDT: '\u09F3',
  NPR: 'Rs',
  LKR: 'Rs',
  AED: 'AED',
};

function formatPrice(value: number | string, currency: string, showCurrency: boolean): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return String(value);
  const symbol = showCurrency ? (CURRENCY_SYMBOLS[currency] ?? currency) : '';
  return `${symbol}${numValue.toFixed(2)}`;
}

const PRICE_SIZE_CLASS: Record<string, string> = {
  sm: styles.priceSm,
  md: styles.priceMd,
  lg: styles.priceLg,
  xl: styles.priceXl,
};

const ORIGINAL_PRICE_SIZE_CLASS: Record<string, string> = {
  sm: styles.originalPriceSm,
  md: styles.originalPriceMd,
  lg: styles.originalPriceLg,
  xl: styles.originalPriceXl,
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
    },
    ref
  ) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    const numOriginal = originalPrice != null
      ? (typeof originalPrice === 'string' ? parseFloat(originalPrice) : originalPrice)
      : undefined;

    const hasDiscount =
      numOriginal != null && !isNaN(numOriginal) && !isNaN(numPrice) && numOriginal > numPrice;

    const discountPercent = hasDiscount
      ? Math.round((1 - numPrice / numOriginal!) * 100)
      : 0;

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <span className={clsx(styles.price, PRICE_SIZE_CLASS[size])}>
          {formatPrice(price, currency, showCurrency)}
        </span>

        {hasDiscount && (
          <span className={clsx(styles.originalPrice, ORIGINAL_PRICE_SIZE_CLASS[size])}>
            {formatPrice(originalPrice!, currency, showCurrency)}
          </span>
        )}

        {hasDiscount && discountPercent > 0 && (
          <Badge variant="subtle" colorScheme="success" size="xs">
            {discountPercent}%
          </Badge>
        )}
      </div>
    );
  }
);

PriceDisplay.displayName = 'PriceDisplay';
export default PriceDisplay;
