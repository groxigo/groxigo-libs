/**
 * DeliverySlotPicker Component Contract
 *
 * Platform-agnostic interface for the delivery date and time slot picker.
 * Displays a horizontal scrollable row of dates and a vertical list of time slots.
 */

/** A selectable delivery date */
export interface DeliveryDate {
  /** Unique key for this date */
  key: string;
  /** Day of week abbreviation (e.g. "Mon") */
  day: string;
  /** Day of month number (e.g. 14) */
  date: number;
  /** Month abbreviation (e.g. "Feb") */
  month: string;
}

/** A selectable delivery time slot */
export interface DeliveryTimeSlot {
  /** Unique key for this slot */
  key: string;
  /** Display label (e.g. "9:00 AM - 11:00 AM") */
  label: string;
  /** Whether this slot is available for selection @default true */
  available?: boolean;
}

export interface DeliverySlotPickerPropsBase {
  /** Available delivery dates */
  dates: DeliveryDate[];
  /** Available time slots for the selected date */
  timeSlots: DeliveryTimeSlot[];
  /** Currently selected date key */
  selectedDate?: string;
  /** Currently selected time slot key */
  selectedSlot?: string;
  /** Callback when a date is selected */
  onDateSelect?: (dateKey: string) => void;
  /** Callback when a time slot is selected */
  onSlotSelect?: (slotKey: string) => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
