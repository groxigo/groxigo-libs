/**
 * Groxigo Design Tokens - Blur
 * 
 * Blur values for backdrop filter effects (glassmorphism).
 * These values are used for creating frosted glass effects.
 * 
 * Platform considerations:
 * - Web: CSS backdrop-filter: blur()
 * - React Native: expo-blur or @react-native-community/blur
 * - iOS: Native UIVisualEffectView
 * - Android: BlurView library
 */

export const blur = {
  none: 0,
  sm: 10,    // Subtle blur for light glass effects
  md: 20,    // Medium blur (default for glass surfaces)
  lg: 30,    // Strong blur for heavy glass effects
  xl: 40,    // Maximum blur for maximum frosted effect
} as const;

export type BlurKey = keyof typeof blur;

