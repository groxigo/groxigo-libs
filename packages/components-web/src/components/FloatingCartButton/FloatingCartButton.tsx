'use client';

/**
 * FloatingCartButton Component (Web)
 *
 * Fixed position button showing cart status.
 * Displays cart icon with count badge and optional total price.
 * Animates on add to cart.
 */

import { forwardRef, useState, useEffect } from 'react';
import { Text, Icon, cn } from '@groxigo/ui-elements-web';

export interface FloatingCartButtonProps {
  /**
   * Number of items in cart
   */
  itemCount: number;

  /**
   * Total price to display (optional)
   */
  totalPrice?: number;

  /**
   * Image URL for the first cart item preview (optional)
   */
  previewImage?: string;

  /**
   * Callback when button is clicked
   */
  onClick?: () => void;

  /**
   * Primary label text
   * @default "View cart"
   */
  label?: string;

  /**
   * Position on screen
   * @default "bottom-right"
   */
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';

  /**
   * Bottom offset from viewport
   * @default 24
   */
  bottomOffset?: number;

  /**
   * Whether to show the button (overrides itemCount check)
   */
  visible?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}

const positionClasses = {
  'bottom-right': 'right-4 sm:right-6',
  'bottom-left': 'left-4 sm:left-6',
  'bottom-center': 'left-1/2 -translate-x-1/2',
};

const ChevronRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);

export const FloatingCartButton = forwardRef<HTMLButtonElement, FloatingCartButtonProps>(
  (
    {
      itemCount,
      totalPrice,
      previewImage,
      onClick,
      label = 'View cart',
      position = 'bottom-right',
      bottomOffset = 24,
      visible,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [prevCount, setPrevCount] = useState(itemCount);

    // Animate when item count increases
    useEffect(() => {
      if (itemCount > prevCount) {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 300);
        return () => clearTimeout(timer);
      }
      setPrevCount(itemCount);
    }, [itemCount, prevCount]);

    // Don't render if no items (unless visible is explicitly true)
    const shouldShow = visible !== undefined ? visible : itemCount > 0;
    if (!shouldShow) {
      return null;
    }

    const formatPrice = (value: number) => `$${value.toFixed(2)}`;

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cn(
          'fixed z-50',
          'flex items-center gap-2',
          'bg-success-500 text-white',
          'px-3 py-2 rounded-full',
          'shadow-lg hover:shadow-xl',
          'transition-all duration-200',
          'hover:bg-success-600',
          isAnimating && 'scale-110',
          positionClasses[position],
          className
        )}
        style={{ bottom: bottomOffset }}
        data-testid={testID}
        aria-label={`${label}, ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
        {...props}
      >
        {/* Preview image or icon */}
        <div
          className={cn(
            'w-9 h-9 rounded-full overflow-hidden',
            'bg-white flex items-center justify-center',
            'flex-shrink-0'
          )}
        >
          {previewImage ? (
            <img
              src={previewImage}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-success-500">
              <ShoppingBagIcon />
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col items-start px-1">
          <Text
            variant="bodySmall"
            weight="semibold"
            className="text-white"
          >
            {label}
          </Text>
          <Text
            variant="caption"
            className="text-white/85"
          >
            {itemCount} Item{itemCount !== 1 ? 's' : ''}
            {totalPrice !== undefined && ` - ${formatPrice(totalPrice)}`}
          </Text>
        </div>

        {/* Arrow */}
        <div
          className={cn(
            'w-6 h-6 rounded-full',
            'bg-white/20 flex items-center justify-center',
            'flex-shrink-0'
          )}
        >
          <ChevronRightIcon />
        </div>
      </button>
    );
  }
);

FloatingCartButton.displayName = 'FloatingCartButton';

export default FloatingCartButton;
