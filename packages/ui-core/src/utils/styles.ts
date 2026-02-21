/**
 * Style Utilities
 *
 * Shared utilities for style manipulation.
 */

/**
 * Merge multiple style objects, with later objects overriding earlier ones
 */
export function mergeStyles<T extends object>(...styles: (T | undefined | null)[]): T {
  return Object.assign({}, ...styles.filter(Boolean)) as T;
}

/**
 * Extract style props from component props
 */
export function extractStyleProps<T extends object, K extends keyof T>(
  props: T,
  styleKeys: K[]
): [Pick<T, K>, Omit<T, K>] {
  const styleProps = {} as Pick<T, K>;
  const otherProps = { ...props } as Omit<T, K>;

  for (const key of styleKeys) {
    if (key in props) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- dynamic key access on constrained generic requires type assertion
      (styleProps as any)[key] = props[key];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- dynamic key deletion on Omit<T,K> requires type assertion
      delete (otherProps as any)[key];
    }
  }

  return [styleProps, otherProps];
}

/**
 * Convert pixel value to rem
 */
export function pxToRem(px: number, baseFontSize: number = 16): string {
  return `${px / baseFontSize}rem`;
}

/**
 * Convert rem value to pixels
 */
export function remToPx(rem: number, baseFontSize: number = 16): number {
  return rem * baseFontSize;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number {
  const fromRange = fromMax - fromMin;
  const toRange = toMax - toMin;
  const progress = (value - fromMin) / fromRange;
  return toMin + progress * toRange;
}

/**
 * Parse a CSS-style value (e.g., '10px', '1rem', 10) to a number
 */
export function parseStyleValue(value: string | number): number {
  if (typeof value === 'number') return value;

  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Convert camelCase to kebab-case
 */
export function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Convert kebab-case to camelCase
 */
export function toCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}
