'use client';

import { forwardRef } from 'react';
import type { DeliveryInfoCardPropsBase } from '@groxigo/contracts/components/delivery-info-card';
import { Badge } from '@groxigo/ui-elements-web';
import { Truck } from '@groxigo/icons/line';
import clsx from 'clsx';
import styles from './DeliveryInfoCard.module.css';

export interface DeliveryInfoCardProps extends DeliveryInfoCardPropsBase {
  className?: string;
}

export const DeliveryInfoCard = forwardRef<HTMLDivElement, DeliveryInfoCardProps>(
  (
    {
      estimatedTime,
      itemCount,
      deliveryFee,
      freeDeliveryThreshold,
      onChange,
      className,
      testID,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        {/* Delivery truck icon */}
        <div className={styles.iconWrapper} aria-hidden="true">
          <Truck size={24} />
        </div>

        {/* Content area */}
        <div className={styles.content}>
          {/* Top row: delivery time + badge */}
          <div className={styles.topRow}>
            {estimatedTime && (
              <>
                <span className={styles.deliveryLabel}>Delivery in</span>
                <Badge
                  variant="solid"
                  colorScheme="success"
                  size="md"
                >
                  {estimatedTime}
                </Badge>
              </>
            )}
          </div>

          {/* Bottom row: item count + delivery fee */}
          <div className={styles.bottomRow}>
            {itemCount != null && (
              <span className={styles.infoText}>
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </span>
            )}
            {deliveryFee && (
              <span className={styles.feeText}>
                Delivery: {deliveryFee}
              </span>
            )}
          </div>

          {/* Free delivery threshold info */}
          {freeDeliveryThreshold && (
            <div className={styles.thresholdRow}>
              <span className={styles.thresholdText}>
                Free delivery on orders over {freeDeliveryThreshold}
              </span>
            </div>
          )}
        </div>

        {/* Change action */}
        {onChange && (
          <button
            type="button"
            className={styles.changeButton}
            onClick={onChange}
          >
            Change
          </button>
        )}
      </div>
    );
  }
);

DeliveryInfoCard.displayName = 'DeliveryInfoCard';
export default DeliveryInfoCard;
