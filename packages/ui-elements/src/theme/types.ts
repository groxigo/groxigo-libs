/**
 * Theme Type Definitions
 *
 * Comprehensive type system for theming across iOS, Android, and Web.
 * Types are aligned with @groxigo/tokens for full sync.
 */

import type { TextStyle } from 'react-native';

// ============================================
// COLOR TYPES
// ============================================

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface StateColors {
  default: string;
  hover: string;
  active: string;
  disabled: string;
  subtle: string;
}

export interface StatusColors {
  default: string;
  subtle: string;
  text: string;
}

export interface ThemeColors {
  // Brand colors
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primarySubtle: string;
  primaryMuted: string;

  secondary: string;
  secondaryHover: string;
  secondaryActive: string;
  secondarySubtle: string;
  secondaryMuted: string;

  accent: string;
  accentHover: string;
  accentActive: string;
  accentSubtle: string;
  accentMuted: string;

  // Surface colors
  background: string;
  surface: string;
  surfaceSecondary: string;
  surfaceTertiary: string;
  surfaceElevated: string;
  surfaceSunken: string;
  surfaceDisabled: string;

  // Text colors
  text: string;
  textSecondary: string;
  textTertiary: string;
  textMuted: string;
  textDisabled: string;
  textInverse: string;
  textLink: string;
  textLinkHover: string;

  // Border colors
  border: string;
  borderSubtle: string;
  borderStrong: string;
  borderFocus: string;
  borderDisabled: string;

  // Status colors
  success: string;
  successHover: string;
  successSubtle: string;
  successMuted: string;
  successText: string;

  warning: string;
  warningHover: string;
  warningSubtle: string;
  warningMuted: string;
  warningText: string;

  error: string;
  errorHover: string;
  errorSubtle: string;
  errorMuted: string;
  errorText: string;

  info: string;
  infoHover: string;
  infoSubtle: string;
  infoMuted: string;
  infoText: string;

  // Interactive colors
  interactive: string;
  interactiveHover: string;
  interactiveActive: string;
  interactiveDisabled: string;
  interactiveFocus: string;

  // Overlay colors
  overlay: string;
  overlayLight: string;
  overlayMedium: string;
  overlayHeavy: string;

  // Glass colors
  glassSurface: string;
  glassSurfaceMedium: string;
  glassSurfaceHeavy: string;
  glassBorder: string;
  glassBorderLight: string;
  glassBorderSubtle: string;

  // Absolute colors
  white: string;
  black: string;
  transparent: string;

  // Primitives access
  primitives: Record<string, any>;
}

// ============================================
// SPACING TYPES
// ============================================

export interface ThemeSpacing {
  base: number;
  0: number;
  px: number;
  0.5: number;
  1: number;
  1.5: number;
  2: number;
  2.5: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  11: number;
  12: number;
  14: number;
  16: number;
  18: number;
  20: number;
  24: number;
  28: number;
  32: number;
  40: number;
  48: number;
  64: number;
  // Semantic spacing
  semantic: {
    component: {
      tight: number;
      default: number;
      comfortable: number;
      spacious: number;
    };
    gap: {
      micro: number;
      tight: number;
      default: number;
      comfortable: number;
      spacious: number;
    };
    section: {
      tight: number;
      default: number;
      large: number;
      hero: number;
    };
    screen: {
      horizontal: number;
      vertical: number;
      safeBottom: number;
    };
    card: {
      padding: number;
      gap: number;
      margin: number;
    };
    list: {
      itemPaddingY: number;
      itemPaddingX: number;
      gap: number;
    };
    form: {
      labelGap: number;
      fieldGap: number;
      sectionGap: number;
      inputPaddingX: number;
      inputPaddingY: number;
    };
    button: {
      sm: { x: number; y: number };
      md: { x: number; y: number };
      lg: { x: number; y: number };
    };
    modal: {
      padding: number;
      gap: number;
      margin: number;
    };
    nav: {
      tabBarHeight: number;
      headerHeight: number;
      itemPadding: number;
    };
  };
  negative: Record<string, number>;
}

// ============================================
// TYPOGRAPHY TYPES
// ============================================

export interface ThemeFontSizes {
  xs: number;
  sm: number;
  md: number;
  base: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  '5xl': number;
  '6xl': number;
}

export interface ThemeFontWeights {
  thin: TextStyle['fontWeight'];
  extralight: TextStyle['fontWeight'];
  light: TextStyle['fontWeight'];
  normal: TextStyle['fontWeight'];
  medium: TextStyle['fontWeight'];
  semibold: TextStyle['fontWeight'];
  bold: TextStyle['fontWeight'];
  extrabold: TextStyle['fontWeight'];
  black: TextStyle['fontWeight'];
}

export interface ThemeLineHeights {
  none: number;
  tight: number;
  snug: number;
  normal: number;
  relaxed: number;
  loose: number;
}

export interface ThemeLetterSpacing {
  tighter: number;
  tight: number;
  normal: number;
  wide: number;
  wider: number;
  widest: number;
}

export interface ThemeFontFamily {
  sans: string;
  sansLight: string;
  sansMedium: string;
  sansSemiBold: string;
  sansBold: string;
  sansWeb: string;
  mono: string;
}

export interface ThemeTypography {
  fontFamily: ThemeFontFamily;
  fontSize: ThemeFontSizes;
  fontWeight: ThemeFontWeights;
  lineHeight: ThemeLineHeights;
  letterSpacing: ThemeLetterSpacing;
}

// ============================================
// TEXT STYLES TYPES
// ============================================

export interface TextStyleDefinition {
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing?: number;
  fontFamily?: string;
}

export interface ThemeTextStyles {
  // Display
  displayLarge: TextStyleDefinition;
  displayMedium: TextStyleDefinition;
  displaySmall: TextStyleDefinition;
  // Headings
  h1: TextStyleDefinition;
  h2: TextStyleDefinition;
  h3: TextStyleDefinition;
  h4: TextStyleDefinition;
  h5: TextStyleDefinition;
  h6: TextStyleDefinition;
  // Body
  bodyLarge: TextStyleDefinition;
  body: TextStyleDefinition;
  bodySmall: TextStyleDefinition;
  bodyXs: TextStyleDefinition;
  // Labels
  labelLarge: TextStyleDefinition;
  label: TextStyleDefinition;
  labelSmall: TextStyleDefinition;
  // Captions
  caption: TextStyleDefinition;
  captionStrong: TextStyleDefinition;
  overline: TextStyleDefinition;
  // Special
  price: TextStyleDefinition;
  priceLarge: TextStyleDefinition;
  priceSmall: TextStyleDefinition;
  badge: TextStyleDefinition;
  code: TextStyleDefinition;
}

// ============================================
// BORDER RADIUS TYPES
// ============================================

export interface ThemeRadius {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  full: number;
}

// ============================================
// SHADOW TYPES
// ============================================

export interface ThemeShadow {
  // Native shadow props
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
  // Web shadow prop
  boxShadow?: string;
}

export interface ThemeShadows {
  none: ThemeShadow;
  xs: ThemeShadow;
  sm: ThemeShadow;
  md: ThemeShadow;
  lg: ThemeShadow;
  xl: ThemeShadow;
  '2xl': ThemeShadow;
}

// ============================================
// ANIMATION TYPES
// ============================================

export interface ThemeAnimationDuration {
  instant: number;
  fast: number;
  normal: number;
  moderate: number;
  slow: number;
  slower: number;
  deliberate: number;
}

export interface ThemeAnimationEasing {
  linear: string;
  ease: string;
  easeIn: string;
  easeOut: string;
  easeInOut: string;
  standard: string;
  emphasized: string;
  decelerate: string;
  accelerate: string;
  bounce: string;
  elastic: string;
  iosSpring: string;
}

export interface ThemeAnimationSpring {
  gentle: { tension: number; friction: number; mass: number };
  default: { tension: number; friction: number; mass: number };
  bouncy: { tension: number; friction: number; mass: number };
  stiff: { tension: number; friction: number; mass: number };
  slow: { tension: number; friction: number; mass: number };
}

export interface ThemeAnimation {
  duration: ThemeAnimationDuration;
  easing: ThemeAnimationEasing;
  spring: ThemeAnimationSpring;
  transition: Record<string, string>;
  keyframes: Record<string, Record<string, any>>;
  delay: Record<string, number>;
  reducedMotion: {
    mediaQuery: string;
    duration: number;
    easing: string;
  };
}

// ============================================
// BREAKPOINT TYPES
// ============================================

export interface ThemeBreakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

// ============================================
// Z-INDEX TYPES
// ============================================

export interface ThemeZIndex {
  hide: number;
  base: number;
  raised: number;
  dropdown: number;
  sticky: number;
  fixed: number;
  modalBackdrop: number;
  modal: number;
  popover: number;
  tooltip: number;
  toast: number;
  max: number;
}

// ============================================
// BORDER TYPES (NEW)
// ============================================

export interface ThemeBorderWidth {
  none: number;
  hairline: number;
  thin: number;
  medium: number;
  thick: number;
  heavy: number;
}

export interface ThemeBorderStyle {
  none: string;
  solid: string;
  dashed: string;
  dotted: string;
}

export interface ThemeBorder {
  width: ThemeBorderWidth;
  style: ThemeBorderStyle;
}

// ============================================
// ICON TYPES (NEW)
// ============================================

export interface ThemeIconSize {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
}

export interface ThemeIconContainer {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

export interface ThemeIconStroke {
  thin: number;
  light: number;
  regular: number;
  medium: number;
  bold: number;
}

export interface ThemeIcon {
  size: ThemeIconSize;
  container: ThemeIconContainer;
  stroke: ThemeIconStroke;
}

// ============================================
// FOCUS TYPES (NEW)
// ============================================

export interface ThemeFocusWidth {
  thin: number;
  default: number;
  thick: number;
}

export interface ThemeFocusOffset {
  none: number;
  tight: number;
  default: number;
  spacious: number;
}

export interface ThemeFocusColors {
  primary: string;
  primaryRing: string;
  primaryWithOffset: string;
  error: string;
  errorRing: string;
  success: string;
  successRing: string;
  neutral: string;
  neutralRing: string;
  inverse: string;
  inverseRing: string;
}

export interface ThemeFocusStyle {
  outlineWidth: number;
  outlineStyle: 'solid';
  outlineColor: string;
  outlineOffset: number;
}

export interface ThemeFocus {
  width: ThemeFocusWidth;
  offset: ThemeFocusOffset;
  colors: ThemeFocusColors;
  colorsDark: ThemeFocusColors;
  style: Record<string, ThemeFocusStyle>;
  styleDark: Record<string, ThemeFocusStyle>;
}

// ============================================
// BLUR TYPES (NEW)
// ============================================

export interface ThemeBlur {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

// ============================================
// OPACITY TYPES (NEW)
// ============================================

export interface ThemeOpacity {
  '100': number;
  '90': number;
  '80': number;
  '70': number;
  '60': number;
  '50': number;
  '40': number;
  '30': number;
  '20': number;
  '10': number;
  '0': number;
}

// ============================================
// COMPONENT DEFAULTS
// ============================================

export interface ThemeComponentDefaults {
  button: {
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant: 'solid' | 'outline' | 'ghost' | 'soft' | 'link';
    radius: keyof ThemeRadius;
  };
  input: {
    size: 'sm' | 'md' | 'lg';
    variant: 'outline' | 'filled' | 'flushed' | 'unstyled';
    radius: keyof ThemeRadius;
  };
  card: {
    variant: 'elevated' | 'outline' | 'filled' | 'ghost';
    radius: keyof ThemeRadius;
  };
  badge: {
    size: 'sm' | 'md' | 'lg';
    variant: 'solid' | 'subtle' | 'outline';
    radius: keyof ThemeRadius;
  };
  avatar: {
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    radius: keyof ThemeRadius;
  };
}

// ============================================
// MAIN THEME TYPE
// ============================================

export interface Theme {
  name: string;
  mode: 'light' | 'dark';
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  textStyles: ThemeTextStyles;
  radius: ThemeRadius;
  shadows: ThemeShadows;
  animation: ThemeAnimation;
  breakpoints: ThemeBreakpoints;
  zIndex: ThemeZIndex;
  border: ThemeBorder;
  icon: ThemeIcon;
  focus: ThemeFocus;
  blur: ThemeBlur;
  opacity: ThemeOpacity;
  components: ThemeComponentDefaults;
}

// ============================================
// PARTIAL THEME (for overrides)
// ============================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type PartialTheme = DeepPartial<Theme>;

// ============================================
// THEME CONTEXT TYPE
// ============================================

export interface ThemeContextValue {
  theme: Theme;
  colorScheme: 'light' | 'dark';
  setColorScheme: (scheme: 'light' | 'dark') => void;
  toggleColorScheme: () => void;
}

// ============================================
// RESPONSIVE TYPES
// ============================================

export type Breakpoint = keyof ThemeBreakpoints;

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

export interface ResponsiveInfo {
  breakpoint: Breakpoint;
  width: number;
  height: number;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
