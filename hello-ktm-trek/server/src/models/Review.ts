import { Schema, model, Document } from 'mongoose'

export interface IReview extends Document {
  id: string
  author: string
  avatar?: string
  rating: number
  comment: string
  tripTitle: string
  date: string
  source: 'Google' | 'TripAdvisor' | 'Direct'
}

const ReviewSchema = new Schema<IReview>(
  {
    id: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    avatar: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    tripTitle: { type: String, required: true },
    date: { type: String, required: true },
    source: { type: String, enum: ['Google', 'TripAdvisor', 'Direct'], required: true },
  },
  { timestamps: true }
)

export const Review = model<IReview>('Review', ReviewSchema)
