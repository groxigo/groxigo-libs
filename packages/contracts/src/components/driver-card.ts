/**
 * DriverCard Component Contract
 *
 * Platform-agnostic interface for DriverCard component.
 * Displays delivery driver info with avatar, name, vehicle, and call action.
 */

export interface DriverCardPropsBase {
  /** Driver name */
  name: string;
  /** Vehicle description (e.g. "White Toyota Camry") */
  vehicle?: string;
  /** Driver avatar URL */
  avatarUrl?: string;
  /** Driver phone number */
  phone?: string;
  /** Callback when call button is pressed */
  onCall?: () => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
