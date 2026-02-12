import { describe, it, expect } from "vitest";
import {
  buildFieldsQuery,
  CATEGORY_FIELDS,
  PRODUCT_FIELDS,
  STORE_FIELDS,
  PAGE_FIELDS,
} from "../field-selector";

describe("buildFieldsQuery", () => {
  it("builds flat field list", () => {
    const result = buildFieldsQuery({ id: true, name: true, slug: true });
    expect(result).toBe("id,name,slug");
  });

  it("builds nested field list", () => {
    const result = buildFieldsQuery({
      id: true,
      name: true,
      children: { id: true, name: true },
    });
    expect(result).toBe("id,name,children(id,name)");
  });

  it("handles deeply nested fields", () => {
    const result = buildFieldsQuery({
      id: true,
      children: { id: true, children: { id: true, name: true } },
    });
    expect(result).toBe("id,children(id,children(id,name))");
  });

  it("returns empty string for empty selection", () => {
    expect(buildFieldsQuery({})).toBe("");
  });
});

describe("CATEGORY_FIELDS", () => {
  it("navigation includes nested children", () => {
    expect(CATEGORY_FIELDS.navigation).toContain("children(");
    expect(CATEGORY_FIELDS.navigation).toContain("id");
  });

  it("card is flat", () => {
    expect(CATEGORY_FIELDS.card).not.toContain("(");
    expect(CATEGORY_FIELDS.card).toContain("id");
    expect(CATEGORY_FIELDS.card).toContain("name");
  });

  it("withCount includes productCount", () => {
    expect(CATEGORY_FIELDS.withCount).toContain("productCount");
  });
});

describe("PRODUCT_FIELDS", () => {
  it("card includes price and stock fields", () => {
    expect(PRODUCT_FIELDS.card).toContain("price");
    expect(PRODUCT_FIELDS.card).toContain("inStock");
  });

  it("list includes nested brand", () => {
    expect(PRODUCT_FIELDS.list).toContain("brand(");
  });

  it("cart is minimal", () => {
    expect(PRODUCT_FIELDS.cart).toContain("price");
    expect(PRODUCT_FIELDS.cart).not.toContain("brand");
  });
});

describe("STORE_FIELDS", () => {
  it("selector includes basic info", () => {
    expect(STORE_FIELDS.selector).toContain("id");
    expect(STORE_FIELDS.selector).toContain("name");
  });
});

describe("PAGE_FIELDS", () => {
  it("tabs includes icon", () => {
    expect(PAGE_FIELDS.tabs).toContain("iconName");
  });

  it("sections includes sectionType", () => {
    expect(PAGE_FIELDS.sections).toContain("sectionType");
  });
});
