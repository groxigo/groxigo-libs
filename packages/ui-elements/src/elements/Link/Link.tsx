/**
 * Link Component
 *
 * A navigation link component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useMemo, useCallback } from 'react';
import { Pressable, StyleSheet, Platform, Linking } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { Theme } from '../../theme/types';
import type { LinkProps, LinkSize, LinkColorScheme } from './Link.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeConfig: Record<LinkSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

// ============================================
// COLOR HELPERS
// ============================================

function getColorSchemeColor(theme: Theme, colorScheme: LinkColorScheme): string {
  const colors = theme.colors;

  const colorMap: Record<LinkColorScheme, string> = {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    neutral: colors.text,
  };

  return colorMap[colorScheme];
}

// ============================================
// LINK COMPONENT
// ============================================

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  onPress,
  colorScheme = 'primary',
  size = 'md',
  underline = true,
  disabled = false,
  isExternal = false,
  style,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const linkColor = getColorSchemeColor(theme, colorScheme);
  const fontSize = sizeConfig[size];

  const handlePress = useCallback(
    (event: any) => {
      if (disabled) return;

      if (onPress) {
        onPress(event);
      } else if (href) {
        Linking.openURL(href);
      }
    },
    [disabled, onPress, href]
  );

  const styles = useMemo(() => {
    return StyleSheet.create({
      link: {
        fontSize,
        color: disabled ? theme.colors.textDisabled : linkColor,
        fontFamily: theme.typography.fontFamily.sans,
        textDecorationLine: underline ? 'underline' : 'none',
        ...Platform.select({
          web: {
            cursor: disabled ? 'not-allowed' : 'pointer',
          } as any,
        }),
      },
      pressed: {
        opacity: 0.7,
      },
    });
  }, [theme, linkColor, fontSize, underline, disabled]);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="link"
      accessibilityLabel={accessibilityLabel || (typeof children === 'string' ? children : undefined)}
      accessibilityState={{ disabled }}
    >
      {({ pressed }) => (
        <Text
          style={[
            styles.link,
            pressed && !disabled && styles.pressed,
            style,
          ]}
        >
          {children}
          {isExternal && ' ↗'}
        </Text>
      )}
    </Pressable>
  );
};

export default Link;
