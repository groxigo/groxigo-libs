/**
 * ListItem Component (Web)
 *
 * Reusable list item with left/right content, pressable state, and selection.
 * Suitable for navigation menus, settings lists, and more.
 */

'use client';

import React, { forwardRef } from 'react';
import { Badge, Icon, cn } from '@groxigo/ui-elements-web';

export interface ListItemProps {
  /** Title text */
  title: string;
  /** Subtitle/description text */
  subtitle?: string;
  /** Left icon name */
  leftIcon?: string;
  /** Right icon name (defaults to chevron if onPress is provided) */
  rightIcon?: string;
  /** Left image URL */
  leftImage?: string;
  /** Left avatar (custom component) */
  leftAvatar?: React.ReactNode;
  /** Right content (custom component) */
  rightContent?: React.ReactNode;
  /** Badge text/number displayed on the right */
  badge?: string | number;
  /** Badge variant */
  badgeVariant?: 'solid' | 'subtle' | 'outline';
  /** Whether the item is selected */
  selected?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Whether to show a divider at the bottom */
  divider?: boolean;
  /** Callback when item is pressed */
  onPress?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Section for theming */
  section?: 'groceries' | 'recipes' | 'default';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Test ID for testing */
  testID?: string;
}

const sizeClasses = {
  sm: {
    container: 'py-2 px-3',
    image: 'w-8 h-8',
    title: 'text-sm',
    subtitle: 'text-xs',
    iconSize: 'sm' as const,
  },
  md: {
    container: 'py-3 px-4',
    image: 'w-10 h-10',
    title: 'text-base',
    subtitle: 'text-sm',
    iconSize: 'md' as const,
  },
  lg: {
    container: 'py-4 px-4',
    image: 'w-12 h-12',
    title: 'text-lg',
    subtitle: 'text-base',
    iconSize: 'lg' as const,
  },
};

export const ListItem = forwardRef<HTMLDivElement, ListItemProps>(
  (
    {
      title,
      subtitle,
      leftIcon,
      rightIcon,
      leftImage,
      leftAvatar,
      rightContent,
      badge,
      badgeVariant = 'subtle',
      selected = false,
      disabled = false,
      divider = false,
      onPress,
      className,
      section = 'default',
      size = 'md',
      testID,
      ...props
    },
    ref
  ) => {
    const sizeConfig = sizeClasses[size];

    // Section-based colors
    const sectionColors = {
      default: 'primary',
      groceries: 'primary',
      recipes: 'secondary',
    } as const;

    const accentColor = sectionColors[section];

    // Determine right icon - show chevron if pressable and no right content
    const showChevron = onPress && !rightContent && !rightIcon;
    const effectiveRightIcon = rightIcon || (showChevron ? 'chevron-right' : undefined);

    const content = (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3',
          sizeConfig.container,
          'transition-colors duration-150',
          selected && `bg-${accentColor}-50 border-l-3 border-l-${accentColor}-500`,
          !selected && 'bg-surface-primary',
          disabled && 'opacity-50 cursor-not-allowed',
          onPress && !disabled && 'cursor-pointer hover:bg-surface-secondary',
          divider && 'border-b border-border',
          className
        )}
        data-testid={testID}
        {...props}
      >
        {/* Left Section */}
        {leftAvatar && <div className="flex-shrink-0">{leftAvatar}</div>}

        {leftImage && !leftAvatar && (
          <img
            src={leftImage}
            alt=""
            loading="lazy"
            className={cn(
              sizeConfig.image,
              'rounded-lg object-cover flex-shrink-0'
            )}
          />
        )}

        {leftIcon && !leftImage && !leftAvatar && (
          <div
            className={cn(
              'flex-shrink-0',
              selected ? `text-${accentColor}-600` : 'text-text-secondary'
            )}
          >
            <Icon
              name={leftIcon as any}
              size={sizeConfig.iconSize}
              colorScheme={selected ? accentColor : 'muted'}
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              'font-medium truncate',
              sizeConfig.title,
              selected ? `text-${accentColor}-700` : 'text-text-primary'
            )}
          >
            {title}
          </p>
          {subtitle && (
            <p
              className={cn(
                'text-text-secondary truncate',
                sizeConfig.subtitle
              )}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Right Section */}
        {badge !== undefined && (
          <Badge
            variant={badgeVariant}
            colorScheme={accentColor}
            size="sm"
          >
            {String(badge)}
          </Badge>
        )}

        {rightContent && <div className="flex-shrink-0">{rightContent}</div>}

        {effectiveRightIcon && !rightContent && (
          <div className="flex-shrink-0 text-text-tertiary">
            <Icon name={effectiveRightIcon as any} size="sm" colorScheme="muted" />
          </div>
        )}
      </div>
    );

    if (onPress && !disabled) {
      return (
        <button
          type="button"
          onClick={onPress}
          disabled={disabled}
          className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg"
        >
          {content}
        </button>
      );
    }

    return content;
  }
);

ListItem.displayName = 'ListItem';

export default ListItem;
