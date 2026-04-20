import { EnquiryModel, EnquiryDocument } from '../models/enquiry.model'

export class EnquiryRepository {
  async create(data: Partial<EnquiryDocument>) {
    return EnquiryModel.create(data)
  }

  async findAll({ page = 1, limit = 20, status }: { page?: number; limit?: number; status?: string } = {}) {
    const query: Record<string, any> = {}
    if (status) query.status = status

    const skip = (page - 1) * limit
    const [enquiries, total] = await Promise.all([
      EnquiryModel.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }).lean(),
      EnquiryModel.countDocuments(query),
    ])

    return { enquiries, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  async updateStatus(id: string, status: EnquiryDocument['status']) {
    return EnquiryModel.findByIdAndUpdate(id, { status }, { new: true }).lean()
  }
}
