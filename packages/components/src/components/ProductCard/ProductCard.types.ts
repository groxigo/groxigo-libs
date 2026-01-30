import type { ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';
import type { CardProps } from '@groxigo/ui-elements';
import type { ProductCardPropsBase, ProductCardSize, ProductCardVariant } from '@groxigo/contracts';

/**
 * ProductCard props for React Native
 *
 * Extends the platform-agnostic ProductCardPropsBase from @groxigo/contracts
 * with React Native-specific properties and deprecated prop aliases for backward compatibility.
 *
 * For backward compatibility, the required props from the contract (id, name, imageUrl)
 * are made optional here since the deprecated props (title, image) are still accepted.
 */
export interface ProductCardProps extends Omit<ProductCardPropsBase, 'className' | 'id' | 'name' | 'imageUrl' | 'price'> {
  // ======================================
  // CONTRACT PROPS (made optional for backward compat)
  // ======================================

  /** Product ID */
  id?: string;

  /** Product name (preferred over deprecated `title`) */
  name?: string;

  /** Product image URL (preferred over deprecated `image`) */
  imageUrl?: string;

  /** Current price */
  price?: number | string;

  // ======================================
  // DEPRECATED PROPS (for backward compatibility)
  // ======================================

  /**
   * @deprecated Use `name` instead
   * Product title
   */
  title?: string;

  /**
   * @deprecated Use `imageUrl` instead
   * Product image source
   */
  image?: ImageSourcePropType;

  /**
   * @deprecated Use `originalPrice` instead
   * Compare at price (for discount calculation)
   */
  compareAtPrice?: string | number;

  /**
   * @deprecated Use `onAddToCart` instead
   * Callback when action button is pressed
   */
  onAction?: () => void;

  /**
   * @deprecated Use `onToggleFavorite` instead
   * Callback when favorite status changes
   */
  onFavorite?: (isFavorite: boolean) => void;

  // ======================================
  // REACT NATIVE-SPECIFIC PROPS
  // ======================================

  /**
   * Product description/subtitle
   */
  description?: string;

  /**
   * Badge variant
   */
  badgeVariant?: 'primary' | 'success' | 'danger' | 'warning' | 'info';

  /**
   * Action button text
   */
  actionLabel?: string;

  /**
   * Additional container style
   */
  style?: ViewStyle;

  /**
   * Additional image style
   */
  imageStyle?: ImageStyle;

  /**
   * Card variant (visual style)
   * @default 'elevated'
   */
  cardVariant?: CardProps['variant'];

  /**
   * Card padding
   * @default 'md'
   */
  padding?: CardProps['padding'];

  /**
   * Section context for theming (groceries, recipes, default)
   */
  section?: 'groceries' | 'recipes' | 'default';

  /**
   * Minimum quantity allowed
   */
  minQuantity?: number;

  /**
   * Maximum quantity allowed
   */
  maxQuantity?: number;
}

// Re-export types from contracts for convenience
export type { ProductCardSize, ProductCardVariant, ProductImageVariant, ProductCategory } from '@groxigo/contracts';
