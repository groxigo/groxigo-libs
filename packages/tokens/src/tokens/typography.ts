/**
 * Groxigo Design Tokens - Typography
 * 
 * Typography scale, font families, and font weights.
 */

export const typography = {
  fontFamily: {
    // For React Native, use the loaded font names
    sans: "GoogleSansFlex_400Regular",
    sansLight: "GoogleSansFlex_300Light",
    sansMedium: "GoogleSansFlex_500Medium",
    sansSemiBold: "GoogleSansFlex_600SemiBold",
    sansBold: "GoogleSansFlex_700Bold",
    // For web fallback
    sansWeb: "'Google Sans Flex', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  
  fontSize: {
    // Font size scale (base = 16px / 1rem)
    '2xs': 10,   // 0.625rem — overline, badge text
    xs: 12,      // 0.75rem
    sm: 14,      // 0.875rem
    base: 16,    // 1rem
    lg: 18,      // 1.125rem
    xl: 20,      // 1.25rem
    xxl: 22,     // 1.375rem — between xl and 2xl
    '2xl': 24,   // 1.5rem
    xxxl: 28,    // 1.75rem — between 2xl and 3xl
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
    none: 1,     // labels, buttons, badges, prices (§25)
    tight: 1.25,
    normal: 1.5,
  },
  
  letterSpacing: {
    tight: -0.025,
    normal: 0,
    wide: 0.025,
  },
} as const;

export type TypographyKey = keyof typeof typography;

