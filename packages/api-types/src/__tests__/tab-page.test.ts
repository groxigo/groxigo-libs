import { describe, it, expect } from "vitest";
import {
  SectionTypeSchema,
  SectionComponentSchema,
  DisplayTypeSchema,
  ProductSectionItemSchema,
  StorySectionItemSchema,
  BannerSectionItemSchema,
  RecipeSectionItemSchema,
  HeroSectionItemSchema,
  StepSectionItemSchema,
  PillarSectionItemSchema,
  TrustStatSectionItemSchema,
  SectionSchema,
  TabPageSchema,
  TabSectionsResponseSchema,
} from "../schemas/tab-page";

describe("SectionTypeSchema", () => {
  it("accepts all valid section types", () => {
    const types = [
      "stories", "banner", "deal_section", "collection", "categories",
      "products", "brands", "recipes", "recipe_categories", "recipe_tags",
      "hero", "steps", "pillars", "trust_bar",
    ];
    for (const t of types) {
      expect(SectionTypeSchema.parse(t)).toBe(t);
    }
  });

  it("rejects invalid section type", () => {
    expect(() => SectionTypeSchema.parse("unknown_type")).toThrow();
  });
});

describe("SectionComponentSchema", () => {
  it("accepts all 13 SDUI components", () => {
    const components = [
      "ProductSection", "CategorySection", "BrandSection", "BannerSection",
      "StorySection", "DealSection", "RecipeSection", "RecipeCategorySection",
      "RecipeTagSection",
      "HeroSection", "StepSection", "PillarSection", "TrustBarSection",
    ];
    for (const c of components) {
      expect(SectionComponentSchema.parse(c)).toBe(c);
    }
  });

  it("rejects invalid component", () => {
    expect(() => SectionComponentSchema.parse("UnknownSection")).toThrow();
  });
});

describe("DisplayTypeSchema", () => {
  it("accepts all display types including landing page types", () => {
    const types = [
      "horizontal_scroll", "grid_2x2", "grid_3x3", "carousel",
      "banner_full", "list", "full_width", "inline",
    ];
    for (const t of types) {
      expect(DisplayTypeSchema.parse(t)).toBe(t);
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

// ============================================================================
// LANDING PAGE SECTION ITEMS
// ============================================================================

describe("HeroSectionItemSchema", () => {
  it("accepts full hero item", () => {
    const item = {
      id: "hero-1",
      headline: "Fresh South Asian & Middle Eastern Groceries",
      subheadline: "Delivered to your door same-day",
      backgroundImage: "https://example.com/hero-bg.jpg",
      ctaLabel: "Get Started",
      emailPlaceholder: "Enter your email",
      dividerText: "or",
    };
    const result = HeroSectionItemSchema.parse(item);
    expect(result.headline).toBe("Fresh South Asian & Middle Eastern Groceries");
    expect(result.ctaLabel).toBe("Get Started");
  });

  it("accepts minimal hero item", () => {
    const item = {
      id: "hero-2",
      headline: "Welcome to Groxigo",
      subheadline: "Your neighbourhood grocery store, online",
    };
    const result = HeroSectionItemSchema.parse(item);
    expect(result.backgroundImage).toBeUndefined();
  });
});

describe("StepSectionItemSchema", () => {
  it("accepts step with number and icon", () => {
    const item = {
      id: "step-1",
      title: "Browse & Add to Cart",
      description: "Search from 2,000+ South Asian & Middle Eastern products",
      icon: "ShoppingCart",
      stepNumber: 1,
    };
    const result = StepSectionItemSchema.parse(item);
    expect(result.stepNumber).toBe(1);
    expect(result.title).toBe("Browse & Add to Cart");
  });

  it("rejects non-positive step number", () => {
    expect(() =>
      StepSectionItemSchema.parse({
        id: "step-x",
        title: "Bad Step",
        description: "Desc",
        stepNumber: 0,
      }),
    ).toThrow();
  });
});

describe("PillarSectionItemSchema", () => {
  it("accepts pillar card data", () => {
    const item = {
      id: "pillar-1",
      title: "2,000+ Authentic Products",
      description: "From brands you trust, sourced directly from South Asia and the Middle East.",
      ctaLabel: "Browse Products →",
      ctaHref: "/products",
      imageUrl: "https://example.com/pillar-products.jpg",
    };
    const result = PillarSectionItemSchema.parse(item);
    expect(result.ctaHref).toBe("/products");
  });

  it("accepts pillar without image", () => {
    const item = {
      id: "pillar-2",
      title: "Same-Day Delivery",
      description: "Order by noon, delivered by evening.",
      ctaLabel: "Learn More",
      ctaHref: "/about",
    };
    expect(PillarSectionItemSchema.parse(item).imageUrl).toBeUndefined();
  });
});

describe("TrustStatSectionItemSchema", () => {
  it("accepts trust stat with value", () => {
    const item = {
      id: "trust-1",
      label: "4.8★ average rating",
      icon: "Star",
      value: 4.8,
    };
    const result = TrustStatSectionItemSchema.parse(item);
    expect(result.value).toBe(4.8);
  });

  it("accepts trust stat without value", () => {
    const item = {
      id: "trust-2",
      label: "Same-day delivery",
      icon: "Truck",
    };
    const result = TrustStatSectionItemSchema.parse(item);
    expect(result.label).toBe("Same-day delivery");
    expect(result.value).toBeUndefined();
  });
});

// ============================================================================
// SECTION & TAB SCHEMAS
// ============================================================================

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

  it("accepts hero section with full_width display", () => {
    const section = {
      id: "sec-hero",
      title: "",
      subtitle: null,
      icon: null,
      sectionType: "hero" as const,
      component: "HeroSection" as const,
      displayType: "full_width" as const,
      showViewAll: false,
      viewAllLink: null,
      backgroundColor: null,
      items: [
        {
          id: "hero-1",
          headline: "Welcome",
          subheadline: "Fresh groceries delivered",
        },
      ],
    };
    expect(SectionSchema.parse(section).component).toBe("HeroSection");
  });

  it("accepts trust bar section with inline display", () => {
    const section = {
      id: "sec-trust",
      title: "",
      subtitle: null,
      icon: null,
      sectionType: "trust_bar" as const,
      component: "TrustBarSection" as const,
      displayType: "inline" as const,
      showViewAll: false,
      viewAllLink: null,
      backgroundColor: null,
      items: [
        { id: "t1", label: "Same-day delivery" },
        { id: "t2", label: "4.8★ rating", value: 4.8 },
      ],
    };
    const result = SectionSchema.parse(section);
    expect(result.items).toHaveLength(2);
    expect(result.displayType).toBe("inline");
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
