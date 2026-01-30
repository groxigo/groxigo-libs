/**
 * CategoryCard Component Contract
 */

export type CategoryCardSize = 'sm' | 'md' | 'lg';
export type CategoryCardVariant = 'default' | 'circular' | 'banner';

export interface CategoryCardPropsBase {
  /** Category ID */
  id: string;
  /** Category name */
  name: string;
  /** Category image URL */
  imageUrl?: string;
  /** Category icon name */
  icon?: string;
  /** Product count in category */
  productCount?: number;
  /** Card size @default 'md' */
  size?: CategoryCardSize;
  /** Card variant @default 'default' */
  variant?: CategoryCardVariant;
  /** Background color override */
  backgroundColor?: string;
  /** Press handler */
  onPress?: () => void;
  /** Additional CSS class */
  className?: string;
  /** Test ID */
  testID?: string;
}
