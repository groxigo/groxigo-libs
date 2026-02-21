/**
 * Groxigo Design Tokens - Shadows
 * 
 * Shadow definitions for elevation and depth.
 */

export const shadows = {
  // Values match DESIGN_RULES §23 exactly (single shadow per level)
  xs: '0 1px 2px rgb(0 0 0 / 0.05)',
  sm: '0 1px 3px rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  card: '0 1px 3px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  
  // Glass shadows (softer, more diffused for glassmorphism)
  glass: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
    md: '0 4px 16px rgba(0, 0, 0, 0.12)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.16)',
  },
} as const;

export type ShadowKey = keyof typeof shadows;

