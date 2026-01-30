/**
 * Skeleton Component
 *
 * A loading skeleton placeholder that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useEffect, useRef, useMemo, forwardRef } from 'react';
import { View, Animated, StyleSheet, Platform } from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { SkeletonProps, SkeletonVariant } from './Skeleton.types';

// ============================================
// SKELETON COMPONENT
// ============================================

export const Skeleton = forwardRef<ViewType, SkeletonProps>(
  (
    {
      variant = 'rectangular',
      width,
      height,
      radius,
      animated = true,
      lines = 1,
      lineGap = 8,
      style,
      ...props
    },
    ref
  ) => {
  const theme = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Animation effect
  useEffect(() => {
    if (animated) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: Platform.OS !== 'web',
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: Platform.OS !== 'web',
          }),
        ])
      );
      animation.start();
      return () => animation.stop();
    }
  }, [animated, animatedValue]);

  const opacity = animated
    ? animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.4, 0.7],
      })
    : 0.5;

  const getVariantDimensions = useMemo(() => {
    const baseWidth = width ?? 100;
    const baseHeight = height ?? 16;

    switch (variant) {
      case 'text':
        return {
          width: typeof width === 'number' ? width : 100,
          height: 14,
          borderRadius: 4,
        };
      case 'circular':
        const size = typeof width === 'number' ? width : 40;
        return {
          width: size,
          height: size,
          borderRadius: size / 2,
        };
      case 'rounded':
        return {
          width: baseWidth,
          height: baseHeight,
          borderRadius: radius ?? 8,
        };
      case 'rectangular':
      default:
        return {
          width: baseWidth,
          height: baseHeight,
          borderRadius: radius ?? 0,
        };
    }
  }, [variant, width, height, radius]);

  const styles = useMemo(() => {
    return StyleSheet.create({
      skeleton: {
        backgroundColor: theme.colors.surfaceSecondary,
        width: getVariantDimensions.width,
        height: getVariantDimensions.height,
        borderRadius: getVariantDimensions.borderRadius,
      },
      container: {
        gap: lineGap,
      },
    });
  }, [theme, getVariantDimensions, lineGap]);

  // Handle multi-line text skeleton
  if (variant === 'text' && lines > 1) {
    return (
      <View ref={ref} style={[styles.container, style]} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.skeleton,
              { opacity },
              // Last line is shorter
              index === lines - 1 && { width: '70%' },
            ]}
          />
        ))}
      </View>
    );
  }

  // For web with animation, we'd use CSS animation (simplified here)
  if (Platform.OS === 'web' && animated) {
    return (
      <View
        ref={ref}
        style={[
          styles.skeleton,
          { opacity: 0.5 },
          style,
        ]}
        {...props}
      />
    );
  }

  return (
    <Animated.View
      ref={ref}
      style={[
        styles.skeleton,
        { opacity },
        style,
      ]}
      {...props}
    />
  );
  }
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
