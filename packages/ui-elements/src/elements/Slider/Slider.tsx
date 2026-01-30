/**
 * Slider Component
 *
 * A range slider component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useRef, useState, useCallback, useEffect, useMemo, forwardRef } from 'react';
import { View, PanResponder, StyleSheet, Platform } from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { Theme } from '../../theme/types';
import type { SliderProps, SliderSize, SliderColorScheme } from './Slider.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const sizeConfig: Record<SliderSize, {
  trackHeight: number;
  thumbSize: number;
  labelSize: number;
}> = {
  sm: { trackHeight: 4, thumbSize: 16, labelSize: 12 },
  md: { trackHeight: 6, thumbSize: 20, labelSize: 14 },
  lg: { trackHeight: 8, thumbSize: 24, labelSize: 16 },
};

// ============================================
// COLOR HELPERS
// ============================================

function getColorSchemeColor(theme: Theme, colorScheme: SliderColorScheme): string {
  const colors = theme.colors;

  const colorMap: Record<SliderColorScheme, string> = {
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
// SLIDER COMPONENT
// ============================================

export const Slider = forwardRef<ViewType, SliderProps>(
  (
    {
      value = 0,
      minimumValue = 0,
      maximumValue = 100,
      step,
      onValueChange,
      onSlidingComplete,
      disabled = false,
      label,
      showValue = false,
      formatValue,
      size = 'md',
      colorScheme = 'primary',
      style,
      labelStyle,
      valueStyle,
      accessibilityLabel,
    },
    ref
  ) => {
  const theme = useTheme();
  const config = sizeConfig[size];
  const activeColor = getColorSchemeColor(theme, colorScheme);

  // Clamp and normalize value
  const clampValue = useCallback((val: number): number => {
    let clamped = Math.max(minimumValue, Math.min(maximumValue, val));
    if (step) {
      clamped = Math.round(clamped / step) * step;
    }
    return clamped;
  }, [minimumValue, maximumValue, step]);

  const initialValue = clampValue(value);
  const [trackWidth, setTrackWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const currentValueRef = useRef(initialValue);
  const trackWidthRef = useRef(0);

  const [currentValue, setCurrentValue] = useState(initialValue);

  // Update current value when prop changes (if not dragging)
  useEffect(() => {
    if (!isDragging) {
      const newValue = clampValue(value);
      setCurrentValue(newValue);
      currentValueRef.current = newValue;
    }
  }, [value, isDragging, clampValue]);

  // Update refs
  useEffect(() => {
    currentValueRef.current = currentValue;
  }, [currentValue]);

  useEffect(() => {
    trackWidthRef.current = trackWidth;
  }, [trackWidth]);

  // Calculate percentage from value
  const getPercentage = useCallback((val: number): number => {
    const range = maximumValue - minimumValue;
    if (range === 0) return 0;
    return ((val - minimumValue) / range) * 100;
  }, [minimumValue, maximumValue]);

  // Calculate value from position
  const getValueFromPosition = useCallback((x: number): number => {
    const width = trackWidthRef.current;
    if (width === 0) return currentValueRef.current;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    const range = maximumValue - minimumValue;
    const newValue = minimumValue + (percentage / 100) * range;
    return clampValue(newValue);
  }, [minimumValue, maximumValue, clampValue]);

  // Handle value change
  const handleValueChange = useCallback((newValue: number) => {
    const clamped = clampValue(newValue);
    setCurrentValue(clamped);
    currentValueRef.current = clamped;
    onValueChange?.(clamped);
  }, [clampValue, onValueChange]);

  // Pan responder for drag handling
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (evt) => {
        if (disabled) return;
        setIsDragging(true);
        const { locationX } = evt.nativeEvent;
        const newValue = getValueFromPosition(locationX);
        handleValueChange(newValue);
      },
      onPanResponderMove: (evt) => {
        if (disabled) return;
        const { locationX } = evt.nativeEvent;
        const newValue = getValueFromPosition(locationX);
        handleValueChange(newValue);
      },
      onPanResponderRelease: () => {
        if (disabled) return;
        setIsDragging(false);
        onSlidingComplete?.(currentValueRef.current);
      },
      onPanResponderTerminate: () => {
        if (disabled) return;
        setIsDragging(false);
        onSlidingComplete?.(currentValueRef.current);
      },
    })
  ).current;

  const percentage = getPercentage(currentValue);
  const thumbPosition = (trackWidth * percentage) / 100;

  const displayValue = formatValue
    ? formatValue(currentValue)
    : String(Math.round(currentValue));

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        width: '100%',
        opacity: disabled ? 0.5 : 1,
      },
      labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      },
      label: {
        fontSize: config.labelSize,
        color: theme.colors.text,
        fontWeight: '500',
        fontFamily: theme.typography.fontFamily.sans,
      },
      value: {
        fontSize: config.labelSize,
        color: theme.colors.textSecondary,
        fontWeight: '600',
        fontFamily: theme.typography.fontFamily.sans,
      },
      trackContainer: {
        height: config.thumbSize,
        justifyContent: 'center',
        ...Platform.select({
          web: {
            cursor: disabled ? 'not-allowed' : 'pointer',
          } as any,
        }),
      },
      track: {
        height: config.trackHeight,
        backgroundColor: theme.colors.border,
        borderRadius: config.trackHeight / 2,
        overflow: 'hidden',
        position: 'relative',
      },
      fill: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        backgroundColor: activeColor,
        borderRadius: config.trackHeight / 2,
      },
      thumb: {
        position: 'absolute',
        width: config.thumbSize,
        height: config.thumbSize,
        borderRadius: config.thumbSize / 2,
        backgroundColor: theme.colors.surface,
        borderWidth: 2,
        borderColor: activeColor,
        top: (config.trackHeight - config.thumbSize) / 2,
        ...theme.shadows.sm,
        ...Platform.select({
          web: {
            cursor: disabled ? 'not-allowed' : 'grab',
          } as any,
        }),
      },
    });
  }, [theme, config, activeColor, disabled]);

  return (
    <View
      ref={ref}
      style={[styles.container, style]}
      accessibilityRole="adjustable"
      accessibilityValue={{
        min: minimumValue,
        max: maximumValue,
        now: currentValue,
      }}
      accessibilityLabel={accessibilityLabel || `Slider: ${displayValue}`}
    >
      {(label || showValue) && (
        <View style={styles.labelContainer}>
          {label && (
            <Text style={[styles.label, labelStyle]}>
              {label}
            </Text>
          )}
          {showValue && (
            <Text style={[styles.value, valueStyle]}>
              {displayValue}
            </Text>
          )}
        </View>
      )}
      <View
        style={styles.trackContainer}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setTrackWidth(width);
          trackWidthRef.current = width;
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${percentage}%` }]} />
          <View
            style={[
              styles.thumb,
              {
                left: thumbPosition - config.thumbSize / 2,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
  }
);

Slider.displayName = 'Slider';

export default Slider;
