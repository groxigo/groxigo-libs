/**
 * Groxigo Design Tokens - TypeScript Type Definitions
 *
 * Comprehensive type exports for better developer experience.
 * These types ensure type safety when consuming tokens in TypeScript projects.
 *
 * Two categories of types:
 * 1. DERIVED — auto-synced from source token objects via `typeof` (can never drift)
 * 2. STRUCTURAL CONTRACTS — manually defined interfaces for the theme system
 */

// Module type aliases for inline `typeof import(...)` pattern.
// This avoids runtime imports in the compiled JS — TypeScript resolves
// these at the type level only, so dist/types/index.js stays import-free.
type SpacingModule = typeof import('../tokens/spacing');
type TypographyModule = typeof import('../tokens/typography');
type RadiusModule = typeof import('../tokens/radius');
type ShadowsModule = typeof import('../tokens/shadows');
type OpacityModule = typeof import('../tokens/opacity');
type BlurModule = typeof import('../tokens/blur');
type BreakpointsModule = typeof import('../tokens/breakpoints');
type AnimationModule = typeof import('../tokens/animation');
type TokensModule = typeof import('../tokens');

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
  bgHover: CSSColor;
  bgFocus: CSSColor;
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
  shadow: string;
  shadowHover: string;
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
  thumbDisabled: CSSColor;
  borderOff: CSSColor;
  borderDisabled: CSSColor;
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
  icon: CSSColor;
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
// DERIVED TOKEN TYPES
// ============================================
// These types are derived from the source token objects via `typeof`.
// They can never drift out of sync — if a token is added or removed
// in its source file, the type updates automatically.

// Re-export key types already defined in source files
export type { SpacingKey } from '../tokens/spacing';
export type { RadiusKey } from '../tokens/radius';
export type { OpacityKey } from '../tokens/opacity';
export type { BlurKey } from '../tokens/blur';
export type { BreakpointKey } from '../tokens/breakpoints';
export type { DurationKey, EasingKey, TransitionKey, KeyframeKey, SpringKey, DelayKey } from '../tokens/animation';

// Spacing
export type SpacingTokens = SpacingModule['spacing'];

// Typography
export type FontFamilyTokens = TypographyModule['typography']['fontFamily'];
export type FontSizeTokens = TypographyModule['typography']['fontSize'];
export type FontWeightTokens = TypographyModule['typography']['fontWeight'];
export type LineHeightTokens = TypographyModule['typography']['lineHeight'];
export type LetterSpacingTokens = TypographyModule['typography']['letterSpacing'];
export type TypographyTokens = TypographyModule['typography'];

// Radius
export type RadiusTokens = RadiusModule['radius'];

// Shadows
export type ShadowTokens = ShadowsModule['shadows'];

// Opacity
export type OpacityTokens = OpacityModule['opacity'];

// Blur
export type BlurTokens = BlurModule['blur'];

// Breakpoints
export type BreakpointTokens = BreakpointsModule['breakpoints'];

// Animation
export type DurationTokens = AnimationModule['duration'];
export type EasingTokens = AnimationModule['easing'];
export type TransitionTokens = AnimationModule['transition'];
export type KeyframeTokens = AnimationModule['keyframes'];
export type SpringTokens = AnimationModule['spring'];
export type DelayTokens = AnimationModule['delay'];
export type ReducedMotionTokens = AnimationModule['reducedMotion'];
export type AnimationTokens = AnimationModule['animation'];

/** Spring configuration shape (standalone contract) */
export interface SpringConfig {
  tension: number;
  friction: number;
  mass: number;
}

// Complete token type
export type DesignTokens = TokensModule['tokens'];

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
