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

export type ReviewSource = 'Google' | 'TripAdvisor' | 'Direct'

export interface ItineraryDay {
  day: number
  title: string
  description: string
  altitude?: number
  distance?: string
  meals: string[]
  accommodation: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface TripFilters {
  destination?: Destination
  activityType?: ActivityType
  difficulty?: Difficulty
  region?: Region
  minDuration?: number
  maxDuration?: number
  maxPrice?: number
  isFeatured?: boolean
  isPopular?: boolean
  search?: string
  page?: number
  limit?: number
}
