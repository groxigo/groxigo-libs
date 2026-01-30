/**
 * Divider Component
 *
 * A divider/separator component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 *
 * Note: Dashed and dotted variants use a pattern-based approach that works
 * on all platforms including React Native.
 */

import React, { useMemo, forwardRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { DividerProps, DividerVariant, DividerThickness } from './Divider.types';

// ============================================
// THICKNESS CONFIGURATION
// ============================================

const thicknessConfig: Record<DividerThickness, number> = {
  thin: 1,
  medium: 2,
  thick: 4,
};

// ============================================
// DASHED/DOTTED PATTERN COMPONENT
// ============================================

interface PatternLineProps {
  variant: DividerVariant;
  color: string;
  thickness: number;
  isHorizontal: boolean;
}

const PatternLine: React.FC<PatternLineProps> = ({ variant, color, thickness, isHorizontal }) => {
  // For solid, just return a simple view
  if (variant === 'solid') {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color,
          ...(isHorizontal
            ? { height: thickness }
            : { width: thickness }),
        }}
      />
    );
  }

  // For dashed/dotted, create a pattern using multiple small views
  const dashWidth = variant === 'dashed' ? 8 : 3;
  const gapWidth = variant === 'dashed' ? 4 : 3;
  const dashCount = 50; // Create enough dashes to fill most containers

  const dashes = Array.from({ length: dashCount }, (_, i) => (
    <View
      key={i}
      style={{
        backgroundColor: color,
        ...(isHorizontal
          ? { width: dashWidth, height: thickness }
          : { width: thickness, height: dashWidth }),
        ...(variant === 'dotted' && { borderRadius: thickness }),
      }}
    />
  ));

  return (
    <View
      style={{
        flex: 1,
        flexDirection: isHorizontal ? 'row' : 'column',
        gap: gapWidth,
        overflow: 'hidden',
        ...(isHorizontal
          ? { height: thickness }
          : { width: thickness }),
      }}
    >
      {dashes}
    </View>
  );
};

// ============================================
// DIVIDER COMPONENT
// ============================================

export const Divider = forwardRef<ViewType, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      thickness = 'thin',
      color,
      spacing = 0,
      label,
      labelPosition = 'center',
      style,
    },
    ref
  ) => {
  const theme = useTheme();
  const dividerColor = color || theme.colors.border;
  const lineThickness = thicknessConfig[thickness];
  const isHorizontal = orientation === 'horizontal';

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flexDirection: isHorizontal ? 'row' : 'column',
        alignItems: 'center',
        ...(isHorizontal
          ? { marginVertical: spacing }
          : { marginHorizontal: spacing }),
      },
      lineContainer: {
        flex: 1,
        ...(isHorizontal
          ? { height: lineThickness }
          : { width: lineThickness }),
      },
      labelContainer: {
        paddingHorizontal: isHorizontal ? 12 : 0,
        paddingVertical: isHorizontal ? 0 : 8,
      },
      label: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        fontFamily: theme.typography.fontFamily.sans,
      },
    });
  }, [theme, orientation, lineThickness, spacing, isHorizontal]);

  const renderLine = () => (
    <View style={styles.lineContainer}>
      <PatternLine
        variant={variant}
        color={dividerColor}
        thickness={lineThickness}
        isHorizontal={isHorizontal}
      />
    </View>
  );

  if (label) {
    return (
      <View ref={ref} style={[styles.container, style]}>
        {(labelPosition === 'center' || labelPosition === 'right') && renderLine()}
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
        {(labelPosition === 'center' || labelPosition === 'left') && renderLine()}
      </View>
    );
  }

  return (
    <View ref={ref} style={[styles.container, style]}>
      {renderLine()}
    </View>
  );
  }
);

Divider.displayName = 'Divider';

export default Divider;
