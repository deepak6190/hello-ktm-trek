import { Schema, model, Document } from 'mongoose'

export interface BlogDocument extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail: string
  author: string
  category: string
  tags: string[]
  readTime: number
  isPublished: boolean
  publishedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const blogSchema = new Schema<BlogDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    tags: [String],
    readTime: { type: Number, default: 5 },
    isPublished: { type: Boolean, default: false },
    publishedAt: Date,
  },
  { timestamps: true }
)

blogSchema.index({ category: 1 })
blogSchema.index({ tags: 1 })
blogSchema.index({ isPublished: 1 })
blogSchema.index({ title: 'text', excerpt: 'text', content: 'text' })

export const BlogModel = model<BlogDocument>('Blog', blogSchema)
