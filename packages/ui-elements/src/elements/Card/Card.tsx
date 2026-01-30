/**
 * Card Component
 *
 * A versatile card component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useMemo, forwardRef } from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import type { View as ViewType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import type { Theme } from '../../theme/types';
import type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardContentProps,
  CardFooterProps,
  CardVariant,
  CardPadding,
  CardRadius,
} from './Card.types';

// ============================================
// SIZE CONFIGURATIONS
// ============================================

const paddingConfig: Record<CardPadding, number> = {
  none: 0,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
};

const radiusConfig: Record<CardRadius, number> = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
};

// ============================================
// VARIANT HELPERS
// ============================================

/**
 * Normalizes variant names to support both old and new naming conventions
 * 'outlined' -> 'outline' (contract standard)
 * 'ghost' -> 'unstyled' (contract standard)
 */
function normalizeVariant(variant: string): CardVariant {
  if (variant === 'outlined') return 'outline';
  if (variant === 'ghost') return 'unstyled';
  return variant as CardVariant;
}

function getVariantStyles(theme: Theme, variant: CardVariant | string, pressed: boolean) {
  const colors = theme.colors;
  const shadows = theme.shadows;
  const isWeb = Platform.OS === 'web';

  // Normalize variant to contract standard
  const normalizedVariant = normalizeVariant(variant);

  // No shadow styles - platform specific
  const noShadow = isWeb
    ? { boxShadow: 'none' }
    : {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
      };

  switch (normalizedVariant) {
    case 'elevated':
      return {
        backgroundColor: pressed ? colors.surfaceSecondary : colors.surface,
        borderColor: 'transparent',
        borderWidth: 0,
        ...shadows.md,
      };
    case 'outline':
      return {
        backgroundColor: pressed ? colors.surfaceSecondary : colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        ...noShadow,
      };
    case 'filled':
      return {
        backgroundColor: pressed ? colors.surfaceTertiary : colors.surfaceSecondary,
        borderColor: 'transparent',
        borderWidth: 0,
        ...noShadow,
      };
    case 'unstyled':
      return {
        backgroundColor: pressed ? colors.surfaceSecondary : 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        ...noShadow,
      };
    default:
      return {
        backgroundColor: colors.surface,
        borderColor: 'transparent',
        borderWidth: 0,
        ...shadows.md,
      };
  }
}

// ============================================
// CARD COMPONENT
// ============================================

export const Card = forwardRef<ViewType, CardProps>(
  (
    {
      variant = 'elevated',
      padding = 'md',
      radius = 'md',
      pressable = false,
      disabled = false,
      onPress,
      children,
      style,
      ...props
    },
    ref
  ) => {
  const theme = useTheme();
  const paddingValue = paddingConfig[padding];
  const borderRadius = radiusConfig[radius];

  const baseStyles = useMemo(() => {
    return StyleSheet.create({
      container: {
        borderRadius,
        overflow: 'hidden',
        ...Platform.select({
          web: {
            cursor: pressable ? (disabled ? 'not-allowed' : 'pointer') : 'default',
          } as any,
        }),
      },
      content: {
        padding: paddingValue,
      },
    });
  }, [borderRadius, paddingValue, pressable, disabled]);

  if (pressable) {
    return (
      <Pressable
        ref={ref}
        style={({ pressed }) => {
          const variantStyles = getVariantStyles(theme, variant, pressed && !disabled);
          return [
            baseStyles.container,
            baseStyles.content,
            variantStyles,
            disabled && { opacity: 0.5 },
            style,
          ];
        }}
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        accessible
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        {...props}
      >
        {children}
      </Pressable>
    );
  }

  const variantStyles = getVariantStyles(theme, variant, false);

  return (
    <View
      ref={ref}
      style={[baseStyles.container, baseStyles.content, variantStyles, style]}
      {...props}
    >
      {children}
    </View>
  );
  }
);

Card.displayName = 'Card';

// ============================================
// CARD HEADER COMPONENT
// ============================================

export const CardHeader: React.FC<CardHeaderProps> = ({
  title,
  subtitle,
  left,
  right,
  style,
  children,
}) => {
  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
      },
      left: {
        marginRight: 12,
      },
      content: {
        flex: 1,
      },
      right: {
        marginLeft: 12,
      },
      title: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: '600',
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily.sans,
      },
      subtitle: {
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.textSecondary,
        fontFamily: theme.typography.fontFamily.sans,
        marginTop: 2,
      },
    });
  }, [theme]);

  if (children) {
    return <View style={[styles.container, style]}>{children}</View>;
  }

  return (
    <View style={[styles.container, style]}>
      {left && <View style={styles.left}>{left}</View>}
      <View style={styles.content}>
        {title && <Text style={styles.title}>{title}</Text>}
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {right && <View style={styles.right}>{right}</View>}
    </View>
  );
};

// ============================================
// CARD BODY COMPONENT (matches contract naming)
// ============================================

export const CardBody: React.FC<CardBodyProps> = ({ children, style }) => {
  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        // Body styles if needed
      },
    });
  }, []);

  return <View style={[styles.container, style]}>{children}</View>;
};

/**
 * @deprecated Use CardBody instead. This is kept for backward compatibility.
 */
export const CardContent: React.FC<CardContentProps> = CardBody;

// ============================================
// CARD FOOTER COMPONENT
// ============================================

export const CardFooter: React.FC<CardFooterProps> = ({ children, style }) => {
  const theme = useTheme();

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        gap: 8,
      },
    });
  }, [theme]);

  return <View style={[styles.container, style]}>{children}</View>;
};

export default Card;
