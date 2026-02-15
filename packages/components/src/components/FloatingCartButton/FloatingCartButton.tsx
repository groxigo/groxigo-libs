import { Pressable, View, StyleSheet, Platform } from 'react-native';
import { Text, Icon, Image, useTheme } from '@groxigo/ui-elements';
import { useDeviceType } from '@groxigo/ui-core';
import type { FloatingCartButtonProps } from './FloatingCartButton.types';

/**
 * FloatingCartButton component
 *
 * A floating action button that displays cart status and navigates to cart.
 * Typically positioned at the bottom right of the screen.
 * Uses theme tokens for consistent styling.
 *
 * @example
 * ```tsx
 * <FloatingCartButton
 *   itemCount={3}
 *   previewImage={{ uri: 'https://...' }}
 *   onPress={() => router.push('/cart')}
 * />
 * ```
 */
export const FloatingCartButton = ({
  itemCount,
  previewImage,
  onPress,
  label = 'View cart',
  bottomOffset,
  style,
  visible,
}: FloatingCartButtonProps) => {
  const theme = useTheme();
  const { uiSize } = useDeviceType();

  // Responsive bottom offset - scales with device size
  // Default base offset of 70 scales up on tablets
  const responsiveBottomOffset = bottomOffset ?? uiSize(70);

  // Don't render if no items (unless visible is explicitly true)
  const shouldShow = visible !== undefined ? visible : itemCount > 0;
  if (!shouldShow) {
    return null;
  }

  // Responsive sizes
  const imageContainerSize = uiSize(36);
  const previewImageSize = uiSize(32);
  const arrowContainerSize = uiSize(26);

  return (
    <View style={[styles.wrapper, { bottom: responsiveBottomOffset }]}>
      <Pressable
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.success,
            borderRadius: uiSize(theme.radius.xl),
            padding: uiSize(8),
            paddingRight: uiSize(12),
            gap: uiSize(8),
            ...Platform.select({
              web: {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              } as any,
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
              },
              android: {
                elevation: 6,
              },
            }),
          },
          style,
        ]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${label}, ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
      >
      <View
        style={[
          styles.imageContainer,
          {
            width: imageContainerSize,
            height: imageContainerSize,
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.full,
          },
        ]}
      >
        {previewImage ? (
          <Image
            source={previewImage}
            width={previewImageSize}
            height={previewImageSize}
            borderRadius={theme.radius.full}
          />
        ) : (
          <Icon name="bag" size="sm" color={theme.colors.success} />
        )}
      </View>
      <View style={[styles.content, { paddingHorizontal: uiSize(4) }]}>
        <Text
          variant="bodySmall"
          weight="semibold"
          style={{ color: theme.colors.textInverse }}
        >
          {label}
        </Text>
        <Text
          variant="caption"
          style={{ color: 'rgba(255,255,255,0.85)' }}
        >
          {itemCount} Item{itemCount !== 1 ? 's' : ''}
        </Text>
      </View>
      <View
        style={[
          styles.arrowContainer,
          {
            width: arrowContainerSize,
            height: arrowContainerSize,
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: theme.radius.full,
          },
        ]}
      >
        <Icon name="chevron-right" size="sm" color={theme.colors.textInverse} />
      </View>
      </Pressable>
    </View>
  );
};

FloatingCartButton.displayName = 'FloatingCartButton';

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  content: {},
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FloatingCartButton;
