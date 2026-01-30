/**
 * ProductTile component props
 * A flexible product display for deals, trending, and compact listings
 * Supports optional cart actions, favorites, and ratings
 */
export interface ProductTilePropsBase {
  /**
   * Unique product ID
   */
  id: string;

  /**
   * Product name/title
   */
  name: string;

  /**
   * Product image URL
   */
  imageUrl?: string;

  /**
   * Current/sale price (optional for category tiles)
   */
  price?: number;

  /**
   * Original price (shows strikethrough if higher than price)
   */
  originalPrice?: number;

  /**
   * Discount percentage (e.g., 15 for 15% off)
   * Displayed as text below timer, not as badge
   */
  discountPercent?: number;

  /**
   * Custom discount text (overrides discountPercent display)
   */
  discountText?: string;

  /**
   * Product weight/size (e.g., "500g", "1 lb", "4 x 48g")
   * Displayed prominently above product name
   */
  weight?: string;

  /**
   * Brand name
   */
  brand?: string;

  /**
   * Badge text (e.g., "Value Pack", "Best Seller")
   * Displayed as colored badge on top-left of image
   */
  badge?: string;

  /**
   * Badge color variant
   * @default 'primary'
   */
  badgeVariant?: 'primary' | 'success' | 'warning' | 'error';

  /**
   * Rating value (0-5)
   */
  rating?: number;

  /**
   * Number of reviews
   */
  reviewCount?: number;

  /**
   * Delivery/timer text (e.g., "16 MINS", "2h 30m left")
   */
  timerText?: string;

  /**
   * Whether product is out of stock
   */
  outOfStock?: boolean;

  /**
   * Whether to show the ADD button
   * @default false
   */
  showAddButton?: boolean;

  /**
   * Text for add button
   * @default 'ADD'
   */
  addButtonText?: string;

  /**
   * Options text below ADD button (e.g., "2 options")
   */
  optionsText?: string;

  /**
   * Current quantity in cart (shows quantity stepper if > 0)
   */
  quantity?: number;

  /**
   * Callback when ADD button is pressed
   */
  onAddPress?: () => void;

  /**
   * Callback to increment quantity
   */
  onIncrement?: () => void;

  /**
   * Callback to decrement quantity
   */
  onDecrement?: () => void;

  /**
   * Whether to show favorite/heart icon
   * @default false
   */
  showFavorite?: boolean;

  /**
   * Whether product is favorited
   */
  isFavorite?: boolean;

  /**
   * Callback when favorite icon is pressed
   */
  onFavoritePress?: () => void;

  /**
   * Tile size variant
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Tile width (overrides size-based width)
   */
  width?: number;

  /**
   * Callback when tile is pressed
   */
  onPress?: () => void;

  /**
   * Test ID for testing
   */
  testID?: string;
}
