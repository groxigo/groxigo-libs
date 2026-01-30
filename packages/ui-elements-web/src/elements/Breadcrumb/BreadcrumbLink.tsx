/**
 * BreadcrumbLink Component (Web)
 *
 * A clickable link element within a breadcrumb trail.
 */

import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface BreadcrumbLinkProps {
  /** Link destination */
  href?: string;
  /** Link children */
  children?: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
}

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  (
    {
      href,
      children,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        e.preventDefault();
        onClick();
      }
    };

    return (
      <a
        ref={ref}
        href={href || '#'}
        onClick={onClick ? handleClick : undefined}
        className={cn(
          'text-primary-600 hover:text-primary-700 hover:underline',
          'transition-colors duration-150',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 rounded-sm',
          className
        )}
        {...props}
      >
        {children}
      </a>
    );
  }
);

BreadcrumbLink.displayName = 'BreadcrumbLink';

export default BreadcrumbLink;
