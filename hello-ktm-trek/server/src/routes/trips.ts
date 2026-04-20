import { Router, Request, Response } from 'express'
import { getCache } from '../cache'

const router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, data: getCache().trips })
})

router.get('/:slug', (req: Request, res: Response) => {
  const trip = getCache().trips.find((t: any) => t.slug === req.params.slug)
  if (!trip) {
    res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Trip not found' } })
    return
  }
  res.json({ success: true, data: trip })
})

export default router
