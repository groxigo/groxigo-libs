/**
 * Checkbox Component Contract
 *
 * Platform-agnostic interface for Checkbox component.
 */

import type { ReactNode } from 'react';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';

/**
 * Base Checkbox props that all platforms must support
 */
export interface CheckboxPropsBase {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Whether the checkbox is indeterminate */
  indeterminate?: boolean;
  /** Checkbox size @default 'md' */
  size?: CheckboxSize;
  /** Color scheme @default 'primary' */
  colorScheme?: CheckboxColorScheme;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Whether the checkbox is invalid */
  isInvalid?: boolean;
  /** Whether the checkbox is required */
  required?: boolean;
  /** Checkbox label */
  label?: ReactNode;
  /** Helper text below the checkbox */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Checkbox value (for forms) */
  value?: string;
  /** Checkbox name (for forms) */
  name?: string;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Checkbox Group props
 */
export interface CheckboxGroupPropsBase {
  /** Selected values */
  value?: string[];
  /** Default selected values (uncontrolled) */
  defaultValue?: string[];
  /** Group name */
  name?: string;
  /** Checkbox size for all children */
  size?: CheckboxSize;
  /** Color scheme for all children */
  colorScheme?: CheckboxColorScheme;
  /** Layout direction @default 'vertical' */
  direction?: 'horizontal' | 'vertical';
  /** Spacing between checkboxes */
  spacing?: number;
  /** Whether all checkboxes are disabled */
  disabled?: boolean;
  /** Change handler */
  onChange?: (values: string[]) => void;
  /** Children (Checkbox components) */
  children?: ReactNode;
  /** Additional CSS class (web only) */
  className?: string;
}
