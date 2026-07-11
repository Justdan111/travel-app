import '../global.css';

import { Tabs } from 'expo-router/js-tabs';
import { StatusBar } from 'expo-status-bar';

import { TabBar } from '@/components/tab-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        tabBar={(props) => <TabBar {...props} />}
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: '#F4F3F1' },
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="trips" />
        <Tabs.Screen name="favorites" />
        <Tabs.Screen name="menu" />
      </Tabs>
    </>
  );
}
