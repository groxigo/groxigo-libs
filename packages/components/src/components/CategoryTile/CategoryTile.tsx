import { View, Pressable, Platform, StyleSheet } from 'react-native';
import { Text, Icon, Image, useTheme } from '@groxigo/ui-elements';
import { useDeviceType } from '@groxigo/ui-core';
import type { CategoryTileProps } from './CategoryTile.types';

/**
 * CategoryTile component
 *
 * Displays a category with image/icon and label.
 * Uses theme colors for consistent styling across platforms.
 */
export const CategoryTile = ({
  title,
  image,
  icon,
  onPress,
  size = 'md',
  disabled = false,
  style,
  containerStyle,
  accessibilityLabel,
  testID,
}: CategoryTileProps) => {
  const theme = useTheme();
  const { uiSize, fontSize } = useDeviceType();
  const isWeb = Platform.OS === 'web';

  // Base size configurations (scales up on tablets via uiSize)
  const BASE_SIZE_CONFIG = {
    sm: {
      containerWidth: isWeb ? 80 : 80,
      imageSize: isWeb ? 64 : 56,
      iconSize: 20,
    },
    md: {
      containerWidth: isWeb ? 100 : 85,
      imageSize: isWeb ? 88 : 80,
      iconSize: 24,
    },
    lg: {
      containerWidth: isWeb ? 120 : 100,
      imageSize: isWeb ? 96 : 84,
      iconSize: 32,
    },
  };

  const baseConfig = BASE_SIZE_CONFIG[size];

  // Apply responsive scaling
  const config = {
    container: { width: uiSize(baseConfig.containerWidth) },
    image: { width: uiSize(baseConfig.imageSize), height: uiSize(baseConfig.imageSize) },
    iconSize: uiSize(baseConfig.iconSize),
  };

  const content = (
    <View
      style={[
        styles.container,
        {
          width: config.container.width,
          opacity: disabled ? 0.5 : 1,
          paddingHorizontal: uiSize(4),
        },
        containerStyle,
      ]}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled }}
    >
      {image ? (
        <View style={{ width: config.image.width, alignItems: 'center' }}>
          <Image
            source={image}
            width={config.image.width}
            height={config.image.height}
            borderRadius={uiSize(theme.radius.md)}
            resizeMode="cover"
            accessibilityLabel={`${title} category image`}
            style={{ margin: 0, padding: 0 }}
          />
        </View>
      ) : icon ? (
        <View
          style={[
            styles.iconContainer,
            {
              width: config.image.width,
              height: config.image.height,
              borderRadius: uiSize(theme.radius.md),
              backgroundColor: theme.colors.surfaceSecondary,
            },
          ]}
        >
          <Icon
            name={icon}
            size={config.iconSize}
            color={theme.colors.primary}
          />
        </View>
      ) : null}

      <Text
        variant="h6"
        numberOfLines={2}
        style={{
          color: disabled ? theme.colors.textTertiary : theme.colors.text,
          textAlign: 'center',
          fontWeight: '700',
          fontSize: fontSize(11),
          lineHeight: fontSize(14),
          width: config.image.width,
          marginTop: uiSize(4),
        }}
      >
        {title}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          pressed && !disabled && { opacity: 0.8 },
          style,
        ]}
        testID={testID ? `${testID}-pressable` : undefined}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={style}>{content}</View>;
};

CategoryTile.displayName = 'CategoryTile';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryTile;
