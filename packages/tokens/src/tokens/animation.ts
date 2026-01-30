/**
 * Groxigo Design Tokens - Animation & Motion
 *
 * This file contains all animation tokens for consistent motion across platforms.
 * Based on industry-standard timing and easing patterns.
 */

// ============================================
// DURATION - Timing values in milliseconds
// ============================================

export const duration = {
  /** Instant feedback - micro-interactions (75ms) */
  instant: 75,
  /** Fast animations - button clicks, toggles (150ms) */
  fast: 150,
  /** Normal animations - most UI transitions (200ms) */
  normal: 200,
  /** Moderate animations - expanding panels, modals (300ms) */
  moderate: 300,
  /** Slow animations - page transitions, complex reveals (400ms) */
  slow: 400,
  /** Very slow animations - elaborate transitions (500ms) */
  slower: 500,
  /** Deliberate animations - full page, major transitions (700ms) */
  deliberate: 700,
} as const;

export type DurationKey = keyof typeof duration;

// ============================================
// EASING - Cubic bezier curves
// ============================================

export const easing = {
  /** Linear - constant speed, no acceleration */
  linear: 'linear',

  // Standard Material Design easings
  /** Ease - subtle acceleration and deceleration */
  ease: 'ease',
  /** Ease In - starts slow, accelerates */
  easeIn: 'ease-in',
  /** Ease Out - starts fast, decelerates */
  easeOut: 'ease-out',
  /** Ease In Out - slow start and end */
  easeInOut: 'ease-in-out',

  // Custom cubic beziers for refined motion
  /** Standard - balanced entry and exit (Material Design standard) */
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  /** Emphasized - more pronounced movement */
  emphasized: 'cubic-bezier(0.2, 0.0, 0, 1)',
  /** Decelerate - quick start with smooth landing */
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  /** Accelerate - slow start with quick exit */
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',

  // Spring-like easings (approximations)
  /** Bounce - slight overshoot then settle */
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  /** Elastic - spring-like with overshoot */
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',

  // iOS-style easings
  /** iOS Spring - Apple's default spring animation approximation */
  iosSpring: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
} as const;

export type EasingKey = keyof typeof easing;

// ============================================
// TRANSITIONS - Common CSS transition presets
// ============================================

export const transition = {
  /** No transition */
  none: 'none',
  /** All properties - normal speed */
  all: `all ${duration.normal}ms ${easing.standard}`,
  /** All properties - fast speed */
  allFast: `all ${duration.fast}ms ${easing.standard}`,
  /** All properties - slow speed */
  allSlow: `all ${duration.slow}ms ${easing.standard}`,

  // Specific property transitions
  /** Colors (background, text, border) */
  colors: `background-color ${duration.fast}ms ${easing.standard}, color ${duration.fast}ms ${easing.standard}, border-color ${duration.fast}ms ${easing.standard}`,
  /** Opacity only */
  opacity: `opacity ${duration.normal}ms ${easing.standard}`,
  /** Transform only */
  transform: `transform ${duration.normal}ms ${easing.standard}`,
  /** Shadow only */
  shadow: `box-shadow ${duration.normal}ms ${easing.standard}`,

  // Combined transitions for common use cases
  /** Button - hover/press states */
  button: `background-color ${duration.fast}ms ${easing.standard}, transform ${duration.fast}ms ${easing.standard}, box-shadow ${duration.fast}ms ${easing.standard}`,
  /** Card - hover effects */
  card: `transform ${duration.normal}ms ${easing.standard}, box-shadow ${duration.normal}ms ${easing.standard}`,
  /** Input - focus states */
  input: `border-color ${duration.fast}ms ${easing.standard}, box-shadow ${duration.fast}ms ${easing.standard}`,
  /** Modal - open/close */
  modal: `opacity ${duration.moderate}ms ${easing.decelerate}, transform ${duration.moderate}ms ${easing.decelerate}`,
  /** Fade in/out */
  fade: `opacity ${duration.normal}ms ${easing.standard}`,
  /** Slide in/out */
  slide: `transform ${duration.moderate}ms ${easing.decelerate}`,
  /** Scale in/out */
  scale: `transform ${duration.normal}ms ${easing.bounce}`,
} as const;

export type TransitionKey = keyof typeof transition;

// ============================================
// KEYFRAMES - Animation keyframe definitions
// ============================================

export const keyframes = {
  /** Fade in from transparent */
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  /** Fade out to transparent */
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
  },
  /** Slide in from bottom */
  slideInUp: {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  /** Slide in from top */
  slideInDown: {
    from: { transform: 'translateY(-20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  /** Slide in from left */
  slideInLeft: {
    from: { transform: 'translateX(-20px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  },
  /** Slide in from right */
  slideInRight: {
    from: { transform: 'translateX(20px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 },
  },
  /** Scale up from smaller */
  scaleIn: {
    from: { transform: 'scale(0.95)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
  },
  /** Scale down to smaller */
  scaleOut: {
    from: { transform: 'scale(1)', opacity: 1 },
    to: { transform: 'scale(0.95)', opacity: 0 },
  },
  /** Bounce effect */
  bounce: {
    '0%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0)' },
  },
  /** Pulse effect */
  pulse: {
    '0%': { transform: 'scale(1)', opacity: 1 },
    '50%': { transform: 'scale(1.05)', opacity: 0.8 },
    '100%': { transform: 'scale(1)', opacity: 1 },
  },
  /** Shake effect */
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '25%': { transform: 'translateX(-5px)' },
    '75%': { transform: 'translateX(5px)' },
  },
  /** Spin effect */
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  /** Skeleton loading shimmer */
  shimmer: {
    '0%': { backgroundPosition: '-200% 0' },
    '100%': { backgroundPosition: '200% 0' },
  },
} as const;

export type KeyframeKey = keyof typeof keyframes;

// ============================================
// SPRING - React Native Animated spring configs
// ============================================

export const spring = {
  /** Gentle spring - subtle bounce */
  gentle: {
    tension: 120,
    friction: 14,
    mass: 1,
  },
  /** Default spring - balanced */
  default: {
    tension: 170,
    friction: 26,
    mass: 1,
  },
  /** Bouncy spring - playful */
  bouncy: {
    tension: 180,
    friction: 12,
    mass: 1,
  },
  /** Stiff spring - quick response */
  stiff: {
    tension: 400,
    friction: 30,
    mass: 1,
  },
  /** Slow spring - deliberate */
  slow: {
    tension: 100,
    friction: 20,
    mass: 1.2,
  },
} as const;

export type SpringKey = keyof typeof spring;

// ============================================
// DELAY - Common delay values
// ============================================

export const delay = {
  /** No delay */
  none: 0,
  /** Short delay (50ms) */
  short: 50,
  /** Medium delay (100ms) */
  medium: 100,
  /** Long delay (200ms) */
  long: 200,
  /** Staggered animation delay base (50ms per item) */
  stagger: 50,
} as const;

export type DelayKey = keyof typeof delay;

// ============================================
// REDUCED MOTION - Accessibility
// ============================================

export const reducedMotion = {
  /** CSS media query for reduced motion preference */
  mediaQuery: '@media (prefers-reduced-motion: reduce)',
  /** Duration for reduced motion (minimal or instant) */
  duration: 0,
  /** Easing for reduced motion (linear, no animation effect) */
  easing: 'linear',
} as const;

// ============================================
// COMPLETE ANIMATION EXPORT
// ============================================

export const animation = {
  duration,
  easing,
  transition,
  keyframes,
  spring,
  delay,
  reducedMotion,
} as const;

export default animation;
