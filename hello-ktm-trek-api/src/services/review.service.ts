import { ReviewRepository } from '../repositories/review.repository'
import { TripRepository } from '../repositories/trip.repository'
import type { ReviewDocument } from '../models/review.model'

const reviewRepo = new ReviewRepository()
const tripRepo = new TripRepository()

export class ReviewService {
  async getReviewsForTrip(tripId: string) {
    return reviewRepo.findByTrip(tripId)
  }

  async getApprovedReviews() {
    return reviewRepo.findApproved()
  }

  async submitReview(data: Partial<ReviewDocument>) {
    const trip = await tripRepo.findById(data.trip!.toString())
    if (!trip) throw new Error('Trip not found')
    return reviewRepo.create({ ...data, tripTitle: trip.title })
  }
}
