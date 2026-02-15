import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from '@groxigo/ui-elements';
import type { PriceDisplayProps } from './PriceDisplay.types';

/**
 * PriceDisplay component
 *
 * Displays formatted price with currency and optional discount.
 * Uses theme colors for consistent styling across platforms.
 */
export const PriceDisplay = ({
  price,
  currency = 'USD',
  originalPrice,
  size = 'md',
  showCurrency = true,
  style,
  containerStyle,
  ...props
}: PriceDisplayProps) => {
  const theme = useTheme();

  const formatPrice = (value: number | string): string => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return '0.00';
    return numValue.toFixed(2);
  };

  const getCurrencySymbol = (code: string): string => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      INR: '₹',
      JPY: '¥',
    };
    return symbols[code] || code;
  };

  const currencySymbol = getCurrencySymbol(currency);
  const formattedPrice = formatPrice(price);
  const formattedOriginalPrice = originalPrice ? formatPrice(originalPrice) : null;

  const sizeVariants = {
    sm: 'bodySmall' as const,
    md: 'body' as const,
    lg: 'h4' as const,
    xl: 'h3' as const,
  };

  const variant = sizeVariants[size];
  const hasDiscount = originalPrice && parseFloat(String(originalPrice)) > parseFloat(String(price));

  return (
    <View
      style={[
        styles.container,
        { gap: theme.spacing[2] },
        containerStyle,
      ]}
      {...props}
    >
      {hasDiscount && formattedOriginalPrice && (
        <Text
          variant={variant}
          style={[
            styles.strikethrough,
            { color: theme.colors.textTertiary },
            style,
          ]}
        >
          {showCurrency && currencySymbol}
          {formattedOriginalPrice}
        </Text>
      )}
      <Text
        variant={variant}
        style={[
          styles.price,
          { color: hasDiscount ? theme.colors.error : theme.colors.text },
          style,
        ]}
      >
        {showCurrency && currencySymbol}
        {formattedPrice}
      </Text>
    </View>
  );
};

PriceDisplay.displayName = 'PriceDisplay';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  price: {
    fontWeight: '600',
  },
});

export default PriceDisplay;
