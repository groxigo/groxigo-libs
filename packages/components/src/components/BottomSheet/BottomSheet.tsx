import { Modal, Pressable, View, StyleSheet } from 'react-native';
import { Text, Icon, useTheme } from '@groxigo/ui-elements';
import type { BottomSheetProps } from './BottomSheet.types';

/**
 * BottomSheet component
 *
 * Bottom sheet overlay for mobile.
 * Uses theme colors for consistent styling across platforms.
 */
export const BottomSheet = ({
  visible,
  onClose,
  title,
  children,
  dismissible = true,
  showCloseButton = true,
  style,
  contentStyle,
  ...props
}: BottomSheetProps) => {
  const theme = useTheme();

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      {...props}
    >
      <Pressable
        style={[styles.backdrop, { backgroundColor: theme.colors.overlay }]}
        onPress={dismissible ? onClose : undefined}
      >
        <Pressable
          style={[
            styles.content,
            {
              backgroundColor: theme.colors.surface,
              borderTopLeftRadius: theme.radius.lg,
              borderTopRightRadius: theme.radius.lg,
              padding: theme.spacing[4],
            },
            contentStyle,
          ]}
          onPress={(e) => e.stopPropagation()}
        >
          {title && (
            <View
              style={[styles.header, { marginBottom: theme.spacing[4] }]}
            >
              <Text variant="h3">{title}</Text>
              {showCloseButton && (
                <Pressable
                  onPress={onClose}
                  style={{ padding: theme.spacing[1] }}
                  accessibilityLabel="Close bottom sheet"
                  accessibilityRole="button"
                >
                  <Icon name="x" size="md" />
                </Pressable>
              )}
            </View>
          )}
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default BottomSheet;
