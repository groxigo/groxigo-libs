/**
 * Groxigo Design Tokens - Typography
 * 
 * Typography scale, font families, and font weights.
 */

export const typography = {
  fontFamily: {
    // For React Native, use the loaded font names
    sans: "GoogleSans_400Regular",
    sansLight: "GoogleSans_400Regular", // Google Sans doesn't have 300, use 400
    sansMedium: "GoogleSans_500Medium",
    sansSemiBold: "GoogleSans_600SemiBold",
    sansBold: "GoogleSans_700Bold",
    // For web fallback
    sansWeb: "'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  
  fontSize: {
    // Font size scale (base = 16px / 1rem)
    xs: 12,      // 0.75rem
    sm: 14,      // 0.875rem
    base: 16,    // 1rem
    lg: 18,      // 1.125rem
    xl: 20,      // 1.25rem
    '2xl': 24,   // 1.5rem
    '3xl': 30,   // 1.875rem
    '4xl': 36,   // 2.25rem
  },
  
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
  },
  
  letterSpacing: {
    tight: -0.025,
    normal: 0,
    wide: 0.025,
  },
} as const;

export type TypographyKey = keyof typeof typography;

