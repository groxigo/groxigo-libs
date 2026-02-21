'use client';

/**
 * Breadcrumb Component (Web)
 *
 * A navigation path indicator that shows the user's current location.
 * Implements @groxigo/contracts BreadcrumbPropsBase for web platform.
 */

import { forwardRef, useMemo } from 'react';
import { clsx } from 'clsx';
import type { BreadcrumbPropsBase, BreadcrumbItem } from '@groxigo/contracts';
import { BreadcrumbItemComponent } from './BreadcrumbItem';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';
import styles from './Breadcrumb.module.css';

// Font size class map
const fontSizeClassMap: Record<string, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
};

export interface BreadcrumbProps extends BreadcrumbPropsBase {
  className?: string;
  /** HTML nav element props */
  'aria-label'?: string;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      separator = '/',
      maxItems,
      itemsBeforeCollapse = 1,
      itemsAfterCollapse = 1,
      spacing,
      fontSize = 'md',
      className,
      testID,
      ...props
    },
    ref
  ) => {
    // Handle collapsing of items if maxItems is set
    const displayItems = useMemo((): (BreadcrumbItem & { isCollapsed?: boolean })[] => {
      if (!maxItems || items.length <= maxItems) {
        return items;
      }

      // Show first itemsBeforeCollapse items, ellipsis, and last itemsAfterCollapse items
      const before = items.slice(0, itemsBeforeCollapse);
      const after = items.slice(-itemsAfterCollapse);

      return [
        ...before,
        { label: '...', isCollapsed: true } as BreadcrumbItem & { isCollapsed: boolean },
        ...after,
      ];
    }, [items, maxItems, itemsBeforeCollapse, itemsAfterCollapse]);

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={clsx(styles.breadcrumb, className)}
        data-testid={testID}
        {...props}
      >
        <ol
          className={clsx(
            styles.list,
            fontSizeClassMap[fontSize]
          )}
          style={spacing ? { gap: `${spacing}px` } : undefined}
        >
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- displayItems includes extended BreadcrumbItem with optional isCollapsed flag
            const isCollapsed = (item as any).isCollapsed;

            return (
              <li key={index} className={styles.item}>
                {index > 0 && (
                  <BreadcrumbSeparator>
                    {separator}
                  </BreadcrumbSeparator>
                )}

                {isCollapsed ? (
                  <span className={styles.itemCollapsed}>
                    {item.label}
                  </span>
                ) : (
                  <BreadcrumbItemComponent
                    href={item.href}
                    isCurrent={item.isCurrent ?? isLast}
                    onPress={item.onPress}
                  >
                    {item.icon && (
                      <span className={styles.itemIcon}>
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </BreadcrumbItemComponent>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
