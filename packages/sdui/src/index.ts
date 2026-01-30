/**
 * @groxigo/sdui
 *
 * Server-Driven UI utilities for Groxigo applications.
 *
 * @example
 * ```tsx
 * import {
 *   SDUIProvider,
 *   SDUIRenderer,
 *   createRegistry,
 *   useSDUI
 * } from '@groxigo/sdui';
 * import { ProductCard, CartItem } from '@groxigo/components';
 *
 * // 1. Create component registry
 * const registry = createRegistry()
 *   .register('ProductCard', ProductCard, {
 *     actionProps: ['onPress', 'onAddToCart', 'onToggleFavorite'],
 *   })
 *   .register('CartItem', CartItem, {
 *     actionProps: ['onQuantityChange', 'onRemove'],
 *   })
 *   .build();
 *
 * // 2. Wrap app with provider
 * function App() {
 *   return (
 *     <SDUIProvider
 *       registry={registry}
 *       actionHandlers={{
 *         navigate: (screen, params) => router.push(screen, params),
 *         addToCart: (productId, qty) => cart.add(productId, qty),
 *         // ...other handlers
 *       }}
 *     >
 *       <HomeScreen />
 *     </SDUIProvider>
 *   );
 * }
 *
 * // 3. Render from server data
 * function HomeScreen() {
 *   const { data } = useQuery('/api/home');
 *   const { registry, handleAction } = useSDUI();
 *
 *   return (
 *     <FlatList
 *       data={data.components}
 *       renderItem={({ item }) => (
 *         <SDUIRenderer
 *           data={item}
 *           registry={registry}
 *           onAction={handleAction}
 *         />
 *       )}
 *     />
 *   );
 * }
 * ```
 */

// Types
export * from './types';

// Hooks
export * from './hooks';

// Components
export * from './components';

// Registry
export * from './registry';
