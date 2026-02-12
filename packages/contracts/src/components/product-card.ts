/**
 * ProductCard Component Contract
 */

import type { ReactNode } from 'react';
import type { SDUIStyleProps } from '../sdui';

export type ProductCardSize = 'sm' | 'md' | 'lg';
export type ProductCardVariant = 'default' | 'compact' | 'horizontal';

/**
 * Image variant for responsive image loading
 */
export interface ProductImageVariant {
  /** Image URL */
  url: string;
  /** Width in pixels */
  width: number;
  /** Height in pixels */
  height: number;
  /** Optional quality indicator */
  quality?: 'low' | 'medium' | 'high';
}

/**
 * Category information for display
 */
export interface ProductCategory {
  /** Category ID */
  id: string;
  /** Category name */
  name: string;
  /** Category slug */
  slug?: string;
}

export interface ProductCardPropsBase extends SDUIStyleProps {
  /** Product ID */
  id: string;
  /** Product name */
  name: string;
  /** Product image URL */
  imageUrl: string;
  /** Responsive image variants for optimal loading */
  imageVariants?: ProductImageVariant[];
  /** Current price */
  price: number;
  /** Original price (for discount display) */
  originalPrice?: number;
  /** Unit label (e.g., "per kg", "each") */
  unit?: string;
  /** Product weight (e.g., "500g", "1kg", "16 oz") */
  weight?: string;
  /** Discount percentage to display */
  discountPercent?: number;
  /** Whether product is out of stock */
  outOfStock?: boolean;
  /** Card size @default 'md' */
  size?: ProductCardSize;
  /** Card variant @default 'default' */
  variant?: ProductCardVariant;
  /** Badge text (e.g., "Bestseller", "New") */
  badge?: string;
  /** Product category */
  category?: ProductCategory;
  /** Average rating (1-5) */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Number of recipes using this product */
  recipeCount?: number;
  /** Whether item is favorited */
  isFavorite?: boolean;
  /** Current quantity in cart */
  quantity?: number;
  /** Press handler */
  onPress?: () => void;
  /** Add to cart handler */
  onAddToCart?: () => void;
  /** Update quantity handler */
  onQuantityChange?: (quantity: number) => void;
  /** Toggle favorite handler */
  onToggleFavorite?: () => void;
  /** Custom render function for recipe link */
  renderRecipeLink?: (recipeCount: number) => ReactNode;
  /** Test ID */
  testID?: string;
}
