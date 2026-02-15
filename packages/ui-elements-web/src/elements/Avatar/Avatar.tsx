'use client';

/**
 * Avatar Component (Web)
 *
 * Implements @groxigo/contracts AvatarPropsBase for web platform.
 * Displays user avatars with image support, initials fallback, and status badges.
 */

import React, { forwardRef, useState, useCallback, useMemo } from 'react';
import { clsx } from 'clsx';
import type { AvatarPropsBase, AvatarSize, AvatarVariant } from '@groxigo/contracts';
import styles from './Avatar.module.css';

// Size configuration for avatar — maps to CSS module classes
const sizeConfig: Record<AvatarSize, { container: string; text: string; badge: string }> = {
  xs: { container: styles.sizeXs, text: styles.textXs, badge: styles.badgeXs },
  sm: { container: styles.sizeSm, text: styles.textSm, badge: styles.badgeSm },
  md: { container: styles.sizeMd, text: styles.textMd, badge: styles.badgeMd },
  lg: { container: styles.sizeLg, text: styles.textLg, badge: styles.badgeLg },
  xl: { container: styles.sizeXl, text: styles.textXl, badge: styles.badgeXl },
  '2xl': { container: styles.size2xl, text: styles.text2xl, badge: styles.badge2xl },
};

// Variant (shape) configuration
const variantClassMap: Record<AvatarVariant, string> = {
  circle: styles.circle,
  square: styles.square,
};

// Badge color configuration
const badgeColorClassMap: Record<string, string> = {
  green: styles.badgeGreen,
  red: styles.badgeRed,
  yellow: styles.badgeYellow,
  gray: styles.badgeGray,
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
  className?: string;
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

    const currentSize = sizeConfig[size];
    const variantClass = variantClassMap[variant];
    const badgeColorClass = badgeColorClassMap[badgeColor] || badgeColorClassMap.green;

    // Build inline styles for border color if provided
    const style: React.CSSProperties = {};
    if (borderColor) {
      style.borderColor = borderColor;
      style.borderWidth = '2px';
      style.borderStyle = 'solid';
    }

    const containerClasses = clsx(
      styles.avatar,
      currentSize.container,
      variantClass,
      onClick && styles.clickable,
      className
    );

    const imageClasses = clsx(
      styles.image,
      variantClass,
      !imageLoaded && styles.imageHidden,
      imageLoaded && styles.imageVisible
    );

    const fallbackTextClasses = clsx(
      styles.fallbackText,
      currentSize.text
    );

    const badgeClasses = clsx(
      styles.statusBadge,
      currentSize.badge,
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
