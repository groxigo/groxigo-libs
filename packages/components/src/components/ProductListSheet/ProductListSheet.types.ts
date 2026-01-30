/**
 * ProductListSheet Types
 */

import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Product item for ProductListSheet
 */
export interface ProductListSheetItem {
  id: string;
  name: string;
  imageUrl?: string;
  price: number;
  compareAtPrice?: number;
  discountPercent?: number;
  unit?: string;
  unitSize?: string;
  inStock?: boolean;
  rating?: number;
  reviewCount?: number;
}

/**
 * ProductListSheet props
 */
export interface ProductListSheetProps {
  /** Whether the sheet is visible */
  visible: boolean;
  /** Callback when sheet is closed */
  onClose: () => void;
  /** Sheet title */
  title?: string;
  /** Subtitle or item count */
  subtitle?: string;
  /** Product items to display */
  items: ProductListSheetItem[];
  /** Callback when a product is pressed */
  onProductPress?: (productId: string) => void;
  /** Callback when add to cart is pressed */
  onAddToCart?: (item: ProductListSheetItem) => void;
  /** Callback when quantity is incremented */
  onIncrement?: (productId: string) => void;
  /** Callback when quantity is decremented */
  onDecrement?: (productId: string) => void;
  /** Callback when favorite is toggled */
  onFavoriteToggle?: (productId: string) => void;
  /** Map of product IDs to favorite status */
  favorites?: Record<string, boolean>;
  /** Function to get cart quantity for a product */
  getItemQuantity?: (productId: string) => number;
  /** Show favorite button on products */
  showFavorite?: boolean;
  /** Show add button on products */
  showAddButton?: boolean;
  /** Height as percentage of screen (0-1) */
  heightPercent?: number;
  /** Whether to allow dismiss by tapping backdrop */
  dismissible?: boolean;
  /** Whether to show drag handle */
  showDragHandle?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Callback when end of list is reached (for pagination) */
  onEndReached?: () => void;
  /** Container style */
  style?: StyleProp<ViewStyle>;
  /** Test ID */
  testID?: string;
}
