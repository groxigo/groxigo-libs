import { useCallback } from 'react';
import { View, TextInput, type KeyboardTypeOptions } from 'react-native';
import { Text, useTheme } from '@groxigo/ui-elements';
import { useFormContext } from './Form.context';
import type { FormFieldProps } from './Form.types';

/**
 * Get keyboard type based on field type
 */
function getKeyboardType(type: FormFieldProps['type']): KeyboardTypeOptions {
  switch (type) {
    case 'email':
      return 'email-address';
    case 'number':
      return 'numeric';
    case 'phone':
      return 'phone-pad';
    default:
      return 'default';
  }
}

/**
 * FormField component
 *
 * A form field that automatically connects to the parent Form context.
 * Handles value updates, validation errors, and touched state.
 *
 * @example
 * ```tsx
 * <Form initialValues={{ email: '' }} onSubmit={handleSubmit}>
 *   <FormField name="email" label="Email" type="email" required />
 * </Form>
 * ```
 */
export function FormField({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  type = 'text',
  style,
  render,
}: FormFieldProps) {
  const theme = useTheme();
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
      <View style={style}>
        {label && (
          <Text
            variant="body"
            style={{
              marginBottom: theme.spacing[1],
              color: theme.colors.text,
            }}
          >
            {label}
            {required && <Text style={{ color: theme.colors.error }}> *</Text>}
          </Text>
        )}
        {render({
          value,
          onChange: handleChange,
          onBlur: handleBlur,
          error: showError ? error : undefined,
          touched: isTouched,
        })}
        {showError && (
          <Text
            variant="caption"
            style={{
              marginTop: theme.spacing[1],
              color: theme.colors.error,
            }}
          >
            {error}
          </Text>
        )}
      </View>
    );
  }

  // Default text input rendering
  return (
    <View style={style}>
      {label && (
        <Text
          variant="body"
          style={{
            marginBottom: theme.spacing[1],
            color: theme.colors.text,
          }}
        >
          {label}
          {required && <Text style={{ color: theme.colors.error }}> *</Text>}
        </Text>
      )}
      <TextInput
        value={String(value)}
        onChangeText={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textTertiary}
        editable={!disabled}
        secureTextEntry={type === 'password'}
        keyboardType={getKeyboardType(type)}
        autoCapitalize={type === 'email' ? 'none' : 'sentences'}
        autoComplete={type === 'email' ? 'email' : type === 'password' ? 'password' : 'off'}
        style={{
          height: 48,
          paddingHorizontal: theme.spacing[3],
          borderWidth: 1,
          borderColor: showError ? theme.colors.error : theme.colors.border,
          borderRadius: theme.radius.md,
          backgroundColor: disabled ? theme.colors.surfaceSecondary : theme.colors.surface,
          color: disabled ? theme.colors.textTertiary : theme.colors.text,
          fontSize: theme.typography.fontSize.md,
        }}
      />
      {showError && (
        <Text
          variant="caption"
          style={{
            marginTop: theme.spacing[1],
            color: theme.colors.error,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

FormField.displayName = 'FormField';

export default FormField;
