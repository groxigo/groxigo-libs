/**
 * ProductSection Types
 *
 * Enterprise section component for displaying products.
 */

import type { StyleProp, ViewStyle } from 'react-native';

/**
 * Product item for ProductSection
 */
export interface ProductSectionItem {
  /** Unique product ID */
  id: string;
  /** Product name */
  name: string;
  /** Product image URL */
  imageUrl?: string;
  /** Current price */
  price: number;
  /** Original price (for showing discount) */
  compareAtPrice?: number;
  /** Deal/sale price */
  dealPrice?: number;
  /** Discount percentage */
  discountPercent?: number;
  /** Weight/size display (e.g., "500g", "1 lb") */
  unit?: string;
  /** Unit size display */
  unitSize?: string;
  /** Whether product is in stock */
  inStock?: boolean;
  /** Product rating */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Badge text (e.g., "New", "Best Seller") */
  badge?: string;
  /** Badge variant */
  badgeVariant?: 'primary' | 'success' | 'warning' | 'error';
}

/**
 * Display type for ProductSection
 */
export type ProductSectionDisplayType = 'carousel' | 'grid';

/**
 * ProductSection props
 */
export interface ProductSectionProps {
  /** Section title */
  title?: string;
  /** Title variant */
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Product items to display */
  items: ProductSectionItem[];
  /** Display type - carousel or grid */
  displayType?: ProductSectionDisplayType;
  /** Show "See All" button */
  showSeeAll?: boolean;
  /** "See All" button text */
  seeAllText?: string;
  /** Total count of items (for "See all X items" display) */
  totalCount?: number;
  /** Callback when "See All" is pressed */
  onSeeAllPress?: () => void;
  /** Callback when a product is pressed */
  onProductPress?: (productId: string) => void;
  /** Callback when add to cart is pressed */
  onAddToCart?: (item: ProductSectionItem) => void;
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
  /** Product tile size */
  tileSize?: 'sm' | 'md' | 'lg';
  /** Grid columns (for grid display type) */
  columns?: number;
  /** Gap between items */
  gap?: number;
  /** Container style */
  style?: StyleProp<ViewStyle>;
  /** Test ID */
  testID?: string;
}
