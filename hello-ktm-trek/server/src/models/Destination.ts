import { Schema, model, Document } from 'mongoose'

export interface IDestination extends Document {
  id: string
  name: string
  tagline: string
  description: string
  thumbnail: string
  tripCount: number
  highlights: string[]
}

const DestinationSchema = new Schema<IDestination>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true },
    tripCount: { type: Number, required: true },
    highlights: [String],
  },
  { timestamps: true }
)

export const Destination = model<IDestination>('Destination', DestinationSchema)
