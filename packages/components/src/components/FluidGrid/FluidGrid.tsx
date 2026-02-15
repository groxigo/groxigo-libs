/**
 * FluidGrid
 *
 * A responsive grid that:
 * 1. Calculates optimal columns based on container width
 * 2. Items stretch to fill available space
 * 3. Respects min/max item widths
 * 4. Seamlessly adjusts as container resizes
 *
 * Algorithm:
 * - Calculate max possible columns at minItemWidth
 * - Calculate actual item width to fill the row
 * - If item width exceeds maxItemWidth, reduce columns
 * - Items always fill the full row width
 *
 * Note: Children that accept a `width` prop will receive
 * the calculated width automatically via cloneElement.
 */

import { Children, isValidElement, cloneElement, useState, useCallback, type ReactNode, type ReactElement } from 'react';
import { View, StyleSheet, type LayoutChangeEvent, type StyleProp, type ViewStyle } from 'react-native';
import { useDeviceType } from '@groxigo/ui-core';

export interface FluidGridProps {
  /**
   * Minimum width for each item (before scaling)
   * @default 140
   */
  minItemWidth?: number;
  /**
   * Maximum width for each item (before scaling)
   * @default 200
   */
  maxItemWidth?: number;
  /**
   * Gap between items (before scaling)
   * @default 12
   */
  gap?: number;
  /**
   * Children to render in the grid
   */
  children: ReactNode;
  /**
   * Container style
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Test ID for testing
   */
  testID?: string;
}

export const FluidGrid = ({
  minItemWidth = 140,
  maxItemWidth = 200,
  gap = 12,
  children,
  style,
  testID,
}: FluidGridProps) => {
  const { uiSize } = useDeviceType();
  const [containerWidth, setContainerWidth] = useState(0);

  // Scale values for device
  const scaledMinWidth = uiSize(minItemWidth);
  const scaledMaxWidth = uiSize(maxItemWidth);
  const scaledGap = uiSize(gap);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  }, []);

  // Calculate optimal columns and item width
  const calculateGrid = useCallback(() => {
    if (containerWidth === 0) {
      return { columns: 2, itemWidth: scaledMinWidth };
    }

    // Calculate maximum columns that can fit at minimum item width
    // Formula: containerWidth = (columns * minWidth) + ((columns - 1) * gap)
    // Solving for columns: columns = (containerWidth + gap) / (minWidth + gap)
    const maxColumns = Math.floor((containerWidth + scaledGap) / (scaledMinWidth + scaledGap));

    // Ensure at least 1 column
    let columns = Math.max(1, maxColumns);

    // Calculate item width for this number of columns
    // Formula: itemWidth = (containerWidth - ((columns - 1) * gap)) / columns
    let itemWidth = (containerWidth - ((columns - 1) * scaledGap)) / columns;

    // If item width exceeds max, try with fewer columns
    while (itemWidth > scaledMaxWidth && columns > 1) {
      columns--;
      itemWidth = (containerWidth - ((columns - 1) * scaledGap)) / columns;
    }

    // If item width is still less than min (single column case), use container width
    if (columns === 1) {
      itemWidth = Math.min(containerWidth, scaledMaxWidth);
    }

    return { columns, itemWidth };
  }, [containerWidth, scaledMinWidth, scaledMaxWidth, scaledGap]);

  const { itemWidth } = calculateGrid();

  const childrenArray = Children.toArray(children).filter(Boolean);

  return (
    <View style={[styles.container, style]} onLayout={handleLayout} testID={testID}>
      {containerWidth > 0 && (
        <View style={[styles.grid, { gap: scaledGap }]}>
          {childrenArray.map((child, index) => {
            // Clone child and pass width prop if it's a valid React element
            const childWithWidth = isValidElement(child)
              ? cloneElement(child as ReactElement<any>, { width: itemWidth })
              : child;

            return (
              <View
                key={index}
                style={[
                  styles.itemWrapper,
                  {
                    width: itemWidth,
                  },
                ]}
              >
                {childWithWidth}
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

FluidGrid.displayName = 'FluidGrid';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  itemWrapper: {
    overflow: 'hidden',
  },
});

export default FluidGrid;
