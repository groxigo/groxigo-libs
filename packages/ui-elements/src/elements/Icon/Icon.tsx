/**
 * Icon Component
 *
 * A flexible icon component that works across iOS, Android, and Web.
 * Uses @expo/vector-icons (Ionicons) for rendering.
 * Fully theme-driven with no hardcoded colors.
 * All sizes derived from theme tokens.
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, Text as RNText } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { Theme } from '../../theme/types';
import type { IconProps, IconName, IconSize, IconColorScheme } from './Icon.types';

// ============================================
// SIZE CONFIGURATION FROM THEME
// ============================================

/**
 * Get icon size from theme tokens
 * Supports both preset sizes (xs, sm, md, lg, xl) and custom numeric values
 */
function getIconSize(theme: Theme, size: IconSize): number {
  if (typeof size === 'number') return size;

  // Use theme icon sizes
  const sizeMap: Record<string, number> = {
    xs: theme.icon.size.xs,   // 12px
    sm: theme.icon.size.sm,   // 16px
    md: theme.icon.size.md,   // 20px
    lg: theme.icon.size.lg,   // 24px
    xl: theme.icon.size.xl,   // 32px
    '2xl': theme.icon.size['2xl'], // 40px
    '3xl': theme.icon.size['3xl'], // 48px
    '4xl': theme.icon.size['4xl'], // 64px
  };

  return sizeMap[size] || theme.icon.size.md;
}

// ============================================
// COLOR HELPERS
// ============================================

function getColorFromScheme(theme: Theme, colorScheme: IconColorScheme): string {
  const colors = theme.colors;

  const colorMap: Record<IconColorScheme, string> = {
    default: colors.text,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    muted: colors.textMuted,
  };

  return colorMap[colorScheme];
}

// ============================================
// ICON NAME MAPPING
// ============================================

/**
 * Maps our abstract icon names to Ionicons names
 * Using Ionicons as it has the best cross-platform support
 */
const iconNameMap: Record<IconName, string> = {
  // Navigation
  'home': '⌂',
  'home-fill': '⌂',
  'chevron-right': '›',
  'chevron-left': '‹',
  'chevron-up': '˄',
  'chevron-down': '˅',
  'arrow-right': '→',
  'arrow-left': '←',
  'arrow-up': '↑',
  'arrow-down': '↓',
  'menu': '☰',
  'close': '✕',

  // Actions
  'search': '⌕',
  'plus': '+',
  'minus': '−',
  'check': '✓',
  'x': '✕',
  'x-circle': '⊗',
  'x-circle-fill': '⊗',
  'refresh': '↻',
  'external-link': '↗',
  'copy': '⧉',
  'share': '↗',
  'download': '↓',
  'upload': '↑',
  'filter': '⧩',
  'more': '⋯',
  'more-vertical': '⋮',

  // Content
  'heart': '♡',
  'heart-fill': '♥',
  'star': '☆',
  'star-fill': '★',
  'bookmark': '⚐',
  'bookmark-fill': '⚑',
  'tag': '⚏',
  'tag-fill': '⚏',

  // User
  'user': '◯',
  'user-fill': '●',
  'settings': '⚙',
  'settings-fill': '⚙',

  // Commerce
  'cart': '⛒',
  'cart-fill': '⛒',

  // Status
  'info': 'ⓘ',
  'info-circle': 'ⓘ',
  'info-circle-fill': 'ⓘ',
  'warning': '⚠',
  'warning-fill': '⚠',

  // Media
  'trash': '⌫',
  'edit': '✎',
  'camera': '⌗',
  'image': '⬚',
  'play': '▶',
  'pause': '❚❚',
  'stop': '■',
  'next': '⏭',
  'previous': '⏮',

  // Communication
  'mail': '✉',
  'phone': '☎',
  'bell': '⚃',
  'bell-fill': '⚃',

  // Location & Time
  'location': '⚲',
  'calendar': '⚏',
  'clock': '⏱',

  // Security
  'lock': '⚿',
  'unlock': '⚿',
  'eye': '◉',
  'eye-off': '◎',
  'key': '⚷',

  // Nature & Objects
  'leaf': '🍃',
  'nutrition': '🍎',
  'water': '💧',
  'cube': '📦',
  'restaurant': '🍴',
  'book': '📖',
  'grid': '▦',
};

// ============================================
// TRY TO IMPORT EXPO VECTOR ICONS
// ============================================

let Ionicons: any = null;
let MaterialIcons: any = null;

try {
  // Try to import @expo/vector-icons if available
  Ionicons = require('@expo/vector-icons/Ionicons').default;
} catch {
  // Fallback - icons will use text symbols
}

try {
  MaterialIcons = require('@expo/vector-icons/MaterialIcons').default;
} catch {
  // Fallback
}

/**
 * Maps our abstract icon names to Ionicons names
 */
const ioniconsNameMap: Record<string, string> = {
  // Navigation
  'home': 'home-outline',
  'home-fill': 'home',
  'chevron-right': 'chevron-forward',
  'chevron-left': 'chevron-back',
  'chevron-up': 'chevron-up',
  'chevron-down': 'chevron-down',
  'arrow-right': 'arrow-forward',
  'arrow-left': 'arrow-back',
  'arrow-up': 'arrow-up',
  'arrow-down': 'arrow-down',
  'menu': 'menu',
  'close': 'close',

  // Actions
  'search': 'search',
  'plus': 'add',
  'minus': 'remove',
  'check': 'checkmark',
  'x': 'close',
  'x-circle': 'close-circle-outline',
  'x-circle-fill': 'close-circle',
  'refresh': 'refresh',
  'external-link': 'open-outline',
  'copy': 'copy-outline',
  'share': 'share-outline',
  'download': 'download-outline',
  'upload': 'cloud-upload-outline',
  'filter': 'filter',
  'more': 'ellipsis-horizontal',
  'more-vertical': 'ellipsis-vertical',

  // Content
  'heart': 'heart-outline',
  'heart-fill': 'heart',
  'star': 'star-outline',
  'star-fill': 'star',
  'bookmark': 'bookmark-outline',
  'bookmark-fill': 'bookmark',
  'tag': 'pricetag-outline',
  'tag-fill': 'pricetag',

  // User
  'user': 'person-outline',
  'user-fill': 'person',
  'settings': 'settings-outline',
  'settings-fill': 'settings',

  // Commerce
  'cart': 'cart-outline',
  'cart-fill': 'cart',

  // Status
  'info': 'information-circle-outline',
  'info-circle': 'information-circle-outline',
  'info-circle-fill': 'information-circle',
  'warning': 'warning-outline',
  'warning-fill': 'warning',

  // Media
  'trash': 'trash-outline',
  'edit': 'create-outline',
  'camera': 'camera-outline',
  'image': 'image-outline',
  'play': 'play',
  'pause': 'pause',
  'stop': 'stop',
  'next': 'play-skip-forward',
  'previous': 'play-skip-back',

  // Communication
  'mail': 'mail-outline',
  'phone': 'call-outline',
  'bell': 'notifications-outline',
  'bell-fill': 'notifications',

  // Location & Time
  'location': 'location-outline',
  'calendar': 'calendar-outline',
  'clock': 'time-outline',

  // Security
  'lock': 'lock-closed-outline',
  'unlock': 'lock-open-outline',
  'eye': 'eye-outline',
  'eye-off': 'eye-off-outline',
  'key': 'key-outline',

  // Nature & Objects
  'leaf': 'leaf-outline',
  'nutrition': 'nutrition-outline',
  'water': 'water-outline',
  'cube': 'cube-outline',
  'restaurant': 'restaurant-outline',
  'book': 'book-outline',
  'grid': 'grid-outline',
};

// ============================================
// ICON COMPONENT
// ============================================

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  colorScheme = 'default',
  color,
  style,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const iconSize = getIconSize(theme, size);
  const iconColor = color || getColorFromScheme(theme, colorScheme);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        width: iconSize,
        height: iconSize,
        alignItems: 'center',
        justifyContent: 'center',
      },
      fallbackText: {
        fontSize: iconSize * 0.8,
        color: iconColor,
        textAlign: 'center',
        lineHeight: iconSize,
      },
    });
  }, [iconSize, iconColor]);

  // Try to use Ionicons if available
  if (Ionicons) {
    const ionIconName = ioniconsNameMap[name as string] || name;
    return (
      <View
        style={[styles.container, style]}
        accessibilityRole="image"
        accessibilityLabel={accessibilityLabel || (name as string)}
      >
        <Ionicons
          name={ionIconName}
          size={iconSize}
          color={iconColor}
        />
      </View>
    );
  }

  // Fallback to text symbols
  const fallbackSymbol = iconNameMap[name as IconName] || '○';

  return (
    <View
      style={[styles.container, style]}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel || (name as string)}
    >
      <RNText style={styles.fallbackText}>{fallbackSymbol}</RNText>
    </View>
  );
};

export default Icon;
