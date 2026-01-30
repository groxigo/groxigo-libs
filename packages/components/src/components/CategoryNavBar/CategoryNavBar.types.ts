import { ViewStyle } from 'react-native';

/**
 * CategoryNavBar component props
 * Wrapper around Header component for category detail screens
 */
export interface CategoryNavBarProps {
  /**
   * Category name to display in the navigation bar
   */
  categoryName: string;

  /**
   * Callback when back button is pressed
   * If not provided and router is available, will use router.back()
   */
  onBack?: () => void;

  /**
   * Callback when search icon is pressed
   * If not provided, will try to navigate to search screen using router
   */
  onSearchPress?: () => void;

  /**
   * Section for theming (groceries/recipes colors)
   * @default 'default'
   */
  section?: 'groceries' | 'recipes' | 'default';

  /**
   * Whether header has shadow/elevation
   * @default true
   */
  elevated?: boolean;

  /**
   * Whether header is fixed at the top
   * @default false
   */
  fixed?: boolean;

  /**
   * Background color (supports opaque colors with alpha/rgba)
   * If not provided, defaults to white
   */
  backgroundColor?: string;

  /**
   * Additional container style
   */
  style?: ViewStyle;

  /**
   * Accessibility label for the navigation bar
   */
  accessibilityLabel?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}





