/**
 * Runtime Validation Utilities
 *
 * Provides functions to validate token values at runtime,
 * ensuring data integrity and catching configuration errors early.
 */

import type {
  ValidationResult,
  ValidationError,
  ValidationWarning,
  HexColor,
  ColorFamily,
  ColorShadeKey,
} from '../types';
import { analyzeContrast, WCAG_RATIOS } from './contrast';

// ============================================
// COLOR VALIDATION
// ============================================

const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
const RGBA_REGEX = /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(,\s*[\d.]+\s*)?\)$/;

/**
 * Validate a hex color string
 */
export function isValidHexColor(value: unknown): value is HexColor {
  return typeof value === 'string' && HEX_COLOR_REGEX.test(value);
}

/**
 * Validate an RGBA color string
 */
export function isValidRgbaColor(value: unknown): boolean {
  return typeof value === 'string' && RGBA_REGEX.test(value);
}

/**
 * Validate any CSS color value
 */
export function isValidCSSColor(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  if (value === 'transparent' || value === 'inherit' || value === 'currentColor') return true;
  return isValidHexColor(value) || isValidRgbaColor(value);
}

/**
 * Validate a color family has all required shades
 */
export function validateColorFamily(
  family: unknown,
  familyName: string
): { valid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = [];
  const requiredShades: ColorShadeKey[] = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

  if (typeof family !== 'object' || family === null) {
    errors.push({
      path: familyName,
      message: 'Color family must be an object',
      value: family,
    });
    return { valid: false, errors };
  }

  for (const shade of requiredShades) {
    const value = (family as Record<string, unknown>)[shade];
    if (value === undefined) {
      errors.push({
        path: `${familyName}.${shade}`,
        message: `Missing shade ${shade}`,
        value: undefined,
      });
    } else if (!isValidHexColor(value)) {
      errors.push({
        path: `${familyName}.${shade}`,
        message: `Invalid hex color value`,
        value,
      });
    }
  }

  return { valid: errors.length === 0, errors };
}

// ============================================
// SPACING VALIDATION
// ============================================

/**
 * Validate spacing values
 */
export function validateSpacing(
  spacing: unknown
): { valid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  if (typeof spacing !== 'object' || spacing === null) {
    errors.push({
      path: 'spacing',
      message: 'Spacing must be an object',
      value: spacing,
    });
    return { valid: false, errors };
  }

  for (const [key, value] of Object.entries(spacing as Record<string, unknown>)) {
    if (typeof value !== 'number') {
      errors.push({
        path: `spacing.${key}`,
        message: 'Spacing value must be a number',
        value,
      });
    } else if (value < 0) {
      errors.push({
        path: `spacing.${key}`,
        message: 'Spacing value must be non-negative',
        value,
      });
    }
  }

  return { valid: errors.length === 0, errors };
}

// ============================================
// TYPOGRAPHY VALIDATION
// ============================================

/**
 * Validate typography tokens
 */
export function validateTypography(
  typography: unknown
): { valid: boolean; errors: ValidationError[] } {
  const errors: ValidationError[] = [];

  if (typeof typography !== 'object' || typography === null) {
    errors.push({
      path: 'typography',
      message: 'Typography must be an object',
      value: typography,
    });
    return { valid: false, errors };
  }

  const typo = typography as Record<string, unknown>;

  // Validate font family
  if (typeof typo.fontFamily !== 'object' || typo.fontFamily === null) {
    errors.push({
      path: 'typography.fontFamily',
      message: 'Font family must be an object',
      value: typo.fontFamily,
    });
  } else {
    const fontFamily = typo.fontFamily as Record<string, unknown>;
    if (typeof fontFamily.sans !== 'string') {
      errors.push({
        path: 'typography.fontFamily.sans',
        message: 'Sans font family must be a string',
        value: fontFamily.sans,
      });
    }
    if (typeof fontFamily.mono !== 'string') {
      errors.push({
        path: 'typography.fontFamily.mono',
        message: 'Mono font family must be a string',
        value: fontFamily.mono,
      });
    }
  }

  // Validate font sizes
  if (typeof typo.fontSize === 'object' && typo.fontSize !== null) {
    for (const [key, value] of Object.entries(typo.fontSize as Record<string, unknown>)) {
      if (typeof value !== 'number' || value <= 0) {
        errors.push({
          path: `typography.fontSize.${key}`,
          message: 'Font size must be a positive number',
          value,
        });
      }
    }
  }

  // Validate font weights
  if (typeof typo.fontWeight === 'object' && typo.fontWeight !== null) {
    const validWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
    for (const [key, value] of Object.entries(typo.fontWeight as Record<string, unknown>)) {
      if (typeof value !== 'number' || !validWeights.includes(value)) {
        errors.push({
          path: `typography.fontWeight.${key}`,
          message: 'Font weight must be a valid CSS weight (100-900)',
          value,
        });
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

// ============================================
// CONTRAST VALIDATION
// ============================================

export interface ContrastValidationOptions {
  minLevel?: 'aa' | 'aa-large' | 'aaa' | 'aaa-large';
  textOnSurface?: boolean;
  buttonText?: boolean;
  badgeText?: boolean;
}

/**
 * Validate color contrast for accessibility
 */
export function validateContrast(
  colors: {
    semantic?: Record<string, unknown>;
    components?: Record<string, unknown>;
  },
  options: ContrastValidationOptions = {}
): { valid: boolean; warnings: ValidationWarning[] } {
  const warnings: ValidationWarning[] = [];
  const { minLevel = 'aa' } = options;

  const minRatio =
    minLevel === 'aa' ? WCAG_RATIOS.AA_NORMAL :
    minLevel === 'aa-large' ? WCAG_RATIOS.AA_LARGE :
    minLevel === 'aaa' ? WCAG_RATIOS.AAA_NORMAL :
    WCAG_RATIOS.AAA_LARGE;

  // Helper to check contrast
  const checkContrast = (
    fg: unknown,
    bg: unknown,
    path: string
  ) => {
    if (!isValidHexColor(fg) || !isValidHexColor(bg)) return;

    const result = analyzeContrast(fg, bg);
    if (result.ratio < minRatio) {
      warnings.push({
        path,
        message: `Contrast ratio ${result.ratio}:1 does not meet ${minLevel.toUpperCase()} requirement (${minRatio}:1)`,
        value: { foreground: fg, background: bg, ratio: result.ratio },
        suggestion: `Consider using a darker foreground or lighter background`,
      });
    }
  };

  // Validate semantic text on surface
  if (colors.semantic) {
    const semantic = colors.semantic;
    const text = semantic.text as Record<string, unknown> | undefined;
    const surface = semantic.surface as Record<string, unknown> | undefined;

    if (text && surface) {
      // Primary text on primary surface
      checkContrast(
        text.primary,
        surface.primary,
        'semantic.text.primary on semantic.surface.primary'
      );

      // Secondary text on primary surface
      checkContrast(
        text.secondary,
        surface.primary,
        'semantic.text.secondary on semantic.surface.primary'
      );

      // Primary text on secondary surface
      checkContrast(
        text.primary,
        surface.secondary,
        'semantic.text.primary on semantic.surface.secondary'
      );
    }
  }

  // Validate component button text
  if (colors.components) {
    const components = colors.components;

    if (components.button) {
      for (const [variant, variantTokens] of Object.entries(components.button as Record<string, unknown>)) {
        if (variantTokens && typeof variantTokens === 'object') {
          const t = variantTokens as Record<string, unknown>;
          checkContrast(t.text, t.bg, `components.button.${variant}`);
        }
      }
    }

    // Validate badge text
    if (components.badge) {
      for (const [variant, variantTokens] of Object.entries(components.badge as Record<string, unknown>)) {
        if (variantTokens && typeof variantTokens === 'object') {
          const t = variantTokens as Record<string, unknown>;
          checkContrast(t.text, t.bg, `components.badge.${variant}`);
        }
      }
    }
  }

  return { valid: warnings.length === 0, warnings };
}

// ============================================
// COMPLETE TOKEN VALIDATION
// ============================================

/**
 * Validate a complete tokens object
 */
export function validateTokens(tokens: unknown): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  if (typeof tokens !== 'object' || tokens === null) {
    return {
      valid: false,
      errors: [{ path: 'tokens', message: 'Tokens must be an object', value: tokens }],
      warnings: [],
    };
  }

  const t = tokens as Record<string, unknown>;

  // Validate colors
  if (t.colors) {
    const colors = t.colors as Record<string, unknown>;

    // Validate primitives
    if (colors.primitives) {
      const primitives = colors.primitives as Record<string, unknown>;
      const colorFamilies = ['gray', 'blue', 'green', 'red', 'yellow', 'orange', 'purple', 'cyan', 'pink', 'indigo', 'teal'];

      for (const family of colorFamilies) {
        if (primitives[family]) {
          const result = validateColorFamily(primitives[family], `colors.primitives.${family}`);
          errors.push(...result.errors);
        }
      }
    }

    // Validate contrast
    const contrastResult = validateContrast({
      semantic: colors.semantic as Record<string, unknown>,
      components: colors.components as Record<string, unknown>,
    });
    warnings.push(...contrastResult.warnings);
  }

  // Validate spacing
  if (t.spacing) {
    const result = validateSpacing(t.spacing);
    errors.push(...result.errors);
  }

  // Validate typography
  if (t.typography) {
    const result = validateTypography(t.typography);
    errors.push(...result.errors);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// ============================================
// ASSERTION HELPERS
// ============================================

/**
 * Assert that tokens are valid, throwing if not.
 * Returns the validation result so callers can inspect warnings.
 */
export function assertValidTokens(tokens: unknown): ValidationResult {
  const result = validateTokens(tokens);

  if (!result.valid) {
    const errorMessages = result.errors.map((e) => `${e.path}: ${e.message}`).join('\n');
    throw new Error(`Invalid tokens:\n${errorMessages}`);
  }

  return result;
}

/**
 * Create a validated tokens object
 */
export function createValidatedTokens<T>(tokens: T): T {
  assertValidTokens(tokens);
  return tokens;
}
