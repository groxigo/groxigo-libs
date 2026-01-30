/**
 * RecipeSection Component Contract
 *
 * Platform-agnostic interface for RecipeSection component.
 * Displays recipes in carousel or grid layout with section header and "See all" footer.
 */

import type { RecipeCardDifficulty, RecipeTagItem } from './recipe-card';

/**
 * Recipe item for RecipeSection
 */
export interface RecipeSectionItem {
  /** Unique recipe ID */
  id: string;
  /** Recipe title */
  title: string;
  /** Recipe image URL */
  imageUrl?: string;
  /** Prep time in minutes */
  prepTime?: number;
  /** Cook time in minutes */
  cookTime?: number;
  /** Total time in minutes */
  totalTime?: number;
  /** Number of servings */
  servings?: number;
  /** Difficulty level */
  difficulty?: RecipeCardDifficulty;
  /** Cuisine type */
  cuisine?: string | null;
  /** Average rating (0-5) */
  rating?: number | null;
  /** Number of ratings */
  ratingCount?: number;
  /** Recipe tags */
  tags?: RecipeTagItem[];
  /** Badge text (e.g., "New", "Popular") */
  badge?: string;
  /** Badge variant */
  badgeVariant?: 'primary' | 'success' | 'warning' | 'error';
}

/**
 * Display type for RecipeSection
 */
export type RecipeSectionDisplayType = 'carousel' | 'grid';

/**
 * Base RecipeSection props
 */
export interface RecipeSectionPropsBase {
  /** Section title */
  title?: string;
  /** Title variant */
  titleVariant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Icon name to display before title */
  icon?: string;
  /** Icon color */
  iconColor?: string;
  /** Recipe items to display */
  items: RecipeSectionItem[];
  /** Display type - carousel or grid */
  displayType?: RecipeSectionDisplayType;
  /** Show "See All" button at bottom */
  showSeeAll?: boolean;
  /** "See All" button text */
  seeAllText?: string;
  /** Total count of items (for "See all X recipes" display) */
  totalCount?: number;
  /** Callback when "See All" is pressed */
  onSeeAllPress?: () => void;
  /** Callback when a recipe is pressed */
  onRecipePress?: (recipeId: string) => void;
  /** Recipe card width (for carousel) */
  cardWidth?: number;
  /** Grid columns (for grid display type) */
  columns?: number;
  /** Gap between items */
  gap?: number;
  /** Additional CSS class (web only) */
  className?: string;
  /** Test ID */
  testID?: string;
}
