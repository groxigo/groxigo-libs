import { ScrollView, View } from 'react-native';
import { useState } from 'react';
import {
  Text,
  Tabs,
  TabPanel,
  Breadcrumb,
  Divider,
  Card,
  CardContent,
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

export default function NavigationScreen() {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState('tab1');

  const tabItems = [
    { id: 'tab1', label: 'Overview' },
    { id: 'tab2', label: 'Features' },
    { id: 'tab3', label: 'Pricing', badge: 'New' },
    { id: 'tab4', label: 'Disabled', disabled: true },
  ];

  const breadcrumbItems = [
    { label: 'Home', onPress: () => {} },
    { label: 'Products', onPress: () => {} },
    { label: 'Category', onPress: () => {} },
    { label: 'Current Page' },
  ];

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 16 }}
    >
      <Section title="Tabs">
        <View style={{ gap: 24 }}>
          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Default</Text>
            <Tabs
              items={tabItems}
              selectedId={selectedTab}
              onSelect={setSelectedTab}
            />
            <Card variant="outlined" style={{ marginTop: 8 }}>
              <CardContent>
                <TabPanel isActive={selectedTab === 'tab1'}>
                  <Text>Overview content goes here.</Text>
                </TabPanel>
                <TabPanel isActive={selectedTab === 'tab2'}>
                  <Text>Features content goes here.</Text>
                </TabPanel>
                <TabPanel isActive={selectedTab === 'tab3'}>
                  <Text>Pricing content goes here.</Text>
                </TabPanel>
              </CardContent>
            </Card>
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Pills Variant</Text>
            <Tabs
              items={tabItems.slice(0, 3)}
              selectedId={selectedTab}
              onSelect={setSelectedTab}
              variant="pills"
            />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Underline Variant</Text>
            <Tabs
              items={tabItems.slice(0, 3)}
              selectedId={selectedTab}
              onSelect={setSelectedTab}
              variant="underline"
            />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Enclosed Variant</Text>
            <Tabs
              items={tabItems.slice(0, 3)}
              selectedId={selectedTab}
              onSelect={setSelectedTab}
              variant="enclosed"
            />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Full Width</Text>
            <Tabs
              items={tabItems.slice(0, 3)}
              selectedId={selectedTab}
              onSelect={setSelectedTab}
              fullWidth
            />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Color Schemes</Text>
            <View style={{ gap: 12 }}>
              <Tabs
                items={tabItems.slice(0, 3)}
                selectedId={selectedTab}
                onSelect={setSelectedTab}
                colorScheme="primary"
                variant="pills"
              />
              <Tabs
                items={tabItems.slice(0, 3)}
                selectedId={selectedTab}
                onSelect={setSelectedTab}
                colorScheme="secondary"
                variant="pills"
              />
              <Tabs
                items={tabItems.slice(0, 3)}
                selectedId={selectedTab}
                onSelect={setSelectedTab}
                colorScheme="accent"
                variant="pills"
              />
            </View>
          </View>
        </View>
      </Section>

      <Divider spacing={16} />

      <Section title="Breadcrumb">
        <View style={{ gap: 16 }}>
          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Default</Text>
            <Breadcrumb items={breadcrumbItems} />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Custom Separator</Text>
            <Breadcrumb items={breadcrumbItems} separator=">" />
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Sizes</Text>
            <View style={{ gap: 8 }}>
              <Breadcrumb items={breadcrumbItems} size="sm" />
              <Breadcrumb items={breadcrumbItems} size="md" />
              <Breadcrumb items={breadcrumbItems} size="lg" />
            </View>
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Color Schemes</Text>
            <View style={{ gap: 8 }}>
              <Breadcrumb items={breadcrumbItems} colorScheme="primary" />
              <Breadcrumb items={breadcrumbItems} colorScheme="secondary" />
              <Breadcrumb items={breadcrumbItems} colorScheme="accent" />
            </View>
          </View>

          <View>
            <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>Collapsed (Max 3 Items)</Text>
            <Breadcrumb items={breadcrumbItems} maxItems={3} />
          </View>
        </View>
      </Section>
    </ScrollView>
  );
}
