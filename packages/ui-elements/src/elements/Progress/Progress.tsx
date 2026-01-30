/**
 * Progress Component
 *
 * A progress bar component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useMemo, forwardRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { Theme } from '../../theme/types';
import type { ProgressProps, ProgressSize, ProgressColorScheme } from './Progress.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeConfig: Record<ProgressSize, {
  height: number;
  fontSize: number;
}> = {
  xs: { height: 4, fontSize: 10 },
  sm: { height: 8, fontSize: 11 },
  md: { height: 12, fontSize: 12 },
  lg: { height: 16, fontSize: 14 },
};

const radiusConfig: Record<string, number | undefined> = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 8,
  full: undefined, // Will be calculated based on height
};

// ============================================
// COLOR HELPERS
// ============================================

function getColorSchemeColor(theme: Theme, colorScheme: ProgressColorScheme): string {
  const colors = theme.colors;

  const colorMap: Record<ProgressColorScheme, string> = {
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
// PROGRESS COMPONENT
// ============================================

export const Progress = forwardRef<ViewType, ProgressProps>(
  (
    {
      value = 0,
      indeterminate = false,
      size = 'md',
      colorScheme = 'primary',
      variant = 'default',
      showLabel = false,
      radius = 'full',
      style,
      labelStyle,
      accessibilityLabel,
    },
    ref
  ) => {
  const theme = useTheme();
  const config = sizeConfig[size];
  const progressColor = getColorSchemeColor(theme, colorScheme);

  const clampedValue = Math.min(100, Math.max(0, value));
  const displayValue = indeterminate ? undefined : Math.round(clampedValue);
  const label = showLabel && displayValue !== undefined ? `${displayValue}%` : undefined;

  const borderRadius = radius === 'full' ? config.height / 2 : (radiusConfig[radius] ?? 0);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        width: '100%',
      },
      track: {
        height: config.height,
        backgroundColor: theme.colors.surfaceSecondary,
        borderRadius,
        overflow: 'hidden',
      },
      fill: {
        height: '100%',
        width: indeterminate ? '30%' : `${clampedValue}%`,
        backgroundColor: progressColor,
        borderRadius,
        ...Platform.select({
          web: {
            transition: 'width 0.3s ease',
          } as any,
        }),
      },
      labelContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 4,
      },
      label: {
        fontSize: config.fontSize,
        color: theme.colors.textSecondary,
        fontFamily: theme.typography.fontFamily.sans,
      },
    });
  }, [theme, config, progressColor, clampedValue, indeterminate, borderRadius]);

  return (
    <View
      ref={ref}
      style={[styles.container, style]}
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 0,
        max: 100,
        now: indeterminate ? undefined : clampedValue,
      }}
      accessibilityLabel={
        accessibilityLabel ||
        `Progress: ${displayValue !== undefined ? `${displayValue}%` : 'indeterminate'}`
      }
    >
      <View style={styles.track}>
        <View style={styles.fill} />
      </View>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        </View>
      )}
    </View>
  );
  }
);

Progress.displayName = 'Progress';

export default Progress;
