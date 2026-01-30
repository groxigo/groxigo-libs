/**
 * Switch Component Contract
 *
 * Platform-agnostic interface for Switch/Toggle component.
 */

import type { ReactNode } from 'react';

export type SwitchSize = 'sm' | 'md' | 'lg';
export type SwitchColorScheme = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';

/**
 * Base Switch props that all platforms must support
 */
export interface SwitchPropsBase {
  /** Whether the switch is on */
  checked?: boolean;
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean;
  /** Switch size @default 'md' */
  size?: SwitchSize;
  /** Color scheme when on @default 'primary' */
  colorScheme?: SwitchColorScheme;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Whether the switch is required */
  required?: boolean;
  /** Switch label */
  label?: ReactNode;
  /** Label position @default 'right' */
  labelPosition?: 'left' | 'right';
  /** Helper text */
  helperText?: string;
  /** Switch value (for forms) */
  value?: string;
  /** Switch name (for forms) */
  name?: string;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID for testing */
  testID?: string;
}
