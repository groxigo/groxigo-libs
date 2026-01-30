import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Text as RNText } from 'react-native';
import {
  ThemeProvider,
  Text,
  Button,
} from '@groxigo/ui-elements';

function App() {
  return (
    <ThemeProvider>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text variant="h1">Hello from Preview!</Text>
        <Text style={{ marginTop: 20 }}>This is a simple test of ui-elements.</Text>
        <Button onPress={() => console.log('Button pressed!')} style={{ marginTop: 20 }}>
          Press Me
        </Button>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

export default App;
