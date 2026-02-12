/**
 * Select Component Contract
 *
 * Platform-agnostic interface for Select/Dropdown component.
 */

import type { ReactNode } from 'react';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'outline' | 'filled' | 'flushed';

/**
 * Select option
 */
export interface SelectOption {
  /** Option value */
  value: string;
  /** Option label */
  label: string;
  /** Whether option is disabled */
  disabled?: boolean;
  /** Option group */
  group?: string;
  /** Option icon */
  icon?: ReactNode;
}

/**
 * Base Select props that all platforms must support
 */
export interface SelectPropsBase {
  /** Selected value(s) */
  value?: string | string[];
  /** Default selected value(s) (uncontrolled) */
  defaultValue?: string | string[];
  /** Available options */
  options: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Select size @default 'md' */
  size?: SelectSize;
  /** Select variant @default 'outline' */
  variant?: SelectVariant;
  /** Whether multiple selection is allowed */
  multiple?: boolean;
  /** Whether the select is searchable */
  searchable?: boolean;
  /** Whether the select is clearable */
  clearable?: boolean;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether the select is loading */
  loading?: boolean;
  /** Whether the select is invalid */
  isInvalid?: boolean;
  /** Whether the select is required */
  required?: boolean;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Select name (for forms) */
  name?: string;
  /** Maximum selections (for multiple) */
  maxSelections?: number;
  /** Custom render for selected value */
  renderValue?: (selected: SelectOption | SelectOption[]) => ReactNode;
  /** Custom render for option */
  renderOption?: (option: SelectOption) => ReactNode;
  /** Change handler */
  onChange?: (value: string | string[]) => void;
  /** Search handler */
  onSearch?: (query: string) => void;
  /** Open/close handler */
  onOpenChange?: (open: boolean) => void;
  /** Test ID for testing */
  testID?: string;
}
