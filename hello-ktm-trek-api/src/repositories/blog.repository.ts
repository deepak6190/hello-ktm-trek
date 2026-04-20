import { BlogModel, BlogDocument } from '../models/blog.model'

export class BlogRepository {
  async findAll({ page = 1, limit = 10, category }: { page?: number; limit?: number; category?: string } = {}) {
    const query: Record<string, any> = { isPublished: true }
    if (category) query.category = category

    const skip = (page - 1) * limit
    const [posts, total] = await Promise.all([
      BlogModel.find(query).skip(skip).limit(limit).sort({ publishedAt: -1 }).lean(),
      BlogModel.countDocuments(query),
    ])

    return { posts, total, page, limit, totalPages: Math.ceil(total / limit) }
  }

  async findBySlug(slug: string) {
    return BlogModel.findOne({ slug, isPublished: true }).lean()
  }

  async findRecent(limit = 3) {
    return BlogModel.find({ isPublished: true }).limit(limit).sort({ publishedAt: -1 }).lean()
  }

  async findCategories() {
    return BlogModel.distinct('category', { isPublished: true })
  }

  async create(data: Partial<BlogDocument>) {
    return BlogModel.create(data)
  }
}
