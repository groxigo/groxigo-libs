'use client';

/**
 * BreadcrumbSeparator Component (Web)
 *
 * Visual separator between breadcrumb items.
 * Implements @groxigo/contracts BreadcrumbSeparatorPropsBase for web platform.
 */

import { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { BreadcrumbSeparatorPropsBase } from '@groxigo/contracts';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbSeparatorProps extends BreadcrumbSeparatorPropsBase {
  className?: string;
}

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
        className={clsx(styles.separator, className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export default BreadcrumbSeparator;
