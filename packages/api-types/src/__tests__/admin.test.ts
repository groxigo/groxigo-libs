import { describe, it, expect } from "vitest";
import {
  DashboardStatsSchema,
  RevenueByDaySchema,
  RevenueReportSchema,
  TopProductSchema,
  TopProductsResponseSchema,
  ReportQuerySchema,
} from "../schemas/admin";

describe("DashboardStatsSchema", () => {
  it("accepts valid dashboard stats", () => {
    const data = {
      stats: {
        totalCustomers: 1200,
        totalProducts: 450,
        todayOrders: 35,
        pendingOrders: 8,
        totalRevenue: 125000.50,
      },
    };
    const result = DashboardStatsSchema.parse(data);
    expect(result.stats.totalCustomers).toBe(1200);
    expect(result.stats.totalRevenue).toBe(125000.50);
  });

  it("rejects negative totalCustomers", () => {
    expect(() => DashboardStatsSchema.parse({
      stats: { totalCustomers: -1, totalProducts: 0, todayOrders: 0, pendingOrders: 0, totalRevenue: 0 },
    })).toThrow();
  });

  it("rejects negative totalRevenue", () => {
    expect(() => DashboardStatsSchema.parse({
      stats: { totalCustomers: 0, totalProducts: 0, todayOrders: 0, pendingOrders: 0, totalRevenue: -100 },
    })).toThrow();
  });

  it("rejects fractional order counts", () => {
    expect(() => DashboardStatsSchema.parse({
      stats: { totalCustomers: 0, totalProducts: 0, todayOrders: 1.5, pendingOrders: 0, totalRevenue: 0 },
    })).toThrow();
  });
});

describe("RevenueByDaySchema", () => {
  it("accepts valid daily revenue", () => {
    const data = { date: "2026-01-15", revenue: 4500.00, orderCount: 23 };
    const result = RevenueByDaySchema.parse(data);
    expect(result.date).toBe("2026-01-15");
    expect(result.orderCount).toBe(23);
  });

  it("rejects invalid date format", () => {
    expect(() => RevenueByDaySchema.parse({
      date: "Jan 15, 2026", revenue: 100, orderCount: 1,
    })).toThrow();
  });

  it("rejects negative revenue", () => {
    expect(() => RevenueByDaySchema.parse({
      date: "2026-01-15", revenue: -50, orderCount: 0,
    })).toThrow();
  });
});

describe("RevenueReportSchema", () => {
  it("accepts valid revenue report", () => {
    const data = {
      period: { from: "2026-01-01", to: "2026-01-31" },
      totalRevenue: 45000,
      totalOrders: 320,
      averageOrderValue: 140.63,
      byDay: [
        { date: "2026-01-01", revenue: 1500, orderCount: 10 },
        { date: "2026-01-02", revenue: 1800, orderCount: 12 },
      ],
    };
    const result = RevenueReportSchema.parse(data);
    expect(result.totalOrders).toBe(320);
    expect(result.byDay).toHaveLength(2);
  });

  it("accepts empty byDay array", () => {
    const data = {
      period: { from: "2026-01-01", to: "2026-01-01" },
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      byDay: [],
    };
    expect(RevenueReportSchema.parse(data).byDay).toHaveLength(0);
  });
});

describe("TopProductSchema", () => {
  it("accepts valid top product", () => {
    const data = {
      productId: "550e8400-e29b-41d4-a716-446655440000",
      productName: "Basmati Rice 5kg",
      totalQuantity: 250,
      totalRevenue: 3250.00,
    };
    const result = TopProductSchema.parse(data);
    expect(result.productName).toBe("Basmati Rice 5kg");
    expect(result.totalQuantity).toBe(250);
  });

  it("rejects non-UUID productId", () => {
    expect(() => TopProductSchema.parse({
      productId: "abc",
      productName: "Test",
      totalQuantity: 1,
      totalRevenue: 10,
    })).toThrow();
  });

  it("rejects productName exceeding 255 chars", () => {
    expect(() => TopProductSchema.parse({
      productId: "550e8400-e29b-41d4-a716-446655440000",
      productName: "x".repeat(256),
      totalQuantity: 1,
      totalRevenue: 10,
    })).toThrow();
  });
});

describe("TopProductsResponseSchema", () => {
  it("wraps products with period", () => {
    const data = {
      products: [{
        productId: "550e8400-e29b-41d4-a716-446655440000",
        productName: "Ghee",
        totalQuantity: 100,
        totalRevenue: 999.00,
      }],
      period: { from: "2026-01-01", to: "2026-01-31" },
    };
    const result = TopProductsResponseSchema.parse(data);
    expect(result.products).toHaveLength(1);
    expect(result.period.from).toBe("2026-01-01");
  });
});

describe("ReportQuerySchema", () => {
  it("accepts valid date range with defaults", () => {
    const result = ReportQuerySchema.parse({ from: "2026-01-01", to: "2026-01-31" });
    expect(result.limit).toBe(10);
  });

  it("coerces limit from string", () => {
    const result = ReportQuerySchema.parse({ from: "2026-01-01", to: "2026-01-31", limit: "25" });
    expect(result.limit).toBe(25);
  });

  it("rejects invalid date format", () => {
    expect(() => ReportQuerySchema.parse({ from: "not-a-date", to: "2026-01-31" })).toThrow();
  });

  it("rejects limit > 100", () => {
    expect(() => ReportQuerySchema.parse({ from: "2026-01-01", to: "2026-01-31", limit: 101 })).toThrow();
  });

  it("rejects limit < 1", () => {
    expect(() => ReportQuerySchema.parse({ from: "2026-01-01", to: "2026-01-31", limit: 0 })).toThrow();
  });
});
