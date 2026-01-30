import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, TouchableOpacity, Pressable, Platform, Text as RNText, ActivityIndicator } from 'react-native';
import { useState, useCallback } from 'react';
import { useFonts, Kanit_300Light, Kanit_400Regular, Kanit_500Medium, Kanit_600SemiBold, Kanit_700Bold } from '@expo-google-fonts/kanit';
import * as SplashScreen from 'expo-splash-screen';
import { useDeviceType } from '@groxigo/ui-core';

// Keep the splash screen visible while we fetch fonts
SplashScreen.preventAutoHideAsync();
import {
  // Theme
  ThemeProvider,
  useTheme,
  // Typography
  Text,
  // Buttons & Actions
  Button,
  Link,
  // Layout
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Divider,
  Spacer,
  // Data Display
  Avatar,
  Badge,
  Icon,
  Image,
  // Form Inputs
  Input,
  TextArea,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Select,
  Slider,
  // Feedback
  Spinner,
  Progress,
  Skeleton,
  Toast,
  // Navigation
  Tabs,
  TabPanel,
  Breadcrumb,
  // Overlays
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Menu,
  MenuItem,
  Tooltip,
} from '@groxigo/ui-elements';

// Import composite components
import {
  ProductCard,
  SearchBar,
  FormField,
  QuantitySelector,
  Form,
  BottomSheet,
  EmptyState,
  ErrorState,
  ListItem,
  Rating,
  PriceDisplay,
  CartItem,
  AddToCartButton,
  FilterBar,
  SortSelector,
  Header,
  BottomNav,
  ReviewCard,
  TabBar,
  CategoryTile,
  ResponsiveGrid,
} from '@groxigo/components';

// Section component - uses Text which now auto-scales via useDeviceType
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { spacing } = useDeviceType();

  return (
    <View style={{ marginBottom: spacing(20) }}>
      <Text variant="h4" style={{ marginBottom: spacing(10) }}>
        {title}
      </Text>
      {children}
    </View>
  );
}

// ============================================
// UI ELEMENTS PREVIEW
// ============================================
function UIElementsPreview() {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState('option1');
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [selectValue, setSelectValue] = useState<string | number>('');
  const [sliderValue, setSliderValue] = useState(50);
  const [selectedTab, setSelectedTab] = useState('tab1');
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const selectOptions = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ];

  const tabItems = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' },
  ];

  const breadcrumbItems = [
    { label: 'Home', onPress: () => {} },
    { label: 'Products', onPress: () => {} },
    { label: 'Current' },
  ];

  const menuItems = [
    { id: '1', label: 'Edit', icon: '✏️', onPress: () => {} },
    { id: '2', label: 'Duplicate', icon: '📋', onPress: () => {} },
    { type: 'divider' as const },
    { id: '3', label: 'Delete', icon: '🗑️', destructive: true, onPress: () => {} },
  ];

  // Enterprise responsive system from @groxigo/ui-core
  const { deviceType, scale, spacing, diagonal } = useDeviceType();

  // Responsive padding and max width for tablets
  const padding = spacing(16);
  const maxWidth = deviceType === 'phone' ? undefined : deviceType === 'tablet' ? 700 : 1000;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding,
        paddingBottom: spacing(50),
        ...(maxWidth && { maxWidth, alignSelf: 'center', width: '100%' }),
      }}
    >
      <Text variant="h1" style={{ marginBottom: spacing(8) }}>
        UI Elements Preview
      </Text>
      <Text variant="body" colorScheme="muted" style={{ marginBottom: spacing(24) }}>
        27 primitives • {deviceType} • {Math.round(diagonal)}dp • {scale.fontScale}x
      </Text>

      {/* 1. Text */}
      <Section title="1. Text">
        <Text variant="h1">Heading 1</Text>
        <Text variant="h2">Heading 2</Text>
        <Text variant="h3">Heading 3</Text>
        <Text variant="h4">Heading 4</Text>
        <Text variant="body">Body text</Text>
        <Text variant="bodySmall">Body small</Text>
        <Text variant="caption" colorScheme="muted">Caption muted</Text>
      </Section>

      <Divider spacing={8} />

      {/* 2. Button */}
      <Section title="2. Button">
        <View style={{ gap: 8 }}>
          <Button>Solid (Default)</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="soft">Soft</Button>
          <Button variant="link">Link</Button>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </View>
          <Button colorScheme="success">Success</Button>
          <Button colorScheme="error">Error</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 3. Link */}
      <Section title="3. Link">
        <View style={{ gap: 8 }}>
          <Link href="#">Default Link</Link>
          <Link href="#" colorScheme="secondary">Secondary Link</Link>
          <Link href="#" underline>Always Underlined</Link>
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 4. Card */}
      <Section title="4. Card">
        <View style={{ gap: 12 }}>
          <Card variant="elevated">
            <CardHeader>
              <Text variant="h5">Elevated Card</Text>
            </CardHeader>
            <CardContent>
              <Text>Card content with shadow</Text>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
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
            </CardContent>
          </Card>
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 5. Divider */}
      <Section title="5. Divider">
        <Text variant="bodySmall">Solid:</Text>
        <Divider spacing={8} />
        <Text variant="bodySmall">Dashed:</Text>
        <Divider variant="dashed" spacing={8} />
        <Text variant="bodySmall">With label:</Text>
        <Divider label="OR" spacing={8} />
      </Section>

      <Divider spacing={8} />

      {/* 6. Spacer */}
      <Section title="6. Spacer">
        <Card variant="outlined">
          <CardContent>
            <View style={{ backgroundColor: theme.colors.primarySubtle, padding: 8 }}>
              <Text>Item 1</Text>
            </View>
            <Spacer size={4} />
            <View style={{ backgroundColor: theme.colors.primarySubtle, padding: 8 }}>
              <Text>Item 2 (16px gap)</Text>
            </View>
            <Spacer size={8} />
            <View style={{ backgroundColor: theme.colors.primarySubtle, padding: 8 }}>
              <Text>Item 3 (32px gap)</Text>
            </View>
          </CardContent>
        </Card>
      </Section>

      <Divider spacing={8} />

      {/* 7. Avatar */}
      <Section title="7. Avatar">
        <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
          <Avatar size="xs" fallback="XS" />
          <Avatar size="sm" fallback="SM" />
          <Avatar size="md" fallback="MD" />
          <Avatar size="lg" fallback="LG" colorScheme="primary" />
          <Avatar size="xl" fallback="XL" colorScheme="accent" />
          <Avatar fallback="ON" showStatus status="online" />
          <Avatar fallback="OF" showStatus status="offline" />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 8. Badge */}
      <Section title="8. Badge">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          <Badge colorScheme="primary">Primary</Badge>
          <Badge colorScheme="secondary">Secondary</Badge>
          <Badge colorScheme="accent">Accent</Badge>
          <Badge colorScheme="success">Success</Badge>
          <Badge colorScheme="warning">Warning</Badge>
          <Badge colorScheme="error">Error</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="soft">Soft</Badge>
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 9. Icon */}
      <Section title="9. Icon">
        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
          <Icon name="star" size="sm" />
          <Icon name="star" size="md" />
          <Icon name="star" size="lg" />
          <Icon name="heart" colorScheme="error" />
          <Icon name="check" colorScheme="success" />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 10. Image */}
      <Section title="10. Image">
        <View style={{ gap: 12 }}>
          <Image
            source={{ uri: 'https://picsum.photos/200/100' }}
            width={200}
            height={100}
            borderRadius={8}
          />
          <Image
            source={{ uri: 'https://picsum.photos/80/80' }}
            width={80}
            height={80}
            circular
          />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 11. Input */}
      <Section title="11. Input">
        <View style={{ gap: 12 }}>
          <Input
            label="Default Input"
            placeholder="Enter text..."
            value={inputValue}
            onChangeText={setInputValue}
          />
          <Input
            label="With Helper"
            placeholder="Email"
            helperText="We'll never share your email"
          />
          <Input
            label="Error State"
            placeholder="Password"
            error="This field is required"
          />
          <Input
            label="Disabled"
            placeholder="Disabled input"
            disabled
          />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 12. TextArea */}
      <Section title="12. TextArea">
        <View style={{ gap: 12 }}>
          <TextArea
            label="Message"
            placeholder="Type your message..."
            value={textAreaValue}
            onChangeText={setTextAreaValue}
            rows={3}
          />
          <TextArea
            label="With Error"
            placeholder="Required"
            error="This field is required"
          />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 13. Checkbox */}
      <Section title="13. Checkbox">
        <View style={{ gap: 8 }}>
          <Checkbox
            label="Default checkbox"
            checked={isChecked}
            onChange={setIsChecked}
          />
          <Checkbox label="Checked" checked colorScheme="primary" />
          <Checkbox label="Success" checked colorScheme="success" />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Indeterminate" indeterminate />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 14. Radio */}
      <Section title="14. Radio">
        <RadioGroup value={selectedRadio} onChange={setSelectedRadio}>
          <View style={{ gap: 8 }}>
            <Radio value="option1" label="Option 1" />
            <Radio value="option2" label="Option 2" />
            <Radio value="option3" label="Option 3" />
            <Radio value="option4" label="Disabled" disabled />
          </View>
        </RadioGroup>
      </Section>

      <Divider spacing={8} />

      {/* 15. Switch */}
      <Section title="15. Switch">
        <View style={{ gap: 8 }}>
          <Switch
            label="Enable notifications"
            value={isSwitchOn}
            onValueChange={setIsSwitchOn}
          />
          <Switch label="Primary" colorScheme="primary" value={true} />
          <Switch label="Success" colorScheme="success" value={true} />
          <Switch label="Disabled" disabled />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 16. Select */}
      <Section title="16. Select">
        <View style={{ gap: 12 }}>
          <Select
            label="Choose option"
            options={selectOptions}
            value={selectValue}
            onChange={setSelectValue}
            placeholder="Select..."
          />
          <Select
            label="With Error"
            options={selectOptions}
            error="Selection required"
          />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 17. Slider */}
      <Section title="17. Slider">
        <View style={{ gap: 16 }}>
          <Slider
            label="Volume"
            value={sliderValue}
            onValueChange={setSliderValue}
            showValue
          />
          <Slider
            label="Custom Range"
            minimumValue={0}
            maximumValue={100}
            step={10}
            value={50}
            showValue
            formatValue={(v) => `${v}%`}
          />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 18. Spinner */}
      <Section title="18. Spinner">
        <View style={{ flexDirection: 'row', gap: 24, alignItems: 'center' }}>
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
          <Spinner colorScheme="primary" />
          <Spinner colorScheme="success" />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 19. Progress */}
      <Section title="19. Progress">
        <View style={{ gap: 12 }}>
          <Progress value={50} />
          <Progress value={75} showLabel />
          <Progress value={60} colorScheme="success" />
          <Progress value={40} colorScheme="warning" />
          <Progress value={80} variant="striped" />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 20. Skeleton */}
      <Section title="20. Skeleton">
        <View style={{ gap: 12 }}>
          <Skeleton variant="text" lines={2} />
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Skeleton variant="circular" width={48} />
            <View style={{ flex: 1, gap: 8 }}>
              <Skeleton variant="text" width={120} />
              <Skeleton variant="text" />
            </View>
          </View>
          <Skeleton variant="rectangular" height={80} />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 21. Toast */}
      <Section title="21. Toast">
        <Button onPress={() => setShowToast(true)}>Show Toast</Button>
        {showToast && (
          <Toast
            variant="success"
            title="Success!"
            message="This is a toast notification."
            showCloseButton
            onDismiss={() => setShowToast(false)}
            position="bottom"
          />
        )}
      </Section>

      <Divider spacing={8} />

      {/* 22. Tabs */}
      <Section title="22. Tabs">
        <View style={{ gap: 16 }}>
          <Tabs
            items={tabItems}
            selectedId={selectedTab}
            onSelect={setSelectedTab}
          />
          <Card variant="outlined">
            <CardContent>
              <TabPanel isActive={selectedTab === 'tab1'}>
                <Text>Content for Tab 1</Text>
              </TabPanel>
              <TabPanel isActive={selectedTab === 'tab2'}>
                <Text>Content for Tab 2</Text>
              </TabPanel>
              <TabPanel isActive={selectedTab === 'tab3'}>
                <Text>Content for Tab 3</Text>
              </TabPanel>
            </CardContent>
          </Card>
          <Text variant="caption" colorScheme="muted">Pills variant:</Text>
          <Tabs items={tabItems} selectedId={selectedTab} onSelect={setSelectedTab} variant="pills" />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 23. Breadcrumb */}
      <Section title="23. Breadcrumb">
        <View style={{ gap: 12 }}>
          <Breadcrumb items={breadcrumbItems} />
          <Breadcrumb items={breadcrumbItems} separator=">" />
          <Breadcrumb items={breadcrumbItems} size="sm" />
          <Breadcrumb items={breadcrumbItems} colorScheme="primary" />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 24. Modal */}
      <Section title="24. Modal">
        <Button onPress={() => setShowModal(true)}>Open Modal</Button>
        <Modal
          visible={showModal}
          onClose={() => setShowModal(false)}
          title="Example Modal"
          size="md"
        >
          <ModalBody>
            <Text>This is modal content. It supports scrolling, keyboard avoidance, and backdrop click to close.</Text>
            <Spacer size={4} />
            <Text variant="bodySmall" colorScheme="muted">Press ESC or click outside to close.</Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onPress={() => setShowModal(false)}>Cancel</Button>
            <Button onPress={() => setShowModal(false)}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </Section>

      <Divider spacing={8} />

      {/* 25. Drawer */}
      <Section title="25. Drawer">
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button onPress={() => setShowDrawer(true)}>Open Drawer</Button>
        </View>
        <Drawer
          visible={showDrawer}
          onClose={() => setShowDrawer(false)}
          position="left"
          size="md"
          title="Menu"
        >
          <DrawerBody>
            <View style={{ gap: 12 }}>
              <Text>Home</Text>
              <Text>Profile</Text>
              <Text>Settings</Text>
              <Divider />
              <Text colorScheme="muted">Drawer slides from left, right, top, or bottom.</Text>
            </View>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" onPress={() => setShowDrawer(false)}>Close</Button>
          </DrawerFooter>
        </Drawer>
      </Section>

      <Divider spacing={8} />

      {/* 26. Menu */}
      <Section title="26. Menu (Dropdown)">
        <View style={{ alignItems: 'flex-start' }}>
          <Button onPress={() => setShowMenu(true)}>Show Menu</Button>
          <Menu
            visible={showMenu}
            onClose={() => setShowMenu(false)}
            items={menuItems}
            anchor="bottom-start"
          />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 27. Tooltip */}
      <Section title="27. Tooltip">
        <View style={{ flexDirection: 'row', gap: 16, flexWrap: 'wrap' }}>
          <Tooltip content="This is a tooltip!" placement="top">
            <Button variant="outline" size="sm">Hover/Long Press</Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" placement="bottom">
            <Badge colorScheme="primary">Bottom</Badge>
          </Tooltip>
        </View>
        <Spacer size={2} />
        <Text variant="caption" colorScheme="muted">
          Hover on web, long press on mobile
        </Text>
      </Section>

    </ScrollView>
  );
}

// ============================================
// COMPONENTS PREVIEW
// ============================================
function ComponentsPreview() {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(3.5);
  const [inCart, setInCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState('popular');
  const [selectedNavTab, setSelectedNavTab] = useState('home');
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const filters = [
    { id: 'organic', label: 'Organic', count: 24 },
    { id: 'vegan', label: 'Vegan', count: 12 },
    { id: 'glutenFree', label: 'Gluten Free', count: 8 },
    { id: 'local', label: 'Local', count: 15 },
  ];

  const sortOptions = [
    { id: 'popular', label: 'Most Popular' },
    { id: 'newest', label: 'Newest First' },
    { id: 'priceAsc', label: 'Price: Low to High' },
    { id: 'priceDesc', label: 'Price: High to Low' },
  ];

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'search', label: 'Search', icon: 'search' },
    { id: 'cart', label: 'Cart', icon: 'cart', badge: 3 },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ];

  const tabItems = [
    { id: 'all', label: 'All' },
    { id: 'fruits', label: 'Fruits' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'dairy', label: 'Dairy' },
  ];

  const listItems = [
    { id: '1', title: 'Fresh Apples', subtitle: 'Organic, 1kg', leftIcon: 'nutrition' },
    { id: '2', title: 'Milk', subtitle: 'Whole, 1L', leftIcon: 'water', badge: 'New' },
    { id: '3', title: 'Bread', subtitle: 'Whole wheat', leftIcon: 'cube' },
  ];

  // Enterprise responsive system from @groxigo/ui-core
  const { deviceType, scale, spacing, diagonal } = useDeviceType();

  // Responsive padding and max width for tablets
  const padding = spacing(16);
  const maxWidth = deviceType === 'phone' ? undefined : deviceType === 'tablet' ? 700 : 1000;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      contentContainerStyle={{
        padding,
        paddingBottom: spacing(50),
        ...(maxWidth && { maxWidth, alignSelf: 'center', width: '100%' }),
      }}
    >
      <Text variant="h1" style={{ marginBottom: spacing(8) }}>
        Components Preview
      </Text>
      <Text variant="body" colorScheme="muted" style={{ marginBottom: spacing(24) }}>
        29 composites • {deviceType} • {Math.round(diagonal)}dp • {scale.fontScale}x
      </Text>

      {/* 1. SearchBar */}
      <Section title="1. SearchBar">
        <SearchBar
          value={searchValue}
          onChangeText={setSearchValue}
          onSearch={(text) => console.log('Search:', text)}
          placeholder="Search products..."
        />
      </Section>

      <Divider spacing={8} />

      {/* 2. ProductCard */}
      <Section title="2. ProductCard">
        <View style={{ gap: 16 }}>
          <ProductCard
            image={{ uri: 'https://picsum.photos/200/200?random=1' }}
            title="Fresh Organic Apples"
            description="Sweet and crispy"
            price={4.99}
            compareAtPrice={6.99}
            badge="Sale"
            onPress={() => console.log('Product pressed')}
            quantity={cartQuantity}
            onQuantityChange={setCartQuantity}
          />
          <ProductCard
            image={{ uri: 'https://picsum.photos/200/200?random=2' }}
            title="Organic Bananas"
            price={2.99}
            isFavorite={true}
            onFavorite={(fav) => console.log('Favorite:', fav)}
            onPress={() => console.log('Product pressed')}
          />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 3. PriceDisplay */}
      <Section title="3. PriceDisplay">
        <View style={{ gap: 12 }}>
          <PriceDisplay price={9.99} size="lg" />
          <PriceDisplay price={7.99} originalPrice={12.99} size="md" />
          <PriceDisplay price={199} currency="INR" size="md" />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 4. QuantitySelector */}
      <Section title="4. QuantitySelector">
        <View style={{ alignItems: 'flex-start', gap: 12 }}>
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            min={1}
            max={10}
          />
          <Text variant="caption" colorScheme="muted">Value: {quantity}</Text>
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 5. AddToCartButton */}
      <Section title="5. AddToCartButton">
        <View style={{ gap: 12 }}>
          <AddToCartButton
            onPress={() => {
              setInCart(!inCart);
              if (!inCart) setCartQuantity(1);
              else setCartQuantity(0);
            }}
            inCart={inCart}
            quantity={cartQuantity}
          />
          <AddToCartButton
            label="Buy Now"
            variant="outline"
            onPress={() => console.log('Buy now')}
          />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 6. Rating */}
      <Section title="6. Rating">
        <View style={{ gap: 12 }}>
          <Rating value={4} showValue />
          <Rating value={rating} editable onChange={setRating} showValue />
          <Rating value={3.5} size="lg" />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 7. CartItem */}
      <Section title="7. CartItem">
        <CartItem
          image={{ uri: 'https://picsum.photos/100/100?random=3' }}
          title="Organic Avocados"
          description="Pack of 3"
          price={8.99}
          quantity={2}
          onQuantityChange={(q) => console.log('Quantity:', q)}
          onRemove={() => console.log('Remove')}
        />
      </Section>

      <Divider spacing={8} />

      {/* 8. ListItem */}
      <Section title="8. ListItem">
        <View style={{ gap: 1 }}>
          {listItems.map((item) => (
            <ListItem
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              leftIcon={item.leftIcon}
              badge={item.badge}
              rightIcon="chevron-right"
              onPress={() => console.log('Pressed:', item.title)}
            />
          ))}
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 9. CategoryTile */}
      <Section title="9. CategoryTile">
        <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
          <CategoryTile
            title="Fruits"
            icon="nutrition"
            onPress={() => console.log('Fruits')}
          />
          <CategoryTile
            title="Vegetables"
            icon="leaf"
            onPress={() => console.log('Vegetables')}
          />
          <CategoryTile
            title="Dairy"
            icon="water"
            onPress={() => console.log('Dairy')}
          />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 10. FilterBar */}
      <Section title="10. FilterBar">
        <FilterBar
          filters={filters}
          selectedFilters={selectedFilters}
          onFiltersChange={setSelectedFilters}
          showCounts
        />
        <Text variant="caption" colorScheme="muted" style={{ marginTop: 8 }}>
          Selected: {selectedFilters.join(', ') || 'None'}
        </Text>
      </Section>

      <Divider spacing={8} />

      {/* 11. SortSelector */}
      <Section title="11. SortSelector">
        <SortSelector
          options={sortOptions}
          selectedId={selectedSort}
          onChange={setSelectedSort}
        />
      </Section>

      <Divider spacing={8} />

      {/* 12. FormField */}
      <Section title="12. FormField">
        <View style={{ gap: 12 }}>
          <FormField
            label="Email"
            placeholder="Enter your email"
            required
          />
          <FormField
            label="Password"
            placeholder="Enter password"
            error="Password is required"
          />
        </View>
      </Section>

      <Divider spacing={8} />

      {/* 13. Header */}
      <Section title="13. Header">
        <Header
          title="Products"
          leftAction={
            <Pressable style={{ padding: 8 }}>
              <Icon name="arrow-left" size="md" />
            </Pressable>
          }
          rightActions={[
            <Pressable key="search" style={{ padding: 8 }}>
              <Icon name="search" size="md" />
            </Pressable>,
            <Pressable key="cart" style={{ padding: 8 }}>
              <Icon name="cart" size="md" />
            </Pressable>,
          ]}
        />
      </Section>

      <Divider spacing={8} />

      {/* 14. TabBar */}
      <Section title="14. TabBar">
        <TabBar
          items={tabItems}
          selectedId={selectedNavTab}
          onSelect={setSelectedNavTab}
        />
      </Section>

      <Divider spacing={8} />

      {/* 15. ReviewCard */}
      <Section title="15. ReviewCard">
        <ReviewCard
          reviewerName="John Doe"
          rating={4.5}
          review="Great quality products! The apples were fresh and crispy. Will definitely order again."
          date={new Date('2024-01-15')}
          verified
        />
      </Section>

      <Divider spacing={8} />

      {/* 16. EmptyState */}
      <Section title="16. EmptyState">
        <EmptyState
          icon="cart"
          title="Your cart is empty"
          description="Add some items to get started"
          actionLabel="Browse Products"
          onAction={() => console.log('Browse')}
        />
      </Section>

      <Divider spacing={8} />

      {/* 17. ErrorState */}
      <Section title="17. ErrorState">
        <ErrorState
          title="Something went wrong"
          message="We couldn't load the products. Please try again."
          retryLabel="Retry"
          onRetry={() => console.log('Retry')}
        />
      </Section>

      <Divider spacing={8} />

      {/* 18. BottomSheet */}
      <Section title="18. BottomSheet">
        <Button onPress={() => setShowBottomSheet(true)}>Open Bottom Sheet</Button>
        <BottomSheet
          visible={showBottomSheet}
          onClose={() => setShowBottomSheet(false)}
          title="Filter Options"
        >
          <View style={{ gap: 16, padding: 16 }}>
            <Text>Select your preferences</Text>
            <Button onPress={() => setShowBottomSheet(false)}>Apply Filters</Button>
          </View>
        </BottomSheet>
      </Section>

      <Divider spacing={8} />

      {/* 19. ResponsiveGrid */}
      <Section title="19. ResponsiveGrid">
        <Text variant="caption" colorScheme="muted" style={{ marginBottom: 8 }}>
          Responsive grid with 2 columns on mobile
        </Text>
        <ResponsiveGrid columns={{ mobile: 2, tablet: 3, desktop: 4 }}>
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} variant="outlined">
              <CardContent>
                <Text>Item {i}</Text>
              </CardContent>
            </Card>
          ))}
        </ResponsiveGrid>
      </Section>

      <Divider spacing={8} />

      {/* 20. BottomNav */}
      <Section title="20. BottomNav (Fixed Position Preview)">
        <Card variant="outlined">
          <CardContent>
            <BottomNav
              items={navItems}
              selectedId={selectedNavTab}
              onSelect={setSelectedNavTab}
            />
          </CardContent>
        </Card>
        <Text variant="caption" colorScheme="muted" style={{ marginTop: 8 }}>
          Normally fixed at bottom of screen
        </Text>
      </Section>

    </ScrollView>
  );
}

// ============================================
// MAIN APP WITH PAGE TABS
// ============================================
function PreviewContent() {
  const theme = useTheme();
  const [activePage, setActivePage] = useState<'elements' | 'components'>('elements');

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {/* Page Tabs */}
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
          paddingTop: Platform.OS === 'ios' ? 50 : 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setActivePage('elements')}
          activeOpacity={0.7}
          style={{
            flex: 1,
            paddingVertical: 16,
            alignItems: 'center',
            borderBottomWidth: 2,
            borderBottomColor: activePage === 'elements' ? theme.colors.primary : 'transparent',
          }}
        >
          <Text
            variant="body"
            weight={activePage === 'elements' ? 'semibold' : 'regular'}
            style={{ color: activePage === 'elements' ? theme.colors.primary : theme.colors.textSecondary }}
          >
            UI Elements
          </Text>
          <Text variant="caption" colorScheme="muted">27 primitives</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActivePage('components')}
          activeOpacity={0.7}
          style={{
            flex: 1,
            paddingVertical: 16,
            alignItems: 'center',
            borderBottomWidth: 2,
            borderBottomColor: activePage === 'components' ? theme.colors.primary : 'transparent',
          }}
        >
          <Text
            variant="body"
            weight={activePage === 'components' ? 'semibold' : 'regular'}
            style={{ color: activePage === 'components' ? theme.colors.primary : theme.colors.textSecondary }}
          >
            Components
          </Text>
          <Text variant="caption" colorScheme="muted">29 composites</Text>
        </TouchableOpacity>
      </View>

      {/* Page Content */}
      <View style={{ flex: 1 }}>
        {activePage === 'elements' ? <UIElementsPreview /> : <ComponentsPreview />}
      </View>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Kanit_300Light,
    Kanit_400Regular,
    Kanit_500Medium,
    Kanit_600SemiBold,
    Kanit_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#2563eb" />
        <RNText style={{ marginTop: 16, color: '#666' }}>Loading fonts...</RNText>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider>
        <PreviewContent />
        <StatusBar style="auto" />
      </ThemeProvider>
    </View>
  );
}
