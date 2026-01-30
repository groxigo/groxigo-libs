/**
 * Image Component
 *
 * An optimized image component that works across iOS, Android, and Web.
 * Fully theme-driven with no hardcoded colors.
 */

import React, { useMemo, useState, forwardRef } from 'react';
import { Image as RNImage, View, StyleSheet } from 'react-native';
import type { Image as ImageType } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Skeleton } from '../Skeleton';
import type { ImageProps } from './Image.types';

// ============================================
// IMAGE COMPONENT
// ============================================

export const Image = forwardRef<ImageType, ImageProps>(
  (
    {
      source,
      resizeMode = 'cover',
      width,
      height,
      aspectRatio,
      borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      circular = false,
      fallbackType = 'skeleton',
      fallback,
      backgroundColor,
      style,
      accessibilityLabel,
      onLoad,
      onError,
      ...props
    },
    ref
  ) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Check if individual corner radii are specified
  const hasIndividualRadii = borderTopLeftRadius !== undefined ||
    borderTopRightRadius !== undefined ||
    borderBottomLeftRadius !== undefined ||
    borderBottomRightRadius !== undefined;

  const styles = useMemo(() => {
    const effectiveBorderRadius = circular && typeof width === 'number'
      ? width / 2
      : borderRadius ?? 0;

    // Build border radius styles
    const borderRadiusStyles = hasIndividualRadii
      ? {
          borderTopLeftRadius: borderTopLeftRadius ?? 0,
          borderTopRightRadius: borderTopRightRadius ?? 0,
          borderBottomLeftRadius: borderBottomLeftRadius ?? 0,
          borderBottomRightRadius: borderBottomRightRadius ?? 0,
        }
      : { borderRadius: effectiveBorderRadius };

    return StyleSheet.create({
      container: {
        overflow: 'hidden',
        ...borderRadiusStyles,
        ...(width && { width }),
        ...(height && { height }),
        ...(aspectRatio && { aspectRatio }),
        ...(backgroundColor && { backgroundColor }),
      },
      image: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        ...borderRadiusStyles,
      },
      fallback: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: theme.colors.surfaceSecondary,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
  }, [theme, width, height, aspectRatio, borderRadius, circular, hasIndividualRadii, borderTopLeftRadius, borderTopRightRadius, borderBottomLeftRadius, borderBottomRightRadius, backgroundColor]);

  const handleLoad = (event: any) => {
    setIsLoading(false);
    onLoad?.(event);
  };

  const handleError = (event: any) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(event);
  };

  const renderFallback = () => {
    if (fallback) {
      return fallback;
    }

    if (fallbackType === 'skeleton') {
      return (
        <Skeleton
          variant="rectangular"
          width={width ?? 100}
          height={height ?? 100}
          style={{ position: 'absolute' }}
        />
      );
    }

    return <View style={styles.fallback} />;
  };

  return (
    <View style={styles.container}>
      {(isLoading || hasError) && renderFallback()}
      <RNImage
        ref={ref}
        source={source}
        resizeMode={resizeMode}
        style={[styles.image, style]}
        onLoad={handleLoad}
        onError={handleError}
        accessibilityLabel={accessibilityLabel}
        {...props}
      />
    </View>
  );
  }
);

Image.displayName = 'Image';

export default Image;
