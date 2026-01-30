/**
 * WCAG Contrast Ratio Utilities
 *
 * Provides functions to calculate and validate color contrast ratios
 * according to WCAG 2.1 accessibility guidelines.
 *
 * WCAG Requirements:
 * - AA Normal Text: 4.5:1
 * - AA Large Text: 3:1
 * - AAA Normal Text: 7:1
 * - AAA Large Text: 4.5:1
 */

import type { ContrastResult, HexColor } from '../types';

// ============================================
// CONSTANTS
// ============================================

/** WCAG 2.1 minimum contrast ratios */
export const WCAG_RATIOS = {
  AA_NORMAL: 4.5,
  AA_LARGE: 3,
  AAA_NORMAL: 7,
  AAA_LARGE: 4.5,
} as const;

// ============================================
// COLOR CONVERSION UTILITIES
// ============================================

/**
 * Parse a hex color string to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  const cleanHex = hex.replace(/^#/, '');

  // Handle 3-digit hex
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split('')
          .map((c) => c + c)
          .join('')
      : cleanHex;

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);

  if (!result) return null;

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Convert RGB to hex color string
 */
export function rgbToHex(r: number, g: number, b: number): HexColor {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}` as HexColor;
}

/**
 * Parse RGBA color string to components
 */
export function parseRgba(rgba: string): { r: number; g: number; b: number; a: number } | null {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return null;

  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
    a: match[4] ? parseFloat(match[4]) : 1,
  };
}

// ============================================
// LUMINANCE CALCULATIONS
// ============================================

/**
 * Calculate the relative luminance of a color
 * Based on WCAG 2.1 definition
 *
 * @see https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const srgb = c / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Get luminance from a hex color
 */
export function getLuminanceFromHex(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  return getRelativeLuminance(rgb.r, rgb.g, rgb.b);
}

// ============================================
// CONTRAST RATIO CALCULATIONS
// ============================================

/**
 * Calculate contrast ratio between two luminance values
 *
 * @see https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */
export function getContrastRatio(luminance1: number, luminance2: number): number {
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Calculate contrast ratio between two hex colors
 */
export function getContrastRatioFromHex(foreground: string, background: string): number {
  const fgLuminance = getLuminanceFromHex(foreground);
  const bgLuminance = getLuminanceFromHex(background);
  return getContrastRatio(fgLuminance, bgLuminance);
}

/**
 * Get full contrast analysis between two colors
 */
export function analyzeContrast(foreground: string, background: string): ContrastResult {
  const ratio = getContrastRatioFromHex(foreground, background);

  return {
    ratio: Math.round(ratio * 100) / 100,
    aa: ratio >= WCAG_RATIOS.AA_NORMAL,
    aaLarge: ratio >= WCAG_RATIOS.AA_LARGE,
    aaa: ratio >= WCAG_RATIOS.AAA_NORMAL,
    aaaLarge: ratio >= WCAG_RATIOS.AAA_LARGE,
  };
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

/**
 * Check if a color combination passes WCAG AA for normal text
 */
export function passesAA(foreground: string, background: string): boolean {
  return getContrastRatioFromHex(foreground, background) >= WCAG_RATIOS.AA_NORMAL;
}

/**
 * Check if a color combination passes WCAG AA for large text
 */
export function passesAALarge(foreground: string, background: string): boolean {
  return getContrastRatioFromHex(foreground, background) >= WCAG_RATIOS.AA_LARGE;
}

/**
 * Check if a color combination passes WCAG AAA for normal text
 */
export function passesAAA(foreground: string, background: string): boolean {
  return getContrastRatioFromHex(foreground, background) >= WCAG_RATIOS.AAA_NORMAL;
}

/**
 * Check if a color combination passes WCAG AAA for large text
 */
export function passesAAALarge(foreground: string, background: string): boolean {
  return getContrastRatioFromHex(foreground, background) >= WCAG_RATIOS.AAA_LARGE;
}

// ============================================
// COLOR SUGGESTION UTILITIES
// ============================================

/**
 * Determine if a color is light or dark
 */
export function isLightColor(hex: string): boolean {
  const luminance = getLuminanceFromHex(hex);
  return luminance > 0.179;
}

/**
 * Get optimal text color (black or white) for a background
 */
export function getOptimalTextColor(background: string): HexColor {
  return isLightColor(background) ? '#000000' : '#ffffff';
}

/**
 * Adjust color to meet minimum contrast ratio
 */
export function adjustColorForContrast(
  foreground: string,
  background: string,
  targetRatio: number = WCAG_RATIOS.AA_NORMAL
): HexColor {
  const currentRatio = getContrastRatioFromHex(foreground, background);

  if (currentRatio >= targetRatio) {
    return foreground as HexColor;
  }

  const fgRgb = hexToRgb(foreground);
  const bgLuminance = getLuminanceFromHex(background);

  if (!fgRgb) return foreground as HexColor;

  // Determine direction to adjust (lighter or darker)
  const shouldLighten = bgLuminance < 0.5;

  let adjustedColor = { ...fgRgb };
  let step = shouldLighten ? 5 : -5;
  let iterations = 0;
  const maxIterations = 100;

  while (iterations < maxIterations) {
    adjustedColor = {
      r: Math.max(0, Math.min(255, adjustedColor.r + step)),
      g: Math.max(0, Math.min(255, adjustedColor.g + step)),
      b: Math.max(0, Math.min(255, adjustedColor.b + step)),
    };

    const newHex = rgbToHex(adjustedColor.r, adjustedColor.g, adjustedColor.b);
    const newRatio = getContrastRatioFromHex(newHex, background);

    if (newRatio >= targetRatio) {
      return newHex;
    }

    // Check if we've hit the limits
    if (shouldLighten && adjustedColor.r >= 255 && adjustedColor.g >= 255 && adjustedColor.b >= 255) {
      break;
    }
    if (!shouldLighten && adjustedColor.r <= 0 && adjustedColor.g <= 0 && adjustedColor.b <= 0) {
      break;
    }

    iterations++;
  }

  // If we couldn't reach target, return black or white
  return shouldLighten ? '#ffffff' : '#000000';
}

// ============================================
// BATCH VALIDATION
// ============================================

export interface ColorPair {
  foreground: string;
  background: string;
  name?: string;
}

export interface ContrastReport {
  pair: ColorPair;
  result: ContrastResult;
  passes: boolean;
  level: 'fail' | 'aa-large' | 'aa' | 'aaa-large' | 'aaa';
}

/**
 * Validate multiple color pairs and generate a report
 */
export function validateColorPairs(
  pairs: ColorPair[],
  minLevel: 'aa' | 'aa-large' | 'aaa' | 'aaa-large' = 'aa'
): ContrastReport[] {
  return pairs.map((pair) => {
    const result = analyzeContrast(pair.foreground, pair.background);

    let level: ContrastReport['level'] = 'fail';
    if (result.aaa) level = 'aaa';
    else if (result.aaaLarge) level = 'aaa-large';
    else if (result.aa) level = 'aa';
    else if (result.aaLarge) level = 'aa-large';

    const passesMinLevel =
      minLevel === 'aa'
        ? result.aa
        : minLevel === 'aa-large'
          ? result.aaLarge
          : minLevel === 'aaa'
            ? result.aaa
            : result.aaaLarge;

    return {
      pair,
      result,
      passes: passesMinLevel,
      level,
    };
  });
}

/**
 * Generate a contrast matrix for a set of colors
 */
export function generateContrastMatrix(
  colors: Record<string, string>
): Record<string, Record<string, ContrastResult>> {
  const colorNames = Object.keys(colors);
  const matrix: Record<string, Record<string, ContrastResult>> = {};

  for (const fg of colorNames) {
    matrix[fg] = {};
    for (const bg of colorNames) {
      matrix[fg][bg] = analyzeContrast(colors[fg], colors[bg]);
    }
  }

  return matrix;
}
