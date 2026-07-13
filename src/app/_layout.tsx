import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#F4F3F1' },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="destination/[id]" />
        <Stack.Screen name="trip/[id]" />
      </Stack>
    </GestureHandlerRootView>
  );
}
