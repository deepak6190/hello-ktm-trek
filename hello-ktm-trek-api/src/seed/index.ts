import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { TripModel } from '../models/trip.model'
import { DestinationModel } from '../models/destination.model'
import { BlogModel } from '../models/blog.model'
import { ReviewModel } from '../models/review.model'

dotenv.config()

const trips = [
  {
    title: 'Everest Base Camp Trek',
    slug: 'everest-base-camp-trek',
    destination: 'Nepal',
    region: 'Everest',
    activityType: 'Trekking',
    difficulty: 'Challenging',
    duration: 14,
    maxAltitude: 5364,
    price: 1299,
    rating: 4.9,
    reviewCount: 312,
    thumbnail: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800',
    images: ['https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800', 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=800'],
    overview: 'The Everest Base Camp trek is one of the most iconic and rewarding treks in the world. Walking in the footsteps of legendary mountaineers, you will witness breathtaking Himalayan scenery.',
    highlights: ['Stand at Everest Base Camp (5,364m)', 'Sunrise view from Kala Patthar (5,545m)', 'Visit Namche Bazaar, the Sherpa capital', 'Explore Tengboche Monastery', 'Views of Lhotse, Nuptse & Ama Dablam'],
    itinerary: [
      { day: 1, title: 'Fly to Lukla, Trek to Phakding', description: 'Morning flight to Lukla (2,860m), then a 3-hour trek to Phakding.', altitude: 2610, distance: '8 km', meals: ['Lunch', 'Dinner'], accommodation: 'Tea House' },
      { day: 2, title: 'Phakding to Namche Bazaar', description: 'Trek through rhododendron forests crossing suspension bridges.', altitude: 3440, distance: '11 km', meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Tea House' },
      { day: 3, title: 'Acclimatisation Day in Namche', description: 'Rest day in Namche Bazaar. Optional hike to Everest View Hotel.', altitude: 3440, meals: ['Breakfast', 'Lunch', 'Dinner'], accommodation: 'Tea House' },
    ],
    includes: ['Airport transfers', 'Accommodation in teahouses', 'All meals on trek', 'Experienced guide', 'Porter (2 trekkers per porter)', 'TIMS card & Sagarmatha permit'],
    excludes: ['International flights', 'Travel insurance', 'Personal gear', 'Tips'],
    bestSeason: ['March', 'April', 'May', 'October', 'November'],
    groupSize: { min: 1, max: 16 },
    isFeatured: true,
    isPopular: true,
  },
  {
    title: 'Annapurna Base Camp Trek',
    slug: 'annapurna-base-camp-trek',
    destination: 'Nepal',
    region: 'Annapurna',
    activityType: 'Trekking',
    difficulty: 'Moderate',
    duration: 12,
    maxAltitude: 4130,
    price: 999,
    rating: 4.8,
    reviewCount: 245,
    thumbnail: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800',
    images: ['https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800'],
    overview: 'Trek through diverse landscapes to the heart of the Annapurna sanctuary, surrounded by eight peaks over 7,000m.',
    highlights: ['Annapurna Base Camp at 4,130m', 'Machapuchare (Fishtail) views', 'Hot springs at Jhinu Danda', 'Diverse flora and fauna'],
    itinerary: [],
    includes: ['Accommodation', 'All meals', 'Guide & porter', 'ACAP permit'],
    excludes: ['Flights', 'Insurance', 'Personal gear'],
    bestSeason: ['March', 'April', 'October', 'November'],
    groupSize: { min: 1, max: 14 },
    isFeatured: true,
    isPopular: true,
  },
  {
    title: 'Langtang Valley Trek',
    slug: 'langtang-valley-trek',
    destination: 'Nepal',
    region: 'Langtang',
    activityType: 'Trekking',
    difficulty: 'Moderate',
    duration: 7,
    maxAltitude: 3870,
    price: 699,
    rating: 4.7,
    reviewCount: 128,
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
    overview: 'A scenic valley trek close to Kathmandu, offering stunning mountain views and a glimpse into Tamang culture.',
    highlights: ['Kyanjin Gompa monastery', 'Views of Langtang Lirung', 'Tamang Heritage Trail', 'Cheese factory visit'],
    itinerary: [],
    includes: ['Accommodation', 'All meals', 'Guide & porter', 'Langtang NP permit'],
    excludes: ['Flights', 'Insurance', 'Personal gear'],
    bestSeason: ['March', 'April', 'May', 'October', 'November'],
    groupSize: { min: 1, max: 12 },
    isFeatured: false,
    isPopular: true,
  },
  {
    title: 'Everest Helicopter Tour',
    slug: 'everest-helicopter-tour',
    destination: 'Nepal',
    region: 'Everest',
    activityType: 'Helicopter Tour',
    difficulty: 'Easy',
    duration: 1,
    maxAltitude: 5364,
    price: 1199,
    rating: 4.9,
    reviewCount: 89,
    thumbnail: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800',
    images: ['https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800'],
    overview: 'A spectacular helicopter flight offering unparalleled views of Mount Everest and the Khumbu region.',
    highlights: ['Fly over Everest Base Camp', 'Land at Kala Patthar', 'Breakfast at Everest View Hotel', 'Aerial view of Khumbu Icefall'],
    itinerary: [],
    includes: ['Helicopter charter', 'Breakfast', 'All permits'],
    excludes: ['Hotel pickup/drop', 'Insurance'],
    bestSeason: ['January', 'February', 'March', 'April', 'May', 'October', 'November', 'December'],
    groupSize: { min: 1, max: 5 },
    isFeatured: true,
    isPopular: false,
  },
  {
    title: 'Bhutan Cultural Tour',
    slug: 'bhutan-cultural-tour',
    destination: 'Bhutan',
    activityType: 'Cultural Tour',
    difficulty: 'Easy',
    duration: 8,
    price: 2499,
    rating: 4.8,
    reviewCount: 67,
    thumbnail: 'https://images.unsplash.com/photo-1569963731117-a9a3b748ccd7?w=800',
    images: ['https://images.unsplash.com/photo-1569963731117-a9a3b748ccd7?w=800'],
    overview: "Explore the Last Shangri-La — a kingdom where Gross National Happiness is prioritised over GDP.",
    highlights: ["Tiger's Nest Monastery trek", 'Punakha Dzong', 'Traditional archery', 'Local farmhouse stay'],
    itinerary: [],
    includes: ['All accommodation', 'All meals', 'Licensed guide', 'Sustainable Development Fee', 'Internal transport'],
    excludes: ['International flights', 'Visa fee', 'Personal expenses'],
    bestSeason: ['March', 'April', 'May', 'September', 'October', 'November'],
    groupSize: { min: 2, max: 12 },
    isFeatured: true,
    isPopular: false,
  },
  {
    title: 'Upper Mustang Trek',
    slug: 'upper-mustang-trek',
    destination: 'Nepal',
    region: 'Mustang',
    activityType: 'Trekking',
    difficulty: 'Moderate',
    duration: 15,
    maxAltitude: 3840,
    price: 1799,
    rating: 4.9,
    reviewCount: 54,
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800'],
    overview: 'Journey to the Forbidden Kingdom — a restricted trek through ancient Tibetan culture and dramatic desert landscapes.',
    highlights: ['Lo Manthang walled city', 'Ancient cave monasteries', 'Tibetan plateau scenery', 'Rare Buddhist art & culture'],
    itinerary: [],
    includes: ['All accommodation', 'All meals', 'Guide & porter', 'Upper Mustang permit', 'ACAP permit'],
    excludes: ['Flights', 'Insurance', 'Personal gear'],
    bestSeason: ['March', 'April', 'May', 'June', 'July', 'August', 'September'],
    groupSize: { min: 2, max: 10 },
    isFeatured: false,
    isPopular: false,
  },
]

const destinations = [
  { name: 'Nepal', tagline: 'Home of the Himalayas', description: "Nepal is the trekking capital of the world, home to 8 of the world's 14 highest peaks including Mount Everest.", thumbnail: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800', images: [], highlights: ['Mount Everest', 'Annapurna Circuit', 'Pokhara', 'Chitwan National Park'], tripCount: 33 },
  { name: 'Bhutan', tagline: 'The Last Shangri-La', description: "A mystical Buddhist kingdom nestled in the Eastern Himalayas where happiness is a national policy.", thumbnail: 'https://images.unsplash.com/photo-1569963731117-a9a3b748ccd7?w=800', images: [], highlights: ["Tiger's Nest", 'Punakha Dzong', 'Gross National Happiness', 'Himalayan views'], tripCount: 8 },
  { name: 'Tibet', tagline: 'Roof of the World', description: "The vast Tibetan plateau, home to ancient monasteries, sacred lakes, and the world's highest peaks.", thumbnail: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800', images: [], highlights: ['Potala Palace', 'Mount Kailash', 'Namtso Lake', 'Tibetan Buddhism'], tripCount: 5 },
  { name: 'India', tagline: 'Diversity Unbound', description: 'From the Himalayas to the tropics, India offers an extraordinary range of trekking and cultural experiences.', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', images: [], highlights: ['Ladakh', 'Spiti Valley', 'Kedarnath', 'Sikkim'], tripCount: 6 },
]

const blogs = [
  { title: 'Best Time to Trek to Everest Base Camp', slug: 'best-time-everest-base-camp', excerpt: "Choosing the right season makes all the difference for your EBC trek. Here's everything you need to know.", content: '<p>The Everest Base Camp trek is best undertaken during two main seasons...</p>', thumbnail: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800', author: 'Pemba Sherpa', category: 'Travel Tips', tags: ['Everest', 'Trekking', 'Nepal', 'Seasons'], readTime: 6, isPublished: true, publishedAt: new Date('2024-11-15') },
  { title: 'Packing List for Himalayan Trekking', slug: 'packing-list-himalayan-trekking', excerpt: 'A complete gear list curated by our experienced guides for high altitude Himalayan treks.', content: '<p>Packing right is crucial for a successful Himalayan trek...</p>', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', author: 'Karma Dorje', category: 'Gear & Packing', tags: ['Packing', 'Gear', 'High Altitude', 'Tips'], readTime: 8, isPublished: true, publishedAt: new Date('2024-10-22') },
  { title: 'Altitude Sickness: Prevention & Treatment', slug: 'altitude-sickness-prevention-treatment', excerpt: 'Acute Mountain Sickness (AMS) can affect anyone. Learn how to prevent it and what to do if it strikes.', content: '<p>Altitude sickness, or Acute Mountain Sickness (AMS), is a real concern...</p>', thumbnail: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?w=800', author: 'Dr. Rajan Thapa', category: 'Health & Safety', tags: ['AMS', 'Health', 'Safety', 'Altitude'], readTime: 7, isPublished: true, publishedAt: new Date('2024-10-05') },
  { title: 'Bhutan Travel Guide 2024', slug: 'bhutan-travel-guide-2024', excerpt: "Everything you need to know about visiting Bhutan — visas, fees, culture, and must-see places.", content: '<p>Bhutan, the last Shangri-La, is one of the most unique destinations in the world...</p>', thumbnail: 'https://images.unsplash.com/photo-1569963731117-a9a3b748ccd7?w=800', author: 'Tenzin Wangchuk', category: 'Destination Guides', tags: ['Bhutan', 'Culture', 'Guide', 'Travel'], readTime: 10, isPublished: true, publishedAt: new Date('2024-09-18') },
]

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/hello-ktm-trek')
  console.log('Connected to MongoDB: hello-ktm-trek')

  await Promise.all([
    TripModel.deleteMany({}),
    DestinationModel.deleteMany({}),
    BlogModel.deleteMany({}),
    ReviewModel.deleteMany({}),
  ])
  console.log('Cleared existing data')

  const insertedTrips = await TripModel.insertMany(trips)
  await DestinationModel.insertMany(destinations)
  await BlogModel.insertMany(blogs)

  const reviews = [
    { author: 'Sarah Mitchell', rating: 5, comment: 'Absolutely life-changing experience! Our guide Pemba was exceptional.', trip: insertedTrips[0]._id, tripTitle: insertedTrips[0].title, source: 'Google', isApproved: true },
    { author: 'James Thornton', rating: 5, comment: 'Hello KTM Trek made our Annapurna dream come true. Highly recommend!', trip: insertedTrips[1]._id, tripTitle: insertedTrips[1].title, source: 'TripAdvisor', isApproved: true },
    { author: 'Yuki Tanaka', rating: 5, comment: 'The Bhutan cultural tour exceeded all expectations. A trip I will never forget.', trip: insertedTrips[4]._id, tripTitle: insertedTrips[4].title, source: 'Direct', isApproved: true },
    { author: 'Marco Ferretti', rating: 5, comment: 'Best trekking company in Nepal. We felt safe and truly immersed in the mountains.', trip: insertedTrips[5]._id, tripTitle: insertedTrips[5].title, source: 'Google', isApproved: true },
  ]
  await ReviewModel.insertMany(reviews)

  console.log(`Seeded: ${insertedTrips.length} trips, ${destinations.length} destinations, ${blogs.length} blogs, ${reviews.length} reviews`)
  await mongoose.disconnect()
  console.log('Done.')
}

seed().catch((err) => { console.error(err); process.exit(1) })
