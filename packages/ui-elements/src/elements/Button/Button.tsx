/**
 * Button Component
 *
 * A versatile button component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 * All sizes derived from theme tokens.
 *
 * Features responsive sizing that automatically scales for tablets/large screens.
 */

import React, { useMemo, useCallback, forwardRef } from 'react';
import {
  Pressable,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import type { View as ViewType } from 'react-native';
import { useDeviceType } from '@groxigo/ui-core';
import { useTheme } from '../../hooks/useTheme';
import type { Theme } from '../../theme/types';
import type { ButtonProps, ButtonVariant, ButtonColorScheme, ButtonSize } from './Button.types';

// ============================================
// SIZE CONFIGURATION FROM THEME
// ============================================

interface SizeConfig {
  height: number;
  paddingH: number;
  paddingV: number;
  fontSize: number;
  iconSize: number;
  gap: number;
  borderRadius: number;
}

/**
 * Minimum touch target size for accessibility (WCAG 2.1 Level AAA)
 * Apple HIG recommends 44pt, Android Material recommends 48dp
 * We use 44 as a compromise that works well on both platforms
 */
const MIN_TOUCH_TARGET = 44;

/**
 * Get button size configuration from theme tokens
 * All values derived from spacing, typography, radius, and icon tokens
 *
 * Note: For accessibility, the visual height may be smaller than the touch target.
 * The hitSlop is calculated to ensure minimum 44px touch area.
 */
function getSizeConfig(theme: Theme, size: ButtonSize): SizeConfig & { hitSlop: number } {
  const { spacing, typography, radius, icon } = theme;

  // Map button sizes to theme tokens
  const configs: Record<ButtonSize, SizeConfig & { hitSlop: number }> = {
    xs: {
      height: spacing[7],              // 28px visual
      paddingH: spacing[2.5],          // 10px
      paddingV: spacing[1],            // 4px
      fontSize: typography.fontSize.xs, // 12px
      iconSize: icon.size.xs + 2,      // 14px
      gap: spacing[1],                 // 4px
      borderRadius: radius.sm,         // 4px
      // hitSlop expands touch target to 44px: (44 - 28) / 2 = 8
      hitSlop: Math.max(0, (MIN_TOUCH_TARGET - spacing[7]) / 2),
    },
    sm: {
      height: spacing[8] + 2,          // 34px visual
      paddingH: spacing[3],            // 12px
      paddingV: spacing[1.5],          // 6px
      fontSize: typography.fontSize.sm, // 14px
      iconSize: icon.size.sm,          // 16px
      gap: spacing[1.5],               // 6px
      borderRadius: radius.md,         // 6px
      // hitSlop expands touch target to 44px: (44 - 34) / 2 = 5
      hitSlop: Math.max(0, (MIN_TOUCH_TARGET - (spacing[8] + 2)) / 2),
    },
    md: {
      height: spacing[10] + 2,         // 42px visual
      paddingH: spacing[4] + 2,        // 18px
      paddingV: spacing[2],            // 8px
      fontSize: typography.fontSize.md, // 16px
      iconSize: icon.size.md - 2,      // 18px
      gap: spacing[2],                 // 8px
      borderRadius: radius.lg,         // 8px
      // hitSlop expands touch target to 44px: (44 - 42) / 2 = 1
      hitSlop: Math.max(0, (MIN_TOUCH_TARGET - (spacing[10] + 2)) / 2),
    },
    lg: {
      height: spacing[12] + 2,         // 50px visual
      paddingH: spacing[5] + 2,        // 22px
      paddingV: spacing[2.5],          // 10px
      fontSize: typography.fontSize.lg, // 18px
      iconSize: icon.size.md,          // 20px
      gap: spacing[2],                 // 8px
      borderRadius: radius.xl,         // 10px (approximation)
      hitSlop: 0,                      // Already larger than minimum
    },
    xl: {
      height: spacing[14] + 2,         // 58px visual
      paddingH: spacing[6] + 2,        // 26px
      paddingV: spacing[3],            // 12px
      fontSize: typography.fontSize.xl, // 20px
      iconSize: icon.size.lg,          // 24px
      gap: spacing[2.5],               // 10px
      borderRadius: radius['2xl'],     // 12px
      hitSlop: 0,                      // Already larger than minimum
    },
  };

  return configs[size];
}

// ============================================
// COLOR HELPERS
// ============================================

function getColorSchemeColors(theme: Theme, colorScheme: ButtonColorScheme) {
  const colors = theme.colors;

  const colorMap: Record<ButtonColorScheme, {
    main: string;
    hover: string;
    active: string;
    subtle: string;
    text: string;
  }> = {
    primary: {
      main: colors.primary,
      hover: colors.primaryHover,
      active: colors.primaryActive,
      subtle: colors.primarySubtle,
      text: colors.textInverse,
    },
    secondary: {
      main: colors.secondary,
      hover: colors.secondaryHover,
      active: colors.secondaryActive,
      subtle: colors.secondarySubtle,
      text: colors.textInverse,
    },
    accent: {
      main: colors.accent,
      hover: colors.accentHover,
      active: colors.accentActive,
      subtle: colors.accentSubtle,
      text: colors.textInverse,
    },
    success: {
      main: colors.success,
      hover: colors.success,
      active: colors.success,
      subtle: colors.successSubtle,
      text: colors.textInverse,
    },
    warning: {
      main: colors.warning,
      hover: colors.warning,
      active: colors.warning,
      subtle: colors.warningSubtle,
      text: colors.text,
    },
    error: {
      main: colors.error,
      hover: colors.error,
      active: colors.error,
      subtle: colors.errorSubtle,
      text: colors.textInverse,
    },
    info: {
      main: colors.info,
      hover: colors.info,
      active: colors.info,
      subtle: colors.infoSubtle,
      text: colors.textInverse,
    },
  };

  return colorMap[colorScheme];
}

function getVariantStyles(
  theme: Theme,
  variant: ButtonVariant,
  colorScheme: ButtonColorScheme,
  pressed: boolean,
  disabled: boolean
) {
  const schemeColors = getColorSchemeColors(theme, colorScheme);
  const colors = theme.colors;

  if (disabled) {
    return {
      backgroundColor: colors.surfaceDisabled,
      borderColor: colors.borderDisabled,
      borderWidth: variant === 'outline' ? 1 : 0,
      textColor: colors.textDisabled,
    };
  }

  switch (variant) {
    case 'solid':
      return {
        backgroundColor: pressed ? schemeColors.active : schemeColors.main,
        borderColor: 'transparent',
        borderWidth: 0,
        textColor: schemeColors.text,
      };

    case 'outline':
      return {
        backgroundColor: pressed ? schemeColors.subtle : 'transparent',
        borderColor: schemeColors.main,
        borderWidth: 1,
        textColor: schemeColors.main,
      };

    case 'ghost':
      return {
        backgroundColor: pressed ? schemeColors.subtle : 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        textColor: schemeColors.main,
      };

    case 'soft':
      return {
        backgroundColor: pressed ? schemeColors.main : schemeColors.subtle,
        borderColor: 'transparent',
        borderWidth: 0,
        textColor: pressed ? schemeColors.text : schemeColors.main,
      };

    case 'link':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        textColor: pressed ? schemeColors.active : schemeColors.main,
      };

    default:
      return {
        backgroundColor: schemeColors.main,
        borderColor: 'transparent',
        borderWidth: 0,
        textColor: schemeColors.text,
      };
  }
}

// ============================================
// BUTTON COMPONENT
// ============================================

export const Button = forwardRef<ViewType, ButtonProps>(
  (
    {
      variant = 'solid',
      colorScheme = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      iconOnly = false,
      disabled = false,
      style,
      textStyle,
      children,
      onPress,
      ...props
    },
    ref
  ) => {
  const theme = useTheme();
  const { scale } = useDeviceType();
  const baseConfig = getSizeConfig(theme, size);

  // Apply responsive scaling to button dimensions
  // Buttons use uiScale (more conservative than fontScale to prevent oversized buttons)
  const config = useMemo(() => ({
    height: Math.round(baseConfig.height * scale.uiScale),
    paddingH: Math.round(baseConfig.paddingH * scale.uiScale),
    paddingV: Math.round(baseConfig.paddingV * scale.uiScale),
    fontSize: Math.round(baseConfig.fontSize * scale.uiScale), // Text in buttons uses UI scale
    iconSize: Math.round(baseConfig.iconSize * scale.iconScale),
    gap: Math.round(baseConfig.gap * scale.spacingScale),
    borderRadius: Math.round(baseConfig.borderRadius * scale.uiScale),
    hitSlop: baseConfig.hitSlop,
  }), [baseConfig, scale]);

  const isDisabled = disabled || loading;

  // Handle press with disabled check
  const handlePress = useCallback(
    (event: any) => {
      if (!isDisabled && onPress) {
        onPress(event);
      }
    },
    [isDisabled, onPress]
  );

  // Memoize static styles
  const baseStyles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: config.height,
          paddingHorizontal: iconOnly ? config.paddingV : config.paddingH,
          paddingVertical: config.paddingV,
          borderRadius: config.borderRadius,
          gap: config.gap,
          ...(fullWidth && { width: '100%' }),
          ...(iconOnly && {
            width: config.height,
            paddingHorizontal: 0,
          }),
          // Web-specific styles
          ...Platform.select({
            web: {
              cursor: isDisabled ? 'not-allowed' : 'pointer',
              userSelect: 'none',
              outlineStyle: 'none',
            } as any,
          }),
        },
        text: {
          fontSize: config.fontSize,
          fontWeight: '600',
          fontFamily: theme.typography.fontFamily.sans,
          textAlign: 'center',
        },
        loadingContainer: {
          marginRight: loadingText ? config.gap : 0,
        },
      }),
    [config, fullWidth, iconOnly, isDisabled, loadingText, theme.typography.fontFamily.sans, scale]
  );

  // Calculate hitSlop for touch target expansion
  const hitSlopValue = config.hitSlop;
  const hitSlop = hitSlopValue > 0
    ? { top: hitSlopValue, right: hitSlopValue, bottom: hitSlopValue, left: hitSlopValue }
    : undefined;

  return (
    <Pressable
      ref={ref}
      style={({ pressed }) => {
        const variantStyles = getVariantStyles(
          theme,
          variant,
          colorScheme,
          pressed,
          isDisabled
        );

        return [
          baseStyles.container,
          {
            backgroundColor: variantStyles.backgroundColor,
            borderColor: variantStyles.borderColor,
            borderWidth: variantStyles.borderWidth,
          },
          style,
        ];
      }}
      onPress={handlePress}
      disabled={isDisabled}
      accessible
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      accessibilityHint={iconOnly ? (typeof children === 'string' ? children : undefined) : undefined}
      hitSlop={hitSlop}
      {...props}
    >
      {({ pressed }) => {
        const variantStyles = getVariantStyles(
          theme,
          variant,
          colorScheme,
          pressed,
          isDisabled
        );

        return (
          <>
            {/* Loading indicator */}
            {loading && (
              <View style={baseStyles.loadingContainer}>
                <ActivityIndicator
                  size="small"
                  color={variantStyles.textColor}
                />
              </View>
            )}

            {/* Left icon */}
            {!loading && leftIcon && (
              <View>{leftIcon}</View>
            )}

            {/* Button text */}
            {!iconOnly && (loading ? loadingText : children) && (
              <Text
                style={[
                  baseStyles.text,
                  { color: variantStyles.textColor },
                  textStyle,
                ]}
              >
                {loading ? loadingText : children}
              </Text>
            )}

            {/* Right icon */}
            {!loading && rightIcon && (
              <View>{rightIcon}</View>
            )}
          </>
        );
      }}
    </Pressable>
  );
  }
);

Button.displayName = 'Button';

export default Button;
