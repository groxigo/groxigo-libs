/**
 * Header Component (Web)
 *
 * App header with navigation and actions.
 * Implements @groxigo/contracts HeaderPropsBase.
 */

'use client';

import React, { forwardRef } from 'react';
import { cn, Text } from '@groxigo/ui-elements-web';
import type { HeaderPropsBase, HeaderSection } from '@groxigo/contracts';

const sectionClasses: Record<HeaderSection, string> = {
  default: 'bg-surface-primary',
  groceries: 'bg-primary-50',
  recipes: 'bg-secondary-50',
};

export interface HeaderProps extends HeaderPropsBase {
  /** Custom title element (takes precedence over title string) */
  titleElement?: React.ReactNode;
  /** Whether header should be sticky positioned */
  sticky?: boolean;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    {
      title,
      titleElement,
      leftAction,
      rightActions,
      elevated = true,
      sticky = false,
      section = 'default',
      className,
      testID,
      ...props
    },
    ref
  ) => {
    return (
      <header
        ref={ref}
        role="banner"
        className={cn(
          'flex items-center justify-between h-14 px-4 transition-shadow',
          sectionClasses[section],
          elevated && 'shadow-sm border-b border-border-default',
          sticky && 'sticky top-0 z-50',
          className
        )}
        data-testid={testID}
        {...props}
      >
        {/* Left section */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {leftAction && (
            <div className="flex-shrink-0" aria-label="Navigation">
              {leftAction}
            </div>
          )}
          {titleElement ? (
            <div className="truncate">{titleElement}</div>
          ) : title ? (
            <Text
              variant="h4"
              weight="semibold"
              className="truncate text-text-primary"
            >
              {title}
            </Text>
          ) : null}
        </div>

        {/* Right section */}
        {rightActions && rightActions.length > 0 && (
          <nav
            className="flex items-center gap-2 flex-shrink-0"
            aria-label="Header actions"
          >
            {rightActions.map((action, index) => (
              <div key={index}>{action}</div>
            ))}
          </nav>
        )}
      </header>
    );
  }
);

Header.displayName = 'Header';

export default Header;
