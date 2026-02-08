/**
 * SpinWheel component props
 * Prize wheel gamification element with colored segments
 */

export interface SpinWheelSegment {
  /** Segment label */
  label: string;
  /** Segment value */
  value: string;
}

export interface SpinWheelPropsBase {
  /** Wheel segments (8 recommended) */
  segments: SpinWheelSegment[];
  /** Whether the wheel is currently spinning */
  isSpinning?: boolean;
  /** Remaining spins count */
  remainingSpins?: number;
  /** Callback when spin is triggered */
  onSpin?: () => void;
  /** Callback when spin completes with winning segment index */
  onSpinComplete?: (segmentIndex: number) => void;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testID?: string;
}
