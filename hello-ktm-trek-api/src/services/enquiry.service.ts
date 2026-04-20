import { EnquiryRepository } from '../repositories/enquiry.repository'
import type { EnquiryDocument } from '../models/enquiry.model'

const enquiryRepo = new EnquiryRepository()

export class EnquiryService {
  async submitEnquiry(data: Partial<EnquiryDocument>) {
    const enquiry = await enquiryRepo.create(data)
    return enquiry
  }

  async getEnquiries(options: { page?: number; limit?: number; status?: string }) {
    return enquiryRepo.findAll(options)
  }
}
