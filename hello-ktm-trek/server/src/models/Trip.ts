import { Schema, model, Document } from 'mongoose'

export interface ITrip extends Document {
  id: string
  title: string
  slug: string
  destination: string
  region?: string
  activityType: string
  difficulty: string
  duration: number
  maxAltitude?: number
  price: number
  rating: number
  reviewCount: number
  thumbnail: string
  images: string[]
  overview: string
  highlights: string[]
  itinerary: {
    day: number
    title: string
    description: string
    altitude?: number
    distance?: string
    meals: string[]
    accommodation: string
  }[]
  includes: string[]
  excludes: string[]
  bestSeason: string[]
  groupSize: { min: number; max: number }
  isFeatured: boolean
  isPopular: boolean
}

const ItineraryDaySchema = new Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    altitude: Number,
    distance: String,
    meals: [String],
    accommodation: String,
  },
  { _id: false }
)

const TripSchema = new Schema<ITrip>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    destination: { type: String, required: true },
    region: String,
    activityType: { type: String, required: true },
    difficulty: { type: String, required: true },
    duration: { type: Number, required: true },
    maxAltitude: Number,
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviewCount: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    images: [String],
    overview: { type: String, required: true },
    highlights: [String],
    itinerary: [ItineraryDaySchema],
    includes: [String],
    excludes: [String],
    bestSeason: [String],
    groupSize: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    isFeatured: { type: Boolean, default: false },
    isPopular: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Trip = model<ITrip>('Trip', TripSchema)
