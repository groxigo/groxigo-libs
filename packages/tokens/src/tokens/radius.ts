/**
 * Groxigo Design Tokens - Border Radius
 * 
 * Border radius values for rounded corners.
 */

export const radius = {
  base: 10, // Base radius in pixels (0.625rem)
  
  none: 0,
  sm: 6,   // calc(var(--radius) - 4px)
  md: 8,   // calc(var(--radius) - 2px)
  lg: 10,  // var(--radius)
  xl: 14,  // calc(var(--radius) + 4px)
  full: 9999, // For fully rounded (pills, circles)
} as const;

export type RadiusKey = keyof typeof radius;

