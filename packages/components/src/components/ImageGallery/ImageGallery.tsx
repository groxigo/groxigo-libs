import { useState, useEffect, useRef } from 'react';
import { View, ScrollView, Image, Pressable, Dimensions, StyleSheet } from 'react-native';
import { Icon, useTheme } from '@groxigo/ui-elements';
import type { ImageGalleryProps } from './ImageGallery.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * ImageGallery component
 *
 * Image carousel/gallery with pagination and navigation.
 * Uses theme colors for consistent styling across platforms.
 */
export const ImageGallery = ({
  images,
  initialIndex = 0,
  showPagination = true,
  showArrows = true,
  loop = false,
  autoPlay = 0,
  onIndexChange,
  style,
  imageStyle,
  ...props
}: ImageGalleryProps) => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const scrollViewRef = useRef<ScrollView>(null);
  const autoPlayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (initialIndex !== currentIndex) {
      setCurrentIndex(initialIndex);
      scrollToIndex(initialIndex);
    }
  }, [initialIndex]);

  useEffect(() => {
    if (autoPlay > 0 && images.length > 1) {
      autoPlayTimerRef.current = setInterval(() => {
        handleNext();
      }, autoPlay);
      return () => {
        if (autoPlayTimerRef.current) {
          clearInterval(autoPlayTimerRef.current);
        }
      };
    }
  }, [autoPlay, currentIndex, images.length]);

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * SCREEN_WIDTH,
        animated: true,
      });
    }
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index !== currentIndex && index >= 0 && index < images.length) {
      setCurrentIndex(index);
      onIndexChange?.(index);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
      onIndexChange?.(newIndex);
    } else if (loop) {
      const newIndex = images.length - 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
      onIndexChange?.(newIndex);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
      onIndexChange?.(newIndex);
    } else if (loop) {
      const newIndex = 0;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
      onIndexChange?.(newIndex);
    }
  };

  if (images.length === 0) return null;

  return (
    <View style={[styles.container, style]} {...props}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ width: SCREEN_WIDTH }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={[styles.image, { width: SCREEN_WIDTH }, imageStyle]}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {showArrows && images.length > 1 && (
        <>
          {(currentIndex > 0 || loop) && (
            <Pressable
              onPress={handlePrevious}
              style={[
                styles.arrowButton,
                styles.arrowLeft,
                {
                  left: theme.spacing[3],
                  borderRadius: theme.radius.full,
                  padding: theme.spacing[2],
                  backgroundColor: theme.colors.overlay,
                },
              ]}
              accessibilityLabel="Previous image"
              accessibilityRole="button"
            >
              <Icon name="chevron-left" size="md" style={{ color: theme.colors.white }} />
            </Pressable>
          )}
          {(currentIndex < images.length - 1 || loop) && (
            <Pressable
              onPress={handleNext}
              style={[
                styles.arrowButton,
                styles.arrowRight,
                {
                  right: theme.spacing[3],
                  borderRadius: theme.radius.full,
                  padding: theme.spacing[2],
                  backgroundColor: theme.colors.overlay,
                },
              ]}
              accessibilityLabel="Next image"
              accessibilityRole="button"
            >
              <Icon name="chevron-right" size="md" style={{ color: theme.colors.white }} />
            </Pressable>
          )}
        </>
      )}

      {showPagination && images.length > 1 && (
        <View
          style={[
            styles.pagination,
            {
              bottom: theme.spacing[3],
              gap: theme.spacing[1],
            },
          ]}
        >
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor:
                    index === currentIndex
                      ? theme.colors.primary
                      : theme.colors.white + '80', // 50% opacity
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    height: 300,
  },
  arrowButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    zIndex: 10,
  },
  arrowLeft: {},
  arrowRight: {},
  pagination: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default ImageGallery;
