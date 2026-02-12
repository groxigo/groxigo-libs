import { describe, it, expect } from "vitest";
import {
  SectionTypeSchema,
  SectionComponentSchema,
  DisplayTypeSchema,
  ProductSectionItemSchema,
  StorySectionItemSchema,
  BannerSectionItemSchema,
  RecipeSectionItemSchema,
  SectionSchema,
  TabPageSchema,
  TabSectionsResponseSchema,
} from "../schemas/tab-page";

describe("SectionTypeSchema", () => {
  it("accepts all valid section types", () => {
    const types = [
      "stories", "banner", "deal_section", "collection", "categories",
      "products", "brands", "recipes", "recipe_categories", "recipe_tags",
    ];
    for (const t of types) {
      expect(SectionTypeSchema.parse(t)).toBe(t);
    }
  });

  it("rejects invalid section type", () => {
    expect(() => SectionTypeSchema.parse("hero")).toThrow();
  });
});

describe("SectionComponentSchema", () => {
  it("accepts all SDUI components", () => {
    const components = [
      "ProductSection", "CategorySection", "BrandSection", "BannerSection",
      "StorySection", "DealSection", "RecipeSection", "RecipeCategorySection",
      "RecipeTagSection",
    ];
    for (const c of components) {
      expect(SectionComponentSchema.parse(c)).toBe(c);
    }
  });
});

describe("ProductSectionItemSchema", () => {
  it("accepts full product item", () => {
    const item = {
      id: "prod-1",
      name: "Basmati Rice",
      slug: "basmati-rice",
      price: 12.99,
      compareAtPrice: 15.99,
      imageUrl: "https://example.com/rice.jpg",
      unit: "kg",
      unitSize: "5 kg",
      brand: { id: "b1", name: "India Gate" },
      dietaryTags: ["gluten-free"],
      inStock: true,
    };
    const result = ProductSectionItemSchema.parse(item);
    expect(result.name).toBe("Basmati Rice");
    expect(result.brand?.name).toBe("India Gate");
  });

  it("accepts deal-specific fields", () => {
    const item = {
      id: "prod-2",
      name: "Ghee",
      slug: "ghee",
      price: 9.99,
      compareAtPrice: null,
      imageUrl: null,
      unit: "oz",
      unitSize: null,
      dealPrice: 7.99,
      discountPercent: 20,
      quantityLimit: 3,
    };
    expect(ProductSectionItemSchema.parse(item).dealPrice).toBe(7.99);
  });
});

describe("StorySectionItemSchema", () => {
  it("accepts story with slide items", () => {
    const item = {
      id: "story-1",
      title: "New Arrivals",
      thumbnailUrl: "https://example.com/thumb.jpg",
      hasUnviewed: true,
      items: [
        {
          id: "slide-1",
          type: "image" as const,
          mediaUrl: "https://example.com/slide.jpg",
          thumbnailUrl: null,
          duration: 5,
          linkType: null,
          linkId: null,
          linkText: null,
        },
      ],
    };
    expect(StorySectionItemSchema.parse(item).items).toHaveLength(1);
  });
});

describe("BannerSectionItemSchema", () => {
  it("accepts banner with optional styling", () => {
    const item = {
      id: "banner-1",
      title: "Weekend Sale",
      subtitle: "Up to 40% off",
      imageUrl: "https://example.com/banner.jpg",
      backgroundColor: "#FF5733",
      textColor: "#FFFFFF",
      linkType: "category",
      linkId: "cat-1",
    };
    expect(BannerSectionItemSchema.parse(item).title).toBe("Weekend Sale");
  });
});

describe("SectionSchema", () => {
  it("accepts full section with items", () => {
    const section = {
      id: "sec-1",
      title: "Popular Products",
      subtitle: null,
      icon: null,
      sectionType: "products" as const,
      component: "ProductSection" as const,
      displayType: "horizontal_scroll" as const,
      showViewAll: true,
      viewAllLink: "/products?popular=true",
      totalCount: 50,
      backgroundColor: null,
      items: [
        {
          id: "prod-1",
          name: "Test",
          slug: "test",
          price: 5,
          compareAtPrice: null,
          imageUrl: null,
          unit: "ea",
          unitSize: null,
        },
      ],
    };
    expect(SectionSchema.parse(section).items).toHaveLength(1);
  });

  it("accepts deal section with countdown", () => {
    const section = {
      id: "sec-2",
      title: "Flash Deal",
      subtitle: "Ends tonight!",
      icon: null,
      sectionType: "deal_section" as const,
      displayType: "carousel" as const,
      showViewAll: false,
      viewAllLink: null,
      backgroundColor: "#FFEB3B",
      endsAt: "2026-01-16T23:59:59Z",
      showCountdown: true,
      items: [],
    };
    expect(SectionSchema.parse(section).showCountdown).toBe(true);
  });
});

describe("TabPageSchema", () => {
  it("accepts valid tab page", () => {
    const tab = {
      id: "tab-1",
      slug: "home",
      title: "Home",
      icon: "home",
      isDefault: true,
      sortOrder: 0,
    };
    expect(TabPageSchema.parse(tab).slug).toBe("home");
  });
});

describe("TabSectionsResponseSchema", () => {
  it("accepts tab with sections", () => {
    const data = {
      tab: {
        id: "tab-1",
        slug: "home",
        title: "Home",
        icon: "home",
        isDefault: true,
        sortOrder: 0,
      },
      sections: [],
    };
    expect(TabSectionsResponseSchema.parse(data).sections).toHaveLength(0);
  });
});
