/**
 * ClassNames Utility
 *
 * Utility for conditionally joining class names.
 * Web-specific but useful for cross-platform component APIs.
 */

type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | { [key: string]: boolean | undefined | null }
  | ClassValue[];

/**
 * Conditionally join class names together
 *
 * @example
 * ```ts
 * cn('foo', 'bar') // => 'foo bar'
 * cn('foo', { bar: true }) // => 'foo bar'
 * cn('foo', { bar: false }) // => 'foo'
 * cn('foo', ['bar', 'baz']) // => 'foo bar baz'
 * cn('foo', null, undefined, 'bar') // => 'foo bar'
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const inner = cn(...input);
      if (inner) {
        classes.push(inner);
      }
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}

/**
 * Alias for cn
 */
export const classNames = cn;
export const clsx = cn;
