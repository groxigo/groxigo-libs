/**
 * TextArea Component
 *
 * A multi-line text input component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useMemo, useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { Theme } from '../../theme/types';
import type { TextAreaProps, TextAreaSize, TextAreaVariant } from './TextArea.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeConfig: Record<TextAreaSize, {
  padding: number;
  fontSize: number;
  lineHeight: number;
  borderRadius: number;
}> = {
  sm: { padding: 10, fontSize: 14, lineHeight: 20, borderRadius: 6 },
  md: { padding: 12, fontSize: 16, lineHeight: 24, borderRadius: 8 },
  lg: { padding: 14, fontSize: 18, lineHeight: 28, borderRadius: 10 },
};

// ============================================
// VARIANT HELPERS
// ============================================

function getVariantStyles(
  theme: Theme,
  variant: TextAreaVariant,
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
// TEXTAREA COMPONENT
// ============================================

export const TextArea: React.FC<TextAreaProps> = ({
  size = 'md',
  variant = 'outline',
  label,
  error,
  helperText,
  rows = 4,
  fullWidth = true,
  disabled = false,
  readOnly = false,
  required = false,
  resize = 'vertical',
  containerStyle,
  textAreaStyle,
  placeholderTextColor,
  onFocus,
  onBlur,
  accessibilityLabel,
  ...props
}) => {
  const theme = useTheme();
  const config = sizeConfig[size];
  const [isFocused, setIsFocused] = useState(false);
  const isError = !!error;

  // Calculate min height based on rows
  const minHeight = rows * config.lineHeight + config.padding * 2;

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
        fontSize: theme.typography.fontSize.sm,
        fontWeight: '500',
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily.sans,
        marginBottom: 6,
      },
      required: {
        color: theme.colors.error,
      },
      textAreaContainer: {
        minHeight,
        ...variantStyles,
        ...Platform.select({
          web: {
            resize: resize === 'auto' ? 'none' : resize,
          } as any,
        }),
      },
      textArea: {
        flex: 1,
        padding: config.padding,
        fontSize: config.fontSize,
        lineHeight: config.lineHeight,
        color: disabled ? theme.colors.textDisabled : theme.colors.text,
        fontFamily: theme.typography.fontFamily.sans,
        textAlignVertical: 'top',
        ...Platform.select({
          web: {
            outlineStyle: 'none',
            resize: resize === 'auto' ? 'none' : resize,
          } as any,
        }),
      },
      helperText: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.textSecondary,
        fontFamily: theme.typography.fontFamily.sans,
        marginTop: 4,
      },
      errorText: {
        fontSize: theme.typography.fontSize.xs,
        color: theme.colors.error,
        fontFamily: theme.typography.fontFamily.sans,
        marginTop: 4,
      },
    });
  }, [theme, config, variant, isFocused, isError, disabled, fullWidth, minHeight, resize]);

  const defaultPlaceholderColor = placeholderTextColor || theme.colors.textMuted;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      <View style={styles.textAreaContainer}>
        <TextInput
          style={[styles.textArea, textAreaStyle]}
          multiline
          placeholderTextColor={defaultPlaceholderColor}
          editable={!disabled && !readOnly}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessible
          accessibilityLabel={accessibilityLabel || label}
          accessibilityState={{ disabled }}
          {...props}
        />
      </View>
      {isError && error && (
        <Text style={styles.errorText} accessibilityRole="alert" accessibilityLiveRegion="polite">
          {error}
        </Text>
      )}
      {!isError && helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

export default TextArea;
