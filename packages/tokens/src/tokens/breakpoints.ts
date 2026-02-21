/**
 * Groxigo Design Tokens - Breakpoints
 * 
 * Responsive breakpoints for mobile, tablet, desktop, and large screens.
 * Used for adaptive component sizing and layout adjustments.
 */

export const breakpoints = {
  /**
   * Mobile breakpoint (minimum width)
   * Modern mobile devices start at 375px
   */
  mobile: 375,
  
  /**
   * Tablet breakpoint
   * Common tablet portrait width
   */
  tablet: 768,
  
  /**
   * Desktop breakpoint
   * Standard desktop/laptop width
   */
  desktop: 1024,
  
  /**
   * Large desktop breakpoint
   * Maximum content width for optimal readability
   */
  large: 1440,
} as const;

export type BreakpointKey = keyof typeof breakpoints;

/**
 * Container query breakpoints (§27)
 * Used with @container queries for component-level responsive layouts.
 */
export const containerBreakpoints = {
  /** Below this: compact layout */
  compact: 480,
  /** At or above this: expanded layout */
  expanded: 768,
} as const;

export type ContainerBreakpointKey = keyof typeof containerBreakpoints;

/**
 * Media query helpers for web
 * Returns CSS media query strings
 */
export const mediaQueries = {
  mobile: `@media (min-width: ${breakpoints.mobile}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px)`,
  large: `@media (min-width: ${breakpoints.large}px)`,
  
  // Max width queries
  mobileOnly: `@media (max-width: ${breakpoints.tablet - 1}px)`,
  tabletOnly: `@media (min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`,
  desktopOnly: `@media (min-width: ${breakpoints.desktop}px) and (max-width: ${breakpoints.large - 1}px)`,
} as const;

/**
 * Check if current width matches breakpoint
 * Useful for JavaScript-based responsive logic
 */
export const matchesBreakpoint = (width: number, breakpoint: BreakpointKey): boolean => {
  return width >= breakpoints[breakpoint];
};

/**
 * Get current breakpoint name based on width
 */
export const getCurrentBreakpoint = (width: number): BreakpointKey => {
  if (width >= breakpoints.large) return 'large';
  if (width >= breakpoints.desktop) return 'desktop';
  if (width >= breakpoints.tablet) return 'tablet';
  return 'mobile';
};

