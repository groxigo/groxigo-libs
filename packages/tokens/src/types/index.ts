/**
 * Groxigo Design Tokens - TypeScript Type Definitions
 *
 * Comprehensive type exports for better developer experience.
 * These types ensure type safety when consuming tokens in TypeScript projects.
 */

// ============================================
// PRIMITIVE TYPES
// ============================================

/** Color shade scale from 50 (lightest) to 950 (darkest) */
export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/** String representation of color shades for object keys */
export type ColorShadeKey = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950';

/** Hex color string */
export type HexColor = `#${string}`;

/** RGBA color string - flexible pattern to match various rgba formats */
export type RgbaColor = `rgba(${string})`;

/** Any valid CSS color value */
export type CSSColor = HexColor | RgbaColor | 'transparent' | 'inherit' | 'currentColor';

/** Color value that can be either a hex color or an rgba string */
export type ColorValue = HexColor | RgbaColor;

/** Color family with all shade values */
export type ColorFamily = Record<ColorShadeKey, HexColor>;

/** All available color family names */
export type ColorFamilyName =
  | 'gray'
  | 'blue'
  | 'green'
  | 'red'
  | 'yellow'
  | 'orange'
  | 'purple'
  | 'cyan'
  | 'pink'
  | 'indigo'
  | 'teal';

// ============================================
// PRIMITIVE TOKEN TYPES
// ============================================

export interface PrimitiveColors {
  white: HexColor;
  black: HexColor;
  transparent: 'transparent';
  gray: ColorFamily;
  blue: ColorFamily;
  green: ColorFamily;
  red: ColorFamily;
  yellow: ColorFamily;
  orange: ColorFamily;
  purple: ColorFamily;
  cyan: ColorFamily;
  pink: ColorFamily;
  indigo: ColorFamily;
  teal: ColorFamily;
}

// ============================================
// SEMANTIC TOKEN TYPES
// ============================================

export interface SurfaceTokens {
  primary: HexColor;
  secondary: HexColor;
  tertiary: HexColor;
  elevated: HexColor;
  sunken: HexColor;
  disabled: HexColor;
}

export interface TextTokens {
  primary: HexColor;
  secondary: HexColor;
  tertiary: HexColor;
  disabled: HexColor;
  inverse: HexColor;
  link: HexColor;
  linkHover: HexColor;
}

export interface BorderTokens {
  subtle: HexColor;
  default: HexColor;
  strong: HexColor;
  focus: HexColor;
  disabled: HexColor;
}

export interface BrandStateTokens {
  default: HexColor;
  hover: HexColor;
  active: HexColor;
  subtle: HexColor;
  muted: HexColor;
}

export interface BrandTokens {
  primary: BrandStateTokens;
  secondary: BrandStateTokens;
  accent: BrandStateTokens;
}

export interface StatusStateTokens {
  default: HexColor;
  hover: HexColor;
  active: HexColor;
  subtle: HexColor;
  muted: HexColor;
  text: HexColor;
}

export interface StatusTokens {
  success: StatusStateTokens;
  warning: StatusStateTokens;
  error: StatusStateTokens;
  info: StatusStateTokens;
}

export interface InteractiveTokens {
  default: HexColor;
  hover: HexColor;
  active: HexColor;
  disabled: HexColor;
  focus: HexColor;
}

export interface OverlayTokens {
  light: RgbaColor;
  medium: RgbaColor;
  dark: RgbaColor;
  heavy: RgbaColor;
}

export interface GlassSurfaceTokens {
  light: RgbaColor;
  medium: RgbaColor;
  heavy: RgbaColor;
  dark: RgbaColor;
}

export interface GlassBorderTokens {
  light: RgbaColor;
  default: RgbaColor;
  subtle: RgbaColor;
}

export interface GlassTokens {
  surface: GlassSurfaceTokens;
  border: GlassBorderTokens;
}

export interface SemanticColors {
  surface: SurfaceTokens;
  text: TextTokens;
  border: BorderTokens;
  brand: BrandTokens;
  status: StatusTokens;
  interactive: InteractiveTokens;
  overlay: OverlayTokens;
  glass: GlassTokens;
}

// ============================================
// COMPONENT TOKEN TYPES
// ============================================

export interface ButtonVariantTokens {
  bg: CSSColor;
  bgHover: CSSColor;
  bgActive: CSSColor;
  bgDisabled: CSSColor;
  text: CSSColor;
  textDisabled: CSSColor;
  border: CSSColor;
}

export interface ButtonTokens {
  primary: ButtonVariantTokens;
  secondary: ButtonVariantTokens;
  outline: ButtonVariantTokens;
  ghost: ButtonVariantTokens;
  danger: ButtonVariantTokens;
}

export interface InputTokens {
  bg: CSSColor;
  bgDisabled: CSSColor;
  text: CSSColor;
  textDisabled: CSSColor;
  placeholder: CSSColor;
  border: CSSColor;
  borderHover: CSSColor;
  borderFocus: CSSColor;
  borderError: CSSColor;
  borderDisabled: CSSColor;
}

export interface CardTokens {
  bg: CSSColor;
  border: CSSColor;
  borderHover: CSSColor;
}

export interface BadgeVariantTokens {
  bg: CSSColor;
  text: CSSColor;
}

export interface BadgeTokens {
  default: BadgeVariantTokens;
  primary: BadgeVariantTokens;
  secondary: BadgeVariantTokens;
  success: BadgeVariantTokens;
  warning: BadgeVariantTokens;
  error: BadgeVariantTokens;
  info: BadgeVariantTokens;
}

export interface ModalTokens {
  bg: CSSColor;
  border: CSSColor;
  overlay: CSSColor;
}

export interface NavTokens {
  bg: CSSColor;
  bgHover: CSSColor;
  bgActive: CSSColor;
  text: CSSColor;
  textHover: CSSColor;
  textActive: CSSColor;
  border: CSSColor;
}

export interface TabTokens {
  bg: CSSColor;
  bgHover: CSSColor;
  bgActive: CSSColor;
  text: CSSColor;
  textHover: CSSColor;
  textActive: CSSColor;
  border: CSSColor;
  borderActive: CSSColor;
}

export interface ToggleTokens {
  bgOff: CSSColor;
  bgOn: CSSColor;
  bgDisabled: CSSColor;
  thumb: CSSColor;
}

export interface ProgressTokens {
  bg: CSSColor;
  fill: CSSColor;
  fillSuccess: CSSColor;
  fillWarning: CSSColor;
  fillError: CSSColor;
}

export interface AlertVariantTokens {
  bg: CSSColor;
  border: CSSColor;
  text: CSSColor;
}

export interface AlertTokens {
  success: AlertVariantTokens;
  warning: AlertVariantTokens;
  error: AlertVariantTokens;
  info: AlertVariantTokens;
}

export interface GlassCardTokens {
  bg: CSSColor;
  border: CSSColor;
}

export interface GlassButtonTokens {
  bg: CSSColor;
  bgHover: CSSColor;
  border: CSSColor;
  text: CSSColor;
}

export interface GlassNavTokens {
  bg: CSSColor;
  border: CSSColor;
}

export interface GlassComponentTokens {
  card: GlassCardTokens;
  button: GlassButtonTokens;
  nav: GlassNavTokens;
}

export interface ComponentColors {
  button: ButtonTokens;
  input: InputTokens;
  card: CardTokens;
  badge: BadgeTokens;
  modal: ModalTokens;
  nav: NavTokens;
  tab: TabTokens;
  toggle: ToggleTokens;
  progress: ProgressTokens;
  alert: AlertTokens;
  glass: GlassComponentTokens;
}

// ============================================
// COMPLETE COLOR TOKEN TYPES
// ============================================

export interface DarkModeColors {
  semantic: SemanticColors;
  components: ComponentColors;
}

export interface ColorTokens {
  primitives: PrimitiveColors;
  semantic: SemanticColors;
  components: ComponentColors;
  dark: DarkModeColors;
}

// ============================================
// SPACING TYPES
// ============================================

export type SpacingKey = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 72 | 80 | 96;

export type SpacingTokens = Record<SpacingKey, number>;

// ============================================
// TYPOGRAPHY TYPES
// ============================================

export interface FontFamilyTokens {
  sans: string;
  sansLight: string;
  sansMedium: string;
  sansSemiBold: string;
  sansBold: string;
  sansWeb: string;
  mono: string;
}

export interface FontSizeTokens {
  xs: number;
  sm: number;
  base: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
  '5xl': number;
  '6xl': number;
}

export interface FontWeightTokens {
  thin: number;
  extralight: number;
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
  black: number;
}

export interface LineHeightTokens {
  none: number;
  tight: number;
  snug: number;
  normal: number;
  loose: number;
}

export interface LetterSpacingTokens {
  tighter: number;
  tight: number;
  normal: number;
  wide: number;
  wider: number;
  widest: number;
}

export interface TypographyTokens {
  fontFamily: FontFamilyTokens;
  fontSize: FontSizeTokens;
  fontWeight: FontWeightTokens;
  lineHeight: LineHeightTokens;
  letterSpacing: LetterSpacingTokens;
}

// ============================================
// RADIUS TYPES
// ============================================

export interface RadiusTokens {
  base: number;
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

// ============================================
// SHADOW TYPES
// ============================================

export interface ShadowTokens {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  glass: {
    sm: string;
    md: string;
    lg: string;
  };
}

// ============================================
// OPACITY TYPES
// ============================================

export type OpacityKey = 0 | 5 | 10 | 20 | 25 | 30 | 40 | 50 | 60 | 70 | 75 | 80 | 90 | 95 | 100;

export type OpacityTokens = Record<OpacityKey, number>;

// ============================================
// BLUR TYPES
// ============================================

export interface BlurTokens {
  none: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
}

// ============================================
// BREAKPOINT TYPES
// ============================================

export interface BreakpointTokens {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

// ============================================
// ANIMATION TYPES
// ============================================

export interface DurationTokens {
  instant: number;
  fast: number;
  normal: number;
  slow: number;
  slower: number;
  slowest: number;
}

export interface EasingTokens {
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
}

export interface TransitionTokens {
  none: string;
  all: string;
  colors: string;
  opacity: string;
  shadow: string;
  transform: string;
  button: string;
  input: string;
  card: string;
  modal: string;
  tooltip: string;
}

export interface KeyframeStep {
  transform?: string;
  opacity?: number;
}

export interface KeyframeDefinition {
  from?: KeyframeStep;
  to?: KeyframeStep;
  '0%'?: KeyframeStep;
  '50%'?: KeyframeStep;
  '100%'?: KeyframeStep;
}

export interface KeyframeTokens {
  fadeIn: KeyframeDefinition;
  fadeOut: KeyframeDefinition;
  scaleIn: KeyframeDefinition;
  scaleOut: KeyframeDefinition;
  slideInUp: KeyframeDefinition;
  slideInDown: KeyframeDefinition;
  slideInLeft: KeyframeDefinition;
  slideInRight: KeyframeDefinition;
  pulse: KeyframeDefinition;
  spin: KeyframeDefinition;
  bounce: KeyframeDefinition;
}

export interface SpringConfig {
  tension: number;
  friction: number;
  mass: number;
}

export interface SpringTokens {
  default: SpringConfig;
  gentle: SpringConfig;
  wobbly: SpringConfig;
  stiff: SpringConfig;
  slow: SpringConfig;
  molasses: SpringConfig;
}

export interface DelayTokens {
  none: number;
  short: number;
  medium: number;
  long: number;
}

export interface ReducedMotionTokens {
  duration: number;
  transition: string;
}

export interface AnimationTokens {
  duration: DurationTokens;
  easing: EasingTokens;
  transition: TransitionTokens;
  keyframes: KeyframeTokens;
  spring: SpringTokens;
  delay: DelayTokens;
  reducedMotion: ReducedMotionTokens;
}

// ============================================
// COMPLETE TOKEN TYPES
// ============================================

export interface DesignTokens {
  colors: ColorTokens;
  spacing: SpacingTokens;
  typography: TypographyTokens;
  shadows: ShadowTokens;
  radius: RadiusTokens;
  opacity: OpacityTokens;
  blur: BlurTokens;
  breakpoints: BreakpointTokens;
  animation: AnimationTokens;
}

// ============================================
// THEME TYPES
// ============================================

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primitives: PrimitiveColors;
  semantic: SemanticColors;
  components: ComponentColors;
}

export interface ThemeConfig {
  name: string;
  mode: ThemeMode;
  brand: {
    primary: ColorFamilyName;
    secondary: ColorFamilyName;
    accent: ColorFamilyName;
  };
  customColors?: Partial<PrimitiveColors>;
}

// ============================================
// UTILITY TYPES
// ============================================

/** Extract all possible CSS variable names from tokens */
export type CSSVariableName = `--${string}`;

/** Token path for accessing nested values */
export type TokenPath = string;

/** Contrast ratio result */
export interface ContrastResult {
  ratio: number;
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
  aaaLarge: boolean;
}

/** Validation result for tokens */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  path: TokenPath;
  message: string;
  value: unknown;
}

export interface ValidationWarning {
  path: TokenPath;
  message: string;
  value: unknown;
  suggestion?: string;
}
