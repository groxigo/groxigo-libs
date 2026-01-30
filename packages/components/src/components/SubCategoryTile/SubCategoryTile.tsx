import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Text, Icon, Image, useTheme } from '@groxigo/ui-elements';
import type { SubCategoryTileProps } from './SubCategoryTile.types';

/**
 * SubCategoryTile component
 *
 * Displays a subcategory with image/icon and label.
 * Used in left navigation panel for subcategory selection.
 * Uses theme colors for consistent styling across platforms.
 */
export const SubCategoryTile = ({
  title,
  image,
  icon,
  onPress,
  size = 'md',
  disabled = false,
  active = false,
  style,
  containerStyle,
  accessibilityLabel,
  testID,
}: SubCategoryTileProps) => {
  const theme = useTheme();

  const sizeConfig = {
    sm: {
      container: { width: 72 },
      image: { width: 40, height: 40 },
      icon: 'sm' as 'sm' | 'md' | 'lg',
      textVariant: 'caption' as const,
    },
    md: {
      container: { width: 80 },
      image: { width: 48, height: 48 },
      icon: 'md' as 'sm' | 'md' | 'lg',
      textVariant: 'caption' as const,
    },
    lg: {
      container: { width: 96 },
      image: { width: 56, height: 56 },
      icon: 'md' as 'sm' | 'md' | 'lg',
      textVariant: 'caption' as const,
    },
  };

  const config = sizeConfig[size];

  const content = (
    <View
      style={[
        styles.container,
        {
          width: config.container.width,
          minHeight: 48,
          opacity: disabled ? 0.5 : 1,
          paddingVertical: theme.spacing[1],
          paddingHorizontal: theme.spacing[1],
          gap: theme.spacing[1],
          backgroundColor: active ? theme.colors.primary + '10' : 'transparent',
          borderLeftWidth: active ? 3 : 0,
          borderLeftColor: active ? theme.colors.primary : 'transparent',
          borderTopRightRadius: theme.radius.lg,
          borderBottomRightRadius: theme.radius.lg,
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
            borderRadius={theme.radius.md}
            resizeMode="cover"
            accessibilityLabel={`${title} subcategory image`}
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
              borderRadius: theme.radius.md,
              backgroundColor: theme.colors.surfaceSecondary,
            },
          ]}
        >
          <Icon
            name={icon}
            size={config.icon}
            color={theme.colors.primary}
          />
        </View>
      ) : null}

      <Text
        variant={config.textVariant}
        numberOfLines={2}
        style={{
          color: disabled ? theme.colors.textTertiary : theme.colors.text,
          textAlign: 'center',
          fontWeight: '500',
          width: config.image.width,
          fontSize: 11,
          lineHeight: 11 * 1.2,
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

export default SubCategoryTile;
