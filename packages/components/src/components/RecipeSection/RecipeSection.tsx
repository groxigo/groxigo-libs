/**
 * RecipeSection Component
 *
 * Enterprise section component for displaying recipes in carousel or grid layout.
 * Features:
 * - Title header (no "See all" in header)
 * - Recipe cards in horizontal scroll or grid
 * - "See all X recipes →" button at bottom
 */

import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Text, Icon, useTheme } from '@groxigo/ui-elements';
import { useDeviceType } from '@groxigo/ui-core';
import { RecipeCard } from '../RecipeCard';
import { SectionHeader } from '../SectionHeader';
import type { RecipeSectionProps, RecipeSectionItem } from './RecipeSection.types';

/**
 * RecipeSection - Displays recipes in a carousel or grid layout
 */
export const RecipeSection = ({
  title,
  titleVariant,
  icon,
  iconColor,
  items,
  displayType = 'carousel',
  showSeeAll = false,
  seeAllText,
  totalCount,
  onSeeAllPress,
  onRecipePress,
  cardWidth = 180,
  columns = 2,
  gap,
  style,
  testID,
}: RecipeSectionProps) => {
  const theme = useTheme();
  const { uiSize, spacing, fontSize } = useDeviceType();

  // Default gap - scales on tablets
  const gapValue = gap ?? uiSize(12);

  // Generate "See all" text
  const seeAllDisplayText = seeAllText || 'See all';
  // Show button if onSeeAllPress is provided
  const shouldShowSeeAllButton = !!onSeeAllPress;

  // Render a single recipe card
  const renderRecipeCard = (item: RecipeSectionItem) => {
    return (
      <RecipeCard
        key={item.id}
        id={item.id}
        title={item.title}
        imageUrl={item.imageUrl}
        prepTime={item.prepTime}
        cookTime={item.cookTime}
        totalTime={item.totalTime}
        servings={item.servings}
        difficulty={item.difficulty}
        cuisine={item.cuisine}
        rating={item.rating}
        ratingCount={item.ratingCount}
        tags={item.tags}
        badge={item.badge}
        width={cardWidth}
        onPress={() => onRecipePress?.(item.id)}
      />
    );
  };

  // Render "See all X recipes →" button
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
            icon={icon}
            iconColor={iconColor}
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
          {items.map(renderRecipeCard)}
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
          icon={icon}
          iconColor={iconColor}
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
        {items.map(renderRecipeCard)}
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

export default RecipeSection;
