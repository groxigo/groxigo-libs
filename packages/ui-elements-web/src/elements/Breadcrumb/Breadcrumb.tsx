/**
 * Breadcrumb Component (Web)
 *
 * A navigation path indicator that shows the user's current location.
 * Implements @groxigo/contracts BreadcrumbPropsBase for web platform.
 */

import React, { forwardRef, useMemo } from 'react';
import { cn } from '../../utils/cn';
import type { BreadcrumbPropsBase, BreadcrumbItem } from '@groxigo/contracts';
import { BreadcrumbItemComponent } from './BreadcrumbItem';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';

// Font size classes
const fontSizeClasses: Record<string, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export interface BreadcrumbProps extends BreadcrumbPropsBase {
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

    const gapClass = spacing
      ? `gap-[${spacing}px]`
      : 'gap-1.5';

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('flex items-center', className)}
        data-testid={testID}
        {...props}
      >
        <ol
          className={cn(
            'flex flex-wrap items-center',
            gapClass,
            fontSizeClasses[fontSize]
          )}
        >
          {displayItems.map((item, index) => {
            const isLast = index === displayItems.length - 1;
            const isCollapsed = (item as any).isCollapsed;

            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <BreadcrumbSeparator className="mx-1.5 text-text-secondary">
                    {separator}
                  </BreadcrumbSeparator>
                )}

                {isCollapsed ? (
                  <span className="text-text-secondary select-none">
                    {item.label}
                  </span>
                ) : (
                  <BreadcrumbItemComponent
                    href={item.href}
                    isCurrent={item.isCurrent ?? isLast}
                    onClick={item.onClick}
                  >
                    {item.icon && (
                      <span className="mr-1.5 flex items-center">
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
