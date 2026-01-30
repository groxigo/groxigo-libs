/**
 * FormField Component (Web)
 *
 * Complete form field with label, input, error handling, and helper text.
 * Uses Input from @groxigo/ui-elements-web.
 * Implements @groxigo/contracts FormFieldPropsBase.
 */

import React, { forwardRef } from 'react';
import { Input, cn, type InputProps } from '@groxigo/ui-elements-web';

export interface FormFieldProps extends InputProps {
  /** Field label (required for FormField) */
  label: string;
  /** Error message to display */
  error?: string;
  /** Helper text to display below input */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Additional container class */
  containerClassName?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      error,
      helperText,
      required = false,
      containerClassName,
      variant = 'outline',
      className,
      ...inputProps
    },
    ref
  ) => {
    const displayLabel = required ? `${label} *` : label;
    const displayError = error || undefined;
    const displayHelperText = !error && helperText ? helperText : undefined;

    return (
      <div className={cn('w-full', containerClassName)}>
        <Input
          ref={ref}
          {...inputProps}
          label={label}
          required={required}
          variant={variant}
          error={displayError}
          helperText={displayHelperText}
          className={className}
        />
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
