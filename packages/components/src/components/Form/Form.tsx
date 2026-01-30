import { useState, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useTheme } from '@groxigo/ui-elements';
import { FormContext, type FormContextValue } from './Form.context';
import type { FormProps } from './Form.types';

/**
 * Form component
 *
 * Form container with validation and state management.
 * Provides form context to child components for accessing and updating form state.
 * Uses theme spacing for consistent layout across platforms.
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
export function Form<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
  validateOnChange = false,
  validateOnBlur = true,
  style,
  children,
}: FormProps<T>) {
  const theme = useTheme();

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
      <View style={[{ gap: theme.spacing[4] }, style]}>
        {children}
      </View>
    </FormContext.Provider>
  );
}

export default Form;
