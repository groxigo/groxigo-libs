/**
 * Lottie Animation Presets
 *
 * Standard Lottie animation configurations for common UI patterns.
 * Actual animation files should be stored in assets and referenced by path.
 */

import type { LottiePreset, LottiePresetConfig, LottieLoop } from '@groxigo/contracts';

/**
 * Lottie preset registry
 * Maps preset names to their configurations
 */
export const lottiePresetConfigs: Record<LottiePreset, Omit<LottiePresetConfig, 'source'> & { path: string }> = {
  success: {
    name: 'success',
    path: 'animations/success.json',
    loop: false,
    speed: 1,
    size: { width: 120, height: 120 },
    description: 'Success checkmark animation',
  },
  error: {
    name: 'error',
    path: 'animations/error.json',
    loop: false,
    speed: 1,
    size: { width: 120, height: 120 },
    description: 'Error X animation',
  },
  warning: {
    name: 'warning',
    path: 'animations/warning.json',
    loop: false,
    speed: 1,
    size: { width: 120, height: 120 },
    description: 'Warning exclamation animation',
  },
  info: {
    name: 'info',
    path: 'animations/info.json',
    loop: false,
    speed: 1,
    size: { width: 120, height: 120 },
    description: 'Info icon animation',
  },
  loading: {
    name: 'loading',
    path: 'animations/loading.json',
    loop: true,
    speed: 1,
    size: { width: 60, height: 60 },
    description: 'Loading spinner animation',
  },
  confetti: {
    name: 'confetti',
    path: 'animations/confetti.json',
    loop: false,
    speed: 1,
    size: { width: 300, height: 300 },
    description: 'Celebration confetti animation',
  },
  heart: {
    name: 'heart',
    path: 'animations/heart.json',
    loop: false,
    speed: 1,
    size: { width: 40, height: 40 },
    description: 'Heart/like animation',
  },
  star: {
    name: 'star',
    path: 'animations/star.json',
    loop: false,
    speed: 1,
    size: { width: 40, height: 40 },
    description: 'Star/favorite animation',
  },
  check: {
    name: 'check',
    path: 'animations/check.json',
    loop: false,
    speed: 1,
    size: { width: 24, height: 24 },
    description: 'Checkbox check animation',
  },
  'empty-state': {
    name: 'empty-state',
    path: 'animations/empty-state.json',
    loop: true,
    speed: 0.8,
    size: { width: 200, height: 200 },
    description: 'Empty state illustration animation',
  },
  'cart-add': {
    name: 'cart-add',
    path: 'animations/cart-add.json',
    loop: false,
    speed: 1.2,
    size: { width: 60, height: 60 },
    description: 'Add to cart animation',
  },
  'cart-success': {
    name: 'cart-success',
    path: 'animations/cart-success.json',
    loop: false,
    speed: 1,
    size: { width: 120, height: 120 },
    description: 'Cart checkout success animation',
  },
  search: {
    name: 'search',
    path: 'animations/search.json',
    loop: true,
    speed: 1,
    size: { width: 100, height: 100 },
    description: 'Search/scanning animation',
  },
  'pull-to-refresh': {
    name: 'pull-to-refresh',
    path: 'animations/pull-to-refresh.json',
    loop: true,
    speed: 1,
    size: { width: 60, height: 60 },
    description: 'Pull to refresh loading animation',
  },
};

/**
 * Get preset configuration by name
 */
export function getLottiePresetConfig(name: LottiePreset): typeof lottiePresetConfigs[LottiePreset] {
  return lottiePresetConfigs[name];
}

/**
 * Animated icon size mappings
 */
export const animatedIconSizes = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

/**
 * Get size value for animated icons
 */
export function getAnimatedIconSize(size: keyof typeof animatedIconSizes | number): number {
  if (typeof size === 'number') {
    return size;
  }
  return animatedIconSizes[size];
}

/**
 * Default Lottie component props
 */
export const defaultLottieProps = {
  autoPlay: true,
  loop: true as LottieLoop,
  speed: 1,
  resizeMode: 'contain' as const,
};

/**
 * Common Lottie animation durations (estimated, actual depends on animation file)
 */
export const lottieAnimationDurations = {
  success: 1500,
  error: 1500,
  warning: 1500,
  info: 1500,
  loading: 2000, // One full loop
  confetti: 3000,
  heart: 800,
  star: 800,
  check: 500,
  'cart-add': 1000,
  'cart-success': 2000,
} as const;
