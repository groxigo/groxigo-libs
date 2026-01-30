/**
 * Input Component
 *
 * A versatile input component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 * All sizes derived from theme tokens.
 */

import React, { useMemo, useState, useCallback, forwardRef } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import type { TextInput as TextInputType } from 'react-native';
import { useDeviceType } from '@groxigo/ui-core';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { Theme } from '../../theme/types';
import type { InputProps, InputSize, InputVariant } from './Input.types';

// ============================================
// SIZE CONFIGURATION (RESPONSIVE)
// ============================================

interface InputSizeConfig {
  height: number;
  paddingH: number;
  fontSize: number;
  borderRadius: number;
  iconSize: number;
  gap: number;
}

/**
 * Get responsive input size configuration
 * Uses md (44px base) as the standard size - scales via uiSize() on tablets
 */
function getSizeConfig(
  theme: Theme,
  uiSize: (value: number) => number,
  fontSizeFn: (value: number) => number
): InputSizeConfig {
  const { spacing, typography, radius, icon } = theme;

  return {
    height: uiSize(spacing[11]),           // 44px - iOS touch target
    paddingH: uiSize(spacing[3.5]),        // 14px
    fontSize: fontSizeFn(typography.fontSize.md),  // 16px
    borderRadius: uiSize(radius.lg),       // 8px
    iconSize: uiSize(icon.size.md - 2),    // 18px
    gap: uiSize(spacing[2.5]),             // 10px
  };
}

// ============================================
// VARIANT HELPERS
// ============================================

function getVariantStyles(
  theme: Theme,
  variant: InputVariant,
  isFocused: boolean,
  isError: boolean,
  isDisabled: boolean,
  borderRadius: number
) {
  const colors = theme.colors;

  const getBorderColor = () => {
    if (isError) return colors.error;
    if (isFocused) return colors.primary;
    return colors.border;
  };

  switch (variant) {
    case 'outline':
      return {
        backgroundColor: isDisabled ? colors.surfaceDisabled : colors.surface,
        borderWidth: 1,
        borderColor: getBorderColor(),
        borderRadius,
      };
    case 'filled':
      return {
        backgroundColor: isDisabled ? colors.surfaceDisabled : colors.surfaceSecondary,
        borderWidth: isFocused || isError ? 1 : 0,
        borderColor: getBorderColor(),
        borderRadius,
      };
    case 'flushed':
      return {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderBottomWidth: isFocused || isError ? 2 : 1,
        borderColor: getBorderColor(),
        borderRadius: 0,
      };
    case 'unstyled':
      return {
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderColor: 'transparent',
        borderRadius: 0,
      };
    default:
      return {
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: getBorderColor(),
        borderRadius,
      };
  }
}

// ============================================
// INPUT COMPONENT
// ============================================

export const Input = forwardRef<TextInputType, InputProps>(
  (
    {
      size, // Deprecated - ignored, uses responsive md size
      variant = 'outline',
      label,
      error,
      helperText,
      fullWidth = false,
      disabled = false,
      readOnly = false,
      required = false,
      containerStyle,
      wrapperStyle,
      inputStyle,
      leftIcon,
      rightIcon,
      style,
      placeholderTextColor,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
  const theme = useTheme();
  const { uiSize, fontSize: fontSizeFn } = useDeviceType();
  const config = getSizeConfig(theme, uiSize, fontSizeFn);
  const [isFocused, setIsFocused] = useState(false);
  const isError = !!error;

  const handleFocus = useCallback((e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  }, [onFocus]);

  const handleBlur = useCallback((e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  }, [onBlur]);

  const styles = useMemo(() => {
    const variantStyles = getVariantStyles(
      theme,
      variant,
      isFocused,
      isError,
      disabled,
      config.borderRadius
    );

    return StyleSheet.create({
      container: {
        ...(fullWidth && { width: '100%' }),
      },
      label: {
        fontSize: fontSizeFn(theme.typography.fontSize.sm),
        fontWeight: '500',
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily.sans,
        marginBottom: uiSize(theme.spacing[1.5]),
      },
      required: {
        color: theme.colors.error,
      },
      inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: config.height,
        paddingHorizontal: config.paddingH,
        gap: config.gap,
        ...variantStyles,
        ...Platform.select({
          web: {
            outlineStyle: 'none',
          } as any,
        }),
      },
      input: {
        flex: 1,
        height: '100%',
        fontSize: config.fontSize,
        color: disabled ? theme.colors.textDisabled : theme.colors.text,
        fontFamily: theme.typography.fontFamily.sans,
        ...Platform.select({
          web: {
            outlineStyle: 'none',
          } as any,
        }),
      },
      helperText: {
        fontSize: fontSizeFn(theme.typography.fontSize.xs),
        color: theme.colors.textSecondary,
        fontFamily: theme.typography.fontFamily.sans,
        marginTop: uiSize(theme.spacing[1]),
      },
      errorText: {
        fontSize: fontSizeFn(theme.typography.fontSize.xs),
        color: theme.colors.error,
        fontFamily: theme.typography.fontFamily.sans,
        marginTop: uiSize(theme.spacing[1]),
      },
      iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
  }, [theme, config, variant, isFocused, isError, disabled, fullWidth, uiSize, fontSizeFn]);

  const defaultPlaceholderColor = placeholderTextColor || theme.colors.textMuted;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <View style={[styles.inputWrapper, wrapperStyle, style]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          ref={ref}
          style={[styles.input, inputStyle]}
          placeholderTextColor={defaultPlaceholderColor}
          editable={!disabled && !readOnly}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessible
          accessibilityLabel={label}
          accessibilityState={{ disabled }}
          {...props}
        />
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>
      {isError && error && (
        <Text style={styles.errorText} accessibilityRole="alert" accessibilityLiveRegion="polite">
          {error}
        </Text>
      )}
      {!isError && helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
  }
);

Input.displayName = 'Input';

export default Input;
