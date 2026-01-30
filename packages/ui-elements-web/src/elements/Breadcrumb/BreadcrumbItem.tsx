/**
 * BreadcrumbItem Component (Web)
 *
 * Individual breadcrumb item that can be a link or current page indicator.
 * Implements @groxigo/contracts BreadcrumbItemPropsBase for web platform.
 */

import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { BreadcrumbItemPropsBase } from '@groxigo/contracts';
import { BreadcrumbLink } from './BreadcrumbLink';

export interface BreadcrumbItemProps extends BreadcrumbItemPropsBase {}

export const BreadcrumbItemComponent = forwardRef<HTMLSpanElement, BreadcrumbItemProps>(
  (
    {
      href,
      isCurrent = false,
      children,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    if (isCurrent) {
      return (
        <span
          ref={ref}
          aria-current="page"
          className={cn(
            'font-semibold text-text-primary',
            className
          )}
          {...props}
        >
          {children}
        </span>
      );
    }

    return (
      <BreadcrumbLink
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        className={className}
        {...props}
      >
        {children}
      </BreadcrumbLink>
    );
  }
);

BreadcrumbItemComponent.displayName = 'BreadcrumbItem';

export default BreadcrumbItemComponent;
