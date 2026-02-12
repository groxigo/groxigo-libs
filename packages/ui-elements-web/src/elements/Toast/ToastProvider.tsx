/**
 * Toast Provider Component (Web)
 *
 * Context provider for managing toast notifications.
 * Renders toasts in a fixed container based on position.
 */

import { createContext, useContext, useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';
import { Toast } from './Toast';
import type {
  ToastOptions,
  ToastPropsBase,
  ToastPosition,
  ToastProviderPropsBase,
  UseToastReturn,
} from '@groxigo/contracts';
import styles from './Toast.module.css';

// Internal toast state with full props
interface ToastState extends ToastPropsBase {
  position: ToastPosition;
}

// Context value type
interface ToastContextValue {
  toasts: ToastState[];
  addToast: (options: ToastOptions) => string;
  updateToast: (id: string, options: Partial<ToastOptions>) => void;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
  isActive: (id: string) => boolean;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// Generate unique ID
let toastIdCounter = 0;
function generateToastId(): string {
  return `toast-${++toastIdCounter}-${Date.now()}`;
}

// Position container class mapping
const positionClassMap: Record<ToastPosition, string> = {
  top: styles.containerTop,
  'top-left': styles.containerTopLeft,
  'top-right': styles.containerTopRight,
  bottom: styles.containerBottom,
  'bottom-left': styles.containerBottomLeft,
  'bottom-right': styles.containerBottomRight,
};

// Group toasts by position
function groupByPosition(toasts: ToastState[]): Record<ToastPosition, ToastState[]> {
  const groups: Record<ToastPosition, ToastState[]> = {
    top: [],
    'top-left': [],
    'top-right': [],
    bottom: [],
    'bottom-left': [],
    'bottom-right': [],
  };

  toasts.forEach((toast) => {
    groups[toast.position].push(toast);
  });

  return groups;
}

export interface ToastProviderProps extends ToastProviderPropsBase {
  className?: string;
}

export const ToastProvider = ({
  defaultOptions = {},
  limit = 5,
  children,
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const portalRef = useRef<HTMLDivElement | null>(null);

  // Create portal container on mount
  useEffect(() => {
    if (typeof document !== 'undefined' && !portalRef.current) {
      const container = document.createElement('div');
      container.id = 'groxigo-toast-portal';
      document.body.appendChild(container);
      portalRef.current = container;
    }

    return () => {
      if (portalRef.current && document.body.contains(portalRef.current)) {
        document.body.removeChild(portalRef.current);
        portalRef.current = null;
      }
    };
  }, []);

  const addToast = useCallback(
    (options: ToastOptions): string => {
      const id = options.id || generateToastId();
      const position = options.position || defaultOptions.position || 'bottom';

      const newToast: ToastState = {
        id,
        title: options.title,
        description: options.description,
        status: options.status || defaultOptions.status || 'info',
        variant: options.variant || defaultOptions.variant || 'subtle',
        position,
        duration: options.duration !== undefined ? options.duration : (defaultOptions.duration !== undefined ? defaultOptions.duration : 5000),
        isClosable: options.isClosable !== undefined ? options.isClosable : (defaultOptions.isClosable !== undefined ? defaultOptions.isClosable : true),
        icon: options.icon,
        render: options.render,
        action: options.action,
        onClose: () => {
          options.onClose?.();
          removeToast(id);
        },
      };

      setToasts((prev) => {
        // Check if toast with same ID exists
        const existingIndex = prev.findIndex((t) => t.id === id);
        if (existingIndex !== -1) {
          // Update existing toast
          const updated = [...prev];
          updated[existingIndex] = newToast;
          return updated;
        }

        // Add new toast, respecting limit
        const newToasts = [newToast, ...prev];
        if (newToasts.length > limit) {
          return newToasts.slice(0, limit);
        }
        return newToasts;
      });

      return id;
    },
    [defaultOptions, limit]
  );

  const updateToast = useCallback((id: string, options: Partial<ToastOptions>) => {
    setToasts((prev) =>
      prev.map((toast) => {
        if (toast.id !== id) return toast;
        return {
          ...toast,
          ...options,
          onClose: () => {
            options.onClose?.();
            removeToast(id);
          },
        };
      })
    );
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const isActive = useCallback(
    (id: string): boolean => {
      return toasts.some((toast) => toast.id === id);
    },
    [toasts]
  );

  const contextValue = useMemo(
    () => ({
      toasts,
      addToast,
      updateToast,
      removeToast,
      removeAllToasts,
      isActive,
    }),
    [toasts, addToast, updateToast, removeToast, removeAllToasts, isActive]
  );

  // Group toasts by position for rendering
  const groupedToasts = useMemo(() => groupByPosition(toasts), [toasts]);

  // Render toast containers
  const renderToastContainers = () => {
    if (!portalRef.current) return null;

    return createPortal(
      <>
        {(Object.keys(groupedToasts) as ToastPosition[]).map((position) => {
          const positionToasts = groupedToasts[position];
          if (positionToasts.length === 0) return null;

          const isTop = position.startsWith('top');

          return (
            <div
              key={position}
              className={clsx(
                styles.container,
                positionClassMap[position]
              )}
            >
              {(isTop ? positionToasts : [...positionToasts].reverse()).map((toast) => (
                <div key={toast.id} className={styles.toastWrapper}>
                  <Toast
                    id={toast.id}
                    title={toast.title}
                    description={toast.description}
                    status={toast.status}
                    variant={toast.variant}
                    duration={toast.duration}
                    isClosable={toast.isClosable}
                    icon={toast.icon}
                    render={toast.render}
                    action={toast.action}
                    onClose={toast.onClose}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </>,
      portalRef.current
    );
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {renderToastContainers()}
    </ToastContext.Provider>
  );
};

// Internal hook for accessing context
export function useToastContext(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

ToastProvider.displayName = 'ToastProvider';

export default ToastProvider;
