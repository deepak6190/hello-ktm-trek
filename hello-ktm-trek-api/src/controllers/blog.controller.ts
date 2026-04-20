import { Request, Response } from 'express'
import { BlogService } from '../services/blog.service'

const blogService = new BlogService()

export class BlogController {
  async getPosts(req: Request, res: Response) {
    try {
      const result = await blogService.getPosts({
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
        category: req.query.category as string | undefined,
      })
      res.json({
        success: true,
        data: result.posts,
        meta: { page: result.page, limit: result.limit, total: result.total, totalPages: result.totalPages },
      })
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } })
    }
  }

  async getPostBySlug(req: Request, res: Response) {
    try {
      const post = await blogService.getPostBySlug(req.params.slug as string)
      res.json({ success: true, data: post })
    } catch (error: any) {
      const status = error.message === 'Blog post not found' ? 404 : 500
      res.status(status).json({ success: false, error: { message: error.message } })
    }
  }

  async getRecentPosts(req: Request, res: Response) {
    try {
      const posts = await blogService.getRecentPosts()
      res.json({ success: true, data: posts })
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } })
    }
  }

  async getCategories(req: Request, res: Response) {
    try {
      const categories = await blogService.getCategories()
      res.json({ success: true, data: categories })
    } catch (error: any) {
      res.status(500).json({ success: false, error: { message: error.message } })
    }
  }
}
