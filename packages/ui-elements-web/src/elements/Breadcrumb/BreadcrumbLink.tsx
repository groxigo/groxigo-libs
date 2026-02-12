/**
 * BreadcrumbLink Component (Web)
 *
 * A clickable link element within a breadcrumb trail.
 */

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import styles from './Breadcrumb.module.css';

export interface BreadcrumbLinkProps {
  /** Link destination */
  href?: string;
  /** Link children */
  children?: React.ReactNode;
  /** Press handler */
  onPress?: () => void;
  /** Additional CSS class */
  className?: string;
}

export const BreadcrumbLink = forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  (
    {
      href,
      children,
      onPress,
      className,
      ...props
    },
    ref
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onPress) {
        e.preventDefault();
        onPress();
      }
    };

    return (
      <a
        ref={ref}
        href={href || '#'}
        onClick={onPress ? handleClick : undefined}
        className={clsx(styles.link, className)}
        {...props}
      >
        {children}
      </a>
    );
  }
);

BreadcrumbLink.displayName = 'BreadcrumbLink';

export default BreadcrumbLink;
