import { ReviewModel, ReviewDocument } from '../models/review.model'

export class ReviewRepository {
  async findByTrip(tripId: string) {
    return ReviewModel.find({ trip: tripId, isApproved: true }).sort({ createdAt: -1 }).lean()
  }

  async findApproved(limit = 10) {
    return ReviewModel.find({ isApproved: true }).limit(limit).sort({ createdAt: -1 }).lean()
  }

  async create(data: Partial<ReviewDocument>) {
    return ReviewModel.create(data)
  }

  async approve(id: string) {
    return ReviewModel.findByIdAndUpdate(id, { isApproved: true }, { new: true }).lean()
  }
}
