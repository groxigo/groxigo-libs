import { ScrollView, Pressable, View } from 'react-native';
import { Link } from 'expo-router';
import { Text, Card, useTheme } from '@groxigo/ui-elements';

const categories = [
  {
    title: 'Typography',
    description: 'Text variants, headings, and text styling',
    href: '/typography',
    icon: '📝',
  },
  {
    title: 'Buttons & Links',
    description: 'Button variants, sizes, and link components',
    href: '/buttons',
    icon: '🔘',
  },
  {
    title: 'Form Elements',
    description: 'Input, TextArea, Checkbox, Radio, Switch, Select, Slider',
    href: '/forms',
    icon: '📋',
  },
  {
    title: 'Layout',
    description: 'Card, Divider, Spacer components',
    href: '/layout',
    icon: '📐',
  },
  {
    title: 'Feedback',
    description: 'Spinner, Progress, Skeleton, Toast',
    href: '/feedback',
    icon: '💬',
  },
  {
    title: 'Data Display',
    description: 'Avatar, Badge, Icon, Image',
    href: '/data-display',
    icon: '🖼️',
  },
  {
    title: 'Navigation',
    description: 'Tabs, Breadcrumb',
    href: '/navigation',
    icon: '🧭',
  },
];

export default function HomeScreen() {
  const theme = useTheme();

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16, gap: 12 }}
    >
      <Text variant="h2" style={{ marginBottom: 8 }}>
        Component Library
      </Text>
      <Text variant="body" colorScheme="muted" style={{ marginBottom: 16 }}>
        Explore all UI elements with theme support
      </Text>

      {categories.map((category) => (
        <Link key={category.href} href={category.href as any} asChild>
          <Pressable>
            {({ pressed }) => (
              <Card
                variant="outlined"
                style={{
                  opacity: pressed ? 0.8 : 1,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16 }}>
                  <Text style={{ fontSize: 32 }}>{category.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text variant="h4">{category.title}</Text>
                    <Text variant="bodySmall" colorScheme="muted">
                      {category.description}
                    </Text>
                  </View>
                  <Text style={{ color: theme.colors.textSecondary }}>→</Text>
                </View>
              </Card>
            )}
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}
