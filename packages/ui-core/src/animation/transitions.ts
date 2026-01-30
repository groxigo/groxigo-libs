/**
 * Transition Configs
 *
 * Pre-configured transition animations.
 * Platform implementations convert these to native formats.
 */

import type { AnimatableProperties, TransitionPreset } from '@groxigo/contracts';
import { durations, easingBeziers } from './presets';

/**
 * Transition definition
 */
export interface TransitionDefinition {
  from: Partial<AnimatableProperties>;
  to: Partial<AnimatableProperties>;
  duration?: number;
  easing?: string;
}

/**
 * Transition preset definitions
 */
export const transitionPresets: Record<TransitionPreset, TransitionDefinition> = {
  // Fade
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: durations.normal,
    easing: 'easeOut',
  },
  fadeOut: {
    from: { opacity: 1 },
    to: { opacity: 0 },
    duration: durations.normal,
    easing: 'easeIn',
  },

  // Slide In
  slideInLeft: {
    from: { translateX: -100, opacity: 0 },
    to: { translateX: 0, opacity: 1 },
    duration: durations.normal,
    easing: 'easeOut',
  },
  slideInRight: {
    from: { translateX: 100, opacity: 0 },
    to: { translateX: 0, opacity: 1 },
    duration: durations.normal,
    easing: 'easeOut',
  },
  slideInUp: {
    from: { translateY: 100, opacity: 0 },
    to: { translateY: 0, opacity: 1 },
    duration: durations.normal,
    easing: 'easeOut',
  },
  slideInDown: {
    from: { translateY: -100, opacity: 0 },
    to: { translateY: 0, opacity: 1 },
    duration: durations.normal,
    easing: 'easeOut',
  },

  // Slide Out
  slideOutLeft: {
    from: { translateX: 0, opacity: 1 },
    to: { translateX: -100, opacity: 0 },
    duration: durations.normal,
    easing: 'easeIn',
  },
  slideOutRight: {
    from: { translateX: 0, opacity: 1 },
    to: { translateX: 100, opacity: 0 },
    duration: durations.normal,
    easing: 'easeIn',
  },
  slideOutUp: {
    from: { translateY: 0, opacity: 1 },
    to: { translateY: -100, opacity: 0 },
    duration: durations.normal,
    easing: 'easeIn',
  },
  slideOutDown: {
    from: { translateY: 0, opacity: 1 },
    to: { translateY: 100, opacity: 0 },
    duration: durations.normal,
    easing: 'easeIn',
  },

  // Scale
  scaleIn: {
    from: { scale: 0.9, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    duration: durations.normal,
    easing: 'easeOut',
  },
  scaleOut: {
    from: { scale: 1, opacity: 1 },
    to: { scale: 0.9, opacity: 0 },
    duration: durations.fast,
    easing: 'easeIn',
  },

  // Bounce
  bounceIn: {
    from: { scale: 0.3, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    duration: durations.slow,
    easing: 'easeOutBack',
  },
  bounceOut: {
    from: { scale: 1, opacity: 1 },
    to: { scale: 0.3, opacity: 0 },
    duration: durations.normal,
    easing: 'easeInBack',
  },

  // Flip
  flipInX: {
    from: { rotateX: '-90deg', opacity: 0 },
    to: { rotateX: '0deg', opacity: 1 },
    duration: durations.slow,
    easing: 'easeOut',
  },
  flipInY: {
    from: { rotateY: '-90deg', opacity: 0 },
    to: { rotateY: '0deg', opacity: 1 },
    duration: durations.slow,
    easing: 'easeOut',
  },
  flipOutX: {
    from: { rotateX: '0deg', opacity: 1 },
    to: { rotateX: '90deg', opacity: 0 },
    duration: durations.normal,
    easing: 'easeIn',
  },
  flipOutY: {
    from: { rotateY: '0deg', opacity: 1 },
    to: { rotateY: '90deg', opacity: 0 },
    duration: durations.normal,
    easing: 'easeIn',
  },

  // Zoom
  zoomIn: {
    from: { scale: 0, opacity: 0 },
    to: { scale: 1, opacity: 1 },
    duration: durations.normal,
    easing: 'easeOut',
  },
  zoomOut: {
    from: { scale: 1, opacity: 1 },
    to: { scale: 0, opacity: 0 },
    duration: durations.normal,
    easing: 'easeIn',
  },

  // Attention seekers
  pulse: {
    from: { scale: 1 },
    to: { scale: 1.05 },
    duration: durations.fast,
    easing: 'easeInOut',
  },
  shake: {
    from: { translateX: 0 },
    to: { translateX: 10 },
    duration: 100,
    easing: 'easeInOut',
  },
  wobble: {
    from: { rotate: '0deg' },
    to: { rotate: '3deg' },
    duration: durations.fast,
    easing: 'easeInOut',
  },
  swing: {
    from: { rotate: '0deg' },
    to: { rotate: '15deg' },
    duration: durations.normal,
    easing: 'easeInOut',
  },
};

/**
 * Get a transition preset by name
 */
export function getTransition(name: TransitionPreset): TransitionDefinition {
  return transitionPresets[name];
}

/**
 * Modal animation configs
 */
export const modalAnimations = {
  /** Fade and scale from center */
  fadeScale: {
    enter: {
      from: { opacity: 0, scale: 0.95 },
      to: { opacity: 1, scale: 1 },
      duration: durations.normal,
      easing: 'easeOut',
    },
    exit: {
      from: { opacity: 1, scale: 1 },
      to: { opacity: 0, scale: 0.95 },
      duration: durations.fast,
      easing: 'easeIn',
    },
  },
  /** Slide up from bottom */
  slideUp: {
    enter: {
      from: { opacity: 0, translateY: 50 },
      to: { opacity: 1, translateY: 0 },
      duration: durations.normal,
      easing: 'easeOut',
    },
    exit: {
      from: { opacity: 1, translateY: 0 },
      to: { opacity: 0, translateY: 50 },
      duration: durations.fast,
      easing: 'easeIn',
    },
  },
} as const;

/**
 * Drawer animation configs
 */
export const drawerAnimations = {
  left: {
    enter: {
      from: { translateX: -300 },
      to: { translateX: 0 },
      duration: durations.normal,
      easing: 'easeOut',
    },
    exit: {
      from: { translateX: 0 },
      to: { translateX: -300 },
      duration: durations.fast,
      easing: 'easeIn',
    },
  },
  right: {
    enter: {
      from: { translateX: 300 },
      to: { translateX: 0 },
      duration: durations.normal,
      easing: 'easeOut',
    },
    exit: {
      from: { translateX: 0 },
      to: { translateX: 300 },
      duration: durations.fast,
      easing: 'easeIn',
    },
  },
  top: {
    enter: {
      from: { translateY: -300 },
      to: { translateY: 0 },
      duration: durations.normal,
      easing: 'easeOut',
    },
    exit: {
      from: { translateY: 0 },
      to: { translateY: -300 },
      duration: durations.fast,
      easing: 'easeIn',
    },
  },
  bottom: {
    enter: {
      from: { translateY: 300 },
      to: { translateY: 0 },
      duration: durations.normal,
      easing: 'easeOut',
    },
    exit: {
      from: { translateY: 0 },
      to: { translateY: 300 },
      duration: durations.fast,
      easing: 'easeIn',
    },
  },
} as const;

/**
 * Tooltip animation config
 */
export const tooltipAnimation = {
  enter: {
    from: { opacity: 0, scale: 0.95 },
    to: { opacity: 1, scale: 1 },
    duration: durations.fast,
    easing: 'easeOut',
  },
  exit: {
    from: { opacity: 1, scale: 1 },
    to: { opacity: 0, scale: 0.95 },
    duration: 100,
    easing: 'easeIn',
  },
} as const;

/**
 * Toast animation config
 */
export const toastAnimation = {
  enter: {
    from: { opacity: 0, translateY: 20, scale: 0.95 },
    to: { opacity: 1, translateY: 0, scale: 1 },
    duration: durations.normal,
    easing: 'easeOut',
  },
  exit: {
    from: { opacity: 1, translateY: 0, scale: 1 },
    to: { opacity: 0, translateY: -20, scale: 0.95 },
    duration: durations.fast,
    easing: 'easeIn',
  },
} as const;
