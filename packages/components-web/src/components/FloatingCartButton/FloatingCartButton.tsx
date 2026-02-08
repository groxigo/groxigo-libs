'use client';

import { forwardRef, type ReactNode } from 'react';
import { Button, Badge } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './FloatingCartButton.module.css';
import { ShoppingCart } from '@groxigo/icons/line';

export interface FloatingCartButtonProps {
  /** Number of items in cart */
  count?: number;
  /** Custom cart icon (ReactNode) */
  icon?: ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testID?: string;
}

export const FloatingCartButton = forwardRef<HTMLDivElement, FloatingCartButtonProps>(
  ({ count, icon, onClick, className, testID }, ref) => {
    const showBadge = count !== undefined && count > 0;

    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <Button
          variant="solid"
          colorScheme="primary"
          onPress={onClick}
          aria-label={showBadge ? `Cart with ${count} items` : 'Cart'}
          className={styles.button}
        >
          <span className={styles.icon}>
            {icon ?? <ShoppingCart size={24} />}
          </span>
        </Button>
        {showBadge && (
          <Badge
            variant="solid"
            colorScheme="error"
            size="xs"
            rounded
            className={styles.badge}
            aria-hidden="true"
          >
            {count! > 99 ? '99+' : count}
          </Badge>
        )}
      </div>
    );
  }
);

FloatingCartButton.displayName = 'FloatingCartButton';
export default FloatingCartButton;
