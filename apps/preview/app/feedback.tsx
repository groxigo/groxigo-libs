import { ScrollView, View } from 'react-native';
import { useState } from 'react';
import {
  Text,
  Spinner,
  Progress,
  Skeleton,
  Toast,
  Button,
  Divider,
  useTheme,
} from '@groxigo/ui-elements';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text variant="h4" style={{ marginBottom: 12 }}>{title}</Text>
      {children}
    </View>
  );
}

export default function FeedbackScreen() {
  const theme = useTheme();
  const [showToast, setShowToast] = useState<string | null>(null);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Section title="Spinner">
        <View style={{ gap: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
            <View style={{ alignItems: 'center' }}>
              <Spinner size="sm" />
              <Text variant="caption" colorScheme="muted">Small</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Spinner size="md" />
              <Text variant="caption" colorScheme="muted">Medium</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Spinner size="lg" />
              <Text variant="caption" colorScheme="muted">Large</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 24 }}>
            <Spinner colorScheme="primary" />
            <Spinner colorScheme="secondary" />
            <Spinner colorScheme="accent" />
            <Spinner colorScheme="success" />
          </View>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Progress">
        <View style={{ gap: 16 }}>
          <View>
            <Text variant="caption" colorScheme="muted">Default (50%)</Text>
            <Progress value={50} />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted">With Label</Text>
            <Progress value={75} showLabel />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted">Color Schemes</Text>
            <View style={{ gap: 8 }}>
              <Progress value={60} colorScheme="primary" />
              <Progress value={60} colorScheme="secondary" />
              <Progress value={60} colorScheme="success" />
              <Progress value={60} colorScheme="warning" />
              <Progress value={60} colorScheme="error" />
            </View>
          </View>

          <View>
            <Text variant="caption" colorScheme="muted">Sizes</Text>
            <View style={{ gap: 8 }}>
              <Progress value={70} size="sm" />
              <Progress value={70} size="md" />
              <Progress value={70} size="lg" />
            </View>
          </View>

          <View>
            <Text variant="caption" colorScheme="muted">Striped</Text>
            <Progress value={80} variant="striped" />
          </View>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Skeleton">
        <View style={{ gap: 16 }}>
          <View>
            <Text variant="caption" colorScheme="muted">Text Lines</Text>
            <Skeleton variant="text" lines={3} />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted">Circular (Avatar)</Text>
            <Skeleton variant="circular" width={64} />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted">Rectangular</Text>
            <Skeleton variant="rectangular" height={100} />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted">Rounded</Text>
            <Skeleton variant="rounded" height={80} />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted">Card Skeleton</Text>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              <Skeleton variant="circular" width={48} />
              <View style={{ flex: 1, gap: 8 }}>
                <Skeleton variant="text" width={120} />
                <Skeleton variant="text" />
              </View>
            </View>
          </View>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Toast">
        <View style={{ gap: 12 }}>
          <Button
            variant="outline"
            colorScheme="success"
            onPress={() => setShowToast('success')}
          >
            Show Success Toast
          </Button>
          <Button
            variant="outline"
            colorScheme="error"
            onPress={() => setShowToast('error')}
          >
            Show Error Toast
          </Button>
          <Button
            variant="outline"
            colorScheme="warning"
            onPress={() => setShowToast('warning')}
          >
            Show Warning Toast
          </Button>
          <Button
            variant="outline"
            onPress={() => setShowToast('info')}
          >
            Show Info Toast
          </Button>
        </View>

        {showToast && (
          <Toast
            variant={showToast as any}
            title={`${showToast.charAt(0).toUpperCase() + showToast.slice(1)} Toast`}
            message="This is a toast notification message."
            showCloseButton
            onDismiss={() => setShowToast(null)}
            position="bottom"
          />
        )}
      </Section>
    </ScrollView>
  );
}
