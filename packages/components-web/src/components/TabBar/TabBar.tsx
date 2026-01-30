/**
 * TabBar Component (Web)
 *
 * Horizontal tab navigation with scrollable support.
 * Wrapper around the Tabs primitive for consistent styling.
 */

'use client';

import React, { forwardRef, useRef, useEffect, useState } from 'react';
import { cn, Text, Badge, Icon } from '@groxigo/ui-elements-web';
import type { TabItem as ContractTabItem } from '@groxigo/contracts';

export interface TabBarItem {
  /** Tab key/ID */
  key: string;
  /** Tab label */
  label: string;
  /** Tab icon name */
  icon?: string;
  /** Badge content */
  badge?: string | number;
  /** Whether tab is disabled */
  disabled?: boolean;
}

export type TabBarVariant = 'default' | 'pills' | 'underline';
export type TabBarSize = 'sm' | 'md' | 'lg';

export interface TabBarProps {
  /** Tab items */
  items: TabBarItem[];
  /** Currently selected tab key */
  selectedId?: string;
  /** Callback when tab is selected */
  onSelect?: (id: string) => void;
  /** Tab bar variant @default 'underline' */
  variant?: TabBarVariant;
  /** Tab size @default 'md' */
  size?: TabBarSize;
  /** Whether tabs should be scrollable when they overflow @default true */
  scrollable?: boolean;
  /** Whether tabs should fill the container width */
  fullWidth?: boolean;
  /** Section for theming */
  section?: 'groceries' | 'recipes' | 'default';
  /** Additional CSS class */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

const sizeClasses: Record<TabBarSize, { tab: string; text: string; icon: string }> = {
  sm: {
    tab: 'px-3 py-1.5',
    text: 'text-sm',
    icon: 'w-4 h-4',
  },
  md: {
    tab: 'px-4 py-2',
    text: 'text-base',
    icon: 'w-5 h-5',
  },
  lg: {
    tab: 'px-5 py-2.5',
    text: 'text-lg',
    icon: 'w-6 h-6',
  },
};

export const TabBar = forwardRef<HTMLDivElement, TabBarProps>(
  (
    {
      items,
      selectedId,
      onSelect,
      variant = 'underline',
      size = 'md',
      scrollable = true,
      fullWidth = false,
      section = 'default',
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showLeftScroll, setShowLeftScroll] = useState(false);
    const [showRightScroll, setShowRightScroll] = useState(false);

    const sizeConfig = sizeClasses[size];

    // Check scroll indicators
    useEffect(() => {
      const checkScroll = () => {
        if (containerRef.current && scrollable) {
          const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
          setShowLeftScroll(scrollLeft > 0);
          setShowRightScroll(scrollLeft + clientWidth < scrollWidth - 1);
        }
      };

      checkScroll();
      const container = containerRef.current;
      container?.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);

      return () => {
        container?.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }, [scrollable, items]);

    // Scroll selected tab into view
    useEffect(() => {
      if (selectedId && containerRef.current) {
        const selectedTab = containerRef.current.querySelector(
          `[data-tab-id="${selectedId}"]`
        ) as HTMLElement;
        if (selectedTab) {
          selectedTab.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
          });
        }
      }
    }, [selectedId]);

    const handleScroll = (direction: 'left' | 'right') => {
      if (containerRef.current) {
        const scrollAmount = containerRef.current.clientWidth * 0.5;
        containerRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        });
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (event: React.KeyboardEvent, currentIndex: number) => {
      let newIndex = currentIndex;

      if (event.key === 'ArrowLeft') {
        newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        while (items[newIndex]?.disabled && newIndex !== currentIndex) {
          newIndex = newIndex > 0 ? newIndex - 1 : items.length - 1;
        }
      } else if (event.key === 'ArrowRight') {
        newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        while (items[newIndex]?.disabled && newIndex !== currentIndex) {
          newIndex = newIndex < items.length - 1 ? newIndex + 1 : 0;
        }
      } else if (event.key === 'Home') {
        newIndex = 0;
        while (items[newIndex]?.disabled && newIndex < items.length - 1) {
          newIndex++;
        }
      } else if (event.key === 'End') {
        newIndex = items.length - 1;
        while (items[newIndex]?.disabled && newIndex > 0) {
          newIndex--;
        }
      }

      if (newIndex !== currentIndex && !items[newIndex]?.disabled) {
        event.preventDefault();
        onSelect?.(items[newIndex].key);
      }
    };

    const getTabClasses = (isSelected: boolean, disabled: boolean) => {
      const base = cn(
        'flex items-center gap-2 whitespace-nowrap',
        'font-medium transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        sizeConfig.tab,
        sizeConfig.text,
        fullWidth && 'flex-1 justify-center',
        disabled && 'opacity-50 cursor-not-allowed'
      );

      switch (variant) {
        case 'pills':
          return cn(
            base,
            'rounded-full',
            isSelected
              ? 'bg-primary-500 text-white'
              : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
          );
        case 'underline':
          return cn(
            base,
            'border-b-2 -mb-px',
            isSelected
              ? 'border-primary-500 text-primary-600'
              : 'border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300'
          );
        case 'default':
        default:
          return cn(
            base,
            isSelected
              ? 'text-primary-600'
              : 'text-text-secondary hover:text-text-primary'
          );
      }
    };

    return (
      <div
        ref={ref}
        className={cn('relative bg-surface-primary', className)}
        data-testid={testID}
        {...props}
      >
        {/* Left scroll button */}
        {scrollable && showLeftScroll && (
          <button
            type="button"
            aria-label="Scroll tabs left"
            onClick={() => handleScroll('left')}
            className={cn(
              'absolute left-0 top-0 bottom-0 z-10',
              'flex items-center justify-center',
              'w-8 bg-gradient-to-r from-surface-primary to-transparent',
              'text-text-secondary hover:text-text-primary',
              'focus:outline-none'
            )}
          >
            <Icon name="chevron-left" size="sm" />
          </button>
        )}

        {/* Tabs container */}
        <div
          ref={containerRef}
          role="tablist"
          aria-orientation="horizontal"
          className={cn(
            'flex',
            variant === 'underline' && 'border-b border-border-default',
            scrollable && 'overflow-x-auto scrollbar-hide',
            showLeftScroll && 'pl-8',
            showRightScroll && 'pr-8'
          )}
        >
          {items.map((item, index) => {
            const isSelected = selectedId === item.key;

            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                id={`tab-${item.key}`}
                aria-selected={isSelected}
                aria-controls={`tabpanel-${item.key}`}
                aria-disabled={item.disabled}
                tabIndex={isSelected ? 0 : -1}
                data-tab-id={item.key}
                disabled={item.disabled}
                onClick={() => !item.disabled && onSelect?.(item.key)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={getTabClasses(isSelected, !!item.disabled)}
              >
                {item.icon && (
                  <Icon name={item.icon as any} className={sizeConfig.icon} />
                )}
                <span>{item.label}</span>
                {item.badge && (
                  <Badge
                    variant={isSelected ? 'solid' : 'subtle'}
                    colorScheme={isSelected ? 'primary' : 'neutral'}
                    size="xs"
                    rounded
                  >
                    {String(item.badge)}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>

        {/* Right scroll button */}
        {scrollable && showRightScroll && (
          <button
            type="button"
            aria-label="Scroll tabs right"
            onClick={() => handleScroll('right')}
            className={cn(
              'absolute right-0 top-0 bottom-0 z-10',
              'flex items-center justify-center',
              'w-8 bg-gradient-to-l from-surface-primary to-transparent',
              'text-text-secondary hover:text-text-primary',
              'focus:outline-none'
            )}
          >
            <Icon name="chevron-right" size="sm" />
          </button>
        )}
      </div>
    );
  }
);

TabBar.displayName = 'TabBar';

export default TabBar;
