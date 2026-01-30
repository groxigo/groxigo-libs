/**
 * Link Component (Web)
 *
 * Implements @groxigo/contracts LinkPropsBase for web platform.
 */

import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { LinkPropsBase, LinkColorScheme } from '@groxigo/contracts';

// Color scheme to Tailwind classes
const colorSchemeClasses: Record<LinkColorScheme, string> = {
  default: 'text-text-primary',
  primary: 'text-primary-600 hover:text-primary-700',
  secondary: 'text-secondary-600 hover:text-secondary-700',
  accent: 'text-accent-600 hover:text-accent-700',
  muted: 'text-text-secondary hover:text-text-primary',
};

// Underline variant classes
const underlineClasses: Record<string, string> = {
  always: 'underline',
  hover: 'no-underline hover:underline',
  none: 'no-underline',
};

/**
 * Check if a URL is external (different origin)
 */
function isExternalUrl(href: string): boolean {
  if (!href) return false;
  // URLs starting with http:// or https:// that don't match current origin
  if (href.startsWith('http://') || href.startsWith('https://')) {
    try {
      const url = new URL(href);
      return url.origin !== window.location.origin;
    } catch {
      return false;
    }
  }
  // mailto:, tel:, etc. are not considered external in the navigation sense
  return false;
}

export interface LinkProps extends LinkPropsBase {
  /** HTML anchor target */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** HTML anchor rel */
  rel?: string;
  /** Click handler (alias for onPress) */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      href,
      isExternal,
      colorScheme = 'primary',
      underline = true,
      disabled = false,
      children,
      className,
      testID,
      onPress,
      onClick,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    // Determine if link should open externally
    const shouldOpenExternal = isExternal ?? (href ? isExternalUrl(href) : false);

    // Compute target and rel for external links
    const computedTarget = target ?? (shouldOpenExternal ? '_blank' : undefined);
    const computedRel = rel ?? (shouldOpenExternal ? 'noopener noreferrer' : undefined);

    // Normalize underline prop
    const underlineValue =
      typeof underline === 'boolean'
        ? underline
          ? 'always'
          : 'none'
        : underline;

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onPress?.();
      onClick?.(event);
    };

    const classes = cn(
      'inline transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 rounded-sm',
      colorSchemeClasses[colorScheme],
      underlineClasses[underlineValue],
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      className
    );

    return (
      <a
        ref={ref}
        href={disabled ? undefined : href}
        target={computedTarget}
        rel={computedRel}
        className={classes}
        onClick={handleClick}
        aria-disabled={disabled || undefined}
        data-testid={testID}
        {...props}
      >
        {children}
        {shouldOpenExternal && (
          <span className="inline-block ml-1 text-xs" aria-hidden="true">
            ↗
          </span>
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';

export default Link;
