/**
 * Input Component Contract
 */

import type { ReactNode } from 'react';

export type InputVariant = 'outline' | 'filled' | 'flushed' | 'unstyled';
export type InputSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Base Input props that all platforms must support
 *
 * @example
 * // Basic input
 * <Input
 *   placeholder="Enter your email"
 *   value={email}
 *   onChangeText={setEmail}
 * />
 *
 * @example
 * // Password input with error state
 * <Input
 *   type="password"
 *   placeholder="Password"
 *   value={password}
 *   onChangeText={setPassword}
 *   isInvalid={!!error}
 *   rightElement={<EyeIcon />}
 * />
 *
 * @example
 * // Search input with left icon
 * <Input
 *   variant="filled"
 *   type="search"
 *   placeholder="Search products..."
 *   leftElement={<SearchIcon />}
 *   value={query}
 *   onChangeText={setQuery}
 * />
 */
export interface InputPropsBase {
  /** Input variant @default 'outline' */
  variant?: InputVariant;
  /** Input size @default 'md' */
  size?: InputSize;
  /** Placeholder text */
  placeholder?: string;
  /** Current value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is read-only */
  readOnly?: boolean;
  /** Whether input is required */
  required?: boolean;
  /** Whether input has error state */
  isInvalid?: boolean;
  /** Left element (icon or text) */
  leftElement?: ReactNode;
  /** Right element (icon or text) */
  rightElement?: ReactNode;
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** Change handler */
  onChangeText?: (text: string) => void;
  /** Focus handler */
  onFocus?: () => void;
  /** Blur handler */
  onBlur?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testID?: string;
}
