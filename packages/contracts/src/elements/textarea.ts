/**
 * TextArea Component Contract
 *
 * Platform-agnostic interface for TextArea/MultilineInput component.
 */

export type TextAreaSize = 'sm' | 'md' | 'lg';
export type TextAreaVariant = 'outline' | 'filled' | 'flushed';
export type TextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/**
 * Base TextArea props that all platforms must support
 */
export interface TextAreaPropsBase {
  /** TextArea value */
  value?: string;
  /** Default value (uncontrolled) */
  defaultValue?: string;
  /** Placeholder text */
  placeholder?: string;
  /** TextArea size @default 'md' */
  size?: TextAreaSize;
  /** TextArea variant @default 'outline' */
  variant?: TextAreaVariant;
  /** Number of visible rows @default 3 */
  rows?: number;
  /** Minimum number of rows (for auto-resize) */
  minRows?: number;
  /** Maximum number of rows (for auto-resize) */
  maxRows?: number;
  /** Resize behavior @default 'vertical' */
  resize?: TextAreaResize;
  /** Maximum character length */
  maxLength?: number;
  /** Whether to show character count */
  showCount?: boolean;
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** Whether the textarea is read-only */
  readOnly?: boolean;
  /** Whether the textarea is invalid */
  isInvalid?: boolean;
  /** Whether the textarea is required */
  required?: boolean;
  /** Whether the textarea should take full width */
  fullWidth?: boolean;
  /** Label text */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** TextArea name (for forms) */
  name?: string;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Focus handler */
  onFocus?: () => void;
  /** Blur handler */
  onBlur?: () => void;
  /** Test ID for testing */
  testID?: string;
}
