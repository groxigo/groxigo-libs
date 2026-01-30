import { useState } from 'react';
import { View, Pressable, StyleSheet, Platform } from 'react-native';
import { Text, Icon, Image, useTheme } from '@groxigo/ui-elements';
import { useDeviceType } from '@groxigo/ui-core';
import { tokens } from '@groxigo/tokens/react-native';
import { PriceDisplay } from '../PriceDisplay';
import { Rating } from '../Rating';
import type { ProductTileProps } from './ProductTile.types';

// Base size configurations (phone) - scales up on tablets
const BASE_SIZE_CONFIG = {
  sm: { width: 80 },
  md: { width: 130 },
  lg: { width: 150 },
};

/**
 * ProductTile component
 *
 * A flexible product display for deals, trending, and compact listings.
 * Matches modern grocery app design patterns (Blinkit-style).
 */
export const ProductTile = ({
  id,
  name,
  imageUrl,
  price,
  originalPrice,
  discountPercent,
  discountText,
  weight,
  brand,
  badge,
  badgeVariant = 'primary',
  rating,
  reviewCount,
  timerText,
  outOfStock = false,
  showAddButton = false,
  addButtonText = 'ADD',
  optionsText,
  quantity = 0,
  onAddPress,
  onIncrement,
  onDecrement,
  showFavorite = false,
  isFavorite = false,
  onFavoritePress,
  size = 'md',
  width,
  onPress,
  style,
  testID,
}: ProductTileProps) => {
  const theme = useTheme();
  const { spacing, fontSize, uiSize } = useDeviceType();
  const [imageError, setImageError] = useState(false);

  // Apply responsive scaling to tile dimensions
  const baseConfig = BASE_SIZE_CONFIG[size];
  const scaledWidth = uiSize(baseConfig.width);
  const tileWidth = width ?? scaledWidth;
  // 1:1 ratio - image height equals width
  const imageSize = tileWidth;

  // Badge colors
  const badgeColors = {
    primary: theme.colors.primary,
    success: theme.colors.success,
    warning: theme.colors.warning,
    error: theme.colors.error,
  };

  // Calculate discount display
  const displayDiscountText = discountText ?? (discountPercent ? `${discountPercent}% OFF` : null);

  // Shadow style
  const shadowStyle = Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
    },
    android: {
      elevation: 2,
    },
  });

  const content = (
    <View
      style={[
        styles.container,
        shadowStyle,
        {
          width: tileWidth,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.lg,
        },
        outOfStock && styles.outOfStock,
        style,
      ]}
      testID={testID}
    >
      {/* Image Section - uses layout.imageBg for easy config when transparent images are ready */}
      <View style={[
        styles.imageSection,
        {
          backgroundColor: tokens.colors.semantic.layout.imageBg,
          borderTopLeftRadius: theme.radius.lg,
          borderTopRightRadius: theme.radius.lg,
        }
      ]}>
        {/* Custom Badge (top-left) */}
        {badge && !outOfStock && (
          <View
            style={[
              styles.badge,
              {
                backgroundColor: badgeColors[badgeVariant],
                paddingHorizontal: uiSize(6),
                paddingVertical: uiSize(2),
                borderRadius: uiSize(4),
              },
            ]}
          >
            <Text
              variant="caption"
              weight="bold"
              style={{ color: '#FFFFFF', fontSize: fontSize(9) }}
            >
              {badge}
            </Text>
          </View>
        )}

        {/* Favorite Icon (top-right) */}
        {showFavorite && (
          <Pressable
            style={[styles.favoriteButton, { top: uiSize(4), right: uiSize(4) }]}
            onPress={onFavoritePress}
            hitSlop={8}
          >
            <Icon
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={uiSize(18)}
              color={isFavorite ? theme.colors.error : theme.colors.textTertiary}
            />
          </Pressable>
        )}

        {/* Product Image - 1:1 ratio, edge to edge */}
        <View style={[styles.imageContainer, { backgroundColor: 'transparent' }]}>
          {imageUrl && !imageError ? (
            <Image
              source={{ uri: imageUrl }}
              width={imageSize}
              height={imageSize}
              borderTopLeftRadius={theme.radius.lg}
              borderTopRightRadius={theme.radius.lg}
              resizeMode="cover"
              backgroundColor={tokens.colors.semantic.layout.imageBg}
              onError={() => setImageError(true)}
              style={outOfStock ? { opacity: 0.5 } : undefined}
            />
          ) : (
            <View
              style={[
                styles.imagePlaceholder,
                {
                  width: imageSize,
                  height: imageSize,
                  borderTopLeftRadius: theme.radius.lg,
                  borderTopRightRadius: theme.radius.lg,
                  backgroundColor: theme.colors.surfaceSecondary,
                },
              ]}
            >
              <Icon name="image" size="xl" color={theme.colors.textTertiary} />
            </View>
          )}
        </View>

        {/* ADD Button / Quantity Stepper (bottom-right of image) */}
        {showAddButton && !outOfStock && (
          <View style={[styles.addButtonContainer, { bottom: uiSize(6), right: uiSize(6) }]}>
            {quantity > 0 ? (
              // Quantity Stepper
              <View
                style={[
                  styles.quantityStepper,
                  {
                    backgroundColor: theme.colors.primary,
                    borderRadius: uiSize(8),
                    paddingHorizontal: uiSize(4),
                    paddingVertical: uiSize(4),
                    gap: uiSize(4),
                  },
                ]}
              >
                <Pressable
                  onPress={onDecrement}
                  hitSlop={12}
                  style={[styles.stepperButton, { padding: uiSize(4) }]}
                >
                  <Icon name="remove" size={uiSize(14)} color={theme.colors.textInverse} />
                </Pressable>
                <Text
                  weight="semibold"
                  style={{
                    color: theme.colors.textInverse,
                    fontSize: fontSize(12),
                    minWidth: uiSize(20),
                    textAlign: 'center',
                  }}
                >
                  {quantity}
                </Text>
                <Pressable
                  onPress={onIncrement}
                  hitSlop={12}
                  style={[styles.stepperButton, { padding: uiSize(4) }]}
                >
                  <Icon name="add" size={uiSize(14)} color={theme.colors.textInverse} />
                </Pressable>
              </View>
            ) : (
              // ADD Button (+ icon)
              <Pressable
                style={[
                  styles.addButton,
                  {
                    backgroundColor: theme.colors.primary,
                    borderRadius: uiSize(6),
                    width: uiSize(28),
                    height: uiSize(28),
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
                onPress={onAddPress}
              >
                <Icon name="add" size={uiSize(16)} color={theme.colors.textInverse} />
              </Pressable>
            )}
          </View>
        )}

        {/* Out of Stock Overlay */}
        {outOfStock && (
          <View style={[styles.outOfStockOverlay, { borderTopLeftRadius: theme.radius.lg, borderTopRightRadius: theme.radius.lg }]}>
            <Text
              weight="semibold"
              style={{
                color: theme.colors.textSecondary,
                fontSize: fontSize(10),
              }}
            >
              Out of Stock
            </Text>
          </View>
        )}
      </View>

      {/* Info Section - fixed height for consistent card heights */}
      <View
        style={[
          styles.infoSection,
          {
            paddingHorizontal: uiSize(8),
            paddingBottom: uiSize(8),
            paddingTop: uiSize(6),
            // Shorter height when no price (category mode)
            height: price !== undefined ? uiSize(135) : uiSize(55),
          },
        ]}
      >
        {/* Weight/Size - shown prominently (only for products with price) */}
        {weight && price !== undefined && (
          <View style={[styles.weightBadge, { paddingHorizontal: uiSize(4), paddingVertical: uiSize(1), borderRadius: uiSize(2) }]}>
            <Text
              variant="caption"
              weight="medium"
              style={{
                color: theme.colors.textSecondary,
                fontSize: fontSize(10),
              }}
            >
              {weight}
            </Text>
          </View>
        )}

        {/* Product Name - 2 lines max with ellipsis */}
        <Text
          variant="h6"
          numberOfLines={2}
          style={{
            color: theme.colors.text,
            fontSize: fontSize(12),
            lineHeight: fontSize(15),
            height: fontSize(15) * 2,
            marginTop: price !== undefined ? uiSize(4) : 0,
            textAlign: price === undefined ? 'center' : 'left',
          }}
        >
          {name}
        </Text>

        {/* Rating - compact with reviews on right (only for products) */}
        {price !== undefined && (
          <View style={[styles.ratingRow, { marginTop: uiSize(4) }]}>
            <Rating value={rating ?? 0} size="xs" />
            {reviewCount !== undefined && reviewCount > 0 && (
              <Text
                variant="caption"
                style={{ color: theme.colors.textSecondary, fontSize: fontSize(9), marginLeft: 'auto' }}
              >
                {reviewCount.toLocaleString()}
              </Text>
            )}
          </View>
        )}

        {/* Discount Text - only shown when discount exists */}
        {price !== undefined && discountPercent != null && discountPercent > 0 && !outOfStock && (
          <Text
            variant="caption"
            weight="semibold"
            style={{
              color: '#2E7D32',
              fontSize: fontSize(10),
              marginTop: uiSize(2),
              lineHeight: fontSize(12),
            }}
          >
            {discountPercent}% OFF
          </Text>
        )}

        {/* Price Row - only shown when price exists */}
        {price !== undefined && (
          <View style={[styles.priceRow]}>
            <Text
              weight="bold"
              style={{ color: theme.colors.text, fontSize: fontSize(13) }}
            >
              ${price.toFixed(2)}
            </Text>
            {originalPrice != null && originalPrice > price && (
              <Text
                variant="caption"
                style={{
                  color: theme.colors.textTertiary,
                  fontSize: fontSize(10),
                  marginLeft: uiSize(4),
                  textDecorationLine: 'line-through',
                }}
              >
                ${originalPrice.toFixed(2)}
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
  },
  outOfStock: {
    opacity: 0.7,
  },
  imageSection: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    zIndex: 2,
  },
  favoriteButton: {
    position: 'absolute',
    zIndex: 2,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonContainer: {
    position: 'absolute',
    zIndex: 3,
  },
  addButton: {},
  quantityStepper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperButton: {
    padding: 3,
  },
  outOfStockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {},
  weightBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F5F5',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
});

export default ProductTile;
