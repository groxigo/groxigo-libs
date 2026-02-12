/**
 * RecipeCard Component Contract
 *
 * Platform-agnostic interface for RecipeCard component.
 */

export type RecipeCardDifficulty = 'easy' | 'medium' | 'hard';
export type RecipeCardBadgeVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info';
export type RecipeCardSize = 'sm' | 'md' | 'lg';
export type RecipeCardVariant = 'default' | 'compact' | 'horizontal';

/**
 * Recipe tag item
 */
export interface RecipeTagItem {
  /** Tag name */
  name: string;
  /** Tag type (cuisine, diet, etc.) */
  type?: string;
  /** Tag color (hex) */
  color?: string | null;
}

/**
 * Base RecipeCard props that all platforms must support
 */
export interface RecipeCardPropsBase {
  /** Recipe ID */
  id: string;
  /** Recipe title */
  title: string;
  /** Recipe image URL */
  imageUrl?: string;
  /** Recipe description */
  description?: string;
  /** Prep time in minutes */
  prepTime?: number;
  /** Cook time in minutes */
  cookTime?: number;
  /** Total time in minutes (overrides prepTime + cookTime) */
  totalTime?: number;
  /** Number of servings */
  servings?: number;
  /** Difficulty level */
  difficulty?: RecipeCardDifficulty;
  /** Cuisine type (e.g., "Indian", "Italian") */
  cuisine?: string | null;
  /** Average rating (0-5) */
  rating?: number | null;
  /** Number of ratings */
  ratingCount?: number;
  /** Recipe tags */
  tags?: RecipeTagItem[];
  /** Badge text (e.g., "New", "Popular") */
  badge?: string;
  /** Badge variant @default 'primary' */
  badgeVariant?: RecipeCardBadgeVariant;
  /** Card size @default 'md' */
  size?: RecipeCardSize;
  /** Card variant @default 'default' */
  variant?: RecipeCardVariant;
  /** Card width (for carousel layouts) */
  width?: number;
  /** Callback when card is pressed */
  onPress?: () => void;
  /** Test ID for testing */
  testID?: string;
}
