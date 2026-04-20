import { Schema, model, Document, Types } from 'mongoose'

export interface ReviewDocument extends Document {
  author: string
  avatar?: string
  rating: number
  comment: string
  trip: Types.ObjectId
  tripTitle: string
  source: 'Google' | 'TripAdvisor' | 'Direct'
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

const reviewSchema = new Schema<ReviewDocument>(
  {
    author: { type: String, required: true },
    avatar: String,
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    trip: { type: Schema.Types.ObjectId, ref: 'Trip', required: true },
    tripTitle: { type: String, required: true },
    source: { type: String, enum: ['Google', 'TripAdvisor', 'Direct'], default: 'Direct' },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
)

reviewSchema.index({ trip: 1 })
reviewSchema.index({ isApproved: 1 })

export const ReviewModel = model<ReviewDocument>('Review', reviewSchema)
