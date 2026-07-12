export type Region =
  | 'Asia'
  | 'Europe'
  | 'South America'
  | 'North America'
  | 'Africa'
  | 'Oceania';

export const REGIONS: Region[] = [
  'Asia',
  'Europe',
  'South America',
  'North America',
  'Africa',
  'Oceania',
];

export type Destination = {
  id: string;
  name: string;
  country: string;
  region: Region;
  rating: number;
  reviews: number;
  image: string;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1400&auto=format&fit=crop`;

export const DESTINATIONS: Destination[] = [
  {
    id: 'rio-de-janeiro',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    region: 'South America',
    rating: 5.0,
    reviews: 143,
    image: unsplash('photo-1506905925346-21bda4d32df4'),
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    country: 'Peru',
    region: 'South America',
    rating: 4.9,
    reviews: 212,
    image: unsplash('photo-1526392060635-9d6019884377'),
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    country: 'Argentina',
    region: 'South America',
    rating: 4.8,
    reviews: 98,
    image: unsplash('photo-1469474968028-56623f02e42e'),
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    rating: 4.9,
    reviews: 321,
    image: unsplash('photo-1537996194471-e657df975ab4'),
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    rating: 4.8,
    reviews: 187,
    image: unsplash('photo-1493976040374-85c8e12f0c0e'),
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    rating: 4.9,
    reviews: 264,
    image: unsplash('photo-1570077188670-e3a8d69ac5ff'),
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    region: 'Europe',
    rating: 4.7,
    reviews: 402,
    image: unsplash('photo-1502602898657-3e91760cbb34'),
  },
  {
    id: 'cinque-terre',
    name: 'Cinque Terre',
    country: 'Italy',
    region: 'Europe',
    rating: 4.8,
    reviews: 156,
    image: unsplash('photo-1516483638261-f4dbaf036963'),
  },
  {
    id: 'san-francisco',
    name: 'San Francisco',
    country: 'United States',
    region: 'North America',
    rating: 4.6,
    reviews: 289,
    image: unsplash('photo-1501594907352-04cda38ebc29'),
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    region: 'North America',
    rating: 4.7,
    reviews: 512,
    image: unsplash('photo-1496442226666-8d4d0e62e6e9'),
  },
  {
    id: 'serengeti',
    name: 'Serengeti',
    country: 'Tanzania',
    region: 'Africa',
    rating: 4.9,
    reviews: 134,
    image: unsplash('photo-1516426122078-c23e76319801'),
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    region: 'Oceania',
    rating: 4.7,
    reviews: 231,
    image: unsplash('photo-1506973035872-a4ec16b8e8d9'),
  },
];

export const AVATAR_URI = unsplash('photo-1494790108377-be9c29b29330');

export type TripDay = {
  day: number;
  title: string;
  image: string;
  morning: string;
  afternoon: string;
  evening: string;
};

export type Trip = {
  title: string;
  dates: string;
  heading: string;
  days: TripDay[];
};

const PLANE_IMAGE = unsplash('photo-1436491865332-7a61a109cc05');
const DINNER_IMAGE = unsplash('photo-1414235077428-338989a2e8c0');

const RIO_DAY_TITLES = [
  'Arrival to Rio de Janeiro',
  'Rio de Janeiro Highlights',
  'Sugarloaf Mountain & Urca',
  'Christ the Redeemer & Santa Teresa',
  'Copacabana & Ipanema Beaches',
  'Tijuca Rainforest Adventure',
  'Day trip to Ilha Grande',
  'Departure day',
];

function genericDayTitles(name: string): string[] {
  return [
    `Arrival to ${name}`,
    `${name} Highlights`,
    'Old town walking tour',
    'Local food & markets',
    'Nature day trip',
    'Hidden gems & viewpoints',
    'Free day to explore',
    'Departure day',
  ];
}

const RIO_AERIAL_IMAGE = unsplash('photo-1483729558449-99ef09a8c325');

function buildDays(destination: Destination, titles: string[]): TripDay[] {
  const isRio = destination.id === 'rio-de-janeiro';
  const welcomeDinner = isRio
    ? 'Welcome dinner at a traditional Brazilian restaurant'
    : 'Welcome dinner at a traditional local restaurant';

  return titles.map((title, i) => ({
    day: i + 1,
    title,
    image:
      i === 0
        ? PLANE_IMAGE
        : i === titles.length - 1
          ? DINNER_IMAGE
          : isRio && i === 1
            ? RIO_AERIAL_IMAGE
            : destination.image,
    morning:
      i === 0
        ? `Arrive in ${destination.name} and transfer to your hotel`
        : `Guided morning around ${title.toLowerCase()}`,
    afternoon:
      i === 0
        ? 'Free time to relax or explore the nearby area'
        : 'Lunch at a local spot, then time at your own pace',
    evening: i === 0 ? welcomeDinner : 'Dinner and evening stroll with the group',
  }));
}

export function getTrip(destination: Destination): Trip {
  const country =
    destination.country === 'United States' ? 'USA' : destination.country;
  const titles =
    destination.id === 'rio-de-janeiro'
      ? RIO_DAY_TITLES
      : genericDayTitles(destination.name);

  return {
    title: `Iconic ${country}`,
    dates: 'Wed, Oct 21 – Sun, Nov 1',
    heading: `8-Days ${country} Adventure`,
    days: buildDays(destination, titles),
  };
}
