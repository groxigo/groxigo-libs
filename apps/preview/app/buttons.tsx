import { ScrollView, View, Alert } from 'react-native';
import { Text, Button, Link, Divider, useTheme } from '@groxigo/ui-elements';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text variant="h4" style={{ marginBottom: 12 }}>{title}</Text>
      {children}
    </View>
  );
}

export default function ButtonsScreen() {
  const theme = useTheme();
  const handlePress = () => Alert.alert('Button Pressed!');

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Section title="Button Variants">
        <View style={{ gap: 12 }}>
          <Button variant="solid" onPress={handlePress}>Solid Button</Button>
          <Button variant="outline" onPress={handlePress}>Outline Button</Button>
          <Button variant="ghost" onPress={handlePress}>Ghost Button</Button>
          <Button variant="soft" onPress={handlePress}>Soft Button</Button>
          <Button variant="link" onPress={handlePress}>Link Button</Button>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Button Sizes">
        <View style={{ gap: 12 }}>
          <Button size="xs" onPress={handlePress}>Extra Small</Button>
          <Button size="sm" onPress={handlePress}>Small</Button>
          <Button size="md" onPress={handlePress}>Medium (Default)</Button>
          <Button size="lg" onPress={handlePress}>Large</Button>
          <Button size="xl" onPress={handlePress}>Extra Large</Button>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Color Schemes">
        <View style={{ gap: 12 }}>
          <Button colorScheme="primary" onPress={handlePress}>Primary</Button>
          <Button colorScheme="secondary" onPress={handlePress}>Secondary</Button>
          <Button colorScheme="accent" onPress={handlePress}>Accent</Button>
          <Button colorScheme="success" onPress={handlePress}>Success</Button>
          <Button colorScheme="warning" onPress={handlePress}>Warning</Button>
          <Button colorScheme="error" onPress={handlePress}>Error</Button>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Button States">
        <View style={{ gap: 12 }}>
          <Button onPress={handlePress}>Normal</Button>
          <Button disabled onPress={handlePress}>Disabled</Button>
          <Button loading onPress={handlePress}>Loading</Button>
          <Button fullWidth onPress={handlePress}>Full Width</Button>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Links">
        <View style={{ gap: 12 }}>
          <Link onPress={handlePress}>Default Link</Link>
          <Link colorScheme="primary" onPress={handlePress}>Primary Link</Link>
          <Link colorScheme="secondary" onPress={handlePress}>Secondary Link</Link>
          <Link underline onPress={handlePress}>Underlined Link</Link>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <Link size="sm" onPress={handlePress}>Small</Link>
            <Link size="md" onPress={handlePress}>Medium</Link>
            <Link size="lg" onPress={handlePress}>Large</Link>
          </View>
        </View>
      </Section>
    </ScrollView>
  );
}
