/**
 * SDUI Component Catalog
 *
 * Defines all available section components for server-driven UI.
 * This is the single source of truth for both API and UI.
 *
 * When adding a new section type:
 * 1. Add it to SectionComponentType
 * 2. Add metadata to SECTION_COMPONENTS
 * 3. Implement the renderer in the UI
 */

/**
 * Available section component types
 */
export type SectionComponentType =
  | 'ProductSection'
  | 'CategorySection'
  | 'BrandSection'
  | 'BannerSection'
  | 'StorySection'
  | 'DealSection'
  | 'RecipeSection'
  | 'RecipeCategorySection'
  | 'RecipeTagSection';

/**
 * Display type options for sections
 */
export type SectionDisplayType =
  | 'carousel'
  | 'grid'
  | 'grid_grouped'
  | 'list'
  | 'chips';

/**
 * Item type that a section renders
 */
export type SectionItemType =
  | 'product'
  | 'category'
  | 'brand'
  | 'banner'
  | 'story'
  | 'deal'
  | 'recipe'
  | 'recipe_category'
  | 'recipe_tag';

/**
 * Component metadata for admin UI and documentation
 */
export interface SectionComponentMeta {
  /** Component identifier */
  type: SectionComponentType;
  /** Display name for admin UI */
  name: string;
  /** Description for admin UI */
  description: string;
  /** What type of items this section renders */
  itemType: SectionItemType;
  /** Supported display types */
  supportedDisplayTypes: SectionDisplayType[];
  /** Default display type */
  defaultDisplayType: SectionDisplayType;
  /** Whether section supports "See All" action */
  supportsSeeAll: boolean;
  /** Whether section supports title */
  supportsTitle: boolean;
  /** Icon for admin UI (Ionicons name) */
  icon: string;
  /** Preview image URL for admin UI (optional) */
  previewUrl?: string;
}

/**
 * Component catalog - metadata for all available section components
 */
export const SECTION_COMPONENTS: Record<SectionComponentType, SectionComponentMeta> = {
  ProductSection: {
    type: 'ProductSection',
    name: 'Product Section',
    description: 'Displays products in a carousel or grid layout',
    itemType: 'product',
    supportedDisplayTypes: ['carousel', 'grid'],
    defaultDisplayType: 'carousel',
    supportsSeeAll: true,
    supportsTitle: true,
    icon: 'cube-outline',
  },
  CategorySection: {
    type: 'CategorySection',
    name: 'Category Section',
    description: 'Displays category tiles in a grid layout',
    itemType: 'category',
    supportedDisplayTypes: ['grid', 'grid_grouped'],
    defaultDisplayType: 'grid',
    supportsSeeAll: true,
    supportsTitle: true,
    icon: 'grid-outline',
  },
  BrandSection: {
    type: 'BrandSection',
    name: 'Brand Section',
    description: 'Displays brand logos in a carousel',
    itemType: 'brand',
    supportedDisplayTypes: ['carousel', 'grid'],
    defaultDisplayType: 'carousel',
    supportsSeeAll: true,
    supportsTitle: true,
    icon: 'pricetag-outline',
  },
  BannerSection: {
    type: 'BannerSection',
    name: 'Banner Section',
    description: 'Displays promotional banners in a carousel',
    itemType: 'banner',
    supportedDisplayTypes: ['carousel'],
    defaultDisplayType: 'carousel',
    supportsSeeAll: false,
    supportsTitle: false,
    icon: 'image-outline',
  },
  StorySection: {
    type: 'StorySection',
    name: 'Story Section',
    description: 'Displays Instagram-style stories',
    itemType: 'story',
    supportedDisplayTypes: ['carousel'],
    defaultDisplayType: 'carousel',
    supportsSeeAll: false,
    supportsTitle: false,
    icon: 'albums-outline',
  },
  DealSection: {
    type: 'DealSection',
    name: 'Deal Section',
    description: 'Displays deal/offer cards with countdown timers',
    itemType: 'deal',
    supportedDisplayTypes: ['carousel', 'grid'],
    defaultDisplayType: 'carousel',
    supportsSeeAll: true,
    supportsTitle: true,
    icon: 'flash-outline',
  },
  RecipeSection: {
    type: 'RecipeSection',
    name: 'Recipe Section',
    description: 'Displays recipe cards in a carousel or grid',
    itemType: 'recipe',
    supportedDisplayTypes: ['carousel', 'grid'],
    defaultDisplayType: 'carousel',
    supportsSeeAll: true,
    supportsTitle: true,
    icon: 'restaurant-outline',
  },
  RecipeCategorySection: {
    type: 'RecipeCategorySection',
    name: 'Recipe Category Section',
    description: 'Displays recipe category cards',
    itemType: 'recipe_category',
    supportedDisplayTypes: ['carousel', 'grid'],
    defaultDisplayType: 'carousel',
    supportsSeeAll: true,
    supportsTitle: true,
    icon: 'book-outline',
  },
  RecipeTagSection: {
    type: 'RecipeTagSection',
    name: 'Recipe Tag Section',
    description: 'Displays recipe tags as chips or cuisine grid',
    itemType: 'recipe_tag',
    supportedDisplayTypes: ['chips', 'grid'],
    defaultDisplayType: 'chips',
    supportsSeeAll: false,
    supportsTitle: true,
    icon: 'pricetags-outline',
  },
};

/**
 * Get all available section components
 */
export function getSectionComponents(): SectionComponentMeta[] {
  return Object.values(SECTION_COMPONENTS);
}

/**
 * Get component metadata by type
 */
export function getSectionComponentMeta(type: SectionComponentType): SectionComponentMeta | undefined {
  return SECTION_COMPONENTS[type];
}

/**
 * Check if a component type is valid
 */
export function isValidSectionComponent(type: string): type is SectionComponentType {
  return type in SECTION_COMPONENTS;
}

/**
 * Get supported display types for a component
 */
export function getSupportedDisplayTypes(type: SectionComponentType): SectionDisplayType[] {
  return SECTION_COMPONENTS[type]?.supportedDisplayTypes || [];
}

/**
 * Mapping from legacy sectionType to new component type
 * Used for backward compatibility with existing API responses
 */
export const LEGACY_SECTION_TYPE_MAP: Record<string, SectionComponentType> = {
  products: 'ProductSection',
  collection: 'ProductSection',
  categories: 'CategorySection',
  brands: 'BrandSection',
  banner: 'BannerSection',
  banners: 'BannerSection',
  stories: 'StorySection',
  deal_section: 'DealSection',
  deals: 'DealSection',
  recipes: 'RecipeSection',
  recipe_categories: 'RecipeCategorySection',
  recipe_tags: 'RecipeTagSection',
};

/**
 * Convert legacy sectionType to component type
 */
export function resolveComponentType(sectionType: string, component?: string): SectionComponentType | undefined {
  // If component is explicitly specified, use it
  if (component && isValidSectionComponent(component)) {
    return component;
  }
  // Fall back to legacy mapping
  return LEGACY_SECTION_TYPE_MAP[sectionType];
}
