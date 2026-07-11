import { Text, View } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-canvas">
      <Text className="text-xl font-semibold text-ink">Favorites</Text>
      <Text className="mt-2 text-[15px] text-muted">
        Destinations you love, saved in one place.
      </Text>
    </View>
  );
}
