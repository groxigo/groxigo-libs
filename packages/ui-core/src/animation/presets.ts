/**
 * Animation Presets
 *
 * Pre-configured animation timing and spring configs.
 * Shared by both React Native (Reanimated) and Web (Framer Motion, CSS).
 */

import type {
  TimingConfig,
  SpringConfig,
  AnimationPresets,
  CubicBezier,
} from '@groxigo/contracts';

/**
 * Timing presets
 */
export const timingPresets = {
  /** Fast interaction feedback (150ms) */
  fast: {
    duration: 150,
    easing: 'easeOut',
  } satisfies TimingConfig,

  /** Normal transitions (300ms) */
  normal: {
    duration: 300,
    easing: 'easeInOut',
  } satisfies TimingConfig,

  /** Slow, deliberate animations (500ms) */
  slow: {
    duration: 500,
    easing: 'easeInOut',
  } satisfies TimingConfig,

  /** Modal/overlay entrance */
  modalIn: {
    duration: 250,
    easing: 'easeOut',
  } satisfies TimingConfig,

  /** Modal/overlay exit */
  modalOut: {
    duration: 200,
    easing: 'easeIn',
  } satisfies TimingConfig,

  /** Page transitions */
  pageTransition: {
    duration: 350,
    easing: 'easeInOut',
  } satisfies TimingConfig,
} as const;

/**
 * Spring presets
 */
export const springPresets = {
  /** Subtle spring animation */
  springSubtle: {
    stiffness: 400,
    damping: 30,
    mass: 1,
  } satisfies SpringConfig,

  /** Bouncy spring animation */
  springBouncy: {
    stiffness: 200,
    damping: 15,
    mass: 1,
  } satisfies SpringConfig,

  /** Stiff spring animation */
  springStiff: {
    stiffness: 600,
    damping: 40,
    mass: 1,
  } satisfies SpringConfig,

  /** Gentle spring for micro-interactions */
  springGentle: {
    stiffness: 120,
    damping: 14,
    mass: 1,
  } satisfies SpringConfig,

  /** Snappy spring for quick responses */
  springSnappy: {
    stiffness: 500,
    damping: 25,
    mass: 0.8,
  } satisfies SpringConfig,
} as const;

/**
 * Combined animation presets
 */
export const animationPresets: AnimationPresets = {
  ...timingPresets,
  ...springPresets,
};

/**
 * Easing function cubic bezier values
 */
export const easingBeziers: Record<string, CubicBezier> = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeOut: [0, 0, 0.58, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  easeInQuad: [0.55, 0.085, 0.68, 0.53],
  easeOutQuad: [0.25, 0.46, 0.45, 0.94],
  easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
  easeInCubic: [0.55, 0.055, 0.675, 0.19],
  easeOutCubic: [0.215, 0.61, 0.355, 1],
  easeInOutCubic: [0.645, 0.045, 0.355, 1],
  easeInQuart: [0.895, 0.03, 0.685, 0.22],
  easeOutQuart: [0.165, 0.84, 0.44, 1],
  easeInOutQuart: [0.77, 0, 0.175, 1],
  easeInQuint: [0.755, 0.05, 0.855, 0.06],
  easeOutQuint: [0.23, 1, 0.32, 1],
  easeInOutQuint: [0.86, 0, 0.07, 1],
  easeInSine: [0.47, 0, 0.745, 0.715],
  easeOutSine: [0.39, 0.575, 0.565, 1],
  easeInOutSine: [0.445, 0.05, 0.55, 0.95],
  easeInExpo: [0.95, 0.05, 0.795, 0.035],
  easeOutExpo: [0.19, 1, 0.22, 1],
  easeInOutExpo: [1, 0, 0, 1],
  easeInCirc: [0.6, 0.04, 0.98, 0.335],
  easeOutCirc: [0.075, 0.82, 0.165, 1],
  easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
  easeInBack: [0.6, -0.28, 0.735, 0.045],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55],
};

/**
 * Duration constants in milliseconds
 */
export const durations = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
  slowest: 1000,
} as const;

/**
 * Common delay values in milliseconds
 */
export const delays = {
  none: 0,
  short: 100,
  medium: 200,
  long: 400,
} as const;

/**
 * Stagger delay for list animations
 */
export const staggerDelays = {
  fast: 30,
  normal: 50,
  slow: 80,
} as const;
