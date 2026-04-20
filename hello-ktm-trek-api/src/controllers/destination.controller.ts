import { Request, Response } from 'express'
import { DestinationService } from '../services/destination.service'

const destinationService = new DestinationService()

export class DestinationController {
  async getAll(req: Request, res: Response) {
    try {
      const destinations = await destinationService.getAllDestinations()
      res.json({ success: true, data: destinations })
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } })
    }
  }

  async getByName(req: Request, res: Response) {
    try {
      const destination = await destinationService.getDestinationByName(req.params.name as string)
      res.json({ success: true, data: destination })
    } catch (error: any) {
      const status = error.message === 'Destination not found' ? 404 : 500
      res.status(status).json({ success: false, error: { message: error.message } })
    }
  }
}
