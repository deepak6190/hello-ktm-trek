import { Router, Request, Response } from 'express'
import { getCache } from '../cache'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, data: getCache().blogs })
})

router.get('/:slug', (req: Request, res: Response) => {
  const blog = getCache().blogs.find((b: any) => b.slug === req.params.slug)
  if (!blog) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Blog post not found' } })
    return
  }
  res.json({ success: true, data: blog })
})

export default router
