import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hello from Preview!</Text>
      <Text style={{ marginTop: 20 }}>Basic React Native test (no @groxigo packages)</Text>
      <StatusBar style="auto" />
    </View>
  );
}
