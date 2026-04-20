import { Schema, model, Document } from 'mongoose'
import { DIFFICULTIES, ACTIVITY_TYPES, REGIONS, DESTINATIONS } from '../constants'

export interface TripDocument extends Document {
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
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
}

const itineraryDaySchema = new Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  altitude: Number,
  distance: String,
  meals: [String],
  accommodation: { type: String, default: '' },
}, { _id: false })

const tripSchema = new Schema<TripDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    destination: { type: String, required: true, enum: DESTINATIONS },
    region: { type: String, enum: REGIONS },
    activityType: { type: String, required: true, enum: ACTIVITY_TYPES },
    difficulty: { type: String, required: true, enum: DIFFICULTIES },
    duration: { type: Number, required: true, min: 1 },
    maxAltitude: Number,
    price: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    thumbnail: { type: String, required: true },
    images: [String],
    overview: { type: String, required: true },
    highlights: [String],
    itinerary: [itineraryDaySchema],
    includes: [String],
    excludes: [String],
    bestSeason: [String],
    groupSize: {
      min: { type: Number, default: 1 },
      max: { type: Number, default: 16 },
    },
    isFeatured: { type: Boolean, default: false },
    isPopular: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
)

tripSchema.index({ destination: 1 })
tripSchema.index({ activityType: 1 })
tripSchema.index({ difficulty: 1 })
tripSchema.index({ isFeatured: 1 })
tripSchema.index({ isPopular: 1 })
tripSchema.index({ price: 1 })
tripSchema.index({ title: 'text', overview: 'text' })

export const TripModel = model<TripDocument>('Trip', tripSchema)
