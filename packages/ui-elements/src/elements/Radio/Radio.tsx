/**
 * Radio Component
 *
 * A radio button component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useMemo, useCallback, createContext, useContext, forwardRef } from 'react';
import { Pressable, View, StyleSheet, Platform } from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { Theme } from '../../theme/types';
import type { RadioProps, RadioGroupProps, RadioSize, RadioColorScheme } from './Radio.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeConfig: Record<RadioSize, {
  outerSize: number;
  innerSize: number;
  fontSize: number;
  gap: number;
}> = {
  sm: { outerSize: 16, innerSize: 8, fontSize: 14, gap: 8 },
  md: { outerSize: 20, innerSize: 10, fontSize: 16, gap: 10 },
  lg: { outerSize: 24, innerSize: 12, fontSize: 18, gap: 12 },
};

// ============================================
// COLOR HELPERS
// ============================================

function getColorSchemeColor(theme: Theme, colorScheme: RadioColorScheme): string {
  const colors = theme.colors;

  const colorMap: Record<RadioColorScheme, string> = {
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
// RADIO GROUP CONTEXT
// ============================================

interface RadioGroupContextValue {
  value?: string;
  onChange?: (value: string) => void;
  size?: RadioSize;
  colorScheme?: RadioColorScheme;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({});

// ============================================
// RADIO COMPONENT
// ============================================

export const Radio = forwardRef<ViewType, RadioProps>(
  (
    {
      selected = false,
      onSelect,
      disabled = false,
      label,
      value,
      size = 'md',
      colorScheme = 'primary',
      style,
      labelStyle,
      accessibilityLabel,
    },
    ref
  ) => {
  const theme = useTheme();
  const groupContext = useContext(RadioGroupContext);

  // Use group context values if available
  const effectiveSize = groupContext.size || size;
  const effectiveColorScheme = groupContext.colorScheme || colorScheme;
  const isSelected = groupContext.value !== undefined
    ? groupContext.value === value
    : selected;

  const config = sizeConfig[effectiveSize];
  const mainColor = getColorSchemeColor(theme, effectiveColorScheme);

  const handlePress = useCallback(() => {
    if (disabled) return;

    if (groupContext.onChange && value !== undefined) {
      groupContext.onChange(value);
    } else if (onSelect) {
      onSelect();
    }
  }, [disabled, groupContext, value, onSelect]);

  const styles = useMemo(() => {
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
      radio: {
        width: config.outerSize,
        height: config.outerSize,
        borderRadius: config.outerSize / 2,
        borderWidth: 2,
        borderColor: isSelected ? mainColor : theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
      },
      inner: {
        width: config.innerSize,
        height: config.innerSize,
        borderRadius: config.innerSize / 2,
        backgroundColor: mainColor,
      },
      label: {
        marginLeft: config.gap,
        fontSize: config.fontSize,
        color: disabled ? theme.colors.textDisabled : theme.colors.text,
        fontFamily: theme.typography.fontFamily.sans,
      },
    });
  }, [theme, config, isSelected, disabled, mainColor]);

  return (
    <Pressable
      ref={ref}
      style={[styles.container, style]}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected, disabled }}
      accessibilityLabel={accessibilityLabel || label}
    >
      <View style={styles.radio}>
        {isSelected && <View style={styles.inner} />}
      </View>
      {label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
    </Pressable>
  );
  }
);

Radio.displayName = 'Radio';

// ============================================
// RADIO GROUP COMPONENT
// ============================================

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  onChange,
  children,
  direction = 'vertical',
  gap = 12,
  size,
  colorScheme,
  style,
}) => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        gap,
        flexWrap: direction === 'horizontal' ? 'wrap' : 'nowrap',
      },
    });
  }, [direction, gap]);

  const contextValue = useMemo(() => ({
    value,
    onChange,
    size,
    colorScheme,
  }), [value, onChange, size, colorScheme]);

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <View
        style={[styles.container, style]}
        accessibilityRole="radiogroup"
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
};

export default Radio;
