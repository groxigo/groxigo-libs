/**
 * Card Component (Web)
 *
 * Uses CSS Modules + design token CSS custom properties instead of Tailwind.
 *
 * Accessibility features:
 * - Keyboard support (Enter/Space) when pressable
 * - Visible focus indicators (3px ring per §18)
 * - Proper role and tabIndex for interactive cards
 */

import React, { forwardRef, useCallback } from 'react';
import { clsx } from 'clsx';
import type { CardPropsBase, CardHeaderPropsBase, CardBodyPropsBase, CardFooterPropsBase } from '@groxigo/contracts';
import styles from './Card.module.css';

export interface CardProps extends CardPropsBase {
  style?: React.CSSProperties;
  /** Accessible label for the card when pressable */
  'aria-label'?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'elevated',
      size = 'md',
      pressable = false,
      onPress,
      children,
      className,
      style,
      testID,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    // Handle keyboard interaction for pressable cards
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!pressable || !onPress) return;

        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onPress();
        }
      },
      [pressable, onPress]
    );

    const classes = clsx(
      styles[variant],
      styles[size],
      pressable && styles.pressable,
      className
    );

    return (
      <div
        ref={ref}
        className={classes}
        style={style}
        onClick={pressable ? onPress : undefined}
        onKeyDown={pressable ? handleKeyDown : undefined}
        role={pressable ? 'button' : undefined}
        tabIndex={pressable ? 0 : undefined}
        aria-label={pressable ? ariaLabel : undefined}
        data-testid={testID}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Header
export interface CardHeaderProps extends CardHeaderPropsBase {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.header, className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

// Card Body
export interface CardBodyProps extends CardBodyPropsBase {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx(styles.body, className)} {...props}>
      {children}
    </div>
  )
);

CardBody.displayName = 'CardBody';

// Card Footer
export interface CardFooterProps extends CardFooterPropsBase {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(styles.footer, className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

export default Card;
