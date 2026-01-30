/**
 * Lottie Animation Types for SDUI
 */

/**
 * Lottie animation source - can be URL or local reference
 */
export type LottieSource =
  | string  // URL
  | { uri: string }  // URI object
  | object;  // Inline JSON

/**
 * Lottie animation props
 */
export interface LottiePropsBase {
  /** Animation source - URL, URI object, or inline JSON */
  source: LottieSource;
  /** Auto play on mount @default true */
  autoPlay?: boolean;
  /** Loop animation @default true */
  loop?: boolean;
  /** Playback speed (1 = normal) @default 1 */
  speed?: number;
  /** Start frame */
  startFrame?: number;
  /** End frame */
  endFrame?: number;
  /** Callback when animation completes */
  onAnimationFinish?: () => void;
  /** Render mode */
  renderMode?: 'AUTOMATIC' | 'HARDWARE' | 'SOFTWARE';
  /** Test ID */
  testID?: string;
}

/**
 * Lottie as background configuration
 */
export interface LottieBackgroundConfig {
  type: 'lottie';
  source: LottieSource;
  loop?: boolean;
  speed?: number;
  opacity?: number;
}

/**
 * Animation trigger types
 */
export type AnimationTrigger =
  | 'onMount'
  | 'onPress'
  | 'onVisible'
  | 'onHover'
  | 'onFocus'
  | 'onSuccess'
  | 'onError'
  | 'manual';

/**
 * Triggered animation configuration
 */
export interface TriggeredAnimation {
  /** Lottie source */
  source: LottieSource;
  /** When to trigger */
  trigger: AnimationTrigger;
  /** Play once or loop */
  loop?: boolean;
  /** Duration override (ms) */
  duration?: number;
}
