/**
 * Badge Component
 *
 * A versatile badge component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useMemo, forwardRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { Theme } from '../../theme/types';
import type { BadgeProps, BadgeVariant, BadgeColorScheme, BadgeSize } from './Badge.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeConfig: Record<BadgeSize, {
  paddingH: number;
  paddingV: number;
  fontSize: number;
  borderRadius: number;
  gap: number;
}> = {
  xs: { paddingH: 6, paddingV: 2, fontSize: 10, borderRadius: 4, gap: 4 },
  sm: { paddingH: 8, paddingV: 3, fontSize: 11, borderRadius: 4, gap: 4 },
  md: { paddingH: 10, paddingV: 4, fontSize: 12, borderRadius: 6, gap: 6 },
  lg: { paddingH: 12, paddingV: 5, fontSize: 14, borderRadius: 6, gap: 6 },
};

// ============================================
// COLOR HELPERS
// ============================================

function getColorSchemeColors(theme: Theme, colorScheme: BadgeColorScheme) {
  const colors = theme.colors;

  const colorMap: Record<BadgeColorScheme, {
    main: string;
    subtle: string;
    text: string;
    textInverse: string;
  }> = {
    primary: {
      main: colors.primary,
      subtle: colors.primarySubtle,
      text: colors.primary,
      textInverse: colors.textInverse,
    },
    secondary: {
      main: colors.secondary,
      subtle: colors.secondarySubtle,
      text: colors.secondary,
      textInverse: colors.textInverse,
    },
    accent: {
      main: colors.accent,
      subtle: colors.accentSubtle,
      text: colors.accent,
      textInverse: colors.textInverse,
    },
    success: {
      main: colors.success,
      subtle: colors.successSubtle,
      text: colors.success,
      textInverse: colors.textInverse,
    },
    warning: {
      main: colors.warning,
      subtle: colors.warningSubtle,
      text: colors.warning,
      textInverse: colors.text,
    },
    error: {
      main: colors.error,
      subtle: colors.errorSubtle,
      text: colors.error,
      textInverse: colors.textInverse,
    },
    info: {
      main: colors.info,
      subtle: colors.infoSubtle,
      text: colors.info,
      textInverse: colors.textInverse,
    },
    neutral: {
      main: colors.border,
      subtle: colors.surfaceSecondary,
      text: colors.textSecondary,
      textInverse: colors.textInverse,
    },
  };

  return colorMap[colorScheme];
}

function getVariantStyles(
  schemeColors: ReturnType<typeof getColorSchemeColors>,
  variant: BadgeVariant
) {
  switch (variant) {
    case 'solid':
      return {
        backgroundColor: schemeColors.main,
        borderColor: 'transparent',
        borderWidth: 0,
        textColor: schemeColors.textInverse,
      };
    case 'soft':
      return {
        backgroundColor: schemeColors.subtle,
        borderColor: 'transparent',
        borderWidth: 0,
        textColor: schemeColors.text,
      };
    case 'subtle':
      // 'subtle' is similar to 'soft' but with even more subtle styling
      return {
        backgroundColor: schemeColors.subtle,
        borderColor: 'transparent',
        borderWidth: 0,
        textColor: schemeColors.text,
      };
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderColor: schemeColors.main,
        borderWidth: 1,
        textColor: schemeColors.text,
      };
    default:
      return {
        backgroundColor: schemeColors.subtle,
        borderColor: 'transparent',
        borderWidth: 0,
        textColor: schemeColors.text,
      };
  }
}

// ============================================
// BADGE COMPONENT
// ============================================

export const Badge = forwardRef<ViewType, BadgeProps>(
  (
    {
      variant = 'subtle',
      colorScheme = 'neutral',
      size = 'md',
      children,
      style,
      textStyle,
      leftIcon,
      rightIcon,
      rounded = false,
      testID,
      ...props
    },
    ref
  ) => {
  const theme = useTheme();
  const config = sizeConfig[size];

  const styles = useMemo(() => {
    const schemeColors = getColorSchemeColors(theme, colorScheme);
    const variantStyles = getVariantStyles(schemeColors, variant);

    // Calculate border radius - pill style if rounded
    const borderRadius = rounded
      ? (config.paddingV * 2 + config.fontSize) / 2 + config.paddingV
      : config.borderRadius;

    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: config.paddingH,
        paddingVertical: config.paddingV,
        borderRadius,
        backgroundColor: variantStyles.backgroundColor,
        borderColor: variantStyles.borderColor,
        borderWidth: variantStyles.borderWidth,
        gap: config.gap,
        ...Platform.select({
          web: {
            userSelect: 'none',
          } as any,
        }),
      },
      text: {
        fontSize: config.fontSize,
        fontWeight: '500',
        color: variantStyles.textColor,
        fontFamily: theme.typography.fontFamily.sans,
      },
    });
  }, [theme, variant, colorScheme, config, rounded]);

  return (
    <View ref={ref} style={[styles.container, style]} {...props}>
      {leftIcon}
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={[styles.text, textStyle]}>{String(children)}</Text>
      ) : (
        children
      )}
      {rightIcon}
    </View>
  );
  }
);

Badge.displayName = 'Badge';

export default Badge;
