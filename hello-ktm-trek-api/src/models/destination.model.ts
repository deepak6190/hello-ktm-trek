import { Schema, model, Document } from 'mongoose'
import { DESTINATIONS } from '../constants'

export interface DestinationDocument extends Document {
  name: string
  tagline: string
  description: string
  thumbnail: string
  images: string[]
  highlights: string[]
  tripCount: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const destinationSchema = new Schema<DestinationDocument>(
  {
    name: { type: String, required: true, unique: true, enum: DESTINATIONS },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: [String],
    highlights: [String],
    tripCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const DestinationModel = model<DestinationDocument>('Destination', destinationSchema)
