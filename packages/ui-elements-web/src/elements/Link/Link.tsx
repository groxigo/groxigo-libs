/**
 * Link Component (Web)
 *
 * Implements @groxigo/contracts LinkPropsBase for web platform.
 */

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { LinkPropsBase, LinkColorScheme, LinkSize } from '@groxigo/contracts';
import styles from './Link.module.css';

// Color scheme to CSS module classes
const colorSchemeClassMap: Record<LinkColorScheme, string> = {
  default: styles.colorDefault,
  primary: styles.colorPrimary,
  muted: styles.colorMuted,
};

// Size classes
const sizeClassMap: Record<LinkSize, string> = {
  sm: styles.sm,
  md: styles.md,
};

// Underline variant classes
const underlineClassMap: Record<string, string> = {
  always: styles.underlineAlways,
  hover: styles.underlineHover,
  none: styles.underlineNone,
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
  className?: string;
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
      size = 'md',
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

    const classes = clsx(
      styles.link,
      sizeClassMap[size],
      !disabled && colorSchemeClassMap[colorScheme],
      underlineClassMap[underlineValue],
      disabled && styles.disabled,
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
          <span className={styles.externalIcon} aria-hidden="true">
            ↗
          </span>
        )}
      </a>
    );
  }
);

Link.displayName = 'Link';

export default Link;
