import { TripModel, TripDocument } from '../models/trip.model'
import { TripFilters, DEFAULT_PAGE_SIZE } from '../constants'
import type { TripFilters as TripFiltersType } from '../types'

const DEFAULT_LIMIT = DEFAULT_PAGE_SIZE

export class TripRepository {
  async findAll(filters: TripFiltersType = {}) {
    const {
      destination, activityType, difficulty, region,
      minDuration, maxDuration, maxPrice,
      isFeatured, isPopular, search,
      page = 1, limit = DEFAULT_LIMIT,
    } = filters

    const query: Record<string, any> = { isDeleted: false }

    if (destination) query.destination = destination
    if (activityType) query.activityType = activityType
    if (difficulty) query.difficulty = difficulty
    if (region) query.region = region
    if (isFeatured !== undefined) query.isFeatured = isFeatured
    if (isPopular !== undefined) query.isPopular = isPopular
    if (maxPrice) query.price = { $lte: maxPrice }
    if (minDuration || maxDuration) {
      query.duration = {}
      if (minDuration) query.duration.$gte = minDuration
      if (maxDuration) query.duration.$lte = maxDuration
    }
    if (search) query.$text = { $search: search }

    const skip = (page - 1) * limit
    const [trips, total] = await Promise.all([
      TripModel.find(query).skip(skip).limit(limit).sort({ isFeatured: -1, rating: -1 }).lean(),
      TripModel.countDocuments(query),
    ])

    return { trips, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  async findBySlug(slug: string) {
    return TripModel.findOne({ slug, isDeleted: false }).lean()
  }

  async findById(id: string) {
    return TripModel.findOne({ _id: id, isDeleted: false }).lean()
  }

  async findFeatured(limit = 6) {
    return TripModel.find({ isFeatured: true, isDeleted: false }).limit(limit).sort({ rating: -1 }).lean()
  }

  async findPopular(limit = 6) {
    return TripModel.find({ isPopular: true, isDeleted: false }).limit(limit).sort({ reviewCount: -1 }).lean()
  }

  async create(data: Partial<TripDocument>) {
    return TripModel.create(data)
  }

  async update(id: string, data: Partial<TripDocument>) {
    return TripModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean()
  }

  async softDelete(id: string) {
    return TripModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true }).lean()
  }
}
