import { DestinationRepository } from '../repositories/destination.repository'

const destinationRepo = new DestinationRepository()

export class DestinationService {
  async getAllDestinations() {
    return destinationRepo.findAll()
  }

  async getDestinationByName(name: string) {
    const destination = await destinationRepo.findByName(name)
    if (!destination) throw new Error('Destination not found')
    return destination
  }
}
