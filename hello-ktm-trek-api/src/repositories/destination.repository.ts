import { DestinationModel, DestinationDocument } from '../models/destination.model'

export class DestinationRepository {
  async findAll() {
    return DestinationModel.find({ isActive: true }).sort({ name: 1 }).lean()
  }

  async findByName(name: string) {
    return DestinationModel.findOne({ name, isActive: true }).lean()
  }

  async findById(id: string) {
    return DestinationModel.findById(id).lean()
  }

  async create(data: Partial<DestinationDocument>) {
    return DestinationModel.create(data)
  }

  async updateTripCount(name: string, count: number) {
    return DestinationModel.findOneAndUpdate({ name }, { tripCount: count }, { new: true }).lean()
  }
}
