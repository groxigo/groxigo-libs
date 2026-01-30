/**
 * Spinner Component
 *
 * A loading spinner component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useMemo, forwardRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { Theme } from '../../theme/types';
import type { SpinnerProps, SpinnerSize, SpinnerColorScheme } from './Spinner.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeConfig: Record<SpinnerSize, {
  size: 'small' | 'large';
  containerSize: number;
}> = {
  xs: { size: 'small', containerSize: 16 },
  sm: { size: 'small', containerSize: 20 },
  md: { size: 'small', containerSize: 24 },
  lg: { size: 'large', containerSize: 32 },
  xl: { size: 'large', containerSize: 48 },
};

// ============================================
// COLOR HELPERS
// ============================================

function getColorSchemeColor(theme: Theme, colorScheme: SpinnerColorScheme): string {
  const colors = theme.colors;

  const colorMap: Record<SpinnerColorScheme, string> = {
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    neutral: colors.textSecondary,
  };

  return colorMap[colorScheme];
}

// ============================================
// SPINNER COMPONENT
// ============================================

export const Spinner = forwardRef<ViewType, SpinnerProps>(
  (
    {
      size = 'md',
      colorScheme = 'primary',
      color,
      style,
      accessibilityLabel = 'Loading',
    },
    ref
  ) => {
  const theme = useTheme();
  const config = sizeConfig[size];
  const spinnerColor = color || getColorSchemeColor(theme, colorScheme);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        width: config.containerSize,
        height: config.containerSize,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
  }, [config]);

  return (
    <View
      ref={ref}
      style={[styles.container, style]}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
    >
      <ActivityIndicator size={config.size} color={spinnerColor} />
    </View>
  );
  }
);

Spinner.displayName = 'Spinner';

export default Spinner;
