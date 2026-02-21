import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useActionHandler } from '../useActionHandler';
import type { SDUIAction } from '../../types/actions';

describe('useActionHandler', () => {
  describe('built-in action types', () => {
    it('handles NAVIGATE', async () => {
      const navigate = vi.fn();
      const { result } = renderHook(() => useActionHandler({ navigate }));

      await act(async () => {
        await result.current.handleAction({
          type: 'NAVIGATE',
          screen: '/product/123',
          params: { id: '123' },
        });
      });

      expect(navigate).toHaveBeenCalledWith('/product/123', { id: '123' });
    });

    it('handles GO_BACK', async () => {
      const goBack = vi.fn();
      const { result } = renderHook(() => useActionHandler({ goBack }));

      await act(async () => {
        await result.current.handleAction({ type: 'GO_BACK' });
      });

      expect(goBack).toHaveBeenCalled();
    });

    it('handles OPEN_URL', async () => {
      const openURL = vi.fn();
      const { result } = renderHook(() => useActionHandler({ openURL }));

      await act(async () => {
        await result.current.handleAction({
          type: 'OPEN_URL',
          url: 'https://example.com',
          external: true,
        });
      });

      expect(openURL).toHaveBeenCalledWith('https://example.com', true);
    });

    it('handles ADD_TO_CART', async () => {
      const addToCart = vi.fn();
      const { result } = renderHook(() => useActionHandler({ addToCart }));

      await act(async () => {
        await result.current.handleAction({
          type: 'ADD_TO_CART',
          productId: 'prod-1',
          quantity: 2,
        });
      });

      expect(addToCart).toHaveBeenCalledWith('prod-1', 2);
    });

    it('handles UPDATE_CART_QUANTITY', async () => {
      const updateCartQuantity = vi.fn();
      const { result } = renderHook(() => useActionHandler({ updateCartQuantity }));

      await act(async () => {
        await result.current.handleAction({
          type: 'UPDATE_CART_QUANTITY',
          productId: 'prod-1',
          quantity: 5,
        });
      });

      expect(updateCartQuantity).toHaveBeenCalledWith('prod-1', 5);
    });

    it('handles REMOVE_FROM_CART', async () => {
      const removeFromCart = vi.fn();
      const { result } = renderHook(() => useActionHandler({ removeFromCart }));

      await act(async () => {
        await result.current.handleAction({
          type: 'REMOVE_FROM_CART',
          productId: 'prod-1',
        });
      });

      expect(removeFromCart).toHaveBeenCalledWith('prod-1');
    });

    it('handles TOGGLE_FAVORITE', async () => {
      const toggleFavorite = vi.fn();
      const { result } = renderHook(() => useActionHandler({ toggleFavorite }));

      await act(async () => {
        await result.current.handleAction({
          type: 'TOGGLE_FAVORITE',
          productId: 'prod-1',
        });
      });

      expect(toggleFavorite).toHaveBeenCalledWith('prod-1');
    });

    it('handles SHOW_TOAST', async () => {
      const showToast = vi.fn();
      const { result } = renderHook(() => useActionHandler({ showToast }));

      await act(async () => {
        await result.current.handleAction({
          type: 'SHOW_TOAST',
          message: 'Added to cart',
          status: 'success',
          duration: 3000,
        });
      });

      expect(showToast).toHaveBeenCalledWith('Added to cart', 'success', 3000);
    });

    it('handles SHOW_MODAL', async () => {
      const showModal = vi.fn();
      const { result } = renderHook(() => useActionHandler({ showModal }));

      await act(async () => {
        await result.current.handleAction({
          type: 'SHOW_MODAL',
          modalId: 'confirm-delete',
          props: { title: 'Are you sure?' },
        });
      });

      expect(showModal).toHaveBeenCalledWith('confirm-delete', { title: 'Are you sure?' });
    });

    it('handles CLOSE_MODAL', async () => {
      const closeModal = vi.fn();
      const { result } = renderHook(() => useActionHandler({ closeModal }));

      await act(async () => {
        await result.current.handleAction({
          type: 'CLOSE_MODAL',
          modalId: 'confirm-delete',
        });
      });

      expect(closeModal).toHaveBeenCalledWith('confirm-delete');
    });

    it('handles SHARE', async () => {
      const share = vi.fn();
      const { result } = renderHook(() => useActionHandler({ share }));

      await act(async () => {
        await result.current.handleAction({
          type: 'SHARE',
          title: 'Check this out',
          message: 'Great product!',
          url: 'https://example.com/product/1',
        });
      });

      expect(share).toHaveBeenCalledWith('Check this out', 'Great product!', 'https://example.com/product/1');
    });

    it('handles TRACK_EVENT', async () => {
      const trackEvent = vi.fn();
      const { result } = renderHook(() => useActionHandler({ trackEvent }));

      await act(async () => {
        await result.current.handleAction({
          type: 'TRACK_EVENT',
          event: 'product_viewed',
          properties: { id: 'prod-1' },
        });
      });

      expect(trackEvent).toHaveBeenCalledWith('product_viewed', { id: 'prod-1' });
    });

    it('handles REFRESH', async () => {
      const refresh = vi.fn();
      const { result } = renderHook(() => useActionHandler({ refresh }));

      await act(async () => {
        await result.current.handleAction({
          type: 'REFRESH',
          sectionId: 'featured',
        });
      });

      expect(refresh).toHaveBeenCalledWith('featured');
    });
  });

  describe('API_CALL with chained actions', () => {
    it('calls onSuccess after successful API call', async () => {
      const apiCall = vi.fn().mockResolvedValue({ ok: true });
      const showToast = vi.fn();
      const { result } = renderHook(() =>
        useActionHandler({ apiCall, showToast })
      );

      await act(async () => {
        await result.current.handleAction({
          type: 'API_CALL',
          endpoint: '/api/cart',
          method: 'POST',
          body: { productId: '1' },
          onSuccess: {
            type: 'SHOW_TOAST',
            message: 'Success!',
            status: 'success',
          },
        });
      });

      expect(apiCall).toHaveBeenCalledWith('/api/cart', 'POST', { productId: '1' });
      expect(showToast).toHaveBeenCalledWith('Success!', 'success', undefined);
    });

    it('calls onError after failed API call', async () => {
      const apiCall = vi.fn().mockRejectedValue(new Error('fail'));
      const showToast = vi.fn();
      const { result } = renderHook(() =>
        useActionHandler({ apiCall, showToast })
      );

      await act(async () => {
        await result.current.handleAction({
          type: 'API_CALL',
          endpoint: '/api/cart',
          onError: {
            type: 'SHOW_TOAST',
            message: 'Failed!',
            status: 'error',
          },
        });
      });

      expect(showToast).toHaveBeenCalledWith('Failed!', 'error', undefined);
    });
  });

  describe('SEQUENCE', () => {
    it('runs actions in order', async () => {
      const callOrder: string[] = [];
      const trackEvent = vi.fn(() => { callOrder.push('track'); });
      const showToast = vi.fn(() => { callOrder.push('toast'); });
      const navigate = vi.fn(() => { callOrder.push('navigate'); });

      const { result } = renderHook(() =>
        useActionHandler({ trackEvent, showToast, navigate })
      );

      await act(async () => {
        await result.current.handleAction({
          type: 'SEQUENCE',
          actions: [
            { type: 'TRACK_EVENT', event: 'purchase' },
            { type: 'SHOW_TOAST', message: 'Done!' },
            { type: 'NAVIGATE', screen: '/home' },
          ],
        });
      });

      expect(callOrder).toEqual(['track', 'toast', 'navigate']);
    });
  });

  describe('CONDITIONAL and NOOP', () => {
    it('CONDITIONAL is a silent no-op', async () => {
      const { result } = renderHook(() => useActionHandler());

      // Should not throw
      await act(async () => {
        await result.current.handleAction({
          type: 'CONDITIONAL',
          condition: 'cart.count > 0',
          onTrue: { type: 'NAVIGATE', screen: '/checkout' },
        });
      });
    });

    it('NOOP is a silent no-op', async () => {
      const { result } = renderHook(() => useActionHandler());

      await act(async () => {
        await result.current.handleAction({ type: 'NOOP' });
      });
    });
  });

  describe('unknown action types', () => {
    it('silently no-ops for unknown action types', async () => {
      const { result } = renderHook(() => useActionHandler());

      // Should not throw
      await act(async () => {
        await result.current.handleAction({
          type: 'UNKNOWN_TYPE' as SDUIAction['type'],
        } as SDUIAction);
      });
    });
  });

  describe('custom handlers', () => {
    it('custom handler takes precedence over built-in', async () => {
      const builtInNavigate = vi.fn();
      const customNavigate = vi.fn();

      const { result } = renderHook(() =>
        useActionHandler({
          navigate: builtInNavigate,
          customHandlers: {
            NAVIGATE: customNavigate,
          },
        })
      );

      await act(async () => {
        await result.current.handleAction({
          type: 'NAVIGATE',
          screen: '/home',
        });
      });

      expect(customNavigate).toHaveBeenCalled();
      expect(builtInNavigate).not.toHaveBeenCalled();
    });
  });

  describe('mapActionsToProps', () => {
    it('converts action map to callback props', () => {
      const navigate = vi.fn();
      const { result } = renderHook(() => useActionHandler({ navigate }));

      const props = result.current.mapActionsToProps({
        onPress: { type: 'NAVIGATE', screen: '/detail' },
        onClose: { type: 'GO_BACK' },
      });

      expect(typeof props.onPress).toBe('function');
      expect(typeof props.onClose).toBe('function');
    });

    it('returns empty object for undefined actions', () => {
      const { result } = renderHook(() => useActionHandler());
      const props = result.current.mapActionsToProps(undefined);
      expect(props).toEqual({});
    });

    it('returned callbacks invoke handleAction', async () => {
      const navigate = vi.fn();
      const { result } = renderHook(() => useActionHandler({ navigate }));

      const props = result.current.mapActionsToProps({
        onPress: { type: 'NAVIGATE', screen: '/detail' },
      });

      await act(async () => {
        props.onPress();
      });

      expect(navigate).toHaveBeenCalledWith('/detail', undefined);
    });
  });
});
