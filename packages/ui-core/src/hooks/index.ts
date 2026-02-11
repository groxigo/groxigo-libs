/**
 * Shared UI Hooks
 *
 * Platform-agnostic hooks for building UI components.
 * These work with both React Native and Web implementations.
 */

// State management
export {
  useControllable,
  type UseControllableOptions,
  type UseControllableReturn,
} from './useControllable';

export {
  useDisclosure,
  type UseDisclosureOptions,
  type UseDisclosureReturn,
} from './useDisclosure';

// Performance
export { useDebounce, useDebouncedCallback } from './useDebounce';
export { useThrottle, useThrottledCallback } from './useThrottle';

// Value tracking
export { usePrevious, usePreviousWithInitial, useCurrentAndPrevious } from './usePrevious';
export { useLatest } from './useLatest';

// Refs
export { useMergeRefs, mergeRefs } from './useMergeRefs';
export { useCallbackRef, useEventCallback } from './useCallbackRef';

// Utilities
export { useId, useIds, useSSRSafeId } from './useId';
export { useForceUpdate, useForceUpdateWithCount } from './useForceUpdate';

// Lifecycle
export { useUnmountEffect, useIsMounted } from './useUnmountEffect';
export { useUpdateEffect, useIsFirstRender } from './useUpdateEffect';

// Responsive
export {
  // Types
  type Breakpoint,
  type MediaQueryResult,
  type BreakpointValues,
  type ResponsiveValue,
  type UseMediaQueryOptions,
  type UseBreakpointReturn,
  type UseResponsiveValueOptions,
  type DeviceCategory,
  type DeviceResponsiveValue,
  type UseDeviceResponsiveValueOptions,
  // Constants
  defaultBreakpoints,
  // Utilities
  minWidth,
  maxWidth,
  between,
  getResponsiveValue,
  isResponsiveValue,
  // Hooks
  useMediaQuery,
  useBreakpoint,
  useResponsiveValue,
  useDeviceResponsiveValue,
} from './useMediaQuery';

// Device Type & Responsive Typography
export {
  // Types
  type DeviceType,
  type TypographyScale,
  type UseDeviceTypeReturn,
  // Constants
  TYPOGRAPHY_SCALES,
  // Utilities
  getFontScaleForDevice,
  getDeviceTypeFromDimensions,
  calculateFluidScale,
  // Hook
  useDeviceType,
} from './useDeviceType';

// Data Fetching
export {
  useInfiniteQuery,
  type InfiniteQueryResult,
  type CursorQueryResult,
  type UseInfiniteQueryOptions,
  type UseInfiniteQueryReturn,
} from './useInfiniteQuery';

// Pagination
export {
  usePagination,
  type UsePaginationOptions,
  type UsePaginationReturn,
} from './usePagination';

export {
  usePaginatedQuery,
  type PaginatedQueryResult,
  type UsePaginatedQueryOptions,
  type UsePaginatedQueryReturn,
} from './usePaginatedQuery';
