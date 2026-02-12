import { describe, it, expect } from "vitest";
import { ENDPOINTS, API_VERSION, API_BASE, getAllStaticEndpoints } from "../endpoints";

describe("API constants", () => {
  it("API_VERSION is v1", () => {
    expect(API_VERSION).toBe("v1");
  });

  it("API_BASE includes version", () => {
    expect(API_BASE).toBe("/api/v1");
  });
});

describe("ENDPOINTS", () => {
  it("health endpoint is a string", () => {
    expect(ENDPOINTS.health).toBe("/api/v1/health");
  });

  it("dynamic endpoints return correct paths", () => {
    const id = "550e8400-e29b-41d4-a716-446655440000";
    expect(ENDPOINTS.categories.byId(id)).toBe(`/api/v1/categories/${id}`);
    expect(ENDPOINTS.products.bySlug("organic-milk")).toBe("/api/v1/products/slug/organic-milk");
    expect(ENDPOINTS.orders.cancel(id)).toBe(`/api/v1/orders/${id}/cancel`);
  });

  it("admin store inventory endpoint accepts two params", () => {
    const storeId = "store-1";
    const productId = "prod-1";
    expect(ENDPOINTS.admin.stores.inventoryByProduct(storeId, productId)).toBe(
      `/api/v1/admin/stores/${storeId}/inventory/${productId}`,
    );
  });
});

describe("getAllStaticEndpoints", () => {
  it("returns array of strings", () => {
    const endpoints = getAllStaticEndpoints();
    expect(Array.isArray(endpoints)).toBe(true);
    expect(endpoints.length).toBeGreaterThan(0);
    for (const ep of endpoints) {
      expect(typeof ep).toBe("string");
      expect(ep).toMatch(/^\/api\/v1\//);
    }
  });

  it("excludes dynamic endpoints (functions)", () => {
    const endpoints = getAllStaticEndpoints();
    // Dynamic endpoints like byId(id) should not appear
    for (const ep of endpoints) {
      expect(ep).not.toContain("undefined");
    }
  });
});
