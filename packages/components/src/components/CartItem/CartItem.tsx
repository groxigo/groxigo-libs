import { View, Image, Pressable, StyleSheet } from 'react-native';
import { Text, Icon, useTheme } from '@groxigo/ui-elements';
import { QuantitySelector } from '../QuantitySelector';
import { PriceDisplay } from '../PriceDisplay';
import type { CartItemProps } from './CartItem.types';

/**
 * CartItem component
 *
 * Shopping cart item with image, details, price, and quantity controls.
 * Uses theme colors for consistent styling across platforms.
 *
 * Supports both new contract-based props and deprecated legacy props for backward compatibility.
 */
export const CartItem = ({
  // Contract-based props
  id,
  imageUrl,
  title,
  description,
  price,
  currency = 'USD',
  quantity = 1,
  onQuantityChange,
  onRemove,
  disabled = false,
  section,
  testID,

  // Deprecated props (backward compatibility)
  image,

  // RN-specific props
  style,
  ...props
}: CartItemProps) => {
  const theme = useTheme();

  // Resolve props with backward compatibility
  const displayImageSource = imageUrl
    ? { uri: imageUrl }
    : image ?? undefined;

  return (
    <View
      style={[
        styles.container,
        {
          padding: theme.spacing[3],
          gap: theme.spacing[3],
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.md,
          borderWidth: 1,
          borderColor: theme.colors.border,
          ...(disabled && { opacity: 0.5 }),
        },
        style,
      ]}
      testID={testID}
      {...props}
    >
      {displayImageSource && (
        <Image
          source={displayImageSource}
          style={[
            styles.image,
            { borderRadius: theme.radius.md },
          ]}
        />
      )}
      <View style={[styles.content, { gap: theme.spacing[2] }]}>
        <View style={styles.header}>
          <View style={[styles.titleContainer, { gap: theme.spacing[1] }]}>
            <Text variant="body" weight="semibold">
              {title}
            </Text>
            {description && (
              <Text variant="caption" style={{ color: theme.colors.textSecondary }}>
                {description}
              </Text>
            )}
          </View>
          {onRemove && (
            <Pressable
              onPress={onRemove}
              disabled={disabled}
              style={({ pressed }) => [
                { padding: theme.spacing[1] },
                pressed && { opacity: 0.8 },
              ]}
              accessibilityLabel="Remove item"
              accessibilityRole="button"
            >
              <Icon name="x" size="sm" style={{ color: theme.colors.textTertiary }} />
            </Pressable>
          )}
        </View>
        <View style={styles.footer}>
          <PriceDisplay price={price} currency={currency} size="md" />
          {onQuantityChange && (
            <QuantitySelector
              value={quantity}
              onChange={onQuantityChange}
              min={1}
              size="sm"
              disabled={disabled}
              section={section}
            />
          )}
        </View>
      </View>
    </View>
  );
};

CartItem.displayName = 'CartItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CartItem;
