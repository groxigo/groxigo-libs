/**
 * Groxigo Design Tokens - Z-Index
 *
 * Z-index scale for consistent layering across the application.
 * Uses large increments (100) to allow for intermediate values when needed.
 */

export const zIndex = {
  /** Hidden behind everything (-1) */
  hide: -1,

  /** Base layer (0) - Default stacking context */
  base: 0,

  /** Raised elements (100) - Cards with elevation, floating elements */
  raised: 100,

  /** Dropdown menus (1000) */
  dropdown: 1000,

  /** Sticky headers (1100) */
  sticky: 1100,

  /** Fixed position elements (1200) - Bottom tabs, floating buttons */
  fixed: 1200,

  /** Modal backdrop (1300) */
  modalBackdrop: 1300,

  /** Modal content (1400) */
  modal: 1400,

  /** Popover (1500) */
  popover: 1500,

  /** Tooltip (1600) */
  tooltip: 1600,

  /** Toast notifications (1700) */
  toast: 1700,

  /** Maximum - Debug overlays, critical alerts (9999) */
  max: 9999,
} as const;

export type ZIndexKey = keyof typeof zIndex;

/**
 * Get z-index value by key with optional offset
 * Useful for stacking multiple elements at the same level
 */
export const getZIndex = (key: ZIndexKey, offset: number = 0): number => {
  return zIndex[key] + offset;
};
