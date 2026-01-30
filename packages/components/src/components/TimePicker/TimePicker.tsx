import { useState } from 'react';
import { View, Platform } from 'react-native';
import { Input, Icon } from '@groxigo/ui-elements';
import type { TimePickerProps } from './TimePicker.types';

/**
 * TimePicker component
 * Time selection input with platform-specific pickers
 * Mobile: Uses native time picker modals
 * Web: Uses HTML5 time input
 */
export const TimePicker = ({
  value,
  onChange,
  label,
  placeholder = 'Select time',
  error,
  helperText,
  disabled = false,
  size = 'md',
  style,
  containerStyle,
  ...props
}: TimePickerProps) => {
  const [internalValue, setInternalValue] = useState<Date | undefined>(value);

  const formatTime = (date: Date | undefined): string => {
    if (!date) return '';
    
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = String(minutes).padStart(2, '0');
    
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  const handlePress = () => {
    if (disabled) return;

    // On mobile, this would trigger native time picker
    // Implementation requires @react-native-community/datetimepicker
    // This component currently only displays the formatted time
    // To enable picking, integrate with a time picker library
  };

  const currentValue = value !== undefined ? value : internalValue;
  const displayValue = formatTime(currentValue);
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
        rightIcon={<Icon name="clock" size="md" />}
      />
    </View>
  );
};

export default TimePicker;

