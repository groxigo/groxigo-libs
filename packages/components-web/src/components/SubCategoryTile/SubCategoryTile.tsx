'use client';

/**
 * SubCategoryTile Component (Web)
 *
 * Smaller tile for subcategories in navigation.
 * Used in left navigation panel for subcategory selection.
 */

import { forwardRef } from 'react';
import { Text, Icon, cn } from '@groxigo/ui-elements-web';
import type { IconName } from '@groxigo/contracts';

export interface SubCategoryTileProps {
  /**
   * SubCategory title/label displayed below or beside the image/icon
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
   * Callback when tile is clicked
   */
  onClick?: () => void;

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
   * Whether the tile is active/selected
   * @default false
   */
  active?: boolean;

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
    container: 'w-[72px] min-h-[60px]',
    image: 'w-10 h-10',
    icon: 'w-8 h-8',
    iconSize: 16,
    text: 'text-[11px] leading-tight',
  },
  md: {
    container: 'w-20 min-h-[72px]',
    image: 'w-12 h-12',
    icon: 'w-10 h-10',
    iconSize: 20,
    text: 'text-xs leading-tight',
  },
  lg: {
    container: 'w-24 min-h-[84px]',
    image: 'w-14 h-14',
    icon: 'w-12 h-12',
    iconSize: 24,
    text: 'text-sm leading-tight',
  },
};

export const SubCategoryTile = forwardRef<HTMLButtonElement, SubCategoryTileProps>(
  (
    {
      title,
      image,
      icon,
      onClick,
      size = 'md',
      disabled = false,
      active = false,
      className,
      testID,
      ...props
    },
    ref
  ) => {
    const config = sizeClasses[size];

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'flex flex-col items-center justify-center gap-1',
          'py-2 px-1',
          'transition-all rounded-r-lg',
          config.container,
          disabled && 'opacity-50 cursor-not-allowed',
          active && [
            'bg-primary-50',
            'border-l-[3px] border-l-primary-500',
          ],
          !active && 'border-l-[3px] border-l-transparent',
          !disabled && !active && 'hover:bg-gray-50',
          className
        )}
        data-testid={testID}
        aria-pressed={active}
        {...props}
      >
        {/* Image or Icon container */}
        {image ? (
          <div className={cn('rounded-lg overflow-hidden bg-surface-secondary', config.image)}>
            <img
              src={image}
              alt={title}
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
        ) : null}

        {/* Title */}
        <Text
          variant="caption"
          weight="medium"
          className={cn(
            'text-center line-clamp-2',
            config.text,
            active ? 'text-primary-600' : 'text-text-primary'
          )}
        >
          {title}
        </Text>
      </button>
    );
  }
);

SubCategoryTile.displayName = 'SubCategoryTile';

export default SubCategoryTile;
