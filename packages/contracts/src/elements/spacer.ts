/**
 * Spacer Component Contract
 *
 * Platform-agnostic interface for Spacer component.
 */

/**
 * Base Spacer props that all platforms must support
 */
export interface SpacerPropsBase {
  /** Size multiplier (multiplied by base unit) @default 4 */
  size?: number;
  /** Fixed width in pixels */
  width?: number;
  /** Fixed height in pixels */
  height?: number;
  /** Flex grow to fill available space */
  flex?: boolean;
  /** Horizontal spacing multiplier */
  x?: number;
  /** Vertical spacing multiplier */
  y?: number;
  /** Test ID for testing */
  testID?: string;
}
