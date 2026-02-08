'use client';

import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { Button } from '@groxigo/ui-elements-web';
import clsx from 'clsx';
import styles from './StickyBottomBar.module.css';

export interface StickyBottomBarProps {
  /** Layout variant */
  variant?: 'singleAction' | 'withPrice';
  /** Price label, e.g. "Total" (withPrice variant) */
  label?: string;
  /** Formatted price string, e.g. "$4.99" (withPrice variant) */
  price?: string;
  /** Button text */
  buttonText?: string;
  /** Button press handler */
  onButtonPress?: () => void;
  /** Show loading spinner on the button */
  isLoading?: boolean;
  /** Additional CSS class */
  className?: string;
  /** Test ID for testing */
  testID?: string;
  /** Custom content — replaces the default button rendering */
  children?: ReactNode;
}

/**
 * StickyBottomBar -- a sticky bar pinned to the bottom of the viewport.
 *
 * Variants:
 * - **singleAction**: one full-width CTA button
 * - **withPrice**: price info on the left, button on the right
 *
 * Pass `children` to fully override the default button rendering.
 */
export const StickyBottomBar = forwardRef<HTMLDivElement, StickyBottomBarProps>(
  (
    {
      variant = 'singleAction',
      label,
      price,
      buttonText = 'Continue',
      onButtonPress,
      isLoading = false,
      className,
      testID,
      children,
    },
    ref
  ) => {
    // If children are provided, render them instead of default layout
    if (children) {
      return (
        <div
          ref={ref}
          className={clsx(styles.root, className)}
          data-testid={testID}
        >
          {children}
        </div>
      );
    }

    // withPrice variant: price info + spacer + button
    if (variant === 'withPrice') {
      return (
        <div
          ref={ref}
          className={clsx(styles.root, className)}
          data-testid={testID}
        >
          <div className={styles.priceInfo}>
            {label && <span className={styles.priceLabel}>{label}</span>}
            {price && <span className={styles.priceValue}>{price}</span>}
          </div>
          <div className={styles.spacer} />
          <Button
            onPress={onButtonPress}
            loading={isLoading}
          >
            {buttonText}
          </Button>
        </div>
      );
    }

    // singleAction variant (default): full-width button
    return (
      <div
        ref={ref}
        className={clsx(styles.root, className)}
        data-testid={testID}
      >
        <div className={styles.fullWidthButton}>
          <Button
            onPress={onButtonPress}
            loading={isLoading}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    );
  }
);

StickyBottomBar.displayName = 'StickyBottomBar';
export default StickyBottomBar;
