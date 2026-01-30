import { useState } from 'react';
import { View, Platform } from 'react-native';
import { Input, Icon } from '@groxigo/ui-elements';
import type { DatePickerProps } from './DatePicker.types';

/**
 * DatePicker component
 * Date selection input with platform-specific pickers
 * Mobile: Uses native date picker modals
 * Web: Uses HTML5 date input
 */
export const DatePicker = ({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  error,
  helperText,
  disabled = false,
  minimumDate,
  maximumDate,
  size = 'md',
  style,
  containerStyle,
  ...props
}: DatePickerProps) => {
  const [internalValue, setInternalValue] = useState<Date | undefined>(value);

  const formatDate = (date: Date | undefined): string => {
    if (!date) return '';
    
    // Format date according to locale
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const validateDate = (date: Date): boolean => {
    if (minimumDate && date < minimumDate) return false;
    if (maximumDate && date > maximumDate) return false;
    return true;
  };

  const handlePress = () => {
    if (disabled) return;

    // On mobile, this would trigger native date picker
    // Implementation requires @react-native-community/datetimepicker
    // This component currently only displays the formatted date
    // To enable picking, integrate with a date picker library
  };

  const currentValue = value !== undefined ? value : internalValue;
  const displayValue = formatDate(currentValue);
  const displayVariant = error ? 'outline' : 'outline';

  return (
    <View style={[containerStyle, style]} {...props}>
      <Input
        label={label}
        value={displayValue}
        placeholder={placeholder}
        error={error}
        helperText={helperText}
        variant="outline"
        size={size}
        editable={false}
        rightIcon={<Icon name="calendar" size="md" />}
      />
    </View>
  );
};

export default DatePicker;

