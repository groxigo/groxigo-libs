import { createContext, useContext } from 'react';

export interface FormContextValue<T extends Record<string, any> = Record<string, any>> {
  /**
   * Current form values
   */
  values: T;

  /**
   * Form validation errors keyed by field name
   */
  errors: Record<string, string>;

  /**
   * Fields that have been touched (blurred at least once)
   */
  touched: Record<string, boolean>;

  /**
   * Whether form is currently submitting
   */
  isSubmitting: boolean;

  /**
   * Set a field's value
   */
  setFieldValue: (name: string, value: any) => void;

  /**
   * Set a field's error
   */
  setFieldError: (name: string, error: string) => void;

  /**
   * Mark a field as touched
   */
  setFieldTouched: (name: string, touched?: boolean) => void;

  /**
   * Submit the form
   */
  handleSubmit: () => void;

  /**
   * Reset form to initial values
   */
  resetForm: () => void;
}

export const FormContext = createContext<FormContextValue | null>(null);

/**
 * Hook to access form context
 * Must be used within a Form component
 */
export function useFormContext<T extends Record<string, any> = Record<string, any>>(): FormContextValue<T> {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a Form component');
  }
  return context as FormContextValue<T>;
}
