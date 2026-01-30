import { ScrollView, View } from 'react-native';
import {
  Text,
  Avatar,
  Badge,
  Icon,
  Image,
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

export default function DataDisplayScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Section title="Avatar">
        <View style={{ gap: 16 }}>
          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Sizes</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Avatar size="xs" fallback="XS" />
              <Avatar size="sm" fallback="SM" />
              <Avatar size="md" fallback="MD" />
              <Avatar size="lg" fallback="LG" />
              <Avatar size="xl" fallback="XL" />
              <Avatar size="2xl" fallback="2X" />
            </View>
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Variants</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Avatar variant="circle" fallback="JD" />
              <Avatar variant="rounded" fallback="JD" />
              <Avatar variant="square" fallback="JD" />
            </View>
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Color Schemes</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Avatar colorScheme="primary" fallback="P" />
              <Avatar colorScheme="secondary" fallback="S" />
              <Avatar colorScheme="accent" fallback="A" />
              <Avatar colorScheme="success" fallback="OK" />
              <Avatar colorScheme="warning" fallback="!" />
              <Avatar colorScheme="error" fallback="X" />
            </View>
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>With Status</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Avatar fallback="ON" showStatus status="online" />
              <Avatar fallback="OF" showStatus status="offline" />
              <Avatar fallback="BU" showStatus status="busy" />
              <Avatar fallback="AW" showStatus status="away" />
            </View>
          </View>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Badge">
        <View style={{ gap: 16 }}>
          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Variants</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              <Badge variant="solid">Solid</Badge>
              <Badge variant="soft">Soft</Badge>
              <Badge variant="outline">Outline</Badge>
            </View>
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Color Schemes</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              <Badge colorScheme="primary">Primary</Badge>
              <Badge colorScheme="secondary">Secondary</Badge>
              <Badge colorScheme="accent">Accent</Badge>
              <Badge colorScheme="success">Success</Badge>
              <Badge colorScheme="warning">Warning</Badge>
              <Badge colorScheme="error">Error</Badge>
              <Badge colorScheme="info">Info</Badge>
              <Badge colorScheme="neutral">Neutral</Badge>
            </View>
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Sizes</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Badge size="xs">XS</Badge>
              <Badge size="sm">Small</Badge>
              <Badge size="md">Medium</Badge>
              <Badge size="lg">Large</Badge>
            </View>
          </View>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Icon">
        <View style={{ gap: 16 }}>
          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Sizes</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <Icon name="star" size="xs" />
              <Icon name="star" size="sm" />
              <Icon name="star" size="md" />
              <Icon name="star" size="lg" />
              <Icon name="star" size="xl" />
            </View>
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Color Schemes</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <Icon name="heart" colorScheme="primary" />
              <Icon name="heart" colorScheme="secondary" />
              <Icon name="heart" colorScheme="accent" />
              <Icon name="heart" colorScheme="success" />
              <Icon name="heart" colorScheme="error" />
            </View>
          </View>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Image">
        <View style={{ gap: 16 }}>
          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Basic Image</Text>
            <Image
              source={{ uri: 'https://picsum.photos/300/200' }}
              width={300}
              height={200}
              borderRadius={8}
            />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Circular Image</Text>
            <Image
              source={{ uri: 'https://picsum.photos/100/100' }}
              width={100}
              height={100}
              circular
            />
          </View>
        </View>
      </Section>
    </ScrollView>
  );
}
