import { TripRepository } from '../repositories/trip.repository'
import type { TripFilters } from '../types'

const tripRepo = new TripRepository()

export class TripService {
  async getTrips(filters: TripFilters) {
    const result = await tripRepo.findAll(filters)
    return result
  }

  async getTripBySlug(slug: string) {
    const trip = await tripRepo.findBySlug(slug)
    if (!trip) throw new Error('Trip not found')
    return trip
  }

  async getFeaturedTrips() {
    return tripRepo.findFeatured()
  }

  async getPopularTrips() {
    return tripRepo.findPopular()
  }
}
