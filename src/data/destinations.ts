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
    id: 'machu-picchu',
    name: 'Machu Picchu',
    country: 'Peru',
    region: 'South America',
    rating: 4.9,
    reviews: 212,
    image: unsplash('photo-1526392060635-9d6019884377'),
  },
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
