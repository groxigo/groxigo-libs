/**
 * Radio Component Contract
 *
 * Platform-agnostic interface for Radio component.
 */

import type { ReactNode } from 'react';

export type RadioSize = 'sm' | 'md' | 'lg';
/**
 * Base Radio props that all platforms must support
 */
export interface RadioPropsBase {
  /** Radio value */
  value: string;
  /** Radio size @default 'md' */
  size?: RadioSize;
  /** Whether the radio is disabled */
  disabled?: boolean;
  /** Whether the radio is invalid */
  isInvalid?: boolean;
  /** Radio label */
  label?: ReactNode;
  /** Helper text */
  helperText?: string;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Radio Group props
 */
export interface RadioGroupPropsBase {
  /** Selected value */
  value?: string;
  /** Default selected value (uncontrolled) */
  defaultValue?: string;
  /** Group name */
  name?: string;
  /** Radio size for all children */
  size?: RadioSize;
  /** Layout direction @default 'vertical' */
  direction?: 'horizontal' | 'vertical';
  /** Spacing between radios */
  spacing?: number;
  /** Whether all radios are disabled */
  disabled?: boolean;
  /** Whether the group is required */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Children (Radio components) */
  children?: ReactNode;
}
