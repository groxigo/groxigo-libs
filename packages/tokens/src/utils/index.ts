/**
 * Utility Functions Export
 *
 * Central export for all utility functions.
 */

// Contrast utilities
export {
  WCAG_RATIOS,
  hexToRgb,
  rgbToHex,
  parseRgba,
  getRelativeLuminance,
  getLuminanceFromHex,
  getContrastRatio,
  getContrastRatioFromHex,
  analyzeContrast,
  passesAA,
  passesAALarge,
  passesAAA,
  passesAAALarge,
  isLightColor,
  getOptimalTextColor,
  adjustColorForContrast,
  validateColorPairs,
  generateContrastMatrix,
} from './contrast';

export type { ColorPair, ContrastReport } from './contrast';

// Validation utilities
export {
  isValidHexColor,
  isValidRgbaColor,
  isValidCSSColor,
  validateColorFamily,
  validateSpacing,
  validateTypography,
  validateContrast,
  validateTokens,
  assertValidTokens,
  createValidatedTokens,
} from './validation';

export type { ContrastValidationOptions } from './validation';
