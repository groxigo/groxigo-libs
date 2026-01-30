/**
 * BreadcrumbSeparator Component (Web)
 *
 * Visual separator between breadcrumb items.
 * Implements @groxigo/contracts BreadcrumbSeparatorPropsBase for web platform.
 */

import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { BreadcrumbSeparatorPropsBase } from '@groxigo/contracts';

export interface BreadcrumbSeparatorProps extends BreadcrumbSeparatorPropsBase {}

export const BreadcrumbSeparator = forwardRef<HTMLSpanElement, BreadcrumbSeparatorProps>(
  (
    {
      children = '/',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        role="presentation"
        aria-hidden="true"
        className={cn(
          'text-text-secondary select-none',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export default BreadcrumbSeparator;
