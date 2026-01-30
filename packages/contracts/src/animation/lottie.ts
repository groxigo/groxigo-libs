/**
 * Lottie Animation Component Contract
 *
 * Platform-agnostic interface for Lottie animations.
 * - React Native: lottie-react-native
 * - Web: lottie-web or @lottiefiles/react-lottie-player
 */

import type { RefObject } from 'react';

/**
 * Lottie animation source
 * Can be a local JSON, URL string, or animation data object
 */
export type LottieSource =
  | string // URL to JSON file
  | object // Animation JSON data
  | { uri: string } // React Native style URL
  | number; // React Native require() result

/**
 * Animation loop configuration
 */
export type LottieLoop = boolean | number;

/**
 * Animation direction
 */
export type LottieDirection = 1 | -1;

/**
 * Segment definition [start frame, end frame]
 */
export type LottieSegment = [number, number];

/**
 * Lottie animation ref interface
 */
export interface LottieRef {
  /** Play the animation */
  play: () => void;
  /** Pause the animation */
  pause: () => void;
  /** Stop the animation (resets to beginning) */
  stop: () => void;
  /** Reset the animation to the beginning */
  reset: () => void;
  /** Go to a specific frame and pause */
  goToAndStop: (frame: number, isFrame?: boolean) => void;
  /** Go to a specific frame and play */
  goToAndPlay: (frame: number, isFrame?: boolean) => void;
  /** Set the animation speed */
  setSpeed: (speed: number) => void;
  /** Set the animation direction */
  setDirection: (direction: LottieDirection) => void;
  /** Play specific segments */
  playSegments: (segments: LottieSegment | LottieSegment[], forceFlag?: boolean) => void;
  /** Get the current frame */
  getCurrentFrame: () => number;
  /** Get the total frames */
  getTotalFrames: () => number;
  /** Get the animation duration in seconds */
  getDuration: (inFrames?: boolean) => number;
  /** Destroy the animation instance */
  destroy: () => void;
}

/**
 * Base Lottie Animation props that all platforms must support
 */
export interface LottiePropsBase {
  /** Animation source (JSON data, URL, or require) */
  source: LottieSource;
  /** Whether to autoplay @default true */
  autoPlay?: boolean;
  /** Loop configuration @default true */
  loop?: LottieLoop;
  /** Animation speed @default 1 */
  speed?: number;
  /** Animation direction @default 1 */
  direction?: LottieDirection;
  /** Animation progress (0-1, for controlled animations) */
  progress?: number;
  /** Segments to play */
  segments?: LottieSegment | LottieSegment[];
  /** Ref for animation control */
  animationRef?: RefObject<LottieRef>;
  /** Width of the animation container */
  width?: number | string;
  /** Height of the animation container */
  height?: number | string;
  /** Resize mode */
  resizeMode?: 'cover' | 'contain' | 'center';
  /** Whether to render with hardware acceleration */
  hardwareAccelerationAndroid?: boolean;
  /** Render mode (web) */
  rendererSettings?: {
    preserveAspectRatio?: string;
    clearCanvas?: boolean;
    progressiveLoad?: boolean;
    hideOnTransparent?: boolean;
  };
  /** Callback when animation completes */
  onAnimationFinish?: (isCancelled: boolean) => void;
  /** Callback when animation loops */
  onAnimationLoop?: () => void;
  /** Callback when animation is loaded */
  onAnimationLoaded?: () => void;
  /** Callback on animation failure */
  onAnimationFailure?: (error: Error) => void;
  /** Callback for each frame */
  onEnterFrame?: (frame: number) => void;
  /** Callback for segment completion */
  onSegmentStart?: (segment: LottieSegment) => void;
  /** Callback when a marker is reached */
  onMarkerReached?: (marker: string) => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Additional style */
  style?: object;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Animation presets for common use cases
 */
export type LottiePreset =
  | 'success'
  | 'error'
  | 'warning'
  | 'info'
  | 'loading'
  | 'confetti'
  | 'heart'
  | 'star'
  | 'check'
  | 'empty-state'
  | 'cart-add'
  | 'cart-success'
  | 'search'
  | 'pull-to-refresh';

/**
 * Animation preset configuration
 */
export interface LottiePresetConfig {
  /** Preset name */
  name: LottiePreset;
  /** Animation source */
  source: LottieSource;
  /** Default loop behavior */
  loop?: LottieLoop;
  /** Default speed */
  speed?: number;
  /** Suggested size */
  size?: { width: number; height: number };
  /** Description */
  description?: string;
}

/**
 * Animated Icon props (Lottie-based icons)
 */
export interface AnimatedIconPropsBase {
  /** Animation preset or custom source */
  preset?: LottiePreset;
  /** Custom animation source (overrides preset) */
  source?: LottieSource;
  /** Icon size @default 'md' */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Color (for monochrome animations) */
  color?: string;
  /** Whether to autoplay @default true */
  autoPlay?: boolean;
  /** Loop configuration @default false */
  loop?: LottieLoop;
  /** Whether the animation is active/playing */
  isActive?: boolean;
  /** Animation speed @default 1 */
  speed?: number;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
