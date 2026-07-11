import { useEffect, useRef } from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import { DestinationCard } from '@/components/destination-card';
import type { Destination } from '@/data/destinations';

const GAP = 14;

type Props = {
  destinations: Destination[];
  initialIndex?: number;
};

export function DestinationCarousel({ destinations, initialIndex = 0 }: Props) {
  const { width, height: windowHeight } = useWindowDimensions();
  const cardWidth = width * 0.8;
  const cardHeight = Math.min(cardWidth * 1.38, windowHeight * 0.46);
  const snapInterval = cardWidth + GAP;
  const sidePadding = (width - cardWidth) / 2;

  const startIndex = Math.min(initialIndex, destinations.length - 1);
  const scrollX = useSharedValue(startIndex * snapInterval);
  const listRef = useRef<FlatList<Destination>>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({
        offset: startIndex * snapInterval,
        animated: false,
      });
    });
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <Animated.FlatList
      ref={listRef}
      data={destinations}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={snapInterval}
      decelerationRate="fast"
      onScroll={onScroll}
      scrollEventThrottle={16}
      getItemLayout={(_, index) => ({
        length: snapInterval,
        offset: snapInterval * index,
        index,
      })}
      contentContainerStyle={{ paddingHorizontal: sidePadding, gap: GAP }}
      style={{ flexGrow: 0 }}
      renderItem={({ item, index }) => (
        <DestinationCard
          destination={item}
          index={index}
          scrollX={scrollX}
          snapInterval={snapInterval}
          width={cardWidth}
          height={cardHeight}
        />
      )}
    />
  );
}
