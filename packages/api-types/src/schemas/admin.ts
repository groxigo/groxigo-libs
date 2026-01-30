import { z } from "zod";

// ============================================================================
// ADMIN DASHBOARD SCHEMAS
// ============================================================================

export const DashboardStatsSchema = z.object({
  stats: z.object({
    totalCustomers: z.number(),
    totalProducts: z.number(),
    todayOrders: z.number(),
    pendingOrders: z.number(),
    totalRevenue: z.number(),
  }),
});

export const RevenueByDaySchema = z.object({
  date: z.string().date(),
  revenue: z.number(),
  orderCount: z.number(),
});

export const RevenueReportSchema = z.object({
  period: z.object({
    from: z.string().date(),
    to: z.string().date(),
  }),
  totalRevenue: z.number(),
  totalOrders: z.number(),
  averageOrderValue: z.number(),
  byDay: z.array(RevenueByDaySchema),
});

export const TopProductSchema = z.object({
  productId: z.string().uuid(),
  productName: z.string(),
  totalQuantity: z.number(),
  totalRevenue: z.number(),
});

export const TopProductsResponseSchema = z.object({
  products: z.array(TopProductSchema),
  period: z.object({
    from: z.string().date(),
    to: z.string().date(),
  }),
});

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

export const ReportQuerySchema = z.object({
  from: z.string().date(),
  to: z.string().date(),
  limit: z.coerce.number().min(1).max(100).default(10),
});

// ============================================================================
// INFERRED TYPES
// ============================================================================

export type DashboardStats = z.infer<typeof DashboardStatsSchema>;
export type RevenueByDay = z.infer<typeof RevenueByDaySchema>;
export type RevenueReport = z.infer<typeof RevenueReportSchema>;
export type TopProduct = z.infer<typeof TopProductSchema>;
export type TopProductsResponse = z.infer<typeof TopProductsResponseSchema>;
export type ReportQuery = z.infer<typeof ReportQuerySchema>;
