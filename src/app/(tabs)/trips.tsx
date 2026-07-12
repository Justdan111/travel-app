import { Text, View } from 'react-native';

export default function TripsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-canvas">
      <Text className="text-xl font-semibold text-ink">Trips</Text>
      <Text className="mt-2 text-[15px] text-muted">
        Your booked trips will appear here.
      </Text>
    </View>
  );
}
