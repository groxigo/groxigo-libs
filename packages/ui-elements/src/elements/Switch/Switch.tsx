/**
 * Switch Component
 *
 * A versatile switch/toggle component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useMemo, useCallback, forwardRef } from 'react';
import { Pressable, View, StyleSheet, Platform, Animated } from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { Theme } from '../../theme/types';
import type { SwitchProps, SwitchSize, SwitchColorScheme } from './Switch.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeConfig: Record<SwitchSize, {
  trackWidth: number;
  trackHeight: number;
  thumbSize: number;
  thumbPadding: number;
  fontSize: number;
  gap: number;
}> = {
  sm: { trackWidth: 36, trackHeight: 20, thumbSize: 16, thumbPadding: 2, fontSize: 14, gap: 8 },
  md: { trackWidth: 44, trackHeight: 24, thumbSize: 20, thumbPadding: 2, fontSize: 16, gap: 10 },
  lg: { trackWidth: 52, trackHeight: 28, thumbSize: 24, thumbPadding: 2, fontSize: 18, gap: 12 },
};

// ============================================
// COLOR HELPERS
// ============================================

function getColorSchemeColor(theme: Theme, colorScheme: SwitchColorScheme): string {
  const colors = theme.colors;

  const colorMap: Record<SwitchColorScheme, string> = {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
  };

  return colorMap[colorScheme];
}

// ============================================
// SWITCH COMPONENT
// ============================================

export const Switch = forwardRef<ViewType, SwitchProps>(
  (
    {
      // New prop names (preferred)
      checked,
      onChange,
      // Deprecated prop names (backward compatibility)
      value,
      onValueChange,
      // Other props
      disabled = false,
      label,
      labelPosition = 'right',
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
  const activeColor = getColorSchemeColor(theme, colorScheme);

  // Support both new and deprecated prop names
  const isChecked = checked ?? value ?? false;
  const handleChange = onChange ?? onValueChange;

  const handlePress = useCallback(() => {
    if (!disabled && handleChange) {
      handleChange(!isChecked);
    }
  }, [disabled, handleChange, isChecked]);

  const thumbPosition = isChecked
    ? config.trackWidth - config.thumbSize - config.thumbPadding
    : config.thumbPadding;

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
        alignItems: 'center',
        opacity: disabled ? 0.5 : 1,
        ...Platform.select({
          web: {
            cursor: disabled ? 'not-allowed' : 'pointer',
            userSelect: 'none',
          } as any,
        }),
      },
      track: {
        width: config.trackWidth,
        height: config.trackHeight,
        borderRadius: config.trackHeight / 2,
        backgroundColor: isChecked ? activeColor : theme.colors.border,
        justifyContent: 'center',
        padding: config.thumbPadding,
      },
      thumb: {
        position: 'absolute',
        width: config.thumbSize,
        height: config.thumbSize,
        borderRadius: config.thumbSize / 2,
        backgroundColor: theme.colors.surface,
        left: thumbPosition,
        ...theme.shadows.sm,
      },
      label: {
        fontSize: config.fontSize,
        color: disabled ? theme.colors.textDisabled : theme.colors.text,
        fontFamily: theme.typography.fontFamily.sans,
        ...(labelPosition === 'left' ? { marginRight: config.gap } : { marginLeft: config.gap }),
      },
    });
  }, [theme, config, isChecked, disabled, activeColor, labelPosition, thumbPosition]);

  return (
    <Pressable
      ref={ref}
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: isChecked, disabled }}
      accessibilityLabel={accessibilityLabel || (typeof label === 'string' ? label : undefined)}
    >
      {labelPosition === 'left' && label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      <View style={styles.track}>
        <View style={styles.thumb} />
      </View>
      {labelPosition === 'right' && label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
    </Pressable>
  );
  }
);

Switch.displayName = 'Switch';

export default Switch;
