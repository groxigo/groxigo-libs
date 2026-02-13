'use client';

import { forwardRef, useCallback, type ReactNode } from 'react';
import { Badge } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './HorizontalNav.module.css';

export interface NavItem {
  /** Unique key for the nav item */
  key: string;
  /** Display label */
  label: string;
  /** Optional icon element */
  icon?: ReactNode;
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
        aria-label="Category navigation"
      >
        <div className={styles.scrollContainer}>
          {items.map((item) => {
            const isActive = activeKey === item.key;

            return (
              <button
                key={item.key}
                type="button"
                className={clsx(
                  styles.navItem,
                  isActive && styles.navItemActive
                )}
                onClick={() => handleItemClick(item.key)}
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
                    className={styles.badge}
                    aria-label={`${item.badge} notifications`}
                  >
                    {item.badge > 99 ? '99+' : item.badge}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    );
  }
);

HorizontalNav.displayName = 'HorizontalNav';
export default HorizontalNav;
