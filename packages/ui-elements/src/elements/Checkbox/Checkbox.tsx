/**
 * Checkbox Component
 *
 * A versatile checkbox component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useMemo, useCallback, forwardRef } from 'react';
import { Pressable, View, StyleSheet, Platform } from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { Theme } from '../../theme/types';
import type { CheckboxProps, CheckboxSize, CheckboxColorScheme } from './Checkbox.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

/**
 * Minimum touch target size for accessibility (WCAG 2.1 Level AAA)
 * Apple HIG recommends 44pt, Android Material recommends 48dp
 */
const MIN_TOUCH_TARGET = 44;

const sizeConfig: Record<CheckboxSize, {
  boxSize: number;
  iconSize: number;
  borderRadius: number;
  fontSize: number;
  gap: number;
  /** Additional hit slop to ensure minimum 44px touch target */
  hitSlop: number;
}> = {
  sm: {
    boxSize: 16,
    iconSize: 10,
    borderRadius: 3,
    fontSize: 14,
    gap: 8,
    // hitSlop expands touch target to 44px: (44 - 16) / 2 = 14
    hitSlop: Math.max(0, (MIN_TOUCH_TARGET - 16) / 2),
  },
  md: {
    boxSize: 20,
    iconSize: 12,
    borderRadius: 4,
    fontSize: 16,
    gap: 10,
    // hitSlop expands touch target to 44px: (44 - 20) / 2 = 12
    hitSlop: Math.max(0, (MIN_TOUCH_TARGET - 20) / 2),
  },
  lg: {
    boxSize: 24,
    iconSize: 14,
    borderRadius: 5,
    fontSize: 18,
    gap: 12,
    // hitSlop expands touch target to 44px: (44 - 24) / 2 = 10
    hitSlop: Math.max(0, (MIN_TOUCH_TARGET - 24) / 2),
  },
};

// ============================================
// COLOR HELPERS
// ============================================

function getColorSchemeColor(theme: Theme, colorScheme: CheckboxColorScheme): string {
  const colors = theme.colors;

  const colorMap: Record<CheckboxColorScheme, string> = {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
  };

  return colorMap[colorScheme];
}

// ============================================
// CHECK ICON COMPONENT
// ============================================

const CheckIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <View
    style={{
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View
      style={{
        width: size * 0.6,
        height: size * 0.35,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderColor: color,
        transform: [{ rotate: '-45deg' }, { translateY: -size * 0.1 }],
      }}
    />
  </View>
);

const IndeterminateIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <View
    style={{
      width: size * 0.6,
      height: 2,
      backgroundColor: color,
      borderRadius: 1,
    }}
  />
);

// ============================================
// CHECKBOX COMPONENT
// ============================================

export const Checkbox = forwardRef<ViewType, CheckboxProps>(
  (
    {
      checked = false,
      onChange,
      indeterminate = false,
      disabled = false,
      label,
      size = 'md',
      colorScheme = 'primary',
      style,
      labelStyle,
      accessibilityLabel,
    },
    ref
  ) => {
  const theme = useTheme();
  const config = sizeConfig[size];
  const mainColor = getColorSchemeColor(theme, colorScheme);

  const handlePress = useCallback(() => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  }, [disabled, onChange, checked]);

  const styles = useMemo(() => {
    const isActive = checked || indeterminate;

    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
        ...Platform.select({
          web: {
            cursor: disabled ? 'not-allowed' : 'pointer',
            userSelect: 'none',
          } as any,
        }),
      },
      checkbox: {
        width: config.boxSize,
        height: config.boxSize,
        borderRadius: config.borderRadius,
        borderWidth: 2,
        borderColor: isActive ? mainColor : theme.colors.border,
        backgroundColor: isActive ? mainColor : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      },
      label: {
        marginLeft: config.gap,
        fontSize: config.fontSize,
        color: disabled ? theme.colors.textDisabled : theme.colors.text,
        fontFamily: theme.typography.fontFamily.sans,
      },
    });
  }, [theme, config, checked, indeterminate, disabled, mainColor]);

  // Calculate hitSlop for touch target expansion
  const hitSlopValue = config.hitSlop;
  const hitSlop = { top: hitSlopValue, right: hitSlopValue, bottom: hitSlopValue, left: hitSlopValue };

  return (
    <Pressable
      ref={ref}
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: indeterminate ? 'mixed' : checked, disabled }}
      accessibilityLabel={accessibilityLabel || label}
      accessibilityHint={`${checked ? 'Uncheck' : 'Check'} this option`}
      hitSlop={hitSlop}
    >
      <View style={styles.checkbox}>
        {indeterminate ? (
          <IndeterminateIcon size={config.iconSize} color={theme.colors.textInverse} />
        ) : checked ? (
          <CheckIcon size={config.iconSize} color={theme.colors.textInverse} />
        ) : null}
      </View>
      {label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
    </Pressable>
  );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
