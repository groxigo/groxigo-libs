import type { CategorySectionPropsBase, CategorySectionItem, CategoryImageSource } from '@groxigo/contracts';

export type { CategorySectionItem, CategoryImageSource };

/**
 * CategorySection component props for Web
 */
export interface CategorySectionProps extends CategorySectionPropsBase {
  /**
   * Additional CSS classes for container
   */
  className?: string;

  /**
   * Additional CSS classes for grid
   */
  gridClassName?: string;
}
