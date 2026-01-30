'use client';

/**
 * AddToCartButton Component (Web)
 *
 * Primary CTA button for adding items to cart.
 * Supports loading state, quantity badge when in cart, and disabled state for out of stock.
 */

import { forwardRef } from 'react';
import { Button, Badge, Spinner, cn } from '@groxigo/ui-elements-web';

export interface AddToCartButtonProps {
  /**
   * Button label
   * @default 'Add to Cart'
   */
  label?: string;

  /**
   * Whether item is in cart
   * @default false
   */
  inCart?: boolean;

  /**
   * Quantity in cart
   */
  quantity?: number;

  /**
   * Whether the button is in loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Whether the item is out of stock
   * @default false
   */
  outOfStock?: boolean;

  /**
   * Callback when button is clicked
   */
  onClick?: () => void;

  /**
   * Button variant
   * @default 'solid'
   */
  variant?: 'solid' | 'outline' | 'ghost';

  /**
   * Button size
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the button takes full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}

const CartIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('w-4 h-4', className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('w-4 h-4', className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export const AddToCartButton = forwardRef<HTMLButtonElement, AddToCartButtonProps>(
  (
    {
      label = 'Add to Cart',
      inCart = false,
      quantity,
      loading = false,
      outOfStock = false,
      onClick,
      variant = 'solid',
      size = 'md',
      fullWidth = false,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const displayVariant = inCart ? 'outline' : variant;
    const isDisabled = loading || outOfStock;

    const getButtonText = () => {
      if (loading) return 'Adding...';
      if (outOfStock) return 'Out of Stock';
      if (inCart) {
        return quantity && quantity > 1 ? `In Cart (${quantity})` : 'In Cart';
      }
      return label;
    };

    const sizeClasses = {
      sm: 'h-8 px-3 text-sm gap-1.5',
      md: 'h-10 px-4 text-base gap-2',
      lg: 'h-12 px-6 text-lg gap-2.5',
    };

    const variantClasses = {
      solid: 'bg-primary-500 text-white hover:bg-primary-600 disabled:bg-gray-300',
      outline: 'border-2 border-primary-500 text-primary-600 hover:bg-primary-50 disabled:border-gray-300 disabled:text-gray-400',
      ghost: 'text-primary-600 hover:bg-primary-50 disabled:text-gray-400',
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center',
          'font-medium rounded-lg',
          'transition-colors',
          'disabled:cursor-not-allowed',
          sizeClasses[size],
          variantClasses[displayVariant],
          fullWidth && 'w-full',
          className
        )}
        data-testid={testID}
        {...props}
      >
        {loading ? (
          <Spinner size="sm" className="text-current" />
        ) : inCart ? (
          <CheckIcon />
        ) : (
          <CartIcon />
        )}
        <span>{getButtonText()}</span>
        {inCart && quantity && quantity > 0 && !loading && (
          <Badge
            colorScheme="primary"
            size="sm"
            className="ml-1"
          >
            {quantity}
          </Badge>
        )}
      </button>
    );
  }
);

AddToCartButton.displayName = 'AddToCartButton';

export default AddToCartButton;
