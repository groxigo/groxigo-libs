/**
 * Animation Contracts
 *
 * Platform-agnostic interfaces for animations.
 * Both React Native (lottie-react-native, reanimated) and
 * Web (lottie-web, framer-motion) implementations must conform to these contracts.
 */

// Lottie
export type {
  LottieSource,
  LottieLoop,
  LottieDirection,
  LottieSegment,
  LottieRef,
  LottiePropsBase,
  LottiePreset,
  LottiePresetConfig,
  AnimatedIconPropsBase,
} from './lottie';

// Transitions
export type {
  EasingFunction,
  CubicBezier,
  SpringConfig,
  TimingConfig,
  AnimationConfig,
  AnimationPresets,
  TransformProperties,
  AnimatableProperties,
  TransitionPreset,
  Keyframe,
  Keyframes,
  AnimatedPropsBase,
  StaggerConfig,
  AnimationSequenceItem,
  LayoutAnimationConfig,
  GestureAnimationConfig,
} from './transition';
