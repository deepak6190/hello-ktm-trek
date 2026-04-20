import { Request, Response } from 'express'
import { EnquiryService } from '../services/enquiry.service'

const enquiryService = new EnquiryService()

export class EnquiryController {
  async submit(req: Request, res: Response) {
    try {
      const { name, email, phone, destination, activities, startDate, endDate, groupSize, budget, message } = req.body

      if (!name || !email || !destination || !groupSize) {
        res.status(400).json({ success: false, error: { message: 'name, email, destination and groupSize are required' } })
        return
      }

      const enquiry = await enquiryService.submitEnquiry({
        name, email, phone, destination, activities,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        groupSize: Number(groupSize),
        budget, message,
      })

      res.status(201).json({ success: true, data: enquiry, message: 'Enquiry submitted successfully. We will contact you within 24 hours.' })
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } })
    }
  }
}
