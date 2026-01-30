/**
 * Form.FormField Component (Web)
 *
 * A form field that automatically connects to the parent Form context.
 * Handles value updates, validation errors, and touched state.
 *
 * @example
 * ```tsx
 * <Form initialValues={{ email: '' }} onSubmit={handleSubmit}>
 *   <Form.Field name="email" label="Email" type="email" required />
 * </Form>
 * ```
 */

import React, { useCallback, type ReactNode } from 'react';
import { Input, cn } from '@groxigo/ui-elements-web';
import { useFormContext } from './Form.context';

export interface FormInputProps {
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
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';

  /**
   * Additional style for the field container
   */
  className?: string;

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
  }) => ReactNode;

  /**
   * Test ID for testing
   */
  testID?: string;
}

export function FormInput({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  type = 'text',
  className,
  render,
  testID,
}: FormInputProps) {
  const { values, errors, touched, setFieldValue, setFieldTouched } = useFormContext();

  const value = values[name] ?? '';
  const error = errors[name];
  const isTouched = touched[name] ?? false;
  const showError = isTouched && !!error;

  const handleChange = useCallback((newValue: any) => {
    setFieldValue(name, newValue);
  }, [name, setFieldValue]);

  const handleBlur = useCallback(() => {
    setFieldTouched(name, true);
  }, [name, setFieldTouched]);

  // Use custom render function if provided
  if (render) {
    return (
      <div className={cn('w-full', className)}>
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            {label}
            {required && <span className="text-error ml-0.5">*</span>}
          </label>
        )}
        {render({
          value,
          onChange: handleChange,
          onBlur: handleBlur,
          error: showError ? error : undefined,
          touched: isTouched,
        })}
        {showError && (
          <p className="text-xs text-error mt-1" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  // Default text input rendering
  return (
    <div className={cn('w-full', className)}>
      <Input
        name={name}
        type={type}
        label={label}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        value={String(value)}
        onChangeText={handleChange}
        onBlur={handleBlur}
        error={showError ? error : undefined}
        autoComplete={type === 'email' ? 'email' : type === 'password' ? 'current-password' : 'off'}
        testID={testID}
        fullWidth
      />
    </div>
  );
}

export default FormInput;
