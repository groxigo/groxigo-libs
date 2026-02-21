/**
 * Groxigo Design Tokens - Layout
 *
 * Content max-widths, screen margins, grid gutters, and sidebar width.
 * Values sourced from DESIGN_RULES §27.
 */

export const layout = {
  /** Page max-width (§27) — outer content boundary */
  pageMaxWidth: 1200,
  /** Content max-width (§27) — primary content area */
  contentMaxWidth: 1000,
  /** Narrow max-width (§27) — forms, articles, auth cards */
  narrowMaxWidth: 600,
  /** Sidebar width (§27/§33) */
  sidebarWidth: 200,

  /** Screen margins per breakpoint (§27) */
  screenMargin: {
    /** Mobile horizontal padding (16px) */
    mobile: 16,
    /** Tablet horizontal padding (32px) */
    tablet: 32,
  },

  /** Grid gutter sizes (§27) */
  gridGutter: {
    /** Mobile gutter (8px) */
    mobile: 8,
    /** Tablet gutter (16px) */
    tablet: 16,
    /** Desktop gutter (24px) */
    desktop: 24,
  },
} as const;

export type LayoutKey = keyof typeof layout;
