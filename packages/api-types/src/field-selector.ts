/**
 * Field Selector Helper
 *
 * Builds ?fields= query strings for API requests to reduce response payload sizes.
 * Used by mobile and web clients to request only needed fields.
 *
 * @example
 * ```typescript
 * import { buildFieldsQuery, CATEGORY_FIELDS } from '@groxigo/api-types';
 *
 * // Using pre-defined field selections
 * const url = `/categories?fields=${CATEGORY_FIELDS.navigation}`;
 *
 * // Building custom field selection
 * const fields = buildFieldsQuery({
 *   id: true,
 *   name: true,
 *   children: { id: true, name: true, slug: true }
 * });
 * // Result: "id,name,children(id,name,slug)"
 * ```
 */

interface FieldSelection {
  [key: string]: true | FieldSelection;
}

/**
 * Builds a fields query string from a field selection object
 *
 * @param selection - Object where keys are field names and values are either:
 *   - `true` to include the field
 *   - A nested object for nested field selection
 * @returns Query string for ?fields= parameter
 *
 * @example
 * buildFieldsQuery({
 *   id: true,
 *   name: true,
 *   children: { id: true, name: true }
 * })
 * // Returns: "id,name,children(id,name)"
 */
export function buildFieldsQuery(selection: FieldSelection): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(selection)) {
    if (value === true) {
      parts.push(key);
    } else if (typeof value === "object" && value !== null) {
      const nested = buildFieldsQuery(value);
      parts.push(`${key}(${nested})`);
    }
  }

  return parts.join(",");
}

// =============================================================================
// Pre-defined Field Selections
// =============================================================================

/**
 * Pre-defined field selections for categories
 */
export const CATEGORY_FIELDS = {
  /** Minimal fields for navigation/sidebar (id, name, slug, imageUrl, children) */
  navigation: buildFieldsQuery({
    id: true,
    name: true,
    slug: true,
    imageUrl: true,
    children: {
      id: true,
      name: true,
      slug: true,
      imageUrl: true,
      children: {
        id: true,
        name: true,
        slug: true,
        imageUrl: true,
      },
    },
  }),

  /** Fields for category cards/grid */
  card: buildFieldsQuery({
    id: true,
    name: true,
    slug: true,
    imageUrl: true,
  }),

  /** Fields for category with product count */
  withCount: buildFieldsQuery({
    id: true,
    name: true,
    slug: true,
    imageUrl: true,
    productCount: true,
  }),
} as const;

/**
 * Pre-defined field selections for products
 */
export const PRODUCT_FIELDS = {
  /** Minimal fields for product cards */
  card: buildFieldsQuery({
    id: true,
    name: true,
    slug: true,
    price: true,
    compareAtPrice: true,
    isAvailable: true,
    unit: true,
    unitSize: true,
  }),

  /** Fields for product list with brand */
  list: buildFieldsQuery({
    id: true,
    name: true,
    slug: true,
    price: true,
    compareAtPrice: true,
    isAvailable: true,
    unit: true,
    unitSize: true,
    brandId: true,
  }),

  /** Fields for cart items */
  cart: buildFieldsQuery({
    id: true,
    name: true,
    price: true,
    compareAtPrice: true,
    isAvailable: true,
    unit: true,
    unitSize: true,
  }),
} as const;

/**
 * Pre-defined field selections for stores
 */
export const STORE_FIELDS = {
  /** Minimal fields for store selection */
  selector: buildFieldsQuery({
    id: true,
    name: true,
    slug: true,
    city: true,
    state: true,
  }),
} as const;

/**
 * Pre-defined field selections for pages/tabs
 */
export const PAGE_FIELDS = {
  /** Fields for tab navigation */
  tabs: buildFieldsQuery({
    id: true,
    title: true,
    slug: true,
    icon: true,
  }),

  /** Fields for page sections */
  sections: buildFieldsQuery({
    id: true,
    title: true,
    sectionType: true,
    items: {
      id: true,
      name: true,
      imageUrl: true,
    },
  }),
} as const;
