/**
 * Card Component (Web)
 *
 * Accessibility features:
 * - Keyboard support (Enter/Space) when pressable
 * - Visible focus indicators
 * - Proper role and tabIndex for interactive cards
 */

import React, { forwardRef, useCallback } from 'react';
import { cn } from '../../utils/cn';
import type { CardVariant, CardSize } from '@groxigo/contracts';

const variantClasses: Record<string, string> = {
  elevated: 'bg-surface-primary shadow-md rounded-lg',
  outline: 'bg-surface-primary border border-border rounded-lg',
  filled: 'bg-surface-secondary rounded-lg',
  unstyled: '',
};

const sizeClasses: Record<string, string> = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export interface CardProps {
  variant?: CardVariant;
  size?: CardSize;
  pressable?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  testID?: string;
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

    const classes = cn(
      variantClasses[variant],
      sizeClasses[size],
      pressable && [
        'cursor-pointer hover:shadow-lg transition-shadow',
        // Focus visible styles for accessibility
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      ],
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
export interface CardHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('pb-3 border-b border-border', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

// Card Body
export interface CardBodyProps {
  children?: React.ReactNode;
  className?: string;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('py-3', className)} {...props}>
      {children}
    </div>
  )
);

CardBody.displayName = 'CardBody';

// Card Footer
export interface CardFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('pt-3 border-t border-border', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

export default Card;
