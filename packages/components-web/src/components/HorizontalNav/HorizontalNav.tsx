'use client';

import { forwardRef, useCallback } from 'react';
import { Button, Badge } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './HorizontalNav.module.css';

export interface NavItem {
  /** Unique key for the nav item */
  key: string;
  /** Display label */
  label: string;
  /** Optional icon (emoji, character, or image URL) */
  icon?: string;
  /** Optional badge count */
  badge?: number;
}

export interface HorizontalNavProps {
  /** Navigation items */
  items: NavItem[];
  /** Currently active item key */
  activeKey?: string;
  /** Callback when an item is selected */
  onSelect?: (key: string) => void;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testID?: string;
}

export const HorizontalNav = forwardRef<HTMLElement, HorizontalNavProps>(
  ({ items, activeKey, onSelect, className, testID }, ref) => {
    const handleItemClick = useCallback(
      (key: string) => {
        onSelect?.(key);
      },
      [onSelect]
    );

    return (
      <nav
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
        aria-label="Horizontal navigation"
      >
        <div className={styles.scrollContainer}>
          {items.map((item) => {
            const isActive = activeKey === item.key;

            return (
              <Button
                key={item.key}
                variant={isActive ? 'solid' : 'ghost'}
                colorScheme="primary"
                size="sm"
                onPress={() => handleItemClick(item.key)}
                className={clsx(
                  styles.navItem,
                  isActive ? styles.navItemActive : styles.navItemInactive
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.icon && (
                  <span className={styles.iconWrapper} aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span className={styles.label}>{item.label}</span>
                {item.badge != null && item.badge > 0 && (
                  <Badge
                    variant="solid"
                    colorScheme="error"
                    size="xs"
                    rounded
                    aria-label={`${item.badge} notifications`}
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </nav>
    );
  }
);

HorizontalNav.displayName = 'HorizontalNav';
export default HorizontalNav;
