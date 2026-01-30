/**
 * AvatarGroup Component (Web)
 *
 * Displays multiple avatars in a stacked/overlapping layout.
 * Shows a +N indicator when there are more avatars than the max.
 */

import React, { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { cn } from '../../utils/cn';
import type { AvatarGroupPropsBase, AvatarSize } from '@groxigo/contracts';

// Size configuration for avatar group
const sizeClasses: Record<AvatarSize, { container: string; text: string; countBadge: string }> = {
  xs: { container: 'h-6 w-6', text: 'text-[10px]', countBadge: 'h-6 min-w-6' },
  sm: { container: 'h-8 w-8', text: 'text-xs', countBadge: 'h-8 min-w-8' },
  md: { container: 'h-10 w-10', text: 'text-sm', countBadge: 'h-10 min-w-10' },
  lg: { container: 'h-12 w-12', text: 'text-base', countBadge: 'h-12 min-w-12' },
  xl: { container: 'h-16 w-16', text: 'text-xl', countBadge: 'h-16 min-w-16' },
  '2xl': { container: 'h-20 w-20', text: 'text-2xl', countBadge: 'h-20 min-w-20' },
};

// Default spacing (negative for overlap) per size
const defaultSpacing: Record<AvatarSize, number> = {
  xs: -6,
  sm: -8,
  md: -10,
  lg: -12,
  xl: -16,
  '2xl': -20,
};

export interface AvatarGroupProps extends AvatarGroupPropsBase {
  /** Click handler for the +N badge */
  onExcessClick?: () => void;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      max = 4,
      size = 'md',
      spacing,
      children,
      className,
      onExcessClick,
    },
    ref
  ) => {
    const childArray = Children.toArray(children).filter(isValidElement);
    const totalCount = childArray.length;
    const visibleAvatars = childArray.slice(0, max);
    const excessCount = totalCount - max;

    // Calculate margin for overlap
    const marginLeft = spacing ?? defaultSpacing[size];
    const sizeConfig = sizeClasses[size];

    const containerClasses = cn(
      'flex items-center',
      className
    );

    const countBadgeClasses = cn(
      'inline-flex items-center justify-center rounded-full',
      'bg-surface-tertiary text-text-secondary font-semibold',
      'border-2 border-white',
      sizeConfig.countBadge,
      sizeConfig.text,
      onExcessClick && 'cursor-pointer hover:bg-surface-secondary transition-colors'
    );

    return (
      <div ref={ref} className={containerClasses}>
        {visibleAvatars.map((child, index) => {
          if (!isValidElement(child)) return null;

          // Clone child with proper sizing and overlap styling
          return (
            <div
              key={index}
              className="relative"
              style={{
                marginLeft: index === 0 ? 0 : marginLeft,
                zIndex: visibleAvatars.length - index,
              }}
            >
              {cloneElement(child as React.ReactElement<any>, {
                size,
                className: cn(
                  'border-2 border-white',
                  (child as React.ReactElement<any>).props.className
                ),
              })}
            </div>
          );
        })}

        {excessCount > 0 && (
          <div
            className="relative"
            style={{
              marginLeft,
              zIndex: 0,
            }}
          >
            <span
              className={countBadgeClasses}
              onClick={onExcessClick}
              role={onExcessClick ? 'button' : undefined}
              tabIndex={onExcessClick ? 0 : undefined}
              onKeyDown={onExcessClick ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onExcessClick();
                }
              } : undefined}
              aria-label={`${excessCount} more users`}
            >
              +{excessCount}
            </span>
          </div>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = 'AvatarGroup';

export default AvatarGroup;
