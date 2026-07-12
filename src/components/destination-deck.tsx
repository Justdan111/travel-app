import { useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

import { DestinationCard } from '@/components/destination-card';
import type { Destination } from '@/data/destinations';

// Peek positions of the cards resting behind the top one (right and left slivers).
const PEEK_RIGHT = { x: 40, scale: 0.92 };
const PEEK_LEFT = { x: -46, scale: 0.88 };

type DeckEntry = { destination: Destination; cycle: number };

type DeckCardProps = {
  entry: DeckEntry;
  depth: number;
  swipeX: SharedValue<number>;
  swipeY: SharedValue<number>;
  cardWidth: number;
  cardHeight: number;
  screenWidth: number;
  onPress: (destination: Destination) => void;
};

function DeckCard({
  entry,
  depth,
  swipeX,
  swipeY,
  cardWidth,
  cardHeight,
  screenWidth,
  onPress,
}: DeckCardProps) {
  const animatedStyle = useAnimatedStyle(() => {
    if (depth === 0) {
      return {
        transform: [
          { translateX: swipeX.value },
          { translateY: swipeY.value },
          { rotate: `${(swipeX.value / screenWidth) * 12}deg` },
        ],
      };
    }

    // Progress of the top card's swipe: behind cards slide forward as it leaves.
    const progress = Math.min(Math.abs(swipeX.value) / cardWidth, 1);
    if (depth === 1) {
      return {
        transform: [
          { translateX: interpolate(progress, [0, 1], [PEEK_RIGHT.x, 0]) },
          { scale: interpolate(progress, [0, 1], [PEEK_RIGHT.scale, 1]) },
        ],
      };
    }
    if (depth === 2) {
      return {
        transform: [
          {
            translateX: interpolate(progress, [0, 1], [PEEK_LEFT.x, PEEK_RIGHT.x]),
          },
          {
            scale: interpolate(progress, [0, 1], [PEEK_LEFT.scale, PEEK_RIGHT.scale]),
          },
        ],
      };
    }
    // Deeper cards wait hidden at the left-peek slot.
    return {
      transform: [{ translateX: PEEK_LEFT.x }, { scale: PEEK_LEFT.scale }],
    };
  });

  return (
    <Animated.View
      style={[
        { position: 'absolute', left: (screenWidth - cardWidth) / 2 },
        animatedStyle,
      ]}
    >
      <DestinationCard
        destination={entry.destination}
        width={cardWidth}
        height={cardHeight}
        onPress={() => onPress(entry.destination)}
      />
    </Animated.View>
  );
}

type Props = {
  destinations: Destination[];
  onOpenDestination: (destination: Destination) => void;
};

export function DestinationDeck({ destinations, onOpenDestination }: Props) {
  const { width, height: windowHeight } = useWindowDimensions();
  const cardWidth = width * 0.8;
  const cardHeight = Math.min(cardWidth * 1.38, windowHeight * 0.46);

  const [deck, setDeck] = useState<DeckEntry[]>(() =>
    destinations.map((destination) => ({ destination, cycle: 0 })),
  );

  useEffect(() => {
    setDeck(destinations.map((destination) => ({ destination, cycle: 0 })));
  }, [destinations]);

  const swipeX = useSharedValue(0);
  const swipeY = useSharedValue(0);

  const advance = () => {
    setDeck((current) => {
      if (current.length < 2) return current;
      const [top, ...rest] = current;
      return [...rest, { ...top, cycle: top.cycle + 1 }];
    });
    swipeX.value = 0;
    swipeY.value = 0;
  };

  const pan = Gesture.Pan()
    .activeOffsetX([-12, 12])
    .failOffsetY([-16, 16])
    .onUpdate((event) => {
      swipeX.value = event.translationX;
      swipeY.value = event.translationY * 0.4;
    })
    .onEnd((event) => {
      const shouldFling =
        Math.abs(swipeX.value) > cardWidth * 0.35 ||
        Math.abs(event.velocityX) > 900;
      if (shouldFling) {
        const direction = swipeX.value >= 0 ? 1 : -1;
        swipeX.value = withTiming(
          direction * width * 1.4,
          { duration: 240 },
          (finished) => {
            if (finished) runOnJS(advance)();
          },
        );
        swipeY.value = withTiming(swipeY.value + 32, { duration: 240 });
      } else {
        swipeX.value = withSpring(0, { damping: 18, stiffness: 180 });
        swipeY.value = withSpring(0, { damping: 18, stiffness: 180 });
      }
    });

  const visible = deck.slice(0, 3);

  return (
    <View
      style={{
        height: cardHeight,
        width: '100%',
        alignItems: 'center',
      }}
    >
      {visible
        .map((entry, depth) => ({ entry, depth }))
        .reverse()
        .map(({ entry, depth }) => {
          const card = (
            <DeckCard
              key={`${entry.destination.id}-${entry.cycle}`}
              entry={entry}
              depth={depth}
              swipeX={swipeX}
              swipeY={swipeY}
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              screenWidth={width}
              onPress={onOpenDestination}
            />
          );
          if (depth === 0) {
            return (
              <GestureDetector key={`gesture-${entry.destination.id}-${entry.cycle}`} gesture={pan}>
                {card}
              </GestureDetector>
            );
          }
          return card;
        })}
    </View>
  );
}
