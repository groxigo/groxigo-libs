/**
 * Groxigo Design Tokens - Border
 *
 * Border width tokens for consistent border thickness.
 * Includes support for iOS hairline borders and standard widths.
 */

export const borderWidth = {
  /** No border (0) */
  none: 0,

  /** iOS hairline border (0.5px) - Use for subtle dividers */
  hairline: 0.5,

  /** Thin border (1px) - Default border width */
  thin: 1,

  /** Medium border (2px) - Emphasized borders */
  medium: 2,

  /** Thick border (3px) - Strong emphasis */
  thick: 3,

  /** Heavy border (4px) - Maximum emphasis, focus rings */
  heavy: 4,
} as const;

export type BorderWidthKey = keyof typeof borderWidth;

/**
 * Border style presets combining width and style
 * For use with CSS border shorthand
 */
export const borderStyle = {
  /** No border */
  none: 'none',

  /** Solid line border */
  solid: 'solid',

  /** Dashed border */
  dashed: 'dashed',

  /** Dotted border */
  dotted: 'dotted',
} as const;

export type BorderStyleKey = keyof typeof borderStyle;

/**
 * Combined border tokens
 */
export const border = {
  width: borderWidth,
  style: borderStyle,
} as const;
