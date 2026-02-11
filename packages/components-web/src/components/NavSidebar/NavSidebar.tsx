'use client';

import { forwardRef, useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import { AngleDown, AngleRight } from '@groxigo/icons/line';
import { Badge } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './NavSidebar.module.css';

export interface SidebarNavItem {
  /** Unique key for the nav item */
  key: string;
  /** Display label */
  label: string;
  /** Optional icon (emoji, character, or React element) */
  icon?: ReactNode;
  /** Optional badge count */
  badge?: number;
  /** Optional nested children */
  children?: SidebarNavItem[];
}

export interface NavSidebarProps {
  /** Navigation items */
  items: SidebarNavItem[];
  /** Currently active item key */
  activeKey?: string;
  /** Callback when an item is selected */
  onSelect?: (key: string) => void;
  /** Whether sidebar is collapsed (icon only) */
  collapsed?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testID?: string;
}


export const NavSidebar = forwardRef<HTMLElement, NavSidebarProps>(
  (
    {
      items,
      activeKey,
      onSelect,
      collapsed = false,
      className,
      testID,
    },
    ref
  ) => {
    const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

    const handleItemClick = useCallback(
      (key: string, hasChildren: boolean) => {
        if (hasChildren) {
          setExpandedKeys((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
              next.delete(key);
            } else {
              next.add(key);
            }
            return next;
          });
        }
        onSelect?.(key);
      },
      [onSelect]
    );

    const renderItem = (item: SidebarNavItem, depth: number = 0) => {
      const isActive = activeKey === item.key;
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedKeys.has(item.key);

      return (
        <div key={item.key} className={styles.itemGroup}>
          <button
            type="button"
            onClick={() => handleItemClick(item.key, !!hasChildren)}
            className={clsx(
              styles.navItem,
              isActive && styles.navItemActive,
              !isActive && styles.navItemInactive,
              depth > 0 && styles.navItemNested
            )}
            aria-current={isActive ? 'page' : undefined}
            aria-expanded={hasChildren ? isExpanded : undefined}
            aria-label={collapsed ? item.label : undefined}
          >
            {isActive && <span className={styles.activeIndicator} aria-hidden="true" />}

            {item.icon && (
              <span className={styles.iconWrapper} aria-hidden="true">
                {item.icon}
              </span>
            )}

            {!collapsed && (
              <>
                <span className={styles.label}>{item.label}</span>

                {item.badge != null && item.badge > 0 && (
                  <Badge variant="solid" colorScheme="error" size="xs" rounded>
                    {item.badge > 99 ? '99+' : item.badge}
                  </Badge>
                )}

                {hasChildren && (
                  <span className={styles.chevron}>
                    {isExpanded ? <AngleDown size={16} /> : <AngleRight size={16} />}
                  </span>
                )}
              </>
            )}
          </button>

          {hasChildren && isExpanded && !collapsed && (
            <div className={styles.children}>
              {item.children!.map((child) => renderItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    };

    return (
      <aside
        ref={ref}
        className={clsx(
          styles.root,
          collapsed && styles.rootCollapsed,
          className
        )}
        data-testid={testID}
        aria-label="Sidebar navigation"
      >
        <nav className={styles.navList}>
          {items.map((item) => renderItem(item))}
        </nav>
      </aside>
    );
  }
);

NavSidebar.displayName = 'NavSidebar';
export default NavSidebar;
