import { Request, Response } from 'express'
import { TripService } from '../services/trip.service'
import type { ApiResponse } from '../types'

const tripService = new TripService()

export class TripController {
  async getTrips(req: Request, res: Response) {
    try {
      const filters = {
        destination: req.query.destination as any,
        activityType: req.query.activityType as any,
        difficulty: req.query.difficulty as any,
        region: req.query.region as any,
        minDuration: req.query.minDuration ? Number(req.query.minDuration) : undefined,
        maxDuration: req.query.maxDuration ? Number(req.query.maxDuration) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        isFeatured: req.query.isFeatured ? req.query.isFeatured === 'true' : undefined,
        isPopular: req.query.isPopular ? req.query.isPopular === 'true' : undefined,
        search: req.query.search as string | undefined,
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
      }

      const result = await tripService.getTrips(filters)
      const response: ApiResponse<typeof result.trips> = {
        success: true,
        data: result.trips,
        meta: { page: result.page, limit: result.limit, total: result.total, totalPages: result.totalPages },
      }
      res.json(response)
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } })
    }
  }

  async getTripBySlug(req: Request, res: Response) {
    try {
      const trip = await tripService.getTripBySlug(req.params.slug as string)
      res.json({ success: true, data: trip })
    } catch (error: any) {
      const status = error.message === 'Trip not found' ? 404 : 500
      res.status(status).json({ success: false, error: { message: error.message } })
    }
  }

  async getFeaturedTrips(req: Request, res: Response) {
    try {
      const trips = await tripService.getFeaturedTrips()
      res.json({ success: true, data: trips })
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } })
    }
  }

  async getPopularTrips(req: Request, res: Response) {
    try {
      const trips = await tripService.getPopularTrips()
      res.json({ success: true, data: trips })
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } })
    }
  }
}
