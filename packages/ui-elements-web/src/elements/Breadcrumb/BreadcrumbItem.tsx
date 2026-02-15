'use client';

/**
 * BreadcrumbItem Component (Web)
 *
 * Individual breadcrumb item that can be a link or current page indicator.
 * Implements @groxigo/contracts BreadcrumbItemPropsBase for web platform.
 */

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { BreadcrumbItemPropsBase } from '@groxigo/contracts';
import { BreadcrumbLink } from './BreadcrumbLink';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbItemProps extends BreadcrumbItemPropsBase {
  className?: string;
}

export const BreadcrumbItemComponent = forwardRef<HTMLSpanElement, BreadcrumbItemProps>(
  (
    {
      href,
      isCurrent = false,
      children,
      onPress,
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
          className={clsx(
            styles.itemCurrent,
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
        onPress={onPress}
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
