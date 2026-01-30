/**
 * Form Component (Web)
 *
 * Form container with validation and state management.
 * Provides form context to child components for accessing and updating form state.
 *
 * @example
 * ```tsx
 * <Form
 *   initialValues={{ email: '', password: '' }}
 *   onSubmit={async (values) => {
 *     await loginUser(values);
 *   }}
 *   validate={(values) => {
 *     const errors: Record<string, string> = {};
 *     if (!values.email) errors.email = 'Email is required';
 *     if (!values.password) errors.password = 'Password is required';
 *     return errors;
 *   }}
 * >
 *   <FormField name="email" label="Email" type="email" />
 *   <FormField name="password" label="Password" type="password" />
 *   <SubmitButton />
 * </Form>
 * ```
 */

import React, { useState, useCallback, useMemo, type ReactNode } from 'react';
import { cn } from '@groxigo/ui-elements-web';
import { FormContext, type FormContextValue } from './Form.context';

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
  children: ReactNode;

  /**
   * Additional CSS class
   */
  className?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}

export function Form<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
  validateOnChange = false,
  validateOnBlur = true,
  children,
  className,
  testID,
}: FormProps<T>) {
  // Form state
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Run validation and return errors
  const runValidation = useCallback((valuesToValidate: T): Record<string, string> => {
    if (!validate) return {};
    const validationResult = validate(valuesToValidate);
    return validationResult || {};
  }, [validate]);

  // Set a field's value
  const setFieldValue = useCallback((name: string, value: any) => {
    setValues(prev => {
      const newValues = { ...prev, [name]: value } as T;

      // Validate on change if enabled
      if (validateOnChange) {
        const newErrors = runValidation(newValues);
        setErrors(newErrors);
      } else {
        // Clear error for this field when value changes
        setErrors(prev => {
          if (prev[name]) {
            const { [name]: _, ...rest } = prev;
            return rest;
          }
          return prev;
        });
      }

      return newValues;
    });
  }, [validateOnChange, runValidation]);

  // Set a field's error
  const setFieldError = useCallback((name: string, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  // Mark a field as touched
  const setFieldTouched = useCallback((name: string, isTouched = true) => {
    setTouched(prev => {
      if (prev[name] === isTouched) return prev;
      return { ...prev, [name]: isTouched };
    });

    // Validate on blur if enabled
    if (isTouched && validateOnBlur) {
      setValues(currentValues => {
        const newErrors = runValidation(currentValues);
        setErrors(newErrors);
        return currentValues;
      });
    }
  }, [validateOnBlur, runValidation]);

  // Submit handler
  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // Run validation
    const validationErrors = runValidation(values);
    setErrors(validationErrors);

    // Check for errors
    const hasErrors = Object.keys(validationErrors).length > 0;
    if (hasErrors) {
      return;
    }

    // Submit
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, runValidation, onSubmit, isSubmitting]);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Handle native form submission
  const handleFormSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  }, [handleSubmit]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<FormContextValue<T>>(() => ({
    values,
    errors,
    touched,
    isSubmitting,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    handleSubmit,
    resetForm,
  }), [values, errors, touched, isSubmitting, setFieldValue, setFieldError, setFieldTouched, handleSubmit, resetForm]);

  return (
    <FormContext.Provider value={contextValue as FormContextValue}>
      <form
        onSubmit={handleFormSubmit}
        className={cn('flex flex-col gap-4', className)}
        data-testid={testID}
        noValidate
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

export default Form;
