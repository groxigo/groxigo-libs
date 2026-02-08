/**
 * PreferencesCard Component Contract
 *
 * Platform-agnostic interface for PreferencesCard component.
 * Displays a list of preference settings with dropdown selectors.
 */

export interface PreferenceOption {
  /** Option value */
  value: string;
  /** Display label */
  label: string;
}

export interface PreferenceSetting {
  /** Unique key for the setting */
  key: string;
  /** Display label */
  label: string;
  /** Current selected value */
  value: string;
  /** Available options */
  options: PreferenceOption[];
}

export interface PreferencesCardPropsBase {
  /** Card title @default 'Preferences' */
  title?: string;
  /** List of preference settings */
  settings: PreferenceSetting[];
  /** Callback when a preference is changed */
  onChange?: (key: string, value: string) => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
