'use client';

import { forwardRef } from 'react';
import type {
  PaymentMethodCardPropsBase,
  CardBrand,
} from '@groxigo/contracts/components/payment-method-card';
import { Radio } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './PaymentMethodCard.module.css';

export type { CardBrand };

export interface PaymentMethodCardProps extends PaymentMethodCardPropsBase {
  className?: string;
}

const BRAND_LABELS: Record<CardBrand, string> = {
  visa: 'VISA',
  mastercard: 'MC',
  amex: 'AMEX',
  discover: 'DISC',
  other: 'CARD',
};

export const PaymentMethodCard = forwardRef<HTMLDivElement, PaymentMethodCardProps>(
  (
    {
      id,
      brand,
      lastFour,
      expiry,
      selected = false,
      isDefault = false,
      onSelect,
      onDelete,
      className,
      testID,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.root,
          selected ? styles.rootSelected : styles.rootDefault,
          className
        )}
        data-testid={testID}
        data-payment-id={id}
      >
        {/* Radio button */}
        {onSelect && (
          <Radio
            value={id}
            size="md"
            checked={selected}
            className={styles.radio}
            onSelect={onSelect}
            aria-label={`Select ${BRAND_LABELS[brand]} ending in ${lastFour}`}
          />
        )}

        {/* Brand icon placeholder */}
        <div className={styles.cardIcon} aria-hidden="true">
          <span className={styles.brandText}>{BRAND_LABELS[brand]}</span>
        </div>

        {/* Card info */}
        <div className={styles.content}>
          <span className={styles.cardNumber}>
            {'•••• •••• •••• '}
            {lastFour}
          </span>
          <span className={styles.expiry}>Expires {expiry}</span>
        </div>

        {/* Default badge */}
        {isDefault && (
          <span className={styles.badge}>Default</span>
        )}

        {/* Delete button */}
        {onDelete && (
          <button
            className={styles.deleteButton}
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            aria-label={`Delete card ending in ${lastFour}`}
          >
            &times;
          </button>
        )}
      </div>
    );
  }
);

PaymentMethodCard.displayName = 'PaymentMethodCard';
export default PaymentMethodCard;
