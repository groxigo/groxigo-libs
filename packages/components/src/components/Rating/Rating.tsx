import { View, Pressable, StyleSheet } from 'react-native';
import { Icon, Text, useTheme } from '@groxigo/ui-elements';
import { useDeviceType } from '@groxigo/ui-core';
import { useState } from 'react';
import type { RatingProps } from './Rating.types';

// Base star sizes in pixels
const BASE_STAR_SIZES = {
  xs: 10,
  sm: 14,
  md: 18,
  lg: 24,
};

/**
 * Rating component
 *
 * Star rating display and input component.
 * Uses theme colors for consistent styling across platforms.
 */
export const Rating = ({
  value,
  max = 5,
  editable = false,
  onChange,
  size = 'md',
  showValue = false,
  section,
  testID,
  style,
  ...props
}: RatingProps) => {
  const theme = useTheme();
  const { uiSize } = useDeviceType();
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [internalValue, setInternalValue] = useState(value);

  const currentValue = value !== undefined ? value : internalValue;
  const displayValue = hoverValue !== null ? hoverValue : currentValue;

  // Use warning color for stars (golden)
  const starColor = theme.colors.warning;

  // Apply responsive scaling to star size
  const baseSize = BASE_STAR_SIZES[size];
  const starSize = uiSize(baseSize);

  const handlePress = (index: number) => {
    if (!editable) return;
    const newValue = index + 1;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  // Tighter gap for smaller sizes, also responsive
  const starGap = uiSize(size === 'xs' ? 1 : size === 'sm' ? 2 : 4);

  return (
    <View
      style={[
        styles.container,
        { gap: starGap },
        style,
      ]}
      testID={testID}
      {...props}
    >
      {Array.from({ length: max }).map((_, index) => {
        const isFilled = index < displayValue;
        return (
          <Pressable
            key={index}
            onPress={() => handlePress(index)}
            disabled={!editable}
            style={({ pressed }) => [
              editable && pressed && { opacity: 0.8 },
            ]}
          >
            <Icon
              name={isFilled ? 'star-fill' : 'star'}
              size={starSize}
              style={{
                color: isFilled ? starColor : theme.colors.border,
              }}
            />
          </Pressable>
        );
      })}
      {showValue && (
        <Text
          variant="caption"
          style={{
            marginLeft: theme.spacing[2],
            color: theme.colors.textSecondary,
          }}
        >
          {currentValue.toFixed(1)}
        </Text>
      )}
    </View>
  );
};

Rating.displayName = 'Rating';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Rating;
