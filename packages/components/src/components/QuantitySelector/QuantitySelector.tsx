import { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text, useTheme } from '@groxigo/ui-elements';
import type { QuantitySelectorProps } from './QuantitySelector.types';

/**
 * QuantitySelector component
 *
 * Compact inline quantity selector with increment/decrement buttons.
 * Uses theme colors for consistent styling across platforms.
 */
export const QuantitySelector = ({
  value = 1,
  onChange,
  min = 1,
  max,
  step = 1,
  disabled = false,
  style,
  ...props
}: QuantitySelectorProps) => {
  const theme = useTheme();
  const [internalValue, setInternalValue] = useState(value);

  const currentValue = value !== undefined ? value : internalValue;

  const handleDecrement = () => {
    if (disabled) return;
    const newValue = Math.max(0, currentValue - step);
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleIncrement = () => {
    if (disabled) return;
    const newValue = max ? Math.min(max, currentValue + step) : currentValue + step;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const isDecrementDisabled = disabled || currentValue <= 0;
  const isIncrementDisabled = disabled || (max !== undefined && currentValue >= max);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.primary,
          borderRadius: theme.radius.md,
        },
        style,
      ]}
      {...props}
    >
      <Pressable
        onPress={handleDecrement}
        disabled={isDecrementDisabled}
        style={({ pressed }) => [
          styles.button,
          {
            paddingHorizontal: theme.spacing[3],
            paddingVertical: theme.spacing[1],
            opacity: isDecrementDisabled ? 0.5 : pressed ? 0.8 : 1,
          },
        ]}
      >
        <Text variant="h4" style={{ color: theme.colors.textInverse, fontWeight: '700' }}>-</Text>
      </Pressable>
      <View
        style={[
          styles.valueContainer,
          {
            paddingHorizontal: theme.spacing[3],
            paddingVertical: theme.spacing[1],
          },
        ]}
      >
        <Text variant="h4" style={{ color: theme.colors.textInverse, fontWeight: '600' }}>
          {currentValue}
        </Text>
      </View>
      <Pressable
        onPress={handleIncrement}
        disabled={isIncrementDisabled}
        style={({ pressed }) => [
          styles.button,
          {
            paddingHorizontal: theme.spacing[3],
            paddingVertical: theme.spacing[1],
            opacity: isIncrementDisabled ? 0.5 : pressed ? 0.8 : 1,
          },
        ]}
      >
        <Text variant="h4" style={{ color: theme.colors.textInverse, fontWeight: '700' }}>+</Text>
      </Pressable>
    </View>
  );
};

QuantitySelector.displayName = 'QuantitySelector';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueContainer: {
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QuantitySelector;
