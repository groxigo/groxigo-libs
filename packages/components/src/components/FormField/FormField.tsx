import { View } from 'react-native';
import { Input } from '@groxigo/ui-elements';
import type { FormFieldProps } from './FormField.types';

/**
 * FormField component
 *
 * Complete form field with label, input, error handling, and helper text.
 * Uses theme-driven Input component from ui-elements.
 */
export const FormField = ({
  label,
  error,
  helperText,
  required = false,
  containerStyle,
  variant = 'outline',
  ...inputProps
}: FormFieldProps) => {
  const displayLabel = required ? `${label} *` : label;
  const displayVariant = variant;
  const displayError = error || undefined;
  const displayHelperText = !error && helperText ? helperText : undefined;

  return (
    <View style={containerStyle}>
      <Input
        {...inputProps}
        label={displayLabel}
        variant={displayVariant}
        error={displayError}
        helperText={displayHelperText}
      />
    </View>
  );
};

export default FormField;
