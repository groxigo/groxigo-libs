/**
 * Class Name Utility
 *
 * Combines clsx for conditional classes with tailwind-merge
 * to properly handle Tailwind CSS class conflicts.
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export default cn;
