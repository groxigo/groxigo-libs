'use client';

import { forwardRef } from 'react';
import type { FloatingCartButtonPropsBase } from '@groxigo/contracts/components';
import { Button, Badge } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './FloatingCartButton.module.css';
import { ShoppingCart } from '@groxigo/icons/line';

export interface FloatingCartButtonProps extends FloatingCartButtonPropsBase {
  className?: string;
}

export const FloatingCartButton = forwardRef<HTMLDivElement, FloatingCartButtonProps>(
  ({ count, icon, onPress, className, testID }, ref) => {
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
          onPress={onPress}
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
