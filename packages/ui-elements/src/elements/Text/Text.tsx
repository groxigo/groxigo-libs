/**
 * Text Component
 *
 * A versatile text component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 * All styles derived from theme tokens.
 *
 * Features responsive typography that automatically scales for tablets/large screens.
 */

import React, { useMemo, forwardRef } from 'react';
import { Text as RNText, StyleSheet, Platform } from 'react-native';
import type { Text as TextType } from 'react-native';
import { useDeviceType } from '@groxigo/ui-core';
import { useTheme } from '../../hooks/useTheme';
import type { Theme } from '../../theme/types';
import type { TextProps, TextVariant, TextWeight, TextColorScheme } from './Text.types';

// ============================================
// VARIANT CONFIGURATIONS FROM THEME
// ============================================

interface VariantStyleConfig {
  fontSize: number;
  lineHeight: number;
  fontFamily: string;
  letterSpacing?: number;
}

/**
 * Get variant styles from theme.textStyles or fallback to computed values
 */
function getVariantStyles(theme: Theme, variant: TextVariant): VariantStyleConfig {
  const { fontSize, lineHeight, fontFamily, letterSpacing } = theme.typography;
  const textStyles = theme.textStyles;

  // Map component variants to textStyles keys
  const textStyleMap: Record<TextVariant, keyof typeof textStyles | null> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body: 'body',
    bodyLarge: 'bodyLarge',
    bodySmall: 'bodySmall',
    caption: 'caption',
    label: 'label',
    overline: 'overline',
  };

  const textStyleKey = textStyleMap[variant];
  if (textStyleKey && textStyles?.[textStyleKey]) {
    const style = textStyles[textStyleKey];
    return {
      fontSize: style.fontSize,
      lineHeight: style.lineHeight,
      fontFamily: style.fontFamily || fontFamily.sans,
      letterSpacing: style.letterSpacing,
    };
  }

  // Fallback to computed values
  const variantConfig: Record<TextVariant, VariantStyleConfig> = {
    h1: { fontSize: fontSize['4xl'], lineHeight: lineHeight.tight, fontFamily: fontFamily.sans },
    h2: { fontSize: fontSize['3xl'], lineHeight: lineHeight.tight, fontFamily: fontFamily.sans },
    h3: { fontSize: fontSize['2xl'], lineHeight: lineHeight.snug, fontFamily: fontFamily.sans },
    h4: { fontSize: fontSize.xl, lineHeight: lineHeight.snug, fontFamily: fontFamily.sans },
    h5: { fontSize: fontSize.lg, lineHeight: lineHeight.normal, fontFamily: fontFamily.sans },
    h6: { fontSize: fontSize.md, lineHeight: lineHeight.normal, fontFamily: fontFamily.sans },
    body: { fontSize: fontSize.md, lineHeight: lineHeight.normal, fontFamily: fontFamily.sans },
    bodyLarge: { fontSize: fontSize.lg, lineHeight: lineHeight.relaxed, fontFamily: fontFamily.sans },
    bodySmall: { fontSize: fontSize.sm, lineHeight: lineHeight.normal, fontFamily: fontFamily.sans },
    caption: { fontSize: fontSize.xs, lineHeight: lineHeight.normal, fontFamily: fontFamily.sans },
    label: { fontSize: fontSize.sm, lineHeight: lineHeight.tight, fontFamily: fontFamily.sans },
    overline: { fontSize: fontSize.xs, lineHeight: lineHeight.tight, fontFamily: fontFamily.sans, letterSpacing: letterSpacing.widest },
  };

  return variantConfig[variant];
}

function getWeightValue(weight: TextWeight): string {
  const weights: Record<TextWeight, string> = {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  };
  return weights[weight];
}

// Get font family based on weight (for React Native custom fonts)
function getFontFamilyForWeight(theme: Theme, weight: TextWeight): string {
  const { fontFamily } = theme.typography;

  // Map weights to specific font families
  const fontMap: Record<TextWeight, string> = {
    light: (fontFamily as any).sansLight || fontFamily.sans,
    normal: fontFamily.sans,
    medium: (fontFamily as any).sansMedium || fontFamily.sans,
    semibold: (fontFamily as any).sansSemiBold || fontFamily.sans,
    bold: (fontFamily as any).sansBold || fontFamily.sans,
  };

  return fontMap[weight];
}

function getColorFromScheme(theme: Theme, colorScheme: TextColorScheme): string {
  const colors = theme.colors;

  const colorMap: Record<TextColorScheme, string> = {
    default: colors.text,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
    muted: colors.textMuted,
  };

  return colorMap[colorScheme];
}

// ============================================
// TEXT COMPONENT
// ============================================

/**
 * Get the appropriate scale based on text variant
 * - Headings: Use headingScale (larger scaling for impact)
 * - Body: Use fontScale (standard body text scaling)
 * - Captions/Labels: Use captionScale (slightly more scaling for readability)
 */
function getScaleForVariant(
  variant: TextVariant,
  scale: { fontScale: number; headingScale: number; captionScale: number }
): number {
  // Headings get larger scaling
  if (variant.startsWith('h')) {
    return scale.headingScale;
  }

  // Small text gets more scaling to stay readable
  if (variant === 'caption' || variant === 'label' || variant === 'overline') {
    return scale.captionScale;
  }

  // Body text uses standard font scale
  return scale.fontScale;
}

export const Text = forwardRef<TextType, TextProps>(
  (
    {
      variant = 'body',
      weight = 'normal',
      align,
      colorScheme = 'default',
      color,
      truncate = false,
      responsive = true,
      style,
      children,
      ...props
    },
    ref
  ) => {
  const theme = useTheme();
  const { scale } = useDeviceType();

  const textStyles = useMemo(() => {
    const variantStyles = getVariantStyles(theme, variant);
    const textColor = color || getColorFromScheme(theme, colorScheme);

    // Heading variants get bolder default weight
    const isHeading = variant.startsWith('h');
    const effectiveWeight = isHeading && weight === 'normal' ? 'bold' : weight;

    // Use weight-specific font family for React Native custom fonts
    const fontFamily = getFontFamilyForWeight(theme, effectiveWeight);

    // Apply responsive scaling based on variant type
    // Headings, body, and captions each have their own scale bounds
    const fontScale = responsive ? getScaleForVariant(variant, scale) : 1;
    const scaledFontSize = Math.round(variantStyles.fontSize * fontScale);
    const baseLineHeight = variantStyles.lineHeight > 3
      ? variantStyles.lineHeight
      : variantStyles.fontSize * variantStyles.lineHeight;
    const scaledLineHeight = Math.round(baseLineHeight * fontScale);

    return StyleSheet.create({
      text: {
        fontFamily: fontFamily,
        fontSize: scaledFontSize,
        lineHeight: scaledLineHeight,
        // fontWeight not needed when using weight-specific font families
        color: textColor,
        ...(align && { textAlign: align }),
        ...(truncate && {
          overflow: 'hidden',
        }),
        ...(variant === 'overline' && {
          textTransform: 'uppercase',
          letterSpacing: variantStyles.letterSpacing || theme.typography.letterSpacing.widest,
        }),
        // Web-specific styles
        ...Platform.select({
          web: {
            userSelect: 'text',
          } as any,
        }),
      },
    });
  }, [theme, variant, weight, align, colorScheme, color, truncate, responsive, scale]);

  return (
    <RNText
      ref={ref}
      style={[textStyles.text, style]}
      numberOfLines={truncate ? 1 : undefined}
      ellipsizeMode={truncate ? 'tail' : undefined}
      {...props}
    >
      {children}
    </RNText>
  );
  }
);

Text.displayName = 'Text';

export default Text;
