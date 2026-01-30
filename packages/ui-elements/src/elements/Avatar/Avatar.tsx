/**
 * Avatar Component
 *
 * A versatile avatar component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useMemo, useState, forwardRef } from 'react';
import { View, Image, StyleSheet, Platform } from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { Theme } from '../../theme/types';
import type { AvatarProps, AvatarSize, AvatarVariant, AvatarColorScheme } from './Avatar.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeConfig: Record<AvatarSize, {
  size: number;
  fontSize: number;
  statusSize: number;
}> = {
  xs: { size: 24, fontSize: 10, statusSize: 6 },
  sm: { size: 32, fontSize: 12, statusSize: 8 },
  md: { size: 40, fontSize: 14, statusSize: 10 },
  lg: { size: 48, fontSize: 16, statusSize: 12 },
  xl: { size: 64, fontSize: 20, statusSize: 14 },
  '2xl': { size: 80, fontSize: 24, statusSize: 16 },
};

// ============================================
// HELPERS
// ============================================

function getBorderRadius(size: number, variant: AvatarVariant): number {
  switch (variant) {
    case 'circle':
      return size / 2;
    case 'rounded':
      return size * 0.2;
    case 'square':
      return 0;
    default:
      return size / 2;
  }
}

function getColorSchemeColors(theme: Theme, colorScheme: AvatarColorScheme) {
  const colors = theme.colors;

  const colorMap: Record<AvatarColorScheme, { background: string; text: string }> = {
    primary: { background: colors.primarySubtle, text: colors.primary },
    secondary: { background: colors.secondarySubtle, text: colors.secondary },
    accent: { background: colors.accentSubtle, text: colors.accent },
    success: { background: colors.successSubtle, text: colors.success },
    warning: { background: colors.warningSubtle, text: colors.warning },
    error: { background: colors.errorSubtle, text: colors.error },
    info: { background: colors.infoSubtle, text: colors.info },
    neutral: { background: colors.surfaceSecondary, text: colors.text },
  };

  return colorMap[colorScheme];
}

function getStatusColor(theme: Theme, status: 'online' | 'offline' | 'busy' | 'away'): string {
  const colors = theme.colors;

  const statusColors: Record<string, string> = {
    online: colors.success,
    offline: colors.textMuted,
    busy: colors.error,
    away: colors.warning,
  };

  return statusColors[status];
}

function getInitials(text?: string): string {
  if (!text) return '';
  const words = text.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

// ============================================
// AVATAR COMPONENT
// ============================================

export const Avatar = forwardRef<ViewType, AvatarProps>(
  (
    {
      source,
      fallback,
      size = 'md',
      variant = 'circle',
      colorScheme = 'primary',
      showStatus = false,
      status = 'offline',
      style,
      imageStyle,
      accessibilityLabel,
    },
    ref
  ) => {
  const theme = useTheme();
  const config = sizeConfig[size];
  const [imageError, setImageError] = useState(false);

  const showFallback = !source || imageError;
  const initials = getInitials(fallback);
  const displayText = initials || '?';

  const styles = useMemo(() => {
    const borderRadius = getBorderRadius(config.size, variant);
    const schemeColors = getColorSchemeColors(theme, colorScheme);
    const statusPosition = config.size * 0.75;

    return StyleSheet.create({
      container: {
        width: config.size,
        height: config.size,
        borderRadius,
        backgroundColor: showFallback ? schemeColors.background : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        ...Platform.select({
          web: {
            userSelect: 'none',
          } as any,
        }),
      },
      image: {
        width: config.size,
        height: config.size,
        borderRadius,
      },
      fallbackText: {
        fontSize: config.fontSize,
        fontWeight: '600',
        color: schemeColors.text,
      },
      statusIndicator: {
        position: 'absolute',
        width: config.statusSize,
        height: config.statusSize,
        borderRadius: config.statusSize / 2,
        backgroundColor: getStatusColor(theme, status),
        borderWidth: 2,
        borderColor: theme.colors.surface,
        bottom: 0,
        right: 0,
      },
    });
  }, [theme, config, variant, colorScheme, showFallback, status]);

  return (
    <View
      ref={ref}
      style={[styles.container, style]}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel || `Avatar${fallback ? `: ${fallback}` : ''}`}
    >
      {!showFallback ? (
        <Image
          source={source!}
          style={[styles.image, imageStyle]}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <Text style={styles.fallbackText}>{displayText}</Text>
      )}

      {showStatus && (
        <View style={styles.statusIndicator} />
      )}
    </View>
  );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;
