/**
 * Groxigo Design Tokens - Border Radius
 * 
 * Border radius values for rounded corners.
 */

export const radius = {
  base: 10, // Base radius in pixels (0.625rem)

  none: 0,
  xs: 4,     // menus, tags, small cards
  sm: 6,     // calc(var(--radius) - 4px)
  md: 8,     // calc(var(--radius) - 2px)
  lg: 10,    // var(--radius)
  xl: 14,    // calc(var(--radius) + 4px)
  '2xl': 20, // large cards, modals
  '3xl': 24,
  '4xl': 28,
  '5xl': 32,
  full: 9999, // For fully rounded (pills, circles)
} as const;

export type RadiusKey = keyof typeof radius;

