/**
 * BottomNav Component (Web)
 *
 * Bottom navigation bar for mobile web.
 * Implements @groxigo/contracts BottomNavPropsBase.
 */

'use client';

import React, { forwardRef } from 'react';
import { cn, Text, Icon, Badge } from '@groxigo/ui-elements-web';
import type {
  BottomNavPropsBase,
  BottomNavItem,
  BottomNavVariant,
  BottomNavActiveIndicator,
} from '@groxigo/contracts';

export interface BottomNavProps extends BottomNavPropsBase {}

export const BottomNav = forwardRef<HTMLElement, BottomNavProps>(
  (
    {
      items,
      selectedId,
      onSelect,
      section = 'default',
      variant = 'default',
      activeIndicator = 'highlight',
      activeColor,
      inactiveColor,
      highlightColor,
      backgroundColor,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    // Default colors - use Tailwind color values
    const defaultActiveColor = 'var(--color-primary-500, #22c55e)';
    const defaultInactiveColor = 'var(--color-text-tertiary, #9ca3af)';
    const defaultHighlightColor = 'var(--color-primary-100, #dcfce7)';

    const colors = {
      active: activeColor || defaultActiveColor,
      inactive: inactiveColor || defaultInactiveColor,
      highlight: highlightColor || defaultHighlightColor,
    };

    if (variant === 'floating') {
      return (
        <nav
          ref={ref}
          role="navigation"
          aria-label="Bottom navigation"
          className={cn('flex justify-center px-6', className)}
          data-testid={testID}
          {...props}
        >
          <div
            className={cn(
              'flex items-center rounded-full border border-white/60',
              'shadow-lg backdrop-blur-xl',
              'px-3 py-1'
            )}
            style={{
              backgroundColor: backgroundColor || 'rgba(255, 255, 255, 0.85)',
            }}
          >
            {items.map((item) => {
              const isSelected = selectedId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={item.label}
                  onClick={() => onSelect?.(item.id)}
                  className={cn(
                    'flex flex-col items-center justify-center',
                    'px-3.5 py-0.5',
                    'transition-all duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                    'hover:opacity-80'
                  )}
                >
                  <div className="relative w-10 h-6 flex items-center justify-center">
                    {/* Active highlight background */}
                    {isSelected && activeIndicator === 'highlight' && (
                      <div
                        className="absolute inset-0 rounded-xl"
                        style={{ backgroundColor: colors.highlight }}
                      />
                    )}
                    <Icon
                      name={item.icon as any}
                      size="sm"
                      color={isSelected ? colors.active : colors.inactive}
                      className="relative z-10"
                    />
                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute -top-1.5 -right-1.5 z-20">
                        <Badge variant="solid" colorScheme="error" size="xs" rounded>
                          {String(item.badge)}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <Text
                    variant="caption"
                    weight={isSelected ? 'semibold' : 'medium'}
                    color={isSelected ? colors.active : colors.inactive}
                    className="-mt-0.5 text-[10px]"
                  >
                    {item.label}
                  </Text>
                </button>
              );
            })}
          </div>
        </nav>
      );
    }

    // Default variant
    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Bottom navigation"
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50',
          'flex items-center justify-around',
          'bg-surface-primary border-t border-border-default',
          'shadow-[0_-2px_4px_rgba(0,0,0,0.1)]',
          'py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]',
          className
        )}
        data-testid={testID}
        {...props}
      >
        {items.map((item) => {
          const isSelected = selectedId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-label={item.label}
              onClick={() => onSelect?.(item.id)}
              className={cn(
                'flex flex-col items-center justify-center',
                'flex-1 py-1 gap-1',
                'transition-colors duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500',
                'hover:opacity-80 active:opacity-60'
              )}
            >
              <div className="relative">
                <Icon
                  name={item.icon as any}
                  size="md"
                  color={isSelected ? colors.active : colors.inactive}
                />
                {/* Badge */}
                {item.badge && (
                  <div className="absolute -top-1 -right-1">
                    <Badge variant="solid" colorScheme="error" size="xs" rounded>
                      {String(item.badge)}
                    </Badge>
                  </div>
                )}
              </div>
              <Text
                variant="caption"
                weight={isSelected ? 'semibold' : 'normal'}
                color={isSelected ? colors.active : colors.inactive}
              >
                {item.label}
              </Text>
            </button>
          );
        })}
      </nav>
    );
  }
);

BottomNav.displayName = 'BottomNav';

export default BottomNav;
