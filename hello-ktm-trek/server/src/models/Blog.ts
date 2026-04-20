import { Schema, model, Document } from 'mongoose'

export interface IBlog extends Document {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail: string
  author: string
  publishedAt: string
  category: string
  tags: string[]
  readTime: number
}

const BlogSchema = new Schema<IBlog>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail: { type: String, required: true },
    author: { type: String, required: true },
    publishedAt: { type: String, required: true },
    category: { type: String, required: true },
    tags: [String],
    readTime: { type: Number, required: true },
  },
  { timestamps: true }
)

export const Blog = model<IBlog>('Blog', BlogSchema)
