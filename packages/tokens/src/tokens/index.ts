/**
 * Groxigo Design Tokens - Main Export
 *
 * This is the single source of truth for all design tokens.
 * Export all tokens from a central location.
 *
 * Token Categories:
 * - Colors: Primitives, Semantic, Component-level colors
 * - Spacing: 4pt grid system with semantic naming
 * - Typography: Font families, sizes, weights, line heights
 * - Text Styles: Pre-composed typography presets (h1-h6, body, labels, etc.)
 * - Shadows: Elevation and depth
 * - Radius: Border radius scale
 * - Opacity: Transparency values
 * - Blur: Backdrop blur for glassmorphism
 * - Breakpoints: Responsive breakpoints
 * - Animation: Durations, easings, transitions, keyframes
 * - Z-Index: Layering scale
 * - Border: Border widths and styles
 * - Icon: Icon sizes, containers, and strokes
 * - Focus: Focus ring accessibility tokens
 */

// Re-export all named exports
export * from './colors';
export * from './spacing';
export * from './typography';
export * from './text-styles';
export * from './shadows';
export * from './radius';
export * from './opacity';
export * from './blur';
export * from './breakpoints';
export * from './animation';
export * from './z-index';
export * from './border';
export * from './icon-size';
export * from './focus';
export * from './responsive';
export * from './layout';

// Import for combined tokens object
import { colors } from './colors';
import { spacing, spacingSemantic, spacingNegative } from './spacing';
import { typography } from './typography';
import { textStyles } from './text-styles';
import { shadows } from './shadows';
import { radius } from './radius';
import { opacity } from './opacity';
import { blur } from './blur';
import { breakpoints, containerBreakpoints, mediaQueries } from './breakpoints';
import { animation } from './animation';
import { zIndex } from './z-index';
import { border } from './border';
import { icon } from './icon-size';
import { focus } from './focus';
import { responsive } from './responsive';
import { layout } from './layout';

/**
 * Complete tokens object containing all design tokens
 */
export const tokens = {
  // Core tokens
  colors,
  spacing,
  typography,
  shadows,
  radius,
  opacity,
  blur,
  breakpoints,
  animation,

  // New tokens
  zIndex,
  border,
  icon,
  focus,
  textStyles,
  responsive,

  // Extended spacing
  spacingSemantic,
  spacingNegative,

  // Container query breakpoints (§27)
  containerBreakpoints,

  // Breakpoint utilities
  mediaQueries,

  // Layout (§27)
  layout,
} as const;

export default tokens;

