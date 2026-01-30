/**
 * Animation Utilities
 *
 * Shared animation configs and utilities.
 * Platform implementations convert these to native formats.
 */

// Presets
export {
  timingPresets,
  springPresets,
  animationPresets,
  easingBeziers,
  durations,
  delays,
  staggerDelays,
} from './presets';

// Transitions
export {
  transitionPresets,
  getTransition,
  modalAnimations,
  drawerAnimations,
  tooltipAnimation,
  toastAnimation,
  type TransitionDefinition,
} from './transitions';

// Lottie
export {
  lottiePresetConfigs,
  getLottiePresetConfig,
  animatedIconSizes,
  getAnimatedIconSize,
  defaultLottieProps,
  lottieAnimationDurations,
} from './lottie-presets';
