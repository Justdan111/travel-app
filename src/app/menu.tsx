import { Text, View } from 'react-native';

export default function MenuScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-canvas">
      <Text className="text-xl font-semibold text-ink">Menu</Text>
      <Text className="mt-2 text-[15px] text-muted">
        Settings and more coming soon.
      </Text>
    </View>
  );
}
