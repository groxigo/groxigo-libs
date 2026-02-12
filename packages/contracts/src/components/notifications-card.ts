/**
 * NotificationsCard Component Contract
 *
 * Platform-agnostic interface for NotificationsCard component.
 * Displays a list of notification settings with toggle switches.
 */

export interface NotificationSetting {
  /** Unique key for the setting */
  key: string;
  /** Display label */
  label: string;
  /** Whether the setting is enabled */
  enabled: boolean;
}

export interface NotificationsCardPropsBase {
  /** Card title @default 'Notifications' */
  title?: string;
  /** List of notification settings */
  settings: NotificationSetting[];
  /** Callback when a toggle is changed */
  onToggle?: (key: string, enabled: boolean) => void;
  /** Test ID for testing */
  testID?: string;
}
