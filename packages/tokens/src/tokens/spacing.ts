/**
 * Groxigo Design Tokens - Spacing
 *
 * 4-point grid system with all values as multiples of 4px.
 *
 * For 8pt alignment, use even-numbered keys (2, 4, 6, 8...) which give
 * 8px, 16px, 24px, 32px respectively.
 *
 * Usage:
 * - Fine spacing (icons, badges): spacing[1] = 4px, spacing[1.5] = 6px
 * - Standard spacing: spacing[2] = 8px, spacing[4] = 16px
 * - Section spacing: spacing[6] = 24px, spacing[8] = 32px
 */

// ===========================================
// 4-POINT GRID SYSTEM
// Base unit: 4px
// ===========================================

export const spacing = {
  /** Base unit in pixels */
  base: 4,

  // Core spacing scale (4pt increments)
  /** 0px */
  0: 0,
  /** 1px - Hairline spacing */
  px: 1,
  /** 2px - Micro spacing */
  0.5: 2,
  /** 4px - Minimum spacing */
  1: 4,
  /** 6px - Tight spacing */
  1.5: 6,
  /** 8px - Compact spacing */
  2: 8,
  /** 10px - Small-medium spacing */
  2.5: 10,
  /** 12px - Medium-compact spacing */
  3: 12,
  /** 16px - Base spacing (1rem) */
  4: 16,
  /** 20px - Medium-large spacing */
  5: 20,
  /** 24px - Large spacing */
  6: 24,
  /** 28px - Large-extra spacing */
  7: 28,
  /** 32px - Extra spacing */
  8: 32,
  /** 36px */
  9: 36,
  /** 40px - Generous spacing */
  10: 40,
  /** 44px - iOS touch target */
  11: 44,
  /** 48px - Section spacing */
  12: 48,
  /** 56px */
  14: 56,
  /** 64px - Large section spacing */
  16: 64,
  /** 72px */
  18: 72,
  /** 80px - Major section spacing */
  20: 80,
  /** 96px - Hero spacing */
  24: 96,
  /** 112px */
  28: 112,
  /** 128px - Maximum spacing */
  32: 128,
  /** 160px */
  40: 160,
  /** 192px */
  48: 192,
  /** 256px */
  64: 256,
} as const;

export type SpacingKey = keyof typeof spacing;


// ===========================================
// SEMANTIC SPACING
// Named spacing for common use cases
// ===========================================

export const spacingSemantic = {
  /** Component internal padding */
  component: {
    /** Tight padding (8px) */
    tight: spacing[2],
    /** Default padding (12px) */
    default: spacing[3],
    /** Comfortable padding (16px) */
    comfortable: spacing[4],
    /** Spacious padding (20px) */
    spacious: spacing[5],
  },

  /** Gap between elements */
  gap: {
    /** Micro gap (4px) */
    micro: spacing[1],
    /** Tight gap (8px) */
    tight: spacing[2],
    /** Default gap (12px) */
    default: spacing[3],
    /** Comfortable gap (16px) */
    comfortable: spacing[4],
    /** Spacious gap (24px) */
    spacious: spacing[6],
  },

  /** Section spacing */
  section: {
    /** Tight section margin (16px) */
    tight: spacing[4],
    /** Default section margin (24px) */
    default: spacing[6],
    /** Large section margin (32px) */
    large: spacing[8],
    /** Hero section margin (48px) */
    hero: spacing[12],
  },

  /** Screen/page padding */
  screen: {
    /** Horizontal padding (16px) */
    horizontal: spacing[4],
    /** Vertical padding (16px) */
    vertical: spacing[4],
    /** Safe area bottom fallback (32px). Use env(safe-area-inset-bottom, 32px) in CSS — §34: never hardcode safe areas. */
    safeBottomFallback: spacing[8],
  },

  /** Card spacing */
  card: {
    /** Card padding (16px) */
    padding: spacing[4],
    /** Card inner gap (12px) */
    gap: spacing[3],
    /** Card margin (16px) */
    margin: spacing[4],
  },

  /** List spacing */
  list: {
    /** Item padding vertical (12px) */
    itemPaddingY: spacing[3],
    /** Item padding horizontal (16px) */
    itemPaddingX: spacing[4],
    /** Gap between items (8px) */
    gap: spacing[2],
  },

  /** Form spacing */
  form: {
    /** Label margin bottom (8px) */
    labelGap: spacing[2],
    /** Field gap (16px) */
    fieldGap: spacing[4],
    /** Section gap (24px) */
    sectionGap: spacing[6],
    /** Input padding horizontal (12px) */
    inputPaddingX: spacing[3],
    /** Input padding vertical (12px) */
    inputPaddingY: spacing[3],
  },

  /** Button spacing */
  button: {
    /** Small button padding (8px 12px) */
    sm: { x: spacing[3], y: spacing[2] },
    /** Medium button padding (12px 16px) */
    md: { x: spacing[4], y: spacing[3] },
    /** Large button padding (16px 24px) */
    lg: { x: spacing[6], y: spacing[4] },
  },

  /** Modal spacing */
  modal: {
    /** Modal padding (24px) */
    padding: spacing[6],
    /** Modal content gap (16px) */
    gap: spacing[4],
    /** Modal margin from screen edge (16px) */
    margin: spacing[4],
  },

  /** Navigation spacing */
  nav: {
    /** Tab bar height (56px) */
    tabBarHeight: spacing[14],
    /** Header height (56px) */
    headerHeight: spacing[14],
    /** Item padding (12px) */
    itemPadding: spacing[3],
  },
} as const;

// ===========================================
// NEGATIVE SPACING
// For negative margins and offsets
// ===========================================

export const spacingNegative = {
  '-px': -1,
  '-0.5': -2,
  '-1': -4,
  '-1.5': -6,
  '-2': -8,
  '-2.5': -10,
  '-3': -12,
  '-4': -16,
  '-5': -20,
  '-6': -24,
  '-8': -32,
  '-10': -40,
  '-12': -48,
  '-16': -64,
  '-20': -80,
  '-24': -96,
} as const;

export type SpacingNegativeKey = keyof typeof spacingNegative;

// ===========================================
// UTILITIES
// ===========================================

/**
 * Get spacing value by multiplier (4pt grid)
 * @param multiplier - Number of base units (e.g., 4 = 16px)
 */
export const getSpacing = (multiplier: number): number => {
  return multiplier * spacing.base;
};

/**
 * Check if a value is on the 4pt grid
 */
export const isOn4ptGrid = (value: number): boolean => {
  return value % 4 === 0;
};

/**
 * Snap a value to the nearest 4pt grid value
 */
export const snapTo4ptGrid = (value: number): number => {
  return Math.round(value / 4) * 4;
};

