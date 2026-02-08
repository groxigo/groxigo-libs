'use client';

import { forwardRef } from 'react';
import type {
  OrderCardPropsBase,
  OrderStatus,
} from '@groxigo/contracts/components/order-card';
import { Badge, Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './OrderCard.module.css';

export type { OrderStatus };

export interface OrderCardProps extends OrderCardPropsBase {}

/** Map order status to Badge colorScheme */
const STATUS_COLOR: Record<OrderStatus, 'success' | 'error' | 'warning' | 'info'> = {
  delivered: 'success',
  cancelled: 'error',
  pending: 'warning',
  confirmed: 'info',
  processing: 'info',
  shipped: 'info',
};

/** Human-readable status labels */
const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const MAX_VISIBLE_IMAGES = 3;

export const OrderCard = forwardRef<HTMLDivElement, OrderCardProps>(
  (
    {
      orderId,
      orderNumber,
      status,
      date,
      itemCount,
      total,
      productImages = [],
      onReorder,
      onPress,
      className,
      testID,
    },
    ref
  ) => {
    const visibleImages = productImages.slice(0, MAX_VISIBLE_IMAGES);
    const overflowCount = productImages.length - MAX_VISIBLE_IMAGES;

    return (
      <div
        ref={ref}
        className={clsx(styles.root, onPress && styles.clickable, className)}
        data-testid={testID}
        data-order-id={orderId}
        onClick={onPress}
        role={onPress ? 'button' : undefined}
        tabIndex={onPress ? 0 : undefined}
        onKeyDown={
          onPress
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPress();
                }
              }
            : undefined
        }
      >
        {/* Top row: order number + status badge */}
        <div className={styles.topRow}>
          <span className={styles.orderNumber}>{orderNumber}</span>
          <Badge
            variant="subtle"
            colorScheme={STATUS_COLOR[status]}
            size="sm"
            rounded
          >
            {STATUS_LABEL[status]}
          </Badge>
        </div>

        {/* Image row: product thumbnails */}
        {productImages.length > 0 && (
          <div className={styles.imageRow}>
            {visibleImages.map((src, i) => (
              <div key={i} className={styles.thumbnail}>
                <img
                  src={src}
                  alt={`Product ${i + 1}`}
                  className={styles.thumbnailImg}
                  loading="lazy"
                />
              </div>
            ))}
            {overflowCount > 0 && (
              <span className={styles.moreCount}>+{overflowCount} more</span>
            )}
          </div>
        )}

        {/* Details row: date, items, total */}
        <div className={styles.detailsRow}>
          <div className={styles.leftDetails}>
            <span className={styles.date}>{date}</span>
            <span className={styles.itemCount}>
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <span className={styles.total}>{total}</span>
        </div>

        {/* Action row: reorder button */}
        {onReorder && (
          <div className={styles.actionRow}>
            <Button
              variant="outline"
              colorScheme="primary"
              size="sm"
              onPress={(e?: unknown) => {
                if (e && typeof e === 'object' && 'stopPropagation' in e) {
                  (e as React.MouseEvent).stopPropagation();
                }
                onReorder();
              }}
            >
              Reorder
            </Button>
          </div>
        )}
      </div>
    );
  }
);

OrderCard.displayName = 'OrderCard';
export default OrderCard;
