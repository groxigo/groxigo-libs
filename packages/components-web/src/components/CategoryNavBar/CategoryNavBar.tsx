'use client';

/**
 * CategoryNavBar Component (Web)
 *
 * Horizontal scrollable category navigation with active indicator.
 * Displays icons with labels for each category.
 */

import { forwardRef, useRef, useEffect } from 'react';
import { Text, Icon, cn } from '@groxigo/ui-elements-web';
import type { IconName } from '@groxigo/contracts';

export interface CategoryNavItem {
  /**
   * Unique identifier for the category
   */
  id: string;

  /**
   * Category label
   */
  label: string;

  /**
   * Icon name
   */
  icon?: IconName;

  /**
   * Image URL (used if icon is not provided)
   */
  image?: string;

  /**
   * Link href
   */
  href?: string;
}

export interface CategoryNavBarProps {
  /**
   * List of category items
   */
  items: CategoryNavItem[];

  /**
   * ID of the active/selected category
   */
  activeId?: string;

  /**
   * Callback when a category is clicked
   */
  onSelect?: (id: string) => void;

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether to show the navigation bar as sticky
   * @default false
   */
  sticky?: boolean;

  /**
   * Whether the header has shadow/elevation
   * @default true
   */
  elevated?: boolean;

  /**
   * Background color
   */
  backgroundColor?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}

const sizeClasses = {
  sm: {
    container: 'h-14 gap-1',
    item: 'px-2 py-1.5 gap-1',
    icon: 16,
    text: 'text-xs',
  },
  md: {
    container: 'h-16 gap-2',
    item: 'px-3 py-2 gap-1.5',
    icon: 20,
    text: 'text-sm',
  },
  lg: {
    container: 'h-20 gap-3',
    item: 'px-4 py-2.5 gap-2',
    icon: 24,
    text: 'text-base',
  },
};

export const CategoryNavBar = forwardRef<HTMLDivElement, CategoryNavBarProps>(
  (
    {
      items,
      activeId,
      onSelect,
      size = 'md',
      sticky = false,
      elevated = true,
      backgroundColor,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<HTMLButtonElement>(null);
    const config = sizeClasses[size];

    // Scroll active item into view
    useEffect(() => {
      if (activeRef.current && scrollRef.current) {
        const container = scrollRef.current;
        const activeItem = activeRef.current;
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeItem.getBoundingClientRect();

        if (activeRect.left < containerRect.left || activeRect.right > containerRect.right) {
          activeItem.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
          });
        }
      }
    }, [activeId]);

    return (
      <div
        ref={ref}
        className={cn(
          'w-full bg-white',
          sticky && 'sticky top-0 z-50',
          elevated && 'shadow-sm',
          className
        )}
        style={backgroundColor ? { backgroundColor } : undefined}
        data-testid={testID}
        {...props}
      >
        <div
          ref={scrollRef}
          className={cn(
            'flex items-center overflow-x-auto scrollbar-hide',
            'px-4',
            config.container
          )}
        >
          {items.map((item) => {
            const isActive = item.id === activeId;

            return (
              <button
                key={item.id}
                ref={isActive ? activeRef : null}
                type="button"
                onClick={() => onSelect?.(item.id)}
                className={cn(
                  'flex-shrink-0 flex items-center',
                  'rounded-full whitespace-nowrap',
                  'transition-all',
                  config.item,
                  isActive
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-text-secondary hover:bg-gray-100'
                )}
                aria-pressed={isActive}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : item.icon ? (
                  <Icon
                    name={item.icon}
                    size={config.icon}
                    colorScheme={isActive ? 'primary' : 'muted'}
                  />
                ) : null}
                <Text
                  variant="bodySmall"
                  weight={isActive ? 'semibold' : 'medium'}
                  className={cn(config.text, isActive && 'text-primary-600')}
                >
                  {item.label}
                </Text>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

CategoryNavBar.displayName = 'CategoryNavBar';

export default CategoryNavBar;
