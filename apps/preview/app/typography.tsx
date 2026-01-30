import { ScrollView, View } from 'react-native';
import { Text, Divider, useTheme } from '@groxigo/ui-elements';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text variant="h4" style={{ marginBottom: 12 }}>{title}</Text>
      {children}
    </View>
  );
}

export default function TypographyScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Section title="Headings">
        <View style={{ gap: 8 }}>
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="h4">Heading 4</Text>
          <Text variant="h5">Heading 5</Text>
          <Text variant="h6">Heading 6</Text>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Body Text">
        <View style={{ gap: 8 }}>
          <Text variant="bodyLarge">Body Large - For emphasized content</Text>
          <Text variant="body">Body - Default paragraph text</Text>
          <Text variant="bodySmall">Body Small - Secondary information</Text>
          <Text variant="caption">Caption - Annotations and labels</Text>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Font Weights">
        <View style={{ gap: 8 }}>
          <Text weight="light">Light weight text</Text>
          <Text weight="normal">Normal weight text</Text>
          <Text weight="medium">Medium weight text</Text>
          <Text weight="semibold">Semibold weight text</Text>
          <Text weight="bold">Bold weight text</Text>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Color Schemes">
        <View style={{ gap: 8 }}>
          <Text colorScheme="default">Default text color</Text>
          <Text colorScheme="primary">Primary color text</Text>
          <Text colorScheme="secondary">Secondary color text</Text>
          <Text colorScheme="accent">Accent color text</Text>
          <Text colorScheme="success">Success color text</Text>
          <Text colorScheme="warning">Warning color text</Text>
          <Text colorScheme="error">Error color text</Text>
          <Text colorScheme="muted">Muted color text</Text>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Text Alignment">
        <View style={{ gap: 8 }}>
          <Text align="left">Left aligned text</Text>
          <Text align="center">Center aligned text</Text>
          <Text align="right">Right aligned text</Text>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Special Variants">
        <View style={{ gap: 8 }}>
          <Text variant="label">LABEL TEXT</Text>
          <Text variant="overline">OVERLINE TEXT</Text>
        </View>
      </Section>
    </ScrollView>
  );
}
