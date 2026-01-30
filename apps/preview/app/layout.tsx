import { ScrollView, View } from 'react-native';
import {
  Text,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Divider,
  Spacer,
  Button,
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

export default function LayoutScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Section title="Card Variants">
        <View style={{ gap: 16 }}>
          <Card variant="elevated">
            <CardContent>
              <Text variant="h5">Elevated Card</Text>
              <Text variant="bodySmall" colorScheme="muted">With shadow effect</Text>
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Text variant="h5">Outlined Card</Text>
              <Text variant="bodySmall" colorScheme="muted">With border</Text>
            </CardContent>
          </Card>

          <Card variant="filled">
            <CardContent>
              <Text variant="h5">Filled Card</Text>
              <Text variant="bodySmall" colorScheme="muted">Solid background</Text>
            </CardContent>
          </Card>

          <Card variant="ghost">
            <CardContent>
              <Text variant="h5">Ghost Card</Text>
              <Text variant="bodySmall" colorScheme="muted">Minimal styling</Text>
            </CardContent>
          </Card>
        </View>
      </Section>

      <Section title="Card with Sections">
        <Card variant="outlined">
          <CardHeader>
            <Text variant="h5">Card Header</Text>
            <Text variant="caption" colorScheme="muted">Subtitle text</Text>
          </CardHeader>
          <CardContent>
            <Text>This is the card content area. You can put any content here including text, images, or other components.</Text>
          </CardContent>
          <CardFooter>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm">Submit</Button>
            </View>
          </CardFooter>
        </Card>
      </Section>

      <Section title="Divider">
        <View style={{ gap: 16 }}>
          <View>
            <Text variant="caption" colorScheme="muted">Solid (default)</Text>
            <Divider spacing={8} />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted">Dashed</Text>
            <Divider variant="dashed" spacing={8} />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted">Dotted</Text>
            <Divider variant="dotted" spacing={8} />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted">With Label</Text>
            <Divider label="OR" spacing={8} />
          </View>

          <View style={{ flexDirection: 'row', height: 60, alignItems: 'center' }}>
            <Text>Left</Text>
            <Divider orientation="vertical" spacing={16} />
            <Text>Right</Text>
          </View>
        </View>
      </Section>

      <Section title="Spacer">
        <Card variant="outlined">
          <CardContent>
            <View style={{ backgroundColor: theme.colors.primarySubtle, padding: 8 }}>
              <Text>Element 1</Text>
            </View>
            <Spacer size={4} />
            <View style={{ backgroundColor: theme.colors.primarySubtle, padding: 8 }}>
              <Text>Element 2 (16px gap)</Text>
            </View>
            <Spacer size={8} />
            <View style={{ backgroundColor: theme.colors.primarySubtle, padding: 8 }}>
              <Text>Element 3 (32px gap)</Text>
            </View>
          </CardContent>
        </Card>
      </Section>
    </ScrollView>
  );
}
