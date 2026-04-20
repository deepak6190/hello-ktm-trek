import { Request, Response } from 'express'
import { ReviewService } from '../services/review.service'

const reviewService = new ReviewService()

export class ReviewController {
  async getApprovedReviews(req: Request, res: Response) {
    try {
      const reviews = await reviewService.getApprovedReviews()
      res.json({ success: true, data: reviews })
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } })
    }
  }

  async getReviewsForTrip(req: Request, res: Response) {
    try {
      const reviews = await reviewService.getReviewsForTrip(req.params.tripId)
      res.json({ success: true, data: reviews })
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } })
    }
  }

  async submitReview(req: Request, res: Response) {
    try {
      const { author, rating, comment, trip, source } = req.body

      if (!author || !rating || !comment || !trip) {
        res.status(400).json({ success: false, error: { message: 'author, rating, comment and trip are required' } })
        return
      }

      const review = await reviewService.submitReview({ author, rating: Number(rating), comment, trip, source })
      res.status(201).json({ success: true, data: review, message: 'Review submitted and pending approval.' })
    } catch (error: any) {
      const status = error.message === 'Trip not found' ? 404 : 500
      res.status(status).json({ success: false, error: { message: error.message } })
    }
  }
}
