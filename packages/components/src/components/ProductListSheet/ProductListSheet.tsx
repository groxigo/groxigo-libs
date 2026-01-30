/**
 * ProductListSheet Component
 *
 * A bottom sheet overlay for displaying a scrollable list of products
 * using FluidGrid. Supports swipe to dismiss.
 */

import React, { useRef, useEffect } from 'react';
import {
  View,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Text, Icon, useTheme } from '@groxigo/ui-elements';
import { useDeviceType } from '@groxigo/ui-core';
import { FluidGrid } from '../FluidGrid';
import { ProductTile } from '../ProductTile';
import type { ProductListSheetProps, ProductListSheetItem } from './ProductListSheet.types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = 100; // Minimum swipe distance to dismiss

/**
 * ProductListSheet - Bottom sheet with fluid product grid
 */
export const ProductListSheet = ({
  visible,
  onClose,
  title,
  subtitle,
  items,
  onProductPress,
  onAddToCart,
  onIncrement,
  onDecrement,
  onFavoriteToggle,
  favorites = {},
  getItemQuantity = () => 0,
  showFavorite = true,
  showAddButton = true,
  heightPercent = 0.7,
  dismissible = true,
  showDragHandle = true,
  isLoading = false,
  onEndReached,
  style,
  testID,
}: ProductListSheetProps) => {
  const theme = useTheme();
  const { uiSize, fontSize, spacing } = useDeviceType();

  // Animation values
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // Sheet height
  const sheetHeight = SCREEN_HEIGHT * heightPercent;

  // Animate in/out when visibility changes
  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 20,
          stiffness: 150,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset position
      translateY.setValue(SCREEN_HEIGHT);
      backdropOpacity.setValue(0);
    }
  }, [visible, translateY, backdropOpacity]);

  // Close with animation
  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  // Pan responder for swipe to dismiss
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to downward swipes
        return gestureState.dy > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        // Only allow downward movement
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > SWIPE_THRESHOLD || gestureState.vy > 0.5) {
          // Dismiss if swiped far enough or fast enough
          handleClose();
        } else {
          // Snap back
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            damping: 20,
            stiffness: 150,
          }).start();
        }
      },
    })
  ).current;

  // Calculate discount percent
  const getDiscountPercent = (item: ProductListSheetItem): number | undefined => {
    if (item.discountPercent) return item.discountPercent;
    if (item.compareAtPrice && item.compareAtPrice > item.price) {
      return Math.round(((item.compareAtPrice - item.price) / item.compareAtPrice) * 100);
    }
    return undefined;
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Animated.View
        style={[
          styles.backdrop,
          {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            opacity: backdropOpacity,
          },
        ]}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={dismissible ? handleClose : undefined}
        />
      </Animated.View>

      {/* Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          {
            height: sheetHeight,
            backgroundColor: theme.colors.surface,
            borderTopLeftRadius: uiSize(20),
            borderTopRightRadius: uiSize(20),
            transform: [{ translateY }],
          },
          style,
        ]}
        testID={testID}
      >
        {/* Drag Handle */}
        {showDragHandle && (
          <View {...panResponder.panHandlers} style={styles.dragHandleContainer}>
            <View
              style={[
                styles.dragHandle,
                {
                  backgroundColor: theme.colors.border,
                  width: uiSize(40),
                  height: uiSize(4),
                  borderRadius: uiSize(2),
                },
              ]}
            />
          </View>
        )}

        {/* Header */}
        <View
          style={[
            styles.header,
            {
              paddingHorizontal: spacing(16),
              paddingBottom: uiSize(12),
              borderBottomWidth: 1,
              borderBottomColor: theme.colors.border,
            },
          ]}
        >
          <View style={styles.headerText}>
            {title && (
              <Text
                variant="h3"
                style={{ color: theme.colors.text, fontSize: fontSize(18) }}
              >
                {title}
              </Text>
            )}
            {subtitle && (
              <Text
                variant="caption"
                style={{
                  color: theme.colors.textSecondary,
                  fontSize: fontSize(13),
                  marginTop: uiSize(2),
                }}
              >
                {subtitle}
              </Text>
            )}
          </View>
          <Pressable
            onPress={handleClose}
            style={[
              styles.closeButton,
              {
                backgroundColor: theme.colors.surfaceSecondary,
                width: uiSize(32),
                height: uiSize(32),
                borderRadius: uiSize(16),
              },
            ]}
            hitSlop={8}
          >
            <Icon name="x" size="sm" color={theme.colors.textSecondary} />
          </Pressable>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={{
            padding: spacing(16),
            paddingBottom: spacing(32),
          }}
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => {
            // Trigger onEndReached when near bottom
            const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
            const isNearBottom =
              layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;
            if (isNearBottom && onEndReached) {
              onEndReached();
            }
          }}
          scrollEventThrottle={400}
        >
          {isLoading && items.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  marginTop: uiSize(12),
                  fontSize: fontSize(14),
                }}
              >
                Loading products...
              </Text>
            </View>
          ) : items.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon name="package" size="xl" color={theme.colors.textTertiary} />
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  marginTop: uiSize(12),
                  fontSize: fontSize(14),
                  textAlign: 'center',
                }}
              >
                No products found
              </Text>
            </View>
          ) : (
            <FluidGrid minItemWidth={115} maxItemWidth={160} gap={8}>
              {items.map((item) => {
                const quantity = getItemQuantity(item.id);
                const discountPercent = getDiscountPercent(item);

                return (
                  <ProductTile
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    imageUrl={item.imageUrl}
                    price={item.price}
                    originalPrice={item.compareAtPrice}
                    discountPercent={discountPercent}
                    weight={item.unitSize || item.unit}
                    rating={item.rating}
                    reviewCount={item.reviewCount}
                    outOfStock={item.inStock === false}
                    showAddButton={showAddButton}
                    quantity={quantity}
                    onAddPress={() => onAddToCart?.(item)}
                    onIncrement={() => onIncrement?.(item.id)}
                    onDecrement={() => onDecrement?.(item.id)}
                    showFavorite={showFavorite}
                    isFavorite={favorites[item.id]}
                    onFavoritePress={() => onFavoriteToggle?.(item.id)}
                    onPress={() => onProductPress?.(item.id)}
                  />
                );
              })}
            </FluidGrid>
          )}

          {/* Loading more indicator */}
          {isLoading && items.length > 0 && (
            <View style={[styles.loadingMore, { marginTop: uiSize(16) }]}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 16,
  },
  dragHandleContainer: {
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 8,
  },
  dragHandle: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  loadingMore: {
    alignItems: 'center',
  },
});

export default ProductListSheet;
