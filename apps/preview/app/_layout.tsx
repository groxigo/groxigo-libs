import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useThemeContext } from '@groxigo/ui-elements';
import { useState, createContext, useContext } from 'react';
import { Pressable, View, Text } from 'react-native';

// App-level state for theme toggle
const AppContext = createContext<{
  toggleTheme: () => void;
  isDark: boolean;
}>({
  toggleTheme: () => {},
  isDark: false,
});

export const useAppContext = () => useContext(AppContext);

function ThemeToggleButton() {
  const { toggleTheme, isDark } = useAppContext();

  return (
    <Pressable
      onPress={toggleTheme}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
      }}
    >
      <Text style={{ fontSize: 20 }}>{isDark ? '☀️' : '🌙'}</Text>
    </Pressable>
  );
}

function RootLayoutNav() {
  const { colorScheme } = useThemeContext();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
          },
          headerTintColor: isDark ? '#F8FAFC' : '#111827',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerRight: () => <ThemeToggleButton />,
          contentStyle: {
            backgroundColor: isDark ? '#0F172A' : '#F8FAFC',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'UI Elements',
          }}
        />
        <Stack.Screen
          name="typography"
          options={{
            title: 'Typography',
          }}
        />
        <Stack.Screen
          name="buttons"
          options={{
            title: 'Buttons & Links',
          }}
        />
        <Stack.Screen
          name="forms"
          options={{
            title: 'Form Elements',
          }}
        />
        <Stack.Screen
          name="layout"
          options={{
            title: 'Layout',
          }}
        />
        <Stack.Screen
          name="feedback"
          options={{
            title: 'Feedback',
          }}
        />
        <Stack.Screen
          name="data-display"
          options={{
            title: 'Data Display',
          }}
        />
        <Stack.Screen
          name="navigation"
          options={{
            title: 'Navigation',
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <AppContext.Provider value={{ toggleTheme, isDark }}>
      <ThemeProvider initialColorScheme={isDark ? 'dark' : 'light'}>
        <RootLayoutNav />
      </ThemeProvider>
    </AppContext.Provider>
  );
}
