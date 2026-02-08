/**
 * SectionHeader component props
 * Displays a section title with optional "See All" action
 */
export interface SectionHeaderPropsBase {
  /**
   * Section title
   */
  title: string;

  /**
   * Title variant for styling
   * @default 'h3'
   */
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  /**
   * Optional subtitle below the title
   */
  subtitle?: string;

  /**
   * Optional left icon name
   */
  icon?: string;

  /**
   * Icon color (uses theme primary by default)
   */
  iconColor?: string;

  /**
   * Show "See All" action button
   * @default false
   */
  showSeeAll?: boolean;

  /**
   * Custom "See All" text
   * @default 'See all'
   */
  seeAllText?: string;

  /**
   * Callback when "See All" is pressed
   */
  onSeeAllPress?: () => void;

  /**
   * Additional CSS class (web only)
   */
  className?: string;

  /**
   * Test ID for testing
   */
  testID?: string;
}
