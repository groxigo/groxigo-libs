/**
 * SDUI Action Types
 *
 * Actions are serializable objects that describe what should happen
 * when a user interacts with a component. The client maps these to
 * actual functions.
 */

/**
 * Navigation action - navigate to a screen
 */
export interface NavigateAction {
  type: 'NAVIGATE';
  screen: string;
  params?: Record<string, unknown>;
}

/**
 * Navigate back action
 */
export interface GoBackAction {
  type: 'GO_BACK';
}

/**
 * Open URL action - open external link
 */
export interface OpenURLAction {
  type: 'OPEN_URL';
  url: string;
  external?: boolean;
}

/**
 * Add to cart action
 */
export interface AddToCartAction {
  type: 'ADD_TO_CART';
  productId: string;
  quantity?: number;
}

/**
 * Update cart quantity action
 */
export interface UpdateCartQuantityAction {
  type: 'UPDATE_CART_QUANTITY';
  productId: string;
  quantity: number;
}

/**
 * Remove from cart action
 */
export interface RemoveFromCartAction {
  type: 'REMOVE_FROM_CART';
  productId: string;
}

/**
 * Toggle favorite action
 */
export interface ToggleFavoriteAction {
  type: 'TOGGLE_FAVORITE';
  productId: string;
}

/**
 * API call action - make an API request
 */
export interface APICallAction {
  type: 'API_CALL';
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown>;
  onSuccess?: SDUIAction;
  onError?: SDUIAction;
}

/**
 * Show toast action
 */
export interface ShowToastAction {
  type: 'SHOW_TOAST';
  message: string;
  status?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

/**
 * Show modal action
 */
export interface ShowModalAction {
  type: 'SHOW_MODAL';
  modalId: string;
  props?: Record<string, unknown>;
}

/**
 * Close modal action
 */
export interface CloseModalAction {
  type: 'CLOSE_MODAL';
  modalId?: string;
}

/**
 * Share action
 */
export interface ShareAction {
  type: 'SHARE';
  title?: string;
  message?: string;
  url?: string;
}

/**
 * Track event action - analytics
 */
export interface TrackEventAction {
  type: 'TRACK_EVENT';
  event: string;
  properties?: Record<string, unknown>;
}

/**
 * Refresh action - refresh current screen/section
 */
export interface RefreshAction {
  type: 'REFRESH';
  sectionId?: string;
}

/**
 * Sequence action - run multiple actions in sequence
 */
export interface SequenceAction {
  type: 'SEQUENCE';
  actions: SDUIAction[];
}

/**
 * Conditional action - run action based on condition
 */
export interface ConditionalAction {
  type: 'CONDITIONAL';
  condition: string; // Expression to evaluate
  onTrue: SDUIAction;
  onFalse?: SDUIAction;
}

/**
 * No-op action - do nothing (useful for conditional defaults)
 */
export interface NoOpAction {
  type: 'NOOP';
}

/**
 * Union of all SDUI actions
 */
export type SDUIAction =
  | NavigateAction
  | GoBackAction
  | OpenURLAction
  | AddToCartAction
  | UpdateCartQuantityAction
  | RemoveFromCartAction
  | ToggleFavoriteAction
  | APICallAction
  | ShowToastAction
  | ShowModalAction
  | CloseModalAction
  | ShareAction
  | TrackEventAction
  | RefreshAction
  | SequenceAction
  | ConditionalAction
  | NoOpAction;

/**
 * Action handler function type
 */
export type ActionHandler = (action: SDUIAction) => void | Promise<void>;

/**
 * Action handlers map - custom handlers for specific action types
 */
export type ActionHandlers = {
  [K in SDUIAction['type']]?: (
    action: Extract<SDUIAction, { type: K }>
  ) => void | Promise<void>;
};
