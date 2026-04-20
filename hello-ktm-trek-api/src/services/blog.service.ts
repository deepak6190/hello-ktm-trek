import { BlogRepository } from '../repositories/blog.repository'

const blogRepo = new BlogRepository()

export class BlogService {
  async getPosts(options: { page?: number; limit?: number; category?: string }) {
    return blogRepo.findAll(options)
  }

  async getPostBySlug(slug: string) {
    const post = await blogRepo.findBySlug(slug)
    if (!post) throw new Error('Blog post not found')
    return post
  }

  async getRecentPosts() {
    return blogRepo.findRecent()
  }

  async getCategories() {
    return blogRepo.findCategories()
  }
}
