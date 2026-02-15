import { Modal as RNModal, View, Pressable, StyleSheet } from 'react-native';
import { Card, Text, Icon, useTheme } from '@groxigo/ui-elements';
import type { ModalProps } from './Modal.types';

/**
 * Modal component
 *
 * Dialog/modal overlay with backdrop and close functionality.
 * Uses theme colors for consistent styling across platforms.
 */
export const Modal = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  dismissible = true,
  size = 'md',
  style,
  contentStyle,
}: ModalProps) => {
  const theme = useTheme();

  if (!visible) return null;

  const sizeStyles: Record<'sm' | 'md' | 'lg' | 'full', import('react-native').ViewStyle> = {
    sm: { width: '80%', maxWidth: 320 },
    md: { width: '90%', maxWidth: 480 },
    lg: { width: '90%', maxWidth: 640 },
    full: { width: '100%', height: '100%' },
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        style={[styles.backdrop, { backgroundColor: theme.colors.overlay }]}
        onPress={dismissible ? onClose : undefined}
      >
        <Pressable
          style={[
            {
              ...sizeStyles[size],
              maxHeight: '90%',
            },
            style,
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          <Card variant="elevated" padding="lg" style={contentStyle}>
            {(title || showCloseButton) && (
              <View
                style={[styles.header, { marginBottom: theme.spacing[4] }]}
              >
                {title && (
                  <Text variant="h3" style={styles.title}>
                    {title}
                  </Text>
                )}
                {showCloseButton && onClose && (
                  <Pressable
                    onPress={onClose}
                    style={{
                      padding: theme.spacing[1],
                      marginLeft: theme.spacing[2],
                    }}
                    accessibilityLabel="Close modal"
                    accessibilityRole="button"
                  >
                    <Icon name="x" size="md" />
                  </Pressable>
                )}
              </View>
            )}
            {children}
          </Card>
        </Pressable>
      </Pressable>
    </RNModal>
  );
};

Modal.displayName = 'Modal';

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
  },
});

export default Modal;
