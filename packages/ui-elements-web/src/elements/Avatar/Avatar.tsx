/**
 * Avatar Component (Web)
 *
 * Implements @groxigo/contracts AvatarPropsBase for web platform.
 * Displays user avatars with image support, initials fallback, and status badges.
 */

import React, { forwardRef, useState, useCallback, useMemo } from 'react';
import { cn } from '../../utils/cn';
import type { AvatarPropsBase, AvatarSize, AvatarVariant } from '@groxigo/contracts';

// Size configuration for avatar dimensions and text
const sizeClasses: Record<AvatarSize, { container: string; text: string; badge: string }> = {
  xs: { container: 'h-6 w-6', text: 'text-[10px]', badge: 'h-1.5 w-1.5 border' },
  sm: { container: 'h-8 w-8', text: 'text-xs', badge: 'h-2 w-2 border' },
  md: { container: 'h-10 w-10', text: 'text-sm', badge: 'h-2.5 w-2.5 border-2' },
  lg: { container: 'h-12 w-12', text: 'text-base', badge: 'h-3 w-3 border-2' },
  xl: { container: 'h-16 w-16', text: 'text-xl', badge: 'h-3.5 w-3.5 border-2' },
  '2xl': { container: 'h-20 w-20', text: 'text-2xl', badge: 'h-4 w-4 border-2' },
};

// Variant (shape) configuration
const variantClasses: Record<AvatarVariant, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-lg',
  square: 'rounded-none',
};

// Badge color configuration
const badgeColorClasses: Record<string, string> = {
  green: 'bg-success',
  red: 'bg-error',
  yellow: 'bg-warning',
  gray: 'bg-text-tertiary',
};

/**
 * Extract initials from a name string
 * Returns first letter of first and last name
 */
function getInitials(name?: string): string {
  if (!name) return '';
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

export interface AvatarProps extends AvatarPropsBase {
  /** Click handler */
  onClick?: () => void;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      size = 'md',
      variant = 'circle',
      showBadge = false,
      badgeColor = 'green',
      fallback,
      borderColor,
      className,
      testID,
      onClick,
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageError = useCallback(() => {
      setImageError(true);
    }, []);

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true);
    }, []);

    const showFallback = !src || imageError;
    const initials = useMemo(() => getInitials(name), [name]);
    const displayText = initials || '?';

    const sizeConfig = sizeClasses[size];
    const variantClass = variantClasses[variant];
    const badgeColorClass = badgeColorClasses[badgeColor] || badgeColorClasses.green;

    // Build inline styles for border color if provided
    const style: React.CSSProperties = {};
    if (borderColor) {
      style.borderColor = borderColor;
      style.borderWidth = '2px';
      style.borderStyle = 'solid';
    }

    const containerClasses = cn(
      'relative inline-flex items-center justify-center overflow-hidden',
      'bg-surface-secondary text-text-secondary',
      'select-none flex-shrink-0',
      sizeConfig.container,
      variantClass,
      onClick && 'cursor-pointer hover:opacity-90 transition-opacity',
      className
    );

    const imageClasses = cn(
      'w-full h-full object-cover transition-opacity duration-200',
      variantClass,
      !imageLoaded && 'opacity-0',
      imageLoaded && 'opacity-100'
    );

    const fallbackTextClasses = cn(
      'font-semibold text-text-secondary',
      sizeConfig.text
    );

    const badgeClasses = cn(
      'absolute bottom-0 right-0 rounded-full border-white',
      sizeConfig.badge,
      badgeColorClass
    );

    return (
      <div
        ref={ref}
        className={containerClasses}
        style={style}
        role="img"
        aria-label={alt || (name ? `Avatar for ${name}` : 'Avatar')}
        data-testid={testID}
        onClick={onClick}
      >
        {!showFallback ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className={imageClasses}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <>
            {fallback || (
              <span className={fallbackTextClasses}>{displayText}</span>
            )}
          </>
        )}

        {showBadge && (
          <span className={badgeClasses} aria-hidden="true" />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
