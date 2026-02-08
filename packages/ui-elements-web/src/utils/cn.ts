/**
 * Class Name Utility
 *
 * Uses clsx for conditional class name composition.
 */

import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export default cn;
