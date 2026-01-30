/**
 * FormField Component Contract
 *
 * Platform-agnostic interface for FormField component.
 */

import type { ReactNode } from 'react';
import type { InputPropsBase } from '../elements/input';

/**
 * Base FormField props that all platforms must support
 */
export interface FormFieldPropsBase extends InputPropsBase {
  /** Field label (required for FormField) */
  label: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display below input */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Label element (for custom labels) */
  labelElement?: ReactNode;
  /** Test ID for testing */
  testID?: string;
}
