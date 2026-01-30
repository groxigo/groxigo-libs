import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { useDisclosure } from '../useDisclosure';

describe('useDisclosure', () => {
  describe('default behavior', () => {
    it('should initialize with isOpen = false by default', () => {
      const { result } = renderHook(() => useDisclosure());
      expect(result.current.isOpen).toBe(false);
    });

    it('should initialize with isOpen = true when defaultIsOpen is true', () => {
      const { result } = renderHook(() =>
        useDisclosure({ defaultIsOpen: true })
      );
      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('open/close/toggle', () => {
    it('should open when open() is called', () => {
      const { result } = renderHook(() => useDisclosure());

      act(() => {
        result.current.open();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('should close when close() is called', () => {
      const { result } = renderHook(() =>
        useDisclosure({ defaultIsOpen: true })
      );

      act(() => {
        result.current.close();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('should toggle state when toggle() is called', () => {
      const { result } = renderHook(() => useDisclosure());

      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('should set state directly with setIsOpen()', () => {
      const { result } = renderHook(() => useDisclosure());

      act(() => {
        result.current.setIsOpen(true);
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.setIsOpen(false);
      });

      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('callbacks', () => {
    it('should call onOpen when opened', () => {
      const onOpen = vi.fn();
      const { result } = renderHook(() => useDisclosure({ onOpen }));

      act(() => {
        result.current.open();
      });

      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when closed', () => {
      const onClose = vi.fn();
      const { result } = renderHook(() =>
        useDisclosure({ defaultIsOpen: true, onClose })
      );

      act(() => {
        result.current.close();
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onToggle with new state when toggled', () => {
      const onToggle = vi.fn();
      const { result } = renderHook(() => useDisclosure({ onToggle }));

      act(() => {
        result.current.toggle();
      });

      expect(onToggle).toHaveBeenCalledWith(true);

      act(() => {
        result.current.toggle();
      });

      expect(onToggle).toHaveBeenCalledWith(false);
      expect(onToggle).toHaveBeenCalledTimes(2);
    });

    it('should call onOpen and onToggle when opened', () => {
      const onOpen = vi.fn();
      const onToggle = vi.fn();
      const { result } = renderHook(() => useDisclosure({ onOpen, onToggle }));

      act(() => {
        result.current.open();
      });

      expect(onOpen).toHaveBeenCalledTimes(1);
      expect(onToggle).toHaveBeenCalledWith(true);
    });

    it('should call onClose and onToggle when closed', () => {
      const onClose = vi.fn();
      const onToggle = vi.fn();
      const { result } = renderHook(() =>
        useDisclosure({ defaultIsOpen: true, onClose, onToggle })
      );

      act(() => {
        result.current.close();
      });

      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('should call callbacks when using setIsOpen', () => {
      const onOpen = vi.fn();
      const onClose = vi.fn();
      const onToggle = vi.fn();
      const { result } = renderHook(() =>
        useDisclosure({ onOpen, onClose, onToggle })
      );

      act(() => {
        result.current.setIsOpen(true);
      });

      expect(onOpen).toHaveBeenCalledTimes(1);
      expect(onToggle).toHaveBeenCalledWith(true);

      act(() => {
        result.current.setIsOpen(false);
      });

      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onToggle).toHaveBeenCalledWith(false);
    });
  });

  describe('controlled mode', () => {
    it('should use controlled isOpen value', () => {
      const { result, rerender } = renderHook(
        ({ isOpen }) => useDisclosure({ isOpen }),
        { initialProps: { isOpen: false } }
      );

      expect(result.current.isOpen).toBe(false);

      rerender({ isOpen: true });

      expect(result.current.isOpen).toBe(true);
    });

    it('should not update internal state in controlled mode', () => {
      const onOpen = vi.fn();
      const { result } = renderHook(() =>
        useDisclosure({ isOpen: false, onOpen })
      );

      act(() => {
        result.current.open();
      });

      // State should not change (controlled)
      expect(result.current.isOpen).toBe(false);
      // But callback should be called
      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('should call onClose in controlled mode but not change state', () => {
      const onClose = vi.fn();
      const { result } = renderHook(() =>
        useDisclosure({ isOpen: true, onClose })
      );

      act(() => {
        result.current.close();
      });

      // State should not change (controlled)
      expect(result.current.isOpen).toBe(true);
      // But callback should be called
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('edge cases', () => {
    it('should handle multiple rapid calls', () => {
      const onOpen = vi.fn();
      const onClose = vi.fn();
      const { result } = renderHook(() =>
        useDisclosure({ onOpen, onClose })
      );

      act(() => {
        result.current.open();
        result.current.close();
        result.current.open();
        result.current.close();
      });

      expect(result.current.isOpen).toBe(false);
      expect(onOpen).toHaveBeenCalledTimes(2);
      expect(onClose).toHaveBeenCalledTimes(2);
    });

    it('should handle calling open when already open', () => {
      const onOpen = vi.fn();
      const { result } = renderHook(() =>
        useDisclosure({ defaultIsOpen: true, onOpen })
      );

      act(() => {
        result.current.open();
      });

      // State stays open, callback is still called
      expect(result.current.isOpen).toBe(true);
      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('should handle calling close when already closed', () => {
      const onClose = vi.fn();
      const { result } = renderHook(() => useDisclosure({ onClose }));

      act(() => {
        result.current.close();
      });

      // State stays closed, callback is still called
      expect(result.current.isOpen).toBe(false);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should work without any options', () => {
      const { result } = renderHook(() => useDisclosure());

      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('should have stable callback references', () => {
      const { result, rerender } = renderHook(() => useDisclosure());

      const { open: open1, close: close1, toggle: toggle1, setIsOpen: setIsOpen1 } = result.current;

      rerender();

      const { open: open2, close: close2, toggle: toggle2, setIsOpen: setIsOpen2 } = result.current;

      expect(open1).toBe(open2);
      expect(close1).toBe(close2);
      expect(toggle1).toBe(toggle2);
      expect(setIsOpen1).toBe(setIsOpen2);
    });
  });
});
