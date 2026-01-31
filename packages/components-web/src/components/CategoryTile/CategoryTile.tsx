'use client';

/**
 * CategoryTile Component (Web)
 *
 * Displays a category with image/icon and label.
 * Clickable to navigate to category page.
 */

import { forwardRef } from 'react';
import { Text, Icon, cn } from '@groxigo/ui-elements-web';
import type { IconName } from '@groxigo/contracts';

export interface CategoryTileProps {
  /**
   * Category title/label displayed below the image/icon
   */
  title: string;

  /**
   * Image URL (takes precedence over icon if both provided)
   */
  image?: string;

  /**
   * Icon name (used if image is not provided)
   */
  icon?: IconName;

  /**
   * Product count in this category (optional)
   */
  productCount?: number;

  /**
   * Callback when tile is clicked
   */
  onClick?: () => void;

  /**
   * Link href for navigation (alternative to onClick)
   */
  href?: string;

  /**
   * Size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Whether the tile is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}

const sizeClasses = {
  sm: {
    container: 'w-20',
    image: 'w-16 h-16',
    icon: 'w-10 h-10',
    iconSize: 20,
    text: 'text-xs',
  },
  md: {
    container: 'w-24',
    image: 'w-20 h-20',
    icon: 'w-12 h-12',
    iconSize: 24,
    text: 'text-sm',
  },
  lg: {
    container: 'w-28',
    image: 'w-24 h-24',
    icon: 'w-14 h-14',
    iconSize: 28,
    text: 'text-base',
  },
};

export const CategoryTile = forwardRef<HTMLDivElement, CategoryTileProps>(
  (
    {
      title,
      image,
      icon,
      productCount,
      onClick,
      href,
      size = 'md',
      disabled = false,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const config = sizeClasses[size];

    const content = (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center gap-2',
          config.container,
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && (onClick || href) && 'cursor-pointer',
          className
        )}
        data-testid={testID}
        {...props}
      >
        {/* Image or Icon container */}
        {image ? (
          <div className={cn('rounded-lg overflow-hidden bg-surface-secondary', config.image)}>
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        ) : icon ? (
          <div
            className={cn(
              'rounded-lg flex items-center justify-center',
              'bg-surface-secondary',
              config.icon
            )}
          >
            <Icon
              name={icon}
              size={config.iconSize}
              colorScheme="primary"
            />
          </div>
        ) : (
          <div
            className={cn(
              'rounded-lg flex items-center justify-center',
              'bg-surface-secondary',
              config.image
            )}
          >
            <Icon
              name="grid"
              size={config.iconSize}
              colorScheme="muted"
            />
          </div>
        )}

        {/* Title */}
        <Text
          variant="bodySmall"
          weight="medium"
          className={cn('text-center line-clamp-2', config.text)}
        >
          {title}
        </Text>

        {/* Product count */}
        {productCount !== undefined && (
          <Text variant="caption" colorScheme="muted" className="-mt-1">
            {productCount} items
          </Text>
        )}
      </div>
    );

    // Wrap in link or button based on props
    if (href && !disabled) {
      return (
        <a
          href={href}
          className="inline-block hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
          aria-label={title}
        >
          {content}
        </a>
      );
    }

    if (onClick && !disabled) {
      return (
        <button
          type="button"
          onClick={onClick}
          className="inline-block hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg"
          aria-label={title}
        >
          {content}
        </button>
      );
    }

    return content;
  }
);

CategoryTile.displayName = 'CategoryTile';

export default CategoryTile;
