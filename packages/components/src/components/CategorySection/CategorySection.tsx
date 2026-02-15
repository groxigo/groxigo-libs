import { View, StyleSheet } from 'react-native';
import { useDeviceType } from '@groxigo/ui-core';
import { ProductTile } from '../ProductTile';
import { FluidGrid } from '../FluidGrid';
import { SectionHeader } from '../SectionHeader';
import type { CategorySectionProps } from './CategorySection.types';

/**
 * CategorySection component
 *
 * Displays a titled section with a fluid grid of category tiles.
 * Uses ProductTile for consistent sizing with product grids.
 */
export const CategorySection = ({
  title,
  titleVariant = 'h2',
  items,
  tileSize = 'md',
  columns,
  minColumns,
  maxColumns,
  gap = 8,
  onCategoryPress,
  onSeeAllPress,
  showSeeAll = false,
  style,
  gridStyle,
  testID,
}: CategorySectionProps) => {
  const { uiSize } = useDeviceType();

  // Normalize image source to string URL
  const normalizeImageUrl = (image: CategorySectionProps['items'][0]['image']) => {
    if (!image) return undefined;
    if (typeof image === 'string') return image;
    if (typeof image === 'object' && 'uri' in image) return image.uri;
    return undefined;
  };

  return (
    <View style={[styles.container, { marginBottom: uiSize(16) }, style]} testID={testID}>
      {(title || showSeeAll) && (
        <SectionHeader
          title={title || ''}
          titleVariant={titleVariant}
          showSeeAll={showSeeAll}
          onSeeAllPress={onSeeAllPress}
        />
      )}

      <View style={[{ paddingHorizontal: uiSize(16) }, gridStyle]}>
        <FluidGrid minItemWidth={85} maxItemWidth={105} gap={gap}>
          {items.map((item) => (
            <ProductTile
              key={item.id}
              id={item.id}
              name={item.title}
              imageUrl={normalizeImageUrl(item.image)}
              showAddButton={false}
              showFavorite={false}
              onPress={() => onCategoryPress?.(item.id)}
            />
          ))}
        </FluidGrid>
      </View>
    </View>
  );
};

CategorySection.displayName = 'CategorySection';

const styles = StyleSheet.create({
  container: {},
});

export default CategorySection;
