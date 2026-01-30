/**
 * SectionHeader Component (Web)
 *
 * Displays a section title with optional icon and "See All" action.
 * Used for consistent section headers across the app.
 */

'use client';

import React, { forwardRef } from 'react';
import { Text, Icon, cn } from '@groxigo/ui-elements-web';
import type { SectionHeaderPropsBase } from '@groxigo/contracts';

export interface SectionHeaderProps extends SectionHeaderPropsBase {}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      title,
      titleVariant = 'h3',
      subtitle,
      icon,
      iconColor,
      showSeeAll = false,
      seeAllText = 'See all',
      onSeeAllPress,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex justify-between items-center px-4 mb-2',
          className
        )}
        data-testid={testID}
        {...props}
      >
        <div className="flex items-center gap-2 flex-1">
          {icon && (
            <Icon
              name={icon as any}
              size="md"
              className={iconColor ? '' : 'text-primary'}
            />
          )}
          <div>
            <Text variant={titleVariant as any} weight="semibold">
              {title}
            </Text>
            {subtitle && (
              <Text variant="bodySmall" colorScheme="muted" className="mt-0.5">
                {subtitle}
              </Text>
            )}
          </div>
        </div>

        {showSeeAll && onSeeAllPress && (
          <button
            onClick={onSeeAllPress}
            className="flex items-center gap-1 text-primary font-medium text-sm hover:underline"
          >
            <span>{seeAllText}</span>
            <Icon name="chevron-right" size="sm" className="text-primary" />
          </button>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
