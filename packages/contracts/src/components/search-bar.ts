/**
 * SearchBar Component Contract
 */

export type SearchBarVariant = 'outline' | 'filled';
export type SearchBarSize = 'sm' | 'md' | 'lg';

export interface SearchBarPropsBase {
  /** Current search value */
  value?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Variant @default 'filled' */
  variant?: SearchBarVariant;
  /** Size @default 'md' */
  size?: SearchBarSize;
  /** Whether to auto-focus */
  autoFocus?: boolean;
  /** Whether to show cancel button */
  showCancel?: boolean;
  /** Change handler */
  onChangeText?: (text: string) => void;
  /** Submit handler */
  onSubmit?: (text: string) => void;
  /** Focus handler */
  onFocus?: () => void;
  /** Blur handler */
  onBlur?: () => void;
  /** Cancel handler */
  onCancel?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testID?: string;
}
