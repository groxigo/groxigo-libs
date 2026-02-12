/**
 * AddressCard Component Contract
 *
 * Platform-agnostic interface for AddressCard component.
 * Displays a saved address with radio selection, label, address lines,
 * and edit/delete actions.
 */

export type AddressType = 'home' | 'work' | 'other';

export interface AddressCardPropsBase {
  /** Unique address ID */
  id: string;
  /** Address type */
  type: AddressType;
  /** Display label (e.g. "Home", "Work", "Mom's Place") */
  label: string;
  /** Address line 1 */
  line1: string;
  /** Address line 2 (city, state, zip) */
  line2?: string;
  /** Whether this address is currently selected @default false */
  selected?: boolean;
  /** Callback when the address is selected via radio */
  onSelect?: () => void;
  /** Callback when edit is pressed */
  onEdit?: () => void;
  /** Callback when delete is pressed */
  onDelete?: () => void;
  /** Test ID for testing */
  testID?: string;
}
