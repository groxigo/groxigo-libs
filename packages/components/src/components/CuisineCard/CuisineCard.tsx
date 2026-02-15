/**
 * CuisineCard Component
 *
 * A card for displaying cuisine types with square image on top and text below.
 * Clean design with good text readability.
 */

import { forwardRef } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Image as RNImage,
  type ViewStyle,
  type StyleProp,
} from 'react-native';
import { Text } from '@groxigo/ui-elements';
import { tokens } from '@groxigo/tokens/react-native';
import { useDeviceType } from '@groxigo/ui-core';
import type { CuisineCardPropsBase } from '@groxigo/contracts';

export interface CuisineCardProps extends Omit<CuisineCardPropsBase, 'className'> {
  /** Style overrides */
  style?: StyleProp<ViewStyle>;
}

// Default placeholder image
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=400&h=400&fit=crop';

export const CuisineCard = forwardRef<View, CuisineCardProps>(
  (
    {
      slug,
      name,
      imageUrl,
      recipeCount,
      size = 'md',
      variant = 'default',
      width,
      onPress,
      style,
      testID,
    },
    ref
  ) => {
    const { fontSize, uiSize } = useDeviceType();

    const cardWidth = width || uiSize(100);
    const borderRadius = uiSize(6);

    const containerStyle: ViewStyle = {
      width: cardWidth,
      borderRadius,
      overflow: 'hidden',
      backgroundColor: tokens.colors.semantic.surface.primary,
    };

    const content = (
      <>
        {/* Image section - 1:1 aspect ratio, uses layout.imageBg for easy config */}
        <View style={[
          styles.imageContainer,
          { borderRadius, backgroundColor: tokens.colors.semantic.layout.imageBg }
        ]}>
          <RNImage
            source={{ uri: imageUrl || PLACEHOLDER_IMAGE }}
            style={[styles.image, { width: cardWidth, height: cardWidth, borderRadius }]}
            resizeMode="cover"
          />
        </View>

        {/* Text section below image */}
        <View style={styles.textContainer}>
          <Text
            variant="bodySmall"
            weight="semibold"
            style={[styles.name, { fontSize: fontSize(14) }]}
            numberOfLines={1}
          >
            {name}
          </Text>

          {recipeCount !== undefined && (
            <Text
              variant="caption"
              style={[styles.count, { fontSize: fontSize(10) }]}
              numberOfLines={1}
            >
              {recipeCount} recipes
            </Text>
          )}
        </View>
      </>
    );

    if (onPress) {
      return (
        <Pressable
          ref={ref}
          style={({ pressed }) => [
            containerStyle,
            pressed && styles.pressed,
            style,
          ]}
          onPress={onPress}
          testID={testID}
        >
          {content}
        </Pressable>
      );
    }

    return (
      <View ref={ref} style={[containerStyle, style]} testID={testID}>
        {content}
      </View>
    );
  }
);

CuisineCard.displayName = 'CuisineCard';

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    aspectRatio: 1,
  },
  textContainer: {
    paddingHorizontal: tokens.spacing[2],
    paddingTop: tokens.spacing[1],
    paddingBottom: tokens.spacing[2],
    backgroundColor: tokens.colors.semantic.surface.primary,
  },
  name: {
    color: tokens.colors.semantic.text.primary,
  },
  count: {
    color: tokens.colors.semantic.text.secondary,
    marginTop: 1,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
});

export default CuisineCard;
