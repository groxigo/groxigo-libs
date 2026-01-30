/**
 * useActionHandler Hook
 *
 * Provides a centralized action handler for SDUI components.
 */

import { useCallback, useMemo } from 'react';
import type { SDUIAction, ActionHandlers } from '../types/actions';

export interface UseActionHandlerOptions {
  /** Navigation function */
  navigate?: (screen: string, params?: Record<string, unknown>) => void;
  /** Go back function */
  goBack?: () => void;
  /** Open URL function */
  openURL?: (url: string, external?: boolean) => void;
  /** Add to cart function */
  addToCart?: (productId: string, quantity?: number) => void;
  /** Update cart quantity function */
  updateCartQuantity?: (productId: string, quantity: number) => void;
  /** Remove from cart function */
  removeFromCart?: (productId: string) => void;
  /** Toggle favorite function */
  toggleFavorite?: (productId: string) => void;
  /** API call function */
  apiCall?: (
    endpoint: string,
    method?: string,
    body?: Record<string, unknown>
  ) => Promise<unknown>;
  /** Show toast function */
  showToast?: (
    message: string,
    status?: 'info' | 'success' | 'warning' | 'error',
    duration?: number
  ) => void;
  /** Show modal function */
  showModal?: (modalId: string, props?: Record<string, unknown>) => void;
  /** Close modal function */
  closeModal?: (modalId?: string) => void;
  /** Share function */
  share?: (title?: string, message?: string, url?: string) => void;
  /** Track event function */
  trackEvent?: (event: string, properties?: Record<string, unknown>) => void;
  /** Refresh function */
  refresh?: (sectionId?: string) => void;
  /** Custom action handlers */
  customHandlers?: ActionHandlers;
}

export interface UseActionHandlerResult {
  /** Handle a single action */
  handleAction: (action: SDUIAction) => void | Promise<void>;
  /** Convert actions map to props */
  mapActionsToProps: (
    actions?: Record<string, SDUIAction>
  ) => Record<string, () => void>;
}

/**
 * Hook that provides action handling for SDUI components
 */
export function useActionHandler(
  options: UseActionHandlerOptions = {}
): UseActionHandlerResult {
  const {
    navigate,
    goBack,
    openURL,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    toggleFavorite,
    apiCall,
    showToast,
    showModal,
    closeModal,
    share,
    trackEvent,
    refresh,
    customHandlers,
  } = options;

  const handleAction = useCallback(
    async (action: SDUIAction): Promise<void> => {
      // Check for custom handler first
      const customHandler = customHandlers?.[action.type];
      if (customHandler) {
        await customHandler(action as any);
        return;
      }

      // Handle built-in action types
      switch (action.type) {
        case 'NAVIGATE':
          navigate?.(action.screen, action.params);
          break;

        case 'GO_BACK':
          goBack?.();
          break;

        case 'OPEN_URL':
          openURL?.(action.url, action.external);
          break;

        case 'ADD_TO_CART':
          addToCart?.(action.productId, action.quantity);
          break;

        case 'UPDATE_CART_QUANTITY':
          updateCartQuantity?.(action.productId, action.quantity);
          break;

        case 'REMOVE_FROM_CART':
          removeFromCart?.(action.productId);
          break;

        case 'TOGGLE_FAVORITE':
          toggleFavorite?.(action.productId);
          break;

        case 'API_CALL':
          try {
            await apiCall?.(action.endpoint, action.method, action.body);
            if (action.onSuccess) {
              await handleAction(action.onSuccess);
            }
          } catch (error) {
            if (action.onError) {
              await handleAction(action.onError);
            }
          }
          break;

        case 'SHOW_TOAST':
          showToast?.(action.message, action.status, action.duration);
          break;

        case 'SHOW_MODAL':
          showModal?.(action.modalId, action.props);
          break;

        case 'CLOSE_MODAL':
          closeModal?.(action.modalId);
          break;

        case 'SHARE':
          share?.(action.title, action.message, action.url);
          break;

        case 'TRACK_EVENT':
          trackEvent?.(action.event, action.properties);
          break;

        case 'REFRESH':
          refresh?.(action.sectionId);
          break;

        case 'SEQUENCE':
          for (const sequenceAction of action.actions) {
            await handleAction(sequenceAction);
          }
          break;

        case 'CONDITIONAL':
          // Note: Condition evaluation would need a context/state
          // For now, just execute onTrue
          console.warn('CONDITIONAL action requires context evaluation');
          break;

        case 'NOOP':
          // Do nothing
          break;

        default:
          console.warn(`Unknown action type: ${(action as any).type}`);
      }
    },
    [
      navigate,
      goBack,
      openURL,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      toggleFavorite,
      apiCall,
      showToast,
      showModal,
      closeModal,
      share,
      trackEvent,
      refresh,
      customHandlers,
    ]
  );

  const mapActionsToProps = useCallback(
    (actions?: Record<string, SDUIAction>): Record<string, () => void> => {
      if (!actions) return {};

      const props: Record<string, () => void> = {};

      for (const [propName, action] of Object.entries(actions)) {
        props[propName] = () => handleAction(action);
      }

      return props;
    },
    [handleAction]
  );

  return useMemo(
    () => ({
      handleAction,
      mapActionsToProps,
    }),
    [handleAction, mapActionsToProps]
  );
}
