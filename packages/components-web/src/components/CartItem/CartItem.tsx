'use client';

import { forwardRef, useCallback } from 'react';
import type { CartItemPropsBase } from '@groxigo/contracts/components/cart-item';
import clsx from 'clsx';
import styles from './CartItem.module.css';
import { QuantityStepper } from '../QuantityStepper';
import { Times } from '@groxigo/icons/line';

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

function formatPrice(value: number | string, currency: string): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return String(value);
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;
  return `${symbol}${numValue.toFixed(2)}`;
}

export interface CartItemProps extends CartItemPropsBase {
  className?: string;
}

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
      section,
      className,
      testID,
    },
    ref
  ) => {
    const handleRemove = useCallback(() => {
      if (disabled || !onRemove) return;
      onRemove();
    }, [disabled, onRemove]);

    return (
      <div
        ref={ref}
        className={clsx(styles.root, disabled && styles.disabled, className)}
        data-testid={testID}
        data-section={section}
      >
        {/* ── Product image ── */}
        <div className={styles.imageWrapper}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className={styles.image}
              loading="lazy"
            />
          ) : (
            <div className={styles.imagePlaceholder} />
          )}
        </div>

        {/* ── Content section ── */}
        <div className={styles.content}>
          {/* Top row: title + remove button */}
          <div className={styles.topRow}>
            <span className={styles.title}>{title}</span>
            {onRemove && (
              <button
                type="button"
                className={styles.removeButton}
                onClick={handleRemove}
                disabled={disabled}
                aria-label="Remove item"
              >
                <Times size={20} />
              </button>
            )}
          </div>

          {/* Description / weight */}
          {description && (
            <span className={styles.description}>{description}</span>
          )}

          {/* Spacer to push bottom row down */}
          <div className={styles.spacer} />

          {/* Bottom row: quantity stepper + price */}
          <div className={styles.bottomRow}>
            <QuantityStepper
              value={quantity}
              onChange={onQuantityChange}
              min={1}
              disabled={disabled}
            />
            <span className={styles.price}>
              {formatPrice(price, currency)}
            </span>
          </div>
        </div>
      </div>
    );
  }
);

CartItem.displayName = 'CartItem';
export default CartItem;
