/**
 * useDeviceType Hook
 *
 * Enterprise-grade responsive typography system with hybrid fluid scaling.
 *
 * Approach:
 * - Phone (< 600dp): Fixed 1.0x scale
 * - Tablet (600-1400dp): Fluid interpolation between min and max scales
 * - Desktop (> 1400dp): Fixed scale (users sit further from screen)
 *
 * Features:
 * - Different scale bounds for different element types (font, heading, spacing, icon, ui)
 * - System accessibility integration (respects iOS Dynamic Type / Android font scale)
 * - Smooth, continuous scaling within tablet range
 * - Clamped bounds to prevent extreme sizes
 */

import { useMemo } from 'react';
import { PixelRatio, Platform } from 'react-native';
import { useBreakpoint } from './useMediaQuery';
import {
  responsive,
  type ScaleType,
  type DeviceCategory,
} from '@groxigo/tokens';

// ============================================
// TYPES
// ============================================

/**
 * Device category types (simplified from previous 4-tier to 3-tier)
 */
export type DeviceType = DeviceCategory;

/**
 * Typography scale configuration for all element types
 */
export interface TypographyScale {
  /** Font scale for body text */
  fontScale: number;
  /** Font scale for headings */
  headingScale: number;
  /** Font scale for captions/small text */
  captionScale: number;
  /** Spacing scale multiplier */
  spacingScale: number;
  /** Icon scale multiplier */
  iconScale: number;
  /** UI element scale (buttons, inputs) */
  uiScale: number;
  /** Touch target minimum size */
  minTouchTarget: number;
}

/**
 * Return type for useDeviceType hook
 */
export interface UseDeviceTypeReturn {
  /** Current device category */
  deviceType: DeviceType;
  /** Screen diagonal in points */
  diagonal: number;
  /** Screen width in points */
  width: number;
  /** Screen height in points */
  height: number;
  /** Typography scale configuration */
  scale: TypographyScale;
  /** System font scale (from accessibility settings) */
  systemFontScale: number;
  /** Helper: scale a body font size */
  fontSize: (base: number) => number;
  /** Helper: scale a heading font size */
  headingSize: (base: number) => number;
  /** Helper: scale a caption/small text size */
  captionSize: (base: number) => number;
  /** Helper: scale spacing */
  spacing: (base: number) => number;
  /** Helper: scale icon size */
  iconSize: (base: number) => number;
  /** Helper: scale UI element size (buttons, inputs) */
  uiSize: (base: number) => number;
  /** Whether this is a tablet or larger device */
  isTablet: boolean;
  /** Whether this is a large tablet or desktop */
  isLargeScreen: boolean;
  /** Raw scale value for a given type at current viewport */
  getScale: (type: ScaleType) => number;
}

// ============================================
// FLUID SCALING UTILITIES
// ============================================

/**
 * Clamp a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 *
 * @param min - Minimum value
 * @param max - Maximum value
 * @param t - Interpolation factor (0-1)
 */
function lerp(min: number, max: number, t: number): number {
  return min + (max - min) * t;
}

/**
 * Scale types that have min/max bounds (excludes touchTarget)
 */
type FluidScaleType = Exclude<ScaleType, 'touchTarget'>;

/**
 * Calculate fluid scale for tablet viewport
 *
 * Uses linear interpolation between scale bounds based on viewport position.
 *
 * @param diagonal - Screen diagonal in points
 * @param scaleType - Type of scale (font, heading, spacing, etc.)
 */
function getFluidScale(diagonal: number, scaleType: ScaleType): number {
  const { viewport, scales } = responsive;

  // For touchTarget, return the appropriate fixed value
  if (scaleType === 'touchTarget') {
    if (diagonal < viewport.tabletStart) return scales.touchTarget.phone;
    if (diagonal > viewport.tabletEnd) return scales.touchTarget.desktop;
    return scales.touchTarget.tablet;
  }

  // Get bounds for fluid scale types
  const bounds = scales[scaleType as FluidScaleType];

  // Calculate interpolation factor (0 at tabletStart, 1 at tabletEnd)
  const t = clamp(
    (diagonal - viewport.tabletStart) / (viewport.tabletEnd - viewport.tabletStart),
    0,
    1
  );

  // Interpolate between min and max scale
  return lerp(bounds.min, bounds.max, t);
}

/**
 * Get scale for a given type based on device category
 */
function getScaleForDevice(
  diagonal: number,
  deviceType: DeviceType,
  scaleType: ScaleType
): number {
  const { fixed, scales } = responsive;

  switch (deviceType) {
    case 'phone':
      // Fixed scale for phones
      if (scaleType === 'touchTarget') return scales.touchTarget.phone;
      return fixed.phone[scaleType as keyof typeof fixed.phone] ?? 1;

    case 'tablet':
      // Fluid scale for tablets
      return getFluidScale(diagonal, scaleType);

    case 'desktop':
      // Fixed scale for desktop
      if (scaleType === 'touchTarget') return scales.touchTarget.desktop;
      return fixed.desktop[scaleType as keyof typeof fixed.desktop] ?? 1.15;

    default:
      return 1;
  }
}

/**
 * Determine device category based on screen diagonal
 */
function getDeviceCategory(diagonal: number): DeviceType {
  const { viewport } = responsive;

  if (diagonal < viewport.tabletStart) {
    return 'phone';
  } else if (diagonal <= viewport.tabletEnd) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

/**
 * Get system font scale with clamping
 *
 * Respects iOS Dynamic Type and Android font scaling settings.
 * Clamped to prevent extreme sizes.
 */
function getSystemFontScale(): number {
  const { accessibility } = responsive;

  if (!accessibility.respectSystemFontScale) {
    return 1;
  }

  // Get system font scale (works on iOS and Android)
  const systemScale = PixelRatio.getFontScale();

  // Clamp to configured bounds
  return clamp(
    systemScale,
    accessibility.minSystemFontScale,
    accessibility.maxSystemFontScale
  );
}

// ============================================
// LEGACY COMPATIBILITY
// ============================================

/**
 * Legacy TYPOGRAPHY_SCALES for backward compatibility
 * @deprecated Use the new fluid scaling system instead
 */
export const TYPOGRAPHY_SCALES: Record<DeviceType, {
  fontScale: number;
  spacingScale: number;
  iconScale: number;
  minTouchTarget: number;
}> = {
  phone: {
    fontScale: 1,
    spacingScale: 1,
    iconScale: 1,
    minTouchTarget: 44,
  },
  tablet: {
    fontScale: 1.4, // Approximate middle of fluid range
    spacingScale: 1.25,
    iconScale: 1.25,
    minTouchTarget: 48,
  },
  desktop: {
    fontScale: 1.15,
    spacingScale: 1.25,
    iconScale: 1.15,
    minTouchTarget: 40,
  },
};

// ============================================
// MAIN HOOK
// ============================================

/**
 * Hook to get device type and responsive scaling values
 *
 * @returns Device type information and scaling helpers
 *
 * @example
 * ```tsx
 * function ResponsiveText() {
 *   const { fontSize, headingSize, deviceType } = useDeviceType();
 *
 *   return (
 *     <View>
 *       <Text style={{ fontSize: headingSize(24) }}>
 *         Heading
 *       </Text>
 *       <Text style={{ fontSize: fontSize(16) }}>
 *         Body text on {deviceType}
 *       </Text>
 *     </View>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function ResponsiveCard() {
 *   const { spacing, uiSize, isTablet } = useDeviceType();
 *
 *   return (
 *     <View style={{
 *       padding: spacing(16),
 *       flexDirection: isTablet ? 'row' : 'column',
 *     }}>
 *       <Button style={{ height: uiSize(44) }}>
 *         Action
 *       </Button>
 *     </View>
 *   );
 * }
 * ```
 */
export function useDeviceType(): UseDeviceTypeReturn {
  const { width, height } = useBreakpoint();
  const systemFontScale = getSystemFontScale();

  return useMemo(() => {
    const diagonal = Math.sqrt(width * width + height * height);
    const deviceType = getDeviceCategory(diagonal);

    // Get all scale values for current viewport
    const fontScale = getScaleForDevice(diagonal, deviceType, 'font');
    const headingScale = getScaleForDevice(diagonal, deviceType, 'heading');
    const captionScale = getScaleForDevice(diagonal, deviceType, 'caption');
    const spacingScale = getScaleForDevice(diagonal, deviceType, 'spacing');
    const iconScale = getScaleForDevice(diagonal, deviceType, 'icon');
    const uiScale = getScaleForDevice(diagonal, deviceType, 'ui');
    const minTouchTarget = getScaleForDevice(diagonal, deviceType, 'touchTarget');

    const scale: TypographyScale = {
      fontScale,
      headingScale,
      captionScale,
      spacingScale,
      iconScale,
      uiScale,
      minTouchTarget,
    };

    // Helper functions that apply system font scale for accessibility
    const applySystemScale = (value: number, isText: boolean = false): number => {
      const result = isText ? value * systemFontScale : value;
      return Math.round(result);
    };

    return {
      deviceType,
      diagonal,
      width,
      height,
      scale,
      systemFontScale,

      // Scaling helpers (text scales include system font scale)
      fontSize: (base: number) => applySystemScale(base * fontScale, true),
      headingSize: (base: number) => applySystemScale(base * headingScale, true),
      captionSize: (base: number) => applySystemScale(base * captionScale, true),
      spacing: (base: number) => applySystemScale(base * spacingScale),
      iconSize: (base: number) => applySystemScale(base * iconScale),
      uiSize: (base: number) => applySystemScale(base * uiScale),

      // Convenience flags
      isTablet: deviceType !== 'phone',
      isLargeScreen: deviceType === 'desktop',

      // Raw scale getter
      getScale: (type: ScaleType) => getScaleForDevice(diagonal, deviceType, type),
    };
  }, [width, height, systemFontScale]);
}

// ============================================
// STATIC UTILITIES
// ============================================

/**
 * Get the font scale for a device type (static helper)
 * @deprecated Use useDeviceType().scale.fontScale instead
 */
export function getFontScaleForDevice(deviceType: DeviceType): number {
  return TYPOGRAPHY_SCALES[deviceType].fontScale;
}

/**
 * Get device type from dimensions (static helper)
 */
export function getDeviceTypeFromDimensions(width: number, height: number): DeviceType {
  const diagonal = Math.sqrt(width * width + height * height);
  return getDeviceCategory(diagonal);
}

/**
 * Calculate fluid scale for given dimensions and scale type
 */
export function calculateFluidScale(
  width: number,
  height: number,
  scaleType: ScaleType
): number {
  const diagonal = Math.sqrt(width * width + height * height);
  const deviceType = getDeviceCategory(diagonal);
  return getScaleForDevice(diagonal, deviceType, scaleType);
}
