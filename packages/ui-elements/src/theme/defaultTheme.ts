/**
 * Default Theme
 *
 * Production-ready default theme that imports from @groxigo/tokens.
 * This ensures ui-elements stays in sync with the design token system.
 */

import { Platform } from 'react-native';
import {
  primitives,
  semantic,
  semanticDark,
  spacing,
  spacingSemantic,
  spacingNegative,
  typography,
  textStyles,
  radius,
  shadows as tokenShadows,
  blur,
  opacity,
  breakpoints,
  mediaQueries,
  animation,
  zIndex,
  borderWidth,
  borderStyle,
  iconSize,
  iconContainer,
  iconStroke,
  focus,
} from '@groxigo/tokens';
import type { Theme, ThemeShadow } from './types';

// ============================================
// SHADOW HELPERS
// ============================================

const createShadow = (
  offsetY: number,
  radius: number,
  opacity: number,
  elevation: number
): ThemeShadow => {
  if (Platform.OS === 'web') {
    return {
      boxShadow: `0px ${offsetY}px ${radius}px rgba(0, 0, 0, ${opacity})`,
    } as ThemeShadow;
  }
  return {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: offsetY },
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation,
  };
};

// ============================================
// LIGHT THEME COLORS (from tokens)
// ============================================

const lightColors = {
  // Brand - from semantic tokens
  primary: semantic.brand.primary.default,
  primaryHover: semantic.brand.primary.hover,
  primaryActive: semantic.brand.primary.active,
  primarySubtle: semantic.brand.primary.subtle,
  primaryMuted: semantic.brand.primary.muted,

  secondary: semantic.brand.secondary.default,
  secondaryHover: semantic.brand.secondary.hover,
  secondaryActive: semantic.brand.secondary.active,
  secondarySubtle: semantic.brand.secondary.subtle,
  secondaryMuted: semantic.brand.secondary.muted,

  accent: semantic.brand.accent.default,
  accentHover: semantic.brand.accent.hover,
  accentActive: semantic.brand.accent.active,
  accentSubtle: semantic.brand.accent.subtle,
  accentMuted: semantic.brand.accent.muted,

  // Surface - from semantic tokens
  background: semantic.surface.primary,
  surface: semantic.surface.primary,
  surfaceSecondary: semantic.surface.secondary,
  surfaceTertiary: semantic.surface.tertiary,
  surfaceElevated: semantic.surface.elevated,
  surfaceSunken: semantic.surface.sunken,
  surfaceDisabled: semantic.surface.disabled,

  // Text - from semantic tokens
  text: semantic.text.primary,
  textSecondary: semantic.text.secondary,
  textTertiary: semantic.text.tertiary,
  textMuted: semantic.text.tertiary,
  textDisabled: semantic.text.disabled,
  textInverse: semantic.text.inverse,
  textLink: semantic.text.link,
  textLinkHover: semantic.text.linkHover,

  // Border - from semantic tokens
  border: semantic.border.default,
  borderSubtle: semantic.border.subtle,
  borderStrong: semantic.border.strong,
  borderFocus: semantic.border.focus,
  borderDisabled: semantic.border.disabled,

  // Status - from semantic tokens
  success: semantic.status.success.default,
  successHover: semantic.status.success.hover,
  successSubtle: semantic.status.success.subtle,
  successMuted: semantic.status.success.muted,
  successText: semantic.status.success.text,

  warning: semantic.status.warning.default,
  warningHover: semantic.status.warning.hover,
  warningSubtle: semantic.status.warning.subtle,
  warningMuted: semantic.status.warning.muted,
  warningText: semantic.status.warning.text,

  error: semantic.status.error.default,
  errorHover: semantic.status.error.hover,
  errorSubtle: semantic.status.error.subtle,
  errorMuted: semantic.status.error.muted,
  errorText: semantic.status.error.text,

  info: semantic.status.info.default,
  infoHover: semantic.status.info.hover,
  infoSubtle: semantic.status.info.subtle,
  infoMuted: semantic.status.info.muted,
  infoText: semantic.status.info.text,

  // Interactive - from semantic tokens
  interactive: semantic.interactive.default,
  interactiveHover: semantic.interactive.hover,
  interactiveActive: semantic.interactive.active,
  interactiveDisabled: semantic.interactive.disabled,
  interactiveFocus: semantic.interactive.focus,

  // Overlay - from semantic tokens
  overlay: semantic.overlay.dark,
  overlayLight: semantic.overlay.light,
  overlayMedium: semantic.overlay.medium,
  overlayHeavy: semantic.overlay.heavy,

  // Glass - from semantic tokens
  glassSurface: semantic.glass.surface.light,
  glassSurfaceMedium: semantic.glass.surface.medium,
  glassSurfaceHeavy: semantic.glass.surface.heavy,
  glassBorder: semantic.glass.border.default,
  glassBorderLight: semantic.glass.border.light,
  glassBorderSubtle: semantic.glass.border.subtle,

  // Absolute - from primitives
  white: primitives.white,
  black: primitives.black,
  transparent: primitives.transparent,

  // Primitives access (for advanced use cases)
  primitives,
};

// ============================================
// DARK THEME COLORS (from tokens)
// ============================================

const darkColors = {
  // Brand - from semantic dark tokens
  primary: semanticDark.brand.primary.default,
  primaryHover: semanticDark.brand.primary.hover,
  primaryActive: semanticDark.brand.primary.active,
  primarySubtle: semanticDark.brand.primary.subtle,
  primaryMuted: semanticDark.brand.primary.muted,

  secondary: semanticDark.brand.secondary.default,
  secondaryHover: semanticDark.brand.secondary.hover,
  secondaryActive: semanticDark.brand.secondary.active,
  secondarySubtle: semanticDark.brand.secondary.subtle,
  secondaryMuted: semanticDark.brand.secondary.muted,

  accent: semanticDark.brand.accent.default,
  accentHover: semanticDark.brand.accent.hover,
  accentActive: semanticDark.brand.accent.active,
  accentSubtle: semanticDark.brand.accent.subtle,
  accentMuted: semanticDark.brand.accent.muted,

  // Surface - from semantic dark tokens
  background: semanticDark.surface.primary,
  surface: semanticDark.surface.secondary,
  surfaceSecondary: semanticDark.surface.secondary,
  surfaceTertiary: semanticDark.surface.tertiary,
  surfaceElevated: semanticDark.surface.elevated,
  surfaceSunken: semanticDark.surface.sunken,
  surfaceDisabled: semanticDark.surface.disabled,

  // Text - from semantic dark tokens
  text: semanticDark.text.primary,
  textSecondary: semanticDark.text.secondary,
  textTertiary: semanticDark.text.tertiary,
  textMuted: semanticDark.text.tertiary,
  textDisabled: semanticDark.text.disabled,
  textInverse: semanticDark.text.inverse,
  textLink: semanticDark.text.link,
  textLinkHover: semanticDark.text.linkHover,

  // Border - from semantic dark tokens
  border: semanticDark.border.default,
  borderSubtle: semanticDark.border.subtle,
  borderStrong: semanticDark.border.strong,
  borderFocus: semanticDark.border.focus,
  borderDisabled: semanticDark.border.disabled,

  // Status - from semantic dark tokens
  success: semanticDark.status.success.default,
  successHover: semanticDark.status.success.hover,
  successSubtle: semanticDark.status.success.subtle,
  successMuted: semanticDark.status.success.muted,
  successText: semanticDark.status.success.text,

  warning: semanticDark.status.warning.default,
  warningHover: semanticDark.status.warning.hover,
  warningSubtle: semanticDark.status.warning.subtle,
  warningMuted: semanticDark.status.warning.muted,
  warningText: semanticDark.status.warning.text,

  error: semanticDark.status.error.default,
  errorHover: semanticDark.status.error.hover,
  errorSubtle: semanticDark.status.error.subtle,
  errorMuted: semanticDark.status.error.muted,
  errorText: semanticDark.status.error.text,

  info: semanticDark.status.info.default,
  infoHover: semanticDark.status.info.hover,
  infoSubtle: semanticDark.status.info.subtle,
  infoMuted: semanticDark.status.info.muted,
  infoText: semanticDark.status.info.text,

  // Interactive - from semantic dark tokens
  interactive: semanticDark.interactive.default,
  interactiveHover: semanticDark.interactive.hover,
  interactiveActive: semanticDark.interactive.active,
  interactiveDisabled: semanticDark.interactive.disabled,
  interactiveFocus: semanticDark.interactive.focus,

  // Overlay - from semantic dark tokens
  overlay: semanticDark.overlay.dark,
  overlayLight: semanticDark.overlay.light,
  overlayMedium: semanticDark.overlay.medium,
  overlayHeavy: semanticDark.overlay.heavy,

  // Glass - from semantic dark tokens
  glassSurface: semanticDark.glass.surface.light,
  glassSurfaceMedium: semanticDark.glass.surface.medium,
  glassSurfaceHeavy: semanticDark.glass.surface.heavy,
  glassBorder: semanticDark.glass.border.default,
  glassBorderLight: semanticDark.glass.border.light,
  glassBorderSubtle: semanticDark.glass.border.subtle,

  // Absolute - from primitives
  white: primitives.white,
  black: primitives.black,
  transparent: primitives.transparent,

  // Primitives access (for advanced use cases)
  primitives,
};

// ============================================
// SHARED THEME VALUES (from tokens)
// ============================================

// Spacing - directly from tokens (4pt grid)
const themeSpacing = {
  ...spacing,
  // Add semantic spacing aliases
  semantic: spacingSemantic,
  negative: spacingNegative,
};

// Typography - from tokens
const themeTypography = {
  fontFamily: {
    sans: typography.fontFamily.sans,
    sansLight: typography.fontFamily.sansLight,
    sansMedium: typography.fontFamily.sansMedium,
    sansSemiBold: typography.fontFamily.sansSemiBold,
    sansBold: typography.fontFamily.sansBold,
    sansWeb: typography.fontFamily.sansWeb,
    mono: typography.fontFamily.mono,
  },
  fontSize: {
    xs: typography.fontSize.xs,
    sm: typography.fontSize.sm,
    md: typography.fontSize.base, // alias for base
    base: typography.fontSize.base,
    lg: typography.fontSize.lg,
    xl: typography.fontSize.xl,
    '2xl': typography.fontSize['2xl'],
    '3xl': typography.fontSize['3xl'],
    '4xl': typography.fontSize['4xl'],
    '5xl': 48, // Extended
    '6xl': 60, // Extended
  },
  fontWeight: {
    thin: '100' as const,
    extralight: '200' as const,
    light: String(typography.fontWeight.light) as '300',
    normal: String(typography.fontWeight.normal) as '400',
    medium: String(typography.fontWeight.medium) as '500',
    semibold: String(typography.fontWeight.semibold) as '600',
    bold: String(typography.fontWeight.bold) as '700',
    extrabold: '800' as const,
    black: '900' as const,
  },
  lineHeight: {
    none: 1,
    tight: typography.lineHeight.tight,
    snug: 1.375,
    normal: typography.lineHeight.normal,
    relaxed: typography.lineHeight.relaxed,
    loose: 2,
  },
  letterSpacing: {
    tighter: -0.05,
    tight: typography.letterSpacing.tight,
    normal: typography.letterSpacing.normal,
    wide: typography.letterSpacing.wide,
    wider: 0.05,
    widest: 0.1,
  },
};

// Text styles - from tokens
const themeTextStyles = textStyles;

// Radius - from tokens
const themeRadius = {
  none: radius.none,
  sm: radius.sm,
  md: radius.md,
  lg: radius.lg,
  xl: radius.xl,
  '2xl': 16, // Extended (tokens has up to xl)
  '3xl': 24, // Extended
  full: radius.full,
};

// Shadows - using helper with token-based values
const themeShadows = {
  none: createShadow(0, 0, 0, 0),
  xs: createShadow(1, 1, 0.03, 1),
  sm: createShadow(1, 2, 0.05, 2),
  md: createShadow(2, 4, 0.08, 4),
  lg: createShadow(4, 8, 0.1, 8),
  xl: createShadow(8, 16, 0.12, 12),
  '2xl': createShadow(12, 24, 0.15, 16),
};

// Animation - from tokens
const themeAnimation = {
  duration: {
    instant: animation.duration.instant,
    fast: animation.duration.fast,
    normal: animation.duration.normal,
    moderate: animation.duration.moderate,
    slow: animation.duration.slow,
    slower: animation.duration.slower,
    deliberate: animation.duration.deliberate,
  },
  easing: {
    linear: animation.easing.linear,
    ease: animation.easing.ease,
    easeIn: animation.easing.easeIn,
    easeOut: animation.easing.easeOut,
    easeInOut: animation.easing.easeInOut,
    standard: animation.easing.standard,
    emphasized: animation.easing.emphasized,
    decelerate: animation.easing.decelerate,
    accelerate: animation.easing.accelerate,
    bounce: animation.easing.bounce,
    elastic: animation.easing.elastic,
    iosSpring: animation.easing.iosSpring,
  },
  spring: animation.spring,
  transition: animation.transition,
  keyframes: animation.keyframes,
  delay: animation.delay,
  reducedMotion: animation.reducedMotion,
};

// Breakpoints - from tokens (using token names)
const themeBreakpoints = {
  xs: 0, // Below mobile
  sm: breakpoints.mobile, // 375
  md: breakpoints.tablet, // 768
  lg: breakpoints.desktop, // 1024
  xl: breakpoints.large, // 1440
  '2xl': 1536, // Extended
};

// Z-Index - from tokens
const themeZIndex = {
  hide: zIndex.hide,
  base: zIndex.base,
  raised: zIndex.raised,
  dropdown: zIndex.dropdown,
  sticky: zIndex.sticky,
  fixed: zIndex.fixed,
  modalBackdrop: zIndex.modalBackdrop,
  modal: zIndex.modal,
  popover: zIndex.popover,
  tooltip: zIndex.tooltip,
  toast: zIndex.toast,
  max: zIndex.max,
};

// Border - from tokens (NEW)
const themeBorder = {
  width: borderWidth,
  style: borderStyle,
};

// Icon - from tokens (NEW)
const themeIcon = {
  size: iconSize,
  container: iconContainer,
  stroke: iconStroke,
};

// Focus - from tokens (NEW)
const themeFocus = focus;

// Blur - from tokens (NEW)
const themeBlur = blur;

// Opacity - from tokens (NEW)
const themeOpacity = opacity;

// Component defaults
const components = {
  button: {
    size: 'md' as const,
    variant: 'solid' as const,
    radius: 'md' as const,
  },
  input: {
    size: 'md' as const,
    variant: 'outline' as const,
    radius: 'md' as const,
  },
  card: {
    variant: 'elevated' as const,
    radius: 'lg' as const,
  },
  badge: {
    size: 'md' as const,
    variant: 'subtle' as const,
    radius: 'full' as const,
  },
  avatar: {
    size: 'md' as const,
    radius: 'full' as const,
  },
};

// ============================================
// EXPORTED THEMES
// ============================================

export const lightTheme: Theme = {
  name: 'light',
  mode: 'light',
  colors: lightColors,
  spacing: themeSpacing,
  typography: themeTypography,
  textStyles: themeTextStyles,
  radius: themeRadius,
  shadows: themeShadows,
  animation: themeAnimation,
  breakpoints: themeBreakpoints,
  zIndex: themeZIndex,
  border: themeBorder,
  icon: themeIcon,
  focus: themeFocus,
  blur: themeBlur,
  opacity: themeOpacity,
  components,
};

export const darkTheme: Theme = {
  name: 'dark',
  mode: 'dark',
  colors: darkColors,
  spacing: themeSpacing,
  typography: themeTypography,
  textStyles: themeTextStyles,
  radius: themeRadius,
  shadows: themeShadows,
  animation: themeAnimation,
  breakpoints: themeBreakpoints,
  zIndex: themeZIndex,
  border: themeBorder,
  icon: themeIcon,
  focus: themeFocus,
  blur: themeBlur,
  opacity: themeOpacity,
  components,
};

export const defaultTheme = lightTheme;

// Re-export tokens for direct access
export {
  primitives,
  semantic,
  semanticDark,
  spacing,
  spacingSemantic,
  spacingNegative,
  typography,
  textStyles,
  radius,
  tokenShadows,
  blur,
  opacity,
  breakpoints,
  mediaQueries,
  animation,
  zIndex,
  borderWidth,
  borderStyle,
  iconSize,
  iconContainer,
  iconStroke,
  focus,
};
