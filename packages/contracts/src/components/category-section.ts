/**
 * Image source type for category items
 */
export type CategoryImageSource = { uri: string } | string;

/**
 * Category item for CategorySection
 */
export interface CategorySectionItem {
  id: string;
  title: string;
  image?: CategoryImageSource;
  icon?: string;
}

/**
 * CategorySection component props
 * Displays a titled section with a responsive grid of category tiles
 */
export interface CategorySectionPropsBase {
  /**
   * Section title displayed above the grid
   */
  title?: string;

  /**
   * Title variant for styling
   * @default 'h4'
   */
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /**
   * Array of category items to display
   */
  items: CategorySectionItem[];

  /**
   * Size of category tiles
   * @default 'md'
   */
  tileSize?: 'sm' | 'md' | 'lg';

  /**
   * Number of columns per breakpoint
   * @default { mobile: 4, tablet: 6, desktop: 8 }
   */
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };

  /**
   * Minimum columns
   * @default 4
   */
  minColumns?: number;

  /**
   * Maximum columns
   * @default 8
   */
  maxColumns?: number;

  /**
   * Gap between tiles (uses theme spacing)
   * @default 12 (spacing[3])
   */
  gap?: number;

  /**
   * Callback when a category is pressed
   */
  onCategoryPress?: (categoryId: string) => void;

  /**
   * Optional "See All" action
   */
  onSeeAllPress?: () => void;

  /**
   * Show "See All" link
   * @default false
   */
  showSeeAll?: boolean;

  /**
   * Test ID for testing
   */
  testID?: string;
}
