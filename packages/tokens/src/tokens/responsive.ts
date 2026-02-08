/**
 * Responsive Typography Configuration
 *
 * Enterprise-grade responsive scaling configuration.
 * Single source of truth for all responsive behavior.
 *
 * Uses hybrid approach:
 * - Phone: Fixed 1.0x scale
 * - Tablet: Fluid scaling (interpolated between min and max)
 * - Desktop: Fixed scale (users sit further from screen)
 */

// ============================================
// VIEWPORT CONFIGURATION
// ============================================

/**
 * Viewport breakpoints in density-independent points (dp)
 *
 * - min: Smallest supported phone (iPhone SE)
 * - tabletStart: Where tablet scaling begins
 * - tabletEnd: Where tablet scaling ends (iPad Pro 13")
 * - max: Desktop/large displays
 */
export const viewportBounds = {
  /** Minimum viewport (smallest phone) */
  min: 320,
  /** Where fluid tablet scaling starts (diagonal dp)
   * iPhone 16 Pro Max diagonal ≈ 1026dp, iPad Mini ≈ 1355dp
   * Set to 1100 to ensure all phones use 1.0x scale */
  tabletStart: 1100,
  /** Where fluid tablet scaling ends (iPad Pro 13" diagonal ≈ 1707dp) */
  tabletEnd: 1700,
  /** Desktop threshold */
  max: 1800,
} as const;

// ============================================
// SCALE BOUNDS BY ELEMENT TYPE
// ============================================

/**
 * Scale bounds for different element types
 *
 * Each element type has different scaling needs:
 * - font: Body text - conservative to avoid "zoomed in" feel
 * - heading: Headlines can be bolder
 * - caption: Small text needs more scaling to stay readable
 * - spacing: Layout spacing
 * - icon: Icons get chunky fast
 * - ui: Buttons/inputs shouldn't grow too much
 * - touchTarget: Minimum touch target sizes
 */
export const scaleBounds = {
  /** Body text scaling */
  font: {
    min: 1.0,
    max: 1.6,
  },
  /** Heading text scaling (h1-h6) */
  heading: {
    min: 1.0,
    max: 1.8,
  },
  /** Small text (caption, label, overline) */
  caption: {
    min: 1.0,
    max: 1.75,
  },
  /** Layout spacing */
  spacing: {
    min: 1.0,
    max: 1.5,
  },
  /** Icon sizes */
  icon: {
    min: 1.0,
    max: 1.5,
  },
  /** UI elements (buttons, inputs) */
  ui: {
    min: 1.0,
    max: 1.4,
  },
  /** Touch target minimum sizes (absolute values, not scales) */
  touchTarget: {
    phone: 44,      // Apple HIG minimum
    tablet: 48,
    desktop: 40,    // Mouse pointer, smaller OK
  },
} as const;

// ============================================
// DEVICE-SPECIFIC FIXED SCALES
// ============================================

/**
 * Fixed scales for non-tablet devices
 *
 * Phone: Base scale (1.0x) - screens are already optimized for readability
 * Desktop: Matches tablet max scales for continuity (no sudden jumps)
 *          Users sit further from large screens, so keeping tablet max is appropriate
 */
export const fixedScales = {
  phone: {
    font: 1.0,
    heading: 1.0,
    caption: 1.0,
    spacing: 1.0,
    icon: 1.0,
    ui: 1.0,
  },
  desktop: {
    // Match tablet max scales for smooth transition at 1400dp boundary
    font: 1.6,      // matches scaleBounds.font.max
    heading: 1.8,   // matches scaleBounds.heading.max
    caption: 1.75,  // matches scaleBounds.caption.max
    spacing: 1.5,   // matches scaleBounds.spacing.max
    icon: 1.5,      // matches scaleBounds.icon.max
    ui: 1.4,        // matches scaleBounds.ui.max
  },
} as const;

// ============================================
// SYSTEM ACCESSIBILITY CONFIGURATION
// ============================================

/**
 * System font scale configuration
 *
 * Respects iOS Dynamic Type and Android font scaling settings.
 * Allows users with accessibility needs to have even larger text.
 */
export const accessibilityConfig = {
  /** Whether to respect system font scale */
  respectSystemFontScale: true,
  /**
   * Maximum system font scale per element type (DESIGN_RULES §34).
   * Body text allows more growth for readability; labels/buttons are
   * capped tighter to prevent container overflow.
   */
  maxSystemFontScale: {
    body: 2.0,
    heading: 1.5,
    label: 1.3,
  },
  /** Minimum system font scale (for users who prefer smaller text) */
  minSystemFontScale: 0.8,
} as const;

// ============================================
// COMPLETE RESPONSIVE CONFIG
// ============================================

/**
 * Complete responsive typography configuration
 */
export const responsive = {
  viewport: viewportBounds,
  scales: scaleBounds,
  fixed: fixedScales,
  accessibility: accessibilityConfig,
} as const;

// ============================================
// FLUID CSS CONFIGURATION
// ============================================

/**
 * Configuration for CSS clamp()-based fluid scaling.
 *
 * Produces smooth interpolation between viewportMin and viewportMax
 * so token values (font-size, spacing, radius, component heights)
 * scale continuously instead of jumping at breakpoints.
 *
 * absoluteMin is the smallest CSS viewport width of any modern phone
 * manufactured after 2018 (budget Androids like Samsung Galaxy A05,
 * Redmi 13C — all 720×1600 = 360px CSS width).  Viewports between
 * 360–375px receive the fixed minimum values from the clamp().
 */
export const fluidConfig = {
  /** Absolute minimum — no phone below this since 2018 */
  absoluteMin: 360,
  /** Fluid interpolation start (most phones) */
  viewportMin: 375,
  /** Fluid interpolation end (large desktop) */
  viewportMax: 1440,
} as const;

// ============================================
// TYPES
// ============================================

export type ViewportBounds = typeof viewportBounds;
export type ScaleBounds = typeof scaleBounds;
export type FixedScales = typeof fixedScales;
export type AccessibilityConfig = typeof accessibilityConfig;
export type ResponsiveConfig = typeof responsive;

export type FluidConfig = typeof fluidConfig;
export type ScaleType = keyof typeof scaleBounds;
export type DeviceCategory = 'phone' | 'tablet' | 'desktop';

export default responsive;
