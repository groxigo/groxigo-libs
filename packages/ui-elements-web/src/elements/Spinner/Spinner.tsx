/**
 * Spinner Component (Web)
 */

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import type { SpinnerPropsBase } from '@groxigo/contracts';
import styles from './Spinner.module.css';

export interface SpinnerProps extends SpinnerPropsBase {
  className?: string;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      color,
      label = 'Loading...',
      className,
      testID,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={clsx(styles.wrapper, className)}
        data-testid={testID}
        {...props}
      >
        <svg
          className={clsx(
            styles.spinner,
            styles[size],
            !color && styles.primary
          )}
          style={color ? { color } : undefined}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className={styles.trackCircle}
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className={styles.arcPath}
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span className={styles.srOnly}>{label}</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

export default Spinner;
