export type Difficulty = 'Easy' | 'Moderate' | 'Challenging' | 'Strenuous'

export type ActivityType =
  | 'Trekking'
  | 'Helicopter Tour'
  | 'Mountain Flight'
  | 'Rafting'
  | 'Paragliding'
  | 'Bungee Jumping'
  | 'Cultural Tour'
  | 'National Park Tour'
  | 'Heritage Tour'

export type Region =
  | 'Annapurna'
  | 'Everest'
  | 'Langtang'
  | 'Manaslu'
  | 'Mustang'
  | 'Kanchenjunga'

export type Destination = 'Nepal' | 'Bhutan' | 'Tibet' | 'India' | 'Peru'

export interface Trip {
  id: string
  title: string
  slug: string
  destination: Destination
  region?: Region
  activityType: ActivityType
  difficulty: Difficulty
  duration: number
  maxAltitude?: number
  price: number
  rating: number
  reviewCount: number
  thumbnail: string
  images: string[]
  overview: string
  highlights: string[]
  itinerary: ItineraryDay[]
  includes: string[]
  excludes: string[]
  bestSeason: string[]
  groupSize: { min: number; max: number }
  isFeatured: boolean
  isPopular: boolean
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
  altitude?: number
  distance?: string
  meals: string[]
  accommodation: string
}

export interface DestinationItem {
  id: string
  name: Destination
  tagline: string
  description: string
  thumbnail: string
  tripCount: number
  highlights: string[]
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail: string
  author: string
  publishedAt: string
  category: string
  tags: string[]
  readTime: number
}

export interface Review {
  id: string
  author: string
  avatar?: string
  rating: number
  comment: string
  tripTitle: string
  date: string
  source: 'Google' | 'TripAdvisor' | 'Direct'
}

export interface PlanTripForm {
  destination: string
  activities: ActivityType[]
  startDate: string
  endDate: string
  groupSize: number
  budget: string
  name: string
  email: string
  phone: string
  message: string
}

export interface FilterState {
  destination: Destination | null
  activityType: ActivityType | null
  difficulty: Difficulty | null
  minDuration: number | null
  maxDuration: number | null
  maxPrice: number | null
}
