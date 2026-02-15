import { useState } from 'react';
import { Pressable, View, Image, StyleSheet } from 'react-native';
import { Card, Text, Button, Badge, Icon, useTheme } from '@groxigo/ui-elements';
import { tokens } from '@groxigo/tokens/react-native';
import { QuantitySelector } from '../QuantitySelector';
import { Rating } from '../Rating';
import type { ProductCardProps } from './ProductCard.types';

/**
 * ProductCard component
 *
 * Displays product information with image, title, description, price, and action button.
 * Uses theme colors for consistent styling across platforms.
 *
 * Supports both new contract-based props and deprecated legacy props for backward compatibility.
 */
export const ProductCard = ({
  // New contract-based props
  id,
  name,
  imageUrl,
  imageVariants,
  price,
  originalPrice,
  unit,
  weight,
  discountPercent,
  outOfStock,
  size,
  variant,
  badge,
  category,
  rating,
  reviewCount,
  recipeCount,
  isFavorite,
  quantity,
  onPress,
  onAddToCart,
  onQuantityChange,
  onToggleFavorite,
  renderRecipeLink,
  testID,

  // Deprecated props (backward compatibility)
  title,
  image,
  compareAtPrice,
  onAction,
  onFavorite,

  // RN-specific props
  description,
  badgeVariant = 'primary',
  actionLabel,
  style,
  imageStyle,
  cardVariant = 'elevated',
  padding = 'md',
  section,
  minQuantity = 1,
  maxQuantity,
  ...cardProps
}: ProductCardProps) => {
  const theme = useTheme();
  const [imageError, setImageError] = useState(false);

  // Resolve props with backward compatibility
  const displayName = name ?? title ?? '';
  const displayImageUrl = imageUrl ?? (typeof image === 'object' && image !== null && 'uri' in image ? (image as { uri: string }).uri : undefined);
  const displayImageSource = imageUrl
    ? { uri: imageUrl }
    : image ?? undefined;
  const displayOriginalPrice = originalPrice ?? (typeof compareAtPrice === 'number' ? compareAtPrice : undefined);
  const handleAddToCart = onAddToCart ?? onAction;
  const handleToggleFavorite = onToggleFavorite ?? (onFavorite ? () => onFavorite(!isFavorite) : undefined);

  const formatPrice = (priceValue: string | number | undefined): string => {
    if (priceValue === undefined || priceValue === null) return '';
    if (typeof priceValue === 'number') {
      return `$${priceValue.toFixed(2)}`;
    }
    return priceValue;
  };

  const calculateDiscount = (): number | null => {
    // Use explicit discountPercent if provided
    if (discountPercent !== undefined && discountPercent > 0) {
      return discountPercent;
    }

    // Calculate from originalPrice/compareAtPrice
    const comparePrice = displayOriginalPrice;
    if (!comparePrice || !price) return null;

    const currentPrice = typeof price === 'number'
      ? price
      : parseFloat(String(price).replace(/[^0-9.-]/g, ''));

    if (isNaN(currentPrice)) return null;

    if (comparePrice > currentPrice && comparePrice > 0 && currentPrice > 0) {
      const discount = Math.round(((comparePrice - currentPrice) / comparePrice) * 100);
      return discount > 0 ? discount : null;
    }

    return null;
  };

  const discountPercentage = calculateDiscount();
  const discountText = discountPercentage !== null && discountPercentage > 0
    ? `${discountPercentage}% OFF`
    : null;

  const handleFavoritePress = () => {
    if (handleToggleFavorite) {
      handleToggleFavorite();
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const hasImage = displayImageSource && !imageError;

  const content = (
    <Card variant={cardVariant} padding="none" {...cardProps}>
      <View style={styles.imageContainer}>
        {hasImage ? (
          <Image
            source={displayImageSource!}
            style={[styles.image, imageStyle, outOfStock && styles.outOfStockImage]}
            onError={handleImageError}
            fadeDuration={0}
            resizeMethod="resize"
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.imagePlaceholder,
              { backgroundColor: theme.colors.surfaceSecondary },
              imageStyle,
            ]}
          >
            <Icon
              name="image"
              size="lg"
              color={theme.colors.textTertiary}
            />
          </View>
        )}
        {outOfStock && (
          <View
            style={[
              styles.outOfStockOverlay,
              { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
            ]}
          >
            <Text
              variant="caption"
              weight="bold"
              style={{ color: tokens.colors.primitives.white }}
            >
              Out of Stock
            </Text>
          </View>
        )}
        {discountText && !outOfStock && (
          <View
            style={[
              styles.discountBadge,
              {
                backgroundColor: theme.colors.warning,
                paddingHorizontal: theme.spacing[2],
                paddingVertical: theme.spacing[1],
              },
            ]}
          >
            <Text
              variant="caption"
              weight="bold"
              style={styles.discountText}
            >
              {discountText}
            </Text>
          </View>
        )}
        {handleToggleFavorite !== undefined && (
          <Pressable
            onPress={handleFavoritePress}
            style={({ pressed }) => [
              styles.favoriteButton,
              {
                top: theme.spacing[1],
                right: theme.spacing[1],
              },
              pressed && { opacity: 0.8 },
            ]}
            accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            accessibilityRole="button"
          >
            <Icon
              name={isFavorite ? 'heart-fill' : 'heart'}
              size="md"
              color={isFavorite ? theme.colors.error : tokens.colors.primitives.white}
            />
          </Pressable>
        )}
        {badge && (
          <View style={[
            styles.badge,
            {
              top: handleToggleFavorite !== undefined ? 48 : theme.spacing[2],
              right: theme.spacing[2],
            }
          ]}>
            <Badge variant="solid" colorScheme="primary" size="sm">
              {badge}
            </Badge>
          </View>
        )}
        {onQuantityChange && !outOfStock && (
          <View style={[
            styles.quantityContainer,
            {
              bottom: theme.spacing[2],
              right: theme.spacing[2],
            }
          ]}>
            {(quantity !== undefined && quantity > 0) ? (
              <QuantitySelector
                value={quantity}
                onChange={onQuantityChange}
                min={minQuantity}
                max={maxQuantity}
              />
            ) : (
              <Pressable
                onPress={() => onQuantityChange(minQuantity)}
                style={({ pressed }) => [
                  styles.addButton,
                  {
                    backgroundColor: theme.colors.primary,
                    borderRadius: theme.radius.md,
                    paddingHorizontal: theme.spacing[3],
                    paddingVertical: theme.spacing[1],
                  },
                  pressed && { opacity: 0.8 },
                ]}
                accessibilityLabel="Add to cart"
                accessibilityRole="button"
              >
                <Text variant="h4" weight="bold" style={{ color: theme.colors.textInverse }}>+</Text>
              </Pressable>
            )}
          </View>
        )}
      </View>
      <View style={{ padding: theme.spacing[2] }}>
        <View style={{ marginBottom: theme.spacing[1] }}>
          <Text variant="bodySmall" numberOfLines={2}>
            {displayName}
          </Text>
        </View>
        {description && (
          <Text
            variant="caption"
            style={{ marginBottom: theme.spacing[1], color: theme.colors.textSecondary }}
            numberOfLines={1}
          >
            {description}
          </Text>
        )}
        {/* Weight */}
        {weight && (
          <Text
            variant="caption"
            style={{ color: theme.colors.textSecondary, marginBottom: theme.spacing[1] }}
          >
            {weight}
          </Text>
        )}
        {/* Price Row */}
        {price !== undefined && (
          <View style={styles.priceRow}>
            <Text variant="bodySmall" weight="semibold">
              {formatPrice(price)}
            </Text>
            {unit && (
              <Text variant="caption" style={{ color: theme.colors.textSecondary }}>
                {' '}/{unit}
              </Text>
            )}
          </View>
        )}
        {displayOriginalPrice !== undefined && displayOriginalPrice > (typeof price === 'number' ? price : 0) && (
          <Text
            variant="caption"
            style={{
              color: theme.colors.textTertiary,
              textDecorationLine: 'line-through',
            }}
          >
            {formatPrice(displayOriginalPrice)}
          </Text>
        )}
        {/* Rating */}
        {rating !== undefined && rating > 0 && (
          <View style={[styles.ratingRow, { marginTop: theme.spacing[1] }]}>
            <Rating
              value={rating}
              size="sm"
              showValue={false}
            />
            {reviewCount !== undefined && reviewCount > 0 && (
              <Text variant="caption" style={{ color: theme.colors.textSecondary, marginLeft: theme.spacing[1] }}>
                ({reviewCount})
              </Text>
            )}
          </View>
        )}
        {/* Recipe Link */}
        {recipeCount !== undefined && recipeCount > 0 && renderRecipeLink && (
          <View style={{ marginTop: theme.spacing[1] }}>
            {renderRecipeLink(recipeCount)}
          </View>
        )}
        {actionLabel && handleAddToCart && !outOfStock && (
          <Button variant="solid" size="sm" onPress={handleAddToCart}>
            {actionLabel}
          </Button>
        )}
      </View>
    </Card>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={style} testID={testID}>
        {content}
      </Pressable>
    );
  }

  return <View style={style} testID={testID}>{content}</View>;
};

ProductCard.displayName = 'ProductCard';

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outOfStockImage: {
    opacity: 0.5,
  },
  outOfStockOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 8,
    alignItems: 'center',
  },
  discountBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  discountText: {
    color: tokens.colors.primitives.black,
    fontSize: 9,
    lineHeight: 12,
  },
  favoriteButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  badge: {
    position: 'absolute',
    zIndex: 2,
  },
  quantityContainer: {
    position: 'absolute',
    zIndex: 2,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ProductCard;
