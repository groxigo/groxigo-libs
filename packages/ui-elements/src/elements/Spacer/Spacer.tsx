/**
 * Spacer Component
 *
 * A flexible spacing component for layout.
 * Uses theme spacing tokens for consistent spacing.
 */

import React, { useMemo, forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import type { SpacerProps } from './Spacer.types';

// ============================================
// SPACER COMPONENT
// ============================================

export const Spacer = forwardRef<ViewType, SpacerProps>(
  (
    {
      size = 4,
      width,
      height,
      flex = false,
      x,
      y,
      style,
      ...props
    },
    ref
  ) => {
  const theme = useTheme();

  const styles = useMemo(() => {
    // Use theme spacing base unit (default 4px)
    const baseUnit = theme.spacing[1] || 4;

    // Calculate spacing value from size prop
    // Only look at numeric spacing keys, not semantic/negative objects
    const getSpacingValue = (key: number | string): number => {
      if (typeof key === 'number') {
        return key * baseUnit;
      }
      const numericKey = parseFloat(key);
      if (!isNaN(numericKey)) {
        const spacingKey = numericKey as keyof typeof theme.spacing;
        const value = theme.spacing[spacingKey];
        if (typeof value === 'number') {
          return value;
        }
      }
      return 0;
    };

    const spacingValue = getSpacingValue(size);

    // Determine dimensions
    let computedWidth: number = 0;
    let computedHeight: number = 0;

    if (x !== undefined) {
      computedWidth = x * baseUnit;
      computedHeight = 0;
    } else if (y !== undefined) {
      computedWidth = 0;
      computedHeight = y * baseUnit;
    } else {
      computedWidth = width ?? spacingValue;
      computedHeight = height ?? spacingValue;
    }

    return StyleSheet.create({
      spacer: {
        width: computedWidth,
        height: computedHeight,
        ...(flex && { flex: 1 }),
      },
    });
  }, [theme.spacing, size, width, height, flex, x, y]);

  return <View ref={ref} style={[styles.spacer, style]} {...props} />;
  }
);

Spacer.displayName = 'Spacer';

export default Spacer;
