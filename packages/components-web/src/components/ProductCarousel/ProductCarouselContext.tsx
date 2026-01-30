/**
 * ProductCarouselContext (Web)
 *
 * Context provider for product carousel navigation.
 * Enables swipe/navigation between products on the product detail page.
 *
 * This is a direct port from mobile - pure React Context with no platform-specific code.
 */

'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

/**
 * Minimal product info needed for carousel navigation
 */
export interface CarouselProduct {
  id: string;
  name: string;
  imageUrl: string | null;
  price: number;
  compareAtPrice?: number | null;
  unitSize?: string | null;
  unit?: string;
}

interface ProductCarouselContextType {
  /** Current list of products in the carousel */
  products: CarouselProduct[];
  /** Index of the currently displayed product */
  currentIndex: number;
  /** Set the carousel data with products and starting index */
  setCarouselData: (products: CarouselProduct[], index: number) => void;
  /** Clear all carousel data */
  clearCarouselData: () => void;
}

const ProductCarouselContext = createContext<ProductCarouselContextType | null>(null);

/**
 * Provider component that enables product carousel navigation.
 * Wrap your app or navigation container with this provider to enable
 * navigation between products on the product detail page.
 *
 * @example
 * ```tsx
 * // In your root layout
 * import { ProductCarouselProvider } from '@groxigo/components-web';
 *
 * export default function Layout({ children }) {
 *   return (
 *     <ProductCarouselProvider>
 *       {children}
 *     </ProductCarouselProvider>
 *   );
 * }
 *
 * // When opening a product from a list
 * const { setCarouselData } = useProductCarousel();
 *
 * const handleProductPress = (product, index) => {
 *   setCarouselData(products, index);
 *   router.push(`/product/${product.id}`);
 * };
 * ```
 */
export function ProductCarouselProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CarouselProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const setCarouselData = useCallback((newProducts: CarouselProduct[], index: number) => {
    setProducts(newProducts);
    setCurrentIndex(index);
  }, []);

  const clearCarouselData = useCallback(() => {
    setProducts([]);
    setCurrentIndex(0);
  }, []);

  return (
    <ProductCarouselContext.Provider
      value={{ products, currentIndex, setCarouselData, clearCarouselData }}
    >
      {children}
    </ProductCarouselContext.Provider>
  );
}

/**
 * Hook to access the product carousel context.
 * Throws an error if used outside of ProductCarouselProvider.
 *
 * @example
 * ```tsx
 * const { products, currentIndex, setCarouselData } = useProductCarousel();
 * ```
 */
export function useProductCarousel() {
  const context = useContext(ProductCarouselContext);
  if (!context) {
    throw new Error('useProductCarousel must be used within ProductCarouselProvider');
  }
  return context;
}

/**
 * Optional hook that returns null if used outside of ProductCarouselProvider.
 * Use this when carousel functionality is optional (e.g., direct product links).
 *
 * @example
 * ```tsx
 * const carouselContext = useProductCarouselOptional();
 *
 * const handlePress = () => {
 *   if (carouselContext) {
 *     carouselContext.setCarouselData(products, index);
 *   }
 *   router.push(`/product/${id}`);
 * };
 * ```
 */
export function useProductCarouselOptional() {
  return useContext(ProductCarouselContext);
}
