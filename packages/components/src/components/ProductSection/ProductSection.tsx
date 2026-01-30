/**
 * ProductSection Component
 *
 * Enterprise section component for displaying products in carousel or grid layout.
 * Used by SDUI to render product sections dynamically.
 */

import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Text, Icon, useTheme } from '@groxigo/ui-elements';
import { useDeviceType } from '@groxigo/ui-core';
import { ProductTile } from '../ProductTile';
import { SectionHeader } from '../SectionHeader';
import type { ProductSectionProps, ProductSectionItem } from './ProductSection.types';

/**
 * ProductSection - Displays products in a carousel or grid layout
 */
export const ProductSection = ({
  title,
  titleVariant,
  items,
  displayType = 'carousel',
  showSeeAll = false,
  seeAllText,
  totalCount,
  onSeeAllPress,
  onProductPress,
  onAddToCart,
  onIncrement,
  onDecrement,
  onFavoriteToggle,
  favorites = {},
  getItemQuantity = () => 0,
  showFavorite = true,
  showAddButton = true,
  tileSize = 'md',
  columns = 2,
  gap,
  style,
  testID,
}: ProductSectionProps) => {
  const theme = useTheme();
  const { uiSize, spacing, fontSize } = useDeviceType();

  // Default gap - scales on tablets
  const gapValue = gap ?? uiSize(12);

  // Generate "See all" text
  const seeAllDisplayText = seeAllText || 'See all';
  // Show button if onSeeAllPress is provided (regardless of showSeeAll flag)
  const shouldShowSeeAllButton = !!onSeeAllPress;

  // Calculate discount percent from prices
  const getDiscountPercent = (item: ProductSectionItem): number | undefined => {
    if (item.discountPercent) return item.discountPercent;
    const price = item.dealPrice || item.price;
    if (item.compareAtPrice && item.compareAtPrice > price) {
      return Math.round(((item.compareAtPrice - price) / item.compareAtPrice) * 100);
    }
    return undefined;
  };

  // Render a single product tile
  const renderProductTile = (item: ProductSectionItem) => {
    const quantity = getItemQuantity(item.id);
    const discountPercent = getDiscountPercent(item);

    return (
      <ProductTile
        key={item.id}
        id={item.id}
        name={item.name}
        imageUrl={item.imageUrl}
        price={item.dealPrice || item.price}
        originalPrice={item.compareAtPrice}
        discountPercent={discountPercent}
        weight={item.unitSize || item.unit}
        rating={item.rating}
        reviewCount={item.reviewCount}
        badge={item.badge}
        badgeVariant={item.badgeVariant}
        outOfStock={item.inStock === false}
        showAddButton={showAddButton}
        quantity={quantity}
        onAddPress={() => onAddToCart?.(item)}
        onIncrement={() => onIncrement?.(item.id)}
        onDecrement={() => onDecrement?.(item.id)}
        showFavorite={showFavorite}
        isFavorite={favorites[item.id]}
        onFavoritePress={() => onFavoriteToggle?.(item.id)}
        size={tileSize}
        onPress={() => onProductPress?.(item.id)}
      />
    );
  };

  // Render "See all X items →" button
  const renderSeeAllButton = () => {
    if (!shouldShowSeeAllButton) return null;

    return (
      <Pressable
        style={[
          styles.seeAllButton,
          { marginTop: uiSize(12), paddingHorizontal: spacing(16) },
        ]}
        onPress={onSeeAllPress}
      >
        <Text
          style={{
            color: theme.colors.primary,
            fontSize: fontSize(14),
            fontWeight: '500',
          }}
        >
          {seeAllDisplayText}
        </Text>
        <Icon
          name="chevron-right"
          size="sm"
          color={theme.colors.primary}
        />
      </Pressable>
    );
  };

  // Grid layout
  if (displayType === 'grid') {
    return (
      <View style={[styles.container, { marginBottom: uiSize(16) }, style]} testID={testID}>
        {title && (
          <SectionHeader
            title={title}
            titleVariant={titleVariant}
            showSeeAll={false}
          />
        )}
        <View
          style={[
            styles.grid,
            {
              paddingHorizontal: spacing(16),
              gap: gapValue,
            },
          ]}
        >
          {items.map(renderProductTile)}
        </View>
        {renderSeeAllButton()}
      </View>
    );
  }

  // Carousel layout (default)
  return (
    <View style={[styles.container, { marginBottom: uiSize(16) }, style]} testID={testID}>
      {title && (
        <SectionHeader
          title={title}
          titleVariant={titleVariant}
          showSeeAll={false}
        />
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.carouselContent,
          {
            paddingHorizontal: spacing(16),
            gap: gapValue,
          },
        ]}
      >
        {items.map(renderProductTile)}
      </ScrollView>
      {renderSeeAllButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  carouselContent: {
    flexDirection: 'row',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
});

export default ProductSection;
