// ============================================================================
// API ENDPOINT CONSTANTS
// Type-safe endpoint paths for use in both frontend and backend
// ============================================================================

export const API_VERSION = "v1";
export const API_BASE = `/api/${API_VERSION}`;

// ============================================================================
// ENDPOINT DEFINITIONS
// ============================================================================

export const ENDPOINTS = {
  // Health & Status
  health: `${API_BASE}/health`,

  // Authentication
  auth: {
    me: `${API_BASE}/auth/me`,
  },

  // Categories
  categories: {
    list: `${API_BASE}/categories`,
    byId: (id: string) => `${API_BASE}/categories/${id}`,
    bySlug: (slug: string) => `${API_BASE}/categories/slug/${slug}`,
    products: (id: string) => `${API_BASE}/categories/${id}/products`,
  },

  // Brands
  brands: {
    list: `${API_BASE}/brands`,
    byId: (id: string) => `${API_BASE}/brands/${id}`,
    bySlug: (slug: string) => `${API_BASE}/brands/slug/${slug}`,
    products: (id: string) => `${API_BASE}/brands/${id}/products`,
  },

  // Products
  products: {
    list: `${API_BASE}/products`,
    byId: (id: string) => `${API_BASE}/products/${id}`,
    bySlug: (slug: string) => `${API_BASE}/products/slug/${slug}`,
    search: `${API_BASE}/search`, // General search endpoint
  },

  // Customer
  customer: {
    profile: `${API_BASE}/customer/profile`,
    addresses: {
      list: `${API_BASE}/customer/addresses`,
      byId: (id: string) => `${API_BASE}/customer/addresses/${id}`,
      setDefault: (id: string) => `${API_BASE}/customer/addresses/${id}/default`,
    },
    favorites: {
      list: `${API_BASE}/customer/favorites`,
      toggle: (productId: string) => `${API_BASE}/customer/favorites/${productId}`,
    },
    consent: `${API_BASE}/customer/consent`,
  },

  // Cart
  cart: {
    get: `${API_BASE}/cart`,
    items: `${API_BASE}/cart/items`,
    itemById: (id: string) => `${API_BASE}/cart/items/${id}`,
    clear: `${API_BASE}/cart/clear`,
    applyCoupon: `${API_BASE}/cart/coupon`,
    removeCoupon: `${API_BASE}/cart/coupon`,
  },

  // Orders
  orders: {
    list: `${API_BASE}/orders`,
    byId: (id: string) => `${API_BASE}/orders/${id}`,
    create: `${API_BASE}/orders`,
    cancel: (id: string) => `${API_BASE}/orders/${id}/cancel`,
  },

  // Delivery Slots
  delivery: {
    slots: `${API_BASE}/delivery/slots`,
    slotById: (id: string) => `${API_BASE}/delivery/slots/${id}`,
  },

  // Payments (Stripe)
  payments: {
    methods: `${API_BASE}/payments/methods`,
    createIntent: `${API_BASE}/payments/create-intent`,
    confirmPayment: `${API_BASE}/payments/confirm`,
  },

  // Search
  search: {
    products: `${API_BASE}/search`, // General search endpoint
    suggestions: `${API_BASE}/search/suggestions`,
  },

  // Stores (public)
  stores: {
    list: `${API_BASE}/stores`,
    byId: (id: string) => `${API_BASE}/stores/${id}`,
    bySlug: (slug: string) => `${API_BASE}/stores/slug/${slug}`,
    nearest: `${API_BASE}/stores/nearest`,
    checkServiceability: `${API_BASE}/stores/check-serviceability`,
  },

  // Pages/Tabs (Navigation with configurable sections)
  pages: {
    tabs: `${API_BASE}/pages/tabs`,
    tabSections: (slug: string) => `${API_BASE}/pages/tabs/${slug}/sections`,
  },

  // Content (Stories, Banners, Recipes)
  content: {
    stories: `${API_BASE}/content/stories`,
    storyView: (storyId: string) => `${API_BASE}/content/stories/${storyId}/view`,
    banners: `${API_BASE}/content/banners`,
    bannerClick: (bannerId: string) => `${API_BASE}/content/banners/${bannerId}/click`,
    recipes: {
      list: `${API_BASE}/content/recipes`,
      byId: (id: string) => `${API_BASE}/content/recipes/${id}`,
      bySlug: (slug: string) => `${API_BASE}/content/recipes/slug/${slug}`,
      categories: `${API_BASE}/content/recipes/categories`,
      bookmark: (id: string) => `${API_BASE}/content/recipes/${id}/bookmark`,
      reviews: (id: string) => `${API_BASE}/content/recipes/${id}/reviews`,
    },
    bookmarks: `${API_BASE}/content/recipes/bookmarks`,
  },

  // Admin endpoints
  admin: {
    dashboard: {
      stats: `${API_BASE}/admin/dashboard/stats`,
      revenue: `${API_BASE}/admin/dashboard/revenue`,
      topProducts: `${API_BASE}/admin/dashboard/top-products`,
    },
    customers: {
      list: `${API_BASE}/admin/customers`,
      byId: (id: string) => `${API_BASE}/admin/customers/${id}`,
    },
    products: {
      list: `${API_BASE}/admin/products`,
      byId: (id: string) => `${API_BASE}/admin/products/${id}`,
      create: `${API_BASE}/admin/products`,
    },
    categories: {
      list: `${API_BASE}/admin/categories`,
      byId: (id: string) => `${API_BASE}/admin/categories/${id}`,
      create: `${API_BASE}/admin/categories`,
    },
    brands: {
      list: `${API_BASE}/admin/brands`,
      byId: (id: string) => `${API_BASE}/admin/brands/${id}`,
      create: `${API_BASE}/admin/brands`,
    },
    orders: {
      list: `${API_BASE}/admin/orders`,
      byId: (id: string) => `${API_BASE}/admin/orders/${id}`,
      updateStatus: (id: string) => `${API_BASE}/admin/orders/${id}/status`,
    },
    inventory: {
      list: `${API_BASE}/admin/inventory`,
      byProductId: (id: string) => `${API_BASE}/admin/inventory/${id}`,
      adjust: `${API_BASE}/admin/inventory/adjust`,
      bulkAdjust: `${API_BASE}/admin/inventory/bulk-adjust`,
      lowStock: `${API_BASE}/admin/inventory/low-stock`,
      logs: (productId: string) => `${API_BASE}/admin/inventory/${productId}/logs`,
    },
    deliverySlots: {
      list: `${API_BASE}/admin/delivery-slots`,
      byId: (id: string) => `${API_BASE}/admin/delivery-slots/${id}`,
      create: `${API_BASE}/admin/delivery-slots`,
    },
    stores: {
      list: `${API_BASE}/admin/stores`,
      byId: (id: string) => `${API_BASE}/admin/stores/${id}`,
      create: `${API_BASE}/admin/stores`,
      inventory: (storeId: string) => `${API_BASE}/admin/stores/${storeId}/inventory`,
      inventoryByProduct: (storeId: string, productId: string) =>
        `${API_BASE}/admin/stores/${storeId}/inventory/${productId}`,
      inventoryAdjust: (storeId: string) => `${API_BASE}/admin/stores/${storeId}/inventory/adjust`,
      inventoryBulkAdjust: (storeId: string) => `${API_BASE}/admin/stores/${storeId}/inventory/bulk-adjust`,
      lowStock: (storeId: string) => `${API_BASE}/admin/stores/${storeId}/inventory/low-stock`,
      deliverySlots: (storeId: string) => `${API_BASE}/admin/stores/${storeId}/delivery-slots`,
      products: (storeId: string) => `${API_BASE}/admin/stores/${storeId}/products`,
      productOverride: (storeId: string, productId: string) =>
        `${API_BASE}/admin/stores/${storeId}/products/${productId}`,
    },
  },
} as const;

// ============================================================================
// TYPE HELPERS
// ============================================================================

export type EndpointPath = string;

// Helper to get all static endpoints (for documentation/testing)
export function getAllStaticEndpoints(): string[] {
  const endpoints: string[] = [];

  function traverse(obj: unknown, prefix = ""): void {
    if (typeof obj === "string") {
      endpoints.push(obj);
    } else if (typeof obj === "object" && obj !== null) {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === "function") {
          // Skip dynamic endpoints
          continue;
        }
        traverse(value, `${prefix}.${key}`);
      }
    }
  }

  traverse(ENDPOINTS);
  return endpoints;
}
