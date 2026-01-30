/**
 * Animation Transition Contracts
 *
 * Platform-agnostic interfaces for UI transitions and animations.
 * These define standard animation patterns that both platforms implement.
 */

/**
 * Easing function type
 */
export type EasingFunction =
  | 'linear'
  | 'ease'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'
  | 'easeInSine'
  | 'easeOutSine'
  | 'easeInOutSine'
  | 'easeInExpo'
  | 'easeOutExpo'
  | 'easeInOutExpo'
  | 'easeInCirc'
  | 'easeOutCirc'
  | 'easeInOutCirc'
  | 'easeInBack'
  | 'easeOutBack'
  | 'easeInOutBack'
  | 'easeInElastic'
  | 'easeOutElastic'
  | 'easeInOutElastic'
  | 'easeInBounce'
  | 'easeOutBounce'
  | 'easeInOutBounce'
  | 'spring';

/**
 * Cubic bezier curve [x1, y1, x2, y2]
 */
export type CubicBezier = [number, number, number, number];

/**
 * Spring animation configuration
 */
export interface SpringConfig {
  /** Spring stiffness (force) @default 100 */
  stiffness?: number;
  /** Damping (resistance) @default 10 */
  damping?: number;
  /** Mass (object weight) @default 1 */
  mass?: number;
  /** Initial velocity @default 0 */
  velocity?: number;
  /** Rest delta threshold @default 0.01 */
  restDelta?: number;
  /** Rest speed threshold @default 0.01 */
  restSpeed?: number;
}

/**
 * Timing animation configuration
 */
export interface TimingConfig {
  /** Duration in milliseconds @default 300 */
  duration?: number;
  /** Easing function or bezier @default 'easeInOut' */
  easing?: EasingFunction | CubicBezier;
  /** Delay before starting in milliseconds @default 0 */
  delay?: number;
}

/**
 * Animation configuration (spring or timing)
 */
export type AnimationConfig = SpringConfig | TimingConfig;

/**
 * Standard animation presets
 */
export interface AnimationPresets {
  /** Fast interaction feedback (150ms) */
  fast: TimingConfig;
  /** Normal transitions (300ms) */
  normal: TimingConfig;
  /** Slow, deliberate animations (500ms) */
  slow: TimingConfig;
  /** Modal/overlay entrance */
  modalIn: TimingConfig;
  /** Modal/overlay exit */
  modalOut: TimingConfig;
  /** Page transitions */
  pageTransition: TimingConfig;
  /** Subtle spring animation */
  springSubtle: SpringConfig;
  /** Bouncy spring animation */
  springBouncy: SpringConfig;
  /** Stiff spring animation */
  springStiff: SpringConfig;
}

/**
 * Transform properties for animations
 */
export interface TransformProperties {
  translateX?: number;
  translateY?: number;
  translateZ?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  rotate?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  skewX?: number | string;
  skewY?: number | string;
  perspective?: number;
}

/**
 * Animatable style properties
 */
export interface AnimatableProperties extends TransformProperties {
  opacity?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number | string;
  height?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  margin?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  shadowOpacity?: number;
  shadowRadius?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowColor?: string;
  color?: string;
  fontSize?: number;
  letterSpacing?: number;
  lineHeight?: number;
}

/**
 * Transition preset names
 */
export type TransitionPreset =
  | 'fadeIn'
  | 'fadeOut'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideInUp'
  | 'slideInDown'
  | 'slideOutLeft'
  | 'slideOutRight'
  | 'slideOutUp'
  | 'slideOutDown'
  | 'scaleIn'
  | 'scaleOut'
  | 'bounceIn'
  | 'bounceOut'
  | 'flipInX'
  | 'flipInY'
  | 'flipOutX'
  | 'flipOutY'
  | 'zoomIn'
  | 'zoomOut'
  | 'pulse'
  | 'shake'
  | 'wobble'
  | 'swing';

/**
 * Keyframe definition
 */
export interface Keyframe extends Partial<AnimatableProperties> {
  /** Position in animation (0-1) */
  offset?: number;
  /** Easing to use for this keyframe */
  easing?: EasingFunction | CubicBezier;
}

/**
 * Animation keyframes
 */
export type Keyframes = Keyframe[];

/**
 * Animated component props base
 */
export interface AnimatedPropsBase {
  /** Initial/from values */
  from?: Partial<AnimatableProperties>;
  /** Target/to values */
  to?: Partial<AnimatableProperties>;
  /** Animation configuration */
  config?: AnimationConfig;
  /** Transition preset */
  preset?: TransitionPreset;
  /** Whether animation is active */
  animate?: boolean;
  /** Delay before starting */
  delay?: number;
  /** Number of iterations (Infinity for loop) */
  iterations?: number;
  /** Direction of animation */
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  /** Fill mode */
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
  /** Callback when animation starts */
  onStart?: () => void;
  /** Callback when animation ends */
  onEnd?: () => void;
  /** Callback on each frame */
  onFrame?: (progress: number) => void;
}

/**
 * Stagger animation configuration
 */
export interface StaggerConfig {
  /** Delay between each item in milliseconds @default 50 */
  stagger?: number;
  /** Starting offset @default 0 */
  offset?: number;
  /** Direction of stagger @default 'normal' */
  direction?: 'normal' | 'reverse' | 'center' | 'edges';
}

/**
 * Animation sequence item
 */
export interface AnimationSequenceItem {
  /** Target selector or element ID */
  target?: string;
  /** Animation properties */
  properties: Partial<AnimatableProperties>;
  /** Animation configuration */
  config?: AnimationConfig;
  /** Start time offset in milliseconds */
  offset?: number | string;
}

/**
 * Layout animation configuration
 */
export interface LayoutAnimationConfig {
  /** Animation when items are added */
  entering?: TransitionPreset | AnimationConfig;
  /** Animation when items are removed */
  exiting?: TransitionPreset | AnimationConfig;
  /** Animation for layout changes */
  layout?: AnimationConfig;
}

/**
 * Gesture-driven animation configuration
 */
export interface GestureAnimationConfig {
  /** X-axis translation bounds */
  translateXBounds?: [number, number];
  /** Y-axis translation bounds */
  translateYBounds?: [number, number];
  /** Scale bounds */
  scaleBounds?: [number, number];
  /** Rotation bounds */
  rotateBounds?: [number, number];
  /** Snap points for X */
  snapPointsX?: number[];
  /** Snap points for Y */
  snapPointsY?: number[];
  /** Resistance when exceeding bounds @default 0.5 */
  resistance?: number;
  /** Whether to decay after release @default true */
  decay?: boolean;
  /** Spring back configuration */
  springBack?: SpringConfig;
}
