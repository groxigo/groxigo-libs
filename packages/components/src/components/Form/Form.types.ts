import { StyleProp, ViewStyle } from 'react-native';

/**
 * @deprecated Use FormProps with initialValues instead
 */
export interface FormFieldData {
  name: string;
  value: any;
  error?: string;
}

export interface FormProps<T extends Record<string, any> = Record<string, any>> {
  /**
   * Initial form values
   */
  initialValues: T;

  /**
   * Callback when form is submitted with validated values
   * Can be async for handling API calls
   */
  onSubmit: (values: T) => void | Promise<void>;

  /**
   * Optional validation function
   * Returns an object with field names as keys and error messages as values
   * Return empty object or undefined for valid form
   */
  validate?: (values: T) => Record<string, string> | undefined;

  /**
   * Run validation on every value change
   * @default false
   */
  validateOnChange?: boolean;

  /**
   * Run validation when a field is blurred
   * @default true
   */
  validateOnBlur?: boolean;

  /**
   * Children (form fields and submit button)
   */
  children: React.ReactNode;

  /**
   * Container style
   */
  style?: StyleProp<ViewStyle>;
}

export interface FormFieldProps {
  /**
   * Field name (must match a key in form's initialValues)
   */
  name: string;

  /**
   * Field label
   */
  label?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Whether field is required
   */
  required?: boolean;

  /**
   * Whether field is disabled
   */
  disabled?: boolean;

  /**
   * Input type (affects keyboard and validation)
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'phone';

  /**
   * Additional style for the field container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Custom render function for the input
   * Receives value, onChange, onBlur, and error
   */
  render?: (props: {
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
    error?: string;
    touched: boolean;
  }) => React.ReactNode;
}
