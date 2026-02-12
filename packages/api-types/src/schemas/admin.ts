import { z } from "zod";

// ============================================================================
// ADMIN DASHBOARD SCHEMAS
// ============================================================================

/** Admin dashboard KPI summary. */
export const DashboardStatsSchema = z.object({
  stats: z.object({
    totalCustomers: z.number().int().nonnegative(),
    totalProducts: z.number().int().nonnegative(),
    todayOrders: z.number().int().nonnegative(),
    pendingOrders: z.number().int().nonnegative(),
    totalRevenue: z.number().nonnegative(),
  }),
}).readonly();

/** Revenue data for a single day. */
export const RevenueByDaySchema = z.object({
  /** YYYY-MM-DD */
  date: z.string().date(),
  revenue: z.number().nonnegative(),
  orderCount: z.number().int().nonnegative(),
}).readonly();

/** Revenue report with daily breakdown. */
export const RevenueReportSchema = z.object({
  period: z.object({
    /** YYYY-MM-DD */
    from: z.string().date(),
    /** YYYY-MM-DD */
    to: z.string().date(),
  }),
  totalRevenue: z.number().nonnegative(),
  totalOrders: z.number().int().nonnegative(),
  averageOrderValue: z.number().nonnegative(),
  byDay: z.array(RevenueByDaySchema),
}).readonly();

/** Top-selling product in a reporting period. */
export const TopProductSchema = z.object({
  productId: z.string().uuid(),
  productName: z.string().max(255),
  totalQuantity: z.number().int().nonnegative(),
  totalRevenue: z.number().nonnegative(),
}).readonly();

/** Top products response with reporting period. */
export const TopProductsResponseSchema = z.object({
  products: z.array(TopProductSchema),
  period: z.object({
    from: z.string().date(),
    to: z.string().date(),
  }),
}).readonly();

// ============================================================================
// REQUEST SCHEMAS
// ============================================================================

/** Query params for admin reports. */
export const ReportQuerySchema = z.object({
  /** YYYY-MM-DD start date */
  from: z.string().date("Invalid date format (expected YYYY-MM-DD)"),
  /** YYYY-MM-DD end date */
  to: z.string().date("Invalid date format (expected YYYY-MM-DD)"),
  limit: z.coerce.number().int().min(1).max(100).default(10),
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
