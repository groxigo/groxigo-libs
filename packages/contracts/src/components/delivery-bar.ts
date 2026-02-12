/**
 * DeliveryBar Component Contract
 *
 * Platform-agnostic interface for the delivery information bar component.
 * Used in the home page header to show delivery address, estimated time, and countdown.
 */

/**
 * Delivery address structure
 */
export interface DeliveryAddress {
  /** Street address line 1 */
  line1: string;
  /** Street address line 2 (apartment, suite, etc.) */
  line2?: string;
  /** City name */
  city?: string;
  /** State/Province */
  state?: string;
  /** Postal/ZIP code */
  zip?: string;
  /** Address label (home, work, other) */
  label?: 'home' | 'work' | 'other';
}

/**
 * Delivery slot information
 */
export interface DeliverySlot {
  /** Slot start time */
  startTime: Date;
  /** Slot end time */
  endTime: Date;
  /** Display label for the slot */
  label?: string;
}

/**
 * Section theming for the delivery bar
 */
export type DeliveryBarSection = 'default' | 'groceries' | 'recipes';

/**
 * DeliveryBar component props contract
 */
export interface DeliveryBarPropsBase {
  /** Delivery address to display */
  address?: DeliveryAddress | null;

  /** Custom format function for address display */
  formatAddress?: (address: DeliveryAddress) => string;

  /** Estimated delivery time string (e.g., "30-45 min") */
  deliveryTime?: string;

  /** Minutes remaining until order cutoff for next slot */
  countdownMinutes?: number;

  /** Next available delivery slot */
  nextSlot?: DeliverySlot | null;

  /** Whether user is in browse-only mode (outside delivery zone) */
  isBrowseMode?: boolean;

  /** Custom message for browse mode */
  browseModeMessage?: string;

  /** Called when address section is pressed */
  onAddressPress?: () => void;

  /** Called when countdown reaches zero */
  onCountdownComplete?: () => void;

  /** Lottie animation source for background (path or JSON object) */
  lottieSource?: string | object;

  /** Whether to show Lottie animated background */
  showLottieBackground?: boolean;

  /** Section theming */
  section?: DeliveryBarSection;

  /** Whether the bar is in compact/collapsed state */
  isCompact?: boolean;

  /** Test ID for testing */
  testID?: string;

}
