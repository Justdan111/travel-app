import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DestinationCarousel } from '@/components/destination-carousel';
import {
  AVATAR_URI,
  DESTINATIONS,
  REGIONS,
  Region,
} from '@/data/destinations';

export default function HomeScreen() {
  const [region, setRegion] = useState<Region>('South America');

  const destinations = DESTINATIONS.filter((d) => d.region === region);
  const initialIndex = destinations.length > 1 ? 1 : 0;

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-canvas">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        <View className="flex-row items-center justify-between px-6 pt-3">
          <View>
            <Text className="text-[28px] font-bold text-ink">
              Hello, Vanessa
            </Text>
            <Text className="mt-1 text-[15px] text-muted">
              Welcome to TripGlide
            </Text>
          </View>
          <Image
            source={{ uri: AVATAR_URI }}
            style={{ width: 48, height: 48, borderRadius: 24 }}
            contentFit="cover"
            transition={200}
          />
        </View>

        <View className="mt-6 flex-row items-center gap-3 px-6">
          <View
            className="h-14 flex-1 flex-row items-center rounded-full bg-white px-5"
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.04,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 4 },
              elevation: 2,
            }}
          >
            <Feather name="search" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#9CA3AF"
              className="ml-3 flex-1 text-[16px] text-ink"
            />
          </View>
          <Pressable className="h-14 w-14 items-center justify-center rounded-full bg-[#161616]">
            <Feather name="sliders" size={20} color="#FFFFFF" />
          </Pressable>
        </View>

        <Text className="mt-8 px-6 text-[26px] font-bold text-ink">
          Select your next trip
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-5"
          contentContainerStyle={{ paddingHorizontal: 24, gap: 10 }}
        >
          {REGIONS.map((item) => {
            const selected = item === region;
            return (
              <Pressable
                key={item}
                onPress={() => setRegion(item)}
                className={`h-12 items-center justify-center rounded-full px-6 ${
                  selected ? 'bg-[#161616]' : 'bg-white'
                }`}
              >
                <Text
                  className={`text-[15px] ${
                    selected ? 'font-medium text-white' : 'text-[#6B7280]'
                  }`}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View className="mt-7">
          <DestinationCarousel
            key={region}
            destinations={destinations}
            initialIndex={initialIndex}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
